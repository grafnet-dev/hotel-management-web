"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '../../../components/ui/calendar';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';

export default function Booking() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('standard');

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg"
            alt="Booking"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Réservation</h1>
            <p className="text-xl md:text-2xl">Planifiez votre séjour de rêve</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 md:p-8">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label>Date d'arrivée</Label>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label>Date de départ</Label>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    className="rounded-md border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Nombre de personnes</Label>
                  <Input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    min={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Type de chambre</Label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="standard">Chambre Vue Lac</option>
                    <option value="deluxe">Suite Deluxe</option>
                    <option value="suite">Suite Présidentielle</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
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
                  <Label>Demandes spéciales</Label>
                  <textarea
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                    placeholder="Allergies, préférences..."
                  />
                </div>
              </div>

              <Button className="w-full bg-sky-500 hover:bg-sky-600">
                Confirmer la réservation
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Politique d'annulation",
                description: "Annulation gratuite jusqu'à 48h avant l'arrivée"
              },
              {
                title: "Check-in / Check-out",
                description: "Check-in: 15h00 / Check-out: 11h00"
              },
              {
                title: "Paiement",
                description: "Carte bancaire requise pour la réservation"
              }
            ].map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                  <p className="text-gray-600">{info.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}