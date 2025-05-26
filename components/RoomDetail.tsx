import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Room } from '../types';

const colors = {
  teal: '#2a9d8f',
  gold: '#e9c46a',
  orange: '#f4a261',
  maroon: '#e76f51',
  darkTeal: '#1e4e5f',
  lightTeal: '#e0f2f1',
};

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const modalVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 500,
      duration: 0.5
    } 
  },
  exit: { y: 50, opacity: 0 }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const featureIcons = {
  floor: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  flooring: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  bed: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  pets: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  smoking: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </svg>
  ),
  view: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  person: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  size: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  clock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

type RoomDetailProps = {
  room: Room;
  onClose: () => void;
};

const RoomDetail = ({ room, onClose }: RoomDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [room.image, ...room.room_images.map(img => img.image)];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const roomDescriptions = {
    deluxe: `Cette chambre Deluxe offre un espace généreux de ${room.surface_area}m² avec une vue imprenable sur ${room.view}. Le lit ${room.bed_type} vous garantit un sommeil profond, tandis que les matériaux nobles comme le ${room.flooring_type} au sol créent une ambiance chaleureuse et raffinée. Parfaite pour ${room.num_person} personne${room.num_person > 1 ? 's' : ''}, cette chambre allie élégance et fonctionnalité.`,
    suite: `La Suite Présidentielle est un havre de paix de ${room.surface_area}m² avec vue sur ${room.view}. Dotée d'un lit ${room.bed_type} et d'un sol en ${room.flooring_type}, elle offre un espace luxueux avec des finitions haut de gamme. Idéale pour ${room.num_person} personne${room.num_person > 1 ? 's' : ''}, cette suite incarne l'excellence avec des équipements premium.`,
    standard: `Cette chambre confortable de ${room.surface_area}m² avec vue sur ${room.view} propose tout le nécessaire pour un séjour agréable. Le lit ${room.bed_type} et le sol en ${room.flooring_type} créent une ambiance chaleureuse. Parfaite pour ${room.num_person} personne${room.num_person > 1 ? 's' : ''}, elle allie simplicité et confort.`
  };

  const getDescription = () => {
    if (room.name.toLowerCase().includes('deluxe')) return roomDescriptions.deluxe;
    if (room.name.toLowerCase().includes('présidentielle') || room.name.toLowerCase().includes('suite')) return roomDescriptions.suite;
    return roomDescriptions.standard;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header avec image et navigation */}
          <div className="relative h-[400px] w-full">
            <Image
              src={allImages[currentImageIndex]}
              alt={room.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
              priority
            />
            
            {/* Boutons de navigation */}
            {allImages.length > 1 && (
              <>
                <motion.button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Image précédente"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Image suivante"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}
            
            {/* Bouton fermer */}
            <motion.button 
              onClick={onClose}
              className="absolute top-6 right-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Fermer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            {/* Indicateur d'images */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectImage(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Overlay avec titre */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {room.name}
              </motion.h1>
              <motion.div 
                className="flex items-center justify-between"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-white text-lg capitalize">{room.room_type}</span>
                <span className="text-2xl font-bold text-white">
                  {room.price_per_night?.toLocaleString()} FCFA/nuit
                </span>
              </motion.div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="p-8">
            {/* Galerie d'images */}
            {room.room_images && room.room_images.length > 0 && (
              <motion.div 
                className="mb-12"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkTeal }}>Galerie Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allImages.map((img, index) => (
                    <motion.div 
                      key={index} 
                      className={`relative h-40 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer ${currentImageIndex === index ? 'ring-4' : ''}`}
                      style={{ 
                        borderColor: currentImageIndex === index ? colors.teal : 'transparent',
                        borderWidth: '3px'
                      }}
                      whileHover={{ y: -5, scale: 1.03 }}
                      onClick={() => selectImage(index)}
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description et caractéristiques */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkTeal }}>Description</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {getDescription()}
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Les animaux sont {room.is_pets_allowed ? 'les bienvenus' : 'non autorisés'} dans cette chambre, et elle est {room.is_smoking_allowed ? 'accessible aux fumeurs' : 'non-fumeur'}. Enregistrement dès {room.default_check_in_time}h et départ possible jusqu’à {room.default_check_out_time}h.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkTeal }}>Caractéristiques Principales</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: featureIcons.person, label: `Capacité: ${room.num_person} pers.` },
                    { icon: featureIcons.size, label: `Surface: ${room.surface_area}m²` },
                    { icon: featureIcons.floor, label: `Étage: ${room.floor || 'Rez-de-chaussée'}` },
                    { icon: featureIcons.flooring, label: `Sol: ${room.flooring_type}` },
                    { icon: featureIcons.bed, label: `Lit: ${room.bed_type}` },
                    { icon: featureIcons.view, label: `Vue: ${room.view}` },
                    { icon: featureIcons.pets, label: `Animaux: ${room.is_pets_allowed ? 'Autorisés' : 'Non autorisés'}` },
                    { icon: featureIcons.smoking, label: `Fumeur: ${room.is_smoking_allowed ? 'Autorisé' : 'Non autorisé'}` },
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      whileHover={{ x: 5, backgroundColor: colors.lightTeal }}
                    >
                      <span className="mr-3" style={{ color: colors.teal }}>
                        {feature.icon}
                      </span>
                      <span className="text-gray-700 font-medium">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Équipements */}
            {room.amenities?.length > 0 && (
              <motion.div 
                className="mb-12"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkTeal }}>Équipements & Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {room.amenities.map((amenity) => (
                    <motion.div 
                      key={amenity.id} 
                      className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.02, backgroundColor: colors.lightTeal }}
                    >
                      <div className="w-10 h-10 relative mr-4 flex-shrink-0">
                        <Image
                          src={amenity.icon}
                          alt={amenity.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium block">{amenity.name}</span>
                        {amenity.description && (
                          <span className="text-gray-500 text-sm block">{amenity.description}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tarifs et disponibilité */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkTeal }}>Options de Réservation</h2>
                <div className="space-y-4">
                  <motion.div 
                    className="flex justify-between items-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all"
                    whileHover={{ scale: 1.01, backgroundColor: colors.lightTeal }}
                  >
                    <div>
                      <p className="font-medium text-gray-700">Prix par nuit</p>
                      <p className="text-sm text-gray-500">Minimum 1 nuit</p>
                    </div>
                    <span className="font-bold text-xl" style={{ color: colors.teal }}>
                      {room.price_per_night?.toLocaleString()} FCFA
                    </span>
                  </motion.div>

                  {room.hourly_rate && (
                    <motion.div 
                      className="flex justify-between items-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all"
                      whileHover={{ scale: 1.01, backgroundColor: colors.lightTeal }}
                    >
                      <div>
                        <p className="font-medium text-gray-700">Tarif horaire</p>
                        <p className="text-sm text-gray-500">Minimum 3 heures</p>
                      </div>
                      <span className="font-bold text-xl" style={{ color: colors.teal }}>
                        {room.hourly_rate.toLocaleString()} FCFA/h
                      </span>
                    </motion.div>
                  )}

                  {room.is_day_use && (
                    <motion.div 
                      className="flex justify-between items-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all"
                      whileHover={{ scale: 1.01, backgroundColor: colors.lightTeal }}
                    >
                      <div>
                        <p className="font-medium text-gray-700">Forfait jour</p>
                        <p className="text-sm text-gray-500">
                          De {room.day_use_check_in}h à {room.day_use_check_out}h
                        </p>
                      </div>
                      <span className="font-bold text-xl" style={{ color: colors.teal }}>
                        {room.day_use_price?.toLocaleString()} FCFA
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkTeal }}>Disponibilité</h2>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all"
                    whileHover={{ scale: 1.01, backgroundColor: colors.lightTeal }}
                  >
                    <span className="mr-5" style={{ color: colors.teal }}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium text-gray-700">Check-in</p>
                      <p className="text-xl font-semibold" style={{ color: colors.teal }}>
                        À partir de {room.default_check_in_time}h
                      </p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all"
                    whileHover={{ scale: 1.01, backgroundColor: colors.lightTeal }}
                  >
                    <span className="mr-5" style={{ color: colors.teal }}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium text-gray-700">Check-out</p>
                      <p className="text-xl font-semibold" style={{ color: colors.teal }}>
                        Fin à {room.default_check_out_time}h
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bouton de réservation fixe */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <motion.div
              className="max-w-7xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="font-bold text-lg" style={{ color: colors.darkTeal }}>
                    {room.price_per_night?.toLocaleString()} FCFA
                  </p>
                  <p className="text-gray-600">par nuit</p>
                </div>
                <motion.button
                  className="py-4 px-8 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  style={{ 
                    backgroundColor: colors.maroon,
                    minWidth: '250px'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 5px 15px ${colors.maroon}80`
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert(`Réservation de ${room.name}`)}
                >
                  Réserver maintenant
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RoomDetail;