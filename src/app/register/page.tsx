"use client";

import React, { useState } from 'react';
import { Mail, Lock,  Facebook, Twitter, Sparkles, Eye, EyeOff, ArrowRight, Shield, Star,  Crown, Gift, Clock, Users, User, Phone, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const colors = {
  teal: "#005D7C",
  gold: "#CE9226",     
  orange: '#FF8C42',     
  maroon: '#800020',     
  lightTeal: '#E6F2F2',  
  darkTeal: '#006666',   
  cream: '#F5F5DC',     
};

export default function HotelRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    acceptTerms: false,
    acceptOffers: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (field: string, value: string | boolean | number) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  if (e) e.preventDefault();
  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
    alert('Inscription réussie! Bienvenue dans la famille Bain de Lac!');
  }, 2500);
};

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div 
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(135deg, ${colors.lightTeal} 0%, ${colors.cream} 30%, #ffffff 70%, ${colors.lightTeal} 100%)`
      }}
    >
      {/* Header avec espacement élargi */}
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-20 pt-12">
          
          <h1 
      className="text-6xl md:text-7xl font-bold mb-6"
      style={{ color: colors.maroon }}
    >
      Bain de Lac
    </h1>
          <p 
            className="text-2xl max-w-3xl mx-auto mb-4"
            style={{ color: colors.teal }}
          >
            Rejoignez notre communauté exclusive
          </p>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <Crown className="h-6 w-6" style={{ color: colors.gold }} />
            <span className="ml-2" style={{ color: colors.teal }}>Devenez membre privilégié dès aujourd'hui</span>
          </div>
        </div>

        {/* Container principal élargi */}
        <div className="grid xl:grid-cols-5 gap-16 max-w-8xl mx-auto items-start">
          
          {/* Section Avantages élargies - 3 colonnes */}
          <div className="hidden xl:block xl:col-span-3 space-y-10">
            
            {/* Section bienvenue */}
            <div 
              className="rounded-3xl p-10 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${colors.cream}, #ffffff)` }}
            >
              <h2 className="text-3xl font-bold mb-6" style={{ color: colors.maroon }}>
                Bienvenue dans l'Excellence
              </h2>
              <p className="text-lg mb-8" style={{ color: colors.teal }}>
                En devenant membre de Bain de Lac, vous accédez à un univers de privilèges exclusifs 
                et d'expériences inoubliables au cœur de notre resort 5 étoiles.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div 
                  className="h-48 rounded-2xl overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div 
                  className="h-48 rounded-2xl overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
            </div>

            {/* Avantages membres détaillés */}
            <div 
              className="rounded-3xl p-10 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${colors.cream}, #ffffff)` }}
            >
              <h3 className="flex items-center text-2xl font-bold mb-8" style={{ color: colors.maroon }}>
                <Gift className="h-6 w-6 mr-3" style={{ color: colors.gold }} />
                Vos Privilèges Membres
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { 
                    icon: Crown, 
                    title: "Réservations Privilégiées",
                    description: "Accès prioritaire aux meilleures suites et créneaux exclusifs",
                    color: colors.gold 
                  },
                  { 
                    icon: Star, 
                    title: "Tarifs Préférentiels", 
                    description: "Réductions permanentes de 15% à 25% sur tous nos services",
                    color: colors.orange 
                  },
                  { 
                    icon: Sparkles, 
                    title: "Spa & Wellness Premium", 
                    description: "Accès illimité au spa privé et soins exclusifs",
                    color: colors.teal 
                  },
                  { 
                    icon: Clock, 
                    title: "Service Conciergerie 24h/24", 
                    description: "Assistance personnalisée pour tous vos besoins",
                    color: colors.maroon 
                  }
                ].map((privilege, index) => (
                  <div key={index} className="flex items-start p-6 rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-all">
                    <privilege.icon className="h-8 w-8 mr-4 flex-shrink-0 mt-1" style={{ color: privilege.color }} />
                    <div>
                      <h4 className="text-lg font-bold mb-2" style={{ color: colors.maroon }}>{privilege.title}</h4>
                      <p className="text-sm" style={{ color: colors.teal }}>{privilege.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats membres */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Users, label: "Membres Actifs", value: "2,500+", color: colors.teal },
                { icon: Star, label: "Satisfaction", value: "98%", color: colors.gold },
                
{ icon: Shield, label: "Expertise", value: "Luxe & Qualité", color: colors.maroon }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <stat.icon className="h-10 w-10 mx-auto mb-3" style={{ color: stat.color }} />
                  <p className="text-2xl font-bold mb-1" style={{ color: colors.maroon }}>{stat.value}</p>
                  <p className="text-sm font-medium" style={{ color: colors.teal }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section Formulaire - 2 colonnes */}
          <div className="xl:col-span-2 w-full max-w-lg mx-auto xl:mx-0">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
              
              {/* Header du formulaire avec étapes */}
              <div 
                className="px-10 py-10 text-white text-center"
                style={{ background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.teal} 100%)` }}
              >
                <h2 className="text-3xl font-bold mb-3">Inscription Membre</h2>
                <p className="text-blue-100 text-lg mb-6">Créez votre compte privilégié</p>
                
                {/* Indicateur d'étapes */}
                <div className="flex justify-center space-x-4">
                  {[1, 2].map((step) => (
                    <div key={step} className="flex items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                          currentStep >= step ? 'bg-white text-teal-600' : 'bg-white/30 text-white'
                        }`}
                      >
                        {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                      </div>
                      {step < 2 && (
                        <div className={`w-12 h-1 mx-2 rounded ${currentStep > step ? 'bg-white' : 'bg-white/30'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulaire multi-étapes */}
              <div className="p-10">
                
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-6" style={{ color: colors.maroon }}>
                      Informations Personnelles
                    </h3>
                    
                    {/* Prénom et Nom */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-bold" style={{ color: colors.maroon }}>
                          Prénom
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300"
                            style={{
                              backgroundColor: colors.lightTeal,
                              borderColor: colors.cream
                            }}
                            onFocus={(e) => {
                              e.target.style.backgroundColor = 'white';
                              e.target.style.borderColor = colors.teal;
                              e.target.style.boxShadow = `0 0 0 4px ${colors.lightTeal}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.backgroundColor = colors.lightTeal;
                              e.target.style.borderColor = colors.cream;
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder="Jean"
                            required
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: colors.teal }} />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-sm font-bold" style={{ color: colors.maroon }}>
                          Nom
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => updateFormData('lastName', e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300"
                            style={{
                              backgroundColor: colors.lightTeal,
                              borderColor: colors.cream
                            }}
                            onFocus={(e) => {
                              e.target.style.backgroundColor = 'white';
                              e.target.style.borderColor = colors.teal;
                              e.target.style.boxShadow = `0 0 0 4px ${colors.lightTeal}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.backgroundColor = colors.lightTeal;
                              e.target.style.borderColor = colors.cream;
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder="Dupont"
                            required
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: colors.teal }} />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold" style={{ color: colors.maroon }}>
                        Adresse électronique
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300"
                          style={{
                            backgroundColor: colors.lightTeal,
                            borderColor: colors.cream
                          }}
                          onFocus={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.borderColor = colors.teal;
                            e.target.style.boxShadow = `0 0 0 4px ${colors.lightTeal}`;
                          }}
                          onBlur={(e) => {
                            e.target.style.backgroundColor = colors.lightTeal;
                            e.target.style.borderColor = colors.cream;
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="jean.dupont@exemple.com"
                          required
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: colors.teal }} />
                      </div>
                    </div>

                    {/* Téléphone et Date de naissance */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-bold" style={{ color: colors.maroon }}>
                          Téléphone
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300"
                            style={{
                              backgroundColor: colors.lightTeal,
                              borderColor: colors.cream
                            }}
                            onFocus={(e) => {
                              e.target.style.backgroundColor = 'white';
                              e.target.style.borderColor = colors.teal;
                              e.target.style.boxShadow = `0 0 0 4px ${colors.lightTeal}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.backgroundColor = colors.lightTeal;
                              e.target.style.borderColor = colors.cream;
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder="+33 6 12 34 56 78"
                          />
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: colors.teal }} />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-sm font-bold" style={{ color: colors.maroon }}>
                          Date de naissance
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => updateFormData('birthDate', e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300"
                            style={{
                              backgroundColor: colors.lightTeal,
                              borderColor: colors.cream
                            }}
                            onFocus={(e) => {
                              e.target.style.backgroundColor = 'white';
                              e.target.style.borderColor = colors.teal;
                              e.target.style.boxShadow = `0 0 0 4px ${colors.lightTeal}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.backgroundColor = colors.lightTeal;
                              e.target.style.borderColor = colors.cream;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: colors.teal }} />
                        </div>
                      </div>
                    </div>

                    {/* Bouton Suivant */}
                    <button
                      onClick={nextStep}
                      className="w-full text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                      style={{
                        background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.darkTeal} 100%)`
                      }}
                    >
                      <span className="flex items-center justify-center space-x-3">
                        <span className="text-lg">Continuer</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold" style={{ color: colors.maroon }}>
                        Sécurité & Préférences
                      </h3>
                      <button
                        onClick={prevStep}
                        className="text-sm font-medium hover:underline transition-colors"
                        style={{ color: colors.orange }}
                      >
                        ← Retour
                      </button>
                    </div>

                    {/* Mots de passe */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold" style={{ color: colors.maroon }}>
                        Mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => updateFormData('password', e.target.value)}
                          className="w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300"
                          style={{
                            backgroundColor: colors.lightTeal,
                            borderColor: colors.cream
                          }}
                          onFocus={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.borderColor = colors.teal;
                            e.target.style.boxShadow = `0 0 0 4px ${colors.lightTeal}`;
                          }}
                          onBlur={(e) => {
                            e.target.style.backgroundColor = colors.lightTeal;
                            e.target.style.borderColor = colors.cream;
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Mot de passe sécurisé"
                          required
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: colors.teal }} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold" style={{ color: colors.maroon }}>
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                          className="w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300"
                          style={{
                            backgroundColor: colors.lightTeal,
                            borderColor: colors.cream
                          }}
                          onFocus={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.borderColor = colors.teal;
                            e.target.style.boxShadow = `0 0 0 4px ${colors.lightTeal}`;
                          }}
                          onBlur={(e) => {
                            e.target.style.backgroundColor = colors.lightTeal;
                            e.target.style.borderColor = colors.cream;
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Confirmer le mot de passe"
                          required
                        />
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: colors.teal }} />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    {/* Conditions et préférences */}
                    <div className="space-y-4 pt-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.acceptTerms}
                          onChange={(e) => updateFormData('acceptTerms', e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-2" 
                          style={{ accentColor: colors.teal }} 
                          required
                        />
                        <span className="text-sm" style={{ color: colors.teal }}>
                          J'accepte les{' '}
                          <button className="font-bold hover:underline" style={{ color: colors.orange }}>
                            conditions d'utilisation
                          </button>
                          {' '}et la{' '}
                          <button className="font-bold hover:underline" style={{ color: colors.orange }}>
                            politique de confidentialité
                          </button>
                        </span>
                      </label>
                      
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.acceptOffers}
                          onChange={(e) => updateFormData('acceptOffers', e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-2" 
                          style={{ accentColor: colors.teal }} 
                        />
                        <span className="text-sm" style={{ color: colors.teal }}>
                          Je souhaite recevoir des offres exclusives et actualités par email
                        </span>
                      </label>
                    </div>

                    {/* Bouton final */}
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !formData.acceptTerms}
                      className="w-full text-white font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.maroon} 100%)`
                      }}
                    >
                      <span className="flex items-center justify-center space-x-3 relative z-10">
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                            <span className="text-lg">Création du compte...</span>
                          </>
                        ) : (
                          <>
                            <Crown className="h-6 w-6" />
                            <span className="text-lg">Devenir Membre Privilégié</span>
                          </>
                        )}
                      </span>
                    </button>

                    {/* Connexion sociale */}
                    <div className="mt-8">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t-2" style={{ borderColor: colors.cream }} />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-6 bg-white font-bold" style={{ color: colors.teal }}>
                            Ou inscrivez-vous avec
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <button 
                          className="flex items-center justify-center px-4 py-4 border-2 rounded-xl transition-all duration-300 group transform hover:scale-105"
                          style={{
                            backgroundColor: colors.lightTeal,
                            borderColor: colors.cream
                          }}
                          onMouseEnter={(e) => {
  (e.target as HTMLElement).style.backgroundColor = 'white';
  (e.target as HTMLElement).style.borderColor = colors.teal;
}}
onMouseLeave={(e) => {
  (e.target as HTMLElement).style.backgroundColor = colors.lightTeal;
  (e.target as HTMLElement).style.borderColor = colors.cream;
}}
                        >
                          <Facebook className="h-5 w-5 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
                          <span className="font-bold" style={{ color: colors.teal }}>Facebook</span>
                        </button>
                        <button 
                          className="flex items-center justify-center px-4 py-4 border-2 rounded-xl transition-all duration-300 group transform hover:scale-105"
                          style={{
                            backgroundColor: colors.lightTeal,
                            borderColor: colors.cream
                          }}
                           onMouseEnter={(e) => {
  (e.target as HTMLElement).style.backgroundColor = 'white';
  (e.target as HTMLElement).style.borderColor = colors.teal;
}}
onMouseLeave={(e) => {
  (e.target as HTMLElement).style.backgroundColor = colors.lightTeal;
  (e.target as HTMLElement).style.borderColor = colors.cream;
}}
                        >
                          <Twitter className="h-5 w-5 text-sky-500 mr-2 group-hover:scale-110 transition-transform" />
                          <span className="font-bold" style={{ color: colors.teal }}>Twitter</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lien de connexion */}
                <div className="text-center pt-8 border-t-2" style={{ borderColor: colors.cream }}>
                  <span className="text-sm font-bold" style={{ color: colors.teal }}>
                    Vous avez deja un compte?{' '}
                    <Link href="/login" className="font-bold hover:underline" style={{ color: colors.orange }}>
                      Connectez-vous
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}