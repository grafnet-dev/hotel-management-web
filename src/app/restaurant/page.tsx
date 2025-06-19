"use client";

import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { useState } from 'react';
import Image from 'next/image';


const colors = {
 teal: "#005D7C",
  gold: "#CE9226",     
  orange: '#FF8C42',     
  maroon: '#800020',     
  lightTeal: '#E6F2F2',  
  darkTeal: '#006666',   
  cream: '#F5F5DC',     
};


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};




const slideIn = (direction = 'left') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
});

export default function Restaurant() {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    message: ''
  });

 const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Ici vous ajouteriez la logique pour envoyer les données
    // Ici vous ajouteriez la logique pour envoyer les données
    alert(`Réservation envoyée pour ${formData.name}`);
    setShowReservationForm(false);
  };

  const menuSections = [
    {
      title: "Petit-déjeuner",
      key: "petit_dejeuner",
      items: [
        {
          name: "Assiette Continentale",
          description: "Pain frais, croissants, confiture maison, fruits frais, yaourt et café/thé",
          price: "12 500 FCFA"
        },
        {
          name: "Breakfast Béninois",
          description: "Akassa, sauce tomate, poisson fumé, avocat et jus naturel",
          price: "8 000 FCFA"
        },
        {
          name: "Omelette du Chef",
          description: "Omelette aux champignons, fromage et fines herbes, accompagnée de toast",
          price: "9 500 FCFA"
        }
      ]
    },
    {
      title: "Entrées",
      key: "entrees",
      items: [
        {
          name: "Foie Gras Maison",
          description: "Foie gras mi-cuit, chutney de figues et pain brioché",
          price: "18 000 FCFA"
        },
        {
          name: "Tartare de Thon",
          description: "Thon rouge, avocat et agrumes",
          price: "15 000 FCFA"
        },
        {
          name: "Velouté de Saison",
          description: "Légumes de saison et crème montée aux herbes",
          price: "11 000 FCFA"
        }
      ]
    },
    {
      title: "Plats Principaux",
      key: "plats",
      items: [
        {
          name: "Filet de Bœuf Rossini",
          description: "Foie gras poêlé, sauce périgueux et légumes de saison",
          price: "27 000 FCFA"
        },
        {
          name: "Homard Bleu Grillée",
          description: "Homard rôti, bisque crémeuse et légumes croquants",
          price: "35 000 FCFA"
        },
        {
          name: "Risotto aux Truffes",
          description: "Riz carnaroli, truffe noire et parmesan 36 mois",
          price: "23 000 FCFA"
        }
      ]
    },
    {
      title: "Desserts",
      key: "desserts",
      items: [
        {
          name: "Soufflé au Chocolat",
          description: "Chocolat grand cru et glace vanille",
          price: "9 000 FCFA"
        },
        {
          name: "Tarte au Citron Meringuée",
          description: "Citron de Menton et meringue italienne",
          price: "8 000 FCFA"
        },
        {
          name: "Café Gourmand",
          description: "Sélection de mignardises maison",
          price: "7 000 FCFA"
        }
      ]
    },
    {
      title: "Boissons",
      key: "boissons",
      items: [
        {
          name: "Jus Naturels",
          description: "Ananas, mangue, gingembre ou baobab",
          price: "3 500 FCFA"
        },
        {
          name: "Cocktails Signature",
          description: "Sélection de cocktails maison avec fruits locaux",
          price: "6 500 FCFA"
        },
        {
          name: "Vins Sélection",
          description: "Verre de vin rouge, blanc ou rosé d'importation",
          price: "8 000 FCFA"
        }
      ]
    },
    {
      title: "Menu Dégustation",
      key: "degustation",
      items: [
        {
          name: "Voyage Culinaire",
          description: "Sélection des meilleures créations du chef en 7 services",
          price: "45 000 FCFA"
        },
        {
          name: "Saveurs Locales",
          description: "Découverte des spécialités béninoises réinventées",
          price: "38 000 FCFA"
        },
        {
          name: "Menu Enfant",
          description: "Adapté aux jeunes gourmets avec des portions adaptées",
          price: "25 000 FCFA"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16" style={{ 
      fontFamily: 'Bahnschrift, sans-serif',
      backgroundColor: colors.lightTeal 
    }}>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
           <Image
    src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
    alt="Restaurant"
    layout="fill"
    objectFit="cover"
  />
  <div className="absolute inset-0" style={{ 
    background: `linear-gradient(to top, ${colors.maroon}70, ${colors.teal}40)`
  }} />
        </motion.div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ color: colors.cream }}
            >
              <span className="block" style={{ color: colors.gold }}>La Table Royale</span>
              <span className="text-3xl md:text-4xl font-light mt-4 block">Cotonou</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ color: colors.cream }}
            >
             Art culinaire et tradition béninoise sublimés
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full shadow-lg transform hover:scale-105 transition-transform"
                style={{
                  backgroundColor: colors.orange,
                  color: 'white'
                }}
                onClick={() => setShowReservationForm(true)}
              >
                Réserver maintenant
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Reservation Modal */}
      {showReservationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl shadow-2xl max-w-md w-full p-8 relative"
            style={{ backgroundColor: colors.cream }}
          >
            <button 
              onClick={() => setShowReservationForm(false)}
              className="absolute top-4 right-4"
              style={{ color: colors.maroon }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold mb-6 text-center tracking-tight" style={{ color: colors.maroon }}>
              Réserver une table
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: colors.teal }}>Nom complet</label>
                <input
  type="text"
  id="name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
  className={`w-full px-4 py-2 border rounded-lg ${formData.name ? 'focused' : ''}`}
  style={{ 
    borderColor: colors.teal,
  }}
/>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: colors.teal }}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ borderColor: colors.teal }}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: colors.teal }}>Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ borderColor: colors.teal }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1" style={{ color: colors.teal }}>Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ borderColor: colors.teal }}
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-1" style={{ color: colors.teal }}>Heure (GMT+1)</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ borderColor: colors.teal }}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="guests" className="block text-sm font-medium mb-1" style={{ color: colors.teal }}>Nombre de personnes</label>
                 <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all"
                  style={{ borderColor: colors.teal }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: colors.teal }}>Demandes spéciales</label>
             <textarea
  id="message"
  name="message"
  value={formData.message}
  onChange={handleTextAreaChange}
  rows={3}
  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
  style={{ borderColor: colors.teal }}
/>
              </div>
              
              <Button 
                type="submit"
                className="w-full py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: colors.orange,
                  color: 'white'
                }}
              >
                Confirmer la réservation
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* About Section */}
      <section className="py-24" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideIn('left')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
             <Image
  src="https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg"
  alt="Chef"
  className="w-full h-full object-cover"
  width={500} 
  height={500} 
/>
              <div className="absolute inset-0" style={{ 
                background: `linear-gradient(to top, ${colors.maroon}30, transparent)`
              }} />
            </motion.div>
            
            <motion.div
              variants={slideIn('right')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 tracking-tight" style={{ color: colors.gold }}>Notre Chef Étoilé</h2>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: colors.darkTeal }}>
                Le Chef Éric Dossou, formé aux meilleures écoles culinaires, vous propose une 
                fusion unique entre cuisine internationale et saveurs béninoises. 
                Ses créations vous transporteront dans un voyage gastronomique inoubliable.
              </p>
              
              <div className="mb-8 p-6 rounded-xl border" style={{ 
                backgroundColor: `${colors.gold}15`,
                borderColor: colors.gold
              }}>
                <h3 className="font-semibold text-lg mb-3" style={{ color: colors.maroon }}>Heures de service :</h3>
                <ul className="space-y-2" style={{ color: colors.darkTeal }}>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Petit-déjeuner :</span>
                    <span>7h00 - 10h30 (GMT+1)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Déjeuner :</span>
                    <span>12h00 - 15h00 (GMT+1)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Dîner :</span>
                    <span>18h30 - 23h00 (GMT+1)</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                className="px-8 py-6 text-lg rounded-lg shadow-md transform hover:scale-105 transition-transform"
                style={{
                  backgroundColor: colors.orange,
                  color: 'white'
                }}
                onClick={() => setShowReservationForm(true)}
              >
                Réserver une table
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24" style={{ backgroundColor: colors.lightTeal }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: colors.maroon }}>
              <span style={{ color: colors.gold }}>Notre</span> Carte
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.teal }}>
             Une sélection de plats raffinés cuisinés avec des produits locaux et importés.
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
           {menuSections.map((section, index) => (
  <motion.div 
    key={section.key}
    variants={item}
    className={`relative ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
    whileHover={{ y: -10 }}
  >
                <Card className="p-8 h-full rounded-xl shadow-sm hover:shadow-md transition-all"
                  style={{ 
                    backgroundColor: 'white',
                    border: `1px solid ${colors.gold}33`
                  }}
                >
                  <h3 className="text-2xl font-bold mb-8 text-center tracking-tight border-b pb-4"
                    style={{ 
                      color: colors.gold,
                      borderColor: `${colors.gold}33`
                    }}>
                    {section.title}
                  </h3>
                  <div className="space-y-8">
                    {section.items.map((item) => (
                      <motion.div 
                        key={item.name}
                        whileHover={{ scale: 1.02 }}
                        className="group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg group-hover:text-orange-500 transition-colors"
                            style={{ color: colors.maroon }}>
                            {item.name}
                          </h4>
                          <span className="font-medium" style={{ color: colors.orange }}>{item.price}</span>
                        </div>
                        <p className="text-sm" style={{ color: colors.darkTeal }}>{item.description}</p>
                        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Button 
              size="lg" 
              className="px-10 py-7 text-lg rounded-full shadow-lg transform hover:scale-105 transition-transform"
              style={{
                backgroundColor: colors.orange,
                color: 'white'
              }}
              onClick={() => setShowReservationForm(true)}
            >
              Réserver maintenant
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: colors.maroon }}>
              <span style={{ color: colors.gold }}>Notre</span> Galerie
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.teal }}>
             Explorez la cuisine raffinée du restaurant de l hôtel Bain Du Lac à Cotonou
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              "https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg",
              "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
              "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
              "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
              "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
              "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"
            ].map((image, index) => (
              <motion.div
                key={image}
                variants={item}
                className="relative h-80 rounded-2xl overflow-hidden group"
                whileHover={{ y: -10 }}
              >
               <Image
  src={image}
  alt={`Gallery ${index + 1}`}
  fill
  sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
  style={{
    objectFit: 'cover',
  }}
  className="transition-transform duration-500 group-hover:scale-110"
/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    background: `linear-gradient(to top, ${colors.maroon}50, transparent)`
                  }} 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ 
        background: `linear-gradient(135deg, ${colors.maroon}, ${colors.teal})`
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: colors.cream }}>
            Prêt pour une expérience culinaire exceptionnelle ?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: colors.gold }}>
            Réservez votre table dès maintenant et laissez-vous emporter par nos créations gastronomiques.
          </p>
          <Button 
            size="lg" 
            className="px-12 py-7 text-lg rounded-full shadow-xl font-semibold transform hover:scale-105 transition-transform"
            style={{
              backgroundColor: colors.orange,
              color: 'white'
            }}
            onClick={() => setShowReservationForm(true)}
          >
            Réserver une table
          </Button>
        </motion.div>
      </section>
    </div>
  );
}