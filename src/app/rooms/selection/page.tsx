'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import Image from 'next/image';
import { ReservationType } from '../../../../types';
import sampleRooms from '../../../../types'; 
import { 
  CalendarDays, 
  Users, 
  ArrowLeft, 
  MapPin,
  BedDouble,
  Maximize2,
  CheckCircle,
  Plus,
  Minus,
} from 'lucide-react';

const colors = {
  teal: '#008080',
  lightTeal: '#E6F2F2',
  darkTeal: '#006666',
  gold: '#FFD700',
  orange: '#FFA500',
  maroon: '#800000',
  white: '#FFFFFF'
};

// Constantes pour les enfants
const MIN_CHILD_AGE = 0;
const MAX_CHILD_AGE = 17;
const MAX_CHILDREN_PER_ROOM = 3;

// Interface pour les enfants
interface Child {
  id: number;
  age: number;
}

// Interface pour Room (modifiée pour éviter le conflit de types)
interface Room {
  id: number;
  name: string;
  image: string;
  bed_type: string;
  num_person: number;
  surface_area: number;
  view: string;
  floor: number | string; // Accepte les deux types pour éviter l'erreur
  price_per_night: number;
  day_use_price?: number;
  hourly_rate?: number;
  amenities: Array<{ id: number; name: string }>;
  reservation_types: ReservationType[];
}

interface RoomData {
  adults: number;
  children: number[];
}

interface Config {
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  hours: number;
  adults: number;
  children: Child[];
}

interface RoomConfig {
  checkInDate: string;
  checkOutDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  hours?: number;
  adults: number;
  children: Child[];
}

interface SelectedRoom {
  roomId: number;
  reservationType: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  hours?: number;
  adults: number;
  children: Child[];
}

// Fonction utilitaire pour convertir une date en format YYYY-MM-DD sans décalage de fuseau horaire
function formatDateForInput(dateString: string): string {
  if (!dateString) return '';
  
  // Si c'est déjà au bon format, le retourner
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateString;
  }
  
  try {
    // Créer la date en assumant qu'elle est en UTC pour éviter les décalages
    const date = new Date(dateString + 'T00:00:00.000Z');
    if (isNaN(date.getTime())) return '';
    
    // Utiliser les méthodes UTC pour éviter les décalages de fuseau horaire
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Erreur de conversion de date:', error);
    return '';
  }
}

// Fonction utilitaire pour afficher le type de réservation
function getReservationTypeDisplay(code: string): string {
  switch (code) {
    case 'classic':
      return 'Séjour Classique';
    case 'day_use':
      return 'Day Use';
    case 'flexible':
      return 'Horaires Flexibles';
    default:
      return code;
  }
}

export default function RoomSelectionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [expandedRoom, setExpandedRoom] = useState<number | null>(null);
  
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const reservationType = searchParams.get('reservationType') || 'classic';
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');
  const roomsCount = parseInt(searchParams.get('roomsCount') || '1');
  
  const roomsData = searchParams.get('roomsData') 
    ? JSON.parse(searchParams.get('roomsData')!).map((room: RoomData) => {
        return {
          adults: room.adults,
          children: room.children
            .filter((age: number) => typeof age === 'number' && !isNaN(age))
            .map((age: number, index: number) => ({
              id: index,
              age: age
            }))
        };
      })
    : [];

  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;
  
  const getDuration = () => {
    if (reservationType === 'classic' && checkInDate && checkOutDate) {
      const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
      return { type: 'nights', value: nights, label: `${nights} nuit${nights > 1 ? 's' : ''}` };
    } else if (reservationType === 'day_use') {
      return { type: 'day', value: 1, label: '1 journée' };
    } else if (reservationType === 'flexible' && startTime && endTime) {
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      const hours = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
      return { type: 'hours', value: hours, label: `${hours}h` };
    }
    return { type: 'nights', value: 1, label: '1 nuit' };
  };

  const duration = getDuration();
  const canSelectMore = selectedRooms.length < roomsCount;

  const addRoomSelection = (room: Room, reservationType: string, roomConfig: RoomConfig) => {
    if (!canSelectMore) return;

    const newSelection: SelectedRoom = {
      roomId: room.id,
      reservationType,
      checkInDate: roomConfig.checkInDate,
      checkOutDate: roomConfig.checkOutDate,
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

      let roomPrice = 0;
      if (selection.reservationType === 'classic') {
        const checkIn = new Date(selection.checkInDate);
        const checkOut = new Date(selection.checkOutDate);
        const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
        roomPrice = room.price_per_night * nights;
      } else if (selection.reservationType === 'day_use') {
        roomPrice = room.day_use_price || Math.round(room.price_per_night * 0.7);
      } else if (selection.reservationType === 'flexible') {
        const hourlyRate = room.hourly_rate || Math.round(room.price_per_night / 24);
        roomPrice = hourlyRate * (selection.hours || 1);
      }

      return total + roomPrice;
    }, 0);
  };

  const proceedToBooking = () => {
    const bookingData = {
      selectedRooms,
      checkIn,
      checkOut,
      adults,
      children,
      roomsCount,
      totalPrice: getTotalPrice()
    };
    
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    router.push('/booking/multiple');
  };

  return (
    <div className="min-h-screen pt-32 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header avec informations de recherche */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Modifier la recherche
          </Button>

          <Card className="p-6 bg-white">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center text-gray-600">
                <CalendarDays className="h-5 w-5 mr-2" />
                <span>
                  {reservationType === 'classic' ? (
                    <>
                      {checkInDate?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - 
                      {checkOutDate?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      <span className="ml-2 text-blue-600">({duration.label})</span>
                    </>
                  ) : (
                    <>
                      {checkInDate?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      <span className="ml-2 text-blue-600">({duration.label})</span>
                      {reservationType === 'flexible' && startTime && endTime && (
                        <span className="ml-2 text-gray-500">({startTime} - {endTime})</span>
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{adults} adulte{adults > 1 ? 's' : ''}, {children} enfant{children > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>{roomsCount} chambre{roomsCount > 1 ? 's' : ''} recherchée{roomsCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="capitalize font-medium text-blue-600">
                  {getReservationTypeDisplay(reservationType)}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec sélection */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Votre sélection</h3>
              <div className="text-sm text-gray-600 mb-4">
                {selectedRooms.length} / {roomsCount} chambre{roomsCount > 1 ? 's' : ''} sélectionnée{selectedRooms.length > 1 ? 's' : ''}
              </div>

              {selectedRooms.length > 0 && (
                <div className="space-y-3 mb-6">
                  {selectedRooms.map((selection, index) => {
                    const room = sampleRooms.find(r => r.id === selection.roomId);
                    return room ? (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{room.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRoomSelection(index)}
                            className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                        <div className="text-xs text-gray-600">
                          <div>{getReservationTypeDisplay(selection.reservationType)}</div>
                          <div>
                            {selection.adults} adulte{selection.adults > 1 ? 's' : ''}, {selection.children.length} enfant{selection.children.length > 1 ? 's' : ''}
                            {selection.children.length > 0 && (
                              <span className="ml-1 text-gray-500">
                                ({selection.children.map((c) => `${c.age} ans`).join(', ')})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {selectedRooms.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold mb-4">
                    <span>Total:</span>
                    <span>{getTotalPrice().toLocaleString()} FCFA</span>
                  </div>
                  <Button 
                    onClick={proceedToBooking}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={selectedRooms.length !== roomsCount}
                  >
                    Continuer ({selectedRooms.length}/{roomsCount})
                  </Button>
                </div>
              )}

              {!canSelectMore && (
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-green-700">Sélection complète !</p>
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
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      {/* Image */}
                      <div className="relative h-48 md:h-full">
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Détails */}
                      <div className="md:col-span-1">
                        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <BedDouble className="h-4 w-4 mr-2" />
                            <span>{room.bed_type}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{room.num_person} personne{room.num_person > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center">
                            <Maximize2 className="h-4 w-4 mr-2" />
                            <span>{room.surface_area}m²</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>Vue {room.view} • Étage {room.floor}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {room.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity.id} variant="outline" className="text-xs">
                              {amenity.name}
                            </Badge>
                          ))}
                          {room.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{room.amenities.length - 3} autres
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-between">
                        <div className="text-right mb-4">
                          {reservationType === 'classic' && (
                            <>
                              <div className="text-2xl font-bold text-blue-600">
                                À partir de {room.price_per_night.toLocaleString()} FCFA
                              </div>
                              <div className="text-sm text-gray-600">par nuit</div>
                            </>
                          )}
                          {reservationType === 'day_use' && (
                            <>
                              <div className="text-2xl font-bold text-blue-600">
                                À partir de {(room.day_use_price || Math.round(room.price_per_night * 0.7)).toLocaleString()} FCFA
                              </div>
                              <div className="text-sm text-gray-600">par jour (Day Use)</div>
                            </>
                          )}
                          {reservationType === 'flexible' && (
                            <>
                              <div className="text-2xl font-bold text-blue-600">
                                À partir de {(room.hourly_rate || Math.round(room.price_per_night / 24)).toLocaleString()} FCFA
                              </div>
                              <div className="text-sm text-gray-600">par heure</div>
                            </>
                          )}
                        </div>

                        <div className="space-y-2">
                          {canSelectMore ? (
                            <Button
                              onClick={() => setExpandedRoom(expandedRoom === room.id ? null : room.id)}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                              {expandedRoom === room.id ? 'Fermer' : 'Sélectionner'}
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className="w-full"
                            >
                              Sélection complète
                            </Button>
                          )}
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
                          className="border-t bg-gray-50"
                        >
                        <RoomConfiguration
  room={room}
  defaultCheckIn={checkIn || ''}
  defaultCheckOut={checkOut || ''}
  defaultAdults={roomsData[selectedRooms.length]?.adults || 2}
  defaultChildren={roomsData[selectedRooms.length]?.children || []}
  searchReservationType={reservationType}
 
  defaultStartTime={startTime || '14:00'}
  defaultEndTime={endTime || '12:00'}
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
  searchReservationType,
  // ✅ AJOUTER CES PARAMÈTRES :
  defaultStartTime,
  defaultEndTime,
  onConfirm, 
  onCancel 
}: {
  room: Room;
  defaultCheckIn: string;
  defaultCheckOut: string;
  defaultAdults: number;
  defaultChildren: number[];
  searchReservationType: string;
  // ✅ AJOUTER CES TYPES :
  defaultStartTime: string;
  defaultEndTime: string;
  onConfirm: (reservationType: string, config: Config) => void;
  onCancel: () => void;
}) {
  const [reservationType, setReservationType] = useState(searchReservationType);
  
  // Utilisation de la fonction de formatage corrigée pour éviter le décalage de dates
  const [checkInDate, setCheckInDate] = useState(() => formatDateForInput(defaultCheckIn));
  const [checkOutDate, setCheckOutDate] = useState(() => formatDateForInput(defaultCheckOut));
  
    const [checkInTime, setCheckInTime] = useState(defaultStartTime); // ✅ Utilise la recherche
  const [checkOutTime, setCheckOutTime] = useState(defaultEndTime);
  const [hours, setHours] = useState(4);
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState<Child[]>([]);

  // Initialiser les enfants avec des IDs uniques
  useEffect(() => {
    if (defaultChildren.length > 0) {
      const initialChildren: Child[] = defaultChildren.map((item: number | { age: number }, i: number) => ({
        id: Date.now() + i,
        age: typeof item === 'number' ? item : item.age
      }));
      setChildren(initialChildren);
    }
  }, [defaultChildren]);
  useEffect(() => {
  if (reservationType === 'flexible' && defaultStartTime && defaultEndTime) {
    // Calculer automatiquement les heures basées sur la recherche
    const start = new Date(`2000-01-01T${defaultStartTime}`);
    const end = new Date(`2000-01-01T${defaultEndTime}`);
    const calculatedHours = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
    setHours(calculatedHours);
  }
}, [reservationType, defaultStartTime, defaultEndTime]);

  const addChild = () => {
    if (children.length < MAX_CHILDREN_PER_ROOM) {
      setChildren(prev => [...prev, { id: Date.now(), age: 5 }]);
    }
  };

  const removeChild = (childId: number) => {
    setChildren(prev => prev.filter(child => child.id !== childId));
  };

  const updateChildAge = (childId: number, age: number) => {
    setChildren(prev => 
      prev.map(child => 
        child.id === childId ? { ...child, age } : child
      )
    );
  };

  const calculatePrice = () => {
    if (reservationType === 'classic') {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
      return room.price_per_night * nights;
    } else if (reservationType === 'day_use') {
      return room.day_use_price ?? Math.round(room.price_per_night * 0.7);
    } else if (reservationType === 'flexible') {
      const hourlyRate = room.hourly_rate ?? Math.round(room.price_per_night / 24);
      return hourlyRate * hours;
    }
    return room.price_per_night;
  };

  const handleConfirm = () => {
    let finalCheckOutTime = checkOutTime;

    if (reservationType === 'flexible') {
      const [hour, minute] = checkInTime.split(':').map(Number);
      const checkInDateObj = new Date(`2000-01-01T${hour}:${minute}:00`);
      const checkOutDateObj = new Date(checkInDateObj.getTime() + hours * 60 * 60 * 1000);
      
      const pad = (n: number) => (n < 10 ? '0' + n : n);
      finalCheckOutTime = `${pad(checkOutDateObj.getHours())}:${pad(checkOutDateObj.getMinutes())}`;
    }

    const config: Config = {
      checkInDate: checkInDate || defaultCheckIn,
      checkOutDate: checkOutDate || defaultCheckOut,
      checkInTime: reservationType === 'flexible' ? checkInTime : '',
      checkOutTime: reservationType === 'flexible' ? finalCheckOutTime : '',
      hours: reservationType === 'flexible' ? hours : 0, 
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
          {room.reservation_types.map((type: ReservationType) => (
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
                  {getReservationTypeDisplay(type.code)}
                </h5>
                <p className="text-xs mt-1" style={{ color: colors.darkTeal + 'CC' }}>
                  {type.description}
                </p>
                {type.slots && type.slots.length > 0 && (
                  <div className="text-xs mt-1" style={{ color: colors.teal }}>
                    {type.slots[0].checkin_time}h - {type.slots[0].checkout_time}h
                  </div>
                )}
                
                {/* Affichage du prix pour ce type */}
                <div className="text-xs mt-2 font-medium" style={{ color: colors.gold }}>
                  {type.code === 'classic' && `${room.price_per_night.toLocaleString()} FCFA/nuit`}
                  {type.code === 'day_use' && `${(room.day_use_price || Math.round(room.price_per_night * 0.7)).toLocaleString()} FCFA/jour`}
                  {type.code === 'flexible' && `${(room.hourly_rate || Math.round(room.price_per_night / 24)).toLocaleString()} FCFA/h`}
                </div>
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
            <div className="text-xs text-gray-500 mt-1">
              Valeur reçue: {defaultCheckIn}
            </div>
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
            <div className="text-xs text-gray-500 mt-1">
              Valeur reçue: {defaultCheckOut}
            </div>
          </div>
        </div>
      )}

      {reservationType === 'day_use' && (
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
            <Label style={{ color: colors.darkTeal }}>Heure de départ</Label>
            <Input
              type="time"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              className="mt-1"
              style={{ borderColor: colors.teal }}
            />
          </div>
        </div>
      )}

      {/* Occupants */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
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
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium" style={{ color: colors.darkTeal }}>
                {children.length} enfant{children.length > 1 ? 's' : ''}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addChild}
                disabled={children.length >= MAX_CHILDREN_PER_ROOM}
                className="h-8 w-8 p-0"
                style={{ borderColor: colors.teal, color: colors.teal }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Liste des enfants avec leurs âges */}
        {children.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium" style={{ color: colors.darkTeal }}>
              Âges des enfants
            </Label>
            {children.map((child, index) => (
              <div key={child.id} className="flex items-center gap-2">
                <span className="text-sm" style={{ color: colors.darkTeal }}>
                  Enfant {index + 1}:
                </span>
                <Input
                  type="number"
                  min={MIN_CHILD_AGE}
                  max={MAX_CHILD_AGE}
                  value={child.age}
                  onChange={(e) => updateChildAge(child.id, parseInt(e.target.value))}
                  className="w-20"
                  style={{ borderColor: colors.teal }}
                />
                <span className="text-sm" style={{ color: colors.darkTeal }}>ans</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeChild(child.id)}
                  className="h-8 w-8 p-0"
                  style={{ borderColor: colors.maroon, color: colors.maroon }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
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
<p className="text-sm text-gray-600">Type sélectionné : {reservationType}</p>

        </div>
        {children.length > 0 && (
          <div className="text-sm mt-2" style={{ color: colors.darkTeal }}>
            Inclus: {children.length} enfant{children.length > 1 ? 's' : ''} 
            ({children.map(c => `${c.age} ans`).join(', ')})
          </div>
        )}
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

