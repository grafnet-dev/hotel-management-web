'use client';
import React, { useState, useEffect } from 'react';
import { Room, RoomType, BedType, FlooringType, ViewType } from '../types';

const colors = {
  teal: "#005D7C",
  gold: "#CE9226",     
  orange: '#FF8C42',     
  maroon: '#800020',     
  lightTeal: '#E6F2F2',  
  darkTeal: '#006666',   
  cream: '#F5F5DC',     
};

interface FilterRoomProps {
  rooms: Room[];
  onFilterChange: (filteredRooms: Room[]) => void;
  className: string
}

const FilterRoom: React.FC<FilterRoomProps> = ({ rooms, onFilterChange }) => {
  // États pour les filtres
  const [roomType, setRoomType] = useState<RoomType | 'all'>('all');
  const [bedType, setBedType] = useState<BedType | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [floor, setFloor] = useState<string | 'all'>('all');
  const [flooringType, setFlooringType] = useState<FlooringType | 'all'>('all');
 const [view, setView] = useState<ViewType | 'all'>('all');
  const [petsAllowed, setPetsAllowed] = useState<boolean | 'all'>('all');
  const [smokingAllowed, setSmokingAllowed] = useState<boolean | 'all'>('all');
  const [numPerson, setNumPerson] = useState<number | 'all'>('all');
  const [surfaceRange, setSurfaceRange] = useState<[number, number]>([0, 100]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Options uniques pour les filtres déroulants
  const roomTypes = Array.from(new Set(rooms.map(room => room.room_type)));
  const bedTypes = Array.from(new Set(rooms.map(room => room.bed_type)));
  const floors = Array.from(new Set(rooms.map(room => room.floor)));
  const flooringTypes = Array.from(new Set(rooms.map(room => room.flooring_type)));
  const views = Array.from(new Set(rooms.map(room => room.view)));
  const maxPrice = Math.max(...rooms.map(room => room.price_per_night));
  const maxSurface = Math.max(...rooms.map(room => room.surface_area));

  // Effet pour appliquer les filtres
  useEffect(() => {
    const filtered = rooms.filter(room => {
      return (
        (roomType === 'all' || room.room_type === roomType) &&
        (bedType === 'all' || room.bed_type === bedType) &&
        (room.price_per_night >= priceRange[0] && room.price_per_night <= priceRange[1]) &&
        (floor === 'all' || room.floor === floor) &&
        (flooringType === 'all' || room.flooring_type === flooringType) &&
        (view === 'all' || room.view === view) &&
        (petsAllowed === 'all' || room.is_pets_allowed === petsAllowed) &&
        (smokingAllowed === 'all' || room.is_smoking_allowed === smokingAllowed) &&
        (numPerson === 'all' || room.num_person >= numPerson) &&
        (room.surface_area >= surfaceRange[0] && room.surface_area <= surfaceRange[1])
      );
    });
    
    onFilterChange(filtered);
  }, [
    rooms, roomType, bedType, priceRange, floor, flooringType, view, 
    petsAllowed, smokingAllowed, numPerson, surfaceRange, onFilterChange
  ]);

  // Fonction pour réinitialiser les filtres
 const resetFilters = () => {
  setRoomType('all');
  setBedType('all');
  setPriceRange([0, maxPrice]);
  setFloor('all');
  setFlooringType('all');
  setView('all');
  setPetsAllowed('all');
  setSmokingAllowed('all');
  setNumPerson('all');
  setSurfaceRange([0, maxSurface]);
};

  return (
    <>
      {/* Bouton mobile */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className={`w-full py-2 px-4 rounded-md flex items-center justify-between ${isMobileFiltersOpen ? `bg-[${colors.teal}] text-white` : `bg-[${colors.cream}] text-[${colors.teal}]`}`}

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
      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block bg-[#F5F5DC] p-6 rounded-lg shadow-md`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#005D7C]">Filtrer les chambres</h2>
          <button 
            onClick={resetFilters}
            className="text-sm text-[#CE9226] hover:underline"
          >
            Réinitialiser
          </button>
        </div>

        <div className="space-y-6">
          {/* Type de chambre */}
          <div>
            <h3 className="text-sm font-medium text-[#005D7C] mb-2">Type de chambre</h3>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value as RoomType | 'all')}
              className="w-full p-2 border border-[#005D7C] rounded-md bg-white text-[#005D7C]"
            >
              <option value="all">Tous les types</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

                    {/* Type de lit */}
          <div>
  <h3 className="text-sm font-medium text-[#005D7C] mb-2">Type de lit</h3>
  <select
    value={bedType} 
    onChange={(e) => setBedType(e.target.value as BedType | 'all')}
    className="w-full p-2 border border-[#005D7C] rounded-md bg-white text-[#005D7C]"
  >
    <option value="all">Tous les types</option>
    {bedTypes.map((type) => (
      <option key={type.toString()} value={type.toString()}>
        {type}
      </option>
    ))}
  </select>
</div>


          {/* Prix par nuit */}
          <div>
            <h3 className="text-sm font-medium text-[#005D7C] mb-2">Prix par nuit (XOF)</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#005D7C]">
                <span>{priceRange[0].toLocaleString()} XOF</span>
                <span>{priceRange[1].toLocaleString()} XOF</span>
              </div>
              <div className="flex space-x-4">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full accent-[#CE9226]"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#CE9226]"
                />
              </div>
            </div>
          </div>

          {/* Étage */}
          <div>
            <h3 className="text-sm font-medium text-[#005D7C] mb-2">Étage</h3>
            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full p-2 border border-[#005D7C] rounded-md bg-white text-[#005D7C]"
            >
              <option value="all">Tous les étages</option>
              {floors.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Type de sol */}
         <div>
  <h3 className="text-sm font-medium text-[#005D7C] mb-2">Type de sol</h3>
  <select
    value={flooringType as string}
    onChange={(e) => setFlooringType(e.target.value as FlooringType | 'all')}
    className="w-full p-2 border border-[#005D7C] rounded-md bg-white text-[#005D7C]"
  >
    <option value="all">Tous les types</option>
    {flooringTypes.map((type, index) => (
      <option key={index} value={String(type)}>{String(type)}</option>
    ))}
  </select>
</div>


         {/* Vue */}
<div>
 <h3 className={`text-sm font-medium text-[${colors.teal}] mb-2`}>Vue</h3>

  <select
    value={String(view)}
    onChange={(e) => setView(e.target.value as ViewType | 'all')}
    className="w-full p-2 border border-[#005D7C] rounded-md bg-white text-[#005D7C]"
  >
    <option value="all">Toutes les vues</option>
    {views.map((v, i) => (
      <option key={i} value={String(v)}>{String(v)}</option>
    ))}
  </select>
</div>



         {/* Animaux autorisés */}
<div>
  <h3 className="text-sm font-medium text-[#005D7C] mb-2">Animaux autorisés</h3>
  <select
    value={petsAllowed === 'all' ? 'all' : petsAllowed ? 'yes' : 'no'}
    onChange={(e) =>
      setPetsAllowed(
        e.target.value === 'all' ? 'all' : e.target.value === 'yes'
      )
    }
    className="w-full p-2 border border-[#005D7C] rounded-md bg-white text-[#005D7C]"
  >
    <option value="all">Peu importe</option>
    <option value="yes">Oui</option>
    <option value="no">Non</option>
  </select>
</div>


          {/* Fumer autorisé */}
          <div>
            <h3 className="text-sm font-medium text-[#005D7C] mb-2">Fumer autorisé</h3>
            <select
              value={smokingAllowed === 'all' ? 'all' : smokingAllowed ? 'yes' : 'no'}
              onChange={(e) => setSmokingAllowed(e.target.value === 'all' ? 'all' : e.target.value === 'yes')}
              className="w-full p-2 border border-[#005D7C] rounded-md bg-white text-[#005D7C]"
            >
              <option value="all">Peu importe</option>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>

          {/* Nombre de personnes */}
          <div>
            <h3 className="text-sm font-medium text-[#005D7C] mb-2">Nombre de personnes</h3>
            <select
              value={numPerson === 'all' ? 'all' : numPerson}
              onChange={(e) => setNumPerson(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full p-2 border border-[#005D7C] rounded-md bg-white text-[#005D7C]"
            >
              <option value="all">Tous</option>
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n}+</option>
              ))}
            </select>
          </div>

          {/* Surface */}
          <div>
            <h3 className="text-sm font-medium text-[#005D7C] mb-2">Surface (m²)</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#005D7C]">
                <span>{surfaceRange[0]} m²</span>
                <span>{surfaceRange[1]} m²</span>
              </div>
              <div className="flex space-x-4">
                <input
                  type="range"
                  min="0"
                  max={maxSurface}
                  value={surfaceRange[0]}
                  onChange={(e) => setSurfaceRange([parseInt(e.target.value), surfaceRange[1]])}
                  className="w-full accent-[#CE9226]"
                />
                <input
                  type="range"
                  min="0"
                  max={maxSurface}
                  value={surfaceRange[1]}
                  onChange={(e) => setSurfaceRange([surfaceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#CE9226]"
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