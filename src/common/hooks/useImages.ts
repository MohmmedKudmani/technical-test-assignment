import client from "@/lib/client";
import { useCallback } from "react";
import {
  ImageSchema,
  ImageType,
  PostImageType,
} from "../schemas/images.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

function useImages(id?: number) {
  const notifications = useNotifications();

  const getImages = useCallback(async () => {
    const response = await client("/images", {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get images");
    }

    const data = await response.json();

    const parsedData = ImageSchema.array().parse(data);

    return parsedData;
  }, []);

  const getImage = useCallback(async (id: number) => {
    const response = await client(`/images/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get an image");
    }

    const data = await response.json();

    const parsedData = ImageSchema.parse(data);

    return parsedData;
  }, []);

  const postImage = useCallback(async (payload: PostImageType) => {
    const response = await client(`/images`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create an image");
    }

    return response.json();
  }, []);

  const putImage = useCallback(
    async ({ payload, id }: { payload: PostImageType; id: number }) => {
      const response = await client(`/images/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update an image");
      }

      return response.json();
    },
    [],
  );

  const deleteImage = useCallback(async (id: number) => {
    const response = await client(`/images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete an image");
    }

    return response.json();
  }, []);

  // Queries
  const { data: images, status: imagesStatus } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  // Queries
  const { data: image, status: imageStatus } = useQuery({
    queryKey: ["image", id],
    queryFn: () => getImage(id || 0),
    enabled: !!id,
  });

  // Mutations
  const { mutate: mutatePostImage, status: mutatePostImageStatus } =
    useMutation({
      mutationFn: postImage,
      onSuccess: () => {
        notifications.show("Image uploaded successfully", {
          severity: "success",
        });
      },
      onError: (error) => {
        notifications.show(error.message, {
          severity: "error",
        });
      },
    });

  // Mutations
  const { mutate: mutatePutImage, status: mutatePutImageStatus } = useMutation({
    mutationFn: putImage,
    onSuccess: () => {
      notifications.show("Image updated successfully", {
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        severity: "error",
      });
    },
  });

  // Mutations
  const { mutate: mutateDeleteImage, status: mutateDeleteImageStatus } =
    useMutation({
      mutationFn: deleteImage,
      onSuccess: () => {
        notifications.show("Image deleted successfully", {
          severity: "success",
        });
      },
      onError: (error) => {
        notifications.show(error.message, {
          severity: "error",
        });
      },
    });

  return {
    images: images || [],
    imagesStatus,

    image: image || ({} as ImageType),
    imageStatus,

    mutatePostImage,
    mutatePostImageStatus,

    mutatePutImage,
    mutatePutImageStatus,

    mutateDeleteImage,
    mutateDeleteImageStatus,
  };
}

export default useImages;

