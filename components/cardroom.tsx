'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Users, Maximize, Bed } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CardRoom = ({ room, onViewDetails }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const isAvailable = room.is_available && !room.in_maintenance;

  const handleBookNow = () => {
    if (isAvailable) {
      router.push(`/booking/${room.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 w-full max-w-md mx-auto"
      style={{ minHeight: '420px' }}
    >
      {/* Image */}
      <div className="relative h-60">
        <Image
          src={room.image}
          alt={room.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />

        {/* Favori */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>

        {/* Statut */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-semibold ${
          isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isAvailable ? 'Disponible' : 'Indisponible'}
        </div>

        {/* Prix */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white rounded px-3 py-1 text-sm">
          <div className="font-bold text-lg">{room.price_per_night?.toLocaleString()} FCFA</div>
          <div className="text-xs">par nuit</div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5">
        <h3 className="font-semibold text-2xl mb-4">{room.name}</h3>

        {/* Infos principales */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            {room.surface_area}m²
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {room.num_person} pers
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            Étage {room.floor}
          </div>
        </div>

        {/* Type de lit */}
        {room.bed_type && (
          <div className="text-sm text-gray-600 mb-2">
            🛏️ {room.bed_type}
          </div>
        )}

        {/* Horaires */}
        <div className="text-sm text-gray-600 mb-5">
          ⏰ Arrivée: {room.check_in_time || '14:00'} • Départ: {room.check_out_time || '12:00'}
        </div>

        {/* Boutons */}
        <div className="flex gap-4">
          <button
            onClick={onViewDetails}
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Voir détails
          </button>

          <button
            onClick={handleBookNow}
            disabled={!isAvailable}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
              isAvailable
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
