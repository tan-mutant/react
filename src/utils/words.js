export const WORDS = [
  'APPLE',
  'BEACH',
  'CLOUD',
  'DREAM',
  'EARTH',
  'FLAME',
  'GHOST',
  'HEART',
  'JUICE',
  'KNIFE',
  'LIGHT',
  'MONEY',
  'NIGHT',
  'OCEAN',
  'PIANO',
  'QUEEN',
  'RADIO',
  'SMILE',
  'TIGER',
  'VOICE',
  'WATER',
  'YOUTH',
  'XENON',
  'YELLOW',
  'ZEBRA'
];

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}; 