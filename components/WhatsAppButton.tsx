"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { ChatbotWhatsApp } from './ChatbotWhatsApp';




export function WhatsAppButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string; email: string; phone: string; } | null>(null);

  // Simuler les informations utilisateur connecté (frontend)
  useEffect(() => {
    // Vérifier si l'utilisateur est "connecté" (simulation)
    const isLoggedIn = localStorage.getItem('user_logged_in');
    if (isLoggedIn) {
      setUserInfo({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@email.com',
        phone: '+229 XX XX XX XX'
      });
    }
  }, []);

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 20px 40px -10px rgba(34, 197, 94, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-8 w-8" />
        
        {/* Animation de pulsation */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="fixed bottom-6 right-24 z-40 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        Réserver via WhatsApp
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
      </motion.div>

      {/* Modal de réservation */}
   <ChatbotWhatsApp 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  userInfo={userInfo ?? undefined}
/>
    </>
  );
}