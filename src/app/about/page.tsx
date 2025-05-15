"use client";

import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';

// Définition des couleurs
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
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

const slideIn = (direction = 'left') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
});

export default function About() {
  return (
    <div className="min-h-screen pt-16" style={{ fontFamily: 'Bahnschrift, sans-serif', backgroundColor: colors.lightTeal }}>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
            alt="Hôtel au Bénin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${colors.maroon}70, ${colors.teal}40)` }} />
        </motion.div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ color: colors.cream }}
            >
              <span className="block" style={{ color: colors.gold }}>Notre Histoire</span>
              <span className="text-3xl md:text-4xl font-light mt-4 block">Cotonou, Bénin</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ color: colors.cream }}
            >
              Excellence hôtelière depuis 1985 à l'heure béninoise (GMT+1)
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideIn('left')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold mb-6 tracking-tight" style={{ color: colors.teal }}>Notre Passion Africaine</h2>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: colors.darkTeal }}>
                Depuis plus de 35 ans, <span style={{ color: colors.maroon, fontWeight: '600' }}>Le Bain de Lac</span> incarne l'excellence de l'hôtellerie ouest-africaine.
                Niché au cœur de Cotonou, notre établissement combine le charme d'un patrimoine béninois
                avec le confort moderne que nos clients distingués attendent.
              </p>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: colors.darkTeal }}>
                Chaque détail reflète notre culture, des motifs traditionnels dans notre décoration
                à notre cuisine fusion alliant saveurs locales et techniques gastronomiques.
              </p>
              <div style={{ 
                backgroundColor: `${colors.gold}20`,
                borderLeft: `4px solid ${colors.gold}`,
                padding: '1rem',
                borderRadius: '0 0.5rem 0.5rem 0'
              }}>
                <p style={{ 
                  color: colors.maroon,
                  fontStyle: 'italic'
                }}>
                  "Nous ne construisons pas simplement un hôtel, nous créons une expérience authentiquement béninoise."
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={slideIn('right')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg"
                alt="Intérieur de l'hôtel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${colors.maroon}30, transparent)` }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24" style={{ backgroundColor: `${colors.teal}10` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: colors.maroon }}>
              <span style={{ color: colors.gold }}>Nos</span> Valeurs
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.teal }}>
              Les principes qui guident notre engagement quotidien
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Excellence",
                description: "Nous visons la perfection dans chaque service rendu à nos clients.",
                icon: "⭐",
                color: colors.gold
              },
              {
                title: "Authenticité",
                description: "Nous célébrons notre riche héritage culturel béninois.",
                icon: "🌍",
                color: colors.orange
              },
              {
                title: "Durabilité",
                description: "Engagés dans un tourisme responsable et respectueux de notre environnement.",
                icon: "♻️",
                color: colors.teal
              }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                variants={item}
                whileHover={{ y: -10 }}
              >
                <Card className="p-8 h-full rounded-xl transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    backgroundColor: 'white',
                    border: `1px solid ${value.color}33`
                  }}
                >
                  <div className="text-4xl mb-4" style={{ color: value.color }}>{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ color: value.color }}>{value.title}</h3>
                  <p style={{ color: colors.darkTeal }}>{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24" style={{ 
        background: `linear-gradient(135deg, ${colors.maroon}, ${colors.teal})`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "35+", label: "Années d'Excellence", delay: 0, color: colors.gold },
              { number: "50", label: "Chambres & Suites", delay: 0.2, color: colors.orange },
              { number: "2", label: "Restaurants Étoilés", delay: 0.4, color: colors.cream },
              { number: "1000+", label: "Clients Satisfaits", delay: 0.6, color: colors.gold }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                transition={{ delay: stat.delay }}
                className="text-white"
              >
                <motion.div 
                  className="text-5xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  style={{ color: stat.color }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xl" style={{ color: colors.cream }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24" style={{ backgroundColor: colors.lightTeal }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: colors.maroon }}>
              <span style={{ color: colors.gold }}>Nos</span> Services Exceptionnels
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.teal }}>
              Découvrez ce qui rend votre séjour inoubliable
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Hébergement Premium",
                description: "Chambres spacieuses avec vue imprenable, décorées avec des éléments artisanaux locaux.",
                image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
                color: colors.teal
              },
              {
                title: "Gastronomie Étoilée",
                description: "Cuisine fusion alliant saveurs béninoises et techniques gastronomiques internationales.",
                image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
                color: colors.maroon
              },
              {
                title: "Spa & Bien-être",
                description: "Soins traditionnels et modernes dans un cadre apaisant inspiré de la nature béninoise.",
                image: "https://images.pexels.com/photos/3551238/pexels-photo-3551238.jpeg",
                color: colors.orange
              }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                variants={item}
                className="group"
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ 
                      background: `linear-gradient(to top, ${service.color}60, transparent)`
                    }} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 tracking-tight" style={{ color: service.color }}>{service.title}</h3>
                    <p style={{ color: colors.darkTeal }}>{service.description}</p>
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