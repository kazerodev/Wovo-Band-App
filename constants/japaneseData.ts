export type Kana = { kana: string; romaji: string };

export type VocabItem = {
  jp: string;
  kana: string;
  romaji: string;
  es: string;
  category: string;
};

export type PhraseItem = {
  jp: string;
  romaji: string;
  es: string;
};

export const HIRAGANA: Kana[] = [
  { kana: 'あ', romaji: 'a' },  { kana: 'い', romaji: 'i' },  { kana: 'う', romaji: 'u' },
  { kana: 'え', romaji: 'e' },  { kana: 'お', romaji: 'o' },
  { kana: 'か', romaji: 'ka' }, { kana: 'き', romaji: 'ki' }, { kana: 'く', romaji: 'ku' },
  { kana: 'け', romaji: 'ke' }, { kana: 'こ', romaji: 'ko' },
  { kana: 'さ', romaji: 'sa' }, { kana: 'し', romaji: 'shi' },{ kana: 'す', romaji: 'su' },
  { kana: 'せ', romaji: 'se' }, { kana: 'そ', romaji: 'so' },
  { kana: 'た', romaji: 'ta' }, { kana: 'ち', romaji: 'chi' },{ kana: 'つ', romaji: 'tsu' },
  { kana: 'て', romaji: 'te' }, { kana: 'と', romaji: 'to' },
  { kana: 'な', romaji: 'na' }, { kana: 'に', romaji: 'ni' }, { kana: 'ぬ', romaji: 'nu' },
  { kana: 'ね', romaji: 'ne' }, { kana: 'の', romaji: 'no' },
  { kana: 'は', romaji: 'ha' }, { kana: 'ひ', romaji: 'hi' }, { kana: 'ふ', romaji: 'fu' },
  { kana: 'へ', romaji: 'he' }, { kana: 'ほ', romaji: 'ho' },
  { kana: 'ま', romaji: 'ma' }, { kana: 'み', romaji: 'mi' }, { kana: 'む', romaji: 'mu' },
  { kana: 'め', romaji: 'me' }, { kana: 'も', romaji: 'mo' },
  { kana: 'や', romaji: 'ya' }, { kana: 'ゆ', romaji: 'yu' }, { kana: 'よ', romaji: 'yo' },
  { kana: 'ら', romaji: 'ra' }, { kana: 'り', romaji: 'ri' }, { kana: 'る', romaji: 'ru' },
  { kana: 'れ', romaji: 're' }, { kana: 'ろ', romaji: 'ro' },
  { kana: 'わ', romaji: 'wa' }, { kana: 'を', romaji: 'wo' },
  { kana: 'ん', romaji: 'n' },
];

export const KATAKANA: Kana[] = [
  { kana: 'ア', romaji: 'a' },  { kana: 'イ', romaji: 'i' },  { kana: 'ウ', romaji: 'u' },
  { kana: 'エ', romaji: 'e' },  { kana: 'オ', romaji: 'o' },
  { kana: 'カ', romaji: 'ka' }, { kana: 'キ', romaji: 'ki' }, { kana: 'ク', romaji: 'ku' },
  { kana: 'ケ', romaji: 'ke' }, { kana: 'コ', romaji: 'ko' },
  { kana: 'サ', romaji: 'sa' }, { kana: 'シ', romaji: 'shi' },{ kana: 'ス', romaji: 'su' },
  { kana: 'セ', romaji: 'se' }, { kana: 'ソ', romaji: 'so' },
  { kana: 'タ', romaji: 'ta' }, { kana: 'チ', romaji: 'chi' },{ kana: 'ツ', romaji: 'tsu' },
  { kana: 'テ', romaji: 'te' }, { kana: 'ト', romaji: 'to' },
  { kana: 'ナ', romaji: 'na' }, { kana: 'ニ', romaji: 'ni' }, { kana: 'ヌ', romaji: 'nu' },
  { kana: 'ネ', romaji: 'ne' }, { kana: 'ノ', romaji: 'no' },
  { kana: 'ハ', romaji: 'ha' }, { kana: 'ヒ', romaji: 'hi' }, { kana: 'フ', romaji: 'fu' },
  { kana: 'ヘ', romaji: 'he' }, { kana: 'ホ', romaji: 'ho' },
  { kana: 'マ', romaji: 'ma' }, { kana: 'ミ', romaji: 'mi' }, { kana: 'ム', romaji: 'mu' },
  { kana: 'メ', romaji: 'me' }, { kana: 'モ', romaji: 'mo' },
  { kana: 'ヤ', romaji: 'ya' }, { kana: 'ユ', romaji: 'yu' }, { kana: 'ヨ', romaji: 'yo' },
  { kana: 'ラ', romaji: 'ra' }, { kana: 'リ', romaji: 'ri' }, { kana: 'ル', romaji: 'ru' },
  { kana: 'レ', romaji: 're' }, { kana: 'ロ', romaji: 'ro' },
  { kana: 'ワ', romaji: 'wa' }, { kana: 'ヲ', romaji: 'wo' },
  { kana: 'ン', romaji: 'n' },
];

export const VOCAB_CATEGORIES = ['Saludos', 'Números', 'Colores', 'Comida', 'Familia', 'Lugares', 'Verbos'];

export const VOCABULARY: VocabItem[] = [
  // Saludos
  { jp: 'こんにちは',           kana: 'こんにちは',         romaji: 'konnichiwa',            es: 'Hola',                   category: 'Saludos' },
  { jp: 'おはようございます',   kana: 'おはようございます', romaji: 'ohayou gozaimasu',      es: 'Buenos días',            category: 'Saludos' },
  { jp: 'こんばんは',           kana: 'こんばんは',         romaji: 'konbanwa',              es: 'Buenas noches',          category: 'Saludos' },
  { jp: 'さようなら',           kana: 'さようなら',         romaji: 'sayounara',             es: 'Adiós',                  category: 'Saludos' },
  { jp: 'ありがとうございます', kana: 'ありがとうございます',romaji: 'arigatou gozaimasu',    es: 'Muchas gracias',         category: 'Saludos' },
  { jp: 'すみません',           kana: 'すみません',         romaji: 'sumimasen',             es: 'Disculpe / Lo siento',   category: 'Saludos' },
  { jp: 'はい',                 kana: 'はい',               romaji: 'hai',                   es: 'Sí',                     category: 'Saludos' },
  { jp: 'いいえ',               kana: 'いいえ',             romaji: 'iie',                   es: 'No',                     category: 'Saludos' },
  { jp: 'どういたしまして',     kana: 'どういたしまして',   romaji: 'dou itashimashite',     es: 'De nada',                category: 'Saludos' },
  { jp: 'はじめまして',         kana: 'はじめまして',       romaji: 'hajimemashite',         es: 'Mucho gusto',            category: 'Saludos' },

  // Números
  { jp: '一', kana: 'いち', romaji: 'ichi', es: 'Uno',    category: 'Números' },
  { jp: '二', kana: 'に',   romaji: 'ni',   es: 'Dos',    category: 'Números' },
  { jp: '三', kana: 'さん', romaji: 'san',  es: 'Tres',   category: 'Números' },
  { jp: '四', kana: 'よん', romaji: 'yon',  es: 'Cuatro', category: 'Números' },
  { jp: '五', kana: 'ご',   romaji: 'go',   es: 'Cinco',  category: 'Números' },
  { jp: '六', kana: 'ろく', romaji: 'roku', es: 'Seis',   category: 'Números' },
  { jp: '七', kana: 'なな', romaji: 'nana', es: 'Siete',  category: 'Números' },
  { jp: '八', kana: 'はち', romaji: 'hachi',es: 'Ocho',   category: 'Números' },
  { jp: '九', kana: 'きゅう',romaji: 'kyuu', es: 'Nueve', category: 'Números' },
  { jp: '十', kana: 'じゅう',romaji: 'juu',  es: 'Diez',  category: 'Números' },

  // Colores
  { jp: '赤',   kana: 'あか',   romaji: 'aka',    es: 'Rojo',     category: 'Colores' },
  { jp: '青',   kana: 'あお',   romaji: 'ao',     es: 'Azul',     category: 'Colores' },
  { jp: '黄色', kana: 'きいろ', romaji: 'kiiro',  es: 'Amarillo', category: 'Colores' },
  { jp: '緑',   kana: 'みどり', romaji: 'midori', es: 'Verde',    category: 'Colores' },
  { jp: '白',   kana: 'しろ',   romaji: 'shiro',  es: 'Blanco',   category: 'Colores' },
  { jp: '黒',   kana: 'くろ',   romaji: 'kuro',   es: 'Negro',    category: 'Colores' },
  { jp: '茶色', kana: 'ちゃいろ',romaji: 'chairo', es: 'Marrón',   category: 'Colores' },
  { jp: 'ピンク',kana: 'ピンク', romaji: 'pinku',  es: 'Rosa',     category: 'Colores' },

  // Comida
  { jp: 'ご飯', kana: 'ごはん',   romaji: 'gohan',  es: 'Arroz / Comida', category: 'Comida' },
  { jp: '寿司', kana: 'すし',     romaji: 'sushi',  es: 'Sushi',          category: 'Comida' },
  { jp: 'ラーメン', kana: 'ラーメン', romaji: 'raamen', es: 'Ramen',       category: 'Comida' },
  { jp: '水',   kana: 'みず',     romaji: 'mizu',   es: 'Agua',           category: 'Comida' },
  { jp: 'お茶', kana: 'おちゃ',   romaji: 'ocha',   es: 'Té',             category: 'Comida' },
  { jp: 'パン', kana: 'パン',     romaji: 'pan',    es: 'Pan',            category: 'Comida' },
  { jp: '肉',   kana: 'にく',     romaji: 'niku',   es: 'Carne',          category: 'Comida' },
  { jp: '魚',   kana: 'さかな',   romaji: 'sakana', es: 'Pescado',        category: 'Comida' },
  { jp: '野菜', kana: 'やさい',   romaji: 'yasai',  es: 'Verduras',       category: 'Comida' },
  { jp: '卵',   kana: 'たまご',   romaji: 'tamago', es: 'Huevo',          category: 'Comida' },

  // Familia
  { jp: '父',   kana: 'ちち',     romaji: 'chichi',    es: 'Mi padre',       category: 'Familia' },
  { jp: '母',   kana: 'はは',     romaji: 'haha',      es: 'Mi madre',       category: 'Familia' },
  { jp: '兄',   kana: 'あに',     romaji: 'ani',       es: 'Hermano mayor',  category: 'Familia' },
  { jp: '姉',   kana: 'あね',     romaji: 'ane',       es: 'Hermana mayor',  category: 'Familia' },
  { jp: '弟',   kana: 'おとうと', romaji: 'otouto',    es: 'Hermano menor',  category: 'Familia' },
  { jp: '妹',   kana: 'いもうと', romaji: 'imouto',    es: 'Hermana menor',  category: 'Familia' },
  { jp: '子供', kana: 'こども',   romaji: 'kodomo',    es: 'Niño / Niña',    category: 'Familia' },
  { jp: '友達', kana: 'ともだち', romaji: 'tomodachi', es: 'Amigo / Amiga',  category: 'Familia' },

  // Lugares
  { jp: '学校', kana: 'がっこう', romaji: 'gakkou',  es: 'Escuela',       category: 'Lugares' },
  { jp: '駅',   kana: 'えき',     romaji: 'eki',     es: 'Estación',      category: 'Lugares' },
  { jp: '病院', kana: 'びょういん',romaji: 'byouin',  es: 'Hospital',      category: 'Lugares' },
  { jp: '銀行', kana: 'ぎんこう', romaji: 'ginkou',  es: 'Banco',         category: 'Lugares' },
  { jp: 'スーパー', kana: 'スーパー', romaji: 'suupaa', es: 'Supermercado', category: 'Lugares' },
  { jp: '空港', kana: 'くうこう', romaji: 'kuukou',  es: 'Aeropuerto',    category: 'Lugares' },
  { jp: 'ホテル', kana: 'ホテル', romaji: 'hoteru',  es: 'Hotel',         category: 'Lugares' },
  { jp: 'トイレ', kana: 'トイレ', romaji: 'toire',   es: 'Baño / Aseo',   category: 'Lugares' },

  // Verbos
  { jp: '食べる', kana: 'たべる', romaji: 'taberu',  es: 'Comer',     category: 'Verbos' },
  { jp: '飲む',   kana: 'のむ',   romaji: 'nomu',    es: 'Beber',     category: 'Verbos' },
  { jp: '行く',   kana: 'いく',   romaji: 'iku',     es: 'Ir',        category: 'Verbos' },
  { jp: '来る',   kana: 'くる',   romaji: 'kuru',    es: 'Venir',     category: 'Verbos' },
  { jp: '見る',   kana: 'みる',   romaji: 'miru',    es: 'Ver / Mirar', category: 'Verbos' },
  { jp: '聞く',   kana: 'きく',   romaji: 'kiku',    es: 'Escuchar',  category: 'Verbos' },
  { jp: '話す',   kana: 'はなす', romaji: 'hanasu',  es: 'Hablar',    category: 'Verbos' },
  { jp: '書く',   kana: 'かく',   romaji: 'kaku',    es: 'Escribir',  category: 'Verbos' },
  { jp: '読む',   kana: 'よむ',   romaji: 'yomu',    es: 'Leer',      category: 'Verbos' },
  { jp: 'わかる', kana: 'わかる', romaji: 'wakaru',  es: 'Entender',  category: 'Verbos' },
];

export const PHRASES: PhraseItem[] = [
  { jp: 'よろしくお願いします',           romaji: 'Yoroshiku onegaishimasu',          es: 'Encantado/a de conocerle' },
  { jp: '私の名前は＿＿です',             romaji: 'Watashi no namae wa ___ desu',     es: 'Mi nombre es ___' },
  { jp: '日本語を勉強しています',         romaji: 'Nihongo wo benkyou shite imasu',   es: 'Estoy estudiando japonés' },
  { jp: 'わかりません',                   romaji: 'Wakarimasen',                      es: 'No entiendo' },
  { jp: 'もう一度お願いします',           romaji: 'Mou ichido onegaishimasu',         es: 'Por favor, repita' },
  { jp: 'ゆっくり話してください',         romaji: 'Yukkuri hanashite kudasai',        es: 'Hable despacio, por favor' },
  { jp: '＿＿はどこですか？',             romaji: '___ wa doko desu ka?',             es: '¿Dónde está ___?' },
  { jp: 'いくらですか？',                 romaji: 'Ikura desu ka?',                   es: '¿Cuánto cuesta?' },
  { jp: 'これをください',                 romaji: 'Kore wo kudasai',                  es: 'Quiero esto, por favor' },
  { jp: 'おいしい！',                     romaji: 'Oishii!',                          es: '¡Está delicioso!' },
  { jp: '助けてください！',               romaji: 'Tasukete kudasai!',                es: '¡Ayúdeme, por favor!' },
  { jp: 'トイレはどこですか？',           romaji: 'Toire wa doko desu ka?',           es: '¿Dónde está el baño?' },
  { jp: '電車は何時ですか？',             romaji: 'Densha wa nanji desu ka?',         es: '¿A qué hora es el tren?' },
  { jp: '写真を撮ってもいいですか？',     romaji: 'Shashin wo totte mo ii desu ka?',  es: '¿Puedo tomar una foto?' },
  { jp: 'スペイン語を話せますか？',       romaji: 'Supeingo wo hanasemasu ka?',       es: '¿Habla español?' },
  { jp: '英語を話せますか？',             romaji: 'Eigo wo hanasemasu ka?',           es: '¿Habla inglés?' },
  { jp: '病院に連れて行ってください',     romaji: 'Byouin ni tsurete itte kudasai',   es: 'Lléveme al hospital, por favor' },
  { jp: 'お勘定をお願いします',           romaji: 'Okanjou wo onegaishimasu',         es: 'La cuenta, por favor' },
  { jp: '乾杯！',                         romaji: 'Kanpai!',                          es: '¡Salud!' },
  { jp: 'また会いましょう！',             romaji: 'Mata aimashou!',                   es: '¡Hasta la próxima!' },
];
