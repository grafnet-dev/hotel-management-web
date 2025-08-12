"use client";

import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import Image from 'next/image';

// Définition des couleurs exactes
const colors = {
  teal: '#008080',       // Bleu sarcelle
  gold: '#D4AF37',       // Or
  orange: '#FF8C42',     // Orange
  maroon: '#800020',     // Marron
  lightTeal: '#E6F2F2',  // Sarcelle clair
  darkTeal: '#006666',   // Sarcelle foncé
  cream: '#F5F5DC',      // Crème
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    } 
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1]
    } 
  }
};

const slideIn = (direction = 'left') => ({
  hidden: { 
    opacity: 0, 
    x: direction === 'left' ? -80 : 80,
    scale: 0.95
  },
  show: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 1.2, 
      ease: [0.25, 0.1, 0.25, 1]
    } 
  }
});

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export default function About() {
  return (
    <div className="min-h-screen pt-16" style={{ 
      fontFamily: 'Bahnschrift, -apple-system, BlinkMacSystemFont, sans-serif', 
      backgroundColor: colors.lightTeal 
    }}>
      {/* Hero Section Modernisé */}
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          variants={scaleIn}
        >
           <Image
    src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
    alt="Hôtel premium au Bénin"
    layout="fill"
    objectFit="cover"
  />
          <div className="absolute inset-0" style={{ 
            background: `linear-gradient(135deg, ${colors.maroon}80, ${colors.teal}60, ${colors.darkTeal}70)` 
          }} />
        </motion.div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            className="max-w-5xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mb-8"

            >
              <div className="inline-block px-8 py-3 rounded-full border-2 mb-6" 
                   style={{ 
                     borderColor: colors.gold,
                     backgroundColor: `${colors.gold}20`
                   }}>
                <span className="text-sm font-semibold tracking-wider uppercase" 
                      style={{ color: colors.gold }}>
                  Excellence Hôtelière Béninoise
                </span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{ color: colors.cream }}
            >
              <span className="block" style={{ color: colors.gold }}>Notre</span>
              <span className="block" style={{ color: colors.cream }}>Histoire</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="space-y-4"
            >
              <p className="text-2xl md:text-3xl font-light" style={{ color: colors.cream }}>
                Cotonou, République du Bénin
              </p>
              <div className="flex items-center justify-center space-x-8 text-lg">
                <span style={{ color: colors.gold }}>Depuis 1985</span>
                <span style={{ color: colors.cream }}>•</span>
                <span style={{ color: colors.gold }}>GMT+1</span>
                <span style={{ color: colors.cream }}>•</span>
                <span style={{ color: colors.gold }}>Excellence Africaine</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicateur de scroll */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" 
               style={{ borderColor: colors.gold }}>
            <div className="w-1 h-3 bg-current rounded-full mt-2" 
                 style={{ backgroundColor: colors.gold }} />
          </div>
        </motion.div>
      </section>

      {/* Section Histoire Redesignée */}
      <section className="py-32" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              variants={slideIn('left')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-150px" }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '4rem' }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1 mb-8"
                  style={{ backgroundColor: colors.gold }}
                />
                <h2 className="text-5xl font-bold mb-8 leading-tight" style={{ color: colors.teal }}>
                  Notre Passion
                  <span className="block" style={{ color: colors.maroon }}>Africaine</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <p style={{ color: colors.darkTeal }}>
                  Depuis plus de 35 ans, <strong style={{ color: colors.maroon }}> Relacs Zone</strong> représente 
                  le summum de la qualité hôtelière en Afrique de la Ouest. Notre établissement 
                  situé au cœur de Cotonou combine harmonieusement le patrimoine béninois 
                  avec les standards internationaux de luxe.
                </p>
                <p style={{ color: colors.darkTeal }}>
                  Chaque espace reflète notre identité culturelle unique, des motifs traditionnels 
                  soigneusement intégrés dans notre architecture aux saveurs authentiques 
                  de notre cuisine gastronomique fusion.
                </p>
                <p style={{ color: colors.darkTeal }}>
                  Notre engagement envers la communauté béninoise et notre environnement 
                  guide chacune de nos décisions, créant une expérience véritablement 
                  durable et mémorable.
                </p>
              </div>
              
              <motion.div 
                className="relative p-8 rounded-xl"
                style={{ 
                  backgroundColor: `${colors.gold}15`,
                  borderLeft: `6px solid ${colors.gold}`
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl" style={{ color: colors.gold }}>❝</div>
                  <div>
                    <p className="text-xl font-medium italic mb-2" style={{ color: colors.maroon }}>
                      Nous créons bien plus que des séjours. Nous offrons 
                      des expériences authentiquement béninoises.
                    </p>
                    <p className="text-sm font-semibold" style={{ color: colors.darkTeal }}>
                      — Direction Générale, Le Bain de Lac
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={slideIn('right')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-150px" }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-6"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <motion.div variants={item} className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                   <Image
    src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg"
    alt="Architecture intérieure"
    className="w-full h-full object-cover"
    width={400} // Specify the width of the image
    height={400} // Specify the height of the image
  />
                    <div className="absolute inset-0" style={{ 
                      background: `linear-gradient(to top, ${colors.maroon}40, transparent)` 
                    }} />
                  </motion.div>
                  <motion.div variants={item} className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                    <Image
  src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
  alt="Chambre premium"
  className="w-full h-full object-cover"
  width={400} // Specify the width of the image
  height={400} // Specify the height of the image
/>
                    <div className="absolute inset-0" style={{ 
                      background: `linear-gradient(to top, ${colors.teal}40, transparent)` 
                    }} />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="space-y-6 pt-12"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <motion.div variants={item} className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
               <Image
  src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
  alt="Gastronomie"
  layout="fill"
  objectFit="cover"
/>
                    <div className="absolute inset-0" style={{ 
                      background: `linear-gradient(to top, ${colors.orange}40, transparent)` 
                    }} />
                  </motion.div>
                  <motion.div variants={item} className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                   <Image
  src="https://images.pexels.com/photos/3551238/pexels-photo-3551238.jpeg"
  alt="Hôtel premium au Bénin"
  width={1920} // Spécifiez la largeur de l'image
  height={1080} // Spécifiez la hauteur de l'image si nécessaire
  objectFit="cover"
/>
                    <div className="absolute inset-0" style={{ 
                      background: `linear-gradient(to top, ${colors.gold}40, transparent)` 
                    }} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Valeurs Modernisée */}
      <section className="py-32" style={{ backgroundColor: colors.lightTeal }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '6rem' }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-1 mx-auto mb-8"
              style={{ backgroundColor: colors.gold }}
            />
            <h2 className="text-5xl font-bold mb-6" style={{ color: colors.maroon }}>
              Nos <span style={{ color: colors.gold }}>Valeurs</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.darkTeal }}>
              Les principes fondamentaux qui guident notre excellence quotidienne 
              et notre engagement envers nos clients
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              {
                title: "Excellence",
                description: "Nous recherchons la perfection dans chaque détail de nos services, dépassant constamment les attentes de notre clientèle distinguée.",
                icon: "⭐",
                color: colors.gold,
                gradient: `linear-gradient(135deg, ${colors.gold}20, ${colors.gold}05)`
              },
              {
                title: "Authenticité",
                description: "Nous célébrons et préservons notre riche patrimoine culturel béninois, offrant une expérience véritablement africaine.",
                icon: "🌍",
                color: colors.orange,
                gradient: `linear-gradient(135deg, ${colors.orange}20, ${colors.orange}05)`
              },
              {
                title: "Durabilité",
                description: "Nous nous engageons dans un tourisme responsable, respectueux de notre environnement et bénéfique pour notre communauté.",
                icon: "♻️",
                color: colors.teal,
                gradient: `linear-gradient(135deg, ${colors.teal}20, ${colors.teal}05)`
              }
          ].map((value, index) => (
  <motion.div 
    key={`${value.title}-${index}`}
    variants={item}
    whileHover={{ y: -15, scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="group"
  >
                <Card className="p-10 h-full rounded-3xl border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, white, ${value.gradient})`,
                    borderTop: `4px solid ${value.color}`
                  }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-6xl mb-6 inline-block"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-6" style={{ color: value.color }}>
                      {value.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: colors.darkTeal }}>
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Statistiques Redesignée */}
      <section className="py-32" style={{ 
        background: `linear-gradient(135deg, ${colors.maroon}, ${colors.darkTeal}, ${colors.teal})`
      }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.cream }}>
              Notre Impact en <span style={{ color: colors.gold }}>Chiffres</span>
            </h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: colors.gold }} />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {[
              { number: "35+", label: "Années d'Excellence", color: colors.gold, suffix: "" },
              { number: "50", label: "Chambres & Suites", color: colors.orange, suffix: "" },
              { number: "2", label: "Restaurants Étoilés", color: colors.cream, suffix: "" },
              { number: "1000", label: "Clients Satisfaits", color: colors.gold, suffix: "+" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-6xl md:text-7xl font-bold mb-4"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100,
                    delay: index * 0.1 
                  }}
                  style={{ color: stat.color }}
                >
                  {stat.number}{stat.suffix}
                </motion.div>
                <div className="text-xl font-medium" style={{ color: colors.cream }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Services Premium */}
      <section className="py-32" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '6rem' }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-1 mx-auto mb-8"
              style={{ backgroundColor: colors.gold }}
            />
            <h2 className="text-5xl font-bold mb-6" style={{ color: colors.maroon }}>
              Services <span style={{ color: colors.gold }}>Exceptionnels</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.darkTeal }}>
              Découvrez les services premium qui font de votre séjour 
              une expérience inoubliable au cœur du Bénin
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {[
              {
                title: "Hébergement Premium",
                description: "Chambres et suites spacieuses avec vues panoramiques, décorées avec des éléments artisanaux locaux et équipées des dernières technologies.",
                image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
                color: colors.teal,
                gradient: `linear-gradient(45deg, ${colors.teal}80, ${colors.darkTeal}60)`
              },
              {
                title: "Gastronomie Étoilée",
                description: "Deux restaurants étoilés proposant une cuisine fusion innovante alliant saveurs béninoises traditionnelles et techniques culinaires internationales.",
                image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
                color: colors.maroon,
                gradient: `linear-gradient(45deg, ${colors.maroon}80, ${colors.maroon}60)`
              },
              {
                title: "Spa & Bien-être",
                description: "Centre de bien-être complet offrant soins traditionnels africains et thérapies modernes dans un environnement inspiré de la nature béninoise.",
                image: "https://images.pexels.com/photos/3551238/pexels-photo-3551238.jpeg",
                color: colors.orange,
                gradient: `linear-gradient(45deg, ${colors.orange}80, ${colors.gold}60)`
              }
            ].map((service) => (
              <motion.div 
                key={service.title}
                variants={item}
                className="group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="overflow-hidden h-full border-0 shadow-xl group-hover:shadow-2xl transition-all duration-500 rounded-3xl"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0" style={{ 
                      background: service.gradient
                    }} />
                    <div className="absolute top-6 left-6">
                      <div className="px-4 py-2 rounded-full" style={{ 
                        backgroundColor: `${colors.cream}90`
                      }}>
                        <span className="text-sm font-bold" style={{ color: service.color }}>
                          Premium
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4" style={{ color: service.color }}>
                      {service.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: colors.darkTeal }}>
                      {service.description}
                    </p>
                    <motion.div 
                      className="mt-6 flex items-center text-sm font-semibold"
                      style={{ color: service.color }}
                      whileHover={{ x: 5 }}
                    >
                      Découvrir
                      <span className="ml-2">→</span>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}