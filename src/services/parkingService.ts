import apiClient from '../utils/apiClient';
import type { ParkingResponse, SortDirection, SortField } from '../types/parking';

interface GetAllParams {
  search?: string
  sortField?: SortField
  sortDirection?: SortDirection
}

const parkingService = {
  getAll: ({ search, sortField, sortDirection }: GetAllParams = {}) => {
    const params: Record<string, string | number> = { limit: 20 }

    if (search) {
      params.where = `search(name, "${search}")`
    }

    if (sortField && sortDirection) {
      params.order_by = `${sortField} ${sortDirection}`
    }

    return apiClient.get<ParkingResponse>('/records', params)
  },
  getByName: (name: string) => apiClient.get<ParkingResponse>('/records', {
    limit: 20,
    refine: `name:${name}`
  }),
};

export default parkingService;