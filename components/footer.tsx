import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sky-900 to-sky-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <h3 
              className="text-xl font-bold mb-2 text-amber-400"
              style={{ fontFamily: 'Bahnschrift, sans-serif' }}
            >
              Hôtel Prestige Bénin
            </h3>
            <p className="text-sky-200 text-sm">
              Votre havre de paix au cœur de Cotonou, alliant luxe africain et modernité pour un séjour inoubliable.
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-sky-300">Service disponible 24h/24</p>
                <p className="font-medium">+229 21 30 40 50</p>
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4 text-amber-400 border-b border-amber-500 pb-2"
              style={{ fontFamily: 'Bahnschrift, sans-serif' }}
            >
              Contact
            </h3>
            <div className="space-y-3">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-sky-200">
                  Rue des Cocotiers, Haie Vive<br />
                  Cotonou, Bénin
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 texjbhqds,nSXt-amber-400" />
                <span className="text-sky-200">+229 96 00 00 00 (WhatsApp)</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <span className="text-sky-200">contact@hotelprestige.bj</span>
              </p>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4 text-amber-400 border-b border-amber-500 pb-2"
              style={{ fontFamily: 'Bahnschrift, sans-serif' }}
            >
              Liens rapides
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/rooms" 
                  className="hover:text-amber-400 text-sky-200 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                  Nos chambres
                </Link>
              </li>
              <li>
                <Link 
                  href="/spa" 
                  className="hover:text-amber-400 text-sky-200 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                  Spa & Bien-être
                </Link>
              </li>
              <li>
                <Link 
                  href="/restaurant" 
                  className="hover:text-amber-400 text-sky-200 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                  Restaurant La Teranga
                </Link>
              </li>
              <li>
                <Link 
                  href="/events" 
                  className="hover:text-amber-400 text-sky-200 transition-colors flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                  Évènements & Séminaires
                </Link>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4 text-amber-400 border-b border-amber-500 pb-2"
              style={{ fontFamily: 'Bahnschrift, sans-serif' }}
            >
              Suivez-nous
            </h3>
            <p className="text-sky-200 mb-4 text-sm">
              Découvrez nos actualités et offres spéciales
            </p>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="hover:text-amber-400 text-sky-200 transition-colors bg-sky-800 p-2 rounded-full hover:bg-amber-500"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="hover:text-amber-400 text-sky-200 transition-colors bg-sky-800 p-2 rounded-full hover:bg-amber-500"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="hover:text-amber-400 text-sky-200 transition-colors bg-sky-800 p-2 rounded-full hover:bg-amber-500"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2 text-sky-200">
                Abonnez-vous à notre newsletter
              </h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="px-3 py-2 text-sm text-gray-400 rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-400 w-full"
                />
                <button 
                  className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-r-md text-sm transition-colors"
                  style={{ fontFamily: 'Bahnschrift, sans-serif' }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-sky-800 text-center">
          <p className="text-sky-300 text-sm">
            &copy; {new Date().getFullYear()} Hôtel Prestige Bénin. Tous droits réservés. | 
            <Link href="/privacy" className="hover:text-amber-400 ml-1">Politique de confidentialité</Link> | 
            <Link href="/terms" className="hover:text-amber-400 ml-1">Conditions d'utilisation</Link>
          </p>
          <p className="text-xs text-sky-400 mt-2">
            Conçu avec passion pour mettre en valeur l'hospitalité béninoise
          </p>
        </div>
      </div>
    </footer>
  );
}