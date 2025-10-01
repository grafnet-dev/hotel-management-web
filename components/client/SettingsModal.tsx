"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { 
  Settings, 
  Globe, 

  Bell, 
  Mail, 
  Shield, 
  Eye, 
  EyeOff, 
  Save, 
  X,
  Check,
  Smartphone,
  Lock,
  Trash2
} from 'lucide-react';

const colors = {
  primary: '#014d71',
  secondary: '#f0b800',
  primaryLight: '#0a5d85',
  secondaryLight: '#f5c842',
  white: '#ffffff',
  gray: '#f8f9fa',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107'
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

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export function SettingsModal({ isOpen, onClose, userProfile, onSave }: SettingsModalProps) {
  const [settings, setSettings] = useState(userProfile.preferences);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDangerZone, setShowDangerZone] = useState(false);

  const handleSettingChange = (key: string, value: boolean | string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSave({
      ...userProfile,
      preferences: settings
    });
    
    setIsLoading(false);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setSettings(userProfile.preferences); // Reset settings
    setShowDangerZone(false);
    onClose();
  };

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currencies = [
    { code: 'XOF', name: 'Franc CFA (FCFA)', symbol: 'FCFA' },
    { code: 'EUR', name: 'Euro (€)', symbol: '€' },
    { code: 'USD', name: 'Dollar US ($)', symbol: '$' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
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
                    <h2 className="text-2xl font-bold flex items-center" style={{ fontFamily: fonts.secondary }}>
                      <Settings className="h-6 w-6 mr-3" />
                      Paramètres
                    </h2>
                    <p className="text-white/80">Personnalisez votre expérience</p>
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
              <div className="p-6 space-y-8" style={{  background: `linear-gradient(135deg, ${colors. white} 0%, ${colors.primaryLight} 100%)`, fontFamily: fonts.primary }}>
                {/* Préférences générales */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                    <Globe className="h-5 w-5 mr-2" />
                    Préférences Générales
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Langue */}
                    <div className="space-y-3">
                      <Label style={{ color: colors.primary }}>Langue</Label>
                      <div className="space-y-2">
                        {languages.map((lang) => (
                          <motion.div
                            key={lang.code}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              settings.language === lang.code
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleSettingChange('language', lang.code)}
                            style={{
                              borderColor: settings.language === lang.code ? colors.primary : '#e5e7eb',
                              backgroundColor: settings.language === lang.code ? `${colors.primary}10` : 'transparent'
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{lang.flag}</span>
                              <span className="font-medium">{lang.name}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Devise */}
                    <div className="space-y-3">
                      <Label style={{ color: colors.primary }}>Devise</Label>
                      <div className="space-y-2">
                        {currencies.map((currency) => (
                          <motion.div
                            key={currency.code}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              settings.currency === currency.code
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleSettingChange('currency', currency.code)}
                            style={{
                              borderColor: settings.currency === currency.code ? colors.secondary : '#e5e7eb',
                              backgroundColor: settings.currency === currency.code ? `${colors.secondary}10` : 'transparent'
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{currency.name}</span>
                              <span className="text-lg font-bold" style={{ color: colors.secondary }}>
                                {currency.symbol}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ backgroundColor: colors.gray }}
                      className="flex items-center justify-between p-4 rounded-lg border transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        >
                          <Smartphone className="h-5 w-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <p className="font-medium">Notifications push</p>
                          <p className="text-sm text-gray-600">Recevoir des notifications sur votre appareil</p>
                        </div>
                      </div>
                      <Switch
                      
                        checked={settings.notifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                        
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ backgroundColor: colors.gray }}
                      className="flex items-center justify-between p-4 rounded-lg border transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${colors.secondary}20` }}
                        >
                          <Mail className="h-5 w-5" style={{ color: colors.secondary }} />
                        </div>
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-gray-600">Recevoir nos offres spéciales par email</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.newsletter}
                        onCheckedChange={(checked) => handleSettingChange('newsletter', checked)}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Sécurité et confidentialité */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.primary }}>
                    <Shield className="h-5 w-5 mr-2" />
                    Sécurité et Confidentialité
                  </h3>
                  
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ backgroundColor: colors.gray }}
                      className="flex items-center justify-between p-4 rounded-lg border transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${colors.warning}20` }}
                        >
                          <Lock className="h-5 w-5" style={{ color: colors.warning }} />
                        </div>
                        <div>
                          <p className="font-medium">Changer le mot de passe</p>
                          <p className="text-sm text-gray-600">Modifier votre mot de passe de connexion</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ borderColor: colors.warning, color: colors.warning }}
                      >
                        Modifier
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ backgroundColor: colors.gray }}
                      className="flex items-center justify-between p-4 rounded-lg border transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        >
                          <Eye className="h-5 w-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <p className="font-medium">Données personnelles</p>
                          <p className="text-sm text-gray-600">Télécharger vos données personnelles</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        Télécharger
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Zone dangereuse */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center" style={{ color: colors.danger }}>
                      <Trash2 className="h-5 w-5 mr-2" />
                      Zone Dangereuse
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDangerZone(!showDangerZone)}
                      className="text-gray-500"
                    >
                      {showDangerZone ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {showDangerZone && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <motion.div
                          whileHover={{ backgroundColor: '#fee2e2' }}
                          className="flex items-center justify-between p-4 rounded-lg border-2 border-red-200 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-red-800">Supprimer le compte</p>
                            <p className="text-sm text-red-600">
                              Cette action est irréversible. Toutes vos données seront supprimées.
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Supprimer
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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