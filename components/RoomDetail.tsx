import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MoonIcon,ClockIcon,SunIcon } from '@heroicons/react/24/solid';
import { Room } from '../types';


const colors = {
  darkTeal: "#1e4e5f",
  teal: "#005D7C",
  lightTeal: "#e0f2f1",
   gold: "#CE9226",
  orange: "#f4a261",
  maroon: "#e76f51",
   darkMaroon: "#...your desired color code...", 
  white: "#ffffff",
  black: "#1a1a1a",
  gray: "#f8f9fa"
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bashny+Script&display=swap');
        .font-bashny { font-family: 'Bashny Script', cursive; }
        .font-arial { font-family: Arial, sans-serif; }
        body { overflow: hidden; }
      `}</style>
      
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto p-1 sm:p-4 flex items-start sm:items-center justify-center"
        style={{ 
          background: 'linear-gradient(135deg, rgba(30, 78, 95, 0.95) 0%, rgba(0, 93, 124, 0.98) 50%, rgba(206, 146, 38, 0.15) 100%)',
          backdropFilter: 'blur(12px)'
        }}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-7xl max-h-[100vh] sm:max-h-[98vh] overflow-y-auto relative shadow-2xl"
          style={{
            boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)'
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header avec image et navigation */}
          <div className="relative h-[280px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
            <Image
              src={allImages[currentImageIndex]}
              alt={room.name}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-1000 hover:scale-110"
              priority
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 78, 95, 0.1) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.7) 100%)'
              }}
            />
           {/* Boutons de navigation */}
            {allImages.length > 1 && (
              <>
                <motion.button 
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/25 backdrop-blur-lg hover:bg-white/35 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-2xl z-10 border border-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  whileHover={{ scale: 1.1, x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Image précédente"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button 
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/25 backdrop-blur-lg hover:bg-white/35 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-2xl z-10 border border-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  whileHover={{ scale: 1.1, x: 3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Image suivante"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}
            
            {/* Bouton fermer */}
           <motion.button 
              onClick={onClose}
              className="absolute top-2 sm:top-6 right-2 sm:right-6 bg-white/25 backdrop-blur-lg rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-2xl hover:bg-white/35 transition-all z-10 border border-white/30"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Fermer"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            {/* Indicateur d'images */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center space-x-2 sm:space-x-4 z-10">
                {allImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectImage(index);
                    }}
                    className={`h-2 sm:h-3 rounded-full transition-all backdrop-blur-sm border border-white/30 ${
                      currentImageIndex === index 
                        ? 'bg-white w-6 sm:w-12 shadow-lg' 
                        : 'bg-white/60 w-2 sm:w-3 hover:bg-white/80 hover:w-3 sm:hover:w-6'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            {/* Overlay avec titre */}
             <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-12">
              <motion.div
                className="flex flex-col gap-4 sm:gap-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-1">
                  <motion.h1 
                    className="font-bashny text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 drop-shadow-2xl"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}
                  >
                    {room.name}
                  </motion.h1>
                  <motion.span
                    className="inline-block px-3 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-lg rounded-xl sm:rounded-2xl text-white text-sm sm:text-base font-arial font-semibold border border-white/30 shadow-xl"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {room.room_type}
                  </motion.span>
                </div>
                <motion.div
                  className="bg-white/15 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl self-start"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="font-bashny text-2xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                    {room.price_per_night?.toLocaleString()}
                  </div>
                  <div className="text-white/90 text-xs sm:text-sm font-arial font-medium">FCFA / nuit</div>
                </motion.div>
              </motion.div>
            </div>
          </div>



          {/* Contenu principal */}
           <div className="p-4 sm:p-8 lg:p-12 pb-32 sm:pb-40">
            
            {/* Galerie Photos */}
            {room.room_images && room.room_images.length > 0 && (
              <motion.div 
                className="mb-8 sm:mb-16"
                variants={slideInUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <h2 className="font-bashny text-xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-12 flex items-center" style={{ color: colors.darkTeal }}>
                  <div 
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl mr-3 sm:mr-6 shadow-xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.orange} 100%)` 
                    }}
                  />
                  Galerie Photos
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6">
                  {allImages.map((img, index) => (
                    <motion.div 
                      key={index} 
                      className={`relative h-24 sm:h-32 lg:h-40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group ${
                        currentImageIndex === index ? 'ring-2 sm:ring-4 ring-offset-2 sm:ring-offset-4 scale-105 ring-gold' : ''
                      }`}
                      whileHover={{ scale: 1.05, y: -4 }}
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
                        className="transition-transform duration-700 group-hover:scale-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description et caractéristiques */}
           
            
            {/* Section Description avec design moderne */}
            <motion.div
              className="mb-8 sm:mb-16"
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <div 
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border-2 shadow-2xl relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${colors.lightTeal} 0%, rgba(224, 242, 241, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)`,
                  borderColor: colors.teal + '20'
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 opacity-5 transform rotate-12">
                  <div 
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: colors.gold }}
                  />
                </div>
                
                <h2 className="font-bashny text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 flex items-center" style={{ color: colors.darkTeal }}>
                  <div 
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl mr-3 sm:mr-6 shadow-xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.darkTeal} 100%)` 
                    }}
                  />
                  Description
                </h2>
                <p className="font-arial text-sm sm:text-lg leading-relaxed mb-4 sm:mb-8" style={{ color: colors.black }}>
                  {getDescription()}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-white/80 rounded-xl sm:rounded-2xl border border-green-200 shadow-lg">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full mr-2 sm:mr-3 shadow-sm"></div>
                    <span className="font-arial text-xs sm:text-sm font-semibold text-slate-700">
                      Animaux {room.is_pets_allowed ? 'autorisés' : 'non autorisés'}
                    </span>
                  </div>
                  <div className="flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-white/80 rounded-xl sm:rounded-2xl border border-red-200 shadow-lg">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full mr-2 sm:mr-3 shadow-sm"></div>
                    <span className="font-arial text-xs sm:text-sm font-semibold text-slate-700">
                      {room.is_smoking_allowed ? 'Fumeur autorisé' : 'Non fumeur'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mb-8 sm:mb-16"
              variants={slideInUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <h2 className="font-bashny text-xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-12 flex items-center" style={{ color: colors.darkTeal }}>
                <div 
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl mr-3 sm:mr-6 shadow-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.orange} 100%)` 
                  }}
                />
                Caractéristiques
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {[
                  { icon: featureIcons.person, label: 'Capacité', value: `${room.num_person} pers.` },
                  { icon: featureIcons.size, label: 'Surface', value: `${room.surface_area}m²` },
                  { icon: featureIcons.floor, label: 'Étage', value: room.floor || 'RDC' },
                  { icon: featureIcons.flooring, label: 'Sol', value: room.flooring_type },
                  { icon: featureIcons.bed, label: 'Lit', value: room.bed_type },
                  { icon: featureIcons.view, label: 'Vue', value: room.view },
          { icon: featureIcons.pets, label: 'Animaux', value: room.is_pets_allowed ? 'Autorisés' : 'Non' },
          { icon: featureIcons.smoking, label: 'Fumeur', value: room.is_smoking_allowed ? 'Autorisé' : 'Non' },
        ].map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all border border-slate-100 relative overflow-hidden group"
            whileHover={{ y: -8, scale: 1.02 }}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <div 
                className="w-full h-full rounded-full"
                style={{ backgroundColor: colors.teal }}
              />
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <span className="font-arial font-bold text-lg mb-2" style={{ color: colors.darkTeal }}>
                {feature.label}
              </span>
              <div className="font-arial text-slate-600 font-semibold text-base">
                {feature.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>


            {/* Équipements */}
             {room.amenities?.length > 0 && (
              <motion.div 
                className="mb-16"
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
  className="mb-16"
  variants={slideInUp}
  initial="hidden"
  animate="visible"
  custom={2}
>
  <div>
    <h2 className="font-bashny text-3xl sm:text-4xl font-bold mb-8 flex items-center" style={{ color: colors.darkTeal }}>
      <div className="w-12 h-12 rounded-2xl mr-6 shadow-xl gradient-maroon" />
      Options de Réservation
    </h2>
    
    <div className="grid md:grid-cols-3 gap-6">
      {/* Option Nuitée */}
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-100 relative overflow-hidden"
        whileHover={{ y: -5 }}
      >
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform rotate-12 transition-transform duration-300">
          <div className="w-full h-full rounded-full bg-blue-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
              <MoonIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bashny text-xl font-bold" style={{ color: colors.darkTeal }}>
              Séjour Nuitée
            </h3>
          </div>
          
          <div className="mb-4">
            <div className="flex items-baseline">
              <span className="font-bashny text-3xl font-bold text-blue-600">
                {room.price_per_night?.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm ml-2">FCFA</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">par nuit • minimum 1 nuit</p>
          </div>
                      <div className="pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm mb-2">Total pour 1 nuit:</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-blue-600">
                {room.price_per_night?.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm">FCFA</span>
            </div>
          </div>
        </div>
                  </motion.div>

                 {room.hourly_rate && (
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-teal-100 relative overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform rotate-12 transition-transform duration-300">
            <div className="w-full h-full rounded-full" style={{ backgroundColor: colors.teal }} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-md"
                style={{ background: `linear-gradient(to bottom right, ${colors.teal}, ${colors.darkTeal})` }}
              >
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bashny text-xl font-bold" style={{ color: colors.darkTeal }}>
                Tarif Horaire
              </h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline">
                <span className="font-bashny text-3xl font-bold" style={{ color: colors.teal }}>
                  {room.hourly_rate?.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm ml-2">FCFA/h</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">Minimum 3 heures</p>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm mb-2">Total pour 3 heures:</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg" style={{ color: colors.teal }}>
                  {(room.hourly_rate * 3)?.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm">FCFA</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}


                 {room.is_day_use && (
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-maroon-100 relative overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform rotate-12 transition-transform duration-300">
            <div className="w-full h-full rounded-full" style={{ backgroundColor: colors.maroon }} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-md"
                style={{ background: `linear-gradient(to bottom right, ${colors.maroon}, ${colors.darkMaroon})` }}
              >
                <SunIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bashny text-xl font-bold" style={{ color: colors.darkTeal }}>
                Forfait Journée
              </h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline">
                <span className="font-bashny text-3xl font-bold" style={{ color: colors.maroon }}>
                  {room.day_use_price?.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm ml-2">FCFA</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                De {room.day_use_check_in}h à {room.day_use_check_out}h
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm mb-2">Total journée:</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg" style={{ color: colors.maroon }}>
                  {room.day_use_price?.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm">FCFA</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
                </div>
              </div>

              <div>
                <h2 className="font-bashny text-3xl sm:text-4xl font-bold mb-8 flex items-center" style={{ color: colors.darkTeal  }}>
      <div className="w-12 h-12 rounded-2xl mr-6 shadow-xl gradient-maroon" />
      Disponibilité</h2>
                <div className="space-y-4">
                 <motion.div 
      className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Gradient Background Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${colors.teal}, ${colors.lightTeal})`
        }}
      />
      
      <div className="relative p-8">
        <div className="flex items-center mb-4">
          <motion.div 
            className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center mr-6 shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.darkTeal})`
            }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </motion.div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Arrivée
            </p>
            <p className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
              Check-in
            </p>
          </div>
        </div>
        
        <div className="pl-22">
          <p className="text-3xl font-bold mb-2" style={{ color: colors.teal }}>
            {room.default_check_in_time}h00
          </p>
          <p className="text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            À partir de cette heure
          </p>
        </div>
      </div>
      
      {/* Decorative element */}
      <div 
        className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-30"
        style={{ backgroundColor: colors.gold }}
      />
    </motion.div>
                    <motion.div 
      className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${colors.teal}, ${colors.lightTeal})`
        }}
      />
      
      
      
      
                     <div className="relative p-8">
        <div className="flex items-center mb-4">
          <motion.div 
            className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center mr-6 shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.darkTeal})`
            }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Départ
            </p>
            <p className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
              Check-out
            </p>
          </div>
        </div>
                    <div className="pl-22">
          <p className="text-3xl font-bold mb-2" style={{ color: colors.teal }}>
            {room.default_check_out_time}h00
          </p>
          <p className="text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Jusqu'à cette heure
          </p>
        </div>
      </div>
                  <div 
        className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-30"
        style={{ backgroundColor: colors.gold }}
      />
    </motion.div>
  </div>
              </div>
            </motion.div>
          </div>

          {/* Bouton de réservation fixe */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-8 shadow-lg">
           <motion.div 
  className="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300"
  initial={{ y: 100 }}
  animate={{ y: 0 }}
  transition={{ delay: 0.8, duration: 0.6 }}
>
  {/* Backdrop blur effect */}
  <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-t border-gray-200/50" />
  
  <div className="relative p-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Prix section */}
        <motion.div 
          className="text-center sm:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-baseline gap-2 justify-center sm:justify-start">
            <span className="text-4xl font-bold" style={{ color: colors.darkTeal }}>
              {room.price_per_night?.toLocaleString()}
            </span>
            <span className="text-lg font-semibold" style={{ color: colors.gold }}>
              FCFA
            </span>
          </div>
          <p className="text-gray-600 font-medium mt-1">par nuit • Taxes incluses</p>
          
          {/* Rating stars for context */}
          <div className="flex items-center gap-1 mt-2 justify-center sm:justify-start">
            {[...Array(5)].map((_, i) => (
              <motion.svg 
                key={i}
                className="w-4 h-4"
                style={{ color: colors.gold }}
                fill="currentColor" 
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.3 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
            <span className="text-sm text-gray-600 ml-2">Excellent choix</span>
          </div>
        </motion.div>

        {/* Bouton de réservation */}
        <motion.button
          className="group relative overflow-hidden py-5 px-10 rounded-2xl font-bold text-white text-lg shadow-xl hover:shadow-2xl transition-all duration-500 w-full sm:w-auto transform hover:-translate-y-1"
          style={{ 
            background: `linear-gradient(135deg, ${colors.maroon}, ${colors.orange})`,
            minWidth: '280px'
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert(`Réservation de ${room.name}`)}
        >
          {/* Button background animation */}
          <motion.div
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            initial={false}
          />
          
          {/* Button content */}
          <div className="relative flex items-center justify-center gap-3">
            <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="group-hover:tracking-wide transition-all duration-300">
              Réserver maintenant
            </span>
          </div>
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(circle, ${colors.gold}40 0%, transparent 70%)`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0, opacity: 0 }}
            whileTap={{
              scale: 2,
              opacity: [0, 1, 0],
              transition: { duration: 0.6 }
            }}
          />
        </motion.button>
      </div>
      
      {/* Indicateur de sécurité */}
      <motion.div 
        className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Réservation sécurisée • Annulation gratuite 24h</span>
      </motion.div>
    </div>
  </div>
</motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RoomDetail;