"use client";

import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';

// Animation variants
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
            src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
            alt="Hôtel au Bénin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-blue-900/40" />
        </motion.div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="block text-yellow-400">Notre Histoire</span>
              <span className="text-3xl md:text-4xl font-light mt-4 block">Cotonou, Bénin</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Excellence hôtelière depuis 1985 à l'heure béninoise (GMT+1)
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideIn('left')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold mb-6 font-serif text-yellow-500">Notre Passion Africaine</h2>
              <p className="text-blue-900 mb-6 text-lg leading-relaxed">
                Depuis plus de 35 ans, <span className="font-semibold">Le Bain de Lac</span> incarne l'excellence de l'hôtellerie ouest-africaine.
                Niché au cœur de Cotonou, notre établissement combine le charme d'un patrimoine béninois
                avec le confort moderne que nos clients distingués attendent.
              </p>
              <p className="text-blue-900 mb-6 text-lg leading-relaxed">
                Chaque détail reflète notre culture, des motifs traditionnels dans notre décoration
                à notre cuisine fusion alliant saveurs locales et techniques gastronomiques.
              </p>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p className="text-yellow-800 italic">
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
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-blue-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-blue-900 mb-4">
              <span className="text-yellow-500">Nos</span> Valeurs
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
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
                icon: "⭐"
              },
              {
                title: "Authenticité",
                description: "Nous célébrons notre riche héritage culturel béninois.",
                icon: "🌍"
              },
              {
                title: "Durabilité",
                description: "Engagés dans un tourisme responsable et respectueux de notre environnement.",
                icon: "♻️"
              }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                variants={item}
                whileHover={{ y: -10 }}
              >
                <Card className="p-8 h-full bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 font-serif text-yellow-500">{value.title}</h3>
                  <p className="text-blue-800">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "35+", label: "Années d'Excellence", delay: 0 },
              { number: "50", label: "Chambres & Suites", delay: 0.2 },
              { number: "2", label: "Restaurants Étoilés", delay: 0.4 },
              { number: "1000+", label: "Clients Satisfaits", delay: 0.6 }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                transition={{ delay: stat.delay }}
                className="text-white"
              >
                <motion.div 
                  className="text-5xl font-bold mb-2 text-yellow-400"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xl">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-serif text-blue-900 mb-4">
              <span className="text-yellow-500">Nos</span> Services Exceptionnels
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
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
                image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
              },
              {
                title: "Gastronomie Étoilée",
                description: "Cuisine fusion alliant saveurs béninoises et techniques gastronomiques internationales.",
                image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
              },
              {
                title: "Spa & Bien-être",
                description: "Soins traditionnels et modernes dans un cadre apaisant inspiré de la nature béninoise.",
                image: "https://images.pexels.com/photos/3551238/pexels-photo-3551238.jpeg"
              }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                variants={item}
                className="group"
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">{service.title}</h3>
                    <p className="text-blue-800">{service.description}</p>
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