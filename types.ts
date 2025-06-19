export type Amenity = {
  id: number;
  name: string;
  description: string | boolean;
  icon: string;
};

export type RoomImage = {
  image: string;
};

export type ReservationType = {
  id: number;
  name: string;
  code: string;
  description: string | boolean;
  is_flexible: boolean;
  slots: ReservationSlot[];
};
export type ReservationSlot = {
  checkin_time: number;
  checkout_time: number;
};
// types/room.ts


export interface Image {
  id: number;
  url: string;
}




export type Room = {
    id: number;
  name: string;
  status: string;
  room_type: string;
  num_person: number;
  is_available: boolean;
  price_per_night: number;
  day_use_price: number;
  hourly_rate: number;
  floor: string;
  surface_area: number;
  view: string | boolean;
  bed_type: string | boolean;
  flooring_type: string | boolean;
  image: string;
  is_smoking_allowed: boolean;
  is_pets_allowed: boolean;
  in_maintenance: boolean;
  checkin_date?: string;
  checkout_date?: string;
  room_images: {
    image: string;
  }[];
  amenities: Array<{
    id: number;
    name: string;
    description: string | boolean;
    icon: string;
  }>;
  reservation_types: Array<{
    id: number;
    name: string;
    code: string;
    description: string | boolean;
    is_flexible: boolean;
    slots: Array<{
      checkin_time: number;
      checkout_time: number;
    }>;
  }>;
  pricing: Array<{
    reservation_type_id: number;
    reservation_type_name: string;
    price: number;
    hourly_price: number;
    is_hourly_based: boolean;
    currency: string | null;
  }>;

};

