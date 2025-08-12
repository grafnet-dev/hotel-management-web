export type Amenity = {
  id: number;
  name: string;
  description: string | boolean;
  icon: string;
};

export type RoomImage = {
  image: string;
};

export type ReservationType = {
  id: number;
  name: string;
  code: string;
  description: string | boolean;
  is_flexible: boolean;
  slots: ReservationSlot[];
};
export type ReservationSlot = {
  checkin_time: number;
  checkout_time: number;
};




export interface Image {
  id: number;
  url: string;
}


export type Pricing = Array<{
  reservation_type_id: number;
  reservation_type_name: string;
  price: number;
  hourly_price: number;
  is_hourly_based: boolean;
  currency: string | null;
}>;


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
    description: "Une chambre élégante avec vue panoramique sur la mer. Parfaite pour les couples en quête de romantisme avec son lit king size et sa décoration raffinée.",
    wifiCode: "HOTEL_DULAC_2024", // WiFi unifié pour tout l'hôtel
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
        description: "Arrivée 14h - Départ 11h",
        is_flexible: false,
        slots: [{ checkin_time: 14, checkout_time: 11 }]
      },
      {
        id: 2,
        name: "DAY-USE",
        code: "day_use",
        description: "De 10h à 17h",
        is_flexible: false,
        slots: [{ checkin_time: 10, checkout_time: 17 }]
      },
      {
        id: 3,
        name: "Flexible horaire",
        code: "flexible",
        description: "Choisissez vos heures",
        is_flexible: true,
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
        reservation_type_name: "DAY-USE",
        price: 15000,
        hourly_price: 0,
        is_hourly_based: false,
        currency: "FCFA"
      },
      {
        reservation_type_id: 3,
        reservation_type_name: "Flexible horaire",
        price: 8000,
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
    description: "Suite luxueuse avec vue sur la piscine. Espace généreux avec jacuzzi privé et terrasse. Idéale pour les familles ou les séjours d'affaires haut de gamme.",
    wifiCode: "HOTEL_DULAC_2024",
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
        name: "DAY-USE",
        code: "day_use",
        description: "De 9h à 19h",
        is_flexible: false,
        slots: [{ checkin_time: 9, checkout_time: 19 }]
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
        reservation_type_name: "DAY-USE",
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
    description: "Chambre confortable et économique avec vue sur le jardin. Parfaite pour les voyageurs d'affaires ou les courts séjours. Équipements essentiels inclus.",
    wifiCode: "HOTEL_DULAC_2024",
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
    description: "Suite spacieuse conçue pour les familles. Espace jeux pour enfants, lits séparés et équipements adaptés. Vue sur la ville et confort maximal pour tous.",
    wifiCode: "HOTEL_DULAC_2024",
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
        slots: [{ checkin_time: 14, checkout_time: 11 }]
      },
      {
        id: 8,
        name: "DAY-USE",
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
    description: "Chambre business avec bureau ergonomique et équipements professionnels. Parfaite pour les voyageurs d'affaires avec imprimante et WiFi haut débit.",
    wifiCode: "HOTEL_DULAC_2024",
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
        slots: [{ checkin_time: 14, checkout_time: 11 }]
      },
      {
        id: 10,
        name: "DAY-USE",
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
    description: "Chambre romantique avec ambiance intime. Bain à remous, champagne offert et service spécialisé pour les couples. Parfaite pour les lunes de miel et anniversaires.",
    wifiCode: "HOTEL_DULAC_2024",
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
        name: "Nuitée",
        code: "classic",
        description: "Arrivée 16h - Départ 12h",
        is_flexible: false,
        slots: [{ checkin_time: 16, checkout_time: 12 }]
      },
      {
        id: 12,
        name: "DAY-USE",
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
        currency: "FCFA"
      }
    ]
  }
];

export default sampleRooms;

export type Room = {
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
  view: string;
  bed_type: string;
  flooring_type: string | boolean;
  image: string;
  is_smoking_allowed: boolean;
  is_pets_allowed: boolean;
  in_maintenance: boolean;
  checkin_date?: string;
  checkout_date?: string;
  description: string; // Ajouté
  wifiCode: string;     // Ajouté
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
};

export type RoomType = 
  | 'double'
  | 'single'
  | 'suite'
  | 'family'
  | 'business'
  | 'junior_suite'
  | string;

export type BedType = 
  | 'king size'
  | 'queen size'
  | 'double'
  | 'simple'
  | 'double + 2 simples'
  | string;

export type FlooringType = 
  | 'parquet'
  | 'marbre'
  | 'carrelage'
  | 'moquette'
  | string;

export type ViewType = 
  | 'mer'
  | 'piscine'
  | 'jardin'
  | 'ville'
  | 'cour intérieure'
  | string;


export type SelectedRoom = {
  id: number;
  quantity: number;
}




