import { KeyboardRow, Level } from './types';

// Standard Estonian Layout approximation for teaching
export const KEYBOARD_LAYOUT: KeyboardRow[] = [
  {
    keys: [
      { label: 'Q', code: 'KeyQ', finger: 'pinky', hand: 'left' },
      { label: 'W', code: 'KeyW', finger: 'ring', hand: 'left' },
      { label: 'E', code: 'KeyE', finger: 'middle', hand: 'left' },
      { label: 'R', code: 'KeyR', finger: 'index', hand: 'left' },
      { label: 'T', code: 'KeyT', finger: 'index', hand: 'left' },
      { label: 'Y', code: 'KeyY', finger: 'index', hand: 'right' },
      { label: 'U', code: 'KeyU', finger: 'index', hand: 'right' },
      { label: 'I', code: 'KeyI', finger: 'middle', hand: 'right' },
      { label: 'O', code: 'KeyO', finger: 'ring', hand: 'right' },
      { label: 'P', code: 'KeyP', finger: 'pinky', hand: 'right' },
      { label: 'Ü', code: 'BracketLeft', finger: 'pinky', hand: 'right' },
      { label: 'Õ', code: 'BracketRight', finger: 'pinky', hand: 'right' },
    ]
  },
  {
    keys: [
      { label: 'A', code: 'KeyA', finger: 'pinky', hand: 'left' },
      { label: 'S', code: 'KeyS', finger: 'ring', hand: 'left' },
      { label: 'D', code: 'KeyD', finger: 'middle', hand: 'left' },
      { label: 'F', code: 'KeyF', finger: 'index', hand: 'left' },
      { label: 'G', code: 'KeyG', finger: 'index', hand: 'left' },
      { label: 'H', code: 'KeyH', finger: 'index', hand: 'right' },
      { label: 'J', code: 'KeyJ', finger: 'index', hand: 'right' },
      { label: 'K', code: 'KeyK', finger: 'middle', hand: 'right' },
      { label: 'L', code: 'KeyL', finger: 'ring', hand: 'right' },
      { label: 'Ö', code: 'Semicolon', finger: 'pinky', hand: 'right' },
      { label: 'Ä', code: 'Quote', finger: 'pinky', hand: 'right' },
    ],
    style: { marginLeft: '20px' }
  },
  {
    keys: [
      { label: 'Z', code: 'KeyZ', finger: 'pinky', hand: 'left' },
      { label: 'X', code: 'KeyX', finger: 'ring', hand: 'left' },
      { label: 'C', code: 'KeyC', finger: 'middle', hand: 'left' },
      { label: 'V', code: 'KeyV', finger: 'index', hand: 'left' },
      { label: 'B', code: 'KeyB', finger: 'index', hand: 'left' },
      { label: 'N', code: 'KeyN', finger: 'index', hand: 'right' },
      { label: 'M', code: 'KeyM', finger: 'index', hand: 'right' },
      { label: ',', code: 'Comma', finger: 'middle', hand: 'right' },
      { label: '.', code: 'Period', finger: 'ring', hand: 'right' },
      { label: '-', code: 'Slash', finger: 'pinky', hand: 'right' },
    ],
    style: { marginLeft: '50px' }
  },
  {
    keys: [
      { label: 'Space', code: 'Space', finger: 'thumb', hand: 'left', width: 6 }
    ],
    style: { justifyContent: 'center' }
  }
];

export const FINGER_COLORS = {
  pinky: 'bg-red-200 border-red-400',
  ring: 'bg-orange-200 border-orange-400',
  middle: 'bg-yellow-200 border-yellow-400',
  index: 'bg-green-200 border-green-400',
  thumb: 'bg-blue-200 border-blue-400',
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Metsajänes",
    description: "Õpi kodurida vasaku käega: A ja S",
    characters: ['a', 's'],
    content: ["aa ss as sa asa sas aa ss as as sa sa", "sas asa sa as"],
    icon: "🐰",
    color: "bg-green-500"
  },
  {
    id: 2,
    title: "Rebane",
    description: "Õpi kodurida parema käega: K ja L",
    characters: ['k', 'l'],
    content: ["kk ll kl lk kala lala kak lak", "kkl llk kal lak"],
    icon: "🦊",
    color: "bg-orange-500"
  },
  {
    id: 3,
    title: "Karu",
    description: "Keskmised sõrmed: E ja I",
    characters: ['e', 'i'],
    content: ["ee ii ei ie se keks siil", "esi isa siga sise"],
    icon: "🐻",
    color: "bg-amber-700"
  },
  {
    id: 4,
    title: "Ilves",
    description: "Nimetissõrmed: R, T, Y, U",
    characters: ['r', 't', 'y', 'u'],
    content: ["rt yu tr uy tere rutt", "turu udu uru tartu"],
    icon: "🐱",
    color: "bg-yellow-600"
  },
  {
    id: 5,
    title: "Põder",
    description: "Täpitähed: Õ, Ä, Ö, Ü",
    characters: ['õ', 'ä', 'ö', 'ü'],
    content: ["õõ ää öö üü äär öö", "käsi süli lõug töö"],
    icon: "🫎",
    color: "bg-stone-600"
  },
  {
    id: 6,
    title: "Hunt",
    description: "Lihtsad sõnad kõigi tähtedega",
    characters: [],
    content: ["ema isa koer kass", "tere hommikust", "minu nimi on karu"],
    icon: "🐺",
    color: "bg-slate-600"
  },
  {
    id: 7,
    title: "Vanasõnad",
    description: "Eesti rahvatarkus ja kuldsed sõnad",
    characters: [],
    content: [
      "Aeg annab head nõu",
      "Aeg parandab haavad",
      "Hirmul on suured silmad",
      "Hommik on õhtust targem",
      "Iga algus on raske",
      "Julge hundi rind on rasvane",
      "Käbi ei kuku kännust kaugele",
      "Kes ees, see mees",
      "Kelle jalg tatsub, selle suu matsub",
      "Lõpp hea, kõik hea",
      "Meest sõnast, härga sarvest",
      "Mida Juku ei õpi, seda Juhan ei tea",
      "Narri meest, aga ära narri mehe mütsi",
      "Oma silm on kuningas",
      "Parem pool muna kui tühi koor",
      "Pill tuleb pika ilu peale",
      "Rääkimine hõbe, vaikimine kuld",
      "Tasa sõuad, kaugele jõuad",
      "Tee tööd, näe vaeva, siis saad taeva",
      "Tõde tõuseb, vale vajub",
      "Tühi kott ei seisa püsti",
      "Valel on lühikesed jalad",
      "Vana arm ei roosteta",
      "Veri on paksem kui vesi",
      "Võlg on võõra oma",
      "Üheksa korda mõõda, üks kord lõika"
    ],
    icon: "📜",
    color: "bg-teal-700"
  },
  {
    id: 99,
    title: "Tähetark",
    description: "Lõputud maagilised lood tehisintellektiga",
    characters: [],
    content: [], // Will be filled by AI
    icon: "🧙‍♂️",
    color: "bg-purple-600",
    isAI: true
  }
];