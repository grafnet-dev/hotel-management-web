"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import  sampleRooms  from '../../types';
import  Service  from '../../types';
import RoomList from '../../components/roomlist';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import {
  Space as  Utensils, Dumbbell, Hotel, ArrowRight, ChevronLeft , Wifi,ParkingCircle,Tv2,Baby, Briefcase, Umbrella,
  PhoneCall,Bell,Bath,Waves,Bus,Glasses,ChevronRight,MapPin,Play, Pause,Eye,X, Camera, Star, Heart, Share2
} from 'lucide-react';
import ServiceModal from '../../components/ServiceModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'next/navigation';
import "react-day-picker/style.css";

import BookingSection from '../../components/bookingsection';



const colors = {
  darkTeal: "#1e4e5f",
  teal: "#014d71",
  lightTeal: "#e0f2f1",
  gold: "#f0b800",
  orange: "#f4a261",
  maroon: "#e76f51",
  white: "#ffffff",
  black: "#1a1a1a",
  gray: "#f8f9fa"
};



interface SelectedImage {
  image: Image;
  categoryIndex: number;
  imageIndex: number;
}

interface Image {
  title: string;
  description: string;
  url: string;
}

type DateRange = {
  from?: Date;
  to?: Date;
};

type RoomSelection = {
  id: number;       
  adults: number;   
  children: number; 
};

interface Service {
  title: string;
  description: string;
  icon: React.ReactElement;
}


export default function Home() {

   const router = useRouter();
   const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  

  // Fonction pour ouvrir le modal
 const handleLearnMore = (service: Service) => {
  setSelectedService(service);
  setIsServiceModalOpen(true);
};
  

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
    setSelectedService(null);
  };
     const galleryImages = [
    {
      category: "Chambres",
      icon: "🛏️",
      description: "Confort et élégance dans chaque détail",
      images: [
        {
          url: "/images/chambre1.jpg",
          title: "Suite Présidentielle",
          description: "Vue panoramique sur le lac"
        },
        {
          url: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
          title: "Chambre Deluxe",
          description: "Luxe et modernité"
        },
        {
          url: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
          title: "Chambre Standard Plus",
          description: "Confort authentique"
        },
        {
          url: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
          title: "Suite Familiale",
          description: "Espace généreux"
        }
      ]
    },
    {
      category: "Spa & Bien-être",
      icon: "🧘‍♀️",
      description: "Détente et régénération absolue",
      images: [
        {
          url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Salon de Massage",
          description: "Sérénité et bien-être"
        },
        {
          url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Espace Relaxation",
          description: "Moments de paix"
        },
        {
          url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Cabine de Soins",
          description: "Traitements personnalisés"
        },
        {
          url: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Hammam",
          description: "Expérience thermale"
        }
      ]
    },
    {
      category: "Restaurant",
      icon: "🍽️",
      description: "Saveurs authentiques et raffinées",
      images: [
        {
          url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Restaurant Principal",
          description: "Ambiance chaleureuse"
        },
        {
          url: "https://images.unsplash.com/photo-1552566374-47d02080f4bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Bar Lounge",
          description: "Cocktails signature"
        },
        {
          url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Terrasse",
          description: "Dîner sous les étoiles"
        },
        {
          url: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Cuisine Ouverte",
          description: "Art culinaire en direct"
        }
      ]
    }
  ];
  
const resultsRef = useRef<HTMLDivElement>(null);

const scrollToResults = () => {
  resultsRef.current?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
};

const handleSearch = (params: {
  date: Date | DateRange | undefined;
  rooms: RoomSelection[];
  isDayUse: boolean;
  totalAdults: number;
  totalChildren: number;
}) => {
  console.log(params);
  scrollToResults();
};
  const [activeCategory, setActiveCategory] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
 const [imageLoadStates, setImageLoadStates] = useState<{ [key: string]: 'loaded' | 'error' }>({});
  const [favorites, setFavorites] = useState(new Set());
  const [lightboxImageLoading, setLightboxImageLoading] = useState(false);
const [lightboxImageError, setLightboxImageError] = useState(false);
  

const openLightbox = (imageUrl: string, categoryIndex: number, imageIndex: number) => {
  console.log('Ouverture lightbox:', { imageUrl, categoryIndex, imageIndex });
  
  // Reset des states de chargement
  setLightboxImageLoading(true);
  setLightboxImageError(false);
  
  // Pré-charger l'image avant d'ouvrir le lightbox
  const img = new globalThis.Image();
img.src = imageUrl;
img.onload = () => {
  console.log('Image pré-chargée avec succès');
  setLightboxImageLoading(false);
  setSelectedImage({
    image: galleryImages[categoryIndex].images[imageIndex],
    categoryIndex,
    imageIndex
  });
};
img.onerror = () => {
  console.error('Erreur de chargement de l\'image:', imageUrl);
  setLightboxImageLoading(false);
  setLightboxImageError(true);
};
  img.src = imageUrl;
  
  // Empêcher le scroll du body
  document.body.style.overflow = 'hidden';
};

  const closeLightbox = () => {
  console.log('Fermeture lightbox');
  setSelectedImage(null);
  setLightboxImageLoading(false);
  setLightboxImageError(false);
  
  
  document.body.style.overflow = 'auto';
};

 const navigateImage = (direction: number) => {
  if (!selectedImage) return;
  
  const currentCategory = galleryImages[selectedImage.categoryIndex];
 let newIndex = selectedImage.imageIndex + direction;
  
  if (newIndex < 0) {
    newIndex = currentCategory.images.length - 1;
  } else if (newIndex >= currentCategory.images.length) {
    newIndex = 0;
  }
  
  setSelectedImage({
    ...selectedImage,
    imageIndex: newIndex,
    image: currentCategory.images[newIndex]
  });
};

const toggleFavorite = (categoryIndex: number, imageIndex: number) => {
    const key = `${categoryIndex}-${imageIndex}`;
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(key)) {
        newFavorites.delete(key);
      } else {
        newFavorites.add(key);
      }
      return newFavorites;
    });
  };
  

const handleImageLoad = (categoryIndex: number, imageIndex: number) => {
  setImageLoadStates(prev => ({
    ...prev,
    [`${categoryIndex}-${imageIndex}`]: 'loaded'
  }));
};

const handleImageError = (categoryIndex: number, imageIndex: number) => {
  setImageLoadStates(prev => ({
    ...prev,
    [`${categoryIndex}-${imageIndex}`]: 'error'
  }));
};

// Auto-play effect
useEffect(() => {
  if (isAutoPlay) {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }
}, [isAutoPlay, galleryImages.length]);


  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const swiperRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const randomValues = useRef({
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
  });
  const randomLeft = randomValues.current.left;
console.log(randomLeft); 



const services = [
  {
    title: 'Hébergement de luxe',
    description: 'Chambres spacieuses, climatisées, avec Wi-Fi, TV et service en chambre.',
    icon: <Hotel size={32} />,
  },
  {
    title: 'Restauration',
    description: 'Restaurant gastronomique, buffet et service en chambre 24/7.',
    icon: <Utensils size={32} />,
  },
  {
    title: 'Spa & Bien-être',
    description: 'Massages, soins corporels, hammam et sauna pour votre détente.',
    icon: <Bath  size={32} />,
  },
  {
    title: 'Salle de sport',
    description: 'Espace fitness bien équipé pour garder la forme pendant votre séjour.',
    icon: <Dumbbell size={32} />,
  },
  {
    title: 'Piscine extérieure',
    description: 'Grande piscine avec espace détente et service bar.',
    icon: <Waves size={32} />,
  },
  {
    title: 'Bar & Lounge',
    description: 'Bar élégant avec cocktails, musique et ambiance cosy.',
    icon: <Glasses size={32} />,
  },
  {
    title: 'Navette aéroport',
    description: 'Transferts aller-retour confortables vers l’aéroport.',
    icon: <Bus size={32} />,
  },
  {
    title: 'Réception 24h/24',
    description: 'Accueil chaleureux, check-in rapide et assistance à toute heure.',
    icon: <Bell size={32} />,
  },
  {
    title: 'Wi-Fi haut débit',
    description: 'Connexion rapide et gratuite dans tout l’établissement.',
    icon: <Wifi size={32} />,
  },
  {
    title: 'Parking sécurisé',
    description: 'Parking privé avec vidéosurveillance et gardiennage.',
    icon: <ParkingCircle size={32} />,
  },
  {
    title: 'Télévision par satellite',
    description: 'Accès à des chaînes internationales en HD.',
    icon: <Tv2 size={32} />,
  },
  {
    title: 'Garde d’enfants',
    description: 'Service baby-sitting pour un séjour en toute sérénité.',
    icon: <Baby size={32} />,
  },
  {
    title: 'Conciergerie',
    description: 'Réservations d’activités, taxis, excursions, pressing, etc.',
    icon: < Briefcase size={32} />,
  },
  {
    title: 'Plage privée',
    description: 'Accès direct à la plage avec transats et parasols.',
    icon: <Umbrella size={32} />,
  },
  {
    title: 'Service client',
    description: 'Un personnel dévoué à rendre votre expérience inoubliable.',
    icon: <PhoneCall size={32} />,
  },
];
const carouselImages = [
  {
    url: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    title: "Relacs Zone - Cotonou",
    subtitle: "Vue panoramique sur le lac"
  },
  {
    url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    title: "Région Sud du Bénin",
    subtitle: "Proche de Cotonou, la capitale économique"
  },
  {
    url: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    title: "Relacs Zone - Ouidah",
    subtitle: "Suites de luxe avec terrasse"
  },
  {
    url: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    title: "Chambres Premium",
    subtitle: "Confort et raffinement"
  },
  {
    url: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    title: "Espaces Communs",
    subtitle: "Détente et convivialité"
  }
];
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Auto-play du carousel
  useState(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  });

  

  return (
     <div className="min-h-screen" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="relative h-screen overflow-hidden"
      >
        {/* Background Image with Carousel */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="absolute inset-0">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-7xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Relacs Zone 
            </h1>
           <p className="text-3xl md:text-4xl mb-4 font-light">
              {carouselImages[currentImageIndex].title}
            </p>
            <p className="text-xl md:text-2xl opacity-90 mb-2">
              {carouselImages[currentImageIndex].subtitle}
            </p>
            <div className="flex items-center justify-center space-x-8 text-xl">
              <span className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Cotonou
              </span>
              <span className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Porto-Novo
              </span>
              <span className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Ouidah
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

   
{/* Search Section */}
<div ref={resultsRef}>
  <BookingSection 
    rooms={sampleRooms}
    colors={colors}
    onSearch={handleSearch}
  />
</div>




{/* Rooms Section - Luxury Design */}
<section className="py-1 bg-gradient-to-b from-white to-gray-50 font-sans">
  <div className="mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-6">
      <span className="inline-block px-5 py-2 text-sm font-semibold tracking-wider text-teal-700 bg-teal-100 rounded-full mb-6 uppercase">
        Hébergement exclusif
      </span>
      <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
        Nos Chambres & Suites
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
       Des espaces raffinés où élégance et confort se marient parfaitement
      </p>
    </div>

    
    <RoomList onBookNow={() => console.log('Book now clicked!')} />

    <div className="mt-20 text-center">
      <Button
              onClick={() => router.push('/rooms')}
              className="bg-gradient-to-r from-[#800020] to-[#CE9226] hover:from-[#CE9226] hover:to-[#800020] text-white px-8 py-3"
            >
              Voir toutes nos chambres
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
    </div>
  </div>
</section>

 {/* Section Galerie */}
<section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.teal }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: colors.gold }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Camera size={24} style={{ color: colors.gold }} />
            <span 
              className="text-sm font-bold px-6 py-3 rounded-full tracking-wider uppercase shadow-lg"
              style={{ 
                backgroundColor: colors.lightTeal, 
                color: colors.darkTeal 
              }}
            >
              Galerie Exclusive
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span style={{ color: colors.darkTeal }}>Découvrez </span>
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${colors.teal}, ${colors.gold})` 
              }}
            >
              L&rsquo;Excellence
            </span>
          </h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed mb-12"
            style={{ color: colors.black }}
          >
           Plongez dans un univers o&ugrave; chaque d&eacute;tail raconte une histoire de luxe et de raffinement. 
Explorez nos espaces d&rsquo;exception &agrave; travers cette galerie immersive.
          </motion.p>

          {/* Enhanced Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex bg-white rounded-2xl p-2 shadow-xl backdrop-blur-sm border border-gray-200">
  {galleryImages.map((category, index) => (
    <motion.button
      key={index}
      onClick={() => setActiveCategory(index)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-500 relative ${
        activeCategory === index 
          ? 'text-white shadow-lg transform scale-105' 
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {activeCategory === index && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-xl z-0"
          style={{ backgroundColor: colors.teal }}
          initial={false}
        />
      )}
      <span className="text-lg relative z-10">{category.icon}</span>
      <span className="relative z-10">{category.category}</span>
    </motion.button>
  ))}
</div>
            
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                style={{ color: colors.teal }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
                <span className="text-sm font-semibold">
                  {isAutoPlay ? 'Pause' : 'Auto'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Gallery Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            {/* Category Header */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-between mb-12"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-16 h-1 rounded-full"
                  style={{ backgroundColor: colors.gold }}
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <div>
                  <h3 
                    className="text-3xl md:text-4xl font-bold flex items-center gap-3"
                    style={{ color: colors.darkTeal }}
                  >
                    <span className="text-4xl">{galleryImages[activeCategory].icon}</span>
                    {galleryImages[activeCategory].category}
                  </h3>
                  <p className="text-gray-600 text-lg mt-2">
                    {galleryImages[activeCategory].description}
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-sm text-gray-500">
                  {galleryImages[activeCategory].images.length} images
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages[activeCategory].images.map((image, index) => {
                const imageKey = `${activeCategory}-${index}`;
                const isLoaded = imageLoadStates[imageKey] === 'loaded';
                const hasError = imageLoadStates[imageKey] === 'error';
                const isFavorite = favorites.has(imageKey);
                
                return (
                  <motion.div
                    key={`${activeCategory}-${index}`}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.6,
                      type: "spring",
                      bounce: 0.3
                    }}
                    className={`
                      relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer
                      ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                      ${index === 1 ? 'lg:col-span-2' : ''}
                      ${index === 2 ? 'xl:row-span-2' : ''}
                    `}
                    style={{
                      height: index === 0 ? '400px' : index === 2 ? '350px' : '280px',
                      backgroundColor: colors.gray
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                   onClick={() => openLightbox(image.url, activeCategory, index)}
                  >
                    {/* Loading State */}
                    {!isLoaded && !hasError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                        <Camera size={32} className="text-gray-400" />
                      </div>
                    )}

                    {/* Error State */}
                    {hasError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                        <Camera size={32} className="text-gray-600 mb-2" />
                        <p className="text-sm text-gray-600">Image non disponible</p>
                      </div>
                    )}

                    {/* Image */}
              <Image
  src={image.url}
  alt={image.title}
  width={800}
  height={600}
  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
    isLoaded ? 'opacity-100' : 'opacity-0'
  }`}
  onLoad={() => handleImageLoad(activeCategory, index)}
  onError={() => handleImageError(activeCategory, index)}
/>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(activeCategory, index);
                        }}
                        className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                          isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Share functionality
                        }}
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 size={16} />
                      </motion.button>
                    </div>

                    {/* View Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm"
                          style={{ backgroundColor: `${colors.gold}F0` }}
                        >
                          <Eye size={24} color={colors.white} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="text-lg font-bold mb-1">{image.title}</h4>
                      <p className="text-sm opacity-90">{image.description}</p>
                    </div>

                    {/* Number Badge */}
                    <motion.div 
  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-xl backdrop-blur-sm border-2 border-white/30"
  style={{ 
    backgroundColor: colors.gold,
    color: colors.white
  }}
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ delay: index * 0.1 + 0.5, type: "spring", bounce: 0.6 }}
>
  {index + 1}
</motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {galleryImages.map((category, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="h-2 rounded-full transition-all duration-500 mb-2"
                style={{
                  backgroundColor: index === activeCategory ? colors.gold : colors.lightTeal,
                  width: index === activeCategory ? '40px' : '12px'
                }}
              />
              <span className={`text-xs font-medium transition-opacity duration-300 ${
                index === activeCategory ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
              }`}>
                {category.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Lightbox */}
     <AnimatePresence>
  {(selectedImage || lightboxImageLoading) && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={closeLightbox}
    >
      {/* Loading State */}
      {lightboxImageLoading && (
        <div className="flex flex-col items-center justify-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
          <p className="text-lg">Chargement de l&rsquo;image...</p>
        </div>
      )}

      {/* Error State */}
      {lightboxImageError && (
        <div className="flex flex-col items-center justify-center text-white">
          <Camera size={48} className="mb-4 text-gray-400" />
          <p className="text-lg mb-2">Erreur de chargement</p>
          <p className="text-sm text-gray-400">L&rsquo;image n&rsquo;a pas pu &ecirc;tre charg&eacute;e</p>
          <button
            onClick={closeLightbox}
            className="mt-4 px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Image Content */}
      {selectedImage && !lightboxImageLoading && !lightboxImageError && (
        <>
          {/* Close Button */}
          <motion.button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-[10000] shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={28} className="text-gray-800" />
          </motion.button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-[10000] shadow-lg"
          >
            <ChevronLeft size={28} className="text-gray-800" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-[10000] shadow-lg"
          >
            <ChevronRight size={28} className="text-gray-800" />
          </button>

          {/* Image Container */}
      <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.8, opacity: 0 }}
  className="relative max-w-6xl max-h-[90vh] w-full flex items-center justify-center"
  onClick={(e) => e.stopPropagation()}
>
  <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
<Image
  src={selectedImage.image.url}
  alt={selectedImage.image.title}
  width={1200}
  height={800}
  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
  onLoad={() => {
    console.log('Image du lightbox chargée');
  }}
  onError={(e) => {
    console.error('Erreur lors du chargement dans le lightbox:', e);
    setLightboxImageError(true);
  }}
/>
</div>
            
            {/* Image Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm rounded-xl p-6 z-[10000]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {selectedImage.image.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-2">
                    {selectedImage.image.description}
                  </p>
                  <p className="text-white/60 text-xs">
                    {galleryImages[selectedImage.categoryIndex].category} • 
                    Image {selectedImage.imageIndex + 1} sur {galleryImages[selectedImage.categoryIndex].images.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-white text-sm">4.9</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </motion.div>
  )}
</AnimatePresence>


    </section>


{/* Services Section - Design Premium Enhanced */}
    
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="py-12 md:py-24 overflow-hidden relative"
  style={{ backgroundColor: '#f8f9fa', fontFamily: "'Poppins', sans-serif" }}
>
  {/* Background Decorative Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 rounded-full opacity-5"
      style={{ backgroundColor: '#f0b800' }}
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360] 
      }}
      transition={{ 
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.div
      className="absolute bottom-20 right-20 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-3"
      style={{ backgroundColor: '#014d71' }}
      animate={{ 
        scale: [1.1, 1, 1.1],
        rotate: [360, 180, 0] 
      }}
      transition={{ 
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Animated Header */}
    <motion.div
      className="text-center mb-12 md:mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div className="relative inline-block mb-4 md:mb-6">
        <motion.span
          className="inline-block px-4 py-1 md:px-6 md:py-2 text-xs md:text-sm font-bold rounded-full tracking-wide relative overflow-hidden"
          style={{
            color: '#014d71',
            backgroundColor: 'white',
            border: `2px solid rgba(1, 77, 113, 0.2)`,
            boxShadow: `0 4px 15px rgba(1, 77, 113, 0.1)`
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 6px 20px rgba(1, 77, 113, 0.2)`
          }}
        >
          <span className="relative z-10 flex items-center">
            <motion.div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: '#f0b800' }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            Ce que nous offrons
          </span>
        </motion.span>
      </motion.div>

    <motion.h2
  className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight"
  style={{ color: '#014d71' }}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
  Des services
  {' '} 
  <motion.span 
    className=''
    style={{ 
      background: `linear-gradient(135deg, #f0b800 0%, #e67e22 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    exceptionnels
  </motion.span>
</motion.h2>

      <motion.p
        className="text-base md:text-xl max-w-3xl md:max-w-4xl mx-auto leading-relaxed"
        style={{ color: '#014d71', fontFamily: "'Times New Roman', serif" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Découvrez comment nous rendons votre expérience{" "}
        <motion.span 
          style={{ 
            color: '#014d71',
            fontWeight: '600'
          }}
          whileHover={{ 
            textShadow: `2px 2px 4px rgba(1, 77, 113, 0.2)`
          }}
        >
          inoubliable
        </motion.span>
      </motion.p>

      {/* Decorative Line */}
      <motion.div 
        className="w-16 md:w-24 h-0.5 md:h-1 mx-auto mt-6 md:mt-8 rounded-full"
        style={{ 
          background: `linear-gradient(90deg, #014d71, #f0b800, #014d71)`
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
    </motion.div>

    {/* Enhanced Services Carousel */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="px-2"
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
        }}
        className="py-6 md:py-12"
      >
        {services.map((service, index) => (
          <SwiperSlide key={service.title}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut"
              }}
              className="text-center h-full px-2"
            >
              <motion.div
                className="h-full rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 relative group cursor-pointer"
                style={{
                  backgroundColor: 'white',
                  border: `1px solid rgba(240, 184, 0, 0.2)`,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 15px 30px rgba(1, 77, 113, 0.1), 0 0 0 1px rgba(240, 184, 0, 0.3)`,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="p-6 md:p-8 text-center relative z-10">
                  <motion.div
                    className="mx-auto flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-xl md:rounded-2xl mb-4 md:mb-6 relative group/icon"
                    style={{
                      backgroundColor: 'white',
                      border: `2px solid rgba(240, 184, 0, 0.3)`,
                      color: '#014d71',
                      boxShadow: `0 4px 15px rgba(1, 77, 113, 0.1)`
                    }}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                      boxShadow: `0 8px 25px rgba(1, 77, 113, 0.2)`,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <motion.div 
                      className="h-8 w-8 md:h-10 md:w-10 relative z-10" 
                      whileHover={{ 
                        scale: 1.15,
                      }}
                    >
                      {service.icon && React.cloneElement(service.icon, {
                        className: "h-8 w-8 md:h-10 md:w-10 transition-all duration-300",
                        style: { color: '#014d71' }
                      })}
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    className="text-xl md:text-2xl font-bold mb-3 md:mb-4 transition-all duration-300"
                    style={{ color: '#014d71' }}
                    whileHover={{ 
                      scale: 1.02,
                    }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="mb-6 md:mb-8 leading-relaxed text-sm md:text-base transition-colors duration-300"
                    style={{ color: '#014d71', fontFamily: "'Times New Roman', serif" }}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {service.description}
                  </motion.p>

                 <motion.button
  onClick={() => handleLearnMore(service)}
  className="inline-flex items-center font-semibold transition-all duration-300 relative group/btn px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base"
  style={{ 
    color: '#e67e22',
    border: `1px solid rgba(230, 126, 34, 0.3)`
  }}
  whileHover={{ 
    x: 5,
    backgroundColor: 'rgba(230, 126, 34, 0.08)',
    borderColor: 'rgba(230, 126, 34, 0.5)',
  }}
>
  <span className="relative z-10">En savoir plus</span>
  <motion.div
    className="ml-2"
    animate={{
      x: [0, 3, 0]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <ArrowRight
      className="h-3 w-3 md:h-4 md:w-4 transition-all duration-300"
      style={{ color: '#e67e22' }}
    />
  </motion.div>
</motion.button>
                </div>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>

    {/* Enhanced CTA Button */}
    <motion.div
      className="mt-12 md:mt-20 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.button
        className="relative px-6 py-3 md:px-10 md:py-4 font-bold text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group/cta"
        style={{
          background: `linear-gradient(135deg, #e67e22, #014d71)`,
          color: 'white',
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 10px 25px -5px rgba(230, 126, 34, 0.5)`,
        }}
      >
        <span className="relative z-10 flex items-center justify-center">
          Voir tous nos services
          <motion.div
            className="ml-2 md:ml-3"
            animate={{
              x: [0, 5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </motion.div>
        </span>
      </motion.button>
    </motion.div>
  </div>
</motion.section>
      {/* Restaurant Section */}
      <section className="py-12 md:py-24" style={{ backgroundColor: '#f5f5f5' }}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Texte et informations */}
            <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="font-['Poppins']"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight" style={{ color: '#014d71' }}>
               <span style={{ color: '#f0b800' }}>Savoureux</span> Restaurant
        </h2>
               <p className="mb-4 md:mb-6 text-base md:text-lg leading-relaxed" style={{ color: '#014d71', fontFamily: "'Times New Roman', serif" }}>
          Découvrez une expérience gastronomique unique avec notre chef étoilé.
          Une cuisine qui marie tradition béninoise et techniques modernes,
          préparée avec des produits locaux et de saison.
        </p>

        <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-lg md:rounded-xl border"
          style={{
            backgroundColor: 'rgba(240, 184, 0, 0.07)',
            borderColor: '#f0b800'
          }}>
          <h3 className="font-semibold text-md md:text-lg mb-2 md:mb-3" style={{ color: '#014d71' }}>
            Heures ouvertes :
          </h3>
                <ul className="space-y-1 md:space-y-2" style={{ color: '#014d71', fontFamily: "'Times New Roman', serif" }}>
            <li className="flex items-center text-sm md:text-base">
              <span className="w-20 md:w-30 font-medium">Petit-déjeuner :</span>
              <span>7h00 - 10h30 </span>
            </li>
            <li className="flex items-center text-sm md:text-base">
              <span className="w-20 md:w-24 font-medium">Déjeuner :</span>
              <span>12h00 - 15h00 </span>
            </li>
            <li className="flex items-center text-sm md:text-base">
              <span className="w-20 md:w-24 font-medium">Dîner :</span>
              <span>18h30 - 23h00 </span>
            </li>
          </ul>
        </div>
             <Button
          className="px-6 py-4 md:px-8 md:py-6 text-base md:text-lg rounded-md md:rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: '#f0b800',
            color: '#014d71',
            fontWeight: '600'
          }}
          onClick={() => setIsMenuOpen(true)}
        >
          Découvrir notre menu
        </Button>
              {isMenuOpen && (
                <Link href="/src/app/restaurant/page.tsx" style={{ color: colors.darkTeal }}>
                </Link>
              )}
            </motion.div>

            {/* Image */}
            <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative h-64 sm:h-80 md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl"
      >
        <Image
          src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
          alt="Restaurant béninois"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          width={500} 
          height={500}
          priority
        />

             <div className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(1, 77, 113, 0.2), transparent)`
          }} />


              {/* Badge de spécialités */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full shadow-md"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: `1px solid #f0b800`
          }}>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="font-semibold text-sm md:text-base" style={{ color: '#014d71' }}>
              Spécialités :
            </span>
                   <span className="text-xs md:text-sm" style={{ color: '#014d71', fontFamily: "'Times New Roman', serif" }}>
                    Akassa, Poulet DG, Poisson braisé
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

        {/* Bouton WhatsApp flottant */}
      <WhatsAppButton />

       <ServiceModal 
      service={selectedService } 
      isOpen={isServiceModalOpen} 
      onClose={handleCloseServiceModal} 
    />
    </div>
  );
}