'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import RoomSelection from '../../../../../components/RoomSelection';
import { Button } from '../../../../../components/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Room } from '../../../../../types';




interface SelectedRoom {
  id: number;
  quantity: number;
}


 const sampleRooms: Room[] = [
  {
    id: 1,
    name: "Chambre Deluxe Vue Mer",
    room_type: "double",
    bed_type: "king size",
    num_person: 2,
    surface_area: 35,
    price_per_night: 35000,
    hourly_rate: 8000,
    day_use_price: 15000,
    flooring_type: "parquet",
    view: "mer",
    floor: "2",
    is_pets_allowed: true,
    is_smoking_allowed: false,
    in_maintenance: false,
    is_available: true,
    status: "available",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    room_images: [
      { image: "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg" },
      { image: "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg" }
    ],
    amenities: [
      { id: 1, name: "WiFi", description: false, icon: "https://cdn-icons-png.flaticon.com/512/93/93158.png" },
      { id: 2, name: "Climatisation", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2922/2922031.png" },
      { id: 3, name: "Mini-bar", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3209/3209260.png" },
      { id: 4, name: "Service chambre", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3050/3050209.png" }
    ],
    reservation_types: [
  {
    id: 1,
    name: "Nuitée",
    code: "classic", // Add the code property
    description: "Arrivée 14h - Départ 11h",
    is_flexible: false, // Add the is_flexible property
    slots: [{ checkin_time: 14, checkout_time: 11 }]
  },
  {
    id: 2,
    name: "Journée",
    code: "day", // Add the code property
    description: "De 10h à 17h",
    is_flexible: false, // Add the is_flexible property
    slots: [{ checkin_time: 10, checkout_time: 17 }]
  },
  {
    id: 3,
    name: "À la carte",
    code: "flexible", // Add the code property
    description: "Choisissez vos heures",
    is_flexible: true, // Add the is_flexible property
    slots: []
  }
],
    pricing: [
{
  reservation_type_id: 1,
  reservation_type_name: "Nuitée",
  price: 35000,
  hourly_price: 0, 
  is_hourly_based: false,
  currency: "FCFA"
},
{
  reservation_type_id: 2,
  reservation_type_name: "Journée",
  price: 15000,
  hourly_price: 0, 
  is_hourly_based: false,
  currency: "FCFA"
},
  {
  reservation_type_id: 3,
  reservation_type_name: "À la carte",
  price: 0, 
  hourly_price: 8000,
  is_hourly_based: true,
  currency: "FCFA"
}
]
  },
  {
    id: 2,
    name: "Suite Présidentielle",
    room_type: "suite",
    bed_type: "king size",
    num_person: 4,
    surface_area: 80,
    price_per_night: 85000,
    hourly_rate: 15000,
    day_use_price: 30000,
    flooring_type: "marbre",
    view: "piscine",
    floor: "3",
    is_pets_allowed: false,
    is_smoking_allowed: false,
    in_maintenance: false,
    is_available: true,
    status: "available",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    room_images: [
      { image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg" },
      { image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg" }
    ],
    amenities: [
      { id: 1, name: "WiFi", description: false, icon: "https://cdn-icons-png.flaticon.com/512/93/93158.png" },
      { id: 3, name: "Mini-bar", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3209/3209260.png" },
      { id: 4, name: "Jacuzzi", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png" },
      { id: 5, name: "TV écran large", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3612/3612569.png" },
      { id: 6, name: "Terrasse privée", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2551/2551768.png" }
    ],
    reservation_types: [
      {
        id: 4,
        name: "Nuitée",
        code: "classic",
        description: "Arrivée 14h - Départ 11h",
        is_flexible: false,
        slots: [{ checkin_time: 14, checkout_time: 11 }]
      },
      {
        id: 5,
        name: "Journée VIP",
        code: "day_use",
        description: "De 9h à 19h",
        is_flexible: false,
        slots:[{ checkin_time: 9, checkout_time: 19 }]
      }
    ],
    pricing: [
      {
        reservation_type_id: 4,
        reservation_type_name: "Nuitée",
        price: 85000,
        hourly_price: 15000,
        is_hourly_based: false,
        currency: "FCFA"
      },
      {
        reservation_type_id: 5,
        reservation_type_name: "Journée VIP",
        price: 30000,
        hourly_price: 15000,
        is_hourly_based: false,
        currency: "FCFA"
      }
    ]
  },
  {
    id: 3,
    name: "Chambre Confort",
    room_type: "single",
    bed_type: "queen size",
    num_person: 1,
    surface_area: 25,
    price_per_night: 18000,
    hourly_rate: 4000,
    day_use_price: 0,
    flooring_type: "carrelage",
    view: "jardin",
    floor: "1",
    is_pets_allowed: false,
    is_smoking_allowed: true,
    in_maintenance: false,
    is_available: true,
    status: "available",
    image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    room_images: [
      { image: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg" }
    ],
    amenities: [
      { id: 1, name: "WiFi", description: false, icon: "https://cdn-icons-png.flaticon.com/512/93/93158.png" },
      { id: 5, name: "TV", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3612/3612569.png" },
      { id: 7, name: "Coffre-fort", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3142/3142730.png" }
    ],
    reservation_types: [
      {
        id: 6,
        name: "Nuitée",
        code: "classic",
        description: "Arrivée 14h - Départ 11h",
        is_flexible: false,
        slots: [{ checkin_time: 14, checkout_time: 11 }]
      }
    ],
    pricing: [
      {
        reservation_type_id: 6,
        reservation_type_name: "Nuitée",
        price: 18000,
        hourly_price: 4000,
        is_hourly_based: false,
        currency: "FCFA"
      }
    ]
  },
  {
    id: 4,
    name: "Suite Familiale",
    room_type: "family",
    bed_type: "double + 2 simples",
    num_person: 4,
    surface_area: 60,
    price_per_night: 65000,
    hourly_rate: 12000,
    day_use_price: 25000,
    flooring_type: "parquet",
    view: "ville",
    floor: "2",
    is_pets_allowed: true,
    is_smoking_allowed: false,
    in_maintenance: false,
    is_available: true,
    status: "available",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    room_images: [
      { image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg" },
      { image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" }
    ],
    amenities: [
      { id: 1, name: "WiFi", description: false, icon: "https://cdn-icons-png.flaticon.com/512/93/93158.png" },
      { id: 2, name: "Climatisation", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2922/2922031.png" },
      { id: 8, name: "Espace jeux enfants", description: false, icon: "https://cdn-icons-png.flaticon.com/512/1864/1864593.png" },
      { id: 9, name: "Machine à café", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2938/2938055.png" }
    ],
    reservation_types: [
      {
        id: 7,
        name: "Nuitée",
        code: "classic",
        description: "Arrivée 14h - Départ 11h",
        is_flexible: false,
        slots:  [{ checkin_time: 14, checkout_time: 11 }]
      },
      {
        id: 8,
        name: "Journée Famille",
        code: "day_use",
        description: "De 10h à 18h",
        is_flexible: false,
        slots: [{ checkin_time: 10, checkout_time: 18 }]
      }
    ],
    pricing: [
      {
        reservation_type_id: 7,
        reservation_type_name: "Nuitée",
        price: 65000,
        hourly_price: 12000,
        is_hourly_based: false,
        currency: "FCFA"
      },
      {
        reservation_type_id: 8,
        reservation_type_name: "Journée Famille",
        price: 25000,
        hourly_price: 12000,
        is_hourly_based: false,
        currency: "FCFA"
      }
    ]
  },
  {
    id: 5,
    name: "Chambre Exécutive",
    room_type: "business",
    bed_type: "king size",
    num_person: 2,
    surface_area: 40,
    price_per_night: 45000,
    hourly_rate: 10000,
    day_use_price: 20000,
    flooring_type: "parquet",
    view: "ville",
    floor: "4",
    is_pets_allowed: false,
    is_smoking_allowed: false,
    in_maintenance: false,
    is_available: true,
    status: "available",
    image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
    room_images: [
      { image: "https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg" },
      { image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg" }
    ],
    amenities: [
      { id: 1, name: "WiFi", description: false, icon: "https://cdn-icons-png.flaticon.com/512/93/93158.png" },
      { id: 2, name: "Climatisation", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2922/2922031.png" },
      { id: 10, name: "Bureau ergonomique", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3176/3176272.png" },
      { id: 11, name: "Imprimante", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png" }
    ],
    reservation_types: [
      {
        id: 9,
        name: "Nuitée",
        code: "classic",
        description: "Arrivée 14h - Départ 11h",
        is_flexible: false,
        slots:[{ checkin_time: 14, checkout_time: 11 }]
      },
      {
        id: 10,
        name: "Journée",
        code: "day_use",
        description: "De 8h à 20h",
        is_flexible: false,
        slots: [{ checkin_time: 8, checkout_time: 20 }]
      }
    ],
    pricing: [
      {
        reservation_type_id: 9,
        reservation_type_name: "Nuitée",
        price: 45000,
        hourly_price: 10000,
        is_hourly_based: false,
        currency: "FCFA"
      },
      {
        reservation_type_id: 10,
        reservation_type_name: "Journée",
        price: 20000,
        hourly_price: 10000,
        is_hourly_based: false,
        currency: "FCFA"
      }
    ]
  },
  {
    id: 6,
    name: "Chambre Romantique",
    room_type: "double",
    bed_type: "queen size",
    num_person: 2,
    surface_area: 30,
    price_per_night: 40000,
    hourly_rate: 9000,
    day_use_price: 18000,
    flooring_type: "moquette",
    view: "jardin",
    floor: "1",
    is_pets_allowed: false,
    is_smoking_allowed: false,
    in_maintenance: false,
    is_available: true,
    status: "available",
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
    room_images: [
      { image: "https://images.pexels.com/photos/271635/pexels-photo-271635.jpeg" },
      { image: "https://images.pexels.com/photos/271640/pexels-photo-271640.jpeg" }
    ],
    amenities: [
      { id: 1, name: "WiFi", description: false, icon: "https://cdn-icons-png.flaticon.com/512/93/93158.png" },
      { id: 12, name: "Champagne offert", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3174/3174836.png" },
      { id: 13, name: "Bain à remous", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png" },
      { id: 14, name: "Service romantique", description: false, icon: "https://cdn-icons-png.flaticon.com/512/3048/3048127.png" }
    ],
    reservation_types: [
      {
        id: 11,
        name: "Nuitée Romantique",
        code: "romantic",
        description: "Arrivée 16h - Départ 12h",
        is_flexible: false,
        slots: [{ checkin_time: 16, checkout_time: 12 }]
      },
      {
        id: 12,
        name: "Journée Romantique",
        code: "day_use",
        description: "De 12h à 22h",
        is_flexible: false,
        slots: [{ checkin_time: 12, checkout_time: 22 }]
      }
    ],
    pricing: [
      {
        reservation_type_id: 11,
        reservation_type_name: "Nuitée Romantique",
        price: 40000,
        hourly_price: 9000,
        is_hourly_based: false,
        currency: "FCFA"
      },
      {
        reservation_type_id: 12,
        reservation_type_name: "Journée Romantique",
        price: 18000,
        hourly_price: 9000,
        is_hourly_based: false,
        currency: "fCFA"
      }
    ]
  },
 /*
{
  id: 7,
  name: "Chambre Standard",
  room_type: "single",
  bed_type: "double",
  num_person: 1,
  surface_area: 20,
  price_per_night: 15000,
  hourly_rate: 3500,
  day_use_price: 0,
  flooring_type: "carrelage",
  view: "cour intérieure",
  floor: "1",
  is_pets_allowed: false,
  is_smoking_allowed: false,
  in_maintenance: false,
  is_available: true,
  status: "available",
  image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
  room_images: [
    { image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg" },
    { image: "https://images.pexels.com/photos/26139/pexels-photo.jpg" },
    { image: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg" }
  ],
  amenities: [
    { 
      id: 1, 
      name: "WiFi", 
      description: false, 
      icon: "https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg"
    }
  ],
  reservation_types: [
    {
      id: 13,
      name: "Nuitée",
      code: "classic",
      description: "Réservation classique, Nuitée",
      is_flexible: false,
      slots: [
        { checkin_time: 14, checkout_time: 11 }
      ]
    },
    {
      id: 14,
      name: "Horaires Flexibles",
      code: "flexible",
      description: false,
      is_flexible: true,
      slots: []
    }
  ],
  pricing: [
    {
      reservation_type_id: 13,
      reservation_type_name: "Nuitée",
      price: 15000,
      hourly_price: 3500,
      is_hourly_based: false,
      currency: "XOF"
    },
    {
      reservation_type_id: 14,
      reservation_type_name: "Horaires Flexibles",
      price: 0,
      hourly_price: 3500,
      is_hourly_based: true,
      currency: "XOF"
    }
  ]
},
{
  id: 8,
  name: "Suite Junior",
  room_type: "junior_suite",
  bed_type: "king size",
  num_person: 2,
  surface_area: 45,
  price_per_night: 55000,
  hourly_rate: 11000,
  day_use_price: 22000,
  flooring_type: "parquet",
  view: "mer",
  floor: "3",
  is_pets_allowed: false,
  is_smoking_allowed: false,
  in_maintenance: false,
  is_available: true,
  status: "available",
  image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  room_images: [
    { image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg" },
    { image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" }
  ],
  amenities: [
    { id: 1, name: "WiFi", description: false, icon: "https://cdn-icons-png.flaticon.com/512/93/93158.png" },
    { id: 2, name: "Climatisation", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2922/2922031.png" },
    { id: 15, name: "Coin salon", description: false, icon: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png" },
    { id: 16, name: "Nespresso", description: false, icon: "https://cdn-icons-png.flaticon.com/512/2938/2938055.png" }
  ],
  reservation_types: [
    {
      id: 15,
      name: "Nuitée",
      code: "classic",
      description: "Réservation classique, Nuitée",
      is_flexible: false,
      slots: [
        { checkin_time: 14, checkout_time: 11 }
      ]
    },
    {
      id: 16,
      name: "Day use",
      code: "day_use",
      description: "Utilisation en Journée",
      is_flexible: false,
      slots: [
        { checkin_time: 10, checkout_time: 17 },
        { checkin_time: 10, checkout_time: 14 }
      ]
    },
    {
      id: 17,
      name: "Week-end",
      code: "weekend",
      description: "Forfait week-end",
      is_flexible: false,
      slots: [
        { checkin_time: 14, checkout_time: 16 }
      ]
    }
  ],
  pricing: [
    {
      reservation_type_id: 15,
      reservation_type_name: "Nuitée",
      price: 55000,
      hourly_price: 11000,
      is_hourly_based: false,
      currency: "XOF"
    },
    {
      reservation_type_id: 16,
      reservation_type_name: "Day use",
      price: 22000,
      hourly_price: 11000,
      is_hourly_based: false,
      currency: "XOF"
    },
    {
      reservation_type_id: 17,
      reservation_type_name: "Week-end",
      price: 55000,
      hourly_price: 11000,
      is_hourly_based: false,
      currency: "XOF"
    }
  ]
}
*/
];


export default function NewBookingPage() {
  const router = useRouter();
  const params = useSearchParams();
  
  // Détection du scénario
 const isFromSearch = params.has('rooms') && params.has('checkIn') && params.has('checkOut');
const hasRoomId = params.has('roomId');

  // Initialisation des dates avec gestion des deux scénarios
  const [dates, setDates] = useState(() => {
  if (params.has('rooms')) { // Scénario 1
    return {
      checkIn: params.get('checkIn') ? new Date(params.get('checkIn')!) : new Date(),
      checkOut: params.get('checkOut') ? new Date(params.get('checkOut')!) : new Date(Date.now() + 86400000)
    };
  }
  // Scénario 2
  return {
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 86400000)
  };
});

  
const validateDate = (date: Date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

// Puis modifiez handleContinue()
if (!validateDate(dates.checkIn) || !validateDate(dates.checkOut)) {
  throw new Error('Dates invalides');
}
  
  useEffect(() => {
    if (isFromSearch) {
      // Scénario 1 - Depuis la recherche
      const roomsParam = params.get('rooms');
      if (roomsParam) {
        try {
          setSelectedRooms(JSON.parse(decodeURIComponent(roomsParam)));
        } catch (e) {
          console.error("Erreur parsing chambres", e);
        }
      }
    } else if (hasRoomId) {
      // Scénario 2 - Clic direct sur une chambre
      const roomId = params.get('roomId');
      if (roomId) {
        setSelectedRooms([{ id: parseInt(roomId), quantity: 1 }]);
      }
    }
  }, [isFromSearch, hasRoomId, params]);

  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [reservationType, setReservationType] = useState<string>('');
   const [availableReservationTypes, setAvailableReservationTypes] = useState<
    Array<{ id: number; name: string; code: string }>
  >([]);

  const [totalPrice, setTotalPrice] = useState(0);

  // Mémoïsez les calculs coûteux
  const commonReservationTypes = useMemo(() => {
    if (selectedRooms.length === 0) return [];
    const firstRoom = sampleRooms.find(r => r.id === selectedRooms[0].id);
    return firstRoom?.reservation_types?.filter(firstType => 
      selectedRooms.every(selectedRoom => {
        const room = sampleRooms.find(r => r.id === selectedRoom.id);
        return room?.reservation_types.some(rt => rt.code === firstType.code);
      })
    ) || [];
  }, [selectedRooms]);

  // Effet principal simplifié
  useEffect(() => {
    const newTypes = commonReservationTypes.map(rt => ({
      id: rt.id,
      name: rt.name,
      code: rt.code,
    }));

    setAvailableReservationTypes(prev => 
      JSON.stringify(prev) === JSON.stringify(newTypes) ? prev : newTypes
    );

    if (!reservationType && newTypes.length > 0) {
      setReservationType(newTypes[0].code);
    }
  }, [commonReservationTypes, reservationType]);

  // Calcul du total séparé
  useEffect(() => {
    if (selectedRooms.length === 0 || !reservationType) return;

    const newTotal = selectedRooms.reduce((total, selected) => {
      const room = sampleRooms.find(r => r.id === selected.id);
      if (!room) return total;
      
      const pricing = room.pricing.find(p => 
        p.reservation_type_id === availableReservationTypes.find(t => t.code === reservationType)?.id
      );
      
      return total + (pricing?.price || room.price_per_night) * selected.quantity;
    }, 0);

    setTotalPrice(prev => prev !== newTotal ? newTotal : prev);
  }, [selectedRooms, reservationType, availableReservationTypes]);


  // Trouver les types de réservation communs
  const getCommonReservationTypes = useCallback(() => {
    if (selectedRooms.length === 0) return [];
    const firstRoomTypes = sampleRooms.find(r => r.id === selectedRooms[0].id)?.reservation_types || [];
    return firstRoomTypes.filter(firstType => 
      selectedRooms.every(selectedRoom => {
        const room = sampleRooms.find(r => r.id === selectedRoom.id);
        return room?.reservation_types.some(rt => rt.code === firstType.code);
      })
    );
  }, [selectedRooms]);

  // Calcul du prix en fonction du type de réservation
  const calculateTotal = useCallback(() => {
    return selectedRooms.reduce((total, selected) => {
      const room = sampleRooms.find(r => r.id === selected.id);
      if (!room) return total;
      
      const pricing = room.pricing.find(p => 
        p.reservation_type_id === availableReservationTypes.find(t => t.code === reservationType)?.id
      );
      
      return total + (pricing?.price || room.price_per_night) * selected.quantity;
    }, 0);
  }, [selectedRooms, reservationType, availableReservationTypes]);

 // Met à jour les types disponibles
useEffect(() => {
  const commonTypes = getCommonReservationTypes();
  setAvailableReservationTypes(commonTypes.map(rt => ({
    id: rt.id,
    name: rt.name,
    code: rt.code,
  })));

  if (!reservationType && commonTypes.length > 0) {
    setReservationType(commonTypes[0].code);
  }
}, [getCommonReservationTypes]);

// Met à jour le prix
useEffect(() => {
  if (selectedRooms.length > 0 && reservationType) {
    setTotalPrice(calculateTotal());
  }
}, [selectedRooms, reservationType, calculateTotal]);

const handleContinue = async () => {
  try {
    if (!reservationType || selectedRooms.length === 0) {
      throw new Error('Sélection incomplète');
    }
 const queryParams = new URLSearchParams({
      type: reservationType,
      ...(isFromSearch ? {} : { // Ne pas renvoyer les dates si déjà dans l'URL
        checkIn: dates.checkIn.toISOString(),
        checkOut: dates.checkOut.toISOString()
      }),
      rooms: JSON.stringify(selectedRooms)
    });

    // Préparation données
// Remove this line
const bookingData = {
  rooms: selectedRooms,
  reservationType,
  totalPrice: calculateTotal() 
};










sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
sessionStorage.setItem('bookingContext', JSON.stringify({
  data: { selectedRooms, dates, reservationType },
  timestamp: Date.now(),
  expiresIn: 30 * 60 * 1000 // 30 minutes
}));

    // Redirection
     await router.push(`/booking/${selectedRooms[0].id}?${queryParams}`);
  } catch (error) {
    console.error("Erreur réservation:", error);
    alert((error as Error).message || "Erreur lors de la réservation");
  }
};


  useEffect(() => {
    // 1. Vérifier d'abord les paramètres URL (priorité haute)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomsParam = params.get('rooms');
      
      if (roomsParam) {
        try {
          setSelectedRooms(JSON.parse(decodeURIComponent(roomsParam)));
          return; 
        } catch (e) {
          console.error("Erreur de parsing des paramètres URL", e);
        }
      }

      // 2. Fallback: Vérifier localStorage
      const savedData = localStorage.getItem('bookingRooms');
      if (savedData) {
        try {
          const { data, timestamp } = JSON.parse(savedData);
          
          
          if (Date.now() - timestamp < 300000) {
            setSelectedRooms(data);
            localStorage.removeItem('bookingRooms');
          } else {
            localStorage.removeItem('bookingRooms'); 
          }
        } catch (e) {
          console.error("Erreur de parsing localStorage", e);
        }
      }
    }
  }, []); 

 const handleAddRoom = () => {
  // Sauvegarde la sélection actuelle ET les dates
  sessionStorage.setItem('tempBookingData', JSON.stringify({
    selectedRooms,
    dates,
    reservationType
  }));
  router.push('/rooms/selection?from=new');
};

  return (
   <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
  <div className="container mx-auto p-6 pt-32">
    {/* Titre */}
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-red-900 mb-2">Nouvelle Réservation</h1>
      <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-orange-500 mx-auto rounded-full"></div>
    </div>
 {!isFromSearch && (  // Afficher seulement si PAS depuis la recherche
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">📅 Dates de séjour</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date d'arrivée</label>
            <DatePicker
              selected={dates.checkIn}
              onChange={(date: Date | null) => date && setDates({...dates, checkIn: date})}
              selectsStart
              startDate={dates.checkIn}
              endDate={dates.checkOut}
              minDate={new Date()}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date de départ</label>
            <DatePicker
              selected={dates.checkOut}
              onChange={(date: Date | null) => date && setDates({...dates, checkOut: date})}
              selectsEnd
              startDate={dates.checkIn}
              endDate={dates.checkOut}
              minDate={dates.checkIn}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>
    )}

        {/* Sélection des chambres (existante) */}
        <div className="bg-white rounded-lg shadow border overflow-hidden mb-8">
          <div className="bg-gray-800 px-6 py-4">
            <h3 className="font-semibold text-white text-lg">Sélection des chambres</h3>
          </div>
          <div className="p-6">
            <RoomSelection 
              rooms={sampleRooms}
              selectedRooms={selectedRooms}
              onAddRoom={handleAddRoom}
              onRemoveRoom={(id) => setSelectedRooms(prev => prev.filter(r => r.id !== id))}
              onQuantityChange={(id, qty) => setSelectedRooms(prev => 
                prev.map(r => r.id === id ? {...r, quantity: qty} : r)
              ,)}
            />
          </div>
        </div>

        {/* Sélecteur de type de réservation - AMÉLIORÉ */}
        {selectedRooms.length > 0 && (
          <div className="bg-white rounded-lg shadow border overflow-hidden mb-8">
            <div className="bg-gray-800 px-6 py-4">
              <h3 className="font-semibold text-white text-lg">Options de réservation</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="reservationType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type de réservation
                </label>
               <select
  value={reservationType}
  onChange={(e) => setReservationType(e.target.value)}
>
  {availableReservationTypes.map((type) => (
    <option key={type.id} value={type.code}>
      {type.name} (Commun à toutes les chambres) - 
      {selectedRooms.map(selected => {
        const room = sampleRooms.find(r => r.id === selected.id);
        const price = room?.pricing.find(p => p.reservation_type_id === type.id)?.price;
        return `${room?.name}: ${price?.toLocaleString('fr-FR')} FCFA`;
      }).join(' | ')}
    </option>
  ))}
</select>
              </div>
            </div>
          </div>
        )}

        {/* Récapitulatif - AMÉLIORÉ */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4">
            <h3 className="font-semibold text-white text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              Récapitulatif
            </h3>
          </div>
          
          <div className="p-6">
            {selectedRooms.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-lg">Votre séjour</h4>
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span className="font-medium">
                      {dates.checkIn.toLocaleDateString()} au {dates.checkOut.toLocaleDateString()}
                      ({Math.ceil((dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24))} nuits)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Vos chambres</h4>
                  {selectedRooms.map(selected => {
                    const room = sampleRooms.find(r => r.id === selected.id);
                    return room ? (
                      <div key={selected.id} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-red-900">{room.name}</h4>
                            <div className="text-sm text-gray-600 mt-1">
                              <span className="bg-gray-100 px-2 py-1 rounded mr-2">
                                {selected.quantity}x
                              </span>
                              {reservationType && availableReservationTypes.find(t => t.code === reservationType)?.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold">
                              {(
                                (room.pricing.find(p => 
                                  p.reservation_type_id === availableReservationTypes.find(t => t.code === reservationType)?.id
                                )?.price || room.price_per_night) * selected.quantity
                              ).toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="border-t-2 border-gray-200 pt-4 mt-6">
                  <div className="flex justify-between items-center bg-red-50 p-4 rounded-lg">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-red-900">
                      {totalPrice.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                <p className="text-gray-500 text-lg">Aucune chambre sélectionnée</p>
              </div>
            )}
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button 
            onClick={() => router.push('/booking')}
            variant="outline"
            className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
          >
            Retour
          </Button>
  
            {selectedRooms.length > 0 && (
            <Button
              onClick={handleContinue}
              disabled={!reservationType}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 disabled:opacity-50"
            >
              Continuer vers le paiement
            </Button>
          )}

</div>
  </div>
</div>
  );
}
