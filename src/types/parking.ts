// types/parking.ts

export interface ParkingLocation {
  lon: number;
  lat: number;
}

export interface ParkingRecord {
  name: string;
  lastupdate: string;
  totalcapacity: number;
  availablecapacity: number;
  occupation: number;
  type: string;
  description: string;
  id: string;
  openingtimesdescription: string;
  isopennow: number;
  temporaryclosed: number;
  operatorinformation: string;
  freeparking: number;
  urllinkaddress: string;
  occupancytrend: string;
  locationanddimension: string;
  location: ParkingLocation;
  text: string | null;
  categorie: string;
  dashboard: string;
}

export interface ParkingResponse {
  total_count: number;
  results: ParkingRecord[];
}

export interface LocationAndDimension {
  specificAccessInformation: string[]
  level: string
  roadNumber: string
  roadName: string
  contactDetailsTelephoneNumber: string
  coordinatesForDisplay: {
    latitude: number
    longitude: number
  }
}

export type SortField = 'name' | 'availablecapacity'
export type SortDirection = 'ASC' | 'DESC'

