'use client';
import { useState } from 'react';
import CardRoom from '../components/cardroom';
import { Room } from '../types';
import RoomDetail from '../components/RoomDetail';
import BookingForm from './bookingform';

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
    is_day_use: true,
    day_use_price: 15000,
    day_use_check_in: 10,
    day_use_check_out: 18,
    default_check_in_time: 14,
    default_check_out_time: 12,
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
    is_day_use: true,
    day_use_price: 30000,
    day_use_check_in: 10,
    day_use_check_out: 18,
    default_check_in_time: 14,
    default_check_out_time: 12,
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
    is_day_use: false,
    default_check_in_time: 14,
    default_check_out_time: 12,
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
    is_day_use: true,
    day_use_price: 25000,
    day_use_check_in: 10,
    day_use_check_out: 18,
    default_check_in_time: 14,
    default_check_out_time: 12,
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
    is_day_use: true,
    day_use_price: 20000,
    day_use_check_in: 10,
    day_use_check_out: 18,
    default_check_in_time: 14,
    default_check_out_time: 12,
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
    is_day_use: true,
    day_use_price: 18000,
    day_use_check_in: 10,
    day_use_check_out: 18,
    default_check_in_time: 14,
    default_check_out_time: 12,
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
    ]
  }
];

const RoomList = ({ onBookNow }: RoomListProps) => {
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookingSubmit = (bookingData: BookingData) => {
    const roomBookingData: RoomBookingData = {
      guestName: bookingData.guestInfo.fullName,
      arrivalDate: new Date(bookingData.checkInDate),
      departureDate: new Date(bookingData.checkOutDate),
    };
    handleSubmitBooking(roomBookingData);
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

  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen" style={{ fontFamily: 'Bahnschrift, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleRooms.map((room) => (
            <CardRoom
              key={room.id}
              room={room}
              onBookNow={() => handleBookNow(room)}
              onViewDetails={() => setSelectedRoom(room)}
            />
          ))}
        </div>
      </div>

      {selectedRoom && (
        <RoomDetail 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}

      {selectedRoom && (
        <BookingForm
          room={selectedRoom}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default RoomList;