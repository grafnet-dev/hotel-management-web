"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

import { 
  MessageCircle, 
  X, 
  Calendar, 
  Users, 
  BedDouble, 
 
  User,
 
  Clock,
  MapPin,
  Send
} from 'lucide-react';

interface WhatsAppBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppBooking({ isOpen, onClose }: WhatsAppBookingProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    roomType: 'standard',
    specialRequests: ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppMessage = () => {
    const checkInDate = formData.checkIn ? new Date(formData.checkIn).toLocaleDateString('fr-FR', { 
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    }) : '';
    const checkOutDate = formData.checkOut ? new Date(formData.checkOut).toLocaleDateString('fr-FR', { 
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    }) : '';

    const message = `🏨 *DEMANDE DE RÉSERVATION - BAIN DU LAC*

👤 *Informations client :*
• Nom : ${formData.name}
• Email : ${formData.email}
• Téléphone : ${formData.phone}

📅 *Détails du séjour :*
• Arrivée : ${checkInDate}
• Départ : ${checkOutDate}
• Adultes : ${formData.adults}
• Enfants : ${formData.children}
• Type de chambre : ${getRoomTypeName(formData.roomType)}

${formData.specialRequests ? `💬 *Demandes spéciales :*\n${formData.specialRequests}\n\n` : ''}📍 *Hôtel Bain du Lac - Bénin*
Merci de me confirmer la disponibilité et le tarif pour cette réservation.`;

    return encodeURIComponent(message);
  };

  const getRoomTypeName = (type: string) => {
    const types = {
      'standard': 'Chambre Standard',
      'deluxe': 'Chambre Deluxe',
      'suite': 'Suite Présidentielle',
      'family': 'Suite Familiale'
    };
    return types[type as keyof typeof types] || 'Chambre Standard';
  };

  const handleWhatsAppSend = () => {
    if (!formData.name || !formData.phone || !formData.checkIn || !formData.checkOut) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappNumber = "+22900000000"; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const getNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 bg-white shadow-2xl border-0 rounded-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Réserver via WhatsApp</h2>
                    <p className="text-gray-600">Contactez-nous directement pour votre réservation</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Formulaire */}
              <div className="space-y-6">
                {/* Informations personnelles */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Vos informations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nom complet *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Votre nom complet"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Téléphone *</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+229 XX XX XX XX"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="votre@email.com"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates de séjour */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Dates de séjour
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date d'arrivée *</Label>
                      <Input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => handleInputChange('checkIn', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Date de départ *</Label>
                      <Input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => handleInputChange('checkOut', e.target.value)}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  {getNights() > 0 && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Durée du séjour : {getNights()} nuit{getNights() > 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>

                {/* Occupants */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Nombre d'occupants
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Adultes</Label>
                      <Input
                        type="number"
                        min="1"
                        max="4"
                        value={formData.adults}
                        onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Enfants</Label>
                      <Input
                        type="number"
                        min="0"
                        max="3"
                        value={formData.children}
                        onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Type de chambre */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BedDouble className="h-5 w-5 mr-2 text-blue-600" />
                    Type de chambre préféré
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'standard', label: 'Standard', price: '18,000' },
                      { value: 'deluxe', label: 'Deluxe', price: '35,000' },
                      { value: 'suite', label: 'Suite', price: '85,000' },
                      { value: 'family', label: 'Familiale', price: '65,000' }
                    ].map((room) => (
                      <Card
                        key={room.value}
                        className={`p-4 cursor-pointer border-2 transition-all ${
                          formData.roomType === room.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('roomType', room.value)}
                      >
                        <div className="text-center">
                          <h4 className="font-medium">{room.label}</h4>
                          <p className="text-sm text-gray-600">À partir de {room.price} FCFA</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Demandes spéciales */}
                <div>
                  <Label>Demandes spéciales</Label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Allergies, préférences, demandes particulières..."
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                {/* Informations hôtel */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Hôtel Bain du Lac - Bénin
                  </h4>
                  <p className="text-sm text-green-700">
                    Nos équipes vous répondront rapidement sur WhatsApp pour confirmer 
                    votre réservation et vous fournir tous les détails nécessaires.
                  </p>
                </div>

                {/* Bouton d'envoi */}
                <Button
                  onClick={handleWhatsAppSend}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
                  disabled={!formData.name || !formData.phone || !formData.checkIn || !formData.checkOut}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Envoyer sur WhatsApp
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}