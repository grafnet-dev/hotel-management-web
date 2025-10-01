"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Separator } from '../../../components/ui/separator';
import { 

  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Wifi, 
  BedDouble, 

  Download, 
  MessageCircle, 
  Settings, 
  Edit3, 
  Trash2, 

  Gift, 
  TrendingUp,
  History,
 
  Search,
  Bell,

  Camera,
  Sparkles,
  Crown,
 
  
  DollarSign,
  Package,
  Utensils,
  Car,
  Shirt,
  Coffee,
  Droplets
} from 'lucide-react';
import {  useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProfileEditModal } from '../../../components/client/ProfileEditModal';
import { SettingsModal } from '../../../components/client/SettingsModal';
import { ServiceOrderModal } from '../../../components/client/ServiceOrderModal';

// Nouvelles couleurs et typographie
const colors = {
  primary: '#014d71',
  secondary: '#f0b800',
  primaryLight: '#0a5d85',
  secondaryLight: '#f5c842',
  white: '#ffffff',
  gray: '#f8f9fa',
  lightGray: '#e9ecef',
  darkGray: '#6c757d',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545'
};

const fonts = {
  primary: 'Poppins, sans-serif',
  secondary: 'Times New Roman, serif'
};

interface Reservation {
  id: number;
  roomId: number;
  roomName: string;
  roomImage: string;
  roomType: string;
  wifiCode: string;
  reservationType: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  adults: number;
  children: Array<{ age: number }>;
  guestInfo: Record<string, unknown>;
  specialRequests: string;
  totalPrice: number;
  paidAmount: number;
  remainingAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  duration: string;
}

interface ServiceOrder {
  id: string;
  category: string;
  service: string;
  price: number;
  quantity: number;
  status: 'pending' | 'confirmed' | 'completed';
  orderedAt: string;
  completedAt?: string;
  notes?: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  loyaltyPoints: number;
  memberSince: string;
  totalStays: number;
  totalSpent: number;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
    newsletter: boolean;
  };
}



const SERVICES_CATEGORIES = {
  spa: {
    name: 'Spa & Bien-être',
    icon: Sparkles,
    color: colors.primary,
    services: [
      { name: 'Massage relaxant', price: 25000, duration: '60 min', description: 'Massage complet du corps' },
      { name: 'Massage thérapeutique', price: 35000, duration: '90 min', description: 'Massage médical spécialisé' },
      { name: 'Soin du visage', price: 20000, duration: '45 min', description: 'Nettoyage et hydratation' },
      { name: 'Manucure/Pédicure', price: 15000, duration: '60 min', description: 'Soins des ongles complets' },
      { name: 'Sauna', price: 8000, duration: '30 min', description: 'Séance de sauna privé' }
    ]
  },
  restaurant: {
    name: 'Restaurant',
    icon: Utensils,
    color: colors.secondary,
    services: [
      { name: 'Petit-déjeuner continental', price: 8000, duration: '7h-10h', description: 'Buffet complet' },
      { name: 'Déjeuner 3 services', price: 18000, duration: '12h-15h', description: 'Menu du chef' },
      { name: 'Dîner gastronomique', price: 35000, duration: '19h-22h', description: 'Menu dégustation' },
      { name: 'Cocktail de bienvenue', price: 5000, duration: 'Flexible', description: 'Cocktail signature' },
      { name: 'Plateau fromages', price: 12000, duration: 'Flexible', description: 'Sélection de fromages locaux' }
    ]
  },
  roomservice: {
    name: 'Service en chambre',
    icon: Coffee,
    color: colors.primary,
    services: [
      { name: 'Nettoyage supplémentaire', price: 5000, duration: '30 min', description: 'Nettoyage complet' },
      { name: 'Changement de draps', price: 3000, duration: '15 min', description: 'Draps frais' },
      { name: 'Serviettes supplémentaires', price: 2000, duration: '10 min', description: 'Set de serviettes' },
      { name: 'Amenities premium', price: 8000, duration: '5 min', description: 'Produits de luxe' },
      { name: 'Assistance technique', price: 0, duration: '15 min', description: 'Support technique gratuit' }
    ]
  },
  laundry: {
    name: 'Blanchisserie',
    icon: Shirt,
    color: colors.secondary,
    services: [
      { name: 'Lavage standard', price: 3000, duration: '24h', description: 'Par pièce' },
      { name: 'Lavage express', price: 5000, duration: '4h', description: 'Service rapide' },
      { name: 'Repassage', price: 2000, duration: '2h', description: 'Par pièce' },
      { name: 'Nettoyage à sec', price: 8000, duration: '48h', description: 'Vêtements délicats' },
      { name: 'Service complet', price: 12000, duration: '24h', description: 'Lavage + repassage' }
    ]
  },
  transport: {
    name: 'Transport',
    icon: Car,
    color: colors.primary,
    services: [
      { name: 'Navette aéroport', price: 15000, duration: '45 min', description: 'Aller simple' },
      { name: 'Taxi en ville', price: 8000, duration: '30 min', description: 'Course en ville' },
      { name: 'Location voiture', price: 35000, duration: '24h', description: 'Véhicule standard' },
      { name: 'Chauffeur privé', price: 25000, duration: '4h', description: 'Service personnalisé' },
      { name: 'Transfert gare', price: 10000, duration: '20 min', description: 'Aller simple' }
    ]
  },
  minibar: {
    name: 'Minibar',
    icon: Package,
    color: colors.secondary,
    services: [
      { name: 'Eau minérale', price: 1000, stock: 5, description: '50cl' },
      { name: 'Jus d\'orange', price: 2000, stock: 3, description: '25cl' },
      { name: 'Coca-Cola', price: 1500, stock: 4, description: '33cl' },
      { name: 'Bière locale', price: 3000, stock: 2, description: '33cl' },
      { name: 'Vin rouge', price: 8000, stock: 1, description: '37.5cl' },
      { name: 'Chocolat', price: 2500, stock: 3, description: 'Tablette 100g' },
      { name: 'Biscuits', price: 1800, stock: 4, description: 'Paquet assortis' },
      { name: 'Cacahuètes', price: 2200, stock: 2, description: 'Sachet 50g' }
    ]
  }
};

const LOYALTY_TIERS = [
  { name: 'Bronze', min: 0, max: 999, discount: 0, color: '#cd7f32' },
  { name: 'Argent', min: 1000, max: 1999, discount: 5, color: '#c0c0c0' },
  { name: 'Or', min: 2000, max: 4999, discount: 10, color: colors.secondary },
  { name: 'Platine', min: 5000, max: 9999, discount: 15, color: '#e5e4e2' },
  { name: 'Diamant', min: 10000, max: Infinity, discount: 20, color: '#b9f2ff' }
];

export default function ClientSpace() {
  const router = useRouter();
  // const userId = params.userId as string;

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+229 97 12 34 56',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    loyaltyPoints: 1250,
    memberSince: '2023-01-15',
    totalStays: 8,
    totalSpent: 450000,
    preferences: {
      language: 'fr',
      currency: 'XOF',
      notifications: true,
      newsletter: true
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  type Service = {
    name: string;
    price: number;
    duration?: string;
    description: string;
    stock?: number;
    category?: string;
  };

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [historyFilter, setHistoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Charger les réservations depuis localStorage
    const savedReservations = localStorage.getItem('userReservations');
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }

    // Charger les commandes de services
    const savedOrders = localStorage.getItem('serviceOrders');
    if (savedOrders) {
      setServiceOrders(JSON.parse(savedOrders));
    }

    // Calculer les points de fidélité basés sur la fréquentation
    calculateLoyaltyPoints();
  }, []);

  const calculateLoyaltyPoints = () => {
    const now = new Date();
    const lastStay = new Date(userProfile.memberSince);
    const daysSinceLastStay = Math.floor((now.getTime() - lastStay.getTime()) / (1000 * 60 * 60 * 24));
    
    let bonusPoints = 0;
    if (daysSinceLastStay <= 30) {
      bonusPoints = 500; // Moins d'un mois
    } else if (daysSinceLastStay <= 60) {
      bonusPoints = 200; // Moins de 2 mois
    }

    setUserProfile(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + bonusPoints
    }));
  };

  const getCurrentTier = () => {
    return LOYALTY_TIERS.find(tier => 
      userProfile.loyaltyPoints >= tier.min && userProfile.loyaltyPoints <= tier.max
    ) || LOYALTY_TIERS[0];
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    const currentIndex = LOYALTY_TIERS.indexOf(currentTier);
    return currentIndex < LOYALTY_TIERS.length - 1 ? LOYALTY_TIERS[currentIndex + 1] : null;
  };

  const handleServiceOrder = (category: string, service: Service, quantity: number, notes?: string) => {
    const newOrder: ServiceOrder = {
      id: Date.now().toString(),
      category,
      service: service.name,
      price: service.price,
      quantity,
      status: 'pending',
      orderedAt: new Date().toISOString(),
      notes
    };

    const updatedOrders = [...serviceOrders, newOrder];
    setServiceOrders(updatedOrders);
    localStorage.setItem('serviceOrders', JSON.stringify(updatedOrders));

    // Ajouter les points de fidélité (1 point par 1000 FCFA dépensés)
    const pointsEarned = Math.floor((service.price * quantity) / 1000);
    setUserProfile(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + pointsEarned,
      totalSpent: prev.totalSpent + (service.price * quantity)
    }));
  };

  const handleDirectPurchase = (service: Service) => {
    handleServiceOrder('minibar', service, 1);
    
    
    const updatedServices = { ...SERVICES_CATEGORIES };
    const item = updatedServices.minibar.services.find(s => s.name === service.name);
    if (item && item.stock) {
      item.stock -= 1;
    }
  };

  const deleteReservation = (reservationId: number) => {
    const updatedReservations = reservations.filter(r => r.id !== reservationId);
    setReservations(updatedReservations);
    localStorage.setItem('userReservations', JSON.stringify(updatedReservations));
  };

const filteredHistory = serviceOrders.filter(order => {
 
  if (!order) return false;
  
  const service = order.service || '';
  const category = order.category || '';
  const search = searchTerm || '';
  
  const matchesFilter = historyFilter === 'all' || order.status === historyFilter;
  const matchesSearch = service.toLowerCase().includes(search.toLowerCase()) ||
                       category.toLowerCase().includes(search.toLowerCase());
  
  return matchesFilter && matchesSearch;
});

  const totalSpentToday = serviceOrders
    .filter(order => new Date(order.orderedAt).toDateString() === new Date().toDateString())
    .reduce((sum, order) => sum + (order.price * order.quantity), 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.gray, fontFamily: fonts.primary }}>
      <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
        {/* Header avec profil */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-6 border-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)` }}>
            <div className="flex flex-col md:flex-row items-center justify-between text-white">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
                    <Image
                      src={userProfile.avatar}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                    style={{ backgroundColor: colors.secondary }}
                    onClick={() => setIsProfileModalOpen(true)}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </motion.div>

                <div>
                  <h1 className="text-3xl font-bold" style={{ fontFamily: fonts.secondary }}>
                    {userProfile.firstName} {userProfile.lastName}
                  </h1>
                  <p className="text-white/80 mb-2">Membre depuis {new Date(userProfile.memberSince).getFullYear()}</p>
                  
                  {/* Niveau de fidélité */}
                  <div className="flex items-center space-x-3">
                    <Badge 
                      className="px-3 py-1 text-sm font-semibold"
                      style={{ 
                        backgroundColor: getCurrentTier().color,
                        color: getCurrentTier().name === 'Or' ? colors.primary : 'white'
                      }}
                    >
                      <Crown className="h-4 w-4 mr-1" />
                      {getCurrentTier().name}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5" style={{ color: colors.secondary }} />
                      <span className="font-bold">{userProfile.loyaltyPoints.toLocaleString()} points</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Modifier profil
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setIsSettingsModalOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </div>
            </div>

            {/* Barre de progression fidélité */}
            {getNextTier() && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-white/80 mb-2">
                  <span>Progression vers {getNextTier()?.name}</span>
                  <span>{userProfile.loyaltyPoints} / {getNextTier()?.min}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: colors.secondary }}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.min(100, (userProfile.loyaltyPoints / (getNextTier()?.min || 1)) * 100)}%` 
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              title: 'Séjours totaux', 
              value: userProfile.totalStays, 
              icon: Calendar, 
              color: colors.primary,
              suffix: ''
            },
            { 
              title: 'Dépenses totales', 
              value: userProfile.totalSpent, 
              icon: DollarSign, 
              color: colors.secondary,
              suffix: ' FCFA'
            },
            { 
              title: 'Aujourd\'hui', 
              value: totalSpentToday, 
              icon: TrendingUp, 
              color: colors.success,
              suffix: ' FCFA'
            },
            { 
              title: 'Remise actuelle', 
              value: getCurrentTier().discount, 
              icon: Gift, 
              color: colors.warning,
              suffix: '%'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}{stat.suffix}
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Onglets principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-12" style={{ backgroundColor: colors.lightGray }}>
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">Vue d&apos;ensemble</TabsTrigger>
            <TabsTrigger value="rooms" className="data-[state=active]:bg-white">Mes Chambres</TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-white">Services</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-white">Facturation</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-white">Historique</TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-white">Contact</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Réservations actives */}
              <Card className="p-6 border-0 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <BedDouble className="h-5 w-5 mr-2" />
                  Réservations Actives
                </h3>
                <div className="space-y-4">
                  {reservations.slice(0, 2).map((reservation) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-4 p-4 rounded-lg"
                      style={{ backgroundColor: colors.gray }}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={reservation.roomImage}
                          alt={reservation.roomName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{reservation.roomName}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(reservation.checkInDate).toLocaleDateString('fr-FR')} - 
                          {new Date(reservation.checkOutDate).toLocaleDateString('fr-FR')}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Wifi className="h-4 w-4" style={{ color: colors.secondary }} />
                          <span className="text-sm font-mono">{reservation.wifiCode}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`${
                          reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          reservation.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {reservation.status === 'confirmed' ? 'Confirmé' :
                         reservation.status === 'partial' ? 'Acompte versé' : 'En attente'}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Services récents */}
              <Card className="p-6 border-0 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <Clock className="h-5 w-5 mr-2" />
                  Services Récents
                </h3>
                <div className="space-y-4">
                  {serviceOrders.slice(0, 3).map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{ backgroundColor: colors.gray }}
                    >
                      <div>
                        <h4 className="font-semibold">{order.service}</h4>
                        <p className="text-sm text-gray-600 capitalize">{order.category}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.orderedAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold" style={{ color: colors.secondary }}>
                          {(order.price * order.quantity).toLocaleString()} FCFA
                        </p>
                        <Badge 
                          className={`${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status === 'completed' ? 'Terminé' :
                           order.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Mes Chambres */}
          <TabsContent value="rooms" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reservations.map((reservation) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={reservation.roomImage}
                        alt={reservation.roomName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge 
                          className={`${
                            reservation.status === 'confirmed' ? 'bg-green-500' :
                            reservation.status === 'partial' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          } text-white`}
                        >
                          {reservation.status === 'confirmed' ? 'Confirmé' :
                           reservation.status === 'partial' ? 'Acompte versé' : 'En attente'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold" style={{ color: colors.primary }}>
                            {reservation.roomName}
                          </h3>
                          <p className="text-gray-600 capitalize">{reservation.roomType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold" style={{ color: colors.secondary }}>
                            {reservation.totalPrice.toLocaleString()} FCFA
                          </p>
                          <p className="text-sm text-gray-600">{reservation.duration}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Type de réservation:</span>
                          <span className="font-medium capitalize">
                            {reservation.reservationType === 'classic' ? 'Classique' :
                             reservation.reservationType === 'day_use' ? 'Day Use' : 'Flexible'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Dates:</span>
                          <span className="font-medium">
                            {new Date(reservation.checkInDate).toLocaleDateString('fr-FR')}
                            {reservation.reservationType === 'classic' && 
                              ` - ${new Date(reservation.checkOutDate).toLocaleDateString('fr-FR')}`
                            }
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Invités:</span>
                          <span className="font-medium">
                            {reservation.adults} adulte{reservation.adults > 1 ? 's' : ''}
                            {reservation.children.length > 0 && 
                              `, ${reservation.children.length} enfant${reservation.children.length > 1 ? 's' : ''}`
                            }
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 flex items-center">
                            <Wifi className="h-4 w-4 mr-1" />
                            Code WiFi:
                          </span>
                          <span className="font-mono font-bold" style={{ color: colors.secondary }}>
                            {reservation.wifiCode}
                          </span>
                        </div>
                      </div>

                      {/* Paiement */}
                      <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: colors.gray }}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Paiement:</span>
                          <span className="font-semibold" style={{ color: colors.success }}>
                            {reservation.paidAmount.toLocaleString()} FCFA payés
                          </span>
                        </div>
                        {reservation.remainingAmount > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Reste à payer:</span>
                            <span className="font-semibold" style={{ color: colors.danger }}>
                              {reservation.remainingAmount.toLocaleString()} FCFA
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => deleteReservation(reservation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {reservations.length === 0 && (
              <Card className="p-12 text-center border-0 shadow-md">
                <BedDouble className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
                  Aucune réservation
                </h3>
                <p className="text-gray-600 mb-6">
                  Vous n&apos;avez pas encore de réservation active.
                </p>
                <Button
                  onClick={() => router.push('/rooms')}
                  style={{ backgroundColor: colors.primary }}
                >
                  Réserver une chambre
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Services */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(SERVICES_CATEGORIES).map(([key, category]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Object.keys(SERVICES_CATEGORIES).indexOf(key) * 0.1 }}
                >
                  <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <category.icon className="h-6 w-6" style={{ color: category.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.services.length} service{category.services.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {category.services.slice(0, 3).map((service, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{service.name}</p>
                            <p className="text-xs text-gray-500">{service.description}</p>
                          </div>
                          <div className="text-right">
                            {key === 'minibar' && 'stock' in service && service.stock !== undefined ? (
                              <Button
                                size="sm"
                                disabled={service.stock === 0}
                                onClick={() => handleDirectPurchase(service)}
                                style={{ 
                                  backgroundColor: service.stock > 0 ? colors.secondary : colors.lightGray,
                                  color: service.stock > 0 ? 'white' : colors.darkGray
                                }}
                              >
                                {service.stock > 0 ? `${service.price.toLocaleString()}` : 'Épuisé'}
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedService({ ...service, category: key });
                                  setIsServiceModalOpen(true);
                                }}
                                style={{ borderColor: category.color, color: category.color }}
                              >
                                {service.price === 0 ? 'Gratuit' : `${service.price.toLocaleString()}`}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {category.services.length > 3 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-4"
                        style={{ color: category.color }}
                      >
                        Voir tous les services ({category.services.length})
                      </Button>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Facturation */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="p-6 border-0 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold" style={{ color: colors.primary, fontFamily: fonts.secondary }}>
                  Facture Détaillée
                </h3>
                <Button
                  variant="outline"
                  style={{ borderColor: colors.secondary, color: colors.secondary }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </Button>
              </div>

              {/* Hébergement */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <BedDouble className="h-5 w-5 mr-2" />
                  Hébergement
                </h4>
                <div className="space-y-3">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: colors.gray }}>
                      <div>
                        <p className="font-medium">{reservation.roomName}</p>
                        <p className="text-sm text-gray-600">
                          {reservation.duration} • {reservation.adults} adulte{reservation.adults > 1 ? 's' : ''}
                          {reservation.children.length > 0 && `, ${reservation.children.length} enfant${reservation.children.length > 1 ? 's' : ''}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{reservation.totalPrice.toLocaleString()} FCFA</p>
                        <p className="text-sm" style={{ color: reservation.paidAmount === reservation.totalPrice ? colors.success : colors.warning }}>
                          {reservation.paidAmount.toLocaleString()} FCFA payés
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Services
                </h4>
                <div className="space-y-3">
                  {serviceOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: colors.gray }}>
                      <div>
                        <p className="font-medium">{order.service}</p>
                        <p className="text-sm text-gray-600 capitalize">
                          {order.category} • Qté: {order.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{(order.price * order.quantity).toLocaleString()} FCFA</p>
                        <Badge 
                          className={`${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status === 'completed' ? 'Payé' :
                           order.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <Separator className="my-6" />
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Sous-total hébergement:</span>
                  <span>{reservations.reduce((sum, r) => sum + r.totalPrice, 0).toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Sous-total services:</span>
                  <span>{serviceOrders.reduce((sum, o) => sum + (o.price * o.quantity), 0).toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Remise fidélité ({getCurrentTier().discount}%):</span>
                  <span style={{ color: colors.success }}>
                    -{Math.round((reservations.reduce((sum, r) => sum + r.totalPrice, 0) + serviceOrders.reduce((sum, o) => sum + (o.price * o.quantity), 0)) * getCurrentTier().discount / 100).toLocaleString()} FCFA
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-2xl font-bold" style={{ color: colors.primary }}>
                  <span>Total:</span>
                  <span>
                    {Math.round((reservations.reduce((sum, r) => sum + r.totalPrice, 0) + serviceOrders.reduce((sum, o) => sum + (o.price * o.quantity), 0)) * (1 - getCurrentTier().discount / 100)).toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Historique */}
          <TabsContent value="history" className="space-y-6">
            <Card className="p-6 border-0 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h3 className="text-2xl font-semibold" style={{ color: colors.primary, fontFamily: fonts.secondary }}>
                  Historique des Services
                </h3>
                
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher un service..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <select
                    value={historyFilter}
                    onChange={(e) => setHistoryFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                   style={{ outlineColor: colors.primary }}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="completed">Terminé</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {filteredHistory.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg border hover:shadow-md transition-shadow "
                      style={{ backgroundColor: colors.gray }}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                              {(() => {
    const categoryKey = order.category as keyof typeof SERVICES_CATEGORIES;
    const categoryData = SERVICES_CATEGORIES[categoryKey];
    const IconComponent = categoryData?.icon;
    
    return IconComponent ? (
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${categoryData.color}20` }}
      >
        <IconComponent 
          className="h-5 w-5" 
          style={{ color: categoryData.color }}
        />
      </div>
    ) : null;
  })()}

                            <div>
                              <h4 className="font-semibold">{order.service}</h4>
                              <p className="text-sm text-gray-600 capitalize">{order.category}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Qté: {order.quantity}</span>
                            <span>•</span>
                            <span>{new Date(order.orderedAt).toLocaleDateString('fr-FR')} à {new Date(order.orderedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                            {order.notes && (
                              <>
                                <span>•</span>
                                <span className="italic">{order.notes}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold text-lg" style={{ color: colors.secondary }}>
                              {(order.price * order.quantity).toLocaleString()} FCFA
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.price.toLocaleString()} FCFA × {order.quantity}
                            </p>
                          </div>
                          
                          <Badge 
                            className={`${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status === 'completed' ? 'Terminé' :
                             order.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredHistory.length === 0 && (
                <div className="text-center py-12">
                  <History className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
                    Aucun service trouvé
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm || historyFilter !== 'all' 
                      ? 'Aucun service ne correspond à vos critères de recherche.'
                      : 'Vous n\'avez pas encore commandé de services.'
                    }
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-0 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Direct
                </h3>
                <div className="space-y-4">
                  <Button
                    className="w-full justify-start"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler la réception
                  </Button>
                  <Button
                    className="w-full justify-start bg-green-500 hover:bg-green-600"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    style={{ borderColor: colors.secondary, color: colors.secondary }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <MapPin className="h-5 w-5 mr-2" />
                  Informations Pratiques
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Réception:</span>
                    <span className="font-medium">24h/24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">12h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Service:</span>
                    <span className="font-medium">6h00 - 23h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spa:</span>
                    <span className="font-medium">9h00 - 21h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Restaurant:</span>
                    <span className="font-medium">7h00 - 22h00</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Demandes rapides */}
            <Card className="p-6 border-0 shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                <Bell className="h-5 w-5 mr-2" />
                Demandes Rapides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Nettoyage de chambre', icon: Droplets, category: 'roomservice' },
                  { name: 'Serviettes supplémentaires', icon: Package, category: 'roomservice' },
                  { name: 'Assistance technique', icon: Settings, category: 'roomservice' }
                ].map((service) => (
                  <Button
                    key={service.name}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                    onClick={() => {
                      const serviceData = SERVICES_CATEGORIES.roomservice.services.find(s => s.name.includes(service.name.split(' ')[0]));
                      if (serviceData) {
                        setSelectedService({ ...serviceData, category: service.category });
                        setIsServiceModalOpen(true);
                      }
                    }}
                  >
                    <service.icon className="h-6 w-6" />
                    <span className="text-sm text-center">{service.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onSave={setUserProfile}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        userProfile={userProfile}
        onSave={setUserProfile}
      />

      <ServiceOrderModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        service={selectedService}
        onOrder={handleServiceOrder}
      />
    </div>
  );
}