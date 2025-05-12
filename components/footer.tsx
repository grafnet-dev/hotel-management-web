import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-sky-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Bain de Lac</h3>
            <p className="text-sky-200">
              Votre havre de paix au bord du lac, alliant luxe et sérénité pour un séjour inoubliable.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Route du Lac, 74000 Annecy</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+33 4 50 00 00 00</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@baindelac.fr</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/rooms" className="hover:text-sky-200">Nos chambres</Link></li>
              <li><Link href="/spa" className="hover:text-sky-200">Spa & Bien-être</Link></li>
              <li><Link href="/restaurant" className="hover:text-sky-200">Restaurant</Link></li>
              <li><Link href="/events" className="hover:text-sky-200">Évènements</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-sky-200">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-sky-200">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-sky-200">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sky-800 text-center text-sky-200">
          <p>&copy; {new Date().getFullYear()} Bain de Lac. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}