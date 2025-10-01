"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  X,
 
  Check
} from 'lucide-react';
import Image from 'next/image';

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

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  loyaltyPoints: number;
  memberSince: string;
  totalStays: number;
  totalSpent: number;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
    newsletter: boolean;
  };
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export function ProfileEditModal({ isOpen, onClose, userProfile, onSave }: ProfileEditModalProps) {
  const [formData, setFormData] = useState(userProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
   
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSave(formData);
    setIsLoading(false);
    setIsSaved(true);
    
    
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setFormData(userProfile); 
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div 
                className="p-6 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                  fontFamily: fonts.primary
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ fontFamily: fonts.secondary }}>
                      Modifier le Profil
                    </h2>
                    <p className="text-white/80">Mettez à jour vos informations personnelles</p>
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

              {/* Content */}
              <div className="p-6 space-y-6" style={{  background: `linear-gradient(135deg, ${colors.gray} 0%, ${colors.primaryLight} 100%)`,fontFamily: fonts.primary }}>
                {/* Photo de profil */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative w-32 h-32 rounded-full overflow-hidden border-4"
                      style={{ borderColor: colors.secondary }}
                    >
                      <Image
                        src={formData.avatar}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <label className="absolute -bottom-2 -right-2 cursor-pointer">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{ backgroundColor: colors.secondary }}
                      >
                        <Camera className="h-5 w-5" />
                      </motion.div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Cliquez sur l&apos;icône pour changer votre photo
                  </p>
                </div>

                {/* Formulaire */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center" style={{ color: colors.primary }}>
                      <User className="h-4 w-4 mr-2" />
                      Prénom
                    </Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Votre prénom"
                      className="focus:ring-2"
                      style={{ boxShadow: '0 0 0 2px ' + colors.primary }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center" style={{ color: colors.primary }}>
                      <User className="h-4 w-4 mr-2" />
                      Nom
                    </Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Votre nom"
                      className="focus:ring-2"
                      style={{ boxShadow: '0 0 0 2px ' + colors.primary }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center" style={{ color: colors.primary }}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre@email.com"
                      className="focus:ring-2"
                      style={{ boxShadow: '0 0 0 2px ' + colors.primary }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center" style={{ color: colors.primary }}>
                      <Phone className="h-4 w-4 mr-2" />
                      Téléphone
                    </Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+229 XX XX XX XX"
                      className="focus:ring-2"
                      style={{ boxShadow: '0 0 0 2px ' + colors.primary }}
                    />
                  </div>
                </div>

                {/* Statistiques (lecture seule) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.gray }}>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: colors.secondary }}>
                      {formData.loyaltyPoints.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Points fidélité</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                      {formData.totalStays}
                    </p>
                    <p className="text-sm text-gray-600">Séjours totaux</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: colors.success }}>
                      {formData.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">FCFA dépensés</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t flex justify-end space-x-4" style={{ backgroundColor: colors.gray }}>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="min-w-[120px]"
                  style={{ backgroundColor: isLoading ? colors.primaryLight : colors.primary }}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
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
                        Sauvegarde...
                      </motion.div>
                    ) : isSaved ? (
                      <motion.div
                        key="saved"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                        style={{ color: colors.success }}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Sauvegardé !
                      </motion.div>
                    ) : (
                      <motion.div
                        key="save"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder
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