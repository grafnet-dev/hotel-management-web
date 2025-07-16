"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

import { 
  MessageCircle, 
  X, 
  Send,
  Plus,
  Minus,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  component?: React.ReactNode;
}

interface ReservationData {
  type: 'classique' | 'day-use' | 'flexible' | null;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  adults: number;
  children: Array<{ age: number }>;
  roomType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  specialRequests: string;
}

interface Guests {
  adults: number;
  children: Array<{ age: number }>;
}

interface Room {
  roomType: string;
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

const ROOM_TYPES = {
  'standard': { name: 'Chambre Standard', price: 18000 },
  'deluxe': { name: 'Chambre Deluxe', price: 35000 },
  'suite': { name: 'Suite Présidentielle', price: 85000 },
  'family': { name: 'Suite Familiale', price: 65000 }
};

const TRIGGER_PHRASES = [
  'bonjour', 'bonsoir', 'salut', 'hello', 'hi',
  'je veux réserver', 'réservation', 'réserver',
  'je cherche une chambre', 'chambre disponible',
  'disponibilité', 'tarif', 'prix'
];

export function ChatbotWhatsApp({ isOpen, onClose, userInfo }: ChatbotWhatsAppProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('greeting');
  const [reservationData, setReservationData] = useState<ReservationData>({
    type: null,
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    adults: 2,
    children: [],
    roomType: 'standard',
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    phone: userInfo?.phone || '',
    email: userInfo?.email || '',
    specialRequests: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

useEffect(() => {
  if (isOpen && messages.length === 0) {
    addBotMessage(
      "👋 Bonjour ! Bienvenue à l'hôtel Bain du Lac ! Comment puis-je vous aider aujourd'hui ?",
      ['Je veux réserver', 'Voir les tarifs', 'Informations hôtel']
    );
  }
}, [isOpen, messages.length]);

  const addBotMessage = (content: string, options?: string[], component?: React.ReactNode) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      options,
      component
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserInput = (input: string) => {
    addUserMessage(input);
    setInputValue('');
    processUserInput(input.toLowerCase());
  };

  const processUserInput = (input: string) => {
    const containsTrigger = TRIGGER_PHRASES.some(phrase => input.includes(phrase));

    if (containsTrigger || currentStep === 'greeting') {
      if (input.includes('réserver') || input.includes('réservation') || input.includes('chambre')) {
        setCurrentStep('reservation_type');
        addBotMessage(
          "Parfait ! Quel type de réservation souhaitez-vous ?",
          ['Classique (Nuitée)', 'Day-use (Journée)', 'Flexible (Horaire)']
        );
      } else if (input.includes('tarif') || input.includes('prix')) {
        addBotMessage(
          "Voici nos tarifs :\n• Chambre Standard : 18,000 FCFA/nuit\n• Chambre Deluxe : 35,000 FCFA/nuit\n• Suite Présidentielle : 85,000 FCFA/nuit\n• Suite Familiale : 65,000 FCFA/nuit\n\nSouhaitez-vous faire une réservation ?",
          ['Oui, réserver', 'Non, merci']
        );
      } else {
        addBotMessage(
          "Je peux vous aider avec :\n• Réservations de chambres\n• Informations sur les tarifs\n• Renseignements sur l'hôtel\n\nQue souhaitez-vous faire ?",
          ['Réserver une chambre', 'Voir les tarifs', 'Informations']
        );
      }
    }
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);

    switch (currentStep) {
      case 'greeting':
        if (option.includes('réserver')) {
          setCurrentStep('reservation_type');
          addBotMessage(
            "Parfait ! Quel type de réservation souhaitez-vous ?",
            ['Classique (Nuitée)', 'Day-use (Journée)', 'Flexible (Horaire)']
          );
        }
        break;

      case 'reservation_type':
        let type: 'classique' | 'day-use' | 'flexible' = 'classique';
        if (option.includes('Day-use')) type = 'day-use';
        else if (option.includes('Flexible')) type = 'flexible';

        setReservationData(prev => ({ ...prev, type }));
        setCurrentStep('dates');

        if (type === 'classique') {
          addBotMessage(
            "Excellent choix ! Pour une réservation classique, j'ai besoin des dates d'arrivée et de départ.",
            [],
            <DateSelector type="classique" onComplete={handleDatesComplete} />
          );
        } else if (type === 'day-use') {
          addBotMessage(
            "Parfait pour une journée ! Choisissez votre date de visite.",
            [],
            <DateSelector type="day-use" onComplete={handleDatesComplete} />
          );
        } else {
          addBotMessage(
            "Idéal pour plus de flexibilité ! Choisissez votre date et vos heures.",
            [],
            <DateSelector type="flexible" onComplete={handleDatesComplete} />
          );
        }
        break;

      case 'guests':
        setCurrentStep('room_type');
        addBotMessage(
          "Parfait ! Maintenant, quel type de chambre préférez-vous ?",
          [],
          <RoomSelector onComplete={handleRoomComplete} />
        );
        break;

      case 'room_type':
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
        break;
    }
  };

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
      <RoomSelector onComplete={handleRoomComplete} />
    );
  };

  const handleRoomComplete = (room: Room) => {
    setReservationData(prev => ({ ...prev, ...room }));
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
    const finalData = { ...reservationData, ...info };
    setReservationData(finalData);
    
    addBotMessage(
      "🎉 Parfait ! Voici le résumé de votre réservation :",
      [],
      <ReservationSummary data={finalData} onConfirm={() => handleWhatsAppRedirect(finalData)} />
    );
  };

  const generateReservationSummary = (data: ReservationData) => {
    const roomInfo = ROOM_TYPES[data.roomType as keyof typeof ROOM_TYPES];
    let price = roomInfo.price;
    let duration = '';

    if (data.type === 'classique') {
      const nights = calculateNights(data.checkInDate, data.checkOutDate);
      price = price * nights;
      duration = `${nights} nuit${nights > 1 ? 's' : ''}`;
    } else if (data.type === 'day-use') {
      price = Math.round(price * 0.7);
      duration = '1 journée';
    } else if (data.type === 'flexible') {
      const hours = calculateHours(data.checkInTime, data.checkOutTime);
      price = Math.round((price / 24) * hours);
      duration = `${hours} heure${hours > 1 ? 's' : ''}`;
    }

    return { ...data, finalPrice: price, duration };
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const calculateHours = (startTime: string, endTime: string) => {
    const [startHour] = startTime.split(':').map(Number);
    const [endHour] = endTime.split(':').map(Number);
    return Math.max(1, endHour - startHour);
  };

  const handleWhatsAppRedirect = (data: ReservationData) => {
    const message = generateWhatsAppMessage(data);
    const whatsappNumber = "+22900000000"; // Remplacez par le vrai numéro
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const generateWhatsAppMessage = (data: ReservationData) => {
    const roomInfo = ROOM_TYPES[data.roomType as keyof typeof ROOM_TYPES];
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
• Type : ${roomInfo.name}
• Prix unitaire : ${roomInfo.price.toLocaleString()} FCFA

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
                  key={message.id}
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
                  onKeyPress={(e) => e.key === 'Enter' && inputValue.trim() && handleUserInput(inputValue)}
                  className="flex-1"
                />
                <Button
                  onClick={() => inputValue.trim() && handleUserInput(inputValue)}
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

// Composants pour les étapes de réservation
function DateSelector({ type, onComplete }: { type: string; onComplete: (dates: DateData) => void }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('14:00');
  const [checkOutTime, setCheckOutTime] = useState('12:00');

  const handleSubmit = () => {
    const dates: DateData = {
      checkInDate,
      checkOutDate: type === 'day-use' ? checkInDate : checkOutDate,
      checkInTime,
      checkOutTime
    };
    onComplete(dates);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div>
        <Label>Date d'arrivée</Label>
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
            <Label>Heure d'arrivée</Label>
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
        disabled={!checkInDate || (type === 'classique' && !checkOutDate)}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Continuer
      </Button>
    </div>
  );
}

function GuestSelector({ onComplete }: { onComplete: (guests: Guests) => void }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState<Array<{ age: number }>>([]);

  const addChild = () => {
    setChildren([...children, { age: 5 }]);
  };

  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const updateChildAge = (index: number, age: number) => {
    const newChildren = [...children];
    newChildren[index].age = age;
    setChildren(newChildren);
  };

  const handleSubmit = () => {
    onComplete({ adults, children });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div>
        <Label>Nombre d'adultes</Label>
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
            onClick={() => setAdults(Math.min(4, adults + 1))}
            disabled={adults >= 4}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label>Enfants</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={addChild}
            disabled={children.length >= 3}
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
              onChange={(e) => updateChildAge(index, parseInt(e.target.value))}
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

function RoomSelector({ onComplete }: { onComplete: (room: Room) => void }) {
  const [selectedRoom, setSelectedRoom] = useState('standard');

  const handleSubmit = () => {
    onComplete({ roomType: selectedRoom });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="space-y-3">
        {Object.entries(ROOM_TYPES).map(([key, room]) => (
          <div
            key={key}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedRoom === key ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedRoom(key)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{room.name}</h4>
                <p className="text-sm text-gray-600">{room.price.toLocaleString()} FCFA/nuit</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedRoom === key ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`} />
            </div>
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

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Prénom</Label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1"
            disabled={!!userInfo}
          />
        </div>
        <div>
          <Label>Nom</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1"
            disabled={!!userInfo}
          />
        </div>
      </div>
      
      <div>
        <Label>Téléphone</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+229 XX XX XX XX"
          className="mt-1"
          disabled={!!userInfo}
        />
      </div>
      
      <div>
        <Label>Email</Label>
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
        disabled={!firstName || !lastName || !phone}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Finaliser
      </Button>
    </div>
  );
}

function ReservationSummary({ data, onConfirm }: { data: ReservationData; onConfirm: () => void }) {
  const roomInfo = ROOM_TYPES[data.roomType as keyof typeof ROOM_TYPES];
  const summary = generateSummary(data);

  function generateSummary(data: ReservationData) {
    let price = roomInfo.price;
    let duration = '';

    if (data.type === 'classique') {
      const nights = calculateNights(data.checkInDate, data.checkOutDate);
      price = price * nights;
      duration = `${nights} nuit${nights > 1 ? 's' : ''}`;
    } else if (data.type === 'day-use') {
      price = Math.round(price * 0.7);
      duration = '1 journée';
    } else if (data.type === 'flexible') {
      const hours = calculateHours(data.checkInTime, data.checkOutTime);
      price = Math.round((price / 24) * hours);
      duration = `${hours} heure${hours > 1 ? 's' : ''}`;
    }

    return { finalPrice: price, duration };
  }

  function calculateNights(checkIn: string, checkOut: string) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  }

  function calculateHours(startTime: string, endTime: string) {
    const [startHour] = startTime.split(':').map(Number);
    const [endHour] = endTime.split(':').map(Number);
    return Math.max(1, endHour - startHour);
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Type:</span>
          <span className="capitalize">{data.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Chambre:</span>
          <span>{roomInfo.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Durée:</span>
          <span>{summary.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Invités:</span>
          <span>{data.adults} adulte{data.adults > 1 ? 's' : ''}{data.children.length > 0 ? `, ${data.children.length} enfant${data.children.length > 1 ? 's' : ''}` : ''}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-green-600">{summary.finalPrice.toLocaleString()} FCFA</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onConfirm}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Envoyer sur WhatsApp
      </Button>
    </div>
  );
}