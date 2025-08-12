'use client';

import CardRoom from '../components/cardroom';
import sampleRooms from '../types';





interface RoomListProps {
  onBookNow: (room: Room) => void;
  rooms?: Room[]; 
}

interface Room {
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
}

interface RoomListProps {
  onBookNow: (room: Room) => void;
  rooms?: Room[]; 
}

const RoomList = ({ onBookNow }: RoomListProps) => {
  const roomGroups = [];
  for (let i = 0; i < sampleRooms.length; i += 3) {
    roomGroups.push(sampleRooms.slice(i, i + 3));
  }

  const handleBookNow = (room: Room) => {
    onBookNow(room);
  };

  return (
    <div
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen"
      style={{ fontFamily: 'Bahnschrift, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {roomGroups.map((group, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-stretch"
          >
            {group.map((room) => (
              <CardRoom
                key={room.id}
                room={room}
                onBookNow={() => handleBookNow(room)}
                onViewDetails={() => {}} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;