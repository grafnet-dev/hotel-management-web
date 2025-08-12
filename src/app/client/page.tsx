"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Separator } from '../../../components/ui/separator';
import { Input } from '../../../components/ui/input';
import { 
  User, 
  Star, 
  Calendar, 
  CreditCard, 
  Phone, 
  MessageCircle, 
  Settings,
  BedDouble,
  Wifi,
  Users,
  Clock,
  AlertCircle,
  Edit3,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Coffee,

  Bath,
  Download,
  Send,
  Heart,
  Gift,
  Bell,
  Shield,
  Camera,
  X,
  Loader2,
  Banknote,
  Wallet
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

// Couleurs Hôtel du Lac
const colors = {
  teal: '#008080',
  lightTeal: '#E6F2F2',
  darkTeal: '#006666',
  gold: '#FFD700',
  orange: '#FFA500',
  maroon: '#800000',
  white: '#FFFFFF'
};


interface UserInfo {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  loyaltyPoints: number;
  memberSince: string; // Date in ISO format
  totalStays: number;
  favoriteRoom: string; // Could be a room name or ID



  // Add other properties as needed
}


interface Reservation {
  id: string;
  roomId: number;
  roomName: string;
  roomImage: string;
  roomType: string;
  wifiCode?: string;
  reservationType: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  adults: number;
  children: Array<{ age: number }>;
 guestInfo: string | number; 
  specialRequests: string;
  totalPrice: number;
  paidAmount: number;
  remainingAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  duration: string;
}

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  total: number;
  date: string;
  status: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ServiceItem[];
}

interface ServiceItem {
  id: number;
  name: string;
  price: number;
  description: string;
  duration?: string;
  image?: string;
  stock?: number;
  category: string;
  configurable?: {
    time?: boolean; 
    guests?: boolean; 
    notes?: boolean; 
  };
}

const ServicesSection = ({ 
  categories,
  onOrderService,
  onQuickPurchase
}: {
  categories: ServiceCategory[];
  onOrderService: (item: ServiceItem) => void;
  onQuickPurchase: (item: ServiceItem) => void;
}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [stock, setStock] = useState<Record<number, number>>(
    categories.reduce((acc, category) => {
      category.items.forEach(item => {
        if (item.stock !== undefined) {
          acc[item.id] = item.stock;
        }
      });
      return acc;
    }, {} as Record<number, number>)
  );

  const updateStock = (itemId: number, change: number) => {
    setStock(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Navigation latérale */}
      <div className="lg:col-span-1">
        <Card className="p-4 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
            Catégories
          </h3>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-teal-50 text-teal-800'
                    : 'hover:bg-gray-50'
                }`}
                style={{ 
                  backgroundColor: activeCategory === category.id ? colors.lightTeal : 'transparent',
                  color: activeCategory === category.id ? colors.darkTeal : 'inherit'
                }}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Contenu principal */}
      <div className="lg:col-span-3">
        <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.lightTeal }}>
            
            </div>
            <h3 className="text-xl font-semibold" style={{ color: colors.darkTeal }}>
              {currentCategory?.name}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategory?.items.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
                  {item.image && (
                    <div className="relative h-32">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {item.stock !== undefined && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-white/90 text-gray-900 text-xs">
                            Stock: {stock[item.id] || item.stock}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      {item.duration && (
                        <p className="text-xs text-gray-500 mb-2">
                          Durée: {item.duration}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold" style={{ color: colors.teal }}>
                        {item.price > 0 ? `${item.price.toLocaleString()} FCFA` : 'Gratuit'}
                      </span>
                      {item.stock !== undefined ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            if (stock[item.id] > 0) {
                              updateStock(item.id, -1);
                              onQuickPurchase(item);
                            }
                          }}
                          style={{ backgroundColor: colors.orange }}
                          className="text-xs px-2 py-1 h-7"
                          disabled={stock[item.id] <= 0}
                        >
                          {stock[item.id] > 0 ? 'Acheter' : 'Épuisé'}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => onOrderService(item)}
                          style={{ backgroundColor: colors.teal }}
                          className="text-xs px-2 py-1 h-7"
                        >
                          Commander
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default function ClientSpace() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [contactMessage, setContactMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [editingReservation, setEditingReservation] = useState<string | null>(null);
  const [quickPayAmount, setQuickPayAmount] = useState(0);
  const [showQuickPay, setShowQuickPay] = useState(false);
  const [selectedMinibarItem, setSelectedMinibarItem] = useState<ServiceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const serviceCategories: ServiceCategory[] = [
    {
      id: 'minibar',
      name: 'Minibar',
      icon: Coffee,
      items: [
        { id: 1, name: 'Eau minérale', price: 500, description: 'Bouteille 50cl', stock: 5, category: 'Boissons', image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg', configurable: {
          notes: true
        } },
        { id: 2, name: 'Coca-Cola', price: 800, description: 'Canette 33cl', stock: 3, category: 'Boissons', image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg', configurable: {
          notes: true
        } },
        { id: 3, name: 'Jus d\'orange', price: 1200, description: 'Bouteille 25cl', stock: 2, category: 'Boissons', image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg', configurable: {
          notes: true
        } },
        { id: 4, name: 'Bière locale', price: 1500, description: 'Bouteille 33cl', stock: 4, category: 'Alcools', image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg', configurable: {
          notes: true
        } },
        { id: 5, name: 'Vin rouge', price: 3500, description: 'Verre 15cl', stock: 1, category: 'Alcools', image: 'https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg', configurable: {
          notes: true
        } },
        { id: 6, name: 'Chips', price: 600, description: 'Sachet 100g', stock: 6, category: 'Snacks', image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg', configurable: {
          notes: true
        } },
        { id: 7, name: 'Chocolat', price: 1000, description: 'Tablette 100g', stock: 3, category: 'Snacks', image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg', configurable: {
          notes: true
        } },
        { id: 8, name: 'Biscuits', price: 750, description: 'Paquet 200g', stock: 4, category: 'Snacks', image: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg', configurable: {
          notes: true
        } },
      ]
    },
    {
      id: 'spa',
      name: 'Spa & Bien-être',
      icon: Bath,
      items: [
        { id: 9, name: 'Massage relaxant', price: 15000, description: '60 minutes de détente', duration: '1h', category: 'Spa', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 10, name: 'Soin du visage', price: 12000, description: 'Nettoyage et hydratation', duration: '45min', category: 'Spa', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 11, name: 'Enveloppement corps', price: 18000, description: 'Argile et huiles essentielles', duration: '1h30', category: 'Spa', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 12, name: 'Accès piscine', price: 5000, description: 'Accès journée à l\'espace piscine', duration: 'Journée', category: 'Spa', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
      ]
    },
    {
      id: 'restaurant',
      name: 'Restaurant',
      icon: ShoppingCart,
      items: [
        { id: 13, name: 'Petit déjeuner', price: 6500, description: 'Buffet continental', category: 'Nourriture', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 14, name: 'Déjeuner', price: 12000, description: 'Menu du jour', category: 'Nourriture', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 15, name: 'Dîner', price: 15000, description: 'Menu gastronomique', category: 'Nourriture', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 16, name: 'Plateau de fruits', price: 4500, description: 'Fruits de saison', category: 'Nourriture', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
      ]
    },
    {
      id: 'room-service',
      name: 'Room Service',
      icon: Bell,
      items: [
        { id: 17, name: 'Nettoyage express', price: 0, description: 'Service de ménage rapide', category: 'Service', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 18, name: 'Serviettes supplémentaires', price: 0, description: 'Lot de serviettes propres', category: 'Service', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 19, name: 'Réveil programmé', price: 0, description: 'Appel téléphonique à l\'heure demandée', category: 'Service', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
        { id: 20, name: 'Retard check-out', price: 8000, description: 'Prolongation jusqu\'à 16h', duration: '2h', category: 'Service', configurable: {
          time: true,
          guests: true,
          notes: true
        } },
      ]
    }
  ];

  useEffect(() => {
   
    setTimeout(() => {
     
  setUserInfo({
  id: userId,
  name: 'Manoel Sedjro',
  firstName: 'Manoel',
  lastName: 'Sedjro',
  email: 'sedjro@email.com',
  phone: '+229 01 97 12 34 56',
  avatar: 'https://i.pravatar.cc/300?img=2',
  loyaltyPoints: 1250,
  memberSince: '2023-01-15',
  totalStays: 8,
  favoriteRoom: 'Suite Présidentielle'
});

      // Charger les réservations depuis localStorage
      const savedReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
      setReservations(savedReservations);

      // Charger les services depuis localStorage
      const savedServices = JSON.parse(localStorage.getItem('userServices') || '[]');
      setServices(savedServices);

      setIsLoading(false);
    }, 1000);
  }, [userId]);

  

  const getTotalSpent = () => {
    const reservationTotal = reservations.reduce((sum, res) => sum + res.paidAmount, 0);
    const serviceTotal = services.reduce((sum, service) => sum + service.total, 0);
    return reservationTotal + serviceTotal;
  };

  const getPendingAmount = () => {
    return reservations.reduce((sum, res) => sum + res.remainingAmount, 0);
  };

  const processQuickPayment = async () => {
    if (!selectedMinibarItem) return;

    // Simulation du paiement
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Ajouter à la facture
    const newService = {
      id: Date.now(),
      name: selectedMinibarItem.name,
      category: selectedMinibarItem.category,
      price: selectedMinibarItem.price,
      quantity: 1,
      total: selectedMinibarItem.price,
      date: new Date().toISOString(),
      status: 'confirmed'
    };

    setServices(prev => [...prev, newService]);
    localStorage.setItem('userServices', JSON.stringify([...services, newService]));
    setShowQuickPay(false);
    setSelectedMinibarItem(null);

    // Notification de succès
    alert(`${selectedMinibarItem.name} acheté avec succès !`);
  };

  const handleEditReservation = (reservationId: string) => {
    setEditingReservation(editingReservation === reservationId ? null : reservationId);
  };

  const handleDeleteReservation = (reservationId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      const updatedReservations = reservations.filter(r => r.id !== reservationId);
      setReservations(updatedReservations);
      localStorage.setItem('userReservations', JSON.stringify(updatedReservations));
    }
  };

  const updateReservationGuests = (reservationId: string, adults: number, children: Array<{ age: number }>) => {
    const updatedReservations = reservations.map(r => 
      r.id === reservationId ? { ...r, adults, children } : r
    );
    setReservations(updatedReservations);
    localStorage.setItem('userReservations', JSON.stringify(updatedReservations));
  };

  const sendContactMessage = () => {
    if (!contactMessage.trim()) return;
    
    // Simuler l'envoi du message
    alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
    setContactMessage('');
  };

  const submitReview = () => {
    if (!review.trim() || rating === 0) {
      alert('Veuillez donner une note et ajouter un commentaire');
      return;
    }

    // Simuler la soumission de l'avis
    alert('Merci pour votre avis ! Il sera publié après modération.');
    setRating(0);
    setReview('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" style={{ backgroundColor: colors.lightTeal }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: colors.teal }} />
          <p className="text-lg font-medium" style={{ color: colors.darkTeal }}>
            Chargement de votre espace personnel...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32" style={{ backgroundColor: colors.lightTeal }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header avec profil utilisateur */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-6 border-0 shadow-lg overflow-hidden relative" style={{ backgroundColor: colors.white }}>
            {/* Fond décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <div 
                className="w-full h-full rounded-full"
                style={{ background: `linear-gradient(135deg, ${colors.teal}, ${colors.gold})` }}
              />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4" style={{ borderColor: colors.gold }}>
                    <Image
  src={userInfo?.avatar ?? '/default-avatar.jpg'} 
  alt="Profile"
  width={80}
  height={80}
  className="object-cover"
/>
                  </div>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                    style={{ backgroundColor: colors.teal }}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                      {userInfo?.firstName} {userInfo?.lastName}
                    </h1>
                    <Badge className="flex items-center space-x-1" style={{ backgroundColor: colors.gold, color: colors.darkTeal }}>
                      <Shield className="h-3 w-3" />
                      <span>Membre VIP</span>
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-1">{userInfo?.email}</p>
                  <p className="text-gray-600 mb-2">{userInfo?.phone}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center" style={{ color: colors.teal }}>
                      <Star className="h-4 w-4 mr-1" />
                      {userInfo?.loyaltyPoints} points
                    </span>
                   {userInfo?.memberSince && (
  <span>
    Membre depuis {new Date(userInfo.memberSince).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
  </span>
)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.lightTeal }}>
                    <div className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                      {userInfo?.totalStays}
                    </div>
                    <div className="text-xs text-gray-600">Séjours</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.lightTeal }}>
                    <div className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                      {getTotalSpent().toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">FCFA dépensés</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  style={{ borderColor: colors.teal, color: colors.teal }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Paramètres</span>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation par onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto p-1 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="flex flex-col items-center p-3 data-[state=active]:bg-white">
                <User className="h-5 w-5 mb-1" />
                <span className="text-xs">Vue d&rsquo;ensemble</span>
              </TabsTrigger>
              <TabsTrigger value="rooms" className="flex flex-col items-center p-3 data-[state=active]:bg-white">
                <BedDouble className="h-5 w-5 mb-1" />
                <span className="text-xs">Mes Chambres</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex flex-col items-center p-3 data-[state=active]:bg-white">
                <ShoppingCart className="h-5 w-5 mb-1" />
                <span className="text-xs">Services</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex flex-col items-center p-3 data-[state=active]:bg-white">
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs">Facturation</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex flex-col items-center p-3 data-[state=active]:bg-white">
                <MessageCircle className="h-5 w-5 mb-1" />
                <span className="text-xs">Contact</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex flex-col items-center p-3 data-[state=active]:bg-white">
                <Star className="h-5 w-5 mb-1" />
                <span className="text-xs">Avis</span>
              </TabsTrigger>
            </TabsList>

            {/* Vue d'ensemble */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Statistiques */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Réservations actives</p>
                        <p className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                          {reservations.filter(r => r.status === 'confirmed').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.lightTeal }}>
                        <Calendar className="h-6 w-6" style={{ color: colors.teal }} />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total dépensé</p>
                        <p className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                          {getTotalSpent().toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">FCFA</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.lightTeal }}>
                        <Banknote className="h-6 w-6" style={{ color: colors.teal }} />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Points fidélité</p>
                        <p className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                          {userInfo?.loyaltyPoints}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.lightTeal }}>
                        <Gift className="h-6 w-6" style={{ color: colors.teal }} />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Solde à payer</p>
                        <p className="text-2xl font-bold" style={{ color: colors.maroon }}>
                          {getPendingAmount().toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">FCFA</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fee2e2' }}>
                        <AlertCircle className="h-6 w-6" style={{ color: colors.maroon }} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Réservations récentes */}
              <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: colors.darkTeal }}>
                  Réservations récentes
                </h3>
                <div className="space-y-4">
                  {reservations.slice(0, 3).map((reservation, index) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-lg border"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={reservation.roomImage}
                          alt={reservation.roomName}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold" style={{ color: colors.darkTeal }}>
                          {reservation.roomName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(reservation.checkInDate).toLocaleDateString('fr-FR')} - {reservation.duration}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            className={`text-xs ${
                              reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              reservation.status === 'partial' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {reservation.status === 'confirmed' ? 'Confirmé' :
                             reservation.status === 'partial' ? 'Acompte versé' : 'En attente'}
                          </Badge>
                          <span className="text-sm font-medium" style={{ color: colors.teal }}>
                            {reservation.totalPrice.toLocaleString()} FCFA
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Mes Chambres */}
            <TabsContent value="rooms" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                  Mes Réservations de Chambres
                </h2>
                <Button
                  onClick={() => router.push('/rooms')}
                  className="flex items-center space-x-2"
                  style={{ backgroundColor: colors.teal }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle réservation</span>
                </Button>
              </div>

              {reservations.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reservations.map((reservation, index) => (
                      <motion.div
                        key={reservation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="relative h-48">
                            <Image
                              src={reservation.roomImage}
                              alt={reservation.roomName}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge 
                                className={`${
                                  reservation.status === 'confirmed' ? 'bg-green-500' :
                                  reservation.status === 'partial' ? 'bg-orange-500' :
                                  reservation.status === 'pending' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                } text-white`}
                              >
                                {reservation.status === 'confirmed' ? 'Confirmé' :
                                 reservation.status === 'partial' ? 'Acompte versé' :
                                 reservation.status === 'pending' ? 'En attente' : 'Annulé'}
                              </Badge>
                            </div>
                            <div className="absolute top-3 left-3 flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditReservation(reservation.id)}
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteReservation(reservation.id)}
                                className="bg-red-500/20 backdrop-blur-sm hover:bg-red-500/30 text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold" style={{ color: colors.darkTeal }}>
                                  {reservation.roomName}
                                </h3>
                                <p className="text-sm text-gray-600 capitalize">
                                  {reservation.reservationType === 'classic' ? 'Séjour Classique' :
                                   reservation.reservationType === 'day_use' ? 'Day Use' : 'Horaires Flexibles'}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold" style={{ color: colors.teal }}>
                                  {reservation.totalPrice.toLocaleString()} FCFA
                                </div>
                                <div className="text-xs text-gray-500">{reservation.duration}</div>
                              </div>
                            </div>

                            <div className="space-y-3 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>
                                  {new Date(reservation.checkInDate).toLocaleDateString('fr-FR')}
                                  {reservation.reservationType === 'classic' && reservation.checkOutDate !== reservation.checkInDate && 
                                    ` - ${new Date(reservation.checkOutDate).toLocaleDateString('fr-FR')}`
                                  }
                                </span>
                              </div>
                              
                              {reservation.reservationType === 'flexible' && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{reservation.checkInTime} - {reservation.checkOutTime}</span>
                                </div>
                              )}
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span>
                                  {reservation.adults} adulte{reservation.adults > 1 ? 's' : ''}
                                  {reservation.children.length > 0 && 
                                    `, ${reservation.children.length} enfant${reservation.children.length > 1 ? 's' : ''} (${reservation.children.map(c => c.age).join(', ')} ans)`
                                  }
                                </span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Wifi className="h-4 w-4 mr-2" />
                                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                  WiFi: {reservation.wifiCode || 'HOTEL2024'}
                                </span>
                              </div>
                            </div>

                            {reservation.remainingAmount > 0 && (
                              <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-orange-700">Solde restant:</span>
                                  <span className="font-semibold text-orange-700">
                                    {reservation.remainingAmount.toLocaleString()} FCFA
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Édition des invités */}
                            <AnimatePresence>
                              {editingReservation === reservation.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mb-4 p-4 bg-gray-50 rounded-lg"
                                >
                                  <h4 className="font-medium mb-3" style={{ color: colors.darkTeal }}>
                                    Modifier les invités
                                  </h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm">Adultes</Label>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            if (reservation.adults > 1) {
                                              updateReservationGuests(reservation.id, reservation.adults - 1, reservation.children);
                                            }
                                          }}
                                          disabled={reservation.adults <= 1}
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center">{reservation.adults}</span>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            updateReservationGuests(reservation.id, reservation.adults + 1, reservation.children);
                                          }}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-sm">Enfants</Label>
                                      <div className="space-y-2 mt-1">
                                        {reservation.children.map((child, childIndex) => (
                                          <div key={childIndex} className="flex items-center space-x-2">
                                            <span className="text-xs">Enfant {childIndex + 1}:</span>
                                            <Input
                                              type="number"
                                              min="0"
                                              max="17"
                                              value={child.age}
                                              onChange={(e) => {
                                                const newChildren = [...reservation.children];
                                                newChildren[childIndex] = { age: parseInt(e.target.value) };
                                                updateReservationGuests(reservation.id, reservation.adults, newChildren);
                                              }}
                                              className="w-16 h-8 text-xs"
                                            />
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                const newChildren = reservation.children.filter((_, i) => i !== childIndex);
                                                updateReservationGuests(reservation.id, reservation.adults, newChildren);
                                              }}
                                              className="text-red-600 h-8 w-8 p-0"
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        ))}
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            if (reservation.children.length < 3) {
                                              const newChildren = [...reservation.children, { age: 5 }];
                                              updateReservationGuests(reservation.id, reservation.adults, newChildren);
                                            }
                                          }}
                                          disabled={reservation.children.length >= 3}
                                          className="w-full"
                                        >
                                          <Plus className="h-4 w-4 mr-1" />
                                          Ajouter enfant
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="p-12 text-center border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                  <BedDouble className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: colors.darkTeal }}>
                    Aucune réservation
                  </h3>
                  <p className="text-gray-600 mb-6">
                   Vous n&rsquo;avez pas encore de r&eacute;servation. D&eacute;couvrez nos chambres !
                  </p>
                  <Button
                    onClick={() => router.push('/rooms')}
                    style={{ backgroundColor: colors.teal }}
                  >
                    Réserver une chambre
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* Services */}
            <TabsContent value="services" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                  Services Hôteliers
                </h2>
                <Badge className="flex items-center space-x-1" style={{ backgroundColor: colors.lightTeal, color: colors.darkTeal }}>
                  <ShoppingCart className="h-3 w-3" />
                  <span>{services.length} commande{services.length > 1 ? 's' : ''}</span>
                </Badge>
              </div>

              <ServicesSection 
                categories={serviceCategories}
                onOrderService={(item) => {
                  const newService: Service = {
                    id: Date.now(),
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    quantity: 1,
                    total: item.price,
                    date: new Date().toISOString(),
                    status: 'pending'
                  };
                  const updatedServices = [...services, newService];
                  setServices(updatedServices);
                  localStorage.setItem('userServices', JSON.stringify(updatedServices));
                }}
                onQuickPurchase={(item) => {
                  setSelectedMinibarItem(item);
                  setQuickPayAmount(item.price);
                  setShowQuickPay(true);
                }}
              />

              {/* Historique des services */}
              {services.length > 0 && (
                <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: colors.darkTeal }}>
                    Historique des services
                  </h3>
                  <div className="space-y-3">
                    {services.slice(0, 5).map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium" style={{ color: colors.darkTeal }}>
                            {service.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {service.category} • {new Date(service.date).toLocaleDateString('fr-FR')}
                            {service.quantity > 1 && ` • Quantité: ${service.quantity}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold" style={{ color: colors.teal }}>
                            {service.total.toLocaleString()} FCFA
                          </p>
                          <Badge 
                            className={`text-xs ${
                              service.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              service.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {service.status === 'confirmed' ? 'Confirmé' :
                             service.status === 'completed' ? 'Terminé' : 'En attente'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Facturation */}
            <TabsContent value="billing" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                  Facturation
                </h2>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                  style={{ borderColor: colors.teal, color: colors.teal }}
                >
                  <Download className="h-4 w-4" />
                  <span>Télécharger PDF</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Résumé financier */}
                <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
                    Résumé Financier
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hébergement</span>
                      <span className="font-medium">
                        {reservations.reduce((sum, r) => sum + r.totalPrice, 0).toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Services</span>
                      <span className="font-medium">
                        {services.reduce((sum, s) => sum + s.total, 0).toLocaleString()} FCFA
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold" style={{ color: colors.darkTeal }}>
                      <span>Total</span>
                      <span>{getTotalSpent().toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payé</span>
                      <span className="font-medium text-green-600">
                        {reservations.reduce((sum, r) => sum + r.paidAmount, 0).toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Solde</span>
                      <span className="font-medium" style={{ color: colors.maroon }}>
                        {getPendingAmount().toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Détail des factures */}
                <div className="lg:col-span-2">
                  <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
                      Détail des Factures
                    </h3>
                    <div className="space-y-4">
                      {/* Réservations */}
                      {reservations.map((reservation) => (
                        <div key={reservation.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium" style={{ color: colors.darkTeal }}>
                                {reservation.roomName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {new Date(reservation.checkInDate).toLocaleDateString('fr-FR')} - {reservation.duration}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold" style={{ color: colors.teal }}>
                                {reservation.totalPrice.toLocaleString()} FCFA
                              </p>
                              <p className="text-xs text-gray-500">
                                Payé: {reservation.paidAmount.toLocaleString()} FCFA
                              </p>
                            </div>
                          </div>
                          {reservation.remainingAmount > 0 && (
                            <div className="mt-2 p-2 bg-orange-50 rounded text-sm">
                              <span className="text-orange-800">
                                Solde à payer: {reservation.remainingAmount.toLocaleString()} FCFA
                              </span>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Services */}
                      {services.map((service) => (
                        <div key={service.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium" style={{ color: colors.darkTeal }}>
                                {service.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {service.category} • Quantité: {service.quantity} • {new Date(service.date).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                            <p className="font-bold" style={{ color: colors.teal }}>
                              {service.total.toLocaleString()} FCFA
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Contact */}
            <TabsContent value="contact" className="space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                Contactez-nous
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Formulaire de contact */}
                <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
                    Envoyer un message
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Votre message</Label>
                      <textarea
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Décrivez votre demande..."
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: colors.teal }}
                        rows={5}
                      />
                    </div>
                    <Button
                      onClick={sendContactMessage}
                      className="w-full"
                      style={{ backgroundColor: colors.teal }}
                      disabled={!contactMessage.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </div>
                </Card>

                {/* Contacts directs */}
                <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
                    Contacts directs
                  </h3>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      style={{ borderColor: colors.teal, color: colors.teal }}
                    >
                      <Phone className="h-4 w-4 mr-3" />
                      Appeler la réception
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      style={{ borderColor: colors.teal, color: colors.teal }}
                    >
                      <MessageCircle className="h-4 w-4 mr-3" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      style={{ borderColor: colors.teal, color: colors.teal }}
                    >
                      <Send className="h-4 w-4 mr-3" />
                      Email
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: colors.darkTeal }}>
                      Demandes de service rapides
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        style={{ borderColor: colors.teal, color: colors.teal }}
                      >
                        � Nettoyage
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        style={{ borderColor: colors.teal, color: colors.teal }}
                      >
                        🛁 Serviettes
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        style={{ borderColor: colors.teal, color: colors.teal }}
                      >
                        🔧 Assistance
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        style={{ borderColor: colors.teal, color: colors.teal }}
                      >
                        🍽️ Room Service
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Informations pratiques */}
              <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
                  Informations Pratiques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: colors.darkTeal }}>
                      Réception
                    </h4>
                    <p className="text-sm text-gray-600">Ouverte 24h/24</p>
                    <p className="text-sm text-gray-600">Téléphone: +229 XX XX XX XX</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: colors.darkTeal }}>
                      Check-out
                    </h4>
                    <p className="text-sm text-gray-600">Avant 12h00</p>
                    <p className="text-sm text-gray-600">Check-out tardif disponible</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: colors.darkTeal }}>
                      WiFi
                    </h4>
                    <p className="text-sm text-gray-600">Gratuit dans tout l&rsquo;h&ocirc;tel</p>
                    <p className="text-sm text-gray-600">Code chambre affiché ci-dessus</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Avis */}
            <TabsContent value="reviews" className="space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.darkTeal }}>
                Votre Avis
              </h2>

              <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
                  Évaluez votre expérience
                </h3>
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Note globale</Label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="transition-colors"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= rating
                                ? 'fill-current text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Votre commentaire</Label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Partagez votre expérience..."
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.teal }}
                      rows={4}
                    />
                  </div>

                  <Button
                    onClick={submitReview}
                    className="w-full"
                    style={{ backgroundColor: colors.teal }}
                    disabled={!review.trim() || rating === 0}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Publier mon avis
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Modal de paiement rapide */}
      <AnimatePresence>
        {showQuickPay && selectedMinibarItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowQuickPay(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="p-6" style={{ backgroundColor: colors.white }}>
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={selectedMinibarItem.image || '/placeholder-item.jpg'}
                      alt={selectedMinibarItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: colors.darkTeal }}>
                    {selectedMinibarItem.name}
                  </h3>
                  <p className="text-gray-600">{selectedMinibarItem.category}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Prix unitaire:</span>
                    <span className="font-semibold" style={{ color: colors.teal }}>
                      {selectedMinibarItem.price.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg" 
                       style={{ backgroundColor: colors.lightTeal }}>
                    <span className="font-semibold">Total à payer:</span>
                    <span className="text-xl font-bold" style={{ color: colors.darkTeal }}>
                      {quickPayAmount.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowQuickPay(false)}
                    className="flex-1"
                    style={{ borderColor: colors.teal, color: colors.teal }}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={processQuickPayment}
                    className="flex-1"
                    style={{ backgroundColor: colors.teal }}
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Payer maintenant
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}