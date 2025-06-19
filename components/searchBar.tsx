
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  Calendar, 
  Sparkles, 
  Search 
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '../lib/utils';

// Types
interface DateRange {
  from?: Date;
  to?: Date;
}

interface Room {
  adults: number;
  children: number;
}

interface SearchData {
  date: Date | DateRange | undefined;
  isDayUse: boolean;
  rooms: Room[];
  totalAdults: number;
  totalChildren: number;
}

interface SearchBarProps {
  onSearch?: (data: SearchData) => void;
  className?: string;
  compact?: boolean;
  showDecorations?: boolean;
}

// Composants UI basiques
const Card = ({ children, className: string, style: React.CSSProperties, ...props }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} style={style} {...props}>
    {children}
  </div>
);

const Button = ({ children, className: string, variant = "default", size = "default", style, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10",
  };
  
  return (
    <button 
    className={cn(baseClasses, variants[variant], sizes[size], className)} 
    style={props.style}
    {...props}
  >
    {children}
  </button>
  );
};

const Label = ({ children, className, style, ...props }) => (
  <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} style={style} {...props}>
    {children}
  </label>
);

const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const PopoverTrigger = ({ children, isOpen, setIsOpen }) => (
  <div onClick={() => setIsOpen(!isOpen)}>
    {children}
  </div>
);

const PopoverContent = ({ children, className, align = "center", isOpen, setIsOpen, style }) => {
  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2",
          className
        )}
        style={{ top: '100%', marginTop: '4px', ...style }}
      >
        {children}
      </motion.div>
    </>
  );
};

// Configuration des couleurs
const colors = {
  maroon: '#8B0000',
  gold: '#FFD700',
  teal: '#008B8B',
  darkTeal: '#006666',
  orange: '#FF8C00'
};

// Hook pour détecter mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Composant principal
const SearchBar = ({ 
  onSearch, 
  className = "", 
  compact = false, 
  showDecorations = true 
}: SearchBarProps) => {
  const [date, setDate] = useState<Date | DateRange | undefined>();
  const [isDayUse, setIsDayUse] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([{ adults: 2, children: 0 }]);
  const isMobile = useIsMobile();

  // Calculs
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);

  // Fonctions utilitaires
  const getLabel = () => {
    if (!date) return isDayUse ? "Sélectionner une date" : "Sélectionner les dates";
    
    if (isDayUse && date instanceof Date) {
      return date.toLocaleDateString('fr-FR');
    }
    
    if (!isDayUse && typeof date === 'object' && date && 'from' in date) {
      const { from, to } = date as DateRange;
      if (from && to) {
        return `${from.toLocaleDateString('fr-FR')} - ${to.toLocaleDateString('fr-FR')}`;
      }
      if (from) {
        return `À partir du ${from.toLocaleDateString('fr-FR')}`;
      }
    }
    
    return isDayUse ? "Sélectionner une date" : "Sélectionner les dates";
  };

  const getFeedback = () => {
    if (!date) return null;
    
    if (isDayUse && date instanceof Date) {
      return `Visite prévue le ${date.toLocaleDateString('fr-FR')}`;
    }
    
    if (!isDayUse && typeof date === 'object' && date && 'from' in date) {
      const { from, to } = date as DateRange;
      if (from && to) {
        const nights = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
        return `Séjour de ${nights} nuit${nights > 1 ? 's' : ''}`;
      }
    }
    
    return null;
  };

  const updateRoom = (index: number, field: 'adults' | 'children', value: number) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], [field]: value };
    setRooms(newRooms);
  };

  const addRoom = () => {
    if (rooms.length < 5) {
      setRooms([...rooms, { adults: 2, children: 0 }]);
    }
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((_, i) => i !== index));
    }
  };

  const handleSearch = () => {
    const searchData: SearchData = {
      date,
      isDayUse,
      rooms,
      totalAdults,
      totalChildren
    };
    
    console.log('Données de recherche:', searchData);
    onSearch?.(searchData);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: compact ? 20 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("py-8 relative", compact && "py-4", className)}
    >
      {/* Éléments décoratifs */}
      {showDecorations && !compact && (
        <div className="absolute inset-0 rounded-xl backdrop-blur-sm pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-10"
            style={{ backgroundColor: colors.gold }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 h-24 rounded-full opacity-10"
            style={{ backgroundColor: colors.teal }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={!compact ? { 
            y: -8,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          } : {}}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card
            className={cn(
              "relative z-10 p-6 border-0 shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm",
              !compact && "-mt-32 p-8 md:p-10 shadow-2xl rounded-3xl"
            )}
            style={{ 
              background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)`,
              border: `3px solid ${colors.gold}`,
              boxShadow: `0 20px 40px -12px rgba(128, 0, 32, 0.3), 0 0 0 1px ${colors.gold}33`
            }}
          >
            {/* En-tête décoratif */}
            {!compact && (
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Sparkles className="h-6 w-6 mr-2" style={{ color: colors.gold }} />
                  </motion.div>
                  <h2 
                    className="text-2xl md:text-3xl font-bold tracking-wide"
                    style={{ 
                      color: colors.maroon,
                      fontFamily: 'Bahnschrift, sans-serif'
                    }}
                  >
                    Réservez Votre Séjour
                  </h2>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  >
                    <Sparkles className="h-6 w-6 ml-2" style={{ color: colors.gold }} />
                  </motion.div>
                </div>
                <div 
                  className="w-24 h-1 mx-auto rounded-full"
                  style={{ backgroundColor: colors.gold }}
                />
              </motion.div>
            )}

            <div className={cn(
              "grid gap-6",
              compact ? "grid-cols-1 md:grid-cols-3 gap-4" : "grid-cols-1 lg:grid-cols-3 lg:gap-8"
            )}>
              {/* Section Date */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Label 
                  className="text-base font-bold flex items-center tracking-wide" 
                  style={{ 
                    color: colors.darkTeal,
                    fontFamily: 'Bahnschrift, sans-serif'
                  }}
                >
                  <CalendarDays className="h-5 w-5 mr-3" style={{ color: colors.orange }} />
                  {isDayUse ? "JOUR DE VISITE" : "DATES DE SÉJOUR"}
                </Label>
                <p className="text-sm text-gray-600">
                  {isDayUse ? "Veuillez choisir une date" : "Veuillez choisir les dates de votre séjour"}
                </p>

                <Popover>
                  <PopoverTrigger>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal hover:bg-gray-50",
                          !date && "text-gray-400"
                        )}
                        style={{ borderColor: colors.teal }}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {getLabel()}
                      </Button>
                    </motion.div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white"
                    align="start"
                    style={{ borderColor: colors.teal }}
                  >
                    {isDayUse ? (
                      <DayPicker
                        mode="single"
                        selected={date instanceof Date ? date : undefined}
                        onSelect={setDate}
                        numberOfMonths={isMobile ? 1 : 2}
                        showOutsideDays
                        disabled={{ before: new Date() }}
                        modifiersClassNames={{
                          selected: "bg-orange-500 text-white",
                        }}
                        className="p-3"
                      />
                    ) : (
                      <DayPicker
                        mode="range"
                        selected={typeof date === 'object' && date && 'from' in date ? date as DateRange : undefined}
                        onSelect={setDate}
                        numberOfMonths={isMobile ? 1 : 2}
                        showOutsideDays
                        disabled={{ before: new Date() }}
                        modifiersClassNames={{
                          selected: "bg-orange-500 text-white",
                          range_start: "rounded-l-md",
                          range_end: "rounded-r-md"
                        }}
                        className="p-3"
                      />
                    )}
                    {getFeedback() && (
                      <div className="p-3 text-sm text-gray-600 border-t">
                        {getFeedback()}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>

                {/* Toggle Day Use */}
                <motion.div 
                  className="flex items-center gap-3 mt-3 p-3 rounded-lg cursor-pointer"
                  style={{ backgroundColor: 'rgba(0, 139, 139, 0.05)' }}
                  whileHover={{ backgroundColor: 'rgba(0, 139, 139, 0.1)' }}
                  onClick={() => {
                    setIsDayUse(!isDayUse);
                    setDate(undefined);
                  }}
                >
                  <motion.input
                    type="checkbox"
                    id="dayuse"
                    checked={isDayUse}
                    onChange={() => {}} // Géré par le div parent
                    className="w-5 h-5 rounded transition-all duration-200 pointer-events-none"
                    style={{ accentColor: colors.orange }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <label 
                    htmlFor="dayuse" 
                    className="text-sm font-semibold cursor-pointer select-none tracking-wide"
                    style={{ 
                      color: colors.darkTeal,
                      fontFamily: 'Bahnschrift, sans-serif'
                    }}
                  >
                    RÉSERVATION DE JOUR (DAY USE)
                  </label>
                </motion.div>
              </motion.div>

              {/* Section Invités */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Label 
                  className="text-base font-bold flex items-center tracking-wide" 
                  style={{ 
                    color: colors.darkTeal,
                    fontFamily: 'Bahnschrift, sans-serif'
                  }}
                >
                  🛏️ INVITÉS & CHAMBRES
                </Label>
                <p className="text-sm text-gray-600">
                  Nombre de personnes et chambres
                </p>
                
                <Popover>
                  <PopoverTrigger>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal hover:bg-gray-50"
                        style={{ borderColor: colors.teal }}
                      >
                        {rooms.length} chambre{rooms.length > 1 ? 's' : ''} · {totalAdults} adulte{totalAdults > 1 ? 's' : ''} · {totalChildren} enfant{totalChildren > 1 ? 's' : ''}
                      </Button>
                    </motion.div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[320px] p-4 bg-white rounded-xl shadow-xl space-y-4">
                    {rooms.map((room, index) => (
                      <div key={index} className="space-y-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm text-gray-700">
                            Chambre {index + 1}
                          </span>
                          {rooms.length > 1 && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeRoom(index)}
                              className="h-6 w-6 text-red-500 hover:bg-red-50"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {/* Adultes */}
                          <div className="space-y-2">
                            <span className="text-xs text-gray-500">Adultes</span>
                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateRoom(index, 'adults', Math.max(1, room.adults - 1))}
                                className="h-8 w-8"
                                style={{ borderColor: colors.teal }}
                              >
                                −
                              </Button>
                              <span className="font-medium">{room.adults}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateRoom(index, 'adults', Math.min(4, room.adults + 1))}
                                className="h-8 w-8"
                                style={{ borderColor: colors.teal }}
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          {/* Enfants */}
                          <div className="space-y-2">
                            <span className="text-xs text-gray-500">Enfants</span>
                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateRoom(index, 'children', Math.max(0, room.children - 1))}
                                className="h-8 w-8"
                                style={{ borderColor: colors.teal }}
                              >
                                −
                              </Button>
                              <span className="font-medium">{room.children}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateRoom(index, 'children', Math.min(3, room.children + 1))}
                                className="h-8 w-8"
                                style={{ borderColor: colors.teal }}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {rooms.length < 5 && (
                      <Button
                        variant="outline"
                        onClick={addRoom}
                        className="w-full text-sm"
                        style={{ borderColor: colors.teal }}
                      >
                        ➕ Ajouter une chambre
                      </Button>
                    )}
                  </PopoverContent>
                </Popover>
              </motion.div>

              {/* Bouton de recherche */}
              <motion.div
                className="flex items-end"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: `0 10px 25px -5px ${colors.orange}4D` }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full"
                >
                  <Button
                    className="w-full h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                    style={{
                      background: `linear-gradient(to right, ${colors.orange}, ${colors.maroon})`,
                      color: 'white'
                    }}
                    onClick={handleSearch}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                      className="inline-flex items-center"
                    >
                      <Search className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="hidden sm:inline">Rechercher</span>
                      <span className="sm:hidden">🔍</span>
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};
