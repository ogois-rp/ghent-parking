const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const buildQueryString = (params?: Record<string, string | number>): string => {
  if (!params) return '';
  const query = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  );
  return `?${query.toString()}`;
};

const apiClient = {
  get: async <T>(path: string, params?: Record<string, string | number>): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}${buildQueryString(params)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  },
};

export default apiClient;