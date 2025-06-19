"use client";

import React, { useState } from 'react';
import { Mail, Lock, Hotel, Facebook, Twitter, Sparkles, Eye, EyeOff, ArrowRight, Shield, Star, MapPin, Crown, Gift, Clock, Users } from 'lucide-react';
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

export default function HotelLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Connexion réussie!');
    }, 2000);
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
      Votre sanctuaire de luxe au bord du lac
    </p>
         <div className="flex items-center justify-center space-x-2 text-lg">
      <Star className="h-5 w-5" style={{ color: colors.gold }} />
      <Star className="h-5 w-5" style={{ color: colors.gold }} />
      <Star className="h-5 w-5" style={{ color: colors.gold }} />
      <Star className="h-5 w-5" style={{ color: colors.gold }} />
      <Star className="h-5 w-5" style={{ color: colors.gold }} />
      <span className="ml-2" style={{ color: colors.teal }}>Resort 5 étoiles</span>
    </div>
        </div>

        {/* Container principal élargi */}
        <div className="grid xl:grid-cols-5 gap-16 max-w-8xl mx-auto items-center">
          
          {/* Section Image élargie - 3 colonnes */}
          <div className="hidden xl:block xl:col-span-3 space-y-10">
            {/* Images en grille */}
            <div className="grid grid-cols-2 gap-8">
              {/* Image principale grande */}
              <div className="col-span-2 relative group">
                <div 
                  className="h-80 rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ background: `linear-gradient(45deg, ${colors.teal}, ${colors.maroon})` }}
                  />
                  <div className="absolute bottom-8 left-8 text-white">
  <h3 className="text-3xl font-bold mb-3">Expérience Unique</h3>
  <p className="text-blue-100 text-lg">Luxe & Sérénité</p>
</div>
                </div>
              </div>
              
              {/* Deux images moyennes */}
              <div 
                className="h-64 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div 
                className="h-64 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>

            {/* Stats cards élargies */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { icon: Crown, label: "Service Royal", value: "5 étoiles", color: colors.gold },
                { icon: MapPin, label: "Vue Panoramique", value: "Lac Premium", color: colors.teal },
                { icon: Shield, label: "Sécurité", value: "24h/24", color: colors.maroon },
                { icon: Users, label: "Clientèle VIP", value: "Exclusive", color: colors.orange }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3" style={{ color: stat.color }} />
                  <p className="text-sm font-bold mb-1" style={{ color: colors.maroon }}>{stat.label}</p>
                  <p className="text-xs font-medium" style={{ color: colors.teal }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Section privilèges élargie */}
            <div 
              className="rounded-3xl p-8 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${colors.cream}, #ffffff)` }}
            >
              <h3 className="flex items-center text-2xl font-bold mb-6" style={{ color: colors.maroon }}>
                <Gift className="h-6 w-6 mr-3" style={{ color: colors.gold }} />
                Avantages Membres Exclusifs
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Clock, text: "Check-in prioritaire 14h" },
                  { icon: Crown, text: "Surclassement gratuit" },
                  { icon: Sparkles, text: "Spa & wellness -20%" },
                  { icon: Gift, text: "Petit-déjeuner offert" },
                  { icon: Shield, text: "Annulation flexible" },
                  { icon: Star, text: "Conciergerie 24h/24" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center p-3 rounded-xl bg-white/60">
                    <benefit.icon className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: colors.orange }} />
                    <span className="text-sm font-medium" style={{ color: colors.teal }}>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Formulaire - 2 colonnes */}
          <div className="xl:col-span-2 w-full max-w-lg mx-auto xl:mx-0">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
              
              {/* Header du formulaire */}
              <div 
                className="px-10 py-10 text-white text-center"
                style={{ background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.teal} 100%)` }}
              >
                <h2 className="text-3xl font-bold mb-3">Espace Membre</h2>
                <p className="text-blue-100 text-lg">Accédez à votre univers privilégié</p>
              </div>

              {/* Formulaire */}
              <div className="p-10 space-y-8">
                
                {/* Champ Email */}
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-bold" style={{ color: colors.maroon }}>
                    Adresse électronique
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-4 py-5 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
                      style={{
                        backgroundColor: colors.lightTeal,
                        borderColor: colors.cream,
                        boxShadow: 'none'
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
                      placeholder="votre.email@exemple.com"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 transition-colors" style={{ color: colors.teal }} />
                  </div>
                </div>

                {/* Champ Mot de passe */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm font-bold" style={{ color: colors.maroon }}>
                      Mot de passe
                    </label>
                    <button className="text-sm font-medium hover:underline transition-colors" style={{ color: colors.orange }}>
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative group">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-14 py-5 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-slate-700 placeholder-slate-400"
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
                      placeholder="Votre mot de passe sécurisé"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6" style={{ color: colors.teal }} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-2 w-5 h-5" style={{ accentColor: colors.teal }} />
                    <span style={{ color: colors.teal }}>Se souvenir de moi</span>
                  </label>
                </div>

                {/* Bouton de connexion */}
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="w-full text-white font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.maroon} 100%)`
                  }}
                >
                  <span className="flex items-center justify-center space-x-3 relative z-10">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                        <span className="text-lg">Connexion en cours...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">Se connecter</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

                {/* Séparateur */}
                <div className="mt-10">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2" style={{ borderColor: colors.cream }} />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-6 bg-white font-bold" style={{ color: colors.teal }}>
                        Ou continuez avec
                      </span>
                    </div>
                  </div>

                  {/* Boutons sociaux */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
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

                {/* Lien d'inscription */}
                <div className="text-center pt-8 border-t-2" style={{ borderColor: colors.cream }}>
                  <p style={{ color: colors.teal }}>
                    Nouveau client ?{' '}
                    
<Link href="/register" className="text-sm ml-2" style={{ color: colors.orange }}>
   Créer un compte privilégié
</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer élargi */}
        <div className="mt-20 text-center text-lg">
          <p style={{ color: colors.teal }}>&copy; 2025 Bain de Lac Resort. Tous droits réservés.</p>
          <div className="mt-4 space-x-6">
            <button className="hover:underline transition-colors font-medium" style={{ color: colors.maroon }}>Confidentialité</button>
            <span style={{ color: colors.gold }}>•</span>
            <button className="hover:underline transition-colors font-medium" style={{ color: colors.maroon }}>Conditions</button>
            <span style={{ color: colors.gold }}>•</span>
            <button className="hover:underline transition-colors font-medium" style={{ color: colors.maroon }}>Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}