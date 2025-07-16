"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Calendar, Users, Sparkles, CalendarDays, Search, X, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

type DateRange = {
  from?: Date;
  to?: Date;
};

type Child = {
  id: number;
  age: number;
};

type RoomSelection = {
  id: number;
  adults: number;
  children: Child[];
};

type ReservationType = 'classic' | 'day_use' | 'flexible';

const MAX_ROOMS = 5;
const MAX_ADULTS_PER_ROOM = 4;
const MAX_CHILDREN_PER_ROOM = 3;
const MIN_CHILD_AGE = 0;
const MAX_CHILD_AGE = 17;

const CustomPopover = ({ 
  trigger, 
  content,
  align = 'start',
  onClose
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  onClose?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const closePopover = () => {
    setIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        closePopover();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      
      setTimeout(() => {
        if (popoverRef.current && triggerRef.current) {
          const popoverRect = popoverRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          
          popoverRef.current.style.top = '';
          popoverRef.current.style.bottom = '';
          popoverRef.current.style.left = '';
          popoverRef.current.style.right = '';
          popoverRef.current.style.transform = '';
          
          if (popoverRect.bottom > viewportHeight - 20) {
            popoverRef.current.style.bottom = '100%';
            popoverRef.current.style.top = 'auto';
            popoverRef.current.style.marginBottom = '8px';
            popoverRef.current.style.marginTop = '0';
          }
          
          if (popoverRect.right > viewportWidth - 20) {
            popoverRef.current.style.right = '0';
            popoverRef.current.style.left = 'auto';
          }
        }
      }, 10);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 ${
            align === 'center' ? 'left-1/2 transform -translate-x-1/2' : 
            align === 'end' ? 'right-0' : 'left-0'
          }`}
          style={{
            minWidth: '350px',
            maxWidth: '450px',
            maxHeight: '70vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="p-4">
            <button 
              onClick={closePopover}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

const SimpleDatePicker = ({ 
  mode, 
  selected, 
  onSelect, 
  disabled 
}: {
  mode: 'single' | 'range';
  selected: Date | DateRange | undefined;
  onSelect: (date: Date | DateRange | undefined) => void;
  disabled?: { before: Date };
}) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [displayYear, setDisplayYear] = useState(currentYear);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (disabled?.before) {
      return date < disabled.before;
    }
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (mode === 'single') {
      return selected instanceof Date && 
             selected.toDateString() === date.toDateString();
    } else {
      const range = selected as DateRange;
      if (!range?.from) return false;
      if (!range.to) return range.from.toDateString() === date.toDateString();
      return date >= range.from && date <= range.to;
    }
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (mode === 'single') {
      onSelect(date);
    } else {
      const range = selected as DateRange;
      if (!range?.from || (range.from && range.to)) {
        onSelect({ from: date });
      } else {
        if (date < range.from) {
          onSelect({ from: date });
        } else {
          onSelect({ from: range.from, to: date });
        }
      }
    }
  };

  const renderCalendar = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={disabled}
          className={`p-2 text-sm rounded-md hover:bg-blue-100 transition-colors
            ${disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-blue-600'}
            ${selected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (displayMonth === 0) {
              setDisplayMonth(11);
              setDisplayYear(displayYear - 1);
            } else {
              setDisplayMonth(displayMonth - 1);
            }
          }}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          ←
        </button>
        <h3 className="font-semibold text-lg">
          {monthNames[displayMonth]} {displayYear}
        </h3>
        <button
          onClick={() => {
            if (displayMonth === 11) {
              setDisplayMonth(0);
              setDisplayYear(displayYear + 1);
            } else {
              setDisplayMonth(displayMonth + 1);
            }
          }}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderCalendar(displayMonth, displayYear)}
      </div>
    </div>
  );
};

const BookingSection: React.FC = () => {
  const router = useRouter();
  const [reservationType, setReservationType] = useState<ReservationType>('classic');
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [flexibleHours, setFlexibleHours] = useState({ start: '14:00', end: '18:00' });
  const [isMobile, setIsMobile] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isGuestsPopoverOpen, setIsGuestsPopoverOpen] = useState(false);
  const isDayUse = reservationType === 'day_use';
  const dayUseDate = selectedDate; 
  
  const [rooms, setRooms] = useState<RoomSelection[]>([
    { id: 1, adults: 1, children: [] }
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalAdults = useMemo(() => rooms.reduce((sum, room) => sum + room.adults, 0), [rooms]);
  const totalChildren = useMemo(() => rooms.reduce((sum, room) => sum + room.children.length, 0), [rooms]);

  const updateRoomAdults = (roomIndex: number, adults: number) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].adults = adults;
    setRooms(newRooms);
  };

  const addChild = (roomIndex: number) => {
    const newRooms = [...rooms];
    if (newRooms[roomIndex].children.length < MAX_CHILDREN_PER_ROOM) {
      const newChildId = Date.now() + Math.random();
      newRooms[roomIndex].children.push({ id: newChildId, age: 5 });
      setRooms(newRooms);
    }
  };

  const removeChild = (roomIndex: number, childId: number) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].children = newRooms[roomIndex].children.filter(child => child.id !== childId);
    setRooms(newRooms);
  };

  const updateChildAge = (roomIndex: number, childId: number, age: number) => {
    const newRooms = [...rooms];
    const child = newRooms[roomIndex].children.find(c => c.id === childId);
    if (child) {
      child.age = age;
      setRooms(newRooms);
    }
  };

  const addRoom = () => {
    if (rooms.length < MAX_ROOMS) {
      const newRoomId = rooms.length + 1;
      setRooms([...rooms, { id: newRoomId, adults: 2, children: [] }]);
    }
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      const newRooms = rooms.filter((_, i) => i !== index);
      setRooms(newRooms);
    }
  };

  const validateGuestsSelection = () => {
    for (const room of rooms) {
      for (const child of room.children) {
        if (child.age < MIN_CHILD_AGE || child.age > MAX_CHILD_AGE) {
          return false;
        }
      }
    }
    return true;
  };

 const handleGuestsValidation = () => {
  if (validateGuestsSelection()) {
    setIsGuestsPopoverOpen(false); 
  } else {
    alert('Veuillez vérifier que tous les âges des enfants sont valides (0-17 ans)');
  }
};


  const handleReservationTypeChange = (type: ReservationType) => {
    setReservationType(type);
    setDateRange({ from: undefined, to: undefined });
    setSelectedDate(undefined);
  };

  const handleSearch = () => {
    if (reservationType === 'classic') {
      if (!dateRange.from || !dateRange.to) {
        alert('Veuillez sélectionner les dates d\'arrivée et de départ');
        return;
      }
    } else if (reservationType === 'day_use' || reservationType === 'flexible') {
      if (!selectedDate) {
        alert('Veuillez sélectionner une date');
        return;
      }
    }

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      if (room.children.length > 0) {
        for (const child of room.children) {
          if (child.age < MIN_CHILD_AGE || child.age > MAX_CHILD_AGE) {
            alert(`Veuillez renseigner l'âge de tous les enfants pour la chambre ${i + 1}`);
            return;
          }
        }
      }
    }

    setIsSearching(true);
    
    setTimeout(() => {
   const searchData: any = {
  reservationType,
  adults: totalAdults,
  children: totalChildren,
  roomsCount: rooms.length,
  roomsData: JSON.stringify(rooms.map(room => ({
  adults: room.adults,
  children: room.children.map(child => child.age) 
})))
};

      if (reservationType === 'classic') {
        searchData.checkIn = dateRange.from!.toISOString();
        searchData.checkOut = dateRange.to!.toISOString();
      } else if (reservationType === 'day_use') {
        searchData.checkIn = selectedDate!.toISOString();
        searchData.checkOut = selectedDate!.toISOString();
      } else if (reservationType === 'flexible') {
        searchData.checkIn = selectedDate!.toISOString();
        searchData.checkOut = selectedDate!.toISOString();
        searchData.startTime = flexibleHours.start;
        searchData.endTime = flexibleHours.end;
      }

      console.log('Recherche avec:', searchData);
      
      // Navigation vers la page de sélection avec les données
     router.push(`/rooms/selection?${new URLSearchParams(searchData).toString()}`);
      
      setIsSearching(false);
    }, 1000);
  };

  const getDateLabel = useCallback(() => {
    if (reservationType === 'classic') {
      if (!dateRange || !dateRange.from) return 'Sélectionnez une date d\'arrivée';
      if (!dateRange.to) return `${dateRange.from.toLocaleDateString('fr-FR')} - Sélectionnez une date de départ`;
      return `${dateRange.from.toLocaleDateString('fr-FR')} - ${dateRange.to.toLocaleDateString('fr-FR')}`;
    } else {
      return selectedDate 
        ? selectedDate.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : 'Sélectionnez une date';
    }
  }, [reservationType, dateRange, selectedDate]);

  const getFeedback = useCallback(() => {
    if (reservationType === 'classic' && dateRange?.from && dateRange?.to) {
      const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} nuit${diffDays > 1 ? 's' : ''}`;
    } else if ((reservationType === 'day_use' || reservationType === 'flexible') && selectedDate) {
      return reservationType === 'day_use' ? 'Journée sélectionnée' : 'Date flexible sélectionnée';
    }
    return null;
  }, [reservationType, dateRange, selectedDate]);

  const isSearchDisabled = useMemo(() => {
    if (isSearching) return true;
    if (reservationType === 'classic') {
      return !dateRange?.from || !dateRange?.to || rooms.length === 0 || !validateGuestsSelection();
    } else {
      return !selectedDate || rooms.length === 0 || !validateGuestsSelection();
    }
  }, [reservationType, dateRange, selectedDate, rooms, isSearching]);

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Réservez Votre Séjour
            </h2>
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="w-20 h-1 mx-auto bg-yellow-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-yellow-500">
          {/* Type de réservation */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-teal-700 mb-4">TYPE DE RÉSERVATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleReservationTypeChange('classic')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  reservationType === 'classic' 
                    ? 'border-teal-500 bg-teal-50 text-teal-800' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Séjour Classique</span>
                </div>
                <p className="text-sm text-gray-600">
                  Réservation avec nuitée(s) - Arrivée et départ
                </p>
              </button>

              <button
                onClick={() => handleReservationTypeChange('day_use')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  reservationType === 'day_use' 
                    ? 'border-teal-500 bg-teal-50 text-teal-800' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Day Use</span>
                </div>
                <p className="text-sm text-gray-600">
                  Utilisation de jour uniquement - Pas de nuitée
                </p>
              </button>

              <button
                onClick={() => handleReservationTypeChange('flexible')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  reservationType === 'flexible' 
                    ? 'border-teal-500 bg-teal-50 text-teal-800' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Horaires Flexibles</span>
                </div>
                <p className="text-sm text-gray-600">
                  Réservation avec horaires personnalisés
                </p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dates Section */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <CalendarDays className="h-6 w-6 mr-3 text-orange-500" />
                <h3 className="text-lg font-bold text-teal-700">
                  {reservationType === 'classic' ? "DATES DE SÉJOUR" : 
                   reservationType === 'day_use' ? "DATE DE VISITE" : 
                   "DATE FLEXIBLE"}
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {reservationType === 'classic' ? "Choisissez vos dates d'arrivée et de départ" : 
                 reservationType === 'day_use' ? "Choisissez votre date de visite" : 
                 "Choisissez votre date avec horaires flexibles"}
              </p>

              <CustomPopover
                trigger={
                  <button className="w-full p-3 border-2 border-teal-500 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center">
                    <Calendar className="mr-3 h-5 w-5 text-teal-500" />
                    <span className="flex-1">{getDateLabel()}</span>
                  </button>
                }
                content={
                  <div className="w-full">
                    <SimpleDatePicker
                      mode={reservationType === 'classic' ? "range" : "single"}
                      selected={reservationType === 'classic' ? dateRange : selectedDate}
                      onSelect={(date) => {
                        if (reservationType === 'classic') {
                          setDateRange(date as DateRange);
                        } else {
                          setSelectedDate(date as Date);
                        }
                      }}
                      disabled={{ before: new Date() }}
                    />
                    
                    {getFeedback() && (
                      <div className="mt-4 p-2 bg-green-50 text-green-700 text-sm rounded-md text-center">
                        {getFeedback()}
                      </div>
                    )}
                  </div>
                }
                align="start"
              />

              {/* Horaires flexibles */}
              {reservationType === 'flexible' && (
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Horaires personnalisés
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">
                        Heure d'arrivée
                      </label>
                      <input
                        type="time"
                        value={flexibleHours.start}
                        onChange={(e) => setFlexibleHours(prev => ({ ...prev, start: e.target.value }))}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">
                        Heure de départ
                      </label>
                      <input
                        type="time"
                        value={flexibleHours.end}
                        onChange={(e) => setFlexibleHours(prev => ({ ...prev, end: e.target.value }))}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guests Section */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 mr-3 text-orange-500" />
                <h3 className="text-lg font-bold text-teal-700">INVITÉS & CHAMBRES</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Sélectionnez le nombre d'invités et de chambres
              </p>

              <CustomPopover
                trigger={
                  <button className="w-full p-3 border-2 border-teal-500 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center">
                    <Users className="mr-3 h-5 w-5 text-teal-500" />
                    <span className="flex-1">
                      {rooms.length} chambre{rooms.length > 1 ? 's' : ''}, {totalAdults} adulte{totalAdults > 1 ? 's' : ''}, {totalChildren} enfant{totalChildren > 1 ? 's' : ''}
                    </span>
                  </button>
                }
                content={
                  <div className="space-y-4 w-full">
                    <h4 className="font-semibold text-gray-800 pb-2 border-b">Configuration des chambres</h4>
                    
                    {rooms.map((room, index) => (
                      <div key={room.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium text-gray-700">Chambre {index + 1}</h5>
                          {rooms.length > 1 && (
                            <button 
                              onClick={() => removeRoom(index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 hover:bg-red-50 rounded"
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Adultes (18+ ans)
                          </label>
                          <div className="flex items-center justify-between bg-white rounded-lg border p-2">
                            <button
                              onClick={() => updateRoomAdults(index, Math.max(1, room.adults - 1))}
                              disabled={room.adults <= 1}
                              className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="font-medium px-2">{room.adults}</span>
                            <button
                              onClick={() => updateRoomAdults(index, Math.min(MAX_ADULTS_PER_ROOM, room.adults + 1))}
                              disabled={room.adults >= MAX_ADULTS_PER_ROOM}
                              className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              Enfants (0-17 ans)
                            </label>
                            <button
                              onClick={() => addChild(index)}
                              disabled={room.children.length >= MAX_CHILDREN_PER_ROOM}
                              className="text-teal-600 hover:text-teal-800 text-sm font-medium px-2 py-1 hover:bg-teal-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              + Ajouter
                            </button>
                          </div>
                          
                          {room.children.length === 0 ? (
                            <div className="text-center py-4 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                              Aucun enfant
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {room.children.map((child, childIndex) => (
                                <div key={child.id} className="flex items-center gap-2 p-2 bg-white rounded-lg border">
                                  <span className="text-sm text-gray-600 min-w-0">
                                    Enfant {childIndex + 1}:
                                  </span>
                                  <select
                                    value={child.age}
                                    onChange={(e) => updateChildAge(index, child.id, parseInt(e.target.value))}
                                    className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                  >
                                    {Array.from({ length: MAX_CHILD_AGE - MIN_CHILD_AGE + 1 }, (_, i) => (
                                      <option key={i} value={i + MIN_CHILD_AGE}>
                                        {i + MIN_CHILD_AGE} an{i + MIN_CHILD_AGE > 1 ? 's' : ''}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={() => removeChild(index, child.id)}
                                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 hover:bg-red-50 rounded"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <button
                      onClick={addRoom}
                      disabled={rooms.length >= MAX_ROOMS}
                      className="w-full p-3 border-2 border-dashed border-teal-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-teal-600 font-medium"
                    >
                      + Ajouter une chambre (max {MAX_ROOMS})
                    </button>
                    
                    {/* Bouton de validation */}
                    <div className="pt-4 border-t">
                      <button
                        onClick={handleGuestsValidation}
                        className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                      >
                        Valider la sélection
                      </button>
                    </div>
                  </div>
                }
                align="start"
                onClose={() => setIsGuestsPopoverOpen(false)}
              />
            </div>

            {/* Search Section */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Search className="mr-3 text-orange-500" />
                <h3 className="text-lg font-bold text-teal-700">RECHERCHE</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Lancez votre recherche de chambres disponibles
              </p>

              <button
                onClick={handleSearch}
                disabled={isSearchDisabled}
                className="w-full h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <Search className="mr-3" />
                RECHERCHER
              </button>

              {/* Status Indicator */}
              <div className="text-center text-sm text-gray-500 flex items-center justify-center">
                <div className="text-center text-sm">
                  {isSearching 
                    ? 'Recherche en cours...'
                    : isSearchDisabled 
                      ? 'Complétez tous les champs'
                      : 'Prêt pour la recherche'}
                </div>
              </div>

              {/* Validation Messages */}
              {!isSearching && (
                <div className="space-y-1 text-xs">
                 {isDayUse ? (!dayUseDate && <p className="text-red-500">• Sélectionnez une date</p>) : (
                    <>
                      {!dateRange?.from && <p className="text-red-500">• Sélectionnez une date d'arrivée</p>}
                      {!dateRange?.to && dateRange?.from && <p className="text-red-500">• Sélectionnez une date de départ</p>}
                      {dateRange?.from && dateRange?.to && dateRange.to < dateRange.from && 
                        <p className="text-red-500">• La date de départ doit être après l'arrivée</p>}
                    </>
                  )}
                  {rooms.length === 0 && <p className="text-red-500">• Ajoutez au moins une chambre</p>}
                  {totalAdults === 0 && <p className="text-red-500">• Ajoutez au moins un adulte</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
