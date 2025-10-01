"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import "react-day-picker/style.css";
import FilterRoom from '../../../components/filterroom';
import RoomList from '../../../components/roomlist';
import BookingSection from '../../../components/bookingsection';
import { Room } from '../../../types';
import sampleRooms from '../../../types';

// Nouvelles couleurs - compatibilité avec BookingSection
const colors = {
  primary: '#014d71',
  secondary: '#f0b800', 
  primaryLight: '#0a5a82',
  primaryDark: '#013a56',
  secondaryLight: '#f5c932',
  secondaryDark: '#d49f00',
  white: '#FFFFFF',
  gray50: '#f9fafb',
  gray100: '#f7fafc',
  gray200: '#edf2f7',
  gray300: '#e2e8f0',
  gray400: '#cbd5e0',
  gray600: '#718096',
  // Compatibilité avec BookingSection
  teal: '#014d71',
  lightTeal: '#0a5a82',
  darkTeal: '#013a56',
  gold: '#f0b800',
  orange: '#f5c932',
  maroon: '#d49f00'
};

type DateRange = {
  from?: Date;
  to?: Date;
};

type RoomSelection = {
  id: number;       
  adults: number;   
  children: number; 
};

export default function Rooms() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(sampleRooms);
  
  // 🔧 CONFIGURATION PAGINATION - Modifiable facilement
  const paginationConfig = {
    roomsPerPage: 6,        // Nombre de chambres par page
    maxVisiblePages: 5,     // Nombre max de numéros de pages visibles
    showEllipsis: true,     // Afficher "..." pour les pages cachées
    showFirstLast: true,    // Afficher boutons "Première" et "Dernière"
    showInfo: true          // Afficher les infos détaillées
  };

  const { roomsPerPage, maxVisiblePages, showEllipsis, showFirstLast, showInfo } = paginationConfig;
  
  const handleFilterChange = useCallback((filtered: Room[]) => {
    console.log('Page received filtered rooms:', filtered.length);
    setFilteredRooms(filtered);
    setCurrentPage(1); // Reset à la page 1 lors du changement de filtres
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
    setCurrentPage(1); // Reset à la page 1 lors de la recherche
    scrollToResults();
  };

 
  const totalPages = Math.ceil(filteredRooms?.length / roomsPerPage);
  const paginatedRooms = useMemo(() => 
    filteredRooms && filteredRooms.length > 0 
      ? filteredRooms.slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage) 
      : [], 
    [filteredRooms, currentPage, roomsPerPage]
  );


 const paginationInfo = useMemo(() => ({
  currentPage,
  totalPages,
  totalRooms: filteredRooms.length,
  roomsOnCurrentPage: paginatedRooms.length,
  startIndex: filteredRooms.length > 0 ? (currentPage - 1) * roomsPerPage + 1 : 0,
  endIndex: Math.min(currentPage * roomsPerPage, filteredRooms.length)
}), [currentPage, totalPages, filteredRooms, paginatedRooms, roomsPerPage]);
 
  const getVisiblePageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = Math.floor(maxVisiblePages / 2);
    let rangeStart = Math.max(1, currentPage - delta);
    const rangeEnd = Math.min(totalPages, rangeStart + maxVisiblePages - 1);
    
   
    if (rangeEnd - rangeStart + 1 < maxVisiblePages) {
      rangeStart = Math.max(1, rangeEnd - maxVisiblePages + 1);
    }
    
    return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Debug : affichez le nombre de chambres filtrées
  useEffect(() => {
    console.log('Current filtered rooms count:', filteredRooms.length);
    console.log('Pagination info:', paginationInfo);
  }, [filteredRooms, paginationInfo]);

  return (
    <div 
      className="min-h-screen pt-16"
      style={{ 
        background: `linear-gradient(to bottom, ${colors.gray50}, ${colors.white})`,
        fontFamily: 'Poppins, Times New Roman, sans-serif'
      }}
    >
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
              background: `linear-gradient(45deg, ${colors.secondary}20, ${colors.primary}20, ${colors.secondaryLight}20)`,
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
                fontFamily: 'Poppins, sans-serif',
                textShadow: `0 2px 10px rgba(0, 0, 0, 0.5)`,
                color: colors.secondary
              }}
              whileHover={{
                textShadow: `0 2px 20px ${colors.secondary}80`,
                transition: { duration: 0.3 }
              }}
            >
              Chambres de Relacs Zone 
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <div ref={resultsRef}>
        <BookingSection 
          rooms={sampleRooms}
          colors={colors}
          onSearch={handleSearch}
        />
      </div>

      {/* Rooms Section */}
      <section 
        className="py-12 min-h-screen"
        style={{ 
          background: `linear-gradient(135deg, ${colors.gray50} 0%, ${colors.gray100} 50%, ${colors.white} 100%)`
        }}
      >
        <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8 m-4 sm:m-6 lg:m-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Mobile Filter Toggle */}
            <div className="w-full lg:w-1/4">
              <button 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Filter className="h-4 w-4" />
                <span>{isFiltersOpen ? 'Masquer les filtres' : 'Afficher les filtres'}</span>
              </button>

              {/* Sidebar avec filtres */}
              <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
                <FilterRoom 
                  rooms={sampleRooms} 
                  onFilterChange={handleFilterChange}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                />
              </div>
            </div>

            <div className="lg:w-3/4">
              {/* 📊 INFORMATIONS DÉTAILLÉES */}
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="text-lg font-medium" style={{ color: colors.primary }}>
                  {paginationInfo.totalRooms} chambre(s) trouvée(s)
                </div>
                {totalPages > 1 && showInfo && (
                  <div className="text-sm" style={{ color: colors.gray600 }}>
                    Affichage de {paginationInfo.startIndex} à {paginationInfo.endIndex} sur {paginationInfo.totalRooms} résultats
                  </div>
                )}
              </div>
              
              {/* Room Cards */}
              <RoomList 
                rooms={paginatedRooms} 
                onBookNow={() => console.log('Book now clicked!')} 
              />

              {/* 🎯 PAGINATION AMÉLIORÉE - Desktop */}
              {totalPages > 1 && (
                <div className="hidden sm:flex justify-center mt-12">
                  <nav className="flex items-center gap-1" aria-label="Pagination">
                    
                    {/* Première page */}
                    {showFirstLast && currentPage > 2 && (
                      <>
                        <button
                          onClick={() => goToPage(1)}
                          className="px-3 py-2 text-sm rounded-md border transition-colors font-medium"
                          style={{
                            borderColor: colors.gray200,
                            color: colors.gray600,
                            backgroundColor: colors.white
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.gray50;
                            e.currentTarget.style.color = colors.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = colors.white;
                            e.currentTarget.style.color = colors.gray600;
                          }}
                          aria-label="Première page"
                        >
                          ««
                        </button>
                        {currentPage > 3 && showEllipsis && (
                          <span className="px-2" style={{ color: colors.gray400 }}>...</span>
                        )}
                      </>
                    )}

                    {/* Page précédente */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 disabled:opacity-30"
                      style={{ 
                        borderColor: colors.gray200,
                        backgroundColor: colors.white,
                        color: colors.gray600
                      }}
                      onMouseEnter={(e) => {
                        if (!e.currentTarget.disabled) {
                          e.currentTarget.style.backgroundColor = colors.gray50;
                          e.currentTarget.style.color = colors.primary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!e.currentTarget.disabled) {
                          e.currentTarget.style.backgroundColor = colors.white;
                          e.currentTarget.style.color = colors.gray600;
                        }
                      }}
                      aria-label="Page précédente"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Numéros de pages */}
                    {getVisiblePageNumbers().map(page => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200 ${
                          currentPage === page
                            ? 'text-white shadow-md'
                            : 'border hover:shadow-md'
                        }`}
                        style={{
                          backgroundColor: currentPage === page ? colors.primary : colors.white,
                          borderColor: currentPage === page ? colors.primary : colors.gray200,
                          color: currentPage === page ? colors.white : colors.gray600
                        }}
                        onMouseEnter={(e) => {
                          if (currentPage !== page) {
                            e.currentTarget.style.backgroundColor = colors.gray50;
                            e.currentTarget.style.color = colors.primary;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentPage !== page) {
                            e.currentTarget.style.backgroundColor = colors.white;
                            e.currentTarget.style.color = colors.gray600;
                          }
                        }}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Page suivante */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 disabled:opacity-30"
                      style={{ 
                        borderColor: colors.gray200,
                        backgroundColor: colors.white,
                        color: colors.gray600
                      }}
                      onMouseEnter={(e) => {
                        if (!e.currentTarget.disabled) {
                          e.currentTarget.style.backgroundColor = colors.gray50;
                          e.currentTarget.style.color = colors.primary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!e.currentTarget.disabled) {
                          e.currentTarget.style.backgroundColor = colors.white;
                          e.currentTarget.style.color = colors.gray600;
                        }
                      }}
                      aria-label="Page suivante"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dernière page */}
                    {showFirstLast && currentPage < totalPages - 1 && (
                      <>
                        {currentPage < totalPages - 2 && showEllipsis && (
                          <span className="px-2" style={{ color: colors.gray400 }}>...</span>
                        )}
                        <button
                          onClick={() => goToPage(totalPages)}
                          className="px-3 py-2 text-sm rounded-md border transition-colors font-medium"
                          style={{
                            borderColor: colors.gray200,
                            color: colors.gray600,
                            backgroundColor: colors.white
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.gray50;
                            e.currentTarget.style.color = colors.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = colors.white;
                            e.currentTarget.style.color = colors.gray600;
                          }}
                          aria-label="Dernière page"
                        >
                          »»
                        </button>
                      </>
                    )}
                  </nav>
                </div>
              )}

              {/* 📱 PAGINATION MOBILE */}
              {totalPages > 1 && (
                <div className="sm:hidden flex flex-col items-center gap-4 mt-8">
                  {/* Info mobile */}
                  <div className="text-sm text-center" style={{ color: colors.gray600 }}>
                    Page {currentPage} sur {totalPages}
                    <br />
                    ({paginationInfo.startIndex}-{paginationInfo.endIndex} sur {paginationInfo.totalRooms} chambres)
                  </div>
                  
                  {/* Contrôles mobiles */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-md border transition-colors font-medium disabled:opacity-50"
                      style={{
                        borderColor: colors.gray200,
                        color: colors.gray600,
                        backgroundColor: colors.white
                      }}
                    >
                      Précédent
                    </button>
                    
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-md border transition-colors font-medium disabled:opacity-50"
                      style={{
                        borderColor: colors.gray200,
                        color: colors.gray600,
                        backgroundColor: colors.white
                      }}
                    >
                      Suivant
                    </button>
                  </div>
                  
                  {/* Saut rapide mobile */}
                  {totalPages > 3 && (
                    <div className="flex items-center gap-2 text-sm">
                      <span style={{ color: colors.gray600 }}>Aller à la page:</span>
                      <select
                        value={currentPage}
                        onChange={(e) => goToPage(parseInt(e.target.value))}
                        className="px-2 py-1 border rounded text-sm"
                        style={{
                          borderColor: colors.gray300,
                          color: colors.primary
                        }}
                      >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}