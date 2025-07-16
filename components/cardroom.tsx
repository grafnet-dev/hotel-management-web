'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Users, Bed, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReservationType, Room } from '../types';

interface CardRoomProps {
  room: Room;
  onViewDetails: () => void;
  onBookNow: () => void;
}

const CardRoom = ({ room, onViewDetails, onBookNow }: CardRoomProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const isAvailable = room.is_available && !room.in_maintenance;

  const formatHour = (hour: number): string => `${hour}h`;

  const handleBookNow = () => {
    if (isAvailable) {
      router.push(`/booking/${room.id}`);
      onBookNow();
    }
  };

  const getPriceForType = (typeId: number) => {
    const pricing = room.pricing?.find(p => p.reservation_type_id === typeId);
    if (!pricing) return '';
    return pricing.price
      ? `${pricing.price.toLocaleString()} FCFA`
      : pricing.hourly_price
      ? `${pricing.hourly_price.toLocaleString()} FCFA/h`
      : '';
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white flex flex-col h-full rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-xl"
    >
      {/* Image Header */}
      <div className="relative h-48 w-full">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        {/* Favorite & Availability */}
        <div className="absolute inset-0 flex justify-between items-start p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="p-2 bg-white/90 rounded-full backdrop-blur-sm"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
          <div className={`px-2 py-1 text-xs font-medium rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </div>
        </div>

        {/* Base price */}
        <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
          {room.price_per_night?.toLocaleString()} FCFA
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {room.surface_area}m²
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" /> {room.num_person} pers
            </span>
            <span className="flex items-center">
              <Bed className="w-3 h-3 mr-1" /> {room.bed_type}
            </span>
            <span>Étage {room.floor}</span>
          </div>

          {/* Options */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 mb-2 flex items-center">
              <Clock className="w-3 h-3 mr-1" /> OPTIONS DE RÉSERVATION
            </h4>
            <div className="space-y-1">
              {room.reservation_types?.map((type: ReservationType) => (
                <div key={type.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{type.name}</span>
                    {!type.is_flexible && type.slots?.[0] && (
                      <span className="text-xs text-gray-500 ml-2">
                        {formatHour(type.slots[0].checkin_time)}-{formatHour(type.slots[0].checkout_time)}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-orange-600">
                    {getPriceForType(type.id)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto pt-2">
          <button
            onClick={onViewDetails}
            className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Détails
          </button>
          <button
            onClick={handleBookNow}
            disabled={!isAvailable}
            className={`flex-1 py-2 text-sm rounded-lg transition ${
              isAvailable
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Réserver
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CardRoom;
