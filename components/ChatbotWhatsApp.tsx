"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { MessageCircle, X, Send, Plus, Minus, Bot } from 'lucide-react';
import sampleRooms from '../types'; 

// Types
interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  component?: React.ReactNode;
}

interface Child {
  age: number;
}

interface Guests {
  adults: number;
  children: Child[];
}

interface DateData {
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  specialRequests: string;
}

interface Room {
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
  view: string;
  bed_type: string;
  flooring_type: string | boolean;
  image: string;
  is_smoking_allowed: boolean;
  is_pets_allowed: boolean;
  in_maintenance: boolean;
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

interface ReservationData {
  type: 'classique' | 'day-use' | 'flexible' | null;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  adults: number;
  children: Child[];
  selectedRoom: Room | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  specialRequests: string;
}

interface ChatbotWhatsAppProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

// Constants
const TRIGGER_PHRASES = [
  'bonjour', 'bonsoir', 'salut', 'hello', 'hi',
  'je veux réserver', 'réservation', 'réserver',
  'je cherche une chambre', 'chambre disponible',
  'disponibilité', 'tarif', 'prix'
];

const MAX_ADULTS = 4;
const MAX_CHILDREN = 3;
const DEFAULT_CHECK_IN_TIME = '14:00';
const DEFAULT_CHECK_OUT_TIME = '12:00';

// Utility functions (moved to top level)
const calculateNights = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
};

const calculateHours = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  return Math.max(1, endHour - startHour + (endMinute - startMinute) / 60);
};

const generateReservationSummary = (data: ReservationData) => {
  if (!data.selectedRoom) return { finalPrice: 0, duration: '' };

  const room = data.selectedRoom;
  let price = 0;
  let duration = '';

  if (data.type === 'classique') {
    const nights = calculateNights(data.checkInDate, data.checkOutDate);
    price = room.price_per_night * nights;
    duration = `${nights} nuit${nights > 1 ? 's' : ''}`;
  } else if (data.type === 'day-use') {
    price = room.day_use_price;
    duration = `1 journée (${data.checkInTime} - ${data.checkOutTime})`;
  } else if (data.type === 'flexible') {
    const hours = calculateHours(data.checkInTime, data.checkOutTime);
    price = room.hourly_rate * hours;
    duration = `${hours} heure${hours > 1 ? 's' : ''} (${data.checkInTime} - ${data.checkOutTime})`;
  }

  return { finalPrice: price, duration };
};

export function ChatbotWhatsApp({ isOpen, onClose, userInfo }: ChatbotWhatsAppProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('greeting');
  const [reservationData, setReservationData] = useState<ReservationData>({
    type: null,
    checkInDate: '',
    checkOutDate: '',
    checkInTime: DEFAULT_CHECK_IN_TIME,
    checkOutTime: DEFAULT_CHECK_OUT_TIME,
    adults: 2,
    children: [],
    selectedRoom: null,
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    phone: userInfo?.phone || '',
    email: userInfo?.email || '',
    specialRequests: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Helper functions
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const addBotMessage = useCallback((content: string, options?: string[], component?: React.ReactNode) => {
    const timestamp = new Date();
    const newMessage: ChatMessage = {
      id: `bot-${timestamp.getTime()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'bot',
      content,
      timestamp,
      options,
      component
    };
    setMessages(prev => [...prev, newMessage]);
    scrollToBottom();
  }, [scrollToBottom]);

  const addUserMessage = useCallback((content: string) => {
    const timestamp = new Date();
    const newMessage: ChatMessage = {
      id: `user-${timestamp.getTime()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      content,
      timestamp
    };
    setMessages(prev => [...prev, newMessage]);
    scrollToBottom();
  }, [scrollToBottom]);

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "👋 Bonjour ! Bienvenue à l'hôtel Bain du Lac ! Comment puis-je vous aider aujourd'hui ?",
        ['Je veux réserver', 'Voir les tarifs', 'Informations hôtel']
      );
    }
  }, [isOpen, messages.length, addBotMessage]);

  // Handle user input
  const handleUserInput = (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    addUserMessage(trimmedInput);
    setInputValue('');
    processUserInput(trimmedInput.toLowerCase());
  };

  const processUserInput = (input: string) => {
    const containsTrigger = TRIGGER_PHRASES.some(phrase => input.includes(phrase));

    if (input.includes('tarif') || input.includes('prix')) {
      showPricing();
    } 
    else if (input.includes('information') || input.includes('hôtel') || input.includes('hotel')) {
      showHotelInfo();
    }
    else if (containsTrigger || currentStep === 'greeting') {
      if (input.includes('réserver') || input.includes('réservation') || input.includes('chambre')) {
        startReservationProcess();
      } else {
        showDefaultOptions();
      }
    } else {
      addBotMessage(
        "Je ne comprends pas votre demande. Voici ce que je peux faire :",
        ['Réserver une chambre', 'Voir les tarifs', 'Informations hôtel']
      );
    }
  };

  const startReservationProcess = () => {
    setCurrentStep('reservation_type');
    addBotMessage(
      "Parfait ! Quel type de réservation souhaitez-vous ?",
      ['Classique (Nuitée)', 'Day-use (Journée)', 'Flexible (Horaire)']
    );
  };

  const showPricing = () => {
    addBotMessage(
      "Voici nos tarifs :\n" + 
      sampleRooms.map(room => 
        `• ${room.name}: ${room.price_per_night.toLocaleString()} FCFA/nuit (Day-use: ${room.day_use_price.toLocaleString()} FCFA, Flexible: ${room.hourly_rate.toLocaleString()} FCFA/h)`
      ).join('\n'),
      ['Réserver maintenant', 'Voir les photos', 'Retour au menu']
    );
    setCurrentStep('pricing');
  };

  const showHotelInfo = () => {
    addBotMessage(
      "🏨 *Hôtel Bain du Lac*\n\n" +
      "⭐ Classement : 4 étoiles\n" +
      "📍 Localisation : Cotonou, Bénin\n" +
      "🛏️ Chambres : 120\n" +
      "🍽️ Restaurant : Oui\n" +
      "🏊 Piscine : Oui\n" +
      "🅿️ Parking : Gratuit\n\n" +
      "Services : WiFi gratuit, Room service 24h/24, Spa, Navette aéroport",
      ['Réserver maintenant', 'Voir les tarifs', 'Contactez-nous']
    );
    setCurrentStep('info');
  };

  const showDefaultOptions = () => {
    addBotMessage(
      "Je peux vous aider avec :\n• Réservations de chambres\n• Informations sur les tarifs\n• Renseignements sur l'hôtel\n\nQue souhaitez-vous faire ?",
      ['Réserver une chambre', 'Voir les tarifs', 'Informations']
    );
  };

  // Handle option selection
  const handleOptionClick = (option: string) => {
    addUserMessage(option);

    switch (currentStep) {
      case 'greeting':
        if (option.includes('réserver') || option.includes('Réserver')) {
          startReservationProcess();
        } else if (option.includes('tarif')) {
          showPricing();
        } else if (option.includes('Informations')) {
          showHotelInfo();
        }
        break;

      case 'reservation_type':
        handleReservationTypeSelection(option);
        break;
        
      case 'pricing':
        if (option.includes('Réserver')) {
          startReservationProcess();
        } else if (option.includes('photos')) {
          addBotMessage("Vous pouvez voir nos photos sur notre site web : www.baindulac.com/galerie");
        } else {
          showDefaultOptions();
        }
        break;
        
      case 'info':
        if (option.includes('Réserver')) {
          startReservationProcess();
        } else if (option.includes('tarif')) {
          showPricing();
        } else if (option.includes('Contactez')) {
          addBotMessage("📞 Contactez-nous au +229 XX XX XX XX\n📧 Email : contact@baindulac.com");
        }
        break;

      case 'room_type':
        proceedToPersonalInfo();
        break;

      default:
        if (option.includes('réserver') || option.includes('Réserver')) {
          startReservationProcess();
        } else if (option.includes('tarif')) {
          showPricing();
        } else if (option.includes('Informations')) {
          showHotelInfo();
        }
        break;
    }
  };

  const handleReservationTypeSelection = (option: string) => {
    let type: 'classique' | 'day-use' | 'flexible';
    let checkInTime = DEFAULT_CHECK_IN_TIME;
    let checkOutTime = DEFAULT_CHECK_OUT_TIME;
    
    if (option.includes('Day-use')) {
      type = 'day-use';
      checkInTime = '10:00';
      checkOutTime = '18:00';
    } else if (option.includes('Flexible')) {
      type = 'flexible';
    } else {
      type = 'classique';
    }

    setReservationData(prev => ({
      ...prev,
      type,
      checkInTime,
      checkOutTime
    }));

    setCurrentStep('dates');
    addBotMessage(
      type === 'classique' 
        ? "Excellent choix ! Pour une réservation classique, j'ai besoin des dates d'arrivée et de départ."
        : type === 'day-use' 
          ? "Parfait pour une journée ! Choisissez votre date de visite."
          : "Idéal pour plus de flexibilité ! Choisissez votre date et vos heures.",
      [],
      <DateSelector type={type} onComplete={handleDatesComplete} />
    );
  };

  // Step handlers
  const handleDatesComplete = (dates: DateData) => {
    setReservationData(prev => ({ ...prev, ...dates }));
    setCurrentStep('guests');
    addBotMessage(
      "Parfait ! Maintenant, combien de personnes serez-vous ?",
      [],
      <GuestSelector onComplete={handleGuestsComplete} />
    );
  };

  const handleGuestsComplete = (guests: Guests) => {
    setReservationData(prev => ({ ...prev, ...guests }));
    setCurrentStep('room_type');
    addBotMessage(
      "Parfait ! Maintenant, quel type de chambre préférez-vous ?",
      [],
      <RoomSelector rooms={sampleRooms} onComplete={handleRoomComplete} />
    );
  };

  const handleRoomComplete = (room: Room) => {
  if (!room) {
    console.warn("Aucune chambre reçue");
    return;
  }

  setReservationData(prev => ({ ...prev, selectedRoom: room }));
  proceedToPersonalInfo();
};


  const proceedToPersonalInfo = () => {
    setCurrentStep('personal_info');
    if (userInfo) {
      addBotMessage(
        `Parfait ! Je vais préparer votre réservation. Souhaitez-vous ajouter des demandes spéciales ?`,
        [],
        <PersonalInfoForm userInfo={userInfo} onComplete={handlePersonalInfoComplete} />
      );
    } else {
      addBotMessage(
        "Excellent choix ! J'ai besoin de vos informations personnelles pour finaliser la réservation.",
        [],
        <PersonalInfoForm onComplete={handlePersonalInfoComplete} />
      );
    }
  };

const handlePersonalInfoComplete = (info: PersonalInfo) => {
  const finalData = {
    ...reservationData,
    ...info
  };

  if (!finalData.selectedRoom) {
    console.warn("❌ Chambre non sélectionnée !");
    addBotMessage("⚠️ Aucune chambre sélectionnée. Veuillez reprendre la réservation.");
    return;
  }

  if (!finalData.type) {
    console.warn("❌ Type de réservation manquant !");
    addBotMessage("⚠️ Type de réservation inconnu. Veuillez réessayer.");
    return;
  }

  console.log("✅ Données complètes avant résumé:", finalData);

  setReservationData(finalData);

  addBotMessage(
    "🎉 Parfait ! Voici le résumé de votre réservation :",
    [],
    <ReservationSummary data={finalData} onConfirm={() => handleWhatsAppRedirect(finalData)} />
  );
};


  // WhatsApp integration
  const handleWhatsAppRedirect = (data: ReservationData) => {
    try {
      const message = generateWhatsAppMessage(data);
      const whatsappNumber = "+22900000000";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      const newWindow = window.open(whatsappUrl, '_blank');
      if (!newWindow) {
        throw new Error('Impossible d\'ouvrir WhatsApp');
      }
      onClose();
    } catch (error) {
      console.error('Erreur:', error);
      addBotMessage("Désolé, une erreur s'est produite lors de l'ouverture de WhatsApp. Veuillez réessayer.");
    }
  };

  const generateWhatsAppMessage = (data: ReservationData) => {
    if (!data.selectedRoom) return '';
    
    const room = data.selectedRoom;
    const summary = generateReservationSummary(data);

    let dateInfo = '';
    if (data.type === 'classique') {
      dateInfo = `• Arrivée : ${new Date(data.checkInDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
• Départ : ${new Date(data.checkOutDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
• Durée : ${summary.duration}`;
    } else if (data.type === 'day-use') {
      dateInfo = `• Date : ${new Date(data.checkInDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
• Durée : ${summary.duration}`;
    } else {
      dateInfo = `• Date : ${new Date(data.checkInDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
• Horaires : ${data.checkInTime} - ${data.checkOutTime}
• Durée : ${summary.duration}`;
    }

    const childrenInfo = data.children.length > 0 
      ? `• Enfants : ${data.children.length} (âges: ${data.children.map(c => c.age).join(', ')} ans)`
      : '';

    return `🏨 *DEMANDE DE RÉSERVATION - BAIN DU LAC*

👤 *Informations client :*
• Nom : ${data.firstName} ${data.lastName}
• Email : ${data.email}
• Téléphone : ${data.phone}

📅 *Type de réservation :*
${data.type === 'classique' ? 'Réservation Classique (Nuitée)' : 
  data.type === 'day-use' ? 'Day-use (Journée)' : 'Horaires Flexibles'}

📍 *Détails du séjour :*
${dateInfo}

👥 *Invités :*
• Adultes : ${data.adults}
${childrenInfo}

🏠 *Hébergement :*
• Type : ${room.name} (${room.room_type})
• Capacité : ${room.num_person} personne${room.num_person > 1 ? 's' : ''}
• Surface : ${room.surface_area}m²
• Prix unitaire : ${summary.finalPrice.toLocaleString()} FCFA

💰 *Tarification :*
• Total : ${summary.finalPrice.toLocaleString()} FCFA

${data.specialRequests ? `💬 *Demandes spéciales :*\n${data.specialRequests}\n\n` : ''}📍 *Hôtel Bain du Lac - Bénin*
Merci de me confirmer la disponibilité et finaliser cette réservation.`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 100 }}
            className="w-full max-w-md h-[600px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-green-500 text-white rounded-t-3xl sm:rounded-t-3xl">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Assistant Bain du Lac</h3>
                  <p className="text-xs opacity-90">En ligne</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={`${message.id}-${message.timestamp.getTime()}`}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full text-left justify-start bg-white hover:bg-gray-50"
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {message.component && (
                      <div className="mt-3">
                        {message.component}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tapez votre message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleUserInput(inputValue)}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleUserInput(inputValue)}
                  disabled={!inputValue.trim()}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Component for date selection
function DateSelector({ type, onComplete }: { type: 'classique' | 'day-use' | 'flexible'; onComplete: (dates: DateData) => void }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkInTime, setCheckInTime] = useState(DEFAULT_CHECK_IN_TIME);
  const [checkOutTime, setCheckOutTime] = useState(DEFAULT_CHECK_OUT_TIME);

  const handleSubmit = () => {
    const dates: DateData = {
      checkInDate,
      checkOutDate: type === 'day-use' ? checkInDate : checkOutDate,
      checkInTime,
      checkOutTime
    };
    onComplete(dates);
  };

  const isDateValid = type === 'classique' 
    ? checkInDate && checkOutDate && new Date(checkOutDate) > new Date(checkInDate)
    : !!checkInDate;

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div>
        <Label>Date d&eacute;arrivée</Label>
        <Input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="mt-1"
        />
      </div>
      
      {type === 'classique' && (
        <div>
          <Label>Date de départ</Label>
          <Input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || new Date().toISOString().split('T')[0]}
            className="mt-1"
          />
        </div>
      )}
      
      {type === 'flexible' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Heure d&eacute;arrivée</Label>
            <Input
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Heure de départ</Label>
            <Input
              type="time"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      )}
      
      <Button
        onClick={handleSubmit}
        disabled={!isDateValid}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Continuer
      </Button>
    </div>
  );
}

// Component for guest selection
function GuestSelector({ onComplete }: { onComplete: (guests: Guests) => void }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState<Child[]>([]);

  const addChild = () => {
    if (children.length < MAX_CHILDREN) {
      setChildren([...children, { age: 5 }]);
    }
  };

  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const updateChildAge = (index: number, age: number) => {
    const newChildren = [...children];
    newChildren[index].age = Math.max(0, Math.min(17, age));
    setChildren(newChildren);
  };

  const handleSubmit = () => {
    onComplete({ adults, children });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div>
        <Label>Nombre d&eacute;adultes</Label>
        <div className="flex items-center space-x-3 mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setAdults(Math.max(1, adults - 1))}
            disabled={adults <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-semibold">{adults}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setAdults(Math.min(MAX_ADULTS, adults + 1))}
            disabled={adults >= MAX_ADULTS}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label>Enfants (0-17 ans)</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={addChild}
            disabled={children.length >= MAX_CHILDREN}
          >
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
        
        {children.map((child, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <span className="text-sm">Enfant {index + 1}:</span>
            <Input
              type="number"
              min="0"
              max="17"
              value={child.age}
              onChange={(e) => updateChildAge(index, parseInt(e.target.value) || 0)}
              className="w-20"
            />
            <span className="text-sm">ans</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeChild(index)}
              className="text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Continuer
      </Button>
    </div>
  );
}

// Component for room selection
function RoomSelector({ rooms, onComplete }: { rooms: Room[]; onComplete: (room: Room) => void }) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleSubmit = () => {
    if (selectedRoom) {
      onComplete(selectedRoom);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="space-y-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedRoom?.id === room.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedRoom(room)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{room.name}</h4>
                <p className="text-sm text-gray-600">
                  {room.room_type} • {room.num_person} pers. • {room.surface_area}m²
                </p>
                <div className="mt-2">
                  <p className="text-sm">
                    <span className="font-semibold">Nuitée:</span> {room.price_per_night.toLocaleString()} FCFA
                  </p>
                  {room.day_use_price > 0 && (
                    <p className="text-sm">
                      <span className="font-semibold">Day-use:</span> {room.day_use_price.toLocaleString()} FCFA
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-semibold">Horaire flexible:</span> {room.hourly_rate.toLocaleString()} FCFA/h
                  </p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                selectedRoom?.id === room.id ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`} />
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {room.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!selectedRoom}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Continuer
      </Button>
    </div>
  );
}

// Component for personal information
function PersonalInfoForm({ 
  userInfo, 
  onComplete 
}: { 
  userInfo?: { firstName: string; lastName: string; email: string; phone: string }; 
  onComplete: (info: PersonalInfo) => void 
}) {
  const [firstName, setFirstName] = useState(userInfo?.firstName || '');
  const [lastName, setLastName] = useState(userInfo?.lastName || '');
  const [phone, setPhone] = useState(userInfo?.phone || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleSubmit = () => {
    onComplete({ firstName, lastName, phone, email, specialRequests });
  };

  const isFormValid = firstName && lastName && phone;

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Prénom *</Label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1"
            disabled={!!userInfo}
          />
        </div>
        <div>
          <Label>Nom *</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1"
            disabled={!!userInfo}
          />
        </div>
      </div>
      
      <div>
        <Label>Téléphone *</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+229 XX XX XX XX"
          className="mt-1"
          disabled={!!userInfo}
        />
      </div>
      
      <div>
        <Label>Email *</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
          disabled={!!userInfo}
        />
      </div>
      
      <div>
        <Label>Demandes spéciales (optionnel)</Label>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Allergies, préférences..."
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={3}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Finaliser
      </Button>
    </div>
  );
}

// Component for reservation summary
function ReservationSummary({ data, onConfirm }: { data: ReservationData; onConfirm: () => void }) {
  // Debug: Afficher les données reçues
  console.log("Données reçues dans ReservationSummary:", {
    room: data.selectedRoom,
    type: data.type,
    dates: {
      checkIn: data.checkInDate,
      checkOut: data.checkOutDate,
      checkInTime: data.checkInTime,
      checkOutTime: data.checkOutTime
    },
    guests: {
      adults: data.adults,
      children: data.children
    }
  });

  // Vérifications initiales
  if (!data.selectedRoom) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
        ⚠️ Aucune chambre sélectionnée
      </div>
    );
  }

  if (!data.type) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
        ⚠️ Type de réservation non spécifié
      </div>
    );
  }

  // Fonctions de calcul
  const calculateNights = (checkIn: string, checkOut: string): number => {
    if (!checkIn || !checkOut) return 1;
    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.max(0, end.getTime() - start.getTime());
      return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    } catch {
      return 1;
    }
  };

  const calculateHours = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 1;
    try {
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);
      return Math.max(1, (endHour * 60 + endMin - (startHour * 60 + startMin)) / 60);
    } catch {
      return 1;
    }
  };

  // Calcul du résumé
  const calculateSummary = () => {
    const room = data.selectedRoom;
     if (!room) return null;
    let price = 0;
    let duration = '';

    switch (data.type) {
      case 'classique':
        const nights = calculateNights(data.checkInDate, data.checkOutDate);
        price = room.price_per_night * nights;
        duration = `${nights} nuit${nights !== 1 ? 's' : ''}`;
        break;

      case 'day-use':
        price = room.day_use_price;
        duration = `Day-use (${data.checkInTime} - ${data.checkOutTime})`;
        break;

      case 'flexible':
        const hours = calculateHours(data.checkInTime, data.checkOutTime);
        price = room.hourly_rate * hours;
        duration = `${hours.toFixed(1)} heure${hours !== 1 ? 's' : ''}`;
        break;

      default:
        return null;
    }

    return {
      finalPrice: Math.round(price), // Arrondir le prix
      duration
    };
  };

  const summary = calculateSummary();

  if (!summary) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
        ❌ Impossible de calculer le résumé
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <h3 className="font-bold text-lg">🎉 Résumé de votre réservation</h3>
      
      <div className="grid gap-2">
        <div className="flex justify-between">
          <span className="font-medium">Type:</span>
          <span className="font-semibold">
            {data.type === 'classique' ? 'Nuitée' : 
             data.type === 'day-use' ? 'Day-use' : 'Flexible'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Chambre:</span>
          <span className="font-semibold">{data.selectedRoom.name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Durée:</span>
          <span className="font-semibold">{summary.duration}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Invités:</span>
          <span className="font-semibold">
            {data.adults} adulte{data.adults !== 1 ? 's' : ''}
            {data.children.length > 0 ? `, ${data.children.length} enfant${data.children.length !== 1 ? 's' : ''}` : ''}
          </span>
        </div>
      </div>

      <div className="border-t pt-3 mt-2">
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-green-600">
            {summary.finalPrice.toLocaleString('fr-FR')} FCFA
          </span>
        </div>
      </div>

      <Button
        onClick={onConfirm}
        className="w-full bg-green-600 hover:bg-green-700 mt-4"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Confirmer et envoyer sur WhatsApp
      </Button>
    </div>
  );
}