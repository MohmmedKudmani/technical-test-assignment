import client from "@/lib/client";
import { useCallback } from "react";
import {
  CategorySchema,
  CategoryType,
  PostCategoryType,
} from "../schemas/categories.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

function useCategories(id?: number) {
  const notifications = useNotifications();

  const getCategories = useCallback(async () => {
    const response = await client("/categories", {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    const parsedData = CategorySchema.array().parse(data);

    return parsedData;
  }, []);

  const getCategory = useCallback(async (id?: number) => {
    const response = await client(`/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    const parsedData = CategorySchema.parse(data);

    return parsedData;
  }, []);

  const postCategory = useCallback(async (payload: PostCategoryType) => {
    const response = await client(`/categories`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  }, []);

  const putCategory = useCallback(
    async ({ payload, id }: { payload: PostCategoryType; id: number }) => {
      const response = await client(`/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      return response.json();
    },
    [],
  );

  const deleteCategory = useCallback(async (id: number) => {
    const response = await client(`/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  }, []);

  // Queries
  const {
    data: categories,
    status: categoriesStatus,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Queries
  const { data: category, status: categoryStatus } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });

  // Mutations
  const { mutate: mutatePostCategory, status: mutatePostCategoryStatus } =
    useMutation({
      mutationFn: postCategory,
      onSuccess: () => {
        notifications.show("Image created successfully", {
          severity: "success",
        });
        refetch();
      },
      onError: (error) => {
        notifications.show(error.message, {
          severity: "error",
        });
      },
    });

  // Mutations
  const { mutate: mutatePutCategory, status: mutatePutCategoryStatus } =
    useMutation({
      mutationFn: putCategory,
      onSuccess: () => {
        notifications.show("Image updated successfully", {
          severity: "success",
        });
        refetch();
      },
      onError: (error) => {
        notifications.show(error.message, {
          severity: "error",
        });
      },
    });

  // Mutations
  const { mutate: mutateDeleteCategory, status: mutateDeleteCategoryStatus } =
    useMutation({
      mutationFn: deleteCategory,
      onSuccess: () => {
        notifications.show("Image deleted successfully", {
          severity: "success",
        });
        refetch();
      },
      onError: (error) => {
        notifications.show(error.message, {
          severity: "error",
        });
      },
    });

  return {
    categories: categories || [],
    categoriesStatus,

    category: category || ({} as CategoryType),
    categoryStatus,

    mutatePostCategory,
    mutatePostCategoryStatus,

    mutatePutCategory,
    mutatePutCategoryStatus,

    mutateDeleteCategory,
    mutateDeleteCategoryStatus,
  };
}

export default useCategories;

