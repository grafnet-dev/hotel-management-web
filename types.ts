export type Amenity = {
  id: number;
  name: string;
  description: string | boolean;
  icon: string;
};

export type RoomImage = {
  image: string;
};

export type Room = {
  id: number;
  name: string;
  room_type: string;
  bed_type: string;
  num_person: number;
  surface_area: number;
  price_per_night: number;
  hourly_rate?: number;
  is_day_use: boolean;
  day_use_price?: number;
  day_use_check_in?: number;
  day_use_check_out?: number;
  default_check_in_time: number;
  default_check_out_time: number;
  flooring_type: string;
  view: string;
  floor: string | null;
  is_pets_allowed: boolean;
  is_smoking_allowed: boolean;
  in_maintenance: boolean;
  is_available: boolean;
  status: string;
  image: string;
  room_images: RoomImage[];
  amenities: Amenity[];
};