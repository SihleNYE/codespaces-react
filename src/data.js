export const channels = [
  { user: 'alice', name: 'Alice Digital Studio', bio: 'Brand storyteller focused on lifestyle campaigns.', city: 'New York', country: 'USA' },
  { user: 'bob', name: 'Bob Ads Co.', bio: 'Conversion-first video ads for e-commerce companies.', city: 'Toronto', country: 'Canada' },
  { user: 'carol', name: 'Carol Social Lab', bio: 'Social-first ads and short-form content.', city: 'London', country: 'UK' },
];

export const ads = [
  {
    id: 1,
    owner: 'alice',
    category: 'brand',
    tags: ['Fitness', 'App', 'Lifestyle'],
    title: 'Zero-to-Hero Fitness App (YouTube)',
    description: '15s launch campaign that converts first-time users.',
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    cta: 'Try free for 30 days',
    priceUsd: 1500,
  },
  {
    id: 2,
    owner: 'bob',
    category: 'social',
    tags: ['Energy', 'IoT', 'Green'],
    title: 'EcoHome Thermostat (TikTok)',
    description: 'Short ads built for social feed engagements.',
    src: 'https://www.tiktok.com/@tiktok/video/123456789',
    cta: 'Shop now',
    priceUsd: 1200,
  },
  {
    id: 3,
    owner: 'carol',
    category: 'conversion',
    tags: ['Food', 'Delivery', 'Premium'],
    title: 'Gourmet Snacks (Instagram Reel)',
    description: '30s brand story with swipe-up link.',
    src: 'https://www.instagram.com/reel/C8abc123def/',
    cta: 'Order today',
    priceUsd: 900,
  },
  {
    id: 4,
    owner: 'alice',
    category: 'brand',
    tags: ['Demo', 'MP4'],
    title: 'Flower Ad (MP4 Fallback)',
    description: 'Direct MP4 video fallback.',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    cta: 'View demo',
    priceUsd: 500,
  },
];

export const availableCountries = [
  'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad',
  'Congo (Republic)', 'Congo (DRC)', "Côte d'Ivoire", 'Djibouti', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia',
  'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Madagascar', 'Malawi', 'Mali',
  'Mauritius', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles',
  'Sierra Leone', 'South Africa', 'South Sudan', 'Tanzania', 'Togo', 'Uganda', 'Zambia', 'Zimbabwe'
];

export const users = [
  { id: 1, username: 'alice', email: 'alice@example.com', password: 'pass123', country: 'USA', idNumber: 'A1001', whatsapp: '+11234567890', facebook: 'alice.digital' },
  { id: 2, username: 'bob', email: 'bob@example.com', password: 'pass123', country: 'Canada', idNumber: 'B1002', whatsapp: '+14161234567', facebook: 'bob.adsco' },
  { id: 3, username: 'carol', email: 'carol@example.com', password: 'pass123', country: 'UK', idNumber: 'C1003', whatsapp: '+447911123456', facebook: 'carol.sociallab' },
];

