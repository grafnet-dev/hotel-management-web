"use client";
import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Wifi, 
  Receipt, 
  Phone, 
  MessageCircle, 
  Coffee,
  Car,
  Utensils,
  Waves,
  Bell,
  Star,
  CreditCard,
  Clock,
  Bed,
  Eye,
  Users
} from 'lucide-react';

const ClientMiniSite = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newServiceRequest, setNewServiceRequest] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  // Données client simulées
  const clientData = {
    id: 'ab1234x',
    name: 'Sedjro',
    email: 'sedjro@email.com',
    phone: '+229 0157345678',
    avatar: 'https://i.pravatar.cc/300?img=2',
    checkinDate: '2025-07-29',
    checkoutDate: '2025-08-02',
    room: {
      id: 1,
      name: "Chambre Deluxe Vue Mer",
      number: '205',
      floor: '2',
      type: 'double',
      bed: 'king size',
      surface: 35,
      view: 'mer',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600',
      wifiCode: 'HOTELLAC2025',
      amenities: ['WiFi', 'Climatisation', 'Mini-bar', 'Service chambre']
    },
    totalNights: 4
  };

  // Historique et facture
  const [bill, setBill] = useState([
    {
      id: 1,
      date: '2025-07-29',
      time: '14:00',
      item: 'Chambre Deluxe Vue Mer',
      category: 'Hébergement',
      quantity: 4,
      unit: 'nuits',
      unitPrice: 35000,
      total: 140000,
      status: 'confirmé'
    },
    {
      id: 2,
      date: '2025-07-29',
      time: '16:30',
      item: 'Coca Cola (Mini-bar)',
      category: 'Minibar',
      quantity: 2,
      unit: 'unités',
      unitPrice: 1500,
      total: 3000,
      status: 'consommé'
    },
    {
      id: 3,
      date: '2025-07-29',
      time: '19:45',
      item: 'Dîner Restaurant',
      category: 'Restaurant',
      quantity: 2,
      unit: 'personnes',
      unitPrice: 8500,
      total: 17000,
      status: 'consommé'
    },
    {
      id: 4,
      date: '2025-07-30',
      time: '08:30',
      item: 'Petit-déjeuner',
      category: 'Restaurant',
      quantity: 2,
      unit: 'personnes',
      unitPrice: 3500,
      total: 7000,
      status: 'consommé'
    }
  ]);

  const totalBill = bill.reduce((sum, item) => sum + item.total, 0);

  // Services disponibles
  const availableServices = [
    { id: 1, name: 'Massage Spa', price: 25000, icon: <Waves className="w-5 h-5" />, category: 'Spa' },
    { id: 2, name: 'Room Service', price: 5000, icon: <Bell className="w-5 h-5" />, category: 'Service' },
    { id: 3, name: 'Navette Aéroport', price: 15000, icon: <Car className="w-5 h-5" />, category: 'Transport' },
    { id: 4, name: 'Dîner Romantique', price: 18000, icon: <Utensils className="w-5 h-5" />, category: 'Restaurant' },
    { id: 5, name: 'Petit-déjeuner au lit', price: 4500, icon: <Coffee className="w-5 h-5" />, category: 'Service' },
    { id: 6, name: 'Nettoyage Extra', price: 8000, icon: <Bell className="w-5 h-5" />, category: 'Service' }
  ];

  const addService = (service) => {
    const newItem = {
      id: bill.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      item: service.name,
      category: service.category,
      quantity: 1,
      unit: 'service',
      unitPrice: service.price,
      total: service.price,
      status: 'commandé'
    };
    setBill([...bill, newItem]);
  };

  const TabButton = ({ id, label, icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-teal-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-600'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 pt-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Hôtel du Lac</h1>
              <p className="text-teal-200">Votre espace personnel</p>
            </div>
            <div className="text-right flex items-center gap-4">
              <img 
                src={clientData.avatar} 
                alt="Photo de profil" 
                className="w-12 h-12 rounded-full border-2 border-white/50"
              />
              <div>
                <p className="text-lg font-semibold">Bonjour, {clientData.name}</p>
                <p className="text-teal-200">Chambre {clientData.room.number} • {clientData.room.floor}ème étage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 bg-gray-100 p-2 rounded-xl">
          <TabButton 
            id="dashboard" 
            label="Mon Séjour" 
            icon={<User className="w-5 h-5" />}
            active={activeTab === 'dashboard'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="bill" 
            label="Facture & Historique" 
            icon={<Receipt className="w-5 h-5" />}
            active={activeTab === 'bill'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="services" 
            label="Services" 
            icon={<Bell className="w-5 h-5" />}
            active={activeTab === 'services'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="contact" 
            label="Contact" 
            icon={<Phone className="w-5 h-5" />}
            active={activeTab === 'contact'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="review" 
            label="Avis" 
            icon={<Star className="w-5 h-5" />}
            active={activeTab === 'review'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Mon Séjour Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profil Client */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                Mon Profil
              </h2>
              
              <div className="text-center mb-4">
                <img 
                  src={clientData.avatar} 
                  alt="Photo de profil" 
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-teal-100"
                />
                <h3 className="font-bold text-lg text-gray-800">{clientData.name}</h3>
                <p className="text-gray-600 text-sm">ID: {clientData.id}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">📧</span>
                  <span className="text-gray-700">{clientData.email}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">📱</span>
                  <span className="text-gray-700">{clientData.phone}</span>
                </div>
              </div>
            </div>

            {/* Infos Chambre avec image */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Bed className="w-5 h-5 text-teal-600" />
                Ma Chambre
              </h2>
              
              <div className="mb-4">
                <img 
                  src={clientData.room.image} 
                  alt={clientData.room.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <h3 className="font-bold text-lg mb-2">{clientData.room.name}</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>N° {clientData.room.number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-600">🏢</span>
                  <span>{clientData.room.floor}ème étage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-teal-600" />
                  <span>Vue {clientData.room.view}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-600">📐</span>
                  <span>{clientData.room.surface}m²</span>
                </div>
              </div>

              {/* Code WiFi mis en évidence */}
              <div className="p-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Wifi className="w-4 h-4" />
                  <span className="font-semibold text-sm">Code WiFi</span>
                </div>
                <p className="font-mono text-lg bg-white/20 px-2 py-1 rounded inline-block">
                  {clientData.room.wifiCode}
                </p>
              </div>
            </div>

            {/* Infos Séjour */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                Mon Séjour
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-teal-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Arrivée</p>
                    <p className="text-xs text-gray-600">29 Juillet 2025 - 14h00</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Départ</p>
                    <p className="text-xs text-gray-600">2 Août 2025 - 11h00</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Durée</p>
                    <p className="text-xs text-gray-600">{clientData.totalNights} nuits</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                  <Bed className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Lit</p>
                    <p className="text-xs text-gray-600">{clientData.room.bed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé Facture */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-600" />
                Facture actuelle
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Hébergement</span>
                  <span className="font-semibold">140,000 FCFA</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Services extras</span>
                  <span className="font-semibold">{(totalBill - 140000).toLocaleString()} FCFA</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-teal-600">{totalBill.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('bill')}
                className="w-full mt-4 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Voir le détail complet
              </button>
            </div>

            {/* Services inclus + Services rapides */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Services inclus dans votre chambre</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {clientData.room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-teal-50 rounded-lg">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{amenity}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-gray-800 mb-3">Services rapides</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button 
                  onClick={() => {
                    alert('Demande de serviettes envoyée !');
                    const newItem = {
                      id: bill.length + 1,
                      date: new Date().toISOString().split('T')[0],
                      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                      item: 'Serviettes supplémentaires',
                      category: 'Service',
                      quantity: 1,
                      unit: 'demande',
                      unitPrice: 0,
                      total: 0,
                      status: 'demandé'
                    };
                    setBill([...bill, newItem]);
                  }}
                  className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  🧻 Serviettes
                </button>
                <button 
                  onClick={() => {
                    alert('Demande de nettoyage envoyée !');
                    const newItem = {
                      id: bill.length + 1,
                      date: new Date().toISOString().split('T')[0],
                      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                      item: 'Nettoyage chambre',
                      category: 'Service',
                      quantity: 1,
                      unit: 'service',
                      unitPrice: 0,
                      total: 0,
                      status: 'demandé'
                    };
                    setBill([...bill, newItem]);
                  }}
                  className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-sm"
                >
                  🧽 Nettoyage
                </button>
                <button 
                  onClick={() => {
                    alert('Assistance technique contactée !');
                  }}
                  className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
                >
                  🔧 Assistance
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bill & History Tab */}
        {activeTab === 'bill' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Receipt className="w-6 h-6 text-teal-600" />
              Facture détaillée & Historique
            </h2>

            <div className="mb-6 p-4 bg-teal-50 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Total facture</h3>
                  <p className="text-gray-600">Mis à jour en temps réel</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-teal-600">{totalBill.toLocaleString()} FCFA</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-3 font-semibold">Date/Heure</th>
                    <th className="text-left p-3 font-semibold">Article</th>
                    <th className="text-left p-3 font-semibold">Catégorie</th>
                    <th className="text-center p-3 font-semibold">Qté</th>
                    <th className="text-right p-3 font-semibold">Prix unitaire</th>
                    <th className="text-right p-3 font-semibold">Total</th>
                    <th className="text-center p-3 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <div className="text-sm">
                          <div className="font-medium">{item.date}</div>
                          <div className="text-gray-500">{item.time}</div>
                        </div>
                      </td>
                      <td className="p-3 font-medium">{item.item}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3 text-center">{item.quantity} {item.unit}</td>
                      <td className="p-3 text-right">{item.unitPrice.toLocaleString()} FCFA</td>
                      <td className="p-3 text-right font-semibold">{item.total.toLocaleString()} FCFA</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'confirmé' ? 'bg-blue-100 text-blue-700' :
                          item.status === 'consommé' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-teal-600" />
                Services disponibles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableServices.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-teal-600">
                        {service.price.toLocaleString()} FCFA
                      </span>
                      <button 
                        onClick={() => addService(service)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Request */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Demande de service personnalisée</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newServiceRequest}
                  onChange={(e) => setNewServiceRequest(e.target.value)}
                  placeholder="Décrivez votre demande..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button 
                  onClick={() => {
                    if (newServiceRequest.trim()) {
                      alert(`Demande envoyée: ${newServiceRequest}`);
                      setNewServiceRequest('');
                    }
                  }}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Phone className="w-6 h-6 text-teal-600" />
                Contacter la réception
              </h2>

              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors">
                  <Phone className="w-6 h-6 text-teal-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Appeler directement</p>
                    <p className="text-gray-600">Extension 0 depuis votre chambre</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <p className="text-gray-600">+229 XX XX XX XX</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Chat en ligne</p>
                    <p className="text-gray-600">Réponse immédiate</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Informations utiles</h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Horaires réception</p>
                  <p className="text-gray-600">24h/24 - 7j/7</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Room Service</p>
                  <p className="text-gray-600">6h00 - 23h00</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Restaurant</p>
                  <p className="text-gray-600">7h00 - 22h00</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">Spa</p>
                  <p className="text-gray-600">9h00 - 20h00</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Tab */}
        {activeTab === 'review' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-teal-600" />
              Évaluez votre séjour
            </h2>

            <div className="space-y-6">
              <div>
                <p className="font-semibold text-gray-800 mb-3">Note globale</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-colors ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-800 mb-3">
                  Votre commentaire
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Partagez votre expérience..."
                />
              </div>

              <button 
                onClick={() => {
                  if (rating > 0) {
                    alert(`Merci pour votre avis ! Note: ${rating}/5`);
                    setRating(0);
                    setReview('');
                  } else {
                    alert('Veuillez donner une note avant de soumettre.');
                  }
                }}
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                Soumettre mon avis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientMiniSite;