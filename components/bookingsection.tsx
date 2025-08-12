"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Calendar, Users, Sparkles, CalendarDays, Search, X, Clock, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Room } from '../types';

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
  children: number; // Changé de Child[] à number pour correspondre au fichier principal
};

interface BookingSectionProps {
  rooms: Room[];
  colors: {
    teal: string;
    lightTeal: string;
    darkTeal: string;
    gold: string;
    orange: string;
    maroon: string;
    white: string;
  };
  onSearch?: (params: {
    date: Date | DateRange | undefined;
    rooms: RoomSelection[];
    isDayUse: boolean;
    totalAdults: number;
    totalChildren: number;
  }) => void;
}

interface SearchData {
  reservationType: ReservationType;
  adults: number;
  children: number;
  roomsCount: number;
  roomsData: string;
  checkIn?: string;
  checkOut?: string;
  startTime?: string;
  endTime?: string;
}

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

  const closePopover = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

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
          
          // Reset styles
          popoverRef.current.style.top = '';
          popoverRef.current.style.bottom = '';
          popoverRef.current.style.left = '';
          popoverRef.current.style.right = '';
          popoverRef.current.style.transform = '';
          
          // Adjust position if near viewport edges
          if (popoverRect.bottom > viewportHeight - 20) {
            popoverRef.current.style.bottom = '100%';
            popoverRef.current.style.top = 'auto';
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
  }, [isOpen, closePopover]);

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-50 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 ${
            align === 'center' ? 'left-1/2 transform -translate-x-1/2' : 
            align === 'end' ? 'right-0' : 'left-0'
          }`}
          style={{
            minWidth: '280px',
            maxWidth: 'min(450px, 90vw)',
            maxHeight: '70vh',
            overflowY: 'auto',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
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
      days.push(<div key={`empty-${i}`} className="p-1"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = isDateDisabled(date);
      const isSelected = isDateSelected(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={isDisabled}
          className={`p-1 w-8 h-8 text-sm rounded-full transition-colors flex items-center justify-center
            ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-blue-100'}
            ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}
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
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => {
            if (displayMonth === 0) {
              setDisplayMonth(11);
              setDisplayYear(displayYear - 1);
            } else {
              setDisplayMonth(displayMonth - 1);
            }
          }}
          className="p-1 rounded-md hover:bg-gray-100"
          aria-label="Mois précédent"
        >
          ←
        </button>
        <h3 className="font-semibold text-base">
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
          className="p-1 rounded-md hover:bg-gray-100"
          aria-label="Mois suivant"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
        {['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'].map(day => (
          <div key={day} className="p-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderCalendar(displayMonth, displayYear)}
      </div>
    </div>
  );
};

// Changement principal : destructurer les props correctement
const BookingSection: React.FC<BookingSectionProps> = ({ rooms,  onSearch }) => {
  const router = useRouter();
  const [reservationType, setReservationType] = useState<ReservationType>('classic');
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [flexibleHours, setFlexibleHours] = useState({ start: '14:00', end: '18:00' });
  const [isSearching, setIsSearching] = useState(false);

  const [roomSelections, setRoomSelections] = useState([
    { id: 1, adults: 1, children: [] as Child[] }
  ]);

  const totalAdults = useMemo(() => roomSelections.reduce((sum, room) => sum + room.adults, 0), [roomSelections]);
  const totalChildren = useMemo(() => roomSelections.reduce((sum, room) => sum + room.children.length, 0), [roomSelections]);

  const updateRoomAdults = (roomIndex: number, adults: number) => {
    const newRooms = [...roomSelections];
    newRooms[roomIndex].adults = adults;
    setRoomSelections(newRooms);
  };

  const addChild = (roomIndex: number) => {
    const newRooms = [...roomSelections];
    if (newRooms[roomIndex].children.length < MAX_CHILDREN_PER_ROOM) {
      newRooms[roomIndex].children.push({ id: Date.now(), age: 5 });
      setRoomSelections(newRooms);
    }
  };

  const removeChild = (roomIndex: number, childId: number) => {
    const newRooms = [...roomSelections];
    newRooms[roomIndex].children = newRooms[roomIndex].children.filter(c => c.id !== childId);
    setRoomSelections(newRooms);
  };

  const updateChildAge = (roomIndex: number, childId: number, age: number) => {
    const newRooms = [...roomSelections];
    const child = newRooms[roomIndex].children.find(c => c.id === childId);
    if (child) child.age = age;
    setRoomSelections(newRooms);
  };

  const addRoom = () => {
    if (roomSelections.length < MAX_ROOMS) {
      setRoomSelections([...roomSelections, { id: Date.now(), adults: 2, children: [] }]);
    }
  };

  const removeRoom = (index: number) => {
    if (roomSelections.length > 1) {
      setRoomSelections(roomSelections.filter((_, i) => i !== index));
    }
  };

  const validateGuestsSelection = useCallback(() => {
    for (const room of roomSelections) {
      for (const child of room.children) {
        if (child.age < MIN_CHILD_AGE || child.age > MAX_CHILD_AGE) {
          return false;
        }
      }
    }
    return true;
  }, [roomSelections]);

  const handleGuestsValidation = () => {
    if (!validateGuestsSelection()) {
      alert("Veuillez vérifier que tous les âges des enfants sont valides (0-17 ans)");
    }
  };

  const handleReservationTypeChange = (type: ReservationType) => {
    setReservationType(type);
    setDateRange({});
    setSelectedDate(undefined);
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Appeler la fonction onSearch si elle est fournie
    if (onSearch) {
      const searchParams = {
        date: reservationType === 'classic' ? dateRange : selectedDate,
        rooms: roomSelections.map(room => ({
          id: room.id,
          adults: room.adults,
          children: room.children.length // Convertir en nombre pour correspondre au type attendu
        })),
        isDayUse: reservationType === 'day_use',
        totalAdults,
        totalChildren
      };
      onSearch(searchParams);
    }
    
    setTimeout(() => {
      const searchData: SearchData = {
        reservationType,
        adults: totalAdults,
        children: totalChildren,
        roomsCount: roomSelections.length,
        roomsData: JSON.stringify(roomSelections.map(room => ({
          adults: room.adults,
          children: room.children.map(child => child.age)
        })))
      };

      // Add dates based on reservation type
      if (reservationType === 'classic') {
        searchData.checkIn = dateRange.from!.toISOString();
        searchData.checkOut = dateRange.to!.toISOString();
      } else {
        searchData.checkIn = selectedDate!.toISOString();
        searchData.checkOut = selectedDate!.toISOString();
        if (reservationType === 'flexible') {
          searchData.startTime = flexibleHours.start;
          searchData.endTime = flexibleHours.end;
        }
      }

      router.push(`/rooms/selection?${new URLSearchParams(Object.entries(searchData)).toString()}`);
      setIsSearching(false);
    }, 1000);
  };

  const getDateLabel = useCallback(() => {
    if (reservationType === 'classic') {
      if (!dateRange.from) return "Sélectionnez une date d'arrivée";
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
    if (reservationType === 'classic' && dateRange.from && dateRange.to) {
      const diffDays = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
      return `${diffDays} nuit${diffDays > 1 ? 's' : ''}`;
    } else if (selectedDate) {
      return reservationType === 'day_use' ? 'Journée sélectionnée' : 'Date flexible sélectionnée';
    }
    return null;
  }, [reservationType, dateRange, selectedDate]);

  const isSearchDisabled = useMemo(() => {
    if (isSearching) return true;
    if (reservationType === 'classic') {
      return !dateRange.from || !dateRange.to || !validateGuestsSelection();
    }
    return !selectedDate || !validateGuestsSelection();
  }, [reservationType, dateRange, selectedDate, isSearching, validateGuestsSelection]);

  const getReservationTypeLabel = () => {
    switch (reservationType) {
      case 'classic': return 'Séjour Classique';
      case 'day_use': return 'Day Use';
      case 'flexible': return 'Horaires Flexibles';
      default: return 'Séjour Classique';
    }
  };

  const getReservationTypeIcon = () => {
    switch (reservationType) {
      case 'classic': return <Calendar className="h-4 w-4" />;
      case 'day_use': return <CalendarDays className="h-4 w-4" />;
      case 'flexible': return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Réservez Votre Séjour
            </h2>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="w-16 h-1 mx-auto bg-yellow-500 rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-yellow-400">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Type de réservation */}
            <div className="space-y-3">
              <div className="flex items-center">
                {getReservationTypeIcon()}
                <h3 className="ml-2 text-sm font-bold text-teal-700 uppercase tracking-wider">Type</h3>
              </div>
              
              <p className="text-xs text-gray-600">
                Choisissez votre type de réservation
              </p>

              <CustomPopover
                trigger={
                  <button className="w-full p-2 sm:p-3 border border-teal-500 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center justify-between">
                    <div className="flex items-center">
                      {getReservationTypeIcon()}
                      <span className="ml-2 text-sm text-teal-700 font-medium truncate">
                        {getReservationTypeLabel()}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-teal-500" />
                  </button>
                }
                content={
                  <div className="space-y-2 w-full">
                    <h4 className="font-semibold text-gray-800 pb-2 border-b mb-2 text-sm">Type de réservation</h4>
                    
                    <button
                      onClick={() => handleReservationTypeChange('classic')}
                      className={`w-full p-2 rounded-lg border text-left transition-all text-sm ${
                        reservationType === 'classic' 
                          ? 'border-teal-500 bg-teal-50 text-teal-800' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-medium">Séjour Classique</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Réservation avec nuitée(s)
                      </p>
                    </button>

                    <button
                      onClick={() => handleReservationTypeChange('day_use')}
                      className={`w-full p-2 rounded-lg border text-left transition-all text-sm ${
                        reservationType === 'day_use' 
                          ? 'border-teal-500 bg-teal-50 text-teal-800' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        <span className="font-medium">Day Use</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Utilisation de jour uniquement
                      </p>
                    </button>

                    <button
                      onClick={() => handleReservationTypeChange('flexible')}
                      className={`w-full p-2 rounded-lg border text-left transition-all text-sm ${
                        reservationType === 'flexible' 
                          ? 'border-teal-500 bg-teal-50 text-teal-800' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">Horaires Flexibles</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Horaires personnalisés
                      </p>
                    </button>
                  </div>
                }
              />
            </div>
            
            {/* Dates Section */}
            <div className="space-y-3">
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-orange-500" />
                <h3 className="text-sm font-bold text-teal-700 uppercase tracking-wider">
                  {reservationType === 'classic' ? "Dates" : "Date"}
                </h3>
              </div>
              
              <p className="text-xs text-gray-600">
                {reservationType === 'classic' 
                  ? "Choisissez vos dates" 
                  : "Choisissez votre date"}
              </p>

              <CustomPopover
                trigger={
                  <button className="w-full p-2 sm:p-3 border border-teal-500 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-teal-500" />
                    <span className="text-sm truncate">{getDateLabel()}</span>
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
                      <div className="mt-3 p-2 bg-green-50 text-green-700 text-xs rounded-md text-center">
                        {getFeedback()}
                      </div>
                    )}
                  </div>
                }
              />

              {/* Horaires flexibles */}
              {reservationType === 'flexible' && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Horaires
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="block text-xs font-medium text-blue-700 mb-1">
                        Arrivée
                      </label>
                      <input
                        type="time"
                        value={flexibleHours.start}
                        onChange={(e) => setFlexibleHours(prev => ({ ...prev, start: e.target.value }))}
                        className="w-full px-2 py-1 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-700 mb-1">
                        Départ
                      </label>
                      <input
                        type="time"
                        value={flexibleHours.end}
                        onChange={(e) => setFlexibleHours(prev => ({ ...prev, end: e.target.value }))}
                        className="w-full px-2 py-1 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guests Section */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-500" />
                <h3 className="text-sm font-bold text-teal-700 uppercase tracking-wider">
                  Invités & Chambres
                </h3>
              </div>
              
              <p className="text-xs text-gray-600">
                Sélectionnez le nombre d&apos;invités et chambres
              </p>

              <CustomPopover
                trigger={
                  <button className="w-full p-2 sm:p-3 border border-teal-500 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center">
                    <Users className="mr-2 h-4 w-4 text-teal-500" />
                    <span className="text-sm truncate">
                      {roomSelections.length} chambre{roomSelections.length > 1 ? 's' : ''}, {totalAdults} adulte{totalAdults > 1 ? 's' : ''}, {totalChildren} enfant{totalChildren > 1 ? 's' : ''}
                    </span>
                  </button>
                }
                content={
                  <div className="space-y-3 w-full">
                    <h4 className="font-semibold text-gray-800 text-sm pb-2 border-b">
                      Configuration des chambres
                    </h4>
                    
                    {roomSelections.map((room, index) => (
                      <div key={room.id} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium text-gray-700 text-sm">Chambre {index + 1}</h5>
                          {roomSelections.length > 1 && (
                            <button 
                              onClick={() => removeRoom(index)}
                              className="text-red-500 hover:text-red-700 text-xs px-1 py-0.5 hover:bg-red-50 rounded"
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1 block">
                            Adultes (18+ ans)
                          </label>
                          <div className="flex items-center justify-between bg-white rounded-lg border p-1">
                            <button
                              onClick={() => updateRoomAdults(index, Math.max(1, room.adults - 1))}
                              disabled={room.adults <= 1}
                              className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="font-medium px-1 text-sm">{room.adults}</span>
                            <button
                              onClick={() => updateRoomAdults(index, Math.min(MAX_ADULTS_PER_ROOM, room.adults + 1))}
                              disabled={room.adults >= MAX_ADULTS_PER_ROOM}
                              className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-medium text-gray-700">
                              Enfants (0-17 ans)
                            </label>
                            <button
                              onClick={() => addChild(index)}
                              disabled={room.children.length >= MAX_CHILDREN_PER_ROOM}
                              className="text-teal-600 hover:text-teal-800 text-xs px-1 py-0.5 hover:bg-teal-50 rounded disabled:opacity-50"
                            >
                              + Ajouter
                            </button>
                          </div>
                          
                          {room.children.length === 0 ? (
                            <div className="text-center py-2 text-gray-500 text-xs border border-dashed border-gray-200 rounded-lg">
                              Aucun enfant
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {room.children.map((child, childIndex) => (
                                <div key={child.id} className="flex items-center gap-1 p-1 bg-white rounded border text-xs">
                                  <span className="text-gray-600 truncate">
                                    Enfant {childIndex + 1}:
                                  </span>
                                  <select
                                    value={child.age}
                                    onChange={(e) => updateChildAge(index, child.id, parseInt(e.target.value))}
                                    className="flex-1 px-1 py-0.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  >
                                    {Array.from({ length: MAX_CHILD_AGE - MIN_CHILD_AGE + 1 }, (_, i) => (
                                      <option key={i} value={i + MIN_CHILD_AGE}>
                                        {i + MIN_CHILD_AGE} an{i + MIN_CHILD_AGE > 1 ? 's' : ''}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={() => removeChild(index, child.id)}
                                    className="text-red-500 hover:text-red-700 px-1 py-0.5 hover:bg-red-50 rounded"
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
                      className="w-full p-2 border border-dashed border-teal-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors disabled:opacity-50 text-teal-600 font-medium text-xs"
                    >
                      + Ajouter une chambre (max {MAX_ROOMS})
                    </button>
                    
                    <div className="pt-2 border-t">
                      <button
                        onClick={handleGuestsValidation}
                        className="w-full p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                }
                
              />
            </div>

            {/* Search Section */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-orange-500" />
                <h3 className="text-sm font-bold text-teal-700 uppercase tracking-wider">
                  Recherche
                </h3>
              </div>
              
              <p className="text-xs text-gray-600">
                Lancez votre recherche
              </p>

              <button
                onClick={handleSearch}
                disabled={isSearchDisabled}
                className={`w-full p-2 sm:p-3 rounded-lg flex items-center justify-center font-medium text-sm ${
                  isSearchDisabled 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </button>

              <div className="text-center text-xs text-gray-500">
                {isSearching 
                  ? 'Recherche en cours...'
                  : isSearchDisabled 
                    ? 'Complétez tous les champs'
                    : 'Prêt pour la recherche'}
              </div>

              {!isSearching && (
                <div className="space-y-1 text-xs">
                  {reservationType === 'classic' ? (
                    <>
                      {!dateRange.from && <p className="text-red-500">• Sélectionnez une date d&eacute;arrivée</p>}
                      {!dateRange.to && dateRange.from && <p className="text-red-500">• Sélectionnez une date de départ</p>}
                    </>
                  ) : !selectedDate && <p className="text-red-500">• Sélectionnez une date</p>}
                  
                  {!validateGuestsSelection() && <p className="text-red-500">• Vérifiez les âges des enfants</p>}
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