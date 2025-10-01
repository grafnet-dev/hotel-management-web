"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Star, ArrowRight, Clock, Users, Award } from "lucide-react";
import Image from "next/image";

// Données détaillées pour chaque service avec images Pexels fiables
const serviceDetails = {
  'Hébergement de luxe': {
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    description: "Nos chambres et suites offrent un havre de paix avec des équipements haut de gamme. Chaque espace est conçu pour allier confort, élégance et technologie de pointe. Profitez d'une literie premium, d'une salle de bain en marbre et d'une vue imprenable.",
    features: ["Service en chambre 24h/24", "Mini-bar approvisionné quotidiennement", "Plateforme de streaming intégrée", "Produits d'accueil premium"],
    rating: 4.9,
    category: "Hébergement",
    duration: "Séjour complet",
    capacity: "1-4 personnes"
  },
  'Restauration': {
    image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
    description: "Notre restaurant gastronomique propose une cuisine fusion alliant saveurs locales et internationales. Sous la direction de notre chef étoilé, découvrez des plats préparés avec des produits frais et de saison.",
    features: ["Menu dégustation disponible", "Carte des vins sélectionnée", "Options végétariennes et sans gluten", "Service petit-déjeuner buffet et à la carte"],
    rating: 4.8,
    category: "Gastronomie",
    duration: "7h - 22h",
    capacity: "120 couverts"
  },
  'Spa & Bien-être': {
    image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg",
    description: "Notre centre de bien-être est un sanctuaire dédié à la relaxation et à la régénération. Profitez de soins personnalisés utilisant des produits naturels et des techniques thérapeutiques avancées.",
    features: ["Massages thérapeutiques et relaxants", "Soins visages sur mesure", "Accès au hammam et sauna", "Packages bien-être journée complète"],
    rating: 4.9,
    category: "Bien-être",
    duration: "9h - 20h",
    capacity: "8 cabines"
  },
  'Salle de sport': {
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
    description: "Notre salle de fitness entièrement équipée vous permet de maintenir votre routine d'entraînement même pendant vos vacances. Des coachs professionnels sont disponibles pour des sessions personnalisées.",
    features: ["Équipements Technogym dernière génération", "Cours collectifs (yoga, pilates, cycling)", "Espace cardio et musculation séparés", "Programmes d'entraînement personnalisés"],
    rating: 4.7,
    category: "Fitness",
    duration: "5h - 23h",
    capacity: "40 personnes"
  },
  'Piscine extérieure': {
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    description: "Notre piscine extérieure est un oasis de détente avec vue imprenable. Profitez de notre service bar et de nos transats confortables pour des moments de pure détente.",
    features: ["Piscine chauffée toute l'année", "Service bar et snacks", "Espace lounge avec transats premium", "Douches et vestiaires privatifs"],
    rating: 4.8,
    category: "Loisirs",
    duration: "6h - 22h",
    capacity: "60 personnes"
  },
  'Bar & Lounge': {
    image: "https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg",
    description: "Notre bar lounge vous accueille dans une ambiance chic et décontractée. Découvrez nos cocktails signature et notre sélection de spiritueux d'exception.",
    features: ["Cocktails créatifs et classiques", "Sélection de vins et champagnes", "Ambiance musicale live certains soirs", "Plateaux de fromages et charcuterie"],
    rating: 4.6,
    category: "Bar",
    duration: "17h - 2h",
    capacity: "80 personnes"
  },
  'Navette aéroport': {
    image: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg",
    description: "Notre service de navette vous assure des transferts confortables et ponctuels vers et depuis l'aéroport. Voyagez en toute sérénité.",
    features: ["Véhicules de luxe climatisés", "Service 24h/24", "Réservation à l'avance recommandée", "Accueil personnalisé avec pancarte"],
    rating: 4.9,
    category: "Transport",
    duration: "24h/24",
    capacity: "8 passagers"
  },
  'Réception 24h/24': {
    image: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg",
    description: "Notre équipe de réception est disponible à toute heure pour répondre à vos besoins et vous assister tout au long de votre séjour.",
    features: ["Check-in/check-out express", "Conciergerie personnalisée", "Réservation d'excursions et activités", "Service multilingue"],
    rating: 4.8,
    category: "Service",
    duration: "24h/24",
    capacity: "Illimité"
  },
  'Wi-Fi haut débit': {
    image: "https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg",
    description: "Restez connecté avec notre Wi-Fi haut débit gratuit disponible dans tout l'établissement. Parfait pour le travail ou le divertissement.",
    features: ["Connexion fibre optique", "Couverture dans toutes les chambres et espaces communs", "Support technique disponible", "Accès sécurisé"],
    rating: 4.7,
    category: "Technologie",
    duration: "24h/24",
    capacity: "Illimité"
  },
  'Parking sécurisé': {
    image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
    description: "Notre parking privé et sécurisé vous offre une tranquillité d'esprit pendant votre séjour. Surveillance 24h/24 et accès facile.",
    features: ["Placement voiturier disponible", "Surveillance vidéo", "Accès par badge sécurisé", "Stationnement pour voitures et motos"],
    rating: 4.5,
    category: "Parking",
    duration: "24h/24",
    capacity: "150 places"
  },
  'Télévision par satellite': {
    image: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg",
    description: "Profitez d'une expérience cinéma dans votre chambre avec nos écrans HD et l'accès à des centaines de chaînes internationales.",
    features: ["Écrans LED 4K", "Chaînes internationales", "Service de vidéo à la demande", "Connexion streaming intégrée"],
    rating: 4.6,
    category: "Divertissement",
    duration: "24h/24",
    capacity: "Toutes chambres"
  },
  'Garde enfants': {
    image: "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg",
    description: "Notre service de garde d'enfants qualifié vous permet de profiter de moments en toute tranquillité pendant que vos enfants sont entre de bonnes mains.",
    features: ["Personnel qualifié et expérimenté", "Activités ludiques et éducatives", "Horaires flexibles", "Espace dédié sécurisé"],
    rating: 4.9,
    category: "Famille",
    duration: "8h - 22h",
    capacity: "12 enfants"
  },
  'Conciergerie': {
    image: "https://images.pexels.com/photos/7005462/pexels-photo-7005462.jpeg",
    description: "Notre conciergerie experte est à votre disposition pour organiser tous les aspects de votre séjour, des réservations aux recommendations locales.",
    features: ["Réservation de restaurants et spectacles", "Organisation de transports", "Conseils personnalisés", "Service en plusieurs langues"],
    rating: 4.8,
    category: "Conciergerie",
    duration: "7h - 23h",
    capacity: "Personnalisé"
  },
  'Plage privée': {
    image: "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg",
    description: "Accédez directement à notre plade privée réservée exclusivement à nos clients. Un paradis de sable fin et d'eaux cristallines.",
    features: ["Transats et parasols de luxe", "Service de boissons et snacks", "Activités nautiques", "Douches et vestiaires"],
    rating: 4.9,
    category: "Plage",
    duration: "6h - 19h",
    capacity: "100 personnes"
  },
  'Service client': {
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg",
    description: "Notre équipe dévouée est disponible 24h/24 pour répondre à tous vos besoins et rendre votre séjour parfaitement mémorable.",
    features: ["Assistance personnalisée", "Résolution rapide des demandes", "Service multilingue", "Attention aux détails"],
    rating: 4.9,
    category: "Support",
    duration: "24h/24",
    capacity: "Illimité"
  }
};

type ServiceKey = keyof typeof serviceDetails;

interface ServiceModalProps {
  service: { title: string; icon: React.ReactNode } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  if (!service) return null;

  const serviceKey = service.title as ServiceKey;
  const details = serviceDetails[serviceKey];
  
  if (!details) {
    console.warn(`Service details not found for: ${service.title}`);
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        .modal-content {
          font-family: 'Poppins', sans-serif;
        }
        
        .modal-title {
          font-family: 'Times New Roman', serif;
        }
        
        .modal-description {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="bg-white rounded-2xl md:rounded-3xl overflow-hidden w-full max-w-6xl max-h-[90vh] md:max-h-[85vh] shadow-2xl modal-content mx-auto my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Section Image - Gauche */}
                  <div className="lg:w-5/12 relative">
                    <div className="relative h-64 md:h-80 lg:h-full">
                      <Image
                        src={details.image}
                        alt={service.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                        priority
                      />
                      
                      {/* Overlay dégradé */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
                      
                      {/* Badge Premium */}
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute top-4 left-4 md:top-6 md:left-6"
                      >
                        <div 
                          className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white font-semibold text-xs md:text-sm shadow-lg backdrop-blur-sm border border-white/20"
                          style={{ backgroundColor: '#f0b800' }}
                        >
                          ⭐ {details.category}
                        </div>
                      </motion.div>

                      {/* Rating */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-4 left-4 md:bottom-6 md:left-6"
                      >
                        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={`${i < Math.floor(details.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span 
                            className="font-bold text-xs md:text-sm"
                            style={{ color: '#014d71' }}
                          >
                            {details.rating}
                          </span>
                        </div>
                      </motion.div>

                      {/* Bouton Fermer */}
                      <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                      >
                        <X size={16} className="text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Section Contenu - Droite */}
                  <div className="lg:w-7/12 flex flex-col">
                    <div className="p-6 md:p-8 lg:p-10 flex-1 overflow-y-auto">
                      {/* En-tête */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 md:mb-8"
                      >
                        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                          <div 
                            className="p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg flex-shrink-0"
                            style={{ backgroundColor: '#014d71', color: 'white' }}
                          >
                            {service.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h2 
                              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 modal-title truncate"
                              style={{ color: '#014d71' }}
                            >
                              {service.title}
                            </h2>
                            <p className="text-gray-600 font-medium text-sm md:text-base">Service Premium • Excellence Garantie</p>
                          </div>
                        </div>

                        {/* Infos rapides */}
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                          <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-xs md:text-sm">
                            <Clock size={14} className="text-gray-600 flex-shrink-0" />
                            <span className="font-medium text-gray-700 truncate">{details.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-xs md:text-sm">
                            <Users size={14} className="text-gray-600 flex-shrink-0" />
                            <span className="font-medium text-gray-700 truncate">{details.capacity}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-xs md:text-sm">
                            <Award size={14} className="text-gray-600 flex-shrink-0" />
                            <span className="font-medium text-gray-700">Certifié</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6 md:mb-8"
                      >
                        <h3 
                          className="text-lg md:text-xl font-bold mb-3 md:mb-4 modal-title"
                          style={{ color: '#014d71' }}
                        >
                          Description du Service
                        </h3>
                        <p className="text-gray-700 leading-relaxed modal-description text-sm md:text-base">
                          {details.description}
                        </p>
                      </motion.div>

                      {/* Services inclus */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6 md:mb-8"
                      >
                        <h3 
                          className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 modal-title"
                          style={{ color: '#014d71' }}
                        >
                          <CheckCircle size={20} style={{ color: '#f0b800' }} />
                          Services Inclus
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                          {details.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 * index + 0.5 }}
                              className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-200"
                            >
                              <div 
                                className="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                                style={{ backgroundColor: '#f0b800' }}
                              >
                                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-gray-700 font-medium modal-description text-sm md:text-base">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Actions - Footer fixe */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="px-4 md:px-6 lg:px-8 py-4 md:py-5 border-t border-gray-100 sticky bottom-0"
                      style={{ backgroundColor: '#f8fafc' }}
                    >
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
                          style={{ 
                            backgroundColor: '#014d71',
                            fontFamily: 'Poppins, sans-serif'
                          }}
                        >
                          Réserver
                          <ArrowRight size={18} className="hidden sm:block" />
                        </motion.button>
                        <button
                          onClick={onClose}
                          className="px-4 md:px-6 py-3 md:py-4 border-2 text-gray-700 rounded-xl md:rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 text-sm md:text-base"
                          style={{ 
                            borderColor: '#014d71',
                            color: '#014d71',
                            fontFamily: 'Poppins, sans-serif'
                          }}
                        >
                          Fermer
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceModal;