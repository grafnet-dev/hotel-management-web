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

const slideInUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
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



const featureIcons = {
  floor: (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
  ),
  flooring: (
    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    </div>
  ),
  bed: (
    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </div>
  ),
  pets: (
    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
  ),
  smoking: (
    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
      </svg>
    </div>
  ),
  view: (
    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </div>
  ),
  person: (
    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </div>
  ),
  size: (
    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    </div>
  ),
  clock: (
    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
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
    deluxe: `Cette chambre Deluxe offre un espace genereux de ${room.surface_area}m² avec une vue imprenable sur ${room.view}. Le lit ${room.bed_type} vous garantit un sommeil profond, tandis que les materiaux nobles comme le ${room.flooring_type} au sol creent une ambiance chaleureuse et raffinee. Parfaite pour ${room.num_person} personne${room.num_person > 1 ? 's' : ''}, cette chambre allie elegance et fonctionnalite.`,
    suite: `La Suite Presidentielle est un havre de paix de ${room.surface_area}m² avec vue sur ${room.view}. Dotee d un lit ${room.bed_type} et d un sol en ${room.flooring_type}, elle offre un espace luxueux avec des finitions haut de gamme. Ideale pour ${room.num_person} personne${room.num_person > 1 ? 's' : ''}, cette suite incarne l excellence avec des equipements premium.`,
    standard: `Cette chambre confortable de ${room.surface_area}m² avec vue sur ${room.view} propose tout le necessaire pour un sejour agreable. Le lit ${room.bed_type} et le sol en ${room.flooring_type} creent une ambiance chaleureuse. Parfaite pour ${room.num_person} personne${room.num_person > 1 ? 's' : ''}, elle allie simplicite et confort.`
  };

  const getDescription = () => {
    if (room.name.toLowerCase().includes('deluxe')) return roomDescriptions.deluxe;
    if (room.name.toLowerCase().includes('présidentielle') || room.name.toLowerCase().includes('suite')) return roomDescriptions.suite;
    return roomDescriptions.standard;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 flex items-center justify-center backdrop-blur-sm"
        style={{ 
          background: 'linear-gradient(135deg, #56B3FA 0%, #4682B4 100%)'
        }}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-7xl max-h-[98vh] overflow-y-auto shadow-2xl relative"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header avec image et navigation */}
           <div className="relative h-[300px] sm:h-[450px] w-full overflow-hidden rounded-t-2xl">
            <Image
              src={allImages[currentImageIndex]}
              alt={room.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 hover:scale-105"
              priority
            />
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"
            />
            
            {/* Boutons de navigation */}
            {allImages.length > 1 && (
              <>
                <motion.button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 shadow-lg z-10 border border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Image precedente"
                >
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 shadow-lg z-10 border border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Image suivante"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}
            
            {/* Bouton fermer */}
           <motion.button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-white/30 transition-all z-10 border border-white/20"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Fermer"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            {/* Indicateur d'images */}
           {allImages.length > 1 && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-10">
                {allImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectImage(index);
                    }}
                    className={`h-2 rounded-full transition-all backdrop-blur-sm ${
                      currentImageIndex === index 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 w-2 hover:bg-white/70'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Aller a l image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Overlay avec titre */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <motion.div
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <motion.h1 
                    className="text-2xl sm:text-4xl font-bold text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {room.name}
                  </motion.h1>
                  <motion.span
                    className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {room.room_type}
                  </motion.span>
                </div>
                <motion.div
                  className="text-right"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-white">
                    {room.price_per_night?.toLocaleString()}
                  </div>
                  <div className="text-white/80 text-sm">FCFA / nuit</div>
                </motion.div>
              </motion.div>
            </div>
          </div>


          {/* Contenu principal */}
          {room.room_images && room.room_images.length > 0 && (
              <motion.div 
                className="mb-12"
                variants={slideInUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-slate-800 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-blue-600 rounded-lg mr-3"></div>
                  Galerie Photos
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {allImages.map((img, index) => (
                    <motion.div 
                      key={index} 
                      className={`relative h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group ${
                        currentImageIndex === index ? 'ring-4 ring-amber-500 ring-offset-2' : ''
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      onClick={() => selectImage(index)}
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}


            {/* Description et caractéristiques */}
            <div className="p-4 sm:p-8">
            {/* Section Description avec design moderne */}
            <motion.div
              className="mb-12"
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                  Description
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {getDescription()}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center px-4 py-2 bg-white/70 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">
                      Animaux {room.is_pets_allowed ? 'autorises' : 'non autorises'}
                    </span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-white/70 rounded-full">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">
                      {room.is_smoking_allowed ? 'Fumeur autorise' : 'Non fumeur'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

              <motion.div
              className="mb-12"
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-slate-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg mr-3"></div>
                Caracteristiques
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: featureIcons.person, label: `Capacite`, value: `${room.num_person} pers.` },
                  { icon: featureIcons.size, label: `Surface`, value: `${room.surface_area}m²` },
                  { icon: featureIcons.floor, label: `Etage`, value: room.floor || 'RDC' },
                  { icon: featureIcons.flooring, label: `Sol`, value: room.flooring_type },
                  { icon: featureIcons.bed, label: `Lit`, value: room.bed_type },
                  { icon: featureIcons.view, label: `Vue`, value: room.view },
                  { icon: featureIcons.pets, label: `Animaux`, value: room.is_pets_allowed ? 'OK' : 'Non' },
                  { icon: featureIcons.smoking, label: `Fumeur`, value: room.is_smoking_allowed ? 'OK' : 'Non' },
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100"
                    whileHover={{ y: -5, scale: 1.02 }}
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-3">
                      {feature.icon}
                      <span className="ml-3 font-semibold text-slate-800">{feature.label}</span>
                    </div>
                    <div className="text-slate-600 font-medium">{feature.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Équipements */}
             {room.amenities?.length > 0 && (
              <motion.div 
                className="mb-12"
                variants={slideInUp}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-slate-800 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg mr-3"></div>
                  Equipements & Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <motion.div 
                      key={amenity.id} 
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100"
                      whileHover={{ y: -3, scale: 1.02 }}
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-start">
                        <div className="w-12 h-12 relative mr-4 flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Image
                            src={amenity.icon}
                            alt={amenity.name}
                            width={24}
                            height={24}
                            className="filter brightness-0 invert"
                          />
                        </div>
                        <div>
                          <span className="text-slate-800 font-semibold text-lg block">{amenity.name}</span>
                          {amenity.description && (
                            <span className="text-slate-600 text-sm block mt-1">{amenity.description}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tarifs et disponibilité */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-slate-800 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3"></div>
                  Options de Reservation
                </h2>
                <div className="space-y-4">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-800 text-lg">Prix par nuit</p>
                        <p className="text-slate-600 text-sm">Minimum 1 nuit</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-2xl text-blue-600">
                          {room.price_per_night?.toLocaleString()}
                        </span>
                        <span className="text-slate-600 text-sm ml-1">FCFA</span>
                      </div>
                    </div>
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