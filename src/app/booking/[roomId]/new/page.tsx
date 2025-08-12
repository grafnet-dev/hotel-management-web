"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../../../components/ui/card';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';
import sampleRooms, { Room } from '../../../../../types';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  BedDouble, 
  Clock, 
  Star, 
  Users, 
  CheckCircle,
  Loader2,
  Shield
} from 'lucide-react';
import { useRouter } from 'next/navigation';
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

interface BookingData {
  reservationType: 'classic' | 'day_use' | 'flexible';
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  adults: number;
  children: Array<{ age: number }>;
  roomId: number;
  specialRequests: string;
}

export default function AddRoomPage() {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    reservationType: 'classic',
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    adults: 2,
    children: [],
    roomId: 0,
    specialRequests: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const addChild = () => {
    if (bookingData.children.length < 3) {
      setBookingData(prev => ({
        ...prev,
        children: [...prev.children, { age: 5 }]
      }));
    }
  };

  const removeChild = (index: number) => {
    setBookingData(prev => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }));
  };

  const updateChildAge = (index: number, age: number) => {
    setBookingData(prev => ({
      ...prev,
      children: prev.children.map((child, i) => 
        i === index ? { age } : child
      )
    }));
  };

  const calculatePrice = () => {
    if (!selectedRoom) return { price: 0, duration: '' };

    const reservationType = selectedRoom.reservation_types.find(
      t => t.code === bookingData.reservationType
    );
    const pricing = selectedRoom.pricing.find(
      p => p.reservation_type_id === reservationType?.id
    );

    if (!reservationType || !pricing) return { price: 0, duration: '' };

    let basePrice = 0;
    let duration = '';

    if (bookingData.reservationType === 'classic') {
      if (bookingData.checkInDate && bookingData.checkOutDate) {
        const nights = Math.max(1, Math.ceil(
          (new Date(bookingData.checkOutDate).getTime() - 
          new Date(bookingData.checkInDate).getTime()
        ) / (1000 * 60 * 60 * 24)));
        
        basePrice = pricing.price * nights;
        duration = `${nights} nuit${nights > 1 ? 's' : ''}`;
      }
    } else if (bookingData.reservationType === 'day_use') {
      basePrice = pricing.price;
      duration = '1 journée';
    } else if (bookingData.reservationType === 'flexible') {
      if (bookingData.checkInTime && bookingData.checkOutTime) {
        const start = new Date(`2000-01-01T${bookingData.checkInTime}`);
        const end = new Date(`2000-01-01T${bookingData.checkOutTime}`);
        const hours = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
        
        basePrice = pricing.hourly_price * hours;
        duration = `${hours.toFixed(1)}h`;
      }
    }

    return { price: basePrice, duration };
  };

  const handleAddRoom = async () => {
    if (!selectedRoom) {
      alert('Veuillez sélectionner une chambre');
      return;
    }

    // Validation
    if (bookingData.reservationType === 'classic' && (!bookingData.checkInDate || !bookingData.checkOutDate)) {
      alert('Veuillez sélectionner les dates d\'arrivée et de départ');
      return;
    }

    if ((bookingData.reservationType === 'day_use' || bookingData.reservationType === 'flexible') && !bookingData.checkInDate) {
      alert('Veuillez sélectionner une date');
      return;
    }

    // Validation des âges des enfants
    for (let i = 0; i < bookingData.children.length; i++) {
      if (!bookingData.children[i].age || bookingData.children[i].age < 0 || bookingData.children[i].age > 17) {
        alert(`Veuillez renseigner un âge valide pour l'enfant ${i + 1} (0-17 ans)`);
        return;
      }
    }

    setIsProcessing(true);

    // Simulation du traitement
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { price, duration } = calculatePrice();

    // Créer la nouvelle réservation
    const newReservation = {
      id: Date.now(),
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      roomImage: selectedRoom.image,
      roomType: selectedRoom.room_type,
      wifiCode: selectedRoom.wifiCode,
      reservationType: bookingData.reservationType,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.reservationType === 'classic' ? bookingData.checkOutDate : bookingData.checkInDate,
      checkInTime: bookingData.checkInTime,
      checkOutTime: bookingData.checkOutTime,
      adults: bookingData.adults,
      children: bookingData.children,
      specialRequests: bookingData.specialRequests,
      totalPrice: price,
      paidAmount: 0,
      remainingAmount: price,
      status: 'pending',
      paymentMethod: '',
      createdAt: new Date().toISOString(),
      duration
    };

    // Ajouter à la liste des réservations existantes
    const existingReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
    existingReservations.push(newReservation);
    localStorage.setItem('userReservations', JSON.stringify(existingReservations));

    setIsProcessing(false);
    setIsConfirmed(true);

    // Redirection après 3 secondes
    setTimeout(() => {
      router.push('/client');
    }, 3000);
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" style={{ backgroundColor: colors.lightTeal }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Card className="p-12 max-w-md mx-auto" style={{ backgroundColor: colors.white }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.teal }}
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.darkTeal }}>
              Chambre Ajoutée !
            </h2>
            
            <p className="text-gray-600 mb-6">
              Votre nouvelle chambre a été ajoutée à votre réservation.
            </p>

            <Loader2 className="h-6 w-6 animate-spin mx-auto" style={{ color: colors.teal }} />
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: colors.lightTeal }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 hover:bg-white/50"
            style={{ color: colors.darkTeal }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.darkTeal }}>
              Ajouter une Chambre
            </h1>
            <p className="text-gray-600">Sélectionnez une chambre supplémentaire pour votre séjour</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: colors.darkTeal }}>
                  Chambres Disponibles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleRooms.map((room) => (
                    <motion.div
                      key={room.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer border-2 transition-all overflow-hidden ${
                          selectedRoom?.id === room.id
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedRoom(room)}
                        style={{
                          borderColor: selectedRoom?.id === room.id ? colors.teal : '#e5e7eb',
                          backgroundColor: selectedRoom?.id === room.id ? colors.lightTeal : colors.white
                        }}
                      >
                        <div className="relative h-32">
                          <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            className="object-cover"
                          />
                          {selectedRoom?.id === room.id && (
                            <div className="absolute top-2 right-2">
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: colors.teal }}
                              >
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h4 className="font-semibold mb-1" style={{ color: colors.darkTeal }}>
                            {room.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{room.num_person} pers.</span>
                            </div>
                            <div className="text-right">
                              <p className="font-bold" style={{ color: colors.teal }}>
                                {room.price_per_night.toLocaleString()} FCFA
                              </p>
                              <p className="text-xs text-gray-500">par nuit</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {selectedRoom && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                  <h3 className="text-xl font-semibold mb-6" style={{ color: colors.darkTeal }}>
                    Configuration de la Réservation
                  </h3>

                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block" style={{ color: colors.darkTeal }}>
                      Type de réservation
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedRoom.reservation_types.map((type) => {
                        const Icon = type.code === 'classic' ? BedDouble :
                                    type.code === 'day_use' ? Clock : Star;
                        return (
                          <Card
                            key={type.id}
                            className={`p-3 cursor-pointer border-2 transition-all ${
                              bookingData.reservationType === type.code
                                ? 'border-teal-500 bg-teal-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setBookingData(prev => ({ 
                              ...prev, 
                              reservationType: type.code as 'classic' | 'day_use' | 'flexible' 
                            }))}
                            style={{
                              borderColor: bookingData.reservationType === type.code ? colors.teal : '#e5e7eb',
                              backgroundColor: bookingData.reservationType === type.code ? colors.lightTeal : colors.white
                            }}
                          >
                            <div className="text-center">
                              <Icon className="h-6 w-6 mx-auto mb-2" style={{ color: colors.teal }} />
                              <h5 className="font-medium text-sm" style={{ color: colors.darkTeal }}>{type.name}</h5>
                              <p className="text-xs text-gray-600">{type.description}</p>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label style={{ color: colors.darkTeal }}>
                        {bookingData.reservationType === 'classic' ? 'Date d\'arrivée' : 'Date'}
                      </Label>
                      <Input
                        type="date"
                        value={bookingData.checkInDate}
                        onChange={(e) => setBookingData(prev => ({ ...prev, checkInDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                        style={{ borderColor: colors.teal }}
                      />
                    </div>
                    {bookingData.reservationType === 'classic' && (
                      <div>
                        <Label style={{ color: colors.darkTeal }}>Date de départ</Label>
                        <Input
                          type="date"
                          value={bookingData.checkOutDate}
                          onChange={(e) => setBookingData(prev => ({ ...prev, checkOutDate: e.target.value }))}
                          min={bookingData.checkInDate || new Date().toISOString().split('T')[0]}
                          className="mt-1"
                          style={{ borderColor: colors.teal }}
                        />
                      </div>
                    )}
                  </div>

                  {bookingData.reservationType === 'flexible' && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label style={{ color: colors.darkTeal }}>Heure d&rsquo;arrivée</Label>
                        <Input
                          type="time"
                          value={bookingData.checkInTime}
                          onChange={(e) => setBookingData(prev => ({ ...prev, checkInTime: e.target.value }))}
                          className="mt-1"
                          style={{ borderColor: colors.teal }}
                        />
                      </div>
                      <div>
                        <Label style={{ color: colors.darkTeal }}>Heure de départ</Label>
                        <Input
                          type="time"
                          value={bookingData.checkOutTime}
                          onChange={(e) => setBookingData(prev => ({ ...prev, checkOutTime: e.target.value }))}
                          className="mt-1"
                          style={{ borderColor: colors.teal }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label style={{ color: colors.darkTeal }}>Adultes</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setBookingData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          disabled={bookingData.adults <= 1}
                          style={{ borderColor: colors.teal }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold" style={{ color: colors.darkTeal }}>
                          {bookingData.adults}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setBookingData(prev => ({ 
                            ...prev, 
                            adults: Math.min(selectedRoom.num_person, prev.adults + 1) 
                          }))}
                          disabled={bookingData.adults >= selectedRoom.num_person}
                          style={{ borderColor: colors.teal }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label style={{ color: colors.darkTeal }}>Enfants</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addChild}
                          disabled={bookingData.children.length >= 3}
                          style={{ borderColor: colors.teal, color: colors.teal }}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                      
                      {bookingData.children.map((child, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                          <span className="text-sm" style={{ color: colors.darkTeal }}>Enfant {index + 1}:</span>
                          <Input
                            type="number"
                            min="0"
                            max="17"
                            value={child.age}
                            onChange={(e) => updateChildAge(index, parseInt(e.target.value))}
                            className="w-20"
                            placeholder="Âge"
                            style={{ borderColor: colors.teal }}
                            required
                          />
                          <span className="text-sm text-gray-500">ans</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeChild(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label style={{ color: colors.darkTeal }}>Demandes spéciales (optionnel)</Label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                      placeholder="Allergies, préférences, demandes particulières..."
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.teal }}
                      rows={3}
                    />
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: colors.white }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: colors.darkTeal }}>
                  Résumé de l&rsquo;Ajout
                </h3>

                {selectedRoom ? (
                  <>
                    <div className="mb-6">
                      <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={selectedRoom.image}
                          alt={selectedRoom.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-semibold mb-2" style={{ color: colors.darkTeal }}>
                        {selectedRoom.name}
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Jusqu&rsquo;à {selectedRoom.num_person} personnes</span>
                        </div>
                        <div className="flex items-center">
                          <BedDouble className="h-4 w-4 mr-2" />
                          <span>{selectedRoom.bed_type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h5 className="font-medium mb-2" style={{ color: colors.darkTeal }}>Type</h5>
                        <p className="text-sm text-gray-600 capitalize">
                          {bookingData.reservationType === 'classic' ? 'Séjour Classique' :
                           bookingData.reservationType === 'day_use' ? 'Day Use (Journée)' : 'Horaires Flexibles'}
                        </p>
                      </div>

                      {bookingData.checkInDate && (
                        <div>
                          <h5 className="font-medium mb-2" style={{ color: colors.darkTeal }}>
                            {bookingData.reservationType === 'classic' ? 'Dates' : 'Date'}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {new Date(bookingData.checkInDate).toLocaleDateString('fr-FR')}
                            {bookingData.reservationType === 'classic' && bookingData.checkOutDate && (
                              <span> - {new Date(bookingData.checkOutDate).toLocaleDateString('fr-FR')}</span>
                            )}
                          </p>
                          {bookingData.reservationType === 'flexible' && (
                            <p className="text-xs text-gray-500 mt-1">
                              {bookingData.checkInTime} - {bookingData.checkOutTime}
                            </p>
                          )}
                        </div>
                      )}

                      <div>
                        <h5 className="font-medium mb-2" style={{ color: colors.darkTeal }}>Invités</h5>
                        <p className="text-sm text-gray-600">
                          {bookingData.adults} adulte{bookingData.adults > 1 ? 's' : ''}
                          {bookingData.children.length > 0 && (
                            <span>, {bookingData.children.length} enfant{bookingData.children.length > 1 ? 's' : ''}</span>
                          )}
                        </p>
                        {bookingData.children.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Âges: {bookingData.children.map(c => c.age).join(', ')} ans
                          </p>
                        )}
                      </div>

                      {calculatePrice().duration && (
                        <div>
                          <h5 className="font-medium mb-2" style={{ color: colors.darkTeal }}>Durée</h5>
                          <p className="text-sm text-gray-600">{calculatePrice().duration}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-lg font-semibold" style={{ color: colors.darkTeal }}>
                        <span>Prix de cette chambre</span>
                        <span>{calculatePrice().price.toLocaleString()} FCFA</span>
                      </div>
                      <p className="text-xs text-gray-500">À ajouter à votre facture totale</p>
                    </div>

                    <Button
                      onClick={handleAddRoom}
                      disabled={isProcessing || !calculatePrice().price}
                      className="w-full"
                      style={{ backgroundColor: colors.teal }}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Ajout en cours...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter cette chambre
                        </>
                      )}
                    </Button>

                    <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: colors.lightTeal }}>
                      <div className="flex items-center text-sm" style={{ color: colors.darkTeal }}>
                        <Shield className="h-4 w-4 mr-2" />
                        <span>Paiement requis après ajout</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <BedDouble className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Sélectionnez une chambre pour voir le résumé</p>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}