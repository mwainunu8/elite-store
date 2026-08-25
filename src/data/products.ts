export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'phones' | 'watches' | 'ipods';
  price: number;
  storage?: string;
  ram?: string;
  description: string;
  image: string;
}

export const products: Product[] = [
  // Samsung Phones
  { id: 'sam-1', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'phones', price: 1250000, storage: '512GB', ram: '12GB', description: 'Ultimate flagship with S Pen and titanium design', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },
  { id: 'sam-2', name: 'Samsung Galaxy S24+', brand: 'Samsung', category: 'phones', price: 950000, storage: '256GB', ram: '12GB', description: 'Premium performance with AI features', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400' },
  { id: 'sam-3', name: 'Samsung Galaxy S24', brand: 'Samsung', category: 'phones', price: 750000, storage: '256GB', ram: '8GB', description: 'Compact flagship with stunning display', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400' },
  { id: 'sam-4', name: 'Samsung Galaxy A54', brand: 'Samsung', category: 'phones', price: 420000, storage: '128GB', ram: '8GB', description: 'Mid-range champion with flagship features', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { id: 'sam-5', name: 'Samsung Galaxy A34', brand: 'Samsung', category: 'phones', price: 320000, storage: '128GB', ram: '6GB', description: 'Great value with premium design', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { id: 'sam-6', name: 'Samsung Galaxy Z Fold5', brand: 'Samsung', category: 'phones', price: 1850000, storage: '512GB', ram: '12GB', description: 'Revolutionary foldable experience', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400' },

  // iPhone
  { id: 'iph-1', name: 'iPhone 15 Pro Max', brand: 'iPhone', category: 'phones', price: 1450000, storage: '512GB', ram: '8GB', description: 'Titanium design with A17 Pro chip', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400' },
  { id: 'iph-2', name: 'iPhone 15 Pro', brand: 'iPhone', category: 'phones', price: 1250000, storage: '256GB', ram: '8GB', description: 'Pro camera system with action button', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400' },
  { id: 'iph-3', name: 'iPhone 15 Plus', brand: 'iPhone', category: 'phones', price: 950000, storage: '256GB', ram: '6GB', description: 'Big screen with all-day battery', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400' },
  { id: 'iph-4', name: 'iPhone 15', brand: 'iPhone', category: 'phones', price: 850000, storage: '128GB', ram: '6GB', description: 'Dynamic Island comes to iPhone 15', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400' },
  { id: 'iph-5', name: 'iPhone 14', brand: 'iPhone', category: 'phones', price: 650000, storage: '128GB', ram: '6GB', description: 'Incredible value with proven performance', image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400' },
  { id: 'iph-6', name: 'iPhone SE (2022)', brand: 'iPhone', category: 'phones', price: 450000, storage: '64GB', ram: '4GB', description: 'Powerful chip in classic design', image: 'https://images.unsplash.com/photo-1624920365527-d8f7c70f0a03?w=400' },

  // Tecno
  { id: 'tec-1', name: 'Tecno Phantom X2 Pro', brand: 'Tecno', category: 'phones', price: 580000, storage: '256GB', ram: '12GB', description: 'Retractable portrait lens innovation', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { id: 'tec-2', name: 'Tecno Camon 20 Pro', brand: 'Tecno', category: 'phones', price: 320000, storage: '256GB', ram: '8GB', description: 'Professional photography on a budget', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { id: 'tec-3', name: 'Tecno Spark 20 Pro+', brand: 'Tecno', category: 'phones', price: 220000, storage: '256GB', ram: '8GB', description: 'Style meets performance', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400' },
  { id: 'tec-4', name: 'Tecno Pova 5 Pro', brand: 'Tecno', category: 'phones', price: 280000, storage: '256GB', ram: '8GB', description: 'Gaming powerhouse with massive battery', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400' },
  { id: 'tec-5', name: 'Tecno Camon 19 Pro', brand: 'Tecno', category: 'phones', price: 250000, storage: '128GB', ram: '8GB', description: 'RGBW sensor for low-light excellence', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400' },
  { id: 'tec-6', name: 'Tecno Spark 10 Pro', brand: 'Tecno', category: 'phones', price: 180000, storage: '128GB', ram: '8GB', description: 'Affordable style with great features', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },

  // Oppo
  { id: 'opp-1', name: 'OPPO Find X6 Pro', brand: 'Oppo', category: 'phones', price: 1150000, storage: '512GB', ram: '16GB', description: 'Hasselblad camera partnership', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { id: 'opp-2', name: 'OPPO Reno 10 Pro+', brand: 'Oppo', category: 'phones', price: 580000, storage: '256GB', ram: '12GB', description: 'Portrait expert with telephoto lens', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { id: 'opp-3', name: 'OPPO Reno 10', brand: 'Oppo', category: 'phones', price: 380000, storage: '256GB', ram: '8GB', description: 'Sleek design with versatile cameras', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400' },
  { id: 'opp-4', name: 'OPPO A98', brand: 'Oppo', category: 'phones', price: 320000, storage: '256GB', ram: '8GB', description: '67W fast charging capability', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400' },
  { id: 'opp-5', name: 'OPPO A78', brand: 'Oppo', category: 'phones', price: 250000, storage: '128GB', ram: '8GB', description: 'All-day battery with AMOLED display', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400' },
  { id: 'opp-6', name: 'OPPO A58', brand: 'Oppo', category: 'phones', price: 180000, storage: '128GB', ram: '6GB', description: 'Reliable performance at great price', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },

  // Nokia
  { id: 'nok-1', name: 'Nokia X30', brand: 'Nokia', category: 'phones', price: 450000, storage: '256GB', ram: '8GB', description: 'Sustainable flagship with PureView camera', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { id: 'nok-2', name: 'Nokia G60', brand: 'Nokia', category: 'phones', price: 320000, storage: '128GB', ram: '6GB', description: '5G speed with Nokia reliability', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { id: 'nok-3', name: 'Nokia G42', brand: 'Nokia', category: 'phones', price: 220000, storage: '128GB', ram: '6GB', description: 'Affordable 5G with QuickFix design', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400' },
  { id: 'nok-4', name: 'Nokia C32', brand: 'Nokia', category: 'phones', price: 120000, storage: '64GB', ram: '4GB', description: 'Durable design for everyday use', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400' },
  { id: 'nok-5', name: 'Nokia C22', brand: 'Nokia', category: 'phones', price: 95000, storage: '64GB', ram: '3GB', description: 'Essential smartphone features', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400' },
  { id: 'nok-6', name: 'Nokia 110 4G', brand: 'Nokia', category: 'phones', price: 35000, storage: '48MB', ram: '128MB', description: 'Classic design with modern connectivity', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },

  // Vivo
  { id: 'viv-1', name: 'Vivo X90 Pro+', brand: 'Vivo', category: 'phones', price: 1250000, storage: '512GB', ram: '12GB', description: 'ZEISS optics with gimbal stabilization', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { id: 'viv-2', name: 'Vivo V29 Pro', brand: 'Vivo', category: 'phones', price: 520000, storage: '256GB', ram: '12GB', description: 'Aura light portrait system', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { id: 'viv-3', name: 'Vivo V29', brand: 'Vivo', category: 'phones', price: 380000, storage: '256GB', ram: '8GB', description: 'Stunning portrait photography', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400' },
  { id: 'viv-4', name: 'Vivo Y100', brand: 'Vivo', category: 'phones', price: 280000, storage: '256GB', ram: '8GB', description: 'Stylish design with fast charging', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400' },
  { id: 'viv-5', name: 'Vivo Y56', brand: 'Vivo', category: 'phones', price: 180000, storage: '128GB', ram: '8GB', description: 'Big battery with smooth display', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400' },
  { id: 'viv-6', name: 'Vivo Y36', brand: 'Vivo', category: 'phones', price: 150000, storage: '128GB', ram: '8GB', description: 'Extended RAM for better multitasking', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },

  // Infinix
  { id: 'inf-1', name: 'Infinix Zero 30', brand: 'Infinix', category: 'phones', price: 350000, storage: '256GB', ram: '12GB', description: '4K selfie vlogging capability', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { id: 'inf-2', name: 'Infinix Note 30 Pro', brand: 'Infinix', category: 'phones', price: 280000, storage: '256GB', ram: '8GB', description: 'Wireless charging on a budget', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { id: 'inf-3', name: 'Infinix Hot 30', brand: 'Infinix', category: 'phones', price: 150000, storage: '128GB', ram: '8GB', description: 'Hot design with cool performance', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400' },
  { id: 'inf-4', name: 'Infinix Smart 8', brand: 'Infinix', category: 'phones', price: 95000, storage: '64GB', ram: '4GB', description: 'Smart features at entry level', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400' },
  { id: 'inf-5', name: 'Infinix GT 10 Pro', brand: 'Infinix', category: 'phones', price: 320000, storage: '256GB', ram: '8GB', description: 'Gaming beast with RGB lights', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400' },
  { id: 'inf-6', name: 'Infinix Note 30', brand: 'Infinix', category: 'phones', price: 180000, storage: '128GB', ram: '8GB', description: 'All-round performer', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },

  // Watches
  { id: 'wat-1', name: 'Apple Watch Ultra 2', brand: 'Apple', category: 'watches', price: 980000, description: 'Adventure-ready titanium smartwatch', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400' },
  { id: 'wat-2', name: 'Apple Watch Series 9', brand: 'Apple', category: 'watches', price: 520000, description: 'Advanced health and fitness tracking', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { id: 'wat-3', name: 'Samsung Galaxy Watch 6', brand: 'Samsung', category: 'watches', price: 380000, description: 'Sleek design with Wear OS', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { id: 'wat-4', name: 'Samsung Galaxy Watch 6 Classic', brand: 'Samsung', category: 'watches', price: 450000, description: 'Rotating bezel with premium build', image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=400' },
  { id: 'wat-5', name: 'Garmin Fenix 7', brand: 'Garmin', category: 'watches', price: 680000, description: 'Ultimate multisport GPS watch', image: 'https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=400' },
  { id: 'wat-6', name: 'Fitbit Sense 2', brand: 'Fitbit', category: 'watches', price: 320000, description: 'Advanced health and stress tracking', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { id: 'wat-7', name: 'Amazfit GTR 4', brand: 'Amazfit', category: 'watches', price: 250000, description: '150+ sports modes with GPS', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400' },
  { id: 'wat-8', name: 'Huawei Watch GT 4', brand: 'Huawei', category: 'watches', price: 320000, description: 'Elegant design with health monitoring', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },

  // iPods
  { id: 'ipd-1', name: 'iPod Touch 7th Gen', brand: 'Apple', category: 'ipods', price: 280000, storage: '128GB', description: 'Portable entertainment powerhouse', image: 'https://images.unsplash.com/photo-1535055211509-84e4c87c9a8c?w=400' },
  { id: 'ipd-2', name: 'iPod Touch 7th Gen 256GB', brand: 'Apple', category: 'ipods', price: 380000, storage: '256GB', description: 'Maximum storage for your music', image: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=400' },
  { id: 'ipd-3', name: 'iPod Classic 160GB', brand: 'Apple', category: 'ipods', price: 580000, storage: '160GB', description: 'Legendary collector\'s edition', image: 'https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?w=400' },
  { id: 'ipd-4', name: 'iPod Nano 16GB', brand: 'Apple', category: 'ipods', price: 180000, storage: '16GB', description: 'Compact design for workouts', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { id: 'ipd-5', name: 'iPod Shuffle 2GB', brand: 'Apple', category: 'ipods', price: 85000, storage: '2GB', description: 'Clip-on music companion', image: 'https://images.unsplash.com/photo-1494366874395-e5e128f9a64e?w=400' },
  { id: 'ipd-6', name: 'iPod Mini 4GB', brand: 'Apple', category: 'ipods', price: 120000, storage: '4GB', description: 'Vintage style for collectors', image: 'https://images.unsplash.com/photo-1589491106922-5f8f0b0c0a0f?w=400' },
];

export const phoneBrands = ['Samsung', 'iPhone', 'Tecno', 'Oppo', 'Nokia', 'Vivo', 'Infinix'];
export const watchBrands = ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Amazfit', 'Huawei'];
export const categories = ['phones', 'watches', 'ipods'] as const;

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
  }).format(price);
};
