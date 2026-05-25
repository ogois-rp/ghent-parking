import type { LocationAndDimension } from '../types/parking'

export const parseLocationAndDimension = (raw: string): LocationAndDimension | null => {
  try {
    return JSON.parse(raw) as LocationAndDimension
  } catch {
    return null
  }
}