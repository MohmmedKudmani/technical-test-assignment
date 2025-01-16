// Define your base URL using process.env.NEXT_PUBLIC_API_URL
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Define a client function that fetches data from the API
async function client(endpoint: string, options?: RequestInit) {
  const url = `${baseUrl}/${endpoint}`;
  const response = await fetch(url, options);

  return response;
}

export default client;

