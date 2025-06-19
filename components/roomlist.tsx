'use client';
import { useState } from 'react';
import CardRoom from '../components/cardroom';
import BookingForm from '@/app/booking/[roomId]/page';
import RoomDetail from '../components/RoomDetail';



interface GuestInfo {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}



interface BookingData {
  guestInfo: GuestInfo;
  checkInDate: string;
  checkOutDate: string;
  isDayUse: boolean;
  paymentMethod: string;
  paymentOption: string;
}

interface RoomBookingData {
  guestName: string;
  arrivalDate: Date;
  departureDate: Date;
}

interface RoomListProps {
  onBookNow: (room: Room) => void;
  rooms?: Room[]; 
}

interface Image {
  image: string;
}
interface Room {
  id: number;
  name: string;
  status: string;
  room_type: string;
  num_person: number;
  is_available: boolean;
  price_per_night: number;
  day_use_price: number;
  hourly_rate: number;
  floor: string;
  surface_area: number;
  view: string | boolean;
  bed_type: string | boolean;
  flooring_type: string | boolean;
  image: string;
  is_smoking_allowed: boolean;
  is_pets_allowed: boolean;
  in_maintenance: boolean;
  checkin_date?: string;
  checkout_date?: string;
  room_images: {
    image: string;
  }[];
  amenities: Array<{
    id: number;
    name: string;
    description: string | boolean;
    icon: string;
  }>;
  reservation_types: Array<{
    id: number;
    name: string;
    code: string;
    description: string | boolean;
    is_flexible: boolean;
    slots: Array<{
      checkin_time: number;
      checkout_time: number;
    }>;
  }>;
  pricing: Array<{
    reservation_type_id: number;
    reservation_type_name: string;
    price: number;
    hourly_price: number;
    is_hourly_based: boolean;
    currency: string | null;
  }>;
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
        code: "classic",
        description: "Réservation classique, Nuitée",
        is_flexible: false,
        slots: [
          { checkin_time: 14, checkout_time: 11 }
        ]
      },
      {
        id: 2,
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
        id: 3,
        name: "Horaires Flexibles",
        code: "flexible",
        description: false,
        is_flexible: true,
        slots: []
      }
    ],
    pricing: [
      {
        reservation_type_id: 1,
        reservation_type_name: "Nuitée",
        price: 35000,
        hourly_price: 8000,
        is_hourly_based: false,
        currency: "XOF"
      },
      {
        reservation_type_id: 2,
        reservation_type_name: "Day use",
        price: 15000,
        hourly_price: 8000,
        is_hourly_based: false,
        currency: "XOF"
      },
      {
        reservation_type_id: 3,
        reservation_type_name: "Horaires Flexibles",
        price: 0,
        hourly_price: 8000,
        is_hourly_based: true,
        currency: "XOF"
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
        description: "Réservation classique, Nuitée",
        is_flexible: false,
        slots: [
          { checkin_time: 14, checkout_time: 11 }
        ]
      },
      {
        id: 5,
        name: "Day use VIP",
        code: "day_use_vip",
        description: "Forfait journée premium",
        is_flexible: false,
        slots: [
          { checkin_time: 9, checkout_time: 19 }
        ]
      }
    ],
    pricing: [
      {
        reservation_type_id: 4,
        reservation_type_name: "Nuitée",
        price: 85000,
        hourly_price: 15000,
        is_hourly_based: false,
        currency: "XOF"
      },
      {
        reservation_type_id: 5,
        reservation_type_name: "Day use VIP",
        price: 30000,
        hourly_price: 15000,
        is_hourly_based: false,
        currency: "XOF"
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
        description: "Réservation classique, Nuitée",
        is_flexible: false,
        slots: [
          { checkin_time: 14, checkout_time: 11 }
        ]
      }
    ],
    pricing: [
      {
        reservation_type_id: 6,
        reservation_type_name: "Nuitée",
        price: 18000,
        hourly_price: 4000,
        is_hourly_based: false,
        currency: "XOF"
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
        description: "Réservation classique, Nuitée",
        is_flexible: false,
        slots: [
          { checkin_time: 14, checkout_time: 11 }
        ]
      },
      {
        id: 8,
        name: "Day use Famille",
        code: "day_use_family",
        description: "Forfait journée familiale",
        is_flexible: false,
        slots: [
          { checkin_time: 10, checkout_time: 18 }
        ]
      }
    ],
    pricing: [
      {
        reservation_type_id: 7,
        reservation_type_name: "Nuitée",
        price: 65000,
        hourly_price: 12000,
        is_hourly_based: false,
        currency: "XOF"
      },
      {
        reservation_type_id: 8,
        reservation_type_name: "Day use Famille",
        price: 25000,
        hourly_price: 12000,
        is_hourly_based: false,
        currency: "XOF"
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
        description: "Réservation classique, Nuitée",
        is_flexible: false,
        slots: [
          { checkin_time: 14, checkout_time: 11 }
        ]
      },
      {
        id: 10,
        name: "Day use Pro",
        code: "day_use_pro",
        description: "Forfait journée professionnelle",
        is_flexible: false,
        slots: [
          { checkin_time: 8, checkout_time: 20 }
        ]
      }
    ],
    pricing: [
      {
        reservation_type_id: 9,
        reservation_type_name: "Nuitée",
        price: 45000,
        hourly_price: 10000,
        is_hourly_based: false,
        currency: "XOF"
      },
      {
        reservation_type_id: 10,
        reservation_type_name: "Day use Pro",
        price: 20000,
        hourly_price: 10000,
        is_hourly_based: false,
        currency: "XOF"
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
        description: "Forfait spécial romance",
        is_flexible: false,
        slots: [
          { checkin_time: 16, checkout_time: 12 }
        ]
      },
      {
        id: 12,
        name: "Day use Romantique",
        code: "day_use_romantic",
        description: "Forfait journée romantique",
        is_flexible: false,
        slots: [
          { checkin_time: 12, checkout_time: 22 }
        ]
      }
    ],
    pricing: [
      {
        reservation_type_id: 11,
        reservation_type_name: "Nuitée Romantique",
        price: 40000,
        hourly_price: 9000,
        is_hourly_based: false,
        currency: "XOF"
      },
      {
        reservation_type_id: 12,
        reservation_type_name: "Day use Romantique",
        price: 18000,
        hourly_price: 9000,
        is_hourly_based: false,
        currency: "XOF"
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

const RoomList = ({ onBookNow }: RoomListProps) => {
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  

 const handleBookingSubmit = async (bookingData: BookingData): Promise<boolean> => {
  const roomBookingData: RoomBookingData = {
    guestName: bookingData.guestInfo.fullName,
    arrivalDate: new Date(bookingData.checkInDate),
    departureDate: new Date(bookingData.checkOutDate),
  };
  await handleSubmitBooking(roomBookingData);
  return true; 
};

  const handleSubmitBooking = (bookingData: RoomBookingData) => {
    const bookingFormData: BookingData = {
      guestInfo: {
        fullName: bookingData.guestName,
        email: '',
        phone: '',
        specialRequests: ''
      },
      checkInDate: bookingData.arrivalDate.toISOString().split('T')[0],
      checkOutDate: bookingData.departureDate.toISOString().split('T')[0],
      isDayUse: false,
      paymentMethod: '',
      paymentOption: '',
    };

    console.log('Données de réservation:', bookingFormData);
    setIsBookingOpen(false);
  };

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    setIsBookingOpen(true);
    onBookNow(room);
  };
 const roomGroups = [];
for (let i = 0; i < sampleRooms.length; i += 3) {
  roomGroups.push(sampleRooms.slice(i, i + 3));
}

return (
  <div
    className="bg-gradient-to-b from-gray-50 to-white min-h-screen"
    style={{ fontFamily: 'Bahnschrift, sans-serif' }}
  >
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {roomGroups.map((group, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-stretch"
        >
          {group.map((room) => (
            <CardRoom
              key={room.id}
              room={room}
              onBookNow={() => handleBookNow(room)}
              onViewDetails={() => setSelectedRoom(room)}
            />
          ))}
        </div>
      ))}
    </div>

    {selectedRoom && (
      <RoomDetail room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    )}

    {isBookingOpen && (
      <BookingForm
        onSubmit={handleBookNow}
        onClose={() => setIsBookingOpen(false)}
      />
    )}
  </div>
);

};

export default RoomList;