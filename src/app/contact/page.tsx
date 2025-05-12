"use client";

import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact</h1>
            <p className="text-xl md:text-2xl">Nous sommes à votre écoute</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <form className="space-y-6">
                  <div>
                    <Label>Nom complet</Label>
                    <Input type="text" className="mt-2" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" className="mt-2" />
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <Input type="tel" className="mt-2" />
                  </div>
                  <div>
                    <Label>Sujet</Label>
                    <Input type="text" className="mt-2" />
                  </div>
                  <div>
                    <Label>Message</Label>
                    <textarea
                      className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 min-h-[150px]"
                    />
                  </div>
                  <Button className="w-full">Envoyer</Button>
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
              <div>
                <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-sky-600" />
                    <div>
                      <h3 className="font-semibold">Adresse</h3>
                      <p className="text-gray-600">123 Route du Lac, 74000 Annecy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-sky-600" />
                    <div>
                      <h3 className="font-semibold">Téléphone</h3>
                      <p className="text-gray-600">+33 4 50 00 00 00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-sky-600" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">contact@baindelac.fr</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Horaires d'ouverture</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span>24h/24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi - Dimanche</span>
                    <span>24h/24</span>
                  </div>
                </div>
              </div>

              <div className="h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776.7507714725837!2d6.1289!3d45.8992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDUzJzU3LjEiTiA2wrAwNyc0NC4wIkU!5e0!3m2!1sfr!2sfr!4v1635789012345!5m2!1sfr!2sfr"
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Comment puis-je réserver une chambre ?",
                answer: "Vous pouvez réserver directement sur notre site web, par téléphone ou par email."
              },
              {
                question: "Quelles sont les heures d'arrivée et de départ ?",
                answer: "L'arrivée se fait à partir de 15h et le départ avant 11h."
              },
              {
                question: "Acceptez-vous les animaux de compagnie ?",
                answer: "Oui, nous acceptons les petits animaux de compagnie avec un supplément."
              },
              {
                question: "Y a-t-il un parking sur place ?",
                answer: "Oui, nous disposons d'un parking privé gratuit pour nos clients."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}