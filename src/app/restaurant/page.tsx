"use client";

import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { useState } from 'react';

// Animation variants
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

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-blue-900/40" />
        </motion.div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="block text-yellow-400">La Table Royale</span>
              <span className="text-3xl md:text-4xl font-light mt-4 block">Cotonou</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Excellence gastronomique à l'heure béninoise
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 text-lg px-8 py-6 rounded-full shadow-lg"
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
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative"
          >
            <button 
              onClick={() => setShowReservationForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Réserver une table</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-900 mb-1">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-blue-900 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-blue-900 mb-1">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-blue-900 mb-1">Heure (GMT+1)</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-blue-900 mb-1">Nombre de personnes</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blue-900 mb-1">Demandes spéciales</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 py-3 rounded-lg font-semibold"
              >
                Confirmer la réservation
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideIn('left')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg"
                alt="Chef"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
            </motion.div>
            
            <motion.div
              variants={slideIn('right')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 font-serif text-yellow-500">Notre Chef Étoilé</h2>
              <p className="text-blue-900 mb-6 text-lg leading-relaxed">
                Le Chef Éric Dossou, formé aux meilleures écoles culinaires, vous propose une 
                fusion unique entre cuisine internationale et saveurs béninoises. 
                Ses créations vous transporteront dans un voyage gastronomique inoubliable.
              </p>
              
              <div className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-lg mb-3 text-blue-800">Horaires d'ouverture :</h3>
                <ul className="space-y-2 text-blue-900">
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
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-6 text-lg rounded-lg shadow-md transform hover:scale-105 transition-transform"
                onClick={() => setShowReservationForm(true)}
              >
                Réserver une table
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-blue-900 mb-4">
              <span className="text-yellow-500">Notre</span> Carte
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Une sélection de plats raffinés préparés avec des ingrédients locaux et d'importation
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
                className="relative"
              >
                <Card className="p-8 h-full bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold mb-8 text-center font-serif text-yellow-500 border-b border-yellow-100 pb-4">
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
                          <h4 className="font-semibold text-lg group-hover:text-yellow-500 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-yellow-600 font-medium">{item.price}</span>
                        </div>
                        <p className="text-sm text-blue-800">{item.description}</p>
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
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-7 text-lg rounded-full shadow-lg"
              onClick={() => setShowReservationForm(true)}
            >
              Réserver maintenant
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-blue-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-blue-900 mb-4">
              <span className="text-yellow-500">Notre</span> Galerie
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Découvrez l'ambiance et les créations de notre restaurant à Cotonou
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
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-700">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6">
            Prêt pour une expérience culinaire exceptionnelle ?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Réservez votre table dès maintenant et laissez-vous emporter par nos créations gastronomiques.
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-12 py-7 text-lg rounded-full shadow-xl font-semibold"
            onClick={() => setShowReservationForm(true)}
          >
            Réserver une table
          </Button>
        </motion.div>
      </section>
    </div>
  );
}