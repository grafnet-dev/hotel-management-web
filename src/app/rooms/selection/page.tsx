'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import Image from 'next/image';

import sampleRooms from '../../../../types';
import { 
  CalendarDays, 
  Users, 
  ArrowLeft, 
  MapPin,
  BedDouble,
  Maximize2,
  CheckCircle,
} from 'lucide-react';

// Couleurs définies pour le thème
const colors = {
  teal: '#008080',
  lightTeal: '#E6F2F2',
  darkTeal: '#006666',
  gold: '#FFD700',
  orange: '#FFA500',
  maroon: '#800000',
  white: '#FFFFFF'
};



interface SelectedRoom {
  roomId: number;
  reservationType: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  hours?: number;
  adults: number;
  children: number;
}

export default function RoomSelectionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [expandedRoom, setExpandedRoom] = useState<number | null>(null);

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');
  const roomsCount = parseInt(searchParams.get('roomsCount') || '1');
  const roomsData = searchParams.get('roomsData') ? JSON.parse(searchParams.get('roomsData')!) : [];

  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;
  const nights = checkInDate && checkOutDate ? 
    Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 1;

  const canSelectMore = selectedRooms.length < roomsCount;

  const addRoomSelection = (room: any, reservationType: string, roomConfig: any) => {
    if (!canSelectMore) return;

    const newSelection: SelectedRoom = {
      roomId: room.id,
      reservationType,
      checkInDate: checkIn || '',
      checkOutDate: checkOut || '',
      checkInTime: roomConfig.checkInTime,
      checkOutTime: roomConfig.checkOutTime,
      hours: roomConfig.hours,
      adults: roomConfig.adults,
      children: roomConfig.children
    };

    setSelectedRooms(prev => [...prev, newSelection]);
    setExpandedRoom(null);
  };

  const removeRoomSelection = (index: number) => {
    setSelectedRooms(prev => prev.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return selectedRooms.reduce((total, selection) => {
      const room = sampleRooms.find(r => r.id === selection.roomId);
      if (!room) return total;

      const pricing = room.pricing.find(p => 
        room.reservation_types.find(rt => rt.id === p.reservation_type_id)?.code === selection.reservationType
      );

      if (!pricing) return total;

      let roomPrice = 0;
      if (selection.reservationType === 'classic') {
        roomPrice = pricing.price * nights;
      } else if (selection.reservationType.includes('day_use')) {
        roomPrice = room.day_use_price || pricing.price;
      } else if (selection.reservationType === 'flexible') {
        roomPrice = pricing.hourly_price * (selection.hours || 1);
      }

      return total + roomPrice;
    }, 0);
  };

  const proceedToBooking = () => {
    const bookingData = {
      selectedRooms,
      searchParams: {
        checkIn,
        checkOut,
        adults,
        children,
        roomsCount
      },
      totalPrice: getTotalPrice()
    };
    
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    router.push('/booking/multiple');
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: colors.lightTeal }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête avec informations de recherche */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-4 hover:bg-white/50"
            style={{ color: colors.darkTeal }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Modifier la recherche
          </Button>

          <Card className="p-6" style={{ backgroundColor: colors.white, border: `1px solid ${colors.teal}` }}>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center" style={{ color: colors.darkTeal }}>
                <CalendarDays className="h-5 w-5 mr-2" />
                <span>
                  {checkInDate?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - 
                  {checkOutDate?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  {nights > 0 && (
                    <span className="ml-2 font-medium" style={{ color: colors.teal }}>
                      ({nights} nuit{nights > 1 ? 's' : ''})
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center" style={{ color: colors.darkTeal }}>
                <Users className="h-5 w-5 mr-2" />
                <span>{adults} adulte{adults > 1 ? 's' : ''}, {children} enfant{children > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center" style={{ color: colors.darkTeal }}>
                <span>{roomsCount} chambre{roomsCount > 1 ? 's' : ''} recherchée{roomsCount > 1 ? 's' : ''}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Barre latérale avec sélection */}
          <div className="lg:col-span-1">
            <Card 
              className="p-6 sticky top-24" 
              style={{ backgroundColor: colors.white, border: `2px solid ${colors.teal}` }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
                Votre sélection
              </h3>
              <div className="text-sm mb-4" style={{ color: colors.darkTeal }}>
                {selectedRooms.length} / {roomsCount} chambre{roomsCount > 1 ? 's' : ''} sélectionnée{selectedRooms.length > 1 ? 's' : ''}
              </div>

              {selectedRooms.length > 0 && (
                <div className="space-y-3 mb-6">
                  {selectedRooms.map((selection, index) => {
                    const room = sampleRooms.find(r => r.id === selection.roomId);
                    return room ? (
                      <div 
                        key={index} 
                        className="p-3 rounded-lg" 
                        style={{ backgroundColor: colors.lightTeal }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm" style={{ color: colors.darkTeal }}>
                            {room.name}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRoomSelection(index)}
                            className="h-6 w-6 p-0 hover:bg-red-100"
                            style={{ color: colors.maroon }}
                          >
                            ×
                          </Button>
                        </div>
                        <div className="text-xs" style={{ color: colors.darkTeal }}>
                          <div className="font-medium">{selection.reservationType}</div>
                          <div>
                            {selection.adults} adulte{selection.adults > 1 ? 's' : ''}, 
                            {selection.children} enfant{selection.children > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {selectedRooms.length > 0 && (
                <div className="border-t pt-4" style={{ borderColor: colors.teal }}>
                  <div className="flex justify-between font-semibold mb-4" style={{ color: colors.darkTeal }}>
                    <span>Total :</span>
                    <span style={{ color: colors.teal }}>
                      {getTotalPrice().toLocaleString()} FCFA
                    </span>
                  </div>
                  <Button 
                    onClick={proceedToBooking}
                    className="w-full text-white hover:opacity-90"
                    style={{ backgroundColor: colors.teal }}
                    disabled={selectedRooms.length !== roomsCount}
                  >
                    Continuer ({selectedRooms.length}/{roomsCount})
                  </Button>
                </div>
              )}

              {!canSelectMore && (
                <div 
                  className="text-center p-4 rounded-lg" 
                  style={{ backgroundColor: colors.lightTeal }}
                >
                  <CheckCircle className="h-8 w-8 mx-auto mb-2" style={{ color: colors.teal }} />
                  <p className="text-sm font-medium" style={{ color: colors.darkTeal }}>
                    Sélection complète !
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Liste des chambres */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {sampleRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="overflow-hidden hover:shadow-lg transition-all duration-300"
                    style={{ 
                      backgroundColor: colors.white, 
                      border: `1px solid ${colors.teal}`,
                      boxShadow: `0 4px 6px rgba(0, 128, 128, 0.1)`
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      {/* Image */}
                      <div className="relative h-48 md:h-full">
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div 
                          className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: colors.gold, color: colors.darkTeal }}
                        >
                          Disponible
                        </div>
                      </div>

                      {/* Détails */}
                      <div className="md:col-span-1">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: colors.darkTeal }}>
                          {room.name}
                        </h3>
                        <div className="space-y-2 text-sm mb-4" style={{ color: colors.darkTeal }}>
                          <div className="flex items-center">
                            <BedDouble className="h-4 w-4 mr-2" style={{ color: colors.teal }} />
                            <span>{room.bed_type}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" style={{ color: colors.teal }} />
                            <span>{room.num_person} personne{room.num_person > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center">
                            <Maximize2 className="h-4 w-4 mr-2" style={{ color: colors.teal }} />
                            <span>{room.surface_area}m²</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" style={{ color: colors.teal }} />
                            <span>Vue {room.view} • Étage {room.floor}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {room.amenities.slice(0, 3).map((amenity) => (
                            <Badge 
                              key={amenity.id} 
                              variant="outline" 
                              className="text-xs"
                              style={{ 
                                borderColor: colors.teal, 
                                color: colors.darkTeal,
                                backgroundColor: colors.lightTeal 
                              }}
                            >
                              {amenity.name}
                            </Badge>
                          ))}
                          {room.amenities.length > 3 && (
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                              style={{ 
                                borderColor: colors.orange, 
                                color: colors.darkTeal,
                                backgroundColor: `${colors.orange}20` 
                              }}
                            >
                              +{room.amenities.length - 3} autres
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-between">
                        <div className="text-right mb-4">
                          <div className="text-2xl font-bold" style={{ color: colors.teal }}>
                            À partir de {room.price_per_night.toLocaleString()} FCFA
                          </div>
                          <div className="text-sm" style={{ color: colors.darkTeal }}>
                            par nuit
                          </div>
                        </div>

                        <div className="space-y-2">
                          {canSelectMore ? (
                            <Button
                              onClick={() => setExpandedRoom(expandedRoom === room.id ? null : room.id)}
                              className="w-full text-white hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: colors.teal }}
                            >
                              {expandedRoom === room.id ? 'Fermer' : 'Sélectionner'}
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                            >
                              Sélection complète
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            className="w-full hover:bg-gray-50"
                            style={{ borderColor: colors.teal, color: colors.teal }}
                            onClick={() => router.push(`/rooms/${room.id}`)}
                          >
                            Voir les détails
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Configuration de la chambre */}
                    <AnimatePresence>
                      {expandedRoom === room.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t"
                          style={{ 
                            backgroundColor: colors.lightTeal,
                            borderColor: colors.teal 
                          }}
                        >
                          <RoomConfiguration
                            room={room}
                            defaultCheckIn={checkIn || ''}
                            defaultCheckOut={checkOut || ''}
                            defaultAdults={roomsData[selectedRooms.length]?.adults || 2}
                            defaultChildren={roomsData[selectedRooms.length]?.children || 0}
                            onConfirm={(reservationType, config) => addRoomSelection(room, reservationType, config)}
                            onCancel={() => setExpandedRoom(null)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant de configuration de chambre
function RoomConfiguration({ 
  room, 
  defaultCheckIn, 
  defaultCheckOut, 
  defaultAdults, 
  defaultChildren,
  onConfirm, 
  onCancel 
}: {
  room: any;
  defaultCheckIn: string;
  defaultCheckOut: string;
  defaultAdults: number;
  defaultChildren: number;
  onConfirm: (reservationType: string, config: any) => void;
  onCancel: () => void;
}) {
  const [reservationType, setReservationType] = useState('classic');
  const [checkInDate, setCheckInDate] = useState(defaultCheckIn.split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(defaultCheckOut.split('T')[0]);
  const [checkInTime, setCheckInTime] = useState('14:00');
  const [checkOutTime, setCheckOutTime] = useState('12:00');
  const [hours, setHours] = useState(4);
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState(defaultChildren);

  const selectedReservationType = room.reservation_types.find(rt => rt.code === reservationType);
  const pricing = room.pricing.find(p => p.reservation_type_id === selectedReservationType?.id);

  const calculatePrice = () => {
    if (!pricing) return 0;

    if (reservationType === 'classic') {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return pricing.price * Math.max(1, nights);
    } else if (reservationType.includes('day_use')) {
      return room.day_use_price || pricing.price;
    } else if (reservationType === 'flexible') {
      return pricing.hourly_price * hours;
    }

    return pricing.price;
  };

  const handleConfirm = () => {
    const config = {
      checkInDate,
      checkOutDate,
      checkInTime: reservationType === 'flexible' ? checkInTime : undefined,
      checkOutTime: reservationType === 'flexible' ? checkOutTime : undefined,
      hours: reservationType === 'flexible' ? hours : undefined,
      adults,
      children
    };
    onConfirm(reservationType, config);
  };

  return (
    <div className="p-6">
      <h4 className="text-lg font-semibold mb-4" style={{ color: colors.darkTeal }}>
        Configuration de la chambre
      </h4>
      
      {/* Type de réservation */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block" style={{ color: colors.darkTeal }}>
          Type de réservation
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {room.reservation_types.map((type) => (
            <Card
              key={type.id}
              className={`p-3 cursor-pointer border-2 transition-all duration-200 hover:shadow-md ${
                reservationType === type.code ? 'shadow-md' : ''
              }`}
              style={{
                backgroundColor: reservationType === type.code ? colors.white : colors.lightTeal,
                borderColor: reservationType === type.code ? colors.teal : colors.teal + '50'
              }}
              onClick={() => setReservationType(type.code)}
            >
              <div className="text-center">
                <h5 className="font-medium text-sm" style={{ color: colors.darkTeal }}>
                  {type.name}
                </h5>
                <p className="text-xs mt-1" style={{ color: colors.darkTeal + 'CC' }}>
                  {type.description}
                </p>
                {type.slots && type.slots.length > 0 && (
                  <div className="text-xs mt-1" style={{ color: colors.teal }}>
                    {type.slots[0].checkin_time}h - {type.slots[0].checkout_time}h
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Configuration des dates/heures */}
      {reservationType === 'classic' && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label style={{ color: colors.darkTeal }}>Date d'arrivée</Label>
            <Input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="mt-1"
              style={{ borderColor: colors.teal }}
            />
          </div>
          <div>
            <Label style={{ color: colors.darkTeal }}>Date de départ</Label>
            <Input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate}
              className="mt-1"
              style={{ borderColor: colors.teal }}
            />
          </div>
        </div>
      )}

      {reservationType.includes('day_use') && (
        <div className="mb-6">
          <Label style={{ color: colors.darkTeal }}>Date de visite</Label>
          <Input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="mt-1"
            style={{ borderColor: colors.teal }}
          />
        </div>
      )}

      {reservationType === 'flexible' && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <Label style={{ color: colors.darkTeal }}>Date</Label>
            <Input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="mt-1"
              style={{ borderColor: colors.teal }}
            />
          </div>
          <div>
            <Label style={{ color: colors.darkTeal }}>Heure d'arrivée</Label>
            <Input
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="mt-1"
              style={{ borderColor: colors.teal }}
            />
          </div>
          <div>
            <Label style={{ color: colors.darkTeal }}>Nombre d'heures</Label>
            <Input
              type="number"
              min="1"
              max="12"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="mt-1"
              style={{ borderColor: colors.teal }}
            />
          </div>
        </div>
      )}

      {/* Occupants */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label style={{ color: colors.darkTeal }}>Adultes</Label>
          <Input
            type="number"
            min="1"
            max={room.num_person}
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
            className="mt-1"
            style={{ borderColor: colors.teal }}
          />
        </div>
        <div>
          <Label style={{ color: colors.darkTeal }}>Enfants</Label>
          <Input
            type="number"
            min="0"
            max="3"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
            className="mt-1"
            style={{ borderColor: colors.teal }}
          />
        </div>
      </div>

      {/* Prix */}
      <div 
        className="p-4 rounded-lg border mb-6" 
        style={{ 
          backgroundColor: colors.white, 
          borderColor: colors.gold,
          boxShadow: `0 2px 4px rgba(255, 215, 0, 0.2)`
        }}
      >
        <div className="flex justify-between items-center">
          <span className="font-medium" style={{ color: colors.darkTeal }}>
            Prix pour cette configuration :
          </span>
          <span className="text-xl font-bold" style={{ color: colors.teal }}>
            {calculatePrice().toLocaleString()} FCFA
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onCancel} 
          className="flex-1 hover:bg-gray-50"
          style={{ borderColor: colors.maroon, color: colors.maroon }}
        >
          Annuler
        </Button>
        <Button 
          onClick={handleConfirm} 
          className="flex-1 text-white hover:opacity-90"
          style={{ backgroundColor: colors.teal }}
        >
          Confirmer cette chambre
        </Button>
      </div>
    </div>
  );
}

