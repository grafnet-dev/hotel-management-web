'use client';
import React, { useState, useEffect } from 'react';
import { Room } from '../types';

// Nouvelles couleurs - compatibilité totale
const colors = {
  primary: '#014d71',
  secondary: '#f0b800',
  primaryLight: '#0a5a82',
  primaryDark: '#013a56',
  secondaryLight: '#f5c932',
  secondaryDark: '#d49f00',
  white: '#FFFFFF',
  gray100: '#f7fafc',
  gray200: '#edf2f7',
  gray300: '#e2e8f0'
};

interface FilterRoomProps {
  rooms: Room[];
  onFilterChange: (filteredRooms: Room[]) => void;
  className?: string;
}

const FilterRoom: React.FC<FilterRoomProps> = ({ rooms, onFilterChange, className }) => {
  // États pour les filtres
  const [roomType, setRoomType] = useState<string>('all');
  const [bedType, setBedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [floor, setFloor] = useState<string>('all');
  const [flooringType, setFlooringType] = useState<string>('all');
  const [view, setView] = useState<string>('all');
  const [petsAllowed, setPetsAllowed] = useState<string>('all');
  const [smokingAllowed, setSmokingAllowed] = useState<string>('all');
  const [numPerson, setNumPerson] = useState<string>('all');
  const [surfaceRange, setSurfaceRange] = useState<[number, number]>([0, 0]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Options uniques pour les filtres déroulants
  const roomTypes = Array.from(new Set(rooms.map(room => room.room_type)));
  const bedTypes = Array.from(new Set(rooms.map(room => room.bed_type)));
  const floors = Array.from(new Set(rooms.map(room => room.floor)));
  const flooringTypes = Array.from(new Set(rooms.map(room => room.flooring_type)));
  const views = Array.from(new Set(rooms.map(room => room.view)));
  
  // Calculer les valeurs min/max de manière sécurisée
  const minPrice = rooms.length > 0 ? Math.min(...rooms.map(room => room.price_per_night)) : 0;
  const maxPrice = rooms.length > 0 ? Math.max(...rooms.map(room => room.price_per_night)) : 100000;
  const minSurface = rooms.length > 0 ? Math.min(...rooms.map(room => room.surface_area)) : 0;
  const maxSurface = rooms.length > 0 ? Math.max(...rooms.map(room => room.surface_area)) : 100;

  // Initialiser les ranges avec les bonnes valeurs - UNE SEULE FOIS
  useEffect(() => {
    if (rooms.length > 0 && !isInitialized) {
      setPriceRange([minPrice, maxPrice]);
      setSurfaceRange([minSurface, maxSurface]);
      setIsInitialized(true);
      console.log('FilterRoom initialized with ranges:', { 
        priceRange: [minPrice, maxPrice], 
        surfaceRange: [minSurface, maxSurface] 
      });
    }
  }, [rooms, minPrice, maxPrice, minSurface, maxSurface, isInitialized]);

  // Effet pour appliquer les filtres - LOGIQUE CORRIGÉE
  useEffect(() => {
    // Ne pas filtrer si pas encore initialisé
    if (!isInitialized || rooms.length === 0) return;

    console.log('Applying filters...', {
      roomType,
      bedType,
      priceRange,
      floor,
      flooringType,
      view,
      petsAllowed,
      smokingAllowed,
      numPerson,
      surfaceRange
    });
    
    const filtered = rooms.filter(room => {
      // Vérification type de chambre
      const matchesRoomType = roomType === 'all' || room.room_type === roomType;
      
      // Vérification type de lit
      const matchesBedType = bedType === 'all' || room.bed_type === bedType;
      
      // Vérification prix
      const matchesPrice = room.price_per_night >= priceRange[0] && room.price_per_night <= priceRange[1];
      
      // Vérification étage
      const matchesFloor = floor === 'all' || room.floor === floor;
      
      // Vérification type de sol
      const matchesFlooring = flooringType === 'all' || room.flooring_type === flooringType;
      
      // Vérification vue
      const matchesView = view === 'all' || room.view === view;
      
      // Vérification animaux - CORRIGÉE
      const matchesPets = petsAllowed === 'all' || 
        (petsAllowed === 'yes' && room.is_pets_allowed === true) || 
        (petsAllowed === 'no' && room.is_pets_allowed === false);
      
      // Vérification fumer - CORRIGÉE
      const matchesSmoking = smokingAllowed === 'all' || 
        (smokingAllowed === 'yes' && room.is_smoking_allowed === true) || 
        (smokingAllowed === 'no' && room.is_smoking_allowed === false);
      
      // Vérification nombre de personnes - CORRIGÉE
      const matchesPerson = numPerson === 'all' || room.num_person >= parseInt(numPerson);
      
      // Vérification surface
      const matchesSurface = room.surface_area >= surfaceRange[0] && room.surface_area <= surfaceRange[1];

      const allMatches = matchesRoomType && matchesBedType && matchesPrice && matchesFloor && 
                        matchesFlooring && matchesView && matchesPets && matchesSmoking && 
                        matchesPerson && matchesSurface;

      if (!allMatches) {
        console.log(`Room ${room.name} filtered out:`, {
          matchesRoomType,
          matchesBedType,
          matchesPrice: `${room.price_per_night} in [${priceRange[0]}, ${priceRange[1]}] = ${matchesPrice}`,
          matchesFloor,
          matchesFlooring,
          matchesView,
          matchesPets: `pets_allowed: ${room.is_pets_allowed}, filter: ${petsAllowed} = ${matchesPets}`,
          matchesSmoking: `smoking_allowed: ${room.is_smoking_allowed}, filter: ${smokingAllowed} = ${matchesSmoking}`,
          matchesPerson: `num_person: ${room.num_person}, filter: ${numPerson} = ${matchesPerson}`,
          matchesSurface: `${room.surface_area} in [${surfaceRange[0]}, ${surfaceRange[1]}] = ${matchesSurface}`
        });
      }

      return allMatches;
    });
    
    console.log('Filtered results:', filtered.length, 'out of', rooms.length);
    onFilterChange(filtered);
  }, [
    rooms, roomType, bedType, priceRange, floor, flooringType, view, 
    petsAllowed, smokingAllowed, numPerson, surfaceRange, onFilterChange, isInitialized
  ]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setRoomType('all');
    setBedType('all');
    setPriceRange([minPrice, maxPrice]);
    setFloor('all');
    setFlooringType('all');
    setView('all');
    setPetsAllowed('all');
    setSmokingAllowed('all');
    setNumPerson('all');
    setSurfaceRange([minSurface, maxSurface]);
  };

  // Ne pas afficher le composant tant qu'il n'est pas initialisé
  if (!isInitialized) {
    return <div>Chargement des filtres...</div>;
  }

  return (
    <>
      {/* Bouton mobile */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className={`w-full py-3 px-4 rounded-md flex items-center justify-between transition-colors font-medium`}
          style={{
            backgroundColor: isMobileFiltersOpen ? colors.primaryDark : colors.primary,
            color: colors.white,
            fontFamily: 'Poppins, Times New Roman, sans-serif'
          }}
        >
          <span>Filtres</span>
          <svg
            className={`w-5 h-5 transition-transform ${isMobileFiltersOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filtres */}
      <div 
        className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block p-6 rounded-lg shadow-md ${className || ''}`}
        style={{ backgroundColor: colors.gray100, fontFamily: 'Poppins, Times New Roman, sans-serif' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-xl font-bold"
            style={{ color: colors.primary }}
          >
            Filtrer les chambres
          </h2>
          <button 
            onClick={resetFilters}
            className="text-sm hover:underline transition-colors font-medium"
            style={{ color: colors.secondary }}
          >
            Réinitialiser
          </button>
        </div>

        <div className="space-y-6">
          {/* Type de chambre */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Type de chambre
            </h3>
            <select
              value={roomType}
              onChange={(e) => {
                console.log('Room type changed:', e.target.value);
                setRoomType(e.target.value);
              }}
              className="w-full p-2 border rounded-md bg-white focus:ring-1"
              style={{ 
                borderColor: colors.gray300,
                color: colors.primary,
                outlineColor: colors.secondary
              }}
            >
              <option value="all">Tous les types</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Type de lit */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Type de lit
            </h3>
            <select
              value={bedType} 
              onChange={(e) => {
                console.log('Bed type changed:', e.target.value);
                setBedType(e.target.value);
              }}
              className="w-full p-2 border rounded-md bg-white focus:ring-1"
              style={{ 
                borderColor: colors.gray300,
                color: colors.primary
              }}
            >
              <option value="all">Tous les types</option>
              {bedTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Prix par nuit */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Prix par nuit (XOF)
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs" style={{ color: colors.primary }}>
                <span>{priceRange[0].toLocaleString()} XOF</span>
                <span>{priceRange[1].toLocaleString()} XOF</span>
              </div>
              <div className="space-y-2">
                <label className="text-xs" style={{ color: colors.primary }}>Min:</label>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value);
                    setPriceRange([newMin, Math.max(newMin, priceRange[1])]);
                  }}
                  className="w-full"
                  style={{ accentColor: colors.secondary }}
                />
                <label className="text-xs" style={{ color: colors.primary }}>Max:</label>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    setPriceRange([Math.min(priceRange[0], newMax), newMax]);
                  }}
                  className="w-full"
                  style={{ accentColor: colors.secondary }}
                />
              </div>
            </div>
          </div>

          {/* Étage */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Étage
            </h3>
            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full p-2 border rounded-md bg-white focus:ring-1"
              style={{ 
                borderColor: colors.gray300,
                color: colors.primary
              }}
            >
              <option value="all">Tous les étages</option>
              {floors.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Type de sol - CORRIGÉ */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Type de sol
            </h3>
            <select
              value={flooringType}
              onChange={(e) => setFlooringType(e.target.value)}
              className="w-full p-2 border rounded-md bg-white focus:ring-1"
              style={{ 
                borderColor: colors.gray300,
                color: colors.primary
              }}
            >
              <option value="all">Tous les types</option>
              {flooringTypes.map((type, index) => (
                <option key={index} value={typeof flooringType === 'string' ? flooringType : ''}>{type}</option>
              ))}
            </select>
          </div>

          {/* Vue */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Vue
            </h3>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="w-full p-2 border rounded-md bg-white focus:ring-1"
              style={{ 
                borderColor: colors.gray300,
                color: colors.primary
              }}
            >
              <option value="all">Toutes les vues</option>
              {views.map((v, i) => (
                <option key={i} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Animaux autorisés */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Animaux autorisés
            </h3>
            <select
              value={petsAllowed}
              onChange={(e) => setPetsAllowed(e.target.value)}
              className="w-full p-2 border rounded-md bg-white focus:ring-1"
              style={{ 
                borderColor: colors.gray300,
                color: colors.primary
              }}
            >
              <option value="all">Peu importe</option>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>

          {/* Fumer autorisé */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Fumer autorisé
            </h3>
            <select
              value={smokingAllowed}
              onChange={(e) => setSmokingAllowed(e.target.value)}
              className="w-full p-2 border rounded-md bg-white focus:ring-1"
              style={{ 
                borderColor: colors.gray300,
                color: colors.primary
              }}
            >
              <option value="all">Peu importe</option>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>

          {/* Nombre de personnes */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Nombre de personnes minimum
            </h3>
            <select
              value={numPerson}
              onChange={(e) => setNumPerson(e.target.value)}
              className="w-full p-2 border rounded-md bg-white focus:ring-1"
              style={{ 
                borderColor: colors.gray300,
                color: colors.primary
              }}
            >
              <option value="all">Tous</option>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n.toString()}>{n}+ personne{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Surface */}
          <div>
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Surface (m²)
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs" style={{ color: colors.primary }}>
                <span>{surfaceRange[0]} m²</span>
                <span>{surfaceRange[1]} m²</span>
              </div>
              <div className="space-y-2">
                <label className="text-xs" style={{ color: colors.primary }}>Min:</label>
                <input
                  type="range"
                  min={minSurface}
                  max={maxSurface}
                  value={surfaceRange[0]}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value);
                    setSurfaceRange([newMin, Math.max(newMin, surfaceRange[1])]);
                  }}
                  className="w-full"
                  style={{ accentColor: colors.secondary }}
                />
                <label className="text-xs" style={{ color: colors.primary }}>Max:</label>
                <input
                  type="range"
                  min={minSurface}
                  max={maxSurface}
                  value={surfaceRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    setSurfaceRange([Math.min(surfaceRange[0], newMax), newMax]);
                  }}
                  className="w-full"
                  style={{ accentColor: colors.secondary }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterRoom;