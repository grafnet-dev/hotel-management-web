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
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  cardShadow: '0 10px 40px rgba(0,0,0,0.1)',
  cardHoverShadow: '0 20px 60px rgba(0,0,0,0.15)',
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
  const [isHovered, setIsHovered] = useState(false);

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
      className="group relative w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'Bahnschrift, sans-serif' }}
    >
      {/* Effet de lueur d'arrière-plan */}
      <div 
        className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl ${
          room.status === 'available' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-rose-400 to-pink-500'
        }`}
        style={{ zIndex: -1 }}
      />
      
      <div 
        className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-[1.02]"
        style={{ 
          boxShadow: isHovered ? colors.cardHoverShadow : colors.cardShadow,
          minHeight: '480px'
        }}
      >
        {/* Section Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden">
          {/* Shimmer loading effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse ${imageLoaded ? 'hidden' : ''}`} />
          
          {/* Image principale avec effet parallax */}
          <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-110">
            <Image
              src={room.image}
              alt={room.name}
              layout="fill"
              objectFit="cover"
              className={`transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Overlay gradient subtil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Bouton favori avec animation */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-md shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            {isFavorite ? (
              <HeartSolid className="w-5 h-5 text-rose-500 animate-pulse" />
            ) : (
              <HeartOutline className="w-5 h-5 text-gray-700 hover:text-rose-500 transition-colors" />
            )}
          </button>
          
          {/* Badge de statut animé */}
          <div className={`absolute top-4 left-4 px-3 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-md transition-all duration-300 ${
            room.status === 'available' 
              ? 'bg-emerald-500/90 text-white ring-2 ring-emerald-300' 
              : 'bg-rose-600/90 text-white ring-2 ring-rose-300'
          }`}>
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${
              room.status === 'available' ? 'bg-emerald-400' : 'bg-rose-400'
            }`} />
            {room.status === 'available' ? '✓ Disponible' : '✕ Indisponible'}
          </div>
          
          {/* Prix avec effet glassmorphism */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-lg px-4 py-3 rounded-xl shadow-lg border border-white/20">
            <div className="flex items-baseline">
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                {room.price_per_night?.toLocaleString()}
              </span>
              <span className="text-xs text-gray-600 ml-1">FCFA</span>
            </div>
            <span className="text-xs text-gray-500">par nuit</span>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-5 sm:p-6">
          {/* En-tête */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-teal-700 transition-colors duration-300">
              {room.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
                {room.room_type}
              </p>
              {room.bed_type && (
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                  {room.bed_type}
                </span>
              )}
            </div>
          </div>

          {/* Informations principales avec icônes animées */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl">
            <div className="flex items-center space-x-1">
              <div className="p-2 bg-teal-500 rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">{room.num_person}</span>
                <span className="text-xs text-gray-500 block">
                  {room.num_person > 1 ? 'personnes' : 'personne'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="p-2 bg-emerald-500 rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">{room.surface_area}</span>
                <span className="text-xs text-gray-500 block">m²</span>
              </div>
            </div>

            {room.view && (
              <div className="flex items-center space-x-1">
                <div className="p-2 bg-orange-500 rounded-lg shadow-sm">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-gray-500 capitalize">{room.view}</span>
                </div>
              </div>
            )}
          </div>

          {/* Équipements avec animations */}
          <div className="mb-6">
            <h4 className="text-sm font-bold mb-3 text-gray-700 flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2" />
              Équipements Premium
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {room.amenities?.slice(0, 4).map((amenity, index) => (
                <div 
                  key={amenity.id} 
                  className="flex items-center bg-white border border-gray-100 hover:border-teal-200 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-5 h-5 relative mr-2 flex-shrink-0">
                    <Image
                      src={amenity.icon}
                      alt={amenity.name}
                      layout="fill"
                      objectFit="contain"
                      className="filter hover:brightness-110 transition-all"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600 truncate">
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
            {room.amenities?.length > 4 && (
              <div className="mt-2 text-center">
                <span className="text-xs text-teal-600 bg-teal-50 px-3 py-1 rounded-full font-medium">
                  +{room.amenities.length - 4} autres équipements
                </span>
              </div>
            )}
          </div>

          {/* Boutons d'action avec effets modernes */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onViewDetails}
              className="flex-1 group/btn relative overflow-hidden px-4 py-3 text-sm font-semibold rounded-xl border-2 border-teal-500 text-teal-600 hover:text-white transition-all duration-300 hover:shadow-lg flex items-center justify-center"
             
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
              <svg className="w-5 h-5 mr-2 relative z-10 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="relative z-10">Voir détails</span>
            </button>
            
            <button
              onClick={onBookNow}
              disabled={room.status !== 'available'}
              className={`flex-1 group/btn relative overflow-hidden px-4 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 flex items-center justify-center ${
                room.status !== 'available' 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105'
              }`}
            >
              {room.status === 'available' && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
              )}
              <svg className="w-5 h-5 mr-2 relative z-10 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="relative z-10">
                {room.status === 'available' ? 'Réserver maintenant' : 'Indisponible'}
              </span>
            </button>
          </div>
        </div>

        {/* Indicateur de hover subtil */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
      </div>
    </div>
  );
};

export default CardRoom;