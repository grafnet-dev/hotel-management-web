import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Heart, 
  Eye, 
  MapPin, 
  Users, 
  Maximize, 
  ShoppingBag, 
  Bed,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const colors = {
  teal: "#005D7C",
  gold: "#CE9226",
  maroon: "#e76f51",
};

const CardRoom = ({ room, onViewDetails }: any) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  
  const isBookable = room.is_available && !room.in_maintenance && room.status === 'available';

  const handleBookNow = () => {
    if (!isBookable) return;
    router.push(`/booking/${room.id}`);
  };

  // Fonction pour obtenir le badge de disponibilité
  const getAvailabilityBadge = () => {
    if (room.in_maintenance) {
      return {
        icon: <AlertCircle className="w-3 h-3" />,
        text: "Maintenance",
        color: "bg-orange-100 text-orange-700 border-orange-200"
      };
    }
    if (!room.is_available) {
      return {
        icon: <XCircle className="w-3 h-3" />,
        text: "Indisponible",
        color: "bg-red-100 text-red-700 border-red-200"
      };
    }
    return {
      icon: <CheckCircle className="w-3 h-3" />,
      text: "Disponible",
      color: "bg-green-100 text-green-700 border-green-200"
    };
  };

  const availabilityBadge = getAvailabilityBadge();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden border w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ minHeight: '580px', fontFamily: 'Bahnschrift, sans-serif' }}
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          layout="fill"
          objectFit="cover"
          className={`transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        
        {/* Bouton Favori */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border"
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </motion.button>

        {/* Badge de disponibilité */}
        <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${availabilityBadge.color} backdrop-blur-sm`}>
          {availabilityBadge.icon}
          {availabilityBadge.text}
        </div>

        {/* Prix */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
            <div className="text-2xl font-bold">{room.price_per_night?.toLocaleString()} FCFA</div>
            <div className="text-sm opacity-90">/ nuit</div>
            {room.day_use_price && (
              <div className="text-sm opacity-90 border-t border-white/20 pt-1 mt-1">
                {room.day_use_price.toLocaleString()} FCFA / day use
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Titre et Étage */}
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">{room.name}</h3>
          <span className="text-sm text-gray-500 flex items-center bg-gray-50 px-2 py-1 rounded-full">
            <MapPin className="w-3 h-3 mr-1" />
            Étage {room.floor}
          </span>
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {/* Surface */}
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
            <Maximize className="w-4 h-4 text-teal-600" />
            <span className="font-medium">{room.surface_area} m²</span>
          </div>

          {/* Capacité */}
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
            <Users className="w-4 h-4 text-teal-600" />
            <span className="font-medium">{room.num_person} pers</span>
          </div>
        </div>

        {/* Type de lit */}
        {room.bed_type && (
          <div className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded-lg">
            <Bed className="w-4 h-4 text-blue-600" />
            <span className="font-medium">🛏️ {room.bed_type}</span>
          </div>
        )}

        {/* Check-in & Check-out */}
        {(room.check_in_time || room.check_out_time) && (
          <div className="flex items-center gap-2 text-sm text-gray-700 bg-purple-50 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="font-medium">
              ⏰ Check-in: {room.check_in_time || '14:00'} | Check-out: {room.check_out_time || '12:00'}
            </span>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewDetails}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-teal-50 transition-colors"
          >
            <Eye className="w-4 h-4" /> 
            👁️‍🗨️ Voir Détails
          </motion.button>

          <motion.button
            whileHover={{ scale: isBookable ? 1.05 : 1 }}
            whileTap={{ scale: isBookable ? 0.95 : 1 }}
            onClick={handleBookNow}
            disabled={!isBookable}
            className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center gap-2 transition-all ${
              isBookable 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> 
            Réserver
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CardRoom;