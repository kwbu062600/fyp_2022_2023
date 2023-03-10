
export const fetchData = async (
  url: string,
  method?: string,
  headers?: Record<string, string>
) => {
  try {
    const options: RequestInit = {};
    if (method) {
      options.method = method;
    }
    if (headers) {
      options.headers = headers;
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
