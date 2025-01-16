// Define your base URL using process.env.NEXT_PUBLIC_API_URL
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function client(endpoint: string, options?: RequestInit) {
  const url = `${baseUrl}/${endpoint}`;
  const response = await fetch(url, options);

  return response;
}

export default client;

