'use client';

import { useEffect, useState } from 'react';
import CardRoom from '../components/cardroom';

interface Room {
 id: number;
  name: string;
  description: string;
  wifiCode: string;
  status: string;
  room_type: string;
  num_person: number;
  is_available: boolean;
  price_per_night: number;
  day_use_price: number;
  hourly_rate: number;
  floor: string;
  surface_area: number;
  view: string;   // ✅ fixé en string
  bed_type: string;
  flooring_type: string;
  image: string;
  is_smoking_allowed: boolean;
  is_pets_allowed: boolean;
  in_maintenance: boolean;
  checkin_date?: string;
  checkout_date?: string;

  room_images: { image: string }[];
  amenities: Array<{
    id: number;
    name: string;
    description: string;
    icon: string;
  }>;
  reservation_types: Array<{
    id: number;
    name: string;
    code: string;
    description: string;
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
}

const RoomList = ({ onBookNow }: RoomListProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/room'); 
        if (!res.ok) {
          throw new Error('Erreur API');
        }
        const data: Room[] = await res.json();
        console.log('📌 Room types:', data);
        setRooms(data);
      } catch (error) {
        console.error('❌ Erreur lors du fetch des rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (room: Room) => {
    onBookNow(room);
  };

  if (loading) {
    return <p className="text-center py-10">Chargement des chambres...</p>;
  }

  const roomGroups: Room[][] = [];
  for (let i = 0; i < rooms.length; i += 3) {
    roomGroups.push(rooms.slice(i, i + 3));
  }

  return (
    <div
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen"
      style={{ fontFamily: 'Bahnschrift, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {roomGroups.length === 0 ? (
          <p className="text-center">Aucune chambre disponible.</p>
        ) : (
          roomGroups.map((group, index) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default RoomList;
