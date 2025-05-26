import Image from 'next/image';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

const colors = {
  teal: '#2a9d8f',
  gold: '#e9c46a',
  orange: '#f4a261',
  maroon: '#e76f51',
  darkTeal: '#1e4e5f',
  lightTeal: '#e0f2f1',
};

type Amenity = {
  id: number;
  name: string;
  description: string | boolean;
  icon: string;
};


type Room = {
  id: number;
  name: string;
  room_type: string;
  bed_type: string;
  num_person: number;
  surface_area: number;
  price_per_night: number;
  flooring_type: string;
  view: string;
  floor: string | null;
  status: string;
  image: string;
  amenities: Amenity[];
};


type CardRoomProps = {
  room: Room;
  onBookNow?: () => void;
  onViewDetails?: () => void;
  onFavoriteToggle?: (roomId: number, isFavorite: boolean) => void;
  isFavorite?: boolean;
};

const CardRoom = ({ 
  room, 
  onBookNow, 
  onViewDetails, 
  onFavoriteToggle,
  isFavorite: initialFavorite = false 
}: CardRoomProps) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    if (onFavoriteToggle) {
      onFavoriteToggle(room.id, newFavoriteStatus);
    }
  };

  return (
    <div 
      className="w-72 rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
      style={{ fontFamily: 'Bahnschrift, sans-serif', height: '420px' }}
    >
      {/* Image avec overlay */}
      <div className="relative h-48 w-full overflow-hidden group">
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${imageLoaded ? 'hidden' : ''}`} />
        <Image
          src={room.image}
          alt={room.name}
          layout="fill"
          objectFit="cover"
          className={`transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        
        {/* Bouton favori */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isFavorite ? (
            <HeartSolid className="w-5 h-5 text-rose-500" />
          ) : (
            <HeartOutline className="w-5 h-5 text-gray-700" />
          )}
        </button>
        
        {/* Badge de statut */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold shadow-md ${
          room.status === 'available' 
            ? 'bg-emerald-500 text-white' 
            : 'bg-rose-600 text-white'
        }`}>
          {room.status === 'available' ? 'Disponible' : 'Indisponible'}
        </div>
        
        {/* Prix en overlay */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          <span className="text-lg font-bold" style={{ color: colors.darkTeal }}>
            {room.price_per_night?.toLocaleString()} FCFA
          </span>
          <span className="text-xs text-gray-600 block">par nuit</span>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Titre et type */}
        <div className="mb-2">
          <h3 
            className="text-lg font-bold truncate"
            style={{ color: colors.darkTeal }}
          >
            {room.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{room.room_type}</p>
        </div>

        {/* Info rapide */}
        <div className="flex items-center space-x-4 mb-3 text-sm">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke={colors.teal} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {room.num_person} {room.num_person > 1 ? 'personnes' : 'personne'}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke={colors.teal} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {room.surface_area} m²
          </span>
        </div>

        {/* Équipements */}
        <div className="mb-4 flex-1">
          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: colors.darkTeal }}>
            Équipements principaux
          </h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities?.slice(0, 3).map((amenity) => (
              <div key={amenity.id} className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                <div className="w-3 h-3 relative mr-1">
                  <Image
                    src={amenity.icon}
                    alt={amenity.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-xs" style={{ color: colors.darkTeal }}>{amenity.name}</span>
              </div>
            ))}
            {room.amenities?.length > 3 && (
              <span className="text-xs text-gray-500 self-center">
                +{room.amenities.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex space-x-2 mt-auto">
          <button
            onClick={onViewDetails}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors hover:shadow-sm flex items-center justify-center"
            style={{ 
              borderColor: colors.teal,
              color: colors.teal,
            }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Détails
          </button>
          <button
            onClick={onBookNow}
            disabled={room.status !== 'available'}
            className={`flex-1 px-3 py-2 text-sm font-medium text-white rounded-lg transition-colors hover:shadow-sm flex items-center justify-center ${
              room.status !== 'available' ? 'bg-gray-300 cursor-not-allowed' : ''
            }`}
            style={{ 
              backgroundColor: room.status === 'available' ? colors.maroon : undefined
            }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardRoom;