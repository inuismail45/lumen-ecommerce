/**
 * LUMEN Luxury Lifestyle & Audio-Visual Tech
 * Centralized Product Catalogue & Configuration Data
 */

export const CATEGORIES = [
  { id: 'audio', name: 'Acoustics & Audio', icon: 'headphones', count: 4, desc: 'Studio-grade acoustic monitors and wireless spatial audio.' },
  { id: 'wearables', name: 'Wearable Tech', icon: 'watch', count: 4, desc: 'Precision titanium chronographs and biometric health instruments.' },
  { id: 'workspace', name: 'Living & Workspace', icon: 'layout', count: 4, desc: 'Ergonomic architectural fixtures, ambient lights, and minimalist docks.' },
  { id: 'travel', name: 'Travel & Carry', icon: 'briefcase', count: 4, desc: 'Weatherproof ballistic nylon packs and Italian full-grain leather sleeves.' }
];

export const PRODUCTS = [
  {
    id: 'lmn-01',
    name: 'Horizon Studio Wireless ANC Headphones',
    slug: 'horizon-studio-wireless',
    category: 'audio',
    categoryName: 'Acoustics & Audio',
    price: 389.00,
    originalPrice: 449.00,
    discount: 13,
    rating: 4.9,
    reviewsCount: 168,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    stockCount: 14,
    badge: 'Best Seller',
    tagline: 'Custom 40mm bio-cellulose drivers with adaptive spatial active noise cancellation.',
    shortDescription: 'The pinnacle of acoustic engineering. Crafted from aerospace-grade aluminum and supple memory-mesh earcups for unrivaled listening immersion.',
    fullDescription: 'The Horizon Studio Wireless transcends everyday audio. Equipped with custom-tuned 40mm biocellulose dynamic drivers and a quad-microphone hybrid ANC array, it eliminates up to 98.6% of ambient disturbance. Features custom spatial audio tracking, Bluetooth 5.4 lossless codec support, and an astounding 52-hour battery life with ultra-fast Type-C charging.',
    features: [
      'Hybrid Adaptive ANC with Transparency Mode',
      'Lossless Hi-Res Audio certification (LDAC & aptX HD)',
      'Up to 52 hours continuous playback with ANC off (42h with ANC)',
      'Aircraft-grade milled aluminum chassis with magnetic lambskin pads',
      'Dual-device multipoint Bluetooth 5.4 connection'
    ],
    specs: {
      'Driver Size': '40mm Custom Bio-Cellulose',
      'Frequency Response': '10Hz – 40,000Hz',
      'Battery Life': 'Up to 52 Hours',
      'Charging Time': '15 mins for 6 hours playback',
      'Weight': '265g (9.34 oz)',
      'Connectivity': 'Bluetooth 5.4, 3.5mm Analog, USB-C Lossless'
    },
    colors: [
      { name: 'Matte Obsidian', hex: '#1C1D21', code: 'obsidian' },
      { name: 'Titanium Silver', hex: '#D1D5DB', code: 'silver' },
      { name: 'Champagne Dune', hex: '#D7C4A5', code: 'champagne' }
    ],
    sizes: ['Standard Fit'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-02',
    name: 'Pulse Spatial Acoustic Soundbar',
    slug: 'pulse-spatial-soundbar',
    category: 'audio',
    categoryName: 'Acoustics & Audio',
    price: 649.00,
    originalPrice: 720.00,
    discount: 10,
    rating: 4.8,
    reviewsCount: 94,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    stockCount: 8,
    badge: 'New Release',
    tagline: '11 precision drivers with integrated Dolby Atmos and acoustic beamforming.',
    shortDescription: 'Cinematic room-filling sound in an ultra-slim architectural profile wrapped in acoustic Kvadrat wool.',
    fullDescription: 'Designed for discerning interiors and home theaters, the Pulse Spatial Soundbar delivers room-calibrated Dolby Atmos 7.1.2 virtualization without the need for satellite speakers. Featuring integrated dual down-firing subwoofers and eARC HDMI 2.1.',
    features: [
      'Dolby Atmos and DTS:X 3D spatial acoustic processing',
      'Integrated dual subwoofers with low-frequency resonance chambers',
      'Kvadrat acoustic wool blend exterior with anodized aluminum cap',
      'HDMI eARC, Optical, AirPlay 2, and Spotify Connect native support',
      'Automatic room room-correction calibration via smartphone mic'
    ],
    specs: {
      'Channels': '7.1.2 Virtual Spatial',
      'Total Output': '380W RMS',
      'Dimensions': '980 x 68 x 115 mm',
      'Weight': '4.8 kg',
      'Inputs': 'HDMI eARC 2.1, Optical Toslink, AirPlay 2, BT 5.3'
    },
    colors: [
      { name: 'Graphite Black', hex: '#18181B', code: 'graphite' },
      { name: 'Nordic Gray', hex: '#9CA3AF', code: 'nordic' }
    ],
    sizes: ['Standard (980mm)'],
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-03',
    name: 'Aura Studio Portable Acoustic Pod',
    slug: 'aura-portable-acoustic-pod',
    category: 'audio',
    categoryName: 'Acoustics & Audio',
    price: 219.00,
    originalPrice: 249.00,
    discount: 12,
    rating: 4.7,
    reviewsCount: 112,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    stockCount: 22,
    badge: 'Popular',
    tagline: '360° omnidirectional acoustic dispersion with IP67 waterproofing.',
    shortDescription: 'Carry high-fidelity acoustic performance anywhere. 24-hour battery with inductive charging ring.',
    fullDescription: 'The Aura Pod redefines portable fidelity with dual opposing passive radiators and an upward-firing neodymium driver. Encased in a ruggedized unibody silicone and aluminum shell that is completely dustproof and submersible up to 1 meter.',
    features: [
      'True 360-degree high-definition soundstage',
      'IP67 dust and waterproof rating for outdoor exploration',
      'PartySync link to chain up to 50 Lumen audio devices',
      'Wireless Qi charging dock included in the box',
      'Integrated woven climbing-grade carry lanyard'
    ],
    specs: {
      'Water Resistance': 'IP67 Submersible',
      'Battery Life': '24 Hours at 65% volume',
      'Frequency Range': '48Hz – 22,000Hz',
      'Weight': '540g'
    },
    colors: [
      { name: 'Slate Teal', hex: '#1E3A3A', code: 'slate-teal' },
      { name: 'Desert Clay', hex: '#B4654A', code: 'clay' },
      { name: 'Frost White', hex: '#F3F4F6', code: 'frost' }
    ],
    sizes: ['Compact'],
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-04',
    name: 'Vessel True Wireless Earbuds Pro',
    slug: 'vessel-true-wireless-earbuds-pro',
    category: 'audio',
    categoryName: 'Acoustics & Audio',
    price: 199.00,
    originalPrice: 229.00,
    discount: 13,
    rating: 4.8,
    reviewsCount: 89,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    stockCount: 17,
    badge: 'New',
    tagline: 'Custom silicone canal fit with active pressure-venting and bone-conduction mics.',
    shortDescription: 'Weightless comfort meets studio clarity. 38 hours of total reserve in a brushed pebble case.',
    fullDescription: 'Sculpted from 3D anatomical ear scans to provide an unshakeable seal without ear fatigue. Features custom 11mm graphene drivers, capacitive touch surfaces, and crystal-clear wind-shielded microphones.',
    features: [
      'Intelligent Noise Shielding up to -45dB',
      'Pebble wireless charging case with magnetic lid closure',
      'Ultra-low 45ms gaming and video latency mode',
      'IPX5 sweat and moisture resistance',
      'Find My Beacon acoustic location tracking'
    ],
    specs: {
      'Battery Life': '9 hours per earbud + 29 hours in case',
      'Bluetooth': '5.4 with LE Audio & LC3',
      'Weight': '4.6g per earbud'
    },
    colors: [
      { name: 'Pure Onyx', hex: '#111827', code: 'onyx' },
      { name: 'Pearl Bone', hex: '#E5E7EB', code: 'bone' }
    ],
    sizes: ['Universal (S/M/L tips included)'],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-05',
    name: 'Chrono Titan Luxury Smartwatch',
    slug: 'chrono-titan-smartwatch',
    category: 'wearables',
    categoryName: 'Wearable Tech',
    price: 499.00,
    originalPrice: 579.00,
    discount: 14,
    rating: 4.9,
    reviewsCount: 230,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    stockCount: 11,
    badge: 'Flagship',
    tagline: 'Grade-5 forged titanium with sapphire crystal lens and 14-day continuous battery.',
    shortDescription: 'Haute horlogerie meets modern intelligence. Always-on AMOLED display with comprehensive heart & ECG bio-sensors.',
    fullDescription: 'The Chrono Titan combines traditional Swiss watch finishing with biometric sensors. Milled from aerospace Grade-5 titanium and topped with synthetic sapphire crystal that is virtually scratch-proof. Tracks SpO2, HRV, sleep stages, VO2 max, and multi-band GNSS outdoor navigation.',
    features: [
      'Grade 5 forged titanium bezel and ceramic rear casing',
      '1.43-inch 466x466 Always-On Retina AMOLED display (1,200 nits)',
      '14-day battery life with intelligent sensor throttling',
      'Dual-frequency GPS + GLONASS + Galileo satellite positioning',
      '100m (10 ATM) dive-ready water resistance rating'
    ],
    specs: {
      'Case Diameter': '45mm',
      'Thickness': '10.8mm',
      'Glass': 'Double-Domed Sapphire Crystal',
      'Water Resistance': '10 ATM (100 meters)',
      'Battery': '500mAh Li-Po, 14 days normal use',
      'Sensors': 'Optical PPG ECG, SpO2, Barometer, Gyroscope'
    },
    colors: [
      { name: 'Brushed Titanium', hex: '#94A3B8', code: 'titanium' },
      { name: 'Midnight DLC', hex: '#1E293B', code: 'midnight' },
      { name: 'Rose Gold Accent', hex: '#C28876', code: 'rosegold' }
    ],
    sizes: ['42mm Case', '46mm Case'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-06',
    name: 'Vantage Biometric Smart Ring',
    slug: 'vantage-smart-ring',
    category: 'wearables',
    categoryName: 'Wearable Tech',
    price: 289.00,
    originalPrice: 320.00,
    discount: 10,
    rating: 4.8,
    reviewsCount: 77,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    stockCount: 19,
    badge: 'Trending',
    tagline: 'Ultra-lightweight medical grade titanium ring for non-intrusive health tracking.',
    shortDescription: 'Zero screens. Pure insight. Continuous body temperature, sleep recovery, and stress monitoring.',
    fullDescription: 'Weighing less than 4 grams, the Vantage Smart Ring offers discreet 24/7 biometric tracking. Inner medical-grade non-allergenic resin houses micro-sensors measuring arterial blood flow directly from your finger pulse.',
    features: [
      'Non-invasive cardiovascular & sleep tracking',
      '7 days battery life on a single 45-minute charge',
      'Waterproof up to 50 meters (shower, swimming, sauna safe)',
      'No subscription fees required forever',
      'Includes complimentary ring sizing kit'
    ],
    specs: {
      'Material': 'Titanium Exterior with PVD Coating',
      'Weight': '3.2 to 3.8 grams (depending on size)',
      'Water Resistance': '50 meters'
    },
    colors: [
      { name: 'Polished Stealth Black', hex: '#0B0F19', code: 'stealth' },
      { name: 'Brushed Silver', hex: '#CBD5E1', code: 'silver' },
      { name: 'Mirror Gold', hex: '#D4AF37', code: 'gold' }
    ],
    sizes: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-07',
    name: 'Apex Precision Sport Chronograph',
    slug: 'apex-sport-chronograph',
    category: 'wearables',
    categoryName: 'Wearable Tech',
    price: 349.00,
    originalPrice: 389.00,
    discount: 10,
    rating: 4.7,
    reviewsCount: 65,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    stockCount: 15,
    badge: 'Performance',
    tagline: 'High-visibility hybrid sports watch with solar dial charging capability.',
    shortDescription: 'Constructed for endurance athletes. Reinforced carbon-composite bezel with fluoropolymer sweat-repellent band.',
    fullDescription: 'The Apex combines the legibility of high-contrast analog luminous hands with a discreet hidden OLED sub-matrix that reveals notifications and pace splits when you raise your wrist.',
    features: [
      'Solar-assisted charging provides endless standby time',
      'Super-LumiNova BGW9 luminous indices',
      'Reinforced carbon-fiber composite core',
      'Advanced triathlon and trail running metrics'
    ],
    specs: {
      'Diameter': '44mm',
      'Case Material': 'Forged Carbon Fiber & Steel',
      'Battery': 'Solar Powered + 21 Day Standby'
    },
    colors: [
      { name: 'Carbon Black', hex: '#111111', code: 'carbon' },
      { name: 'Signal Orange', hex: '#EA580C', code: 'orange' }
    ],
    sizes: ['One Size (Adjustable strap)'],
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-08',
    name: 'Aether Leather Chrono Band & Case',
    slug: 'aether-leather-chrono-band',
    category: 'wearables',
    categoryName: 'Wearable Tech',
    price: 119.00,
    originalPrice: 139.00,
    discount: 14,
    rating: 4.9,
    reviewsCount: 52,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    stockCount: 26,
    badge: 'Handcrafted',
    tagline: 'Horween vegetable-tanned leather with quick-release titanium deployant clasp.',
    shortDescription: 'Elevate your wearable into formal luxury. Hand-stitched in Tuscany with edge-burnished edges.',
    fullDescription: 'Crafted from world-renowned full-grain Horween leather that develops an exquisite golden patina over years of wear. Paired with custom CNC-machined titanium hardware.',
    features: [
      'Vegetable-tanned full grain Tuscan leather',
      'Titanium micro-adjustable deployant clasp',
      'Universal quick-release spring bars (20mm & 22mm)',
      'Water-resistant nubuck interior lining'
    ],
    specs: {
      'Lug Width': '20mm & 22mm options',
      'Leather Origin': 'Tuscany, Italy'
    },
    colors: [
      { name: 'Bourbon Saddle', hex: '#854D0E', code: 'saddle' },
      { name: 'Espresso Dark Brown', hex: '#451A03', code: 'espresso' },
      { name: 'Coal Black', hex: '#18181B', code: 'black' }
    ],
    sizes: ['20mm Lug', '22mm Lug'],
    images: [
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-09',
    name: 'Lumina Architectural Desk Task Luminaire',
    slug: 'lumina-desk-task-luminaire',
    category: 'workspace',
    categoryName: 'Living & Workspace',
    price: 249.00,
    originalPrice: 289.00,
    discount: 14,
    rating: 4.9,
    reviewsCount: 141,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    stockCount: 16,
    badge: 'Design Award',
    tagline: 'CRI 98+ sun-synchronized circadian illumination with stepless touch dimming.',
    shortDescription: 'Eliminate eye strain and elevate your workspace. Precision counter-balanced arm crafted from matte anodized alloy.',
    fullDescription: 'The Lumina Luminaire casts an even 120-degree pool of light with zero flicker and true color rendering (CRI 98). Features intelligent auto-dimming ambient sensors and integrated touch slider for customized warm-to-cool Kelvin tuning (2700K – 6500K).',
    features: [
      'Full-spectrum LED chip with ultra-high CRI 98+ color accuracy',
      'Circadian tracking mode matches natural outdoor daylight rhythms',
      'Zero-glare asymmetrical optical prism lens',
      'Cast iron weighted base with integrated USB-C 30W charging port',
      'Precision fluid-damped multi-axis rotational joints'
    ],
    specs: {
      'Brightness': 'Up to 1,200 Lux at 45cm',
      'Color Temp': '2700K – 6500K Adjustable',
      'Power Consumption': '18W Max',
      'Weight': '3.4 kg (stable anti-tip base)'
    },
    colors: [
      { name: 'Space Black', hex: '#1E293B', code: 'space-black' },
      { name: 'Lunar Silver', hex: '#E2E8F0', code: 'lunar' }
    ],
    sizes: ['Desk Stand Model', 'Clamp Arm Model'],
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-10',
    name: 'MagStand 3-in-1 Magnetic Fast Charger',
    slug: 'magstand-magnetic-fast-charger',
    category: 'workspace',
    categoryName: 'Living & Workspace',
    price: 139.00,
    originalPrice: 169.00,
    discount: 18,
    rating: 4.8,
    reviewsCount: 185,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    stockCount: 30,
    badge: 'Popular',
    tagline: 'Simultaneous 15W Qi2 wireless charging for phone, earbuds, and smartwatch.',
    shortDescription: 'CNC-carved solid aluminum pedestal. Minimalist desk organization with floating magnetic snap.',
    fullDescription: 'Declutter your workspace with one graceful power sculpture. Uses calibrated rare-earth magnets to suspend your smartphone at the optimal 45-degree FaceTime angle while simultaneously powering your smartwatch and earbuds.',
    features: [
      'Qi2 Certified 15W peak fast magnetic induction',
      'Solid CNC aluminum body with weighted silicone non-slip foundation',
      'Smart thermal dissipation prevents device throttling',
      'Includes premium 65W braided GaN power supply'
    ],
    specs: {
      'Outputs': '15W Phone + 5W Watch + 5W Earbuds',
      'Weight': '420g',
      'Finish': 'Sandblasted Anodized Aluminum'
    },
    colors: [
      { name: 'Dark Slate', hex: '#1F2937', code: 'slate' },
      { name: 'Anodized Silver', hex: '#D1D5DB', code: 'silver' }
    ],
    sizes: ['Standard'],
    images: [
      'https://images.unsplash.com/photo-1622445268462-337fbf7de576?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-11',
    name: 'Orbit Minimalist Walnut Monitor Stand',
    slug: 'orbit-walnut-monitor-stand',
    category: 'workspace',
    categoryName: 'Living & Workspace',
    price: 159.00,
    originalPrice: 180.00,
    discount: 12,
    rating: 4.9,
    reviewsCount: 68,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    stockCount: 12,
    badge: 'New',
    tagline: 'Sustainably harvested American walnut with laser-cut powder-coated steel legs.',
    shortDescription: 'Ergonomic screen elevation with dedicated keyboard stash and cable management runway.',
    fullDescription: 'Hand-finished with natural Danish oils to bring out the distinctive grain of solid walnut hardwood. Elevates monitors by 95mm for an ergonomically aligned posture while creating clean hidden storage beneath.',
    features: [
      'Solid American Black Walnut hardwood',
      'Supports monitors up to 49" ultrawide (holds up to 45kg / 100 lbs)',
      'Integrated rear magnetic cable routing channel',
      'Cork footpads protect delicate desktop surfaces'
    ],
    specs: {
      'Dimensions': '1050 x 230 x 95 mm',
      'Max Load': '45 kg (100 lbs)',
      'Material': 'American Walnut & 12-gauge Steel'
    },
    colors: [
      { name: 'Natural Walnut', hex: '#583A26', code: 'walnut' },
      { name: 'Nordic White Oak', hex: '#B89778', code: 'oak' }
    ],
    sizes: ['Single Screen (600mm)', 'Dual Screen (1050mm)'],
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-12',
    name: 'Echo Smart Hepa-13 Air Purifier',
    slug: 'echo-smart-hepa13-air-purifier',
    category: 'workspace',
    categoryName: 'Living & Workspace',
    price: 329.00,
    originalPrice: 380.00,
    discount: 13,
    rating: 4.7,
    reviewsCount: 88,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    stockCount: 9,
    badge: 'Clean Air',
    tagline: 'Whisper-quiet laser-particle air filtration wrapped in architectural wool knit.',
    shortDescription: 'Captures 99.97% of airborne particulate down to 0.1 microns. Near-silent 19dB sleep mode.',
    fullDescription: 'Engineered for modern urban apartments and creative studios. Features 3-stage filtration with Medical Grade H13 HEPA and active coconut carbon honeycombs that neutralize VOCs, odors, and fine dust.',
    features: [
      'Dual laser PM2.5 real-time air quality indicator light',
      'Cleans 500 sq ft room in just 14 minutes (CADR 340 m³/h)',
      'Ultra-silent night mode operates at undetectable 19 dBA',
      'Smart home integration via Matter and HomeKit'
    ],
    specs: {
      'Coverage': 'Up to 650 sq ft',
      'Filter Life': '8 – 12 Months',
      'Noise Level': '19 – 46 dBA'
    },
    colors: [
      { name: 'Chalk White', hex: '#F4F4F5', code: 'chalk' },
      { name: 'Charcoal Texture', hex: '#27272A', code: 'charcoal' }
    ],
    sizes: ['Compact Room', 'Studio Large'],
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-13',
    name: 'Aerolite Modular 24L Tech Commuter Pack',
    slug: 'aerolite-modular-tech-pack',
    category: 'travel',
    categoryName: 'Travel & Carry',
    price: 249.00,
    originalPrice: 289.00,
    discount: 14,
    rating: 4.9,
    reviewsCount: 156,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    stockCount: 18,
    badge: 'Award Winner',
    tagline: 'Cordura® ballistic nylon with magnetic Fidlock® hardware and suspended 16" laptop vault.',
    shortDescription: 'The ultimate weather-sealed pack for digital creatives. 180° clamshell opening with modular dividers.',
    fullDescription: 'Engineered to withstand daily city commutes and international travel alike. Made from ultra-dense 840D recycled Cordura with waterproof YKK Aquaguard zippers. Features a false-bottom suspended shock-absorbing laptop chamber that shields your machine from sudden drops.',
    features: [
      'Weatherproof 840D recycled ballistic nylon construction',
      'Suspended protective compartment fits up to 16-inch laptops',
      'German-engineered Fidlock magnetic quick-release chest buckle',
      'Hidden passport and AirTag tracking pocket in lumbar cushion',
      'Luggage pass-through strap for rolling suitcase integration'
    ],
    specs: {
      'Capacity': '24 Liters',
      'Dimensions': '480 x 310 x 170 mm',
      'Weight': '1.18 kg',
      'Zippers': 'YKK AquaGuard Weather-Shield'
    },
    colors: [
      { name: 'Stealth Black', hex: '#18181B', code: 'black' },
      { name: 'Coyote Sand', hex: '#A18262', code: 'sand' },
      { name: 'Forest Olive', hex: '#374136', code: 'olive' }
    ],
    sizes: ['24L Daypack'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-14',
    name: 'Vector Italian Leather EDC Sling',
    slug: 'vector-leather-edc-sling',
    category: 'travel',
    categoryName: 'Travel & Carry',
    price: 179.00,
    originalPrice: 199.00,
    discount: 10,
    rating: 4.8,
    reviewsCount: 83,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    stockCount: 14,
    badge: 'New',
    tagline: 'Minimalist crossbody sling crafted from supple Nappa leather with expandable volume.',
    shortDescription: 'Streamlined everyday carry. Perfectly holds an 11" tablet, headphones, camera, and essentials.',
    fullDescription: 'The Vector Sling is built for hands-free agility. Features a self-adjusting ergonomic nylon webbing strap that cinches flat when lightly loaded and expands effortlessly to accommodate extra gear.',
    features: [
      'Full grain Italian Nappa leather with water-resistant treatment',
      'Padded micro-fleece pocket holds iPad Pro 11-inch or Kindle',
      'Reversible ambidextrous strap for left or right shoulder wear',
      'Magnetic key tether with one-hand release'
    ],
    specs: {
      'Volume': '4.5L – 6.5L Expandable',
      'Weight': '420g',
      'Material': 'Italian Nappa & Ripstop Nylon'
    },
    colors: [
      { name: 'Obsidian Black', hex: '#18181B', code: 'black' },
      { name: 'Cognac Tan', hex: '#9A5B32', code: 'cognac' }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-15',
    name: 'AeroShell Polycarbonate Carry-On Suite',
    slug: 'aeroshell-polycarbonate-carry-on',
    category: 'travel',
    categoryName: 'Travel & Carry',
    price: 369.00,
    originalPrice: 420.00,
    discount: 12,
    rating: 4.9,
    reviewsCount: 119,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    stockCount: 7,
    badge: 'Popular',
    tagline: 'German Makrolon® polycarbonate with 360° whisper Hinomoto spinner wheels.',
    shortDescription: 'Travel without compromise. Ultra-resilient hardshell with front quick-access laptop bay.',
    fullDescription: 'Engineered for seamless international flights. The exterior German Makrolon polycarbonate bends under extreme pressure without cracking. Features TSA-approved combination locks, integrated compression pads, and smooth Hinomoto Japanese ball-bearing silent wheels.',
    features: [
      'Aerospace grade Makrolon® 100% polycarbonate shell',
      'Quick-access front pocket for laptop, passport, and tablet',
      'Japanese Hinomoto 360-degree whisper-glide spinner wheels',
      'Integrated TSA dual-entry combination locking mechanism'
    ],
    specs: {
      'Volume': '38 Liters (Fits international overhead bins)',
      'Dimensions': '550 x 355 x 230 mm',
      'Weight': '3.3 kg'
    },
    colors: [
      { name: 'Matte Gunmetal', hex: '#374151', code: 'gunmetal' },
      { name: 'Deep Navy', hex: '#1E3A8A', code: 'navy' },
      { name: 'Ceramic Ivory', hex: '#E5E7EB', code: 'ivory' }
    ],
    sizes: ['Cabin Carry-On (21")'],
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'lmn-16',
    name: 'Field Magnetic Tech Organizer Folio',
    slug: 'field-magnetic-tech-organizer',
    category: 'travel',
    categoryName: 'Travel & Carry',
    price: 95.00,
    originalPrice: 110.00,
    discount: 14,
    rating: 4.8,
    reviewsCount: 64,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    stockCount: 25,
    badge: 'Essential',
    tagline: 'Waterproof zippered folio for cables, chargers, drives, and stylus.',
    shortDescription: 'Tame your digital cables. Elastic retention loops with magnetic mesh compartments.',
    fullDescription: 'Never untangle another cable. The Field Folio opens completely flat like a book, presenting your chargers, power banks, memory cards, and pens in dedicated, labeled elastic compartments.',
    features: [
      'Structured semi-rigid exterior shell prevents crushing',
      '12 elastic webbing channels for cables and adapters',
      'Zippered scratch-proof micro-mesh pocket for loose items',
      'Exterior water-repellent coating'
    ],
    specs: {
      'Dimensions': '240 x 160 x 50 mm',
      'Weight': '210g'
    },
    colors: [
      { name: 'Charcoal Twill', hex: '#27272A', code: 'charcoal' },
      { name: 'Earth Stone', hex: '#78716C', code: 'stone' }
    ],
    sizes: ['Compact EDC'],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80'
    ]
  }
];

export const COUPONS = {
  'LUMEN20': { code: 'LUMEN20', type: 'percentage', value: 20, desc: '20% off entire order' },
  'WELCOME10': { code: 'WELCOME10', type: 'fixed', value: 10, desc: '$10 off your first purchase' },
  'FREESHIP': { code: 'FREESHIP', type: 'free_shipping', value: 0, desc: 'Free Express Courier Shipping' }
};

export const TESTIMONIALS = [
  {
    name: 'Elena Rostova',
    role: 'Industrial Designer, Stockholm',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The Horizon Studio Wireless headphones are not just audio gear; they are sculptural art. The CNC aluminum craftsmanship and acoustic isolation match gear twice their price.',
    product: 'Horizon Studio Wireless',
    verified: true
  },
  {
    name: 'Marcus Vance',
    role: 'Creative Director, London',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Shipping arrived in Berlin in under 36 hours in sustainable embossed packaging. The Chrono Titan has completely replaced my traditional Swiss automatics for daily wear.',
    product: 'Chrono Titan Luxury Smartwatch',
    verified: true
  },
  {
    name: 'Aria Chen',
    role: 'Architect & Urban Planner, Tokyo',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The Lumina Task Luminaire transformed my architectural drafting studio. The circadian light tracking makes 12-hour design sprints effortless on the eyes.',
    product: 'Lumina Architectural Luminaire',
    verified: true
  }
];

export const FAQS = [
  {
    category: 'Orders & Delivery',
    q: 'How fast is worldwide shipping and how can I track my order?',
    a: 'We provide complimentary carbon-neutral Express shipping worldwide on all orders over $150. Orders are dispatched from our fulfillment hubs in Frankfurt, California, and Singapore within 24 hours. You receive live SMS and email tracking links the moment your parcel leaves our studio.'
  },
  {
    category: 'Orders & Delivery',
    q: 'What is your 30-day home trial and return policy?',
    a: 'We want you to experience LUMEN acoustic and lifestyle products in your everyday space. We offer a 30-day, no-questions-asked in-home trial. If you are not completely enchanted, request a prepaid return label via our returns portal for a 100% full refund.'
  },
  {
    category: 'Warranty & Craft',
    q: 'What warranty is included with LUMEN electronics?',
    a: 'Every electronic and acoustic device carries our comprehensive 2-Year International Limited Warranty. This covers any manufacturing defects, battery performance degradation, or internal driver anomalies. We replace or repair items with priority courier turnaround.'
  },
  {
    category: 'Payment & Security',
    q: 'What payment methods do you accept and is checkout secure?',
    a: 'We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and discreet wire transfers. All transactions are protected by end-to-end 256-bit AES encryption with Level 1 PCI-DSS compliance.'
  },
  {
    category: 'Sustainability',
    q: 'How does LUMEN approach sustainability and environmental impact?',
    a: 'All our packaging is 100% plastic-free, made from FSC-certified recycled paper and printed with non-toxic soy inks. Our aluminum components use a minimum of 75% recycled aerospace alloy, and we offset 100% of carbon emissions for every parcel shipped.'
  }
];
