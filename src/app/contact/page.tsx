"use client";

import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Mail, Phone, MapPin,MessageCircle, Star,Clock, Users, Calendar, Shield  } from 'lucide-react';
import Image from 'next/image';

const colors = {
  darkTeal: "#1e4e5f",
  teal: "#005D7C",
  lightTeal: "#e0f2f1",
   gold: "#CE9226",
  orange: "#f4a261",
  maroon: "#e76f51",
  white: "#ffffff",
  black: "#1a1a1a",
  gray: "#f8f9fa"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};


export default function Contact() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-sky-50 to-amber-50">
      {/* Hero Section */}
     <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
      src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      alt="Contact Bénin"
      className="w-full h-full object-cover scale-105"
      layout="fill"
      objectFit="cover"
    />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.maroon}aa 0%, ${colors.teal}bb 50%, ${colors.gold}99 100%)` }} />
          </div>

        <div className="absolute top-20 left-20 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: colors.gold }}></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 rounded-full opacity-30" style={{ backgroundColor: colors.orange }}></div>
        <div className="absolute top-40 right-20 w-20 h-20 rounded-full opacity-15" style={{ backgroundColor: colors.maroon }}></div>

        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20" style={{ backgroundColor: `${colors.teal}33` }}>
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>Nous sommes là pour vous</span>
              </div>
            </motion.div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-wide leading-tight"
              style={{ fontFamily: 'Bahnschrift, sans-serif' }}
            >
              <span className="block">Contactez</span>
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Notre Équipe</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Bahnschrift, sans-serif' }}
            >
              Votre satisfaction est notre priorité. Nous sommes disponibles 24h/24 pour répondre à tous vos besoins.
            </motion.p>
          </motion.div>
        </div>
      </section>
       <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Users, value: "5000+", label: "Clients satisfaits" },
              { icon: Star, value: "4.8/5", label: "Note moyenne" },
              { icon: Calendar, value: "365j", label: "Service continu" },
              { icon: Shield, value: "100%", label: "Sécurisé" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
                      style={{ background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.lightTeal} 100%)` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" 
                       style={{ backgroundColor: colors.teal }}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: colors.teal, fontFamily: 'Bahnschrift, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: colors.darkTeal, fontFamily: 'Bahnschrift, sans-serif' }}>
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
               <Card className="p-8 md:p-12 shadow-2xl border-0 relative overflow-hidden" style={{ backgroundColor: colors.white }}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-16 translate-x-16" 
                     style={{ backgroundColor: colors.gold }}></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 translate-y-12 -translate-x-12" 
                     style={{ backgroundColor: colors.maroon }}></div>
                <div className="relative">
                  <div className="mb-8">
                    <h2 
                      className="text-3xl md:text-4xl font-bold mb-4"
                      style={{ color: colors.teal, fontFamily: 'Bahnschrift, sans-serif' }}
                    >
                      Envoyez-nous un message
                    </h2>
                    <p className="text-lg" style={{ color: colors.darkTeal, fontFamily: 'Bahnschrift, sans-serif' }}>
                      Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                  </div>
                  
                <form className="space-y-6">
                  <div>
                    <Label className="text-sky-700">Nom complet</Label>
                   <Input 
  type="text" 
  className="mt-2 border-sky-300 focus:border-sky-500 focus:ring-sky-500" 
  customProperty="some value"
/>
                  </div>
                  <div>
                    <Label className="text-sky-700">Email</Label>
                    <Input 
  type="email" 
  className="mt-2 border-sky-300 focus:border-sky-500 focus:ring-sky-500" 
  customProperty="some value"
/>
                  </div>
                  <div>
                    <Label className="text-sky-700">Téléphone</Label>
                   <Input 
  type="tel" 
  className="mt-2 border-sky-300 focus:border-sky-500 focus:ring-sky-500" 
  customProperty="some value"
/>
                  </div>
                  <div>
                    <Label className="text-sky-700">Sujet</Label>
                    <Input 
                      type="text" 
                      className="mt-2 border-sky-300 focus:border-sky-500 focus:ring-sky-500" 
                      customProperty="some value"
                    />
                  </div>
                  <div>
                    <Label className="text-sky-700">Message</Label>
                    <textarea
                      className="mt-2 w-full rounded-md border border-sky-300 bg-white px-3 py-2 min-h-[150px] focus:border-sky-500 focus:ring-sky-500"
                    />
                  </div>
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg"
                    style={{ fontFamily: 'Bahnschrift, sans-serif' }}
                  >
                    Envoyer le message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <Card className="p-8 shadow-xl border-0 relative overflow-hidden" style={{ backgroundColor: colors.white }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-10 translate-x-10" 
                     style={{ backgroundColor: colors.maroon }}></div>
                
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-8"
                  style={{ color: colors.teal, fontFamily: 'Bahnschrift, sans-serif' }}
                >
                  Nos coordonnées
                </h2>
                
                <div className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      title: "Adresse",
                      content: ["Rue des Cocotiers, Quartier Haie Vive", "Cotonou, Bénin"],
                      color: colors.maroon
                    },
                    {
                      icon: Phone,
                      title: "Téléphone",
                      content: ["+229 21 30 40 50", "+229 96 00 00 00 (WhatsApp)"],
                      color: colors.gold
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      content: ["contact@hotelbenin.bj", "reservation@hotelbenin.bj"],
                      color: colors.teal
                    }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110" 
                           style={{ backgroundColor: `${contact.color}22` }}>
                        <contact.icon className="h-6 w-6" style={{ color: contact.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2" style={{ color: colors.darkTeal, fontFamily: 'Bahnschrift, sans-serif' }}>
                          {contact.title}
                        </h3>
                        {contact.content.map((line, i) => (
                          <p key={i} className="text-gray-700 font-medium" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
               <Card className="p-8 shadow-xl border-0" style={{ backgroundColor: colors.white }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.gold}22` }}>
                    <Clock className="h-6 w-6" style={{ color: colors.gold }} />
                  </div>
                  <h2 
                    className="text-2xl font-bold"
                    style={{ color: colors.teal, fontFamily: 'Bahnschrift, sans-serif' }}
                  >
                    Horaires
                  </h2>
                </div>
                
                <div className="text-center p-6 rounded-xl" style={{ backgroundColor: `${colors.lightTeal}44` }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: colors.teal, fontFamily: 'Bahnschrift, sans-serif' }}>
                    24h/24
                  </div>
                  <div className="text-lg font-medium" style={{ color: colors.darkTeal, fontFamily: 'Bahnschrift, sans-serif' }}>
                    7 jours sur 7
                  </div>
                  <div className="text-sm mt-2 opacity-80" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
                    Service client disponible en permanence
                  </div>
                </div>
              </Card>

              {/* Map */}
              <div className="h-80 rounded-2xl overflow-hidden shadow-xl border-4 hover:shadow-2xl transition-shadow duration-300" 
                   style={{ borderColor: colors.gold }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.317239381592!2d2.420414314768961!3d6.365609295393697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023556f6a9a7a3b%3A0x4c0b8d9b9a3a3a3a!2sCotonou%2C%20Benin!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
       <section className="py-20" style={{ background: `linear-gradient(135deg, ${colors.lightTeal}33 0%, ${colors.white} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: colors.teal, fontFamily: 'Bahnschrift, sans-serif' }}
            >
              Questions Fréquentes
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.darkTeal, fontFamily: 'Bahnschrift, sans-serif' }}>
              Trouvez rapidement les réponses aux questions les plus courantes de nos clients
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                question: "Comment puis-je réserver une chambre ?",
                answer: "Vous pouvez réserver directement sur notre site web, par téléphone ou par email. Nous acceptons également les réservations via WhatsApp pour votre commodité."
              },
              {
                question: "Quelles sont les heures d'arrivée et de départ ?",
                answer: "L'arrivée se fait à partir de 14h et le départ avant 12h. Un service de bagagerie gratuit est disponible si vous arrivez plus tôt ou partez plus tard."
              },
              {
                question: "Acceptez-vous les paiements mobiles ?",
                answer: "Oui, nous acceptons tous les modes de paiement : Mobile Money (MTN, Moov), cartes bancaires, espèces et virements bancaires."
              },
              {
                question: "Proposez-vous des services de transport ?",
                answer: "Nous organisons des transferts depuis l'aéroport international de Cotonou et proposons un service de navette pour vos déplacements en ville."
              },
              {
                question: "Y a-t-il un restaurant sur place ?",
                answer: "Notre restaurant gastronomique propose une cuisine locale et internationale authentique, ouvert tous les jours de 6h à 23h avec service en chambre disponible."
              },
              {
                question: "Quelles langues sont parlées ?",
                answer: "Notre équipe multilingue parle couramment français, anglais, ainsi que les langues locales comme le Fon, le Yoruba et l'Ewe."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden group" 
                      style={{ backgroundColor: colors.white }}>
                  {/* Decorative number */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform duration-300"
                       style={{ backgroundColor: colors.gold }}>
                    {index + 1}
                  </div>
                  
                  <div className="pr-16">
                    <h3 
                      className="text-xl font-bold mb-4 leading-tight"
                      style={{ color: colors.teal, fontFamily: 'Bahnschrift, sans-serif' }}
                    >
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
                      {faq.answer}
                    </p>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2"
                       style={{ backgroundColor: colors.maroon }}></div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
       <section className="py-16" style={{ background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.darkTeal} 100%)` }}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
              Prêt à nous contacter ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
              Notre équipe est là pour vous accompagner et répondre à toutes vos questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="h-14 px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: colors.gold,
                  fontFamily: 'Bahnschrift, sans-serif'
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Appelez-nous maintenant
              </Button>
              <Button 
                variant="outline"
                className="h-14 px-8 text-lg font-bold border-2 border-white text-white hover:bg-white transition-all duration-300 transform hover:scale-105"
                style={{ 
                  fontFamily: 'Bahnschrift, sans-serif'
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}