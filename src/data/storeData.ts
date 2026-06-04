import { Product, Category, Testimonial, FAQItem, GalleryItem } from '../types';

export const STORE_PHONE = "+2348162956215";
export const STORE_WHATSAPP_NUMBER = "2348162956215";
export const STORE_EMAIL = "contact@bavidexfitness.com";
export const STORE_ADDRESS = "Plot 12, Admiralty Way, Lekki Phase 1, Lagos, Nigeria";
export const GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7297920194098!2d3.471649174823296!3d6.428741393562479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf453ae66994b%3A0xe67ec92f392211f4!2sAdmiralty%20Way%2C%20Lekki%20Phase%20I%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1717495000000!5m2!1sen!2sng";

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All Equipment',
    symbol: '📦',
    description: 'Browse our entire professional gym and fitness collection',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'dumbbells',
    name: 'Dumbbells',
    symbol: '🏋️',
    description: 'Chrome sets, heavy rubber hex dumbbells, accessories',
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'home-gym',
    name: 'Home Gym Equipment',
    symbol: '🏠',
    description: 'Smith machines, multi-stations, squat racks, high weight stacks',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'treadmills',
    name: 'Treadmills',
    symbol: '🏃',
    description: 'Commercial automatic grade treadmills and smart folding walking pads',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'exercise-bikes',
    name: 'Exercise Bikes',
    symbol: '🚴',
    description: 'High-inertia magnetic resistance spin cycles and studio cardio bikes',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'weight-benches',
    name: 'Weight Benches',
    symbol: '🛋️',
    description: 'Multi-adjustable utility flat, incline & decline benches',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'accessories',
    name: 'Fitness Accessories',
    symbol: '🎒',
    description: 'Resistance loop bands, core mats, yoga blocks, lifting belts',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=600&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '55kg Chrome Barbell and Dumbbell Dual Set',
    category: 'dumbbells',
    price: 185000,
    originalPrice: 220000,
    rating: 4.9,
    reviewsCount: 118,
    images: [
      'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A complete heavy duty storage box containing premium solid chrome extensions, spinlocks, and customized plate sets. Crafted with knurled grips for secure training. Perfect for home and luxury gym setups.',
    specifications: [
      '55kg total precision chrome plates',
      'High-impact protective wheels container case Included',
      '2x dumbbell bar handles (solid metal)',
      '1x convertible barbell connector / long bar',
      'Double-lock dynamic star collars with rubber gaskets'
    ],
    stockStatus: 'In Stock',
    isBestSeller: true
  },
  {
    id: 'p2',
    name: 'Pro Spin Exercise Bike FX-7',
    category: 'exercise-bikes',
    price: 280000,
    originalPrice: 340000,
    rating: 4.8,
    reviewsCount: 84,
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Ride with professional-grade momentum. Engineered with heavy-duty steel skeleton, ultra silent belt transmission system, and smooth stepless difficulty dial mechanism to simulate real road incline.',
    specifications: [
      'Heavy 18kg bidirectional solid steel flywheel',
      'Supports maximum rider weight of up to 150kg',
      'Adjustable performance saddle and safety cage pedals',
      'Onboard smart LCD monitor: Time, Speed, Distance, Calories, Pulse',
      'Integrated heavy duty cage drink holder'
    ],
    stockStatus: 'In Stock',
    isBestSeller: true
  },
  {
    id: 'p3',
    name: 'Bavidex Automatic Treadmill T-900',
    category: 'treadmills',
    price: 850000,
    originalPrice: 980000,
    rating: 5.0,
    reviewsCount: 62,
    images: [
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Industrial motor efficiency for top gear speed up to 18 km/h. Fitted with dual shock absorption deck system keeping your joint metrics safe, automated target-burn presets, and electric auto incline mechanisms.',
    specifications: [
      'Ultra Quiet 3.5 HP Continuous Duty DC Motor',
      '15-level smart automated power gradient incline',
      'Spacious multi-layer diamond textured running belt (1300x480mm)',
      'Rich wireless Bluetooth app sync and multi-channel built-in speakers',
      'Hydro-assist easy folding design for quick home vertical storage'
    ],
    stockStatus: 'In Stock',
    isBestSeller: true
  },
  {
    id: 'p4',
    name: 'Adjustable Weight Bench B-400',
    category: 'weight-benches',
    price: 145000,
    originalPrice: 180000,
    rating: 4.9,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An absolute beast of stability. Allows fast conversion from utility flat angles, commercial incline setups, and targeted abdominal decline angles to unlock premium dumbbell presses, flies, and core curls.',
    specifications: [
      'Supports structural loads of up to 400kg securely',
      '9 backrest angles & 4 convenient seat position parameters',
      'Dense sweat-resistant commercial leather padded cushions',
      'Reinforced front handle grip design & wheels for rapid transport',
      'Comfort-padded adjustable ankle rollers for decline grips'
    ],
    stockStatus: 'In Stock',
    isBestSeller: true
  },
  {
    id: 'p5',
    name: 'Multi-Station Home Gym Cable Machine',
    category: 'home-gym',
    price: 1350000,
    originalPrice: 1600000,
    rating: 4.9,
    reviewsCount: 39,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Consolidated commercial center in a modular frame footprint. Includes targeted high pulley lat bars, low pulley leg rows, targeted leg flex extension cylinders, chest butterfly press arm mechanisms, and heavy safety plates.',
    specifications: [
      '75kg structural steel selectorized solid weight block included',
      'Aviation heavy duty nylon pully wheels with ball bearings',
      'Integrated premium boxing punching bag with heavy chain hanger',
      'Robust structural mainframe engineered from 2mm thick oval tubes',
      'Thick memory foam lumbar guards for optimal safety alignments'
    ],
    stockStatus: 'Low Stock',
    isBestSeller: true
  },
  {
    id: 'p6',
    name: 'Premium Olympic Dumbbell Bar Set',
    category: 'dumbbells',
    price: 95000,
    originalPrice: 120000,
    rating: 4.7,
    reviewsCount: 54,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Heavy duty Olympic grade accessory handles designed for wide plate load capabilities. Knurled chrome finishes guarantee comfortable hand placements with heavy resistance limits.',
    specifications: [
      '2-inch sleeve diameter matching true standard Olympic weights',
      'Engineered with internal heavy needle bearings for slick rotation',
      '2x safety snap spring collars included',
      'High-grade steel construction resisting bend up to 250kg'
    ],
    stockStatus: 'In Stock'
  },
  {
    id: 'p7',
    name: 'Smart Compact Walking Pad M-300',
    category: 'treadmills',
    price: 240000,
    originalPrice: 290000,
    rating: 4.6,
    reviewsCount: 81,
    images: [
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Slip aerobic workouts beautifully under your standing desk workspace. Completely light-weight profiles with advanced LED indicators, variable speeds, and convenient remote control or auto pace pressure sensors.',
    specifications: [
      'Compact thickness: Only 12cm for convenient couch storage',
      'Flexible speed intervals ranging from 0.8 - 6.0 km/h',
      'Intelligent sensor system matching stride velocities',
      'Ultra quiet motor under 50dB keeping environment calm'
    ],
    stockStatus: 'In Stock'
  },
  {
    id: 'p8',
    name: 'Heavy Premium Non-Snap Loop Resistance Bands',
    category: 'accessories',
    price: 22000,
    originalPrice: 30000,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Say goodbye to pinching latex bands. Bavidex Premium high stretch fabric bands combine soft knit comfort with thick non-slip interior rubber grips. Perfect for hip extensions, warmups, and glute target sets.',
    specifications: [
      'Premium dynamic fabric mesh (never rolling or snapping)',
      '3 distinct resistance tiers: Light (15-25 lbs), Medium (25-35 lbs), Heavy (40-50 lbs)',
      'Breathable double thick knitting technology',
      'Includes premium mesh carrying case with instructional workout manual'
    ],
    stockStatus: 'In Stock'
  },
  {
    id: 'p9',
    name: 'WellCare Multipurpose Adjustable Stepper Bench',
    category: 'accessories',
    price: 45000,
    originalPrice: 55000,
    rating: 4.7,
    reviewsCount: 33,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Transformable 3-in-1 aerobic configuration: Stepper tool, incline training bench, and standard flat bench support. Outfitted with interior storage compartment to slide in resistance bands and active weight cylinders.',
    specifications: [
      'Supports strong static loads up to 150kg',
      'Dual adjustable heights: 20cm or 35cm profiles',
      'Non-slip textured surface for safe dynamic jumps',
      'Quick-click fold-out support legs'
    ],
    stockStatus: 'In Stock'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Deji Adeleke',
    role: 'Gym Owner & Elite Fitness Coach, Lagos',
    text: 'Bavidex completely revamped our Lekki studio workspace. The 55kg chrome dumbbell sets and commercial smith machines are built like tanks. Their nationwide delivery took only 2 days, and their after-sales support assist is top-tier.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    verificationBadge: true
  },
  {
    id: 't2',
    name: 'Chioma Nwachukwu',
    role: 'Home Gym Enthusiast, Abuja',
    text: 'I ordered the Bavidex FX-7 Spin Cycle and the premium resistance fabric bands. WhatsApp communications were extremely fluid. They walked me through assembly via video call. Incredible value for money, absolutely loving my morning workouts!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    verificationBadge: true
  },
  {
    id: 't3',
    name: 'Tunde Bakare',
    role: 'Corporate Wellness Program Director',
    text: 'Outstanding experience setting up our multi-floor corporate office physical gym. Bavidex consulted with architectural layouts, met all safety warranties, and provided professional grade weight benches at highly competitive rates.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    verificationBadge: true
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop',
    caption: 'Full multi-stack commercial smith machine gym build in Ikoyi, Lagos',
    tag: 'Gym Installations'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    caption: 'Aerobic fitness cluster featuring spin cycles FX-7 and treadmills',
    tag: 'Cardio Zones'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    caption: 'Dumbbell racks, custom dumbbells and multi-angle bench configurations',
    tag: 'Strength setups'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
    caption: 'Premium residential bedroom home gym layout with space-saving treadmill',
    tag: 'Home Gyms'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=800&auto=format&fit=crop',
    caption: 'Close-up of premium chrome barbell locks and knurled steel',
    tag: 'Equipment Detail'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=800&auto=format&fit=crop',
    caption: 'Professional trainer testing client workout bench parameters',
    tag: 'Workouts'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How do I place an order via WhatsApp?',
    answer: 'Simply add products to your cart on our website and click "Order via WhatsApp". This automatically opens WhatsApp with a pre-filled list of your items, prices, and shipping details, so our team can finalize your order instantly.'
  },
  {
    question: 'Do you deliver nationwide across Nigeria?',
    answer: 'Yes! We deliver across Nigeria. We offer speedy same-day or next-day delivery within Lagos (including Lekki, Victoria Island, Ikeja, Surulere) and secure, tracked delivery to other states (Abuja, Port Harcourt, Enugu, Ibadan, Kano, etc.) in 2-4 business days.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept secure Bank Transfers, debit/credit cards via online payment channels, and cash or transfer upon delivery for select orders within Lagos.'
  },
  {
    question: 'What is your product warranty policy?',
    answer: 'We stand by our quality. All our heavy gym equipment (treadmills, spin bikes, home gyms, benches) comes with a comprehensive 1-Year Bavidex Warranty covering structural frame repairs, motors, and mechanical components.'
  },
  {
    question: 'Can you assist in fully setting up a home or commercial gym?',
    answer: 'Yes! We offer professional consultation, spatial layout planning, and complete installation/setup services. Our experienced gym-design engineers will deliver and assemble all machines directly at your home, office, or commercial studio.'
  }
];
