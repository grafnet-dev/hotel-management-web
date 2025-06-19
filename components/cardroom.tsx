import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Star, Clock, ShoppingBag, Eye, Users, Maximize, MapPin, Wifi, Car, Coffee, Bath } from 'lucide-react';
import { useRouter } from 'next/navigation';

const colors = {
  teal: "#005D7C",
  gold: "#CE9226",
  orange: '#f4a261',
  maroon: '#e76f51',
  darkTeal: '#003d52',
  lightTeal: '#e0f2f1',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  glassEffect: 'rgba(255,255,255,0.25)'
};

export type Image = {
  id: number;
  url: string;
};

type Room = {
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

type CardRoomProps = {
  room: Room;
  onBookNow?: () => void;
  onViewDetails?: () => void;
  onFavoriteToggle?: (roomId: number, isFavorite: boolean) => void;
  isFavorite?: boolean;
};

const CardRoom = ({ 
  room, 
  onViewDetails, 
  onFavoriteToggle,
  isFavorite: initialFavorite = false 
}: CardRoomProps) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const handleBookNow = async () => {
    if (!room.is_available || room.in_maintenance || room.status !== 'available') {
      console.warn('Room is not available for booking');
      return;
    }

    try {
      setIsBooking(true);
      router.push(`/booking/${room.id}`);
      console.log(`Navigating to booking for room ${room.id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setIsBooking(false);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    if (onFavoriteToggle) {
      onFavoriteToggle(room.id, newFavoriteStatus);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  const isBookable = room.is_available && !room.in_maintenance && room.status === 'available';
  const allImages = [room.image, ...room.room_images.map(img => img.image)];

  // Animation des images
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94],
        scale: { duration: 0.3 }
      }}
      className="group relative w-full max-w-md mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'Bahnschrift, Arial, sans-serif' }}
    >
      {/* Effet de glow dramatique */}
      <div 
        className={`absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl ${
          isBookable
            ? 'bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-600/30' 
            : 'bg-gradient-to-br from-rose-400/30 to-orange-500/30'
        }`}
        style={{ zIndex: -1 }}
      />
      
      {/* Container principal avec glassmorphism */}
    <div 
  className="relative bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500 border border-white/20"
  style={{ 
    minHeight: '480px',
    background: isHovered 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)'
      : 'rgba(255,255,255,0.9)',
    boxShadow: isHovered 
      ? '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(99,102,241,0.1)' 
      : '0 10px 25px -3px rgba(0,0,0,0.1)',
  }}
>

        {/* Section Image Élargie */}
        <div className="relative h-72 w-full overflow-hidden group/image">
          {/* Effet de chargement sophistiqué */}
          <div className={`absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50 ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
            <div className="absolute inset-0 animate-pulse">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 animate-shimmer" />
            </div>
          </div>
          
          {/* Image principale avec parallax */}
          <div className="absolute inset-0 transform transition-all duration-700 group-hover/image:scale-110">
            <Image
              src={allImages[currentImageIndex]}
              alt={room.name}
              layout="fill"
              objectFit="cover"
              className={`transition-all duration-700 ${imageLoaded ? 'opacity-100 filter-none' : 'opacity-0'}`}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Overlay gradient dynamique */}
          <div 
            className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${colors.teal}40 0%, transparent 50%, ${colors.gold}30 100%)`
            }}
          />

          {/* Navigation des images */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Status badge avec animation */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-md border`}
            style={{
              backgroundColor: isBookable ? `${colors.teal}F0` : `${colors.maroon}F0`,
              color: 'white',
              border: `1px solid ${isBookable ? colors.teal : colors.maroon}80`
            }}
          >
            {isBookable ? '✨ Disponible' : '🔒 Occupée'}
          </motion.div>
          
          {/* Bouton favori amélioré */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className="absolute top-4 left-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 z-20 border"
            style={{
              backgroundColor: isFavorite ? `${colors.maroon}E6` : 'rgba(255,255,255,0.9)',
              border: `1px solid ${isFavorite ? colors.maroon : colors.teal}40`,
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                isFavorite 
                  ? 'fill-white text-white scale-110' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </motion.button>
          
          {/* Prix avec design moderne */}
          <div className="absolute bottom-4 left-4 backdrop-blur-xl rounded-2xl p-4 border border-white/30"
               style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <div className="flex items-baseline mb-1">
              <span 
                className="text-2xl font-black"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.gold}, ${colors.maroon})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {room.price_per_night?.toLocaleString()}
              </span>
              <span className="text-sm ml-2 text-white font-semibold">
                FCFA
              </span>
            </div>
            <span className="text-xs text-white/80 font-medium">par nuit</span>
            {room.day_use_price > 0 && (
              <div className="flex items-baseline mt-2 pt-2 border-t border-white/20">
                <span className="text-lg font-bold text-white">
                  {room.day_use_price.toLocaleString()}
                </span>
                <span className="text-xs ml-1 text-white/70">FCFA/jour</span>
              </div>
            )}
          </div>

          {/* Rating amélioré */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-2 border border-white/20">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">4.9</span>
          </div>
        </div>

        {/* Contenu principal réorganisé */}
        <div className="p-6 space-y-6">
          {/* En-tête avec meilleure hiérarchie */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-black leading-tight transition-colors duration-300"
                  style={{ color: isHovered ? colors.teal : 'rgb(31, 41, 55)' }}>
                {room.name}
              </h3>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Étage {room.floor}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-semibold rounded-full"
                    style={{ color: colors.teal, backgroundColor: `${colors.teal}15` }}>
                {room.room_type}
              </span>
              {room.bed_type && (
                <span className="px-3 py-1 text-sm font-semibold rounded-full"
                      style={{ color: colors.gold, backgroundColor: `${colors.gold}15` }}>
                  {room.bed_type}
                </span>
              )}
            </div>
          </div>

          {/* Métriques visuelles */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl border-2 border-dashed transition-all duration-300 hover:border-solid"
                 style={{ borderColor: `${colors.teal}30`, backgroundColor: `${colors.teal}05` }}>
              <Users className="h-6 w-6 mx-auto mb-2" style={{ color: colors.teal }} />
              <div className="text-lg font-bold" style={{ color: colors.teal }}>
                {room.num_person}
              </div>
              <div className="text-xs text-gray-600">Personnes</div>
            </div>
            
            <div className="text-center p-3 rounded-xl border-2 border-dashed transition-all duration-300 hover:border-solid"
                 style={{ borderColor: `${colors.gold}30`, backgroundColor: `${colors.gold}05` }}>
              <Maximize className="h-6 w-6 mx-auto mb-2" style={{ color: colors.gold }} />
              <div className="text-lg font-bold" style={{ color: colors.gold }}>
                {room.surface_area}
              </div>
              <div className="text-xs text-gray-600">m²</div>
            </div>

            {room.view && (
              <div className="text-center p-3 rounded-xl border-2 border-dashed transition-all duration-300 hover:border-solid"
                   style={{ borderColor: `${colors.maroon}30`, backgroundColor: `${colors.maroon}05` }}>
                <Eye className="h-6 w-6 mx-auto mb-2" style={{ color: colors.maroon }} />
                <div className="text-sm font-bold capitalize" style={{ color: colors.maroon }}>
                  Vue {room.view}
                </div>
              </div>
            )}
          </div>

          {/* Équipements avec icônes modernes */}
          <div>
            <h4 className="text-lg font-bold mb-3 flex items-center" style={{ color: colors.darkTeal }}>
              <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.gold }} />
              Équipements Premium
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {room.amenities?.slice(0, 6).map((amenity) => (
                <motion.div 
                  key={amenity.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center bg-gradient-to-r from-white to-gray-50 border-l-4 px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                  style={{ borderLeftColor: colors.teal }}
                >
                  <div className="w-5 h-5 relative mr-3 flex-shrink-0">
                    {amenity.name === 'WiFi' && <Wifi className="w-5 h-5" style={{ color: colors.teal }} />}
                    {amenity.name === 'Parking' && <Car className="w-5 h-5" style={{ color: colors.teal }} />}
                    {amenity.name === 'Machine à café' && <Coffee className="w-5 h-5" style={{ color: colors.teal }} />}
                    {amenity.name === 'Salle de bain' && <Bath className="w-5 h-5" style={{ color: colors.teal }} />}
                    {!['WiFi', 'Parking', 'Machine à café', 'Salle de bain'].includes(amenity.name) && (
                      <Image src={amenity.icon} alt={amenity.name} layout="fill" objectFit="contain" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {amenity.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Créneaux avec design moderne */}
          {room.reservation_types.length > 0 && (
            <div>
              <h4 className="text-lg font-bold mb-3" style={{ color: colors.darkTeal }}>
                Créneaux Disponibles
              </h4>
              <div className="space-y-2">
                {room.reservation_types.slice(0, 3).map((type) => (
                  <div key={type.id} 
                       className="flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:border-opacity-60"
                       style={{ backgroundColor: `${colors.lightTeal}50`, borderColor: `${colors.teal}20` }}>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3" style={{ color: colors.teal }} />
                      <span className="font-semibold text-gray-800">{type.name}</span>
                    </div>
                    {type.slots.length > 0 && (
                      <span className="font-bold px-3 py-1 rounded-full text-sm"
                            style={{ color: colors.teal, backgroundColor: `${colors.teal}15` }}>
                        {type.slots[0].checkin_time}h - {type.slots[0].checkout_time}h
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Boutons d'action redessinés */}
          <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewDetails}
              className="flex-1 group/btn relative overflow-hidden px-6 py-4 text-sm font-bold rounded-xl border-2 transition-all duration-300 flex items-center justify-center"
              style={{
                borderColor: colors.teal,
                color: colors.teal,
                backgroundColor: 'transparent',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <Eye className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Voir Détails</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(206,146,38,0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookNow}
              disabled={!isBookable || isBooking}
              className={`flex-1 px-6 py-4 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center ${
                !isBookable || isBooking
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'text-white shadow-lg'
              }`}
              style={{
                background: isBookable && !isBooking 
                  ? `linear-gradient(135deg, ${colors.gold}, ${colors.maroon})` 
                  : undefined,
              }}
            >
              {isBooking ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Chargement...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  <span>{isBookable ? 'Réserver Maintenant' : 'Indisponible'}</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Barre d'accent animée */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ 
            background: `linear-gradient(90deg, ${colors.teal}, ${colors.gold}, ${colors.maroon})`
          }}
        />
      </div>
    </motion.div>
  );
};

export default CardRoom;