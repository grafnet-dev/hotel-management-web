"use client";

import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-sky-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Contact Bénin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/60 to-sky-800/60" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 
              className="text-4xl md:text-6xl font-bold mb-4 tracking-wide"
              style={{ fontFamily: 'Bahnschrift, sans-serif' }}
            >
              Contactez-nous
            </h1>
            <p 
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              style={{ fontFamily: 'Bahnschrift, sans-serif' }}
            >
              Nous sommes à votre disposition pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-6 md:p-8 bg-white shadow-lg border border-sky-100">
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-6 text-sky-800"
                  style={{ fontFamily: 'Bahnschrift, sans-serif' }}
                >
                  Envoyez-nous un message
                </h2>
                <form className="space-y-6">
                  <div>
                    <Label className="text-sky-700">Nom complet</Label>
                    <Input 
                      type="text" 
                      className="mt-2 border-sky-300 focus:border-sky-500 focus:ring-sky-500" 
                    />
                  </div>
                  <div>
                    <Label className="text-sky-700">Email</Label>
                    <Input 
                      type="email" 
                      className="mt-2 border-sky-300 focus:border-sky-500 focus:ring-sky-500" 
                    />
                  </div>
                  <div>
                    <Label className="text-sky-700">Téléphone</Label>
                    <Input 
                      type="tel" 
                      className="mt-2 border-sky-300 focus:border-sky-500 focus:ring-sky-500" 
                    />
                  </div>
                  <div>
                    <Label className="text-sky-700">Sujet</Label>
                    <Input 
                      type="text" 
                      className="mt-2 border-sky-300 focus:border-sky-500 focus:ring-sky-500" 
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Card className="p-6 md:p-8 bg-white shadow-lg border border-sky-100">
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-6 text-sky-800"
                  style={{ fontFamily: 'Bahnschrift, sans-serif' }}
                >
                  Nos coordonnées
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-sky-100 rounded-full">
                      <MapPin className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-sky-700">Adresse</h3>
                      <p className="text-gray-700">
                        Rue des Cocotiers, Quartier Haie Vive<br />
                        Cotonou, Bénin
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-sky-100 rounded-full">
                      <Phone className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-sky-700">Téléphone</h3>
                      <p className="text-gray-700">+229 21 30 40 50</p>
                      <p className="text-gray-700">+229 96 00 00 00 (WhatsApp)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-sky-100 rounded-full">
                      <Mail className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-sky-700">Email</h3>
                      <p className="text-gray-700">contact@hotelbenin.bj</p>
                      <p className="text-gray-700">reservation@hotelbenin.bj</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 md:p-8 bg-white shadow-lg border border-sky-100">
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-6 text-sky-800"
                  style={{ fontFamily: 'Bahnschrift, sans-serif' }}
                >
                  Horaires d'ouverture
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-sky-100">
                    <span className="text-gray-700">Lundi - Vendredi</span>
                    <span className="font-medium text-amber-600">24h/24</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-sky-100">
                    <span className="text-gray-700">Samedi</span>
                    <span className="font-medium text-amber-600">24h/24</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Dimanche</span>
                    <span className="font-medium text-amber-600">24h/24</span>
                  </div>
                </div>
              </Card>

              <div className="h-64 md:h-80 rounded-lg overflow-hidden shadow-lg border-2 border-amber-500">
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
      <section className="py-16 bg-gradient-to-b from-sky-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-sky-800"
            style={{ fontFamily: 'Bahnschrift, sans-serif' }}
          >
            Questions Fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Comment puis-je réserver une chambre ?",
                answer: "Vous pouvez réserver directement sur notre site web, par téléphone ou par email. Nous acceptons également les réservations via WhatsApp."
              },
              {
                question: "Quelles sont les heures d'arrivée et de départ ?",
                answer: "L'arrivée se fait à partir de 14h et le départ avant 12h. Un service de bagagerie est disponible si nécessaire."
              },
              {
                question: "Acceptez-vous les paiements mobiles ?",
                answer: "Oui, nous acceptons les paiements par Mobile Money (MTN, Moov) ainsi que par carte bancaire."
              },
              {
                question: "Proposez-vous des services de transport depuis l'aéroport ?",
                answer: "Oui, nous pouvons organiser votre transfert depuis l'aéroport international de Cotonou sur demande préalable."
              },
              {
                question: "Y a-t-il un restaurant sur place ?",
                answer: "Notre restaurant propose une cuisine locale et internationale ouverte tous les jours de 6h à 23h."
              },
              {
                question: "Quelles langues sont parlées à la réception ?",
                answer: "Notre personnel parle français, anglais et plusieurs langues locales comme le Fon et le Yoruba."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full bg-white hover:bg-sky-50 transition-colors border border-sky-200">
                  <h3 
                    className="text-lg font-semibold mb-2 text-sky-700 flex items-center"
                    style={{ fontFamily: 'Bahnschrift, sans-serif' }}
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-9">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}