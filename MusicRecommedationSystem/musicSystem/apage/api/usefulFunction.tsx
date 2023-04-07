export const fetchData = async (
  url: string,
  method?: string,
  headers?: Record<string, string>,
  body?: Record<string, any>
) => {
  try {
    const options: RequestInit = {};
    if (method) {
      options.method = method;
    }
    if (headers) {
      options.headers = headers;
    }
    if (body) {
      options.body = JSON.stringify(body);
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json"
      };
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
