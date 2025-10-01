"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from '../../components/ui/button';

import { Label } from '../../components/ui/label';
import { 
  Plus, 
  Minus, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  ShoppingCart, 
  X,
  Check,
  Calendar,

} from 'lucide-react';

const colors = {
  primary: '#014d71',
  secondary: '#f0b800',
  primaryLight: '#0a5d85',
  secondaryLight: '#f5c842',
  white: '#ffffff',
  gray: '#f8f9fa',
  success: '#28a745',
  danger: '#dc3545'
};

const fonts = {
  primary: 'Poppins, sans-serif',
  secondary: 'Times New Roman, serif'
};

interface Service {
  name: string;
  description: string;
  price: number;
  category: string;
  duration?: string;
}

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onOrder: (category: string, service: Service, quantity: number, notes?: string) => void;
}

export function ServiceOrderModal({ isOpen, onClose, service, onOrder }: ServiceOrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = async () => {
    if (!service) return;

    setIsOrdering(true);
    
    // Simulation de commande
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onOrder(service.category, service, quantity, notes || undefined);
    
    setIsOrdering(false);
    setIsOrdered(true);
    
    // Animation de succès puis fermeture
    setTimeout(() => {
      setIsOrdered(false);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setQuantity(1);
    setNotes('');
    setSelectedTime('');
    setIsOrdering(false);
    setIsOrdered(false);
    onClose();
  };

  if (!service) return null;

  const totalPrice = service.price * quantity;
  const isTimeRequired = service.category === 'spa' || service.category === 'restaurant';

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="max-w-lg p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
               <div 
                className="p-6 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                  fontFamily: fonts.primary
                }}
              >
               <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2" style={{ fontFamily: fonts.secondary }}>
                      {service.name}
                    </h2>
                    <p className="text-white/80 text-sm mb-2">{service.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      {service.duration && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{service.price.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
           
              <div className="p-6 space-y-6" style={{  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.primaryLight} 100%)`,fontFamily: fonts.primary }}>
                {/* Quantité */}
              <div>
                  <Label className="text-base font-semibold mb-3 block" style={{ color: colors.primary }}>
                    Quantité
                  </Label>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-12 h-12"
                      style={{ borderColor: colors.primary }}
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <div className="text-center">
                      <div className="text-3xl font-bold" style={{ color: colors.primary }}>
                        {quantity}
                      </div>
                      <div className="text-sm text-gray-600">
                        {quantity > 1 ? 'services' : 'service'}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10}
                      className="w-12 h-12"
                      style={{ borderColor: colors.primary }}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Horaire (si requis) */}
                {isTimeRequired && (
                  <div>
                    <Label className="text-base font-semibold mb-3 block" style={{ color: colors.primary }}>
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Horaire souhaité
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {service.category === 'spa' ? [
                        '09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '20:00'
                      ] : [
                        '07:30', '08:00', '12:00', '12:30', '19:00', '19:30', '20:00', '20:30'
                      ].map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            selectedTime === time
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{
                            borderColor: selectedTime === time ? colors.primary : '#e5e7eb',
                            backgroundColor: selectedTime === time ? `${colors.primary}10` : 'transparent',
                            color: selectedTime === time ? colors.primary : 'inherit'
                          }}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <Label className="text-base font-semibold mb-3 block" style={{ color: colors.primary }}>
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Notes spéciales (optionnel)
                  </Label>
                 <textarea
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  placeholder="Allergies, préférences, demandes particulières..."
  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
  style={{ outlineColor: colors.primary }}
  rows={3}
/>
                </div>

                {/* Récapitulatif */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.gray }}>
                  <h4 className="font-semibold mb-3" style={{ color: colors.primary }}>
                    Récapitulatif de la commande
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantité:</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prix unitaire:</span>
                      <span className="font-medium">{service.price.toLocaleString()} FCFA</span>
                    </div>
                    {selectedTime && (
                      <div className="flex justify-between">
                        <span>Horaire:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                    )}
                    {notes && (
                      <div className="flex justify-between">
                        <span>Notes:</span>
                        <span className="font-medium text-xs">{notes}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold" style={{ color: colors.secondary }}>
                        <span>Total:</span>
                        <span>{totalPrice.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t flex justify-end space-x-4" style={{ backgroundColor: colors.gray }}>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isOrdering}
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleOrder}
                  disabled={isOrdering || (isTimeRequired && !selectedTime)}
                  className="min-w-[140px]"
                  style={{ backgroundColor: isOrdering ? colors.primaryLight : colors.primary }}
                >
                  <AnimatePresence mode="wait">
                    {isOrdering ? (
                      <motion.div
                        key="ordering"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Commande...
                      </motion.div>
                    ) : isOrdered ? (
                      <motion.div
                        key="ordered"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                        style={{ color: colors.success }}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Commandé !
                      </motion.div>
                    ) : (
                      <motion.div
                        key="order"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Commander
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}