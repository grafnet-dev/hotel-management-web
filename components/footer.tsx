import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send, Heart, Star, Clock, Shield, Award } from 'lucide-react';
import Link from 'next/link';

const colors = {
  teal: "#014d71",       // Nouvelle couleur principale
  gold: "#f0b800",       // Nouvelle couleur secondaire     
  orange: '#FF8C42',     
  maroon: '#800020',     
  lightTeal: '#E6F2F2',  
  darkTeal: '#013953',   // Nuance plus foncée de #014d71
  cream: '#F5F5DC',     
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ 
      background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.darkTeal} 50%, ${colors.maroon} 100%)`,
      fontFamily: "'Poppins', 'Times New Roman', sans-serif"
    }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-32 h-32 rounded-full" style={{ backgroundColor: colors.gold }}></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 rounded-full" style={{ backgroundColor: colors.orange }}></div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full" style={{ backgroundColor: colors.cream }}></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 rounded-full" style={{ backgroundColor: colors.gold }}></div>
      </div>

      {/* Awards/Certifications Banner */}
      <div className="relative border-b border-white/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2 text-white">
              <Award className="w-5 h-5" style={{ color: colors.gold }} />
              <span className="text-sm font-medium">
                Hôtel 5 étoiles certifié
              </span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5" style={{ color: colors.gold }} />
              <span className="text-sm font-medium">
                Service sécurisé 24h/24
              </span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Star className="w-5 h-5" style={{ color: colors.gold }} />
              <span className="text-sm font-medium">
                Excellence béninoise
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo et description améliorés */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" 
                     style={{ background: `linear-gradient(45deg, ${colors.gold}, ${colors.orange})` }}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 
                  className="text-2xl font-bold text-white leading-tight"
                >
                  Relacs Zone<br />
                  <span style={{ color: colors.gold }}>Bénin</span>
                </h3>
              </div>
              
              <p className="text-white/80 leading-relaxed">
                Séjournez à Relacs Zone et vivez une expérience unique mêlant confort, élégance et chaleur béninoise.
              </p>
            </div>

            {/* Contact rapide avec design amélioré */}
            <div className="p-6 rounded-2xl border border-white/20 backdrop-blur-sm" 
                 style={{ background: `linear-gradient(135deg, ${colors.gold}22, ${colors.orange}11)` }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" 
                     style={{ backgroundColor: colors.gold }}>
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: colors.cream }}>
                    Service disponible 24h/24
                  </p>
                  <p className="font-bold text-lg text-white">
                    +229 21 30 40 50
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact amélioré */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.gold }}></div>
              <h3 className="text-xl font-bold text-white">
                Contact
              </h3>
            </div>
            
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  title: "Adresse",
                  content: ["Rue des Cocotiers, Haie Vive", "Cotonou, Bénin"],
                  color: colors.orange
                },
                {
                  icon: Phone,
                  title: "WhatsApp",
                  content: ["+229 96 00 00 00"],
                  color: colors.gold
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: ["contact@relacszone.bj"],
                  color: colors.cream
                }
              ].map((contact, index) => (
                <div key={index} className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" 
                       style={{ backgroundColor: `${contact.color}33`, border: `2px solid ${contact.color}` }}>
                    <contact.icon className="h-5 w-5" style={{ color: contact.color }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1" style={{ color: contact.color }}>
                      {contact.title}
                    </h4>
                    {contact.content.map((line, i) => (
                      <p key={i} className="text-white/90 text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liens rapides améliorés */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.gold }}></div>
              <h3 className="text-xl font-bold text-white">
                Nos Services
              </h3>
            </div>
            
            <ul className="space-y-4">
              {[
                { href: "/rooms", label: "Nos chambres", icon: "🏨" },
                { href: "/spa", label: "Spa & Bien-être", icon: "🧘" },
                { href: "/restaurant", label: "Restaurant La Teranga", icon: "🍽️" },
                { href: "/events", label: "Évènements & Séminaires", icon: "🎉" },
                { href: "/tours", label: "Excursions & Tours", icon: "🗺️" },
                { href: "/services", label: "Services VIP", icon: "⭐" }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300 hover:transform hover:translate-x-2"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-300 group-hover:scale-110" 
                         style={{ backgroundColor: `${colors.gold}22` }}>
                      {item.icon}
                    </div>
                    <span className="group-hover:font-medium">
                      {item.label}
                    </span>
                    <div className="w-0 h-0.5 group-hover:w-4 transition-all duration-300" 
                         style={{ backgroundColor: colors.gold }}></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux et newsletter améliorés */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.gold }}></div>
              <h3 className="text-xl font-bold text-white">
                Suivez-nous
              </h3>
            </div>
            
            <p className="text-white/80 leading-relaxed">
              Découvrez nos actualités, offres spéciales et la beauté du Bénin à travers nos réseaux sociaux.
            </p>
            
            {/* Réseaux sociaux avec design moderne */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" }
              ].map((social, index) => (
                <Link 
                  key={index}
                  href={social.href} 
                  className="group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.gold}44, ${colors.orange}33)`,
                    border: `1px solid ${colors.gold}66`
                  }}
                  title={social.label}
                >
                  <social.icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.orange})` }}></div>
                </Link>
              ))}
            </div>

            {/* Newsletter avec design moderne */}
            <div className="p-6 rounded-2xl border border-white/20" 
                 style={{ background: `linear-gradient(135deg, ${colors.darkTeal}88, ${colors.teal}44)` }}>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5" style={{ color: colors.gold }} />
                <h4 className="font-bold text-white">
                  Newsletter
                </h4>
              </div>
              <p className="text-white/80 text-sm mb-4">
                Recevez nos offres exclusives
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-1 px-4 py-3 text-sm rounded-xl border-0 focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    backgroundColor: colors.cream,
                    color: colors.darkTeal,
                    boxShadow: `0 0 0 2px ${colors.gold}`, 
                  }}
                />
                <button 
                  className="px-4 py-3 rounded-xl text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ 
                    background: `linear-gradient(45deg, ${colors.gold}, ${colors.orange})`
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horaires de contact */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-white/20">
              <Clock className="w-5 h-5" style={{ color: colors.gold }} />
              <div>
                <p className="text-white font-medium text-sm">
                  Réception 24h/24
                </p>
                <p className="text-white/70 text-xs">
                  Toujours à votre service
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section améliorée */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-white/90 font-medium">
                &copy; {new Date().getFullYear()} Relacs Zone. Tous droits réservés.
              </p>
              <p className="text-white/60 text-sm mt-1">
                Conçu avec <Heart className="inline w-4 h-4 mx-1" style={{ color: colors.gold }} /> pour valoriser l&rsquo;hospitalité béninoise
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-white/80 hover:text-white transition-colors hover:underline"
              >
                Politique de confidentialité
              </Link>
              <Link 
                href="/terms" 
                className="text-white/80 hover:text-white transition-colors hover:underline"
              >
                Conditions générales
              </Link>
              <Link 
                href="/cookies" 
                className="text-white/80 hover:text-white transition-colors hover:underline"
              >
                Politique des cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="h-2" style={{ background: `linear-gradient(90deg, ${colors.gold}, ${colors.orange}, ${colors.maroon}, ${colors.teal})` }}></div>
    </footer>
  );
}