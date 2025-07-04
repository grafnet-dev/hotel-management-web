"use client";
import React, { useState, useEffect, useMemo,useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {   ChevronLeft, ChevronRight,Filter} from 'lucide-react';
import "react-day-picker/style.css";
import FilterRoom from '../../../components/filterroom';
import RoomList from '../../../components/roomlist';
import BookingSection from '../../../components/bookingsection';
import { Room } from '../../../types';
import  sampleRooms  from '../../../types';

const colors = {
  teal: '#008080',
  lightTeal: '#E6F2F2',
  darkTeal: '#006666',
  gold: '#FFD700',
  orange: '#FFA500',
  maroon: '#800000',
  white: '#FFFFFF'
};



type RoomSelection = {
  id: number;       
  adults: number;   
  children: number; 
};

type DateRange = {
  from: Date;
  to?: Date;
};


export default function Rooms({ allRooms }: { allRooms: Room[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(sampleRooms);
  
const handleFilterChange = useCallback((filtered: Room[]) => {
  setFilteredRooms(filtered);
}, []);
const resultsRef = useRef<HTMLDivElement>(null);

const scrollToResults = () => {
  resultsRef.current?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
};

const handleSearch = (params: {
  date: Date | DateRange | undefined;
  rooms: RoomSelection[];
  isDayUse: boolean;
  totalAdults: number;
  totalChildren: number;
}) => {
  // Filtrer les chambres
  const filtered = sampleRooms.filter(room => {
    return room.num_person >= (params.totalAdults + params.totalChildren) &&
           (params.isDayUse ? room.day_use_price > 0 : true);
  });
  

  setFilteredRooms(filtered);
  scrollToResults();
};
  const roomsPerPage = 6;
  const totalPages = Math.ceil(allRooms?.length / roomsPerPage);
  const currentRooms = useMemo(() => 
    allRooms && allRooms.length > 0 
      ? allRooms.slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage) 
      : [], 
    [allRooms, currentPage, roomsPerPage]
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);


  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] md:h-[70vh] overflow-hidden">
      {/* Image de fond avec animation */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 2,
            ease: "easeOut"
          }}
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Chambre d'exception au Bénin"
          className="w-full h-full object-cover"
        />
        
        {/* Dégradé avec les couleurs thématiques */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/10" />
        
        {/* Effet de texture subtil */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(45deg, ${colors.gold}20, ${colors.teal}20, ${colors.orange}20)`,
            backgroundSize: '300% 300%'
          }}
        />
      </div>

      {/* Contenu */}
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.3,
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="max-w-4xl mx-auto"
        >
          {/* Titre avec ombre portée et effet de lumière */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: 'Bahnschrift, sans-serif',
              textShadow: `0 2px 10px rgba(0, 0, 0, 0.5)`,
              color: colors.gold
            }}
            whileHover={{
              textShadow: `0 2px 20px ${colors.gold}80`,
              transition: { duration: 0.3 }
            }}
          >
            Chambres de Bain du lac
          </motion.h1>
          
        
        </motion.div>
      </div>

    </section>

  
   {/* Search Section - Using your exact code */}
<div ref={resultsRef}>
  <BookingSection 
    rooms={sampleRooms}
    colors={colors}
    onSearch={handleSearch}
  />
</div>

    {/* Rooms Section  */}
 <section className="py-12 bg-gradient-to-br from-slate-50 via-teal-50/30 to-amber-50/30 min-h-screen">
  <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8 m-4 sm:m-6 lg:m-8">
    <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="w-full lg:w-1/4">
       <button 
  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
  className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-teal-600 text-white rounded-lg"
>
  <Filter className="h-4 w-4" />
  <span>{isFiltersOpen ? 'Masquer les filtres' : 'Afficher les filtres'}</span>
</button>
  

   {/* Sidebar avec filtres */}
        <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
<FilterRoom 
  rooms={sampleRooms} 
  onFilterChange={handleFilterChange}
  className="bg-white p-6 rounded-lg shadow-md"
/>

</div>
      </div>

      <div className="lg:w-3/4">
        {/* Room Cards */}
       <RoomList  rooms={filteredRooms} onBookNow={() => console.log('Book now clicked!')} />

        {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-30"
            aria-label="Page précédente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let page;
            if (totalPages <= 5) page = i + 1;
            else if (currentPage <= 3) page = i + 1;
            else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
            else page = currentPage - 2 + i;

              
              return (
              <button
                key={`page-${page}`}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === page
                    ? 'bg-teal-700 text-white shadow-md'
                    : 'border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                {page}
              </button>
            );
          })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="px-2 text-gray-400">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
              >
                {totalPages}
              </button>
            </>
          )}
            
             <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-30"
            aria-label="Page suivante"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</section>
  
                    </div>
                  );
                }
