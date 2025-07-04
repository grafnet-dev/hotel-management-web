import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Calendar, Users, Sparkles, CalendarDays, Search, X  } from 'lucide-react';
import { useRouter } from 'next/navigation';

type DateRange = {
  from?: Date;
  to?: Date;
};

type RoomSelection = {
  id: number;
  adults: number;
  children: number;
};



const MAX_ROOMS = 5;
const MAX_ADULTS_PER_ROOM = 4;
const MAX_CHILDREN_PER_ROOM = 3;



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
      
      // Améliorer le positionnement du popover
      setTimeout(() => {
        if (popoverRef.current && triggerRef.current) {
          const popoverRect = popoverRef.current.getBoundingClientRect();
         
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          
          // Réinitialiser les styles de position
          popoverRef.current.style.top = '';
          popoverRef.current.style.bottom = '';
          popoverRef.current.style.left = '';
          popoverRef.current.style.right = '';
          popoverRef.current.style.transform = '';
          
          // Vérifier si le popover dépasse en bas
          if (popoverRect.bottom > viewportHeight - 20) {
            popoverRef.current.style.bottom = '100%';
            popoverRef.current.style.top = 'auto';
            popoverRef.current.style.marginBottom = '8px';
            popoverRef.current.style.marginTop = '0';
          }
          
          // Vérifier si le popover dépasse à droite
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
            minWidth: '300px',
            maxWidth: '400px',
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

// Composant DatePicker simple
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

    // Jours vides au début
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Jours du mois
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
      {/* Navigation */}
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

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>

      {/* Calendrier */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar(displayMonth, displayYear)}
      </div>
    </div>
  );
};

const BookingSection: React.FC = () => {
  
  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [dayUseDate, setDayUseDate] = useState<Date | undefined>();
  const [isDayUse, setIsDayUse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  
  const [rooms, setRooms] = useState<RoomSelection[]>([
    { id: 1, adults: 1, children: 0 }
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
  const totalChildren = useMemo(() => rooms.reduce((sum, room) => sum + room.children, 0), [rooms]);

  const updateRoom = (index: number, type: 'adults' | 'children', value: number) => {
    const newRooms = [...rooms];
    newRooms[index][type] = value;
    setRooms(newRooms);
  };

const addRoom = () => {
  if (rooms.length < 4) {
    const newRoomId = rooms.length + 1; 
    setRooms([...rooms, { id: newRoomId, adults: 2, children: 0 }]);
  }
};

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      const newRooms = rooms.filter((_, i) => i !== index);
      setRooms(newRooms);
    }
  };

 const handleSearch = () => {
  if (isDayUse) {
    if (!dayUseDate) {
      alert('Veuillez sélectionner une date pour la journée');
      return;
    }
  } else {
    // Vérification de sécurité avec l'opérateur ?.
    if (!dateRange?.from || !dateRange?.to) {
      alert('Veuillez sélectionner les dates de séjour');
      return;
    }
  }

  const searchParams = new URLSearchParams({
    ...(isDayUse ? {
      dayUseDate: dayUseDate!.toISOString(),
      isDayUse: 'true'
    } : {
      checkIn: dateRange!.from!.toISOString(),
      checkOut: dateRange!.to!.toISOString(),
      isDayUse: 'false'
    }),
    adults: totalAdults.toString(),
    children: totalChildren.toString(),
    roomsCount: rooms.length.toString(),
    roomsData: JSON.stringify(rooms)
  });
  
  router.push(`/rooms/selection?${searchParams.toString()}`);
};



const getLabel = useCallback(() => {
  if (isDayUse) {
    return dayUseDate 
      ? dayUseDate.toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : 'Sélectionnez une date';
  }
  
  // Vérification de sécurité pour dateRange
  if (!dateRange || !dateRange.from) return 'Sélectionnez une date d\'arrivée';
  if (!dateRange.to) return `${dateRange.from.toLocaleDateString('fr-FR')} - Sélectionnez une date de départ`;
  
  return `${dateRange.from.toLocaleDateString('fr-FR')} - ${dateRange.to.toLocaleDateString('fr-FR')}`;
}, [isDayUse, dayUseDate, dateRange]);

 const getFeedback = useCallback(() => {
  if (isDayUse && dayUseDate) return 'Journée sélectionnée';
  if (dateRange?.from && dateRange?.to) {
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} nuit${diffDays > 1 ? 's' : ''}`;
  }
  return null;
}, [isDayUse, dayUseDate, dateRange]);

 const handleDayUseToggle = useCallback((checked: boolean) => {
  setIsDayUse(checked);
  setDayUseDate(undefined);
 
  setDateRange({ from: undefined, to: undefined });
}, []);

const isSearchDisabled = useMemo(() => {
  if (isSearching) return true;
  if (isDayUse) {
    return !dayUseDate;
  } else {
    return !dateRange?.from || !dateRange?.to || rooms.length === 0;
  }
}, [isDayUse, dayUseDate, dateRange, rooms.length, isSearching]);

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

        {/* Booking Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-yellow-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dates Section */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <CalendarDays className="h-6 w-6 mr-3 text-orange-500" />
                <h3 className="text-lg font-bold text-teal-700">
                  {isDayUse ? "JOUR DE VISITE" : "DATES DE SÉJOUR"}
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {isDayUse ? "Veuillez choisir une date" : "Veuillez choisir les dates de votre séjour"}
              </p>

              <CustomPopover
                trigger={
                  <button className="w-full p-3 border-2 border-teal-500 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center">
                    <Calendar className="mr-3 h-5 w-5 text-teal-500" />
                    <span className="flex-1">{getLabel()}</span>
                  </button>
                }
                content={
                  <div className="w-full">
                    <SimpleDatePicker
                      mode={isDayUse ? "single" : "range"}
                      selected={isDayUse ? dayUseDate : dateRange}
                      onSelect={(date) => {
                        if (isDayUse) {
                          setDayUseDate(date as Date);
                        } else {
                          setDateRange(date as DateRange);
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

              {/* Day Use Toggle */}
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                <input
                  type="checkbox"
                  id="dayuse"
                  checked={isDayUse}
                  onChange={(e) => handleDayUseToggle(e.target.checked)}
                  className="w-5 h-5 text-orange-500 rounded"
                />
                <label htmlFor="dayuse" className="text-sm font-semibold text-teal-700 cursor-pointer">
                  RÉSERVATION DE JOUR (DAY USE)
                </label>
              </div>
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
                        
                        <div className="grid grid-cols-2 gap-4">
                          {/* Adults */}
                          <div>
                            <label className="text-xs text-gray-500 mb-2 block">Adultes</label>
                            <div className="flex items-center justify-between bg-white rounded-lg border p-1">
                              <button
                                onClick={() => updateRoom(index, 'adults', Math.max(1, room.adults - 1))}
                                disabled={room.adults <= 1}
                                className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                              >
                                −
                              </button>
                              <span className="font-medium px-2">{room.adults}</span>
                              <button
                                onClick={() => updateRoom(index, 'adults', Math.min(MAX_ADULTS_PER_ROOM, room.adults + 1))}
                                disabled={room.adults >= MAX_ADULTS_PER_ROOM}
                                className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div>
                            <label className="text-xs text-gray-500 mb-2 block">Enfants</label>
                            <div className="flex items-center justify-between bg-white rounded-lg border p-1">
                              <button
                                onClick={() => updateRoom(index, 'children', Math.max(0, room.children - 1))}
                                disabled={room.children <= 0}
                                className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                              >
                                −
                              </button>
                              <span className="font-medium px-2">{room.children}</span>
                              <button
                                onClick={() => updateRoom(index, 'children', Math.min(MAX_CHILDREN_PER_ROOM, room.children + 1))}
                                disabled={room.children >= MAX_CHILDREN_PER_ROOM}
                                className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
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
                  </div>
                }
                align="start"
              />
            </div>

            {/* Search Section */}
             <div className="space-y-4">
              <div className="flex items-center">
                <Search className="mr-3 text-orange-500" />
                <h3>RECHERCHE</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Lancez votre recherche de chambres disponibles
              </p>

             <button
                onClick={handleSearch}
                disabled={isSearchDisabled}
                className="w-full h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center"
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
                    ? 'Completez tous les champs'
                    : 'Pret pour la recherche'}
              </div>
              </div>

              {/* Validation Messages */}
              {!isSearching && (
                <div className="space-y-1 text-xs">
                  {isDayUse ? (
                    !dayUseDate && <p className="text-red-500">• Sélectionnez une date</p>
                  ) : (
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
