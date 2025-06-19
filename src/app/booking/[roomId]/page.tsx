"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Badge } from '../../../../components/ui/badge';
import { Separator } from '../../../../components/ui/separator';
import Image from 'next/image';
import { 
 
  Users, 
  Maximize2, 
  Mountain, 
  BedDouble, 
  Wifi,
  DogIcon,
  CreditCard,
  Smartphone,
  Banknote,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

// Color scheme
const colors = {
  maroon: '#800020',
  gold: '#CE9226',
  teal: '#008B8B',
  darkTeal: '#005D7C',
  orange: '#FF6B35',
  cream: '#F5F5DC'
};

export interface Image {
  id: number;
  url: string;
}

// Types based on your API data
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



interface BookingFormData {
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests: string;
  };
  reservationDetails: {
    reservationType: string;
    checkInDate: string;
    checkOutDate: string;
    checkInTime: string;
    checkOutTime: string;
    hours: number;
    guests: number;
  };
  paymentInfo: {
    method: 'card' | 'mobile' | 'cash';
    option: 'full' | 'partial' | 'onsite';
  };
}



export default function BookingForm() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  // Mock data based on your API structure
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
];

  const [room, setRoom] = useState<Room | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    guestInfo: {
      fullName: '',
      email: '',
      phone: '',
      specialRequests: ''
    },
    reservationDetails: {
      reservationType: '',
      checkInDate: '',
      checkOutDate: '',
      checkInTime: '',
      checkOutTime: '',
      hours: 1,
      guests: 1
    },
    paymentInfo: {
      method: 'card',
      option: 'full'
    }
  });

  useEffect(() => {
    // Find room by ID
    const foundRoom = sampleRooms.find(r => r.id.toString() === roomId);
    if (foundRoom) {
      setRoom(foundRoom);
      // Set default reservation type
      if (foundRoom.reservation_types.length > 0) {
        setFormData(prev => ({
          ...prev,
          reservationDetails: {
            ...prev.reservationDetails,
            reservationType: foundRoom.reservation_types[0].code,
            guests: foundRoom.num_person
          }
        }));
      }
    }
  }, [roomId]);

  const selectedReservationType = room?.reservation_types.find(
    rt => rt.code === formData.reservationDetails.reservationType
  );

  const selectedPricing = room?.pricing.find(
    p => p.reservation_type_id === selectedReservationType?.id
  );

  const calculateTotalPrice = () => {
    if (!selectedPricing) return 0;

    if (formData.reservationDetails.reservationType === 'flexible' && selectedPricing.is_hourly_based) {
      return selectedPricing.hourly_price * formData.reservationDetails.hours;
    }

    if (formData.reservationDetails.reservationType === 'day_use') {
      return room?.day_use_price || 0;
    }

    if (formData.reservationDetails.reservationType === 'classic') {
      const checkIn = new Date(formData.reservationDetails.checkInDate);
      const checkOut = new Date(formData.reservationDetails.checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return selectedPricing.price * Math.max(1, nights);
    }

    return selectedPricing.price;
  };

const handleInputChange = (section: keyof BookingFormData, field: string, value: string | number) => {
  setFormData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value
    }
  }));
};

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setCurrentStep(4);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chambre non trouvée</h2>
          <p className="text-gray-600 mb-4">La chambre demandée n'existe pas ou n'est plus disponible.</p>
          <Button onClick={() => router.push('/rooms')} className="bg-teal-600 hover:bg-teal-700">
            Retour aux chambres
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/rooms')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux chambres
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.maroon }}>
              Réservation - {room.name}
            </h1>
            <div className="flex justify-center items-center space-x-4 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step === 4 && isSuccess ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        currentStep > step ? 'bg-teal-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {currentStep === 1 && "Détails de la réservation"}
              {currentStep === 2 && "Informations personnelles"}
              {currentStep === 3 && "Paiement"}
              {currentStep === 4 && "Confirmation"}
            </div>
          </div>
        </motion.div>

        {/* Room Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-6 border-2" style={{ borderColor: colors.gold }}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <Image
          src={room.image}
          alt={room.name}
          width={400} // Set the width of the image
          height={200} // Set the height of the image
          className="object-cover rounded-lg"
        />
              </div>
              <div className="md:w-2/3">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                    <p className="text-gray-600 capitalize">{room.room_type}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {room.status === 'available' ? 'Disponible' : 'Réservé'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{room.num_person} pers.</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    <span>{room.surface_area}m²</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mountain className="h-4 w-4 mr-2" />
                    <span>Vue {typeof room.view === 'string' ? room.view : 'standard'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BedDouble className="h-4 w-4 mr-2" />
                    <span>{typeof room.bed_type === 'string' ? room.bed_type : 'standard'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity.id} variant="outline" className="flex items-center gap-1">
                      <Wifi className="h-3 w-3" />
                      {amenity.name}
                    </Badge>
                  ))}
                  {room.is_pets_allowed && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <DogIcon className="h-3 w-3" />
                      Animaux acceptés
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6" style={{ color: colors.maroon }}>
                  Détails de la réservation
                </h3>

                {/* Reservation Type Selection */}
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 block">Type de réservation</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {room.reservation_types.map((type) => {
                      const pricing = room.pricing.find(p => p.reservation_type_id === type.id);
                      return (
                        <motion.div
                          key={type.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`p-4 cursor-pointer border-2 transition-all ${
                              formData.reservationDetails.reservationType === type.code
                                ? 'border-teal-500 bg-teal-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleInputChange('reservationDetails', 'reservationType', type.code)}
                          >
                            <div className="text-center">
                              <h4 className="font-semibold text-gray-900 mb-2">{type.name}</h4>
                              {type.description && (
                                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                              )}
                              {pricing && (
                                <div className="text-lg font-bold" style={{ color: colors.teal }}>
                                  {pricing.price.toLocaleString()} FCFA
                                  {pricing.is_hourly_based && <span className="text-sm">/heure</span>}
                                  {type.code === 'classic' && <span className="text-sm">/nuit</span>}
                                </div>
                              )}
                              {type.slots.length > 0 && (
                                <div className="text-xs text-gray-500 mt-2">
                                  {type.slots[0].checkin_time}h - {type.slots[0].checkout_time}h
                                </div>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Date Selection */}
                {formData.reservationDetails.reservationType === 'classic' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label>Date d'arrivée</Label>
                      <Input
                        type="date"
                        value={formData.reservationDetails.checkInDate}
                        onChange={(e) => handleInputChange('reservationDetails', 'checkInDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Date de départ</Label>
                      <Input
                        type="date"
                        value={formData.reservationDetails.checkOutDate}
                        onChange={(e) => handleInputChange('reservationDetails', 'checkOutDate', e.target.value)}
                        min={formData.reservationDetails.checkInDate || new Date().toISOString().split('T')[0]}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {formData.reservationDetails.reservationType === 'day_use' && (
                  <div className="mb-6">
                    <Label>Date de visite</Label>
                    <Input
                      type="date"
                      value={formData.reservationDetails.checkInDate}
                      onChange={(e) => handleInputChange('reservationDetails', 'checkInDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-2"
                    />
                  </div>
                )}

                {formData.reservationDetails.reservationType === 'flexible' && selectedPricing?.is_hourly_based && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={formData.reservationDetails.checkInDate}
                        onChange={(e) => handleInputChange('reservationDetails', 'checkInDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Heure d'arrivée</Label>
                      <Input
                        type="time"
                        value={formData.reservationDetails.checkInTime}
                        onChange={(e) => handleInputChange('reservationDetails', 'checkInTime', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Nombre d'heures</Label>
                      <Input
                        type="number"
                        min="1"
                        max="12"
                        value={formData.reservationDetails.hours}
                        onChange={(e) => handleInputChange('reservationDetails', 'hours', parseInt(e.target.value))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Guests */}
                <div className="mb-6">
                  <Label>Nombre d'invités</Label>
                  <Input
                    type="number"
                    min="1"
                    max={room.num_person}
                    value={formData.reservationDetails.guests}
                    onChange={(e) => handleInputChange('reservationDetails', 'guests', parseInt(e.target.value))}
                    className="mt-2"
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total estimé:</span>
                    <span className="text-xl font-bold" style={{ color: colors.teal }}>
                      {calculateTotalPrice().toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={nextStep}
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={!formData.reservationDetails.reservationType}
                  >
                    Continuer
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6" style={{ color: colors.maroon }}>
                  Informations personnelles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label>Nom complet *</Label>
                    <div className="relative mt-2">
                      <Input
                        value={formData.guestInfo.fullName}
                        onChange={(e) => handleInputChange('guestInfo', 'fullName', e.target.value)}
                        className="pl-10"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <div className="relative mt-2">
                      <Input
                        type="email"
                        value={formData.guestInfo.email}
                        onChange={(e) => handleInputChange('guestInfo', 'email', e.target.value)}
                        className="pl-10"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <Label>Téléphone *</Label>
                  <div className="relative mt-2">
                    <Input
                      type="tel"
                      value={formData.guestInfo.phone}
                      onChange={(e) => handleInputChange('guestInfo', 'phone', e.target.value)}
                      className="pl-10"
                      required
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="mb-6">
                  <Label>Demandes spéciales</Label>
                  <textarea
                    value={formData.guestInfo.specialRequests}
                    onChange={(e) => handleInputChange('guestInfo', 'specialRequests', e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={4}
                    placeholder="Allergies, préférences, demandes particulières..."
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Retour
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={!formData.guestInfo.fullName || !formData.guestInfo.email || !formData.guestInfo.phone}
                  >
                    Continuer
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6" style={{ color: colors.maroon }}>
                  Paiement
                </h3>

                {/* Payment Option */}
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 block">Option de paiement</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { key: 'full', label: '100%', desc: 'Payer maintenant' },
                      { key: 'partial', label: '50%', desc: 'Acompte' },
                      { key: 'onsite', label: '0%', desc: 'Sur place' }
                    ].map((option) => (
                      <Card
                        key={option.key}
                        className={`p-4 cursor-pointer border-2 transition-all ${
                          formData.paymentInfo.option === option.key
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('paymentInfo', 'option', option.key)}
                      >
                        <div className="text-center">
                          <div className="font-bold text-lg">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                {formData.paymentInfo.option !== 'onsite' && (
                  <div className="mb-6">
                    <Label className="text-base font-semibold mb-3 block">Méthode de paiement</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { key: 'card', label: 'Carte', icon: CreditCard },
                        { key: 'mobile', label: 'Mobile Money', icon: Smartphone },
                        { key: 'cash', label: 'Espèces', icon: Banknote }
                      ].map((method) => (
                        <Card
                          key={method.key}
                          className={`p-4 cursor-pointer border-2 transition-all ${
                            formData.paymentInfo.method === method.key
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleInputChange('paymentInfo', 'method', method.key)}
                        >
                          <div className="text-center">
                            <method.icon className="h-6 w-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">{method.label}</div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold mb-4">Résumé de la commande</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sous-total:</span>
                      <span>{calculateTotalPrice().toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes:</span>
                      <span>0 FCFA</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span style={{ color: colors.teal }}>
                        {calculateTotalPrice().toLocaleString()} FCFA
                      </span>
                    </div>
                    {formData.paymentInfo.option === 'partial' && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>À payer maintenant:</span>
                        <span>{Math.ceil(calculateTotalPrice() / 2).toLocaleString()} FCFA</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Traitement...' : 'Confirmer la réservation'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && isSuccess && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.maroon }}>
                  Réservation confirmée !
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Merci {formData.guestInfo.fullName.split(' ')[0]} ! Votre réservation a été confirmée.
                  Vous recevrez un email de confirmation à {formData.guestInfo.email}.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                  <h4 className="font-semibold mb-4">Détails de votre réservation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Chambre:</span>
                      <span className="font-medium">{room.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{selectedReservationType?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total payé:</span>
                      <span className="font-bold" style={{ color: colors.teal }}>
                        {formData.paymentInfo.option === 'partial' 
                          ? Math.ceil(calculateTotalPrice() / 2).toLocaleString()
                          : formData.paymentInfo.option === 'onsite'
                          ? '0'
                          : calculateTotalPrice().toLocaleString()
                        } FCFA
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => router.push('/rooms')}
                    variant="outline"
                  >
                    Retour aux chambres
                  </Button>
                  <Button
                    onClick={() => router.push('/')}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Accueil
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}