export type SeverityLevel = 'low' | 'moderate' | 'critical';

export interface DiseaseRecord {
  id: string;
  crop: 'Tomato' | 'Rice' | 'Wheat' | 'Maize' | 'Potato';
  cropLocalName: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  diseaseName: string;
  diseaseLocalName: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  scientificName: string;
  isHealthy: boolean;
  severity: SeverityLevel;
  confidence: number;
  symptoms: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  organicTreatment: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  chemicalTreatment: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  prevention: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  safeDosageWarning: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  // 3D procedural visual characteristics
  visual3d: {
    leafColor: string; // hex
    spotColor: string; // hex
    spotSize: number; // radius
    spotCount: number;
    wilted: boolean;
    deformScale: number;
  };
  sampleImage: string; // Visual realistic representation
}

export interface ScanResult {
  id: string;
  timestamp: number;
  crop: string;
  diseaseName: string;
  scientificName: string;
  severity: SeverityLevel;
  confidence: number;
  symptoms: string;
  organicTreatment: string;
  chemicalTreatment: string;
  prevention: string;
  safeDosageWarning: string;
  photoUrl?: string;
  isHealthy: boolean;
  diseaseId: string;
}

// Generate realistic leaf SVGs encoded as Data URIs for offline high-fidelity preview
function generateLeafSvg(crop: string, baseColor: string, spotsColor: string, pattern: 'spots' | 'stripes' | 'curled' | 'clean' | 'blight'): string {
  let innerElements = '';
  if (pattern === 'spots') {
    innerElements = `
      <circle cx="80" cy="70" r="14" fill="${spotsColor}" opacity="0.85"/>
      <circle cx="80" cy="70" r="8" fill="#1c1917" opacity="0.9"/>
      <circle cx="120" cy="110" r="18" fill="${spotsColor}" opacity="0.85"/>
      <circle cx="120" cy="110" r="11" fill="#1c1917" opacity="0.9"/>
      <circle cx="65" cy="130" r="12" fill="${spotsColor}" opacity="0.8"/>
      <circle cx="130" cy="60" r="10" fill="${spotsColor}" opacity="0.8"/>
      <circle cx="100" cy="150" r="15" fill="${spotsColor}" opacity="0.8"/>
      <circle cx="100" cy="150" r="9" fill="#1c1917" opacity="0.9"/>
    `;
  } else if (pattern === 'stripes') {
    innerElements = `
      <rect x="70" y="30" width="8" height="140" rx="4" fill="${spotsColor}" opacity="0.9"/>
      <rect x="90" y="20" width="10" height="160" rx="5" fill="${spotsColor}" opacity="0.85"/>
      <rect x="110" y="35" width="8" height="135" rx="4" fill="${spotsColor}" opacity="0.9"/>
      <rect x="130" y="50" width="7" height="110" rx="3" fill="${spotsColor}" opacity="0.85"/>
    `;
  } else if (pattern === 'blight') {
    innerElements = `
      <path d="M50 40 Q80 30 110 50 Q130 90 100 120 Q60 110 50 40 Z" fill="${spotsColor}" opacity="0.9"/>
      <path d="M90 110 Q140 100 150 140 Q130 170 80 160 Z" fill="${spotsColor}" opacity="0.88"/>
      <circle cx="100" cy="80" r="16" fill="#18181b" opacity="0.9"/>
      <circle cx="120" cy="130" r="14" fill="#18181b" opacity="0.85"/>
    `;
  } else if (pattern === 'curled') {
    innerElements = `
      <path d="M60 40 Q100 20 140 40 Q160 100 120 160 Q80 180 60 140 Q40 80 60 40 Z" fill="none" stroke="${spotsColor}" stroke-width="12" opacity="0.8"/>
      <circle cx="85" cy="75" r="8" fill="#eab308" opacity="0.8"/>
      <circle cx="115" cy="120" r="10" fill="#eab308" opacity="0.8"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <defs>
      <radialGradient id="grad_${crop}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${baseColor}"/>
        <stop offset="100%" stop-color="#14532d"/>
      </radialGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.3"/>
      </filter>
    </defs>
    <!-- Background Frame -->
    <rect width="200" height="200" rx="20" fill="#0f1715"/>
    <!-- Grid hint -->
    <path d="M0 50 H200 M0 100 H200 M0 150 H200 M50 0 V200 M100 0 V200 M150 0 V200" stroke="#10b981" stroke-width="0.5" opacity="0.15"/>
    <!-- Leaf Base Shape -->
    <g filter="url(#shadow)">
      <path d="M100 20 C140 50 170 95 155 145 C140 190 100 195 100 195 C100 195 60 190 45 145 C30 95 60 50 100 20 Z" fill="url(#grad_${crop})"/>
      <!-- Main leaf vein -->
      <path d="M100 25 L100 195" stroke="#86efac" stroke-width="2.5" opacity="0.6"/>
      <!-- Side veins -->
      <path d="M100 60 L135 80 M100 90 L145 115 M100 120 L140 145 M100 60 L65 80 M100 90 L55 115 M100 120 L60 145" stroke="#86efac" stroke-width="1.5" opacity="0.4"/>
      <!-- Disease Pathology Elements -->
      ${innerElements}
    </g>
    <!-- Micro HUD Badge -->
    <rect x="12" y="12" width="60" height="18" rx="4" fill="#022c22" opacity="0.85" stroke="#059669" stroke-width="0.8"/>
    <text x="42" y="24" fill="#34d399" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">${crop.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CROP_DISEASES: DiseaseRecord[] = [
  // 1. Tomato - Early Blight
  {
    id: "tomato_early_blight",
    crop: "Tomato",
    cropLocalName: {
      en: "Tomato",
      hi: "टमाटर",
      kn: "ಟೊಮೆಟೊ",
      as: "টমেটো",
    },
    diseaseName: "Early Blight",
    diseaseLocalName: {
      en: "Early Blight",
      hi: "अगेती झुलसा (अर्ली ब्लाइट)",
      kn: "ಆರಂಭಿಕ ರೋಗ (ಅರ್ಲಿ ಬ್ಲೈಟ್)",
      as: "আগতীয়া ব্লাইট",
    },
    scientificName: "Alternaria solani",
    isHealthy: false,
    severity: "moderate",
    confidence: 94.6,
    symptoms: {
      en: "Concentric \"target board\" dark brown rings on older lower leaves, surrounded by yellow chlorotic halos. Stem girdling at later stages.",
      hi: "पुरानी निचली पत्तियों पर भूरे-काले संकेंद्रित छल्ले (टारगेट बोर्ड जैसे निशान), चारों ओर पीलापन और तनों पर धब्बे।",
      kn: "ಹಳೆಯ ಕೆಳಗಿನ ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಗುರಿ ಹಲಗೆಯಂತಹ ಕಲೆಗಳು, ಸುತ್ತಲೂ ಹಳದಿ ಬಣ್ಣದ ಗಡಿ.",
      as: "তলৰ পুৰণি পাতবোৰত ক'লা-মুগা গোল চকাৰ দৰে দাগ, চাৰিওফালে হালধীয়া ৰেখা।",
    },
    organicTreatment: {
      en: "Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or Trichoderma viride @ 5g/L. Remove affected lower leaves and burn them.",
      hi: "5% नीम के बीज का अर्क (NSKE) या ट्राइकोडर्मा विरिडी 5 ग्राम/लीटर पानी में घोलकर छिड़कें। संक्रमित निचली पत्तियों को तोड़कर नष्ट करें।",
      kn: "೫% ಬೇವಿನ ಬೀಜದ ಕಷಾಯ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡಿ ೫ ಗ್ರಾಂ/ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಸಿಂಪಡಿಸಿ. ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳನ್ನು ತೆಗೆದು ಸುಟ್ಟುಹಾಕಿ.",
      as: "৫% নিম গুটিৰ তেল বা ট্ৰাইকোডাৰ্মা ভিৰিডি ৫ গ্ৰাম প্ৰতি লিটাৰ পানীত স্প্ৰে কৰক। সংক্ৰমিত পাতবোৰ আঁতৰাই পুৰি পেলাওক।",
    },
    chemicalTreatment: {
      en: "Spray Mancozeb 75% WP @ 2.5g/L water or Chlorothalonil 75% WP @ 2g/L at early onset. Alternate with Azoxystrobin 23% SC.",
      hi: "मैंकोजेब 75% WP 2.5 ग्राम/लीटर या क्लोरोथैलोनिल 75% WP 2 ग्राम/लीटर का 10-12 दिन के अंतराल पर छिड़काव करें।",
      kn: "ಮ್ಯಾಂಕೋಜೆಬ್ ೭೫% ಡಬ್ಲ್ಯುಪಿ ೨.೫ ಗ್ರಾಂ/ಲೀಟರ್ ಅಥವಾ ಕ್ಲೋರೋಥಾಲೋನಿಲ್ ಸಿಂಪಡಿಸಿ.",
      as: "মেনক’জেব ৭৫% ডব্লিউ.পি ২.৫ গ্ৰাম/লিটাৰ পানীত মিহলাই স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Strict 3-year crop rotation without solanaceous crops (potato, brinjal). Mulch soil to prevent rain-splash spore transmission.",
      hi: "टमाटर के खेत में 3 साल तक सोलेनेसी कुल (आलू, बैंगन) की फसल न लें। मल्चिंग का उपयोग करें ताकि मिट्टी के छींटे पत्तियों पर न पड़ें।",
      kn: "೩ ವರ್ಷಗಳ ಬೆಳೆ ಪರಿವರ್ತನೆ ಅನುಸರಿಸಿ. ಮಣ್ಣಿನ ಹನಿಗಳು ಎಲೆಗಳಿಗೆ ತಾಗದಂತೆ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಬಳಸಿ.",
      as: "৩ বছৰৰ শস্য পৰিক্ৰমা মানি চলক। পাতত মাটিৰ পানী ছিটকি নপৰিবলৈ খেৰৰ আচ্ছাদন ব্যৱহাৰ কৰক।",
    },
    safeDosageWarning: {
      en: "Strict 14-day pre-harvest interval (PHI). Wear safety goggles and N95 mask. Do not spray during wind speeds > 10 km/h.",
      hi: "फसल तोड़ने से कम से कम 14 दिन पहले छिड़काव बंद करें। छिड़कते समय चश्मा व मास्क पहनें। तेज हवा में छिड़काव न करें।",
      kn: "ಕೊಯ್ಲಿಗೆ ೧೪ ದಿನಗಳ ಮೊದಲು ಸಿಂಪಡಣೆ ನಿಲ್ಲಿಸಿ. ಮಾಸ್ಕ್ ಮತ್ತು ಕೈಗವಸುಗಳನ್ನು ಧರಿಸಿ.",
      as: "শস্য চপোৱাৰ ১৪ দিন পূৰ্বে স্প্ৰে বন্ধ কৰক। মাস্ক আৰু হাতমোজা ব্যৱহাৰ কৰক।",
    },
    visual3d: {
      leafColor: "#2e7d32",
      spotColor: "#451a03",
      spotSize: 0.14,
      spotCount: 8,
      wilted: false,
      deformScale: 1.1,
    },
    sampleImage: generateLeafSvg('Tomato', '#388e3c', '#78350f', 'spots'),
  },

  // 2. Tomato - Late Blight
  {
    id: "tomato_late_blight",
    crop: "Tomato",
    cropLocalName: {
      en: "Tomato",
      hi: "टमाटर",
      kn: "ಟೊಮೆಟೊ",
      as: "টমেটো",
    },
    diseaseName: "Late Blight",
    diseaseLocalName: {
      en: "Late Blight",
      hi: "पछेती झुलसा (लेट ब्लाइट)",
      kn: "ತಡವಾದ ರೋಗ (ಲೇಟ್ ಬ್ಲೈಟ್)",
      as: "পলমকৈ হোৱা ব্লাইট",
    },
    scientificName: "Phytophthora infestans",
    isHealthy: false,
    severity: "critical",
    confidence: 97.2,
    symptoms: {
      en: "Water-soaked irregular blackish-purple lesions that spread rapidly in cool, humid fog. White powdery fungal growth on leaf undersides.",
      hi: "पत्तियों पर गीले पानी जैसे भूरे-काले अनियमित धब्बे जो ठंडे-नम मौसम में तेजी से फैलते हैं। पत्ती की निचली सतह पर सफेद फफूंद।",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ನೀರಿನಂತಹ ತೇವವಾದ ಕಪ್ಪು-ನೇರಳೆ ಕಲೆಗಳು. ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿ ಶಿಲೀಂಧ್ರದ ಬೆಳವಣಿಗೆ.",
      as: "পাতত পানী লগাৰ দৰে ক’লা-বেঙুনীয়া দাগ, তলৰ পিঠিত বগা ভেঁকুৰৰ আৱৰণ।",
    },
    organicTreatment: {
      en: "Copper hydroxide 77% WP @ 2g/L or Bordeaux mixture 1%. Spray Bacillus subtilis formulations preventively.",
      hi: "बोर्डो मिश्रण 1% या कॉपर ऑक्सीक्लोराइड 50% WP 3 ग्राम/लीटर का छिड़काव करें। बेसिलस सबटिलिस का छिड़काव लाभप्रद है।",
      kn: "ಬೋರ್ಡೋ ದ್ರಾವಣ ೧% ಅಥವಾ ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ೩ ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
      as: "বৰড’ মিশ্ৰণ ১% বা কপাৰ অক্সিক্ল’ৰাইড ৩ গ্ৰাম/লিটাৰ ব্যৱহাৰ কৰক।",
    },
    chemicalTreatment: {
      en: "Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L or Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5g/L as systemic curative spray.",
      hi: "साइमोक्सानिल 8% + मैंकोजेब 64% 2.5 ग्राम/लीटर या मेटालैक्सिल + मैंकोजेब 2.5 ग्राम/लीटर का तुरंत छिड़काव करें।",
      kn: "ಸೈಮೋಕ್ಸಾನಿಲ್ + ಮ್ಯಾಂಕೋಜೆಬ್ ೨.೫ ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
      as: "চাইমক্সানিল + মেনক’জেব ২.৫ গ্ৰাম/লিটাৰ পানীত স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Avoid overhead sprinkler irrigation; space plants 60cm apart for rapid canopy airflow; rogue and deep-bury heavily infected plants.",
      hi: "फव्वारा सिंचाई से बचें। पौधों के बीच 60 सेमी की दूरी रखें ताकि हवा और धूप लगे। गंभीर रूप से ग्रसित पौधों को उखाड़कर गाड़ दें।",
      kn: "ತುಂತುರು ನೀರಾವರಿ ತಪ್ಪಿಸಿ, ಗಿಡಗಳ ನಡುವೆ ೬೦ ಸೆಂ.ಮೀ ಅಂತರವಿರಲಿ.",
      as: "ওপৰৰ পৰা পানী ছিটকাই নিদিব। গছবোৰৰ মাজত ৬০ ছেমি দূৰত্ব ৰাখক।",
    },
    safeDosageWarning: {
      en: "Metalaxyl has strong soil persistence. Do not exceed 2 systemic applications per season. Wear full chemical apron and face shield.",
      hi: "मेटालैक्सिल का प्रयोग एक सीजन में 2 बार से अधिक न करें। कीटनाशक छिड़कते समय एप्रन और फेस शील्ड जरूर पहनें।",
      kn: "ಋತುವಿನಲ್ಲಿ ೨ ಕ್ಕಿಂತ ಹೆಚ್ಚು ಬಾರಿ ಸಿಂಪಡಿಸಬೇಡಿ. ಮುಖಗವಸು ಧರಿಸಿ.",
      as: "এটা বতৰত ২ বাৰতকৈ অধিক প্ৰয়োগ নকৰিব। সুৰক্ষা আৱৰণ ব্যৱহাৰ কৰক।",
    },
    visual3d: {
      leafColor: "#1e3a1e",
      spotColor: "#171717",
      spotSize: 0.22,
      spotCount: 6,
      wilted: true,
      deformScale: 1.3,
    },
    sampleImage: generateLeafSvg('Tomato', '#15803d', '#18181b', 'blight'),
  },

  // 3. Tomato - Yellow Leaf Curl Virus
  {
    id: "tomato_leaf_curl",
    crop: "Tomato",
    cropLocalName: {
      en: "Tomato",
      hi: "टमाटर",
      kn: "ಟೊಮೆಟೊ",
      as: "টমেটো",
    },
    diseaseName: "Yellow Leaf Curl Virus",
    diseaseLocalName: {
      en: "Yellow Leaf Curl Virus",
      hi: "पत्ती मरोड़ रोग (लीफ कर्ल वायरस)",
      kn: "ಎಲೆ ಮುದುರುವ ರೋಗ (ಲೀಫ್ ಕರ್ಲ್)",
      as: "পাত কুঁচি ৰোগ",
    },
    scientificName: "Begomovirus (TYLCV transmitted by Whitefly)",
    isHealthy: false,
    severity: "critical",
    confidence: 96.0,
    symptoms: {
      en: "Severe upward curling and puckering of leaf margins, severe interveinal yellowing, stunted plant growth with bushy appearance.",
      hi: "पत्तियों का ऊपर की ओर मुड़ना (प्यालीनुमा आकार), पत्तियों का पीला पड़ना, पौधे का बौना रह जाना और फूल-फल न लगना।",
      kn: "ಎಲೆಗಳ ತುದಿಗಳು ಮೇಲಕ್ಕೆ ಮುದುರಿಕೊಳ್ಳುವುದು, ತೀವ್ರ ಹಳದಿ ಬಣ್ಣ, ಗಿಡ ಗಿಡ್ಡಾಗುವುದು.",
      as: "পাতবোৰ ওপৰলৈ কোঁচ খাই বাটিৰ দৰে হোৱা, হালধীয়া পৰা আৰু গছজোপাৰ বৃদ্ধি বন্ধ হোৱা।",
    },
    organicTreatment: {
      en: "Install yellow sticky traps @ 20/acre to trap whitefly vectors. Spray 2% Pongamia / Neem oil emulsion every 7 days.",
      hi: "सफेद मक्खी को फंसाने हेतु प्रति एकड़ 20 पीले चिपचिपे ट्रैप लगाएं। 2% करंज या नीम तेल के घोल का साप्ताहिक छिड़काव करें।",
      kn: "ಬಿಳಿ ನೊಣಗಳನ್ನು ಹಿಡಿಯಲು ಎಕರೆಗೆ ೨೦ ಹಳದಿ ಜಿಗುಟಾದ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.",
      as: "বগা মাখি ধৰিবলৈ প্ৰতি বিঘাত ৬-৮ খন হালধীয়া আঠাযুক্ত ফান্দ পাতক। নিম তেল স্প্ৰে কৰক।",
    },
    chemicalTreatment: {
      en: "Control whitefly vector with Imidacloprid 17.8% SL @ 0.5ml/L or Diafenthiuron 50% WP @ 1g/L.",
      hi: "सफेद मक्खी नियंत्रण हेतु इमिडाक्लोप्रिड 17.8% SL 0.5 मिली/लीटर या डायफेन्थियुरॉन 50% WP 1 ग्राम/लीटर का छिड़काव करें।",
      kn: "ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ೧೭.೮% ೦.೫ ಮಿ.ಲೀ/ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಸಿಂಪಡಿಸಿ.",
      as: "ইমিডাক্ল’প্ৰিড ১৭.৮% এছ.এল ০.৫ মিলি/লিটাৰ পানীত মিহলাই স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Grow 40-mesh insect-proof nursery tunnels. Plant barrier crops like maize/sorghum around tomato fields.",
      hi: "नर्सरी में 40 मेश की नेट का उपयोग करें। खेत की मेड़ों पर मक्का या ज्वार की 3-4 कतारें अवरोधक के रूप में लगाएं।",
      kn: "ನರ್ಸರಿಯಲ್ಲಿ ಕೀಟ ನಿರೋಧಕ ಜಾಲರಿ ಬಳಸಿ. ಗಡಿಯ ಸುತ್ತಲೂ ಜೋಳದ ಬೆಳೆ ಬೆಳೆಯಿರಿ.",
      as: "নাৰ্চাৰীত আঁঠুৱা বা নেট ব্যৱহাৰ কৰক। পথাৰৰ চাৰিওফালে গোমধান ৰোপণ কৰক।",
    },
    safeDosageWarning: {
      en: "Neonicotinoids are hazardous to honeybees. Never spray during morning foraging hours (spray only late evening).",
      hi: "इमिडाक्लोप्रिड मधुमक्खियों के लिए अत्यंत हानिकारक है। सुबह के समय छिड़काव न करें, केवल शाम को करें।",
      kn: "ಜೇನುನೊಣಗಳಿಗೆ ಹಾನಿಕಾರಕ. ಮುಂಜಾನೆ ಸಿಂಪಡಿಸಬೇಡಿ, ಸಂಜೆ ಮಾತ್ರ ಸಿಂಪಡಿಸಿ.",
      as: "মৌমাখিৰ বাবে ক্ষতিকাৰক। কেৱল গধূলি সময়তহে স্প্ৰে কৰিব।",
    },
    visual3d: {
      leafColor: "#a3e635",
      spotColor: "#ca8a04",
      spotSize: 0.08,
      spotCount: 4,
      wilted: true,
      deformScale: 0.8,
    },
    sampleImage: generateLeafSvg('Tomato', '#84cc16', '#eab308', 'curled'),
  },

  // 4. Rice - Blast
  {
    id: "rice_blast",
    crop: "Rice",
    cropLocalName: {
      en: "Rice (Paddy)",
      hi: "धान (चावल)",
      kn: "ಭತ್ತ",
      as: "ধান",
    },
    diseaseName: "Rice Blast",
    diseaseLocalName: {
      en: "Rice Blast",
      hi: "धान का झोंका रोग (ब्लास्ट)",
      kn: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
      as: "ধানৰ ব্লাষ্ট ৰোগ",
    },
    scientificName: "Magnaporthe oryzae",
    isHealthy: false,
    severity: "critical",
    confidence: 95.8,
    symptoms: {
      en: "Spindle-shaped or eye-shaped lesions with grayish center and brown/reddish margin. In severe blast, leaves dry up completely (burnt appearance).",
      hi: "पत्तियों पर नाव या आंख के आकार के धब्बे जिनका केंद्र राख जैसे धूसर रंग का और किनारे लाल-भूरे होते हैं। गंभीर अवस्था में खेत जला हुआ दिखता है।",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಕಣ್ಣಿನ ಆಕಾರದ ಬೂದು ಕೇಂದ್ರ ಮತ್ತು ಕಂದು ಗಡಿ ಹೊಂದಿರುವ ಕಲೆಗಳು. ಸುಟ್ಟಂತೆ ಕಾಣುತ್ತದೆ.",
      as: "পাতত চকুৰ আকৃতিৰ মাজভাগ ধোঁৱাবৰণীয়া আৰু দাঁতিবোৰ ৰঙচুৱা-মুগা দাগ।",
    },
    organicTreatment: {
      en: "Seed treatment with Pseudomonas fluorescens @ 10g/kg seed. Foliar spray of cow urine (10%) mixed with asafoetida (hing) extract.",
      hi: "स्यूडोमोनास फ्लोरेसेंस 10 ग्राम/किग्रा से बीज शोधन। 10% गोमूत्र में हींग का अर्क मिलाकर छिड़काव करें।",
      kn: "ಸ್ಯೂಡೋಮೊನಾಸ್ ೧೦ ಗ್ರಾಂ/ಕೆಜಿ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಗೋಮೂತ್ರ ಸಿಂಪಡಣೆ ಸಹಕಾರಿ.",
      as: "ছিউড’মনাছ ফ্ল’ৰেচেন্স ১০ গ্ৰাম/কেজি হিচাপত বীজ শোধন কৰক। ১০% গোমূত্ৰ স্প্ৰে কৰক।",
    },
    chemicalTreatment: {
      en: "Spray Tricyclazole 75% WP @ 0.6g/L water or Isoprothiolane 40% EC @ 1.5ml/L at first appearance of spots.",
      hi: "ट्राइसाइक्लाजोल 75% WP 0.6 ग्राम/लीटर या आइसोप्रोधियोलेन 40% EC 1.5 मिली/लीटर का छिड़काव करें।",
      kn: "ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ೭೫% ಡಬ್ಲ್ಯುಪಿ ೦.೬ ಗ್ರಾಂ/ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಸಿಂಪಡಿಸಿ.",
      as: "ট্ৰাইচাইক্লাজ’ল ৭৫% ডব্লিউ.পি ০.৬ গ্ৰাম/লিটাৰ পানীত স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Avoid excessive split applications of Nitrogen fertilizer. Maintain thin film water depth without drought shock.",
      hi: "खेत में जरूरत से ज्यादा यूरिया (नाइट्रोजन) न डालें। खेत को एकदम सूखा न छोड़ें, संतुलित नमी बनाए रखें।",
      kn: "ಹೆಚ್ಚುವರಿ ಯೂರಿಯಾ ಬಳಸಬೇಡಿ. ಸೂಕ್ತ ನೀರಿನ ಮಟ್ಟವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ.",
      as: "অত্যাধিক ইউৰিয়া সাৰ প্ৰয়োগ নকৰিব। পথাৰত পানীৰ গভীৰতা সমানে ৰাখক।",
    },
    safeDosageWarning: {
      en: "Do not drain chemical-treated paddy water into fish ponds for 21 days due to aquatic toxicity.",
      hi: "दवा छिड़कने के 21 दिनों तक खेत का पानी मछली पालन वाले तालाबों में न जाने दें।",
      kn: "ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸಿದ ನೀರನ್ನು ೨೧ ದಿನಗಳವರೆಗೆ ಮೀನಿನ ಹೊಂಡಗಳಿಗೆ ಹರಿಸಬೇಡಿ.",
      as: "কীটনাশক দিয়া পথাৰৰ পানী ২১ দিনলৈ মাছৰ পুখুৰীত সোমাবলৈ নিদিব।",
    },
    visual3d: {
      leafColor: "#4ade80",
      spotColor: "#7f1d1d",
      spotSize: 0.12,
      spotCount: 12,
      wilted: false,
      deformScale: 1.0,
    },
    sampleImage: generateLeafSvg('Rice', '#22c55e', '#7f1d1d', 'spots'),
  },

  // 5. Rice - Brown Spot
  {
    id: "rice_brown_spot",
    crop: "Rice",
    cropLocalName: {
      en: "Rice (Paddy)",
      hi: "धान (चावल)",
      kn: "ಭತ್ತ",
      as: "ধান",
    },
    diseaseName: "Brown Spot",
    diseaseLocalName: {
      en: "Brown Spot",
      hi: "भूरा धब्बा रोग (ब्राउन स्पॉट)",
      kn: "ಕಂದು ಚುಕ್ಕೆ ರೋಗ",
      as: "মুগা দাগ ৰোগ",
    },
    scientificName: "Bipolaris oryzae (Cochliobolus miyabeanus)",
    isHealthy: false,
    severity: "moderate",
    confidence: 93.4,
    symptoms: {
      en: "Circular to oval dark brown sesame-seed sized spots evenly distributed on leaf surface, prominent on potash-deficient soils.",
      hi: "पत्तियों पर तिल के बीज के आकार के गोल से अंडाकार भूरे धब्बे। यह रोग पोटाश की कमी वाली मिट्टी में अधिक फैलता है।",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಎಳ್ಳಿನ ಗಾತ್ರದ ಕಂದು ಬಣ್ಣದ ಸಣ್ಣ ಕಲೆಗಳು. ಪೊಟ್ಯಾಶ್ ಕೊರತೆಯಿರುವ ಮಣ್ಣಿನಲ್ಲಿ ಹೆಚ್ಚು.",
      as: "পাতত তিলৰ গুটিৰ সমান সৰু সৰু মুগা দাগ, পটাছৰ অভাৱ থকা মাটিত বেছিকৈ দেখা যায়।",
    },
    organicTreatment: {
      en: "Seed treatment with Trichoderma harzianum @ 10g/kg. Apply well-rotted Farm Yard Manure (FYM) fortified with Potash bacteria.",
      hi: "ट्राइकोडर्मा हार्जिएनम 10 ग्राम/किग्रा से बीज उपचार। पोटाश सोलुबिलाइजिंग बैक्टीरिया युक्त सड़ी गोबर खाद डालें।",
      kn: "ಟ್ರೈಕೋಡರ್ಮಾ ಮೂಲಕ ಬೀಜೋಪಚಾರ. ಮಾಗಿದ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರವನ್ನು ಬಳಸಿ.",
      as: "ট্ৰাইকোডাৰ্মাৰে বীজ শোধন কৰক। পচন সাৰ প্ৰয়ೋಗ কৰক।",
    },
    chemicalTreatment: {
      en: "Spray Propiconazole 25% EC @ 1ml/L or Edifenphos 50% EC @ 1ml/L during tillering and panicle emergence.",
      hi: "प्रोपिकोनाजोल 25% EC 1 मिली/लीटर पानी या कार्बेन्डाजिम + मैंकोजेब 2 ग्राम/लीटर का छिड़काव करें।",
      kn: "ಪ್ರೊಪಿಕೊನಾಜೋಲ್ ೨೫% ಇಸಿ ೧ ಮಿ.ಲೀ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
      as: "প্ৰপিক’নাজ’ল ২৫% ই.চি ১ মিলি/লিটাৰ পানীত স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Correct soil potassium (MOP) and silicon deficiencies based on soil health card. Avoid severe water stress.",
      hi: "मृदा स्वास्थ्य कार्ड के अनुसार पोटाश (MOP) की संतुलित मात्रा डालें। धान को प्यासा न रखें।",
      kn: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಪ್ರಕಾರ ಸರಿಯಾದ ಪ್ರಮಾಣದ ಪೊಟ್ಯಾಶ್ ಒದಗಿಸಿ.",
      as: "মাটি পৰীক্ষা অনুসৰি উপযুক্ত পৰিমাণৰ পটাছ সাৰ ব্যৱহাರ್ কৰক।",
    },
    safeDosageWarning: {
      en: "Propiconazole should be applied during cool evening hours. Wear respirator mask during tank mixing.",
      hi: "प्रोपिकोनाजोल का छिड़काव शाम के समय करें। दवा घोलते समय श्वसन मास्क जरूर लगाएं।",
      kn: "ಔಷಧ ಮಿಶ್ರಣ ಮಾಡುವಾಗ ಉಸಿರಾಟದ ಮಾಸ್ಕ್ ಧರಿಸಿ.",
      as: "মিশ্ৰণ প্ৰস্তুত কৰাৰ সময়ত মাস্ক পৰিধান কৰক।",
    },
    visual3d: {
      leafColor: "#65a30d",
      spotColor: "#451a03",
      spotSize: 0.09,
      spotCount: 16,
      wilted: false,
      deformScale: 0.95,
    },
    sampleImage: generateLeafSvg('Rice', '#4ade80', '#451a03', 'spots'),
  },

  // 6. Wheat - Stripe / Yellow Rust
  {
    id: "wheat_stripe_rust",
    crop: "Wheat",
    cropLocalName: {
      en: "Wheat",
      hi: "गेहूं",
      kn: "ಗೋಧಿ",
      as: "ঘেঁহু",
    },
    diseaseName: "Stripe (Yellow) Rust",
    diseaseLocalName: {
      en: "Stripe (Yellow) Rust",
      hi: "पीला रतुआ (येलो रस्ट)",
      kn: "ಹಳದಿ ತುಕ್ಕು ರೋಗ",
      as: "হালধীয়া ৰাষ্ট ৰোগ",
    },
    scientificName: "Puccinia striiformis f. sp. tritici",
    isHealthy: false,
    severity: "critical",
    confidence: 96.8,
    symptoms: {
      en: "Bright yellow-orange powdery pustules arranged in parallel linear stripes along leaf veins. Yellow dust stains farmer clothes on touch.",
      hi: "पत्तियों की शिराओं के समानांतर चमकदार पीली-नारंगी धारियाँ व पाउडर। छूने पर कपड़ों और उंगलियों पर पीली हल्दी जैसा रंग लगता है।",
      kn: "ಎಲೆಯ ನರಗಳ ಉದ್ದಕ್ಕೂ ಸಮಾನಾಂತರ ರೇಖೆಗಳಲ್ಲಿ ಹಳದಿ ಪುಡಿಯಂತಹ ಪಟ್ಟೆಗಳು. ಮುಟ್ಟಿದರೆ ಅರಿಶಿನದಂತೆ ಹಳದಿ ಪುಡಿ ಅಂಟಿಕೊಳ್ಳುತ್ತದೆ.",
      as: "পাতৰ সিৰাবোৰৰ সমান্তৰালভাৱে হালধীয়া ৰঙৰ গুড়িৰ দৰে দীঘলীয়া দাগ। চুলে হালধীয়া ধূলি লাগে।",
    },
    organicTreatment: {
      en: "Prophylactic foliar spray of Sour Butter Milk (Chhach) @ 10% solution or Garlic-Chilli extract in early winter.",
      hi: "शुरुआती जाड़े में 10% खट्टी छाछ या लहसुन-तीखी मिर्च के अर्क का छिड़काव करें। संक्रमित पौधों को तुरंत अलग करें।",
      kn: "೧೦% ಹುಳಿ ಮಜ್ಜಿಗೆ ಅಥವಾ ಬೆಳ್ಳುಳ್ಳಿ ಕಷಾಯವನ್ನು ಮುಂಜಾಗ್ರತೆಯಾಗಿ ಸಿಂಪಡಿಸಿ.",
      as: "১০% টেঙা ঘোল বা নহৰুৰ মিশ্ৰণ স্প্ৰে কৰক।",
    },
    chemicalTreatment: {
      en: "Single spray of Propiconazole 25% EC (Tilt) @ 1ml/L or Tebuconazole 25.9% EC @ 1ml/L immediately when first yellow pustules emerge.",
      hi: "पीली धारियाँ दिखते ही प्रोपिकोनाजोल 25% EC (टिल्ट) 1 मिली/लीटर या टेबुकोनाजोल 1 मिली/लीटर का तुरंत छिड़काव करें।",
      kn: "ಮೊದಲ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದ ತಕ್ಷಣ ಪ್ರೊಪಿಕೊನಾಜೋಲ್ ೧ ಮಿ.ಲೀ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
      as: "প্ৰথম লক্ষণ দেখা পোৱাৰ লগে লগে প্ৰপিক’নাজ’ল ১ মিলি/লিটাৰ স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Sow resistant varieties (e.g. DBW 187, DBW 222, HD 3086). Avoid delayed late-season sowing.",
      hi: "रतुआ-रोधी किस्में (जैसे डीबीडब्ल्यू 187, डीबीडब्ल्यू 222, एचडी 3086) ही बोयें। पछेती बुवाई से बचें।",
      kn: "ರೋಗ ನಿರೋಧಕ ಗೋಧಿ ತಳಿಗಳನ್ನು ಮಾತ್ರ ಬಿತ್ತನೆ ಮಾಡಿ. ತಡವಾದ ಬಿತ್ತನೆ ತಪ್ಪಿಸಿ.",
      as: "ৰোগ প্ৰতিৰোধী জাত ব্যৱহাৰ কৰক। পলমকৈ বীজ নিসিঁচিব।",
    },
    safeDosageWarning: {
      en: "Do not spray when morning dew is heavy on leaves as the chemical will wash off. Wait until 11 AM.",
      hi: "जब पत्तियों पर भारी ओस हो तब छिड़काव न करें, दवा बह जाएगी। ओस सूखने के बाद ही छिड़काव करें।",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಇಬ್ಬನಿ ಇರುವಾಗ ಸಿಂಪಡಿಸಬೇಡಿ. ಇಬ್ಬನಿ ಒಣಗಿದ ನಂತರವೇ ಸಿಂಪಡಿಸಿ.",
      as: "পাতত কুঁৱলী বা নিয়ৰ লাগি থকা অৱস্থাত স্প্ৰে নকৰিব।",
    },
    visual3d: {
      leafColor: "#84cc16",
      spotColor: "#eab308",
      spotSize: 0.1,
      spotCount: 14,
      wilted: false,
      deformScale: 1.05,
    },
    sampleImage: generateLeafSvg('Wheat', '#65a30d', '#facc15', 'stripes'),
  },

  // 7. Wheat - Powdery Mildew
  {
    id: "wheat_powdery_mildew",
    crop: "Wheat",
    cropLocalName: {
      en: "Wheat",
      hi: "गेहूं",
      kn: "ಗೋಧಿ",
      as: "ঘেঁহু",
    },
    diseaseName: "Powdery Mildew",
    diseaseLocalName: {
      en: "Powdery Mildew",
      hi: "चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
      kn: "ಬೂದಿ ರೋಗ (ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂ)",
      as: "পাউদাৰী মিল্ডিউ ৰোগ",
    },
    scientificName: "Blumeria graminis f. sp. tritici",
    isHealthy: false,
    severity: "moderate",
    confidence: 94.1,
    symptoms: {
      en: "Fluffy white talcum powder-like patches on leaves and lower stems that turn dirty gray with tiny black fruiting bodies (cleistothecia).",
      hi: "पत्तियों और तनों पर सफेद पाउडर या आटे जैसे धब्बे जो बाद में मटमैले हो जाते हैं और उन पर काले दाने बनते हैं।",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬೂದಿಯಂತಹ ಅಥವಾ ಹಿಟ್ಟಿನಂತಹ ಕಲೆಗಳು. ನಂತರ ಬೂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ.",
      as: "পাত আৰু কাণ্ডত বগা আটাৰ দৰে গুড়ি জমা হয়, পাছলৈ ক’লা বিন্দু দেখা দিয়ে।",
    },
    organicTreatment: {
      en: "Spray wettable sulfur 80% WDG @ 2.5g/L or potassium bicarbonate solution (5g/L). Maintain field aeration.",
      hi: "घुलनशील गंधक (सल्फर) 80% WDG 2.5 ग्राम/लीटर या पोटेशियम बाइकार्बोनेट 5 ग्राम/लीटर का छिड़काव करें।",
      kn: "ಸಲ್ಫರ್ ೮೦% ೨.೫ ಗ್ರಾಂ/ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಕರಗಿಸಿ ಸಿಂಪಡಿಸಿ.",
      as: "পানীত দ্ৰৱীভূত ছালফাৰ ৮০% ২.৫ গ্ৰাম/লিটাৰ স্প্ৰে কৰক।",
    },
    chemicalTreatment: {
      en: "Hexaconazole 5% EC @ 1ml/L or Difenoconazole 25% EC @ 0.5ml/L when white mycelial patches cross 5% leaf area.",
      hi: "हेक्साकोनाजोल 5% EC 1 मिली/लीटर या डिफेनोकोनाजोल 25% EC 0.5 मिली/लीटर का छिड़काव करें।",
      kn: "ಹೆಕ್ಸಾಕೊನಾಜೋಲ್ ೧ ಮಿ.ಲೀ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
      as: "হেক্সাক’নাজ’ল ১ মিলি/লিটাৰ পানীত মিহলাই স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Avoid high plant population density; balanced nitrogen nutrition prevents overly lush succulent foliage susceptible to mildew.",
      hi: "पौधों को बहुत घना न बोयें। संतुलित खाद दें, अत्यधिक यूरिया देने से पत्तियों में यह रोग जल्दी आता है।",
      kn: "ಗಿಡಗಳನ್ನು ಹೆಚ್ಚು ದಟ್ಟವಾಗಿ ಬೆಳೆಯಬೇಡಿ. ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ನೀಡಿ.",
      as: "বেছি ঘনকৈ বীজ নবব। অতিৰিক্ত ইউৰিয়া পৰিহাৰ কৰক।",
    },
    safeDosageWarning: {
      en: "Do not apply sulfur compounds if daytime temperature exceeds 32°C to prevent severe crop burning.",
      hi: "यदि दिन का तापमान 32°C से अधिक हो तो गंधक का छिड़काव न करें, पत्तियां झुलस सकती हैं।",
      kn: "ತಾಪಮಾನ ೩೨°C ಗಿಂತ ಹೆಚ್ಚಿರುವಾಗ ಸಲ್ಫರ್ ಸಿಂಪಡಿಸಬೇಡಿ.",
      as: "দিনৰ উত্তাপ ৩২ ডিগ্ৰীতকৈ অধিক হ’লে ছালফাৰ প্ৰয়োগ নকৰিব।",
    },
    visual3d: {
      leafColor: "#4d7c0f",
      spotColor: "#f1f5f9",
      spotSize: 0.15,
      spotCount: 10,
      wilted: false,
      deformScale: 0.95,
    },
    sampleImage: generateLeafSvg('Wheat', '#84cc16', '#e2e8f0', 'spots'),
  },

  // 8. Maize - Fall Armyworm
  {
    id: "maize_fall_armyworm",
    crop: "Maize",
    cropLocalName: {
      en: "Maize (Corn)",
      hi: "मक्का",
      kn: "ಮೆಕ್ಕೆಜೋಳ",
      as: "মাকৈ",
    },
    diseaseName: "Fall Armyworm (FAW)",
    diseaseLocalName: {
      en: "Fall Armyworm (FAW)",
      hi: "फॉल आर्मीवर्म (सैनिक कीट)",
      kn: "ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್ (ಲದ್ದಿಹುಳು)",
      as: "ফল আৰ্মীৱাৰ্ম কীট",
    },
    scientificName: "Spodoptera frugiperda",
    isHealthy: false,
    severity: "critical",
    confidence: 97.4,
    symptoms: {
      en: "Window-paning of young whorl leaves, extensive pinholes, ragged \"shot-hole\" tears, and heaps of moist sawdust-like fecal frass in the whorl.",
      hi: "मक्के की गोभ (पत्तियों के बीच) में गोल छेद, पत्तियों का छलनी होना और गोभ के अंदर लकड़ी के बुरादे जैसा कीट का मल भरा होना।",
      kn: "ಸುಳಿಯ ಎಲೆಗಳಲ್ಲಿ ರಂಧ್ರಗಳು, ಚೂರುಚೂರಾದ ಎಲೆಗಳು ಮತ್ತು ಸುಳಿಯಲ್ಲಿ ಮರದ ಪುಡಿಯಂತಹ ಹಿಕ್ಕೆಗಳು.",
      as: "মাকৈৰ কলি পাতবোৰত অসংখ্য ফুটা আৰু কাঠৰ গুড়িৰ দৰে কীটৰ মল জমা হোৱা।",
    },
    organicTreatment: {
      en: "Whorl application of dry sand mixed with lime (9:1 ratio) or wood ash. Spray Metarhizium rileyi or Bt kurstaki @ 2g/L.",
      hi: "गोभ में 9:1 अनुपात में रेत और चूना या सूखी लकड़ी की राख डालें। बीटी (Bacillus thuringiensis) 2 ग्राम/लीटर का छिड़काव करें।",
      kn: "ಸುಳಿಗೆ ಮರಳು ಮತ್ತು ಸುಣ್ಣದ ಮಿಶ್ರಣ ಅಥವಾ ಬೂದಿ ಹಾಕಿ. ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಿಸಿ.",
      as: "কলিত বালি আৰু চূণৰ মিশ্ৰণ (৯:১) বা ছাই দিয়ক। বি.টি (Bt) ২ গ্ৰাম/লিটাৰ স্প্ৰে কৰক।",
    },
    chemicalTreatment: {
      en: "Directed whorl application of Chlorantraniliprole 18.5% SC @ 0.4ml/L or Emamectin Benzoate 5% SG @ 0.4g/L.",
      hi: "गोभ को लक्ष्य करके क्लोरएंट्रानिलिप्रोल 18.5% SC 0.4 मिली/लीटर या इमामेक्टिन बेंजोएट 5% SG 0.4 ग्राम/लीटर का छिड़काव करें।",
      kn: "ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ೦.೪ ಮಿ.ಲೀ/ಲೀಟರ್ ಸುಳಿಗೆ ಬೀಳುವಂತೆ ಸಿಂಪಡಿಸಿ.",
      as: "ক্ল’ৰেনট্ৰানিলিপ্র’ল ১৮.৫% এছ.চি ০.৪ মিলি/লিটাৰ কলিত পৰাকৈ স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Install pheromone traps @ 5/acre. Intercrop with cowpea or desmodium (push-pull strategy) to deter ovipositing moths.",
      hi: "प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। मक्के के साथ लोबिया की अंतःफसल बोयें जिससे कीट आकर्षित न हों।",
      kn: "ಎಕರೆಗೆ ೫ ಫೆರೋಮೋನ್ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಅಲಸಂದೆ ಮಿಶ್ರ ಬೆಳೆಯಾಗಿ ಬೆಳೆಯಿರಿ.",
      as: "প্ৰতি একৰত ৫ টা ফেৰ’মন ফান্দ পাতক। মাহজাতীয় শস্যৰ সৈতে মিশ্ৰ খেতি কৰক।",
    },
    safeDosageWarning: {
      en: "High pressure spray directly into whorl requires full respirator protection. Do not spray grazing pasture boundaries.",
      hi: "गोभ में दवा डालते समय पूरा मुंह और नाक ढकें। चारागाह के पास छिड़काव न करें।",
      kn: "ನೇರವಾಗಿ ಸುಳಿಗೆ ಸಿಂಪಡಿಸುವಾಗ ಪೂರ್ಣ ಮುಖಗವಸು ಧರಿಸಿ.",
      as: "স্প্ৰে কৰাৰ সময়ত সম্পূৰ্ণ শ্বসন মাস্ক পিন্ধক। ঘাঁহনিৰ ওচৰত নিদিব।",
    },
    visual3d: {
      leafColor: "#16a34a",
      spotColor: "#78350f",
      spotSize: 0.16,
      spotCount: 7,
      wilted: true,
      deformScale: 1.25,
    },
    sampleImage: generateLeafSvg('Maize', '#15803d', '#92400e', 'spots'),
  },

  // 9. Maize - Northern Corn Leaf Blight
  {
    id: "maize_leaf_blight",
    crop: "Maize",
    cropLocalName: {
      en: "Maize (Corn)",
      hi: "मक्का",
      kn: "ಮೆಕ್ಕೆಜೋಳ",
      as: "মাকৈ",
    },
    diseaseName: "Northern Corn Leaf Blight",
    diseaseLocalName: {
      en: "Northern Leaf Blight",
      hi: "उत्तरी मक्का पत्ती झुलसा (टर्सिकम)",
      kn: "ಉತ್ತರದ ಎಲೆ ರೋಗ (ಬ್ಲೈಟ್)",
      as: "উত্তৰাঞ্চলীয় পাতৰ ব্লাইট",
    },
    scientificName: "Exserohilum turcicum (Setosphaeria turcica)",
    isHealthy: false,
    severity: "moderate",
    confidence: 95.1,
    symptoms: {
      en: "Long, elliptical, cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long) beginning on lower leaves and progressing upwards.",
      hi: "पत्तियों पर सिगार के आकार के लंबे (2.5 से 15 सेमी) धूसर-हरे से भूरे धब्बे, जो निचली पत्तियों से ऊपर की ओर फैलते हैं।",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಸಿಗಾರ್ ಆಕಾರದ ಉದ್ದನೆಯ ಬೂದು-ಹಸಿರು ಬಣ್ಣದ ಕಲೆಗಳು.",
      as: "পাতত চিগাৰৰ আকৃতিৰ দীঘলীয়া মুগা দাগ, যিবোৰ তলৰ পৰা ওপৰলৈ বিয়পে।",
    },
    organicTreatment: {
      en: "Spray 5% aqueous garlic extract or Trichoderma harzianum @ 10g/L. Shred and compost post-harvest maize stalks thoroughly.",
      hi: "5% लहसुन का अर्क या ट्राइकोडर्मा 10 ग्राम/लीटर का छिड़काव करें। कटाई के बाद डंठलों को खेत में सड़ाकर नष्ट करें।",
      kn: "ಬೆಳ್ಳುಳ್ಳಿ ಸಾರ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾ ಸಿಂಪಡಿಸಿ. ಕೊಯ್ಲಿನ ನಂತರ ಕಸವನ್ನು ಕಾಂಪೋಸ್ಟ್ ಮಾಡಿ.",
      as: "৫% নহৰুৰ মিশ্ৰণ স্প্ৰে কৰক। চপোৱাৰ পিছত নৰাবোৰ পচাই পেলাওক।",
    },
    chemicalTreatment: {
      en: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L or Mancozeb 75% WP @ 2.5g/L at tasseling onset.",
      hi: "एजोक्सीस्ट्रोबिन + डिफेनोकोनाजोल 1 मिली/लीटर या मैंकोजेब 2.5 ग्राम/लीटर का भुट्टे निकलने से पहले छिड़काव करें।",
      kn: "ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ + ಡೈಫೆನೊಕೊನಾಜೋಲ್ ೧ ಮಿ.ಲೀ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
      as: "এজক্সিষ্ট্ৰ’বিন + ডিফেন’ক’নাজ’ল ১ মিলি/লিটাৰ পানীত স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Deep summer ploughing to bury fungal debris; plant tolerant maize hybrids; maintain optimal plant spacing.",
      hi: "गर्मियों में गहरी जुताई करें ताकि फफूंद के अवशेष दब जाएं। रोगरोधी संकर किस्में लगाएं।",
      kn: "ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ. ರೋಗ ನಿರೋಧಕ ಹೈಬ್ರಿಡ್ ಬೀಜಗಳನ್ನು ಬಳಸಿ.",
      as: "খৰালি দকৈ হাল বাওক। ৰোগ প্ৰতিৰোধী হাইব্ৰিড জাত ব্যৱহাৰ কৰক।",
    },
    safeDosageWarning: {
      en: "Do not harvest sweet corn cobs within 10 days of azoxystrobin spray. Wash thoroughly.",
      hi: "दवा छिड़कने के 10 दिनों के अंदर भुट्टे न तोड़ें। उपयोग से पहले अच्छी तरह धोएं।",
      kn: "ಸಿಂಪಡಿಸಿದ ೧೦ ದಿನಗಳವರೆಗೆ ತೆನೆಗಳನ್ನು ಕೊಯ್ಲು ಮಾಡಬೇಡಿ.",
      as: "স্প্ৰে কৰাৰ ১০ দিনৰ ভিতৰত মাকৈ নচপাব।",
    },
    visual3d: {
      leafColor: "#4ade80",
      spotColor: "#713f12",
      spotSize: 0.18,
      spotCount: 5,
      wilted: false,
      deformScale: 1.1,
    },
    sampleImage: generateLeafSvg('Maize', '#22c55e', '#713f12', 'stripes'),
  },

  // 10. Potato - Late Blight
  {
    id: "potato_late_blight",
    crop: "Potato",
    cropLocalName: {
      en: "Potato",
      hi: "आलू",
      kn: "ಆಲೂಗಡ್ಡೆ",
      as: "আলু",
    },
    diseaseName: "Potato Late Blight",
    diseaseLocalName: {
      en: "Late Blight",
      hi: "आलू का पछेती झुलसा",
      kn: "ಆಲೂಗಡ್ಡೆ ತಡವಾದ ರೋಗ (ಲೇಟ್ ಬ್ಲೈಟ್)",
      as: "আলুৰ পচা ৰোগ (লেট ব্লাইট)",
    },
    scientificName: "Phytophthora infestans",
    isHealthy: false,
    severity: "critical",
    confidence: 98.2,
    symptoms: {
      en: "Water-soaked translucent dark green lesions rapidly becoming brown-black necrotized zones. Distinct rotten odor in fields during wet spells.",
      hi: "पत्तियों पर गीले गहरे हरे धब्बे जो शीघ्र ही काले-भूरे होकर गलने लगते हैं। नम मौसम में पूरे खेत से सड़ी हुई दुर्गंध आती है।",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ನೀರಿನಂತಹ ತೇವವಾದ ಕಪ್ಪು ಕಲೆಗಳು. ಹೊಲದಲ್ಲಿ ಕೊಳೆತ ವಾಸನೆ ಬರುತ್ತದೆ.",
      as: "পাতত পানী লগাৰ দৰে ক’লা দাগ যিবোৰ সোনকালে গেলিবলৈ ধৰে। পথাৰত পচা গোন্ধ ওলায়।",
    },
    organicTreatment: {
      en: "Spray 1% Bordeaux mixture or Copper Oxychloride 50% WP @ 3g/L preventively. De-haulm (cut foliage) 10 days before harvest.",
      hi: "रोग की रोकथाम के लिए 1% बोर्डो मिश्रण या कॉपर ऑक्सीक्लोराइड 3 ग्राम/लीटर का छिड़काव करें। खुदाई से 10 दिन पहले पौधों की बेल काट दें।",
      kn: "ಬೋರ್ಡೋ ಮಿಶ್ರಣ ೧% ಸಿಂಪಡಿಸಿ. ಕೊಯ್ಲಿಗೆ ೧೦ ದಿನಗಳ ಮೊದಲು ಸೊಪ್ಪನ್ನು ಕತ್ತರಿಸಿ.",
      as: "১% বৰড’ মিশ্ৰণ স্প্ৰে কৰক। আলু খন্দাৰ ১০ দিন পূৰ্বে গছৰ ডালবোৰ কাটি দিয়ক।",
    },
    chemicalTreatment: {
      en: "Dimethomorph 50% WP @ 1g/L + Mancozeb 75% WP @ 2g/L or Fenamidone 10% + Mancozeb 50% WG @ 2.5g/L.",
      hi: "डाइमेथोमॉर्फ 50% WP 1 ग्राम + मैंकोजेब 2 ग्राम/लीटर या फेनामिडोन + मैंकोजेब 2.5 ग्राम/लीटर का तुरंत छिड़काव करें।",
      kn: "ಡೈಮೆಥೋಮಾರ್ಫ್ + ಮ್ಯಾಂಕೋಜೆಬ್ ೨ ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
      as: "ডাইমেথ’মৰ্ফ + মেনক’জেব ২ গ্ৰাম/লিটাৰ পানীত মিহলাই স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Plant certified disease-free seed tubers (e.g. Kufri Pukhraj, Kufri Jyoti). High earthing-up prevents spores washing down to tubers.",
      hi: "प्रमाणित रोगमुक्त आलू बीज (जैसे कुफरी पुखराज, कुफरी ज्योति) लगाएं। मिट्टी अच्छी तरह चढ़ाएं ताकि फफूंद आलू तक न पहुंचे।",
      kn: "ಪ್ರಮಾಣೀಕೃತ ರೋಗ ಮುಕ್ತ ಬೀಜದ ಆಲೂಗಡ್ಡೆ ಬಳಸಿ. ಗಡ್ಡೆಗಳಿಗೆ ಮಣ್ಣನ್ನು ಚೆನ್ನಾಗಿ ಏರಿಸಿ.",
      as: "প্ৰমাণিত নিৰোগী বীজ আলু ৰোপণ কৰক। গছৰ গুৰিত ভালদৰে মাটি তুলি দিয়ক।",
    },
    safeDosageWarning: {
      en: "Strictly observe 20-day withholding period prior to harvesting seed potatoes. Disinfect sprayer tanks.",
      hi: "खुदाई से 20 दिन पहले कोई रासायनिक कीटनाशक न डालें। स्प्रे पंप को अच्छी तरह धोएं।",
      kn: "ಕೊಯ್ಲಿಗೆ ೨೦ ದಿನಗಳ ಮೊದಲು ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸಬೇಡಿ.",
      as: "আলু খন্দাৰ ২০ দিন আগৰ পৰা কোনো ৰাসায়নিক ঔষধ নিদিব।",
    },
    visual3d: {
      leafColor: "#14532d",
      spotColor: "#0a0a0a",
      spotSize: 0.24,
      spotCount: 8,
      wilted: true,
      deformScale: 1.35,
    },
    sampleImage: generateLeafSvg('Potato', '#166534', '#09090b', 'blight'),
  },

  // 11. Potato - Early Blight
  {
    id: "potato_early_blight",
    crop: "Potato",
    cropLocalName: {
      en: "Potato",
      hi: "आलू",
      kn: "ಆಲೂಗಡ್ಡೆ",
      as: "আলু",
    },
    diseaseName: "Potato Early Blight",
    diseaseLocalName: {
      en: "Early Blight",
      hi: "आलू का अगेती झुलसा",
      kn: "ಆಲೂಗಡ್ಡೆ ಆರಂಭಿಕ ರೋಗ (ಅರ್ಲಿ ಬ್ಲೈಟ್)",
      as: "আলুৰ আগতীয়া ব্লাইট",
    },
    scientificName: "Alternaria solani",
    isHealthy: false,
    severity: "moderate",
    confidence: 93.9,
    symptoms: {
      en: "Small isolated brown spots with dark concentric rings (target spots), mostly on lower senescing foliage.",
      hi: "पुरानी पत्तियों पर भूरे रंग के छल्लेदार धब्बे (टारगेट स्पॉट) जो धीरे-धीरे बढ़ते हैं और पत्तियां सूखकर गिरती हैं।",
      kn: "ಕೆಳಗಿನ ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು.",
      as: "তলৰ পাতবোৰত মুগা ৰঙৰ ঘূৰণীয়া চকাৰ দৰে দাগ।",
    },
    organicTreatment: {
      en: "Spray Trichoderma viride @ 5g/L or 10% cow urine solution with turmeric powder. Maintain balanced soil phosphorus.",
      hi: "ट्राइकोडर्मा विरिडी 5 ग्राम/लीटर या 10% गोमूत्र में हल्दी मिलाकर छिड़कें। फास्फोरस की संतुलित मात्रा दें।",
      kn: "ಟ್ರೈಕೋಡರ್ಮಾ ೫ ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ. ಹಳದಿ ಪುಡಿ ಮತ್ತು ಗೋಮೂತ್ರ ಸಹಕಾರಿ.",
      as: "ট্ৰাইকোডাৰ্মা ভিৰিডি ৫ গ্ৰাম/লিটাৰ বা হালধি মিশ্ৰিত গোমূত্ৰ স্প্ৰে কৰক।",
    },
    chemicalTreatment: {
      en: "Chlorothalonil 75% WP @ 2g/L or Propineb 70% WP @ 2g/L when spotting begins.",
      hi: "क्लोरोथैलोनिल 75% WP 2 ग्राम/लीटर या प्रोपिनेब 70% WP 2 ग्राम/लीटर का 10-12 दिन के अंतर पर छिड़काव करें।",
      kn: "ಕ್ಲೋರೋಥಾಲೋನಿಲ್ ೨ ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
      as: "ক্ল’ৰ’থাল’নিল ২ গ্ৰাম/লিটাৰ পানীত স্প্ৰে কৰক।",
    },
    prevention: {
      en: "Maintain optimum crop vigour; avoid irrigation late in the evening which prolongs leaf wetness hours.",
      hi: "शाम के समय सिंचाई न करें ताकि रातभर पत्तियों पर पानी न ठहरा रहे। फसल को स्वस्थ रखें।",
      kn: "ಸಂಜೆ ತಡವಾಗಿ ನೀರಾವರಿ ಮಾಡಬೇಡಿ.",
      as: "গধূলি সময়ত পানী নিদিব যাতে গোটেই ৰাতি পাতবোৰ তিতি নাথাকে।",
    },
    safeDosageWarning: {
      en: "Avoid tank mixing chlorothalonil with surfactant oils to prevent scorching foliage.",
      hi: "क्लोरोथैलोनिल में चिपकने वाला तेल न मिलाएं, इससे पत्तियां जल सकती हैं।",
      kn: "ಎಣ್ಣೆ ಪದಾರ್ಥಗಳೊಂದಿಗೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಬೇಡಿ.",
      as: "তেলজাতীয় পদাৰ্থৰ লগত মিহলাই স্প্ৰে নকৰিব।",
    },
    visual3d: {
      leafColor: "#365314",
      spotColor: "#451a03",
      spotSize: 0.13,
      spotCount: 9,
      wilted: false,
      deformScale: 1.05,
    },
    sampleImage: generateLeafSvg('Potato', '#4d7c0f', '#78350f', 'spots'),
  },

  // 12. Tomato - Healthy Foliage
  {
    id: "tomato_healthy",
    crop: "Tomato",
    cropLocalName: {
      en: "Tomato",
      hi: "टमाटर",
      kn: "ಟೊಮೆಟೊ",
      as: "টমেটো",
    },
    diseaseName: "Healthy Crop (No Disease)",
    diseaseLocalName: {
      en: "Healthy Crop (No Disease)",
      hi: "स्वस्थ पौधा (कोई रोग नहीं)",
      kn: "ಆರೋಗ್ಯಕರ ಬೆಳೆ (ರೋಗವಿಲ್ಲ)",
      as: "নিৰোগী শস্য (কোনো ৰোগ নাই)",
    },
    scientificName: "Solanum lycopersicum (Vigorous)",
    isHealthy: true,
    severity: "low",
    confidence: 99.4,
    symptoms: {
      en: "Vibrant deep green foliage, excellent turgidity, clean leaf margins, zero lesions or curling, robust root crown.",
      hi: "पत्तियां चमकदार हरी, तना मजबूत, कोई धब्बा या मुड़ाव नहीं। पौधा पूर्णतः स्वस्थ और ओजस्वी है।",
      kn: "ಹಸಿರಾದ ಹೊಳೆಯುವ ಎಲೆಗಳು, ಬಲವಾದ ಕಾಂಡ, ಯಾವುದೇ ಕಲೆಗಳಿಲ್ಲ.",
      as: "উজ্জ্বল সেউজীয়া পাত, মজবুত কাণ্ড, কোনো দাগ বা ৰোগৰ লক্ষণ নাই।",
    },
    organicTreatment: {
      en: "Continue routine preventative nourishment with Panchagavya @ 3% foliar spray every 14 days and vermicompost top-dressing.",
      hi: "पौधे की अच्छी सेहत बनाए रखने के लिए हर 14 दिन पर 3% पंचगव्य का छिड़काव और वर्मीकम्पोस्ट खाद देते रहें।",
      kn: "ಪ್ರತಿ ೧೪ ದಿನಗಳಿಗೊಮ್ಮೆ ೩% ಪಂಚಗವ್ಯ ಸಿಂಪಡಿಸಿ.",
      as: "প্ৰতি ১৪ দিনৰ মূৰে মূৰে ৩% পঞ্চগব্য স্প্ৰে কৰি থাকক।",
    },
    chemicalTreatment: {
      en: "No chemical intervention required. Conserve beneficial predators (ladybugs, hoverfly larvae, spiders).",
      hi: "किसी रासायनिक दवा की आवश्यकता नहीं है। मित्र कीटों (जैसे लेडीबर्ड बीटल) का संरक्षण करें।",
      kn: "ಯಾವುದೇ ರಾಸಾಯನಿಕಗಳ ಅಗತ್ಯವಿಲ್ಲ. ಉಪಯುಕ್ತ ಕೀಟಗಳನ್ನು ರಕ್ಷಿಸಿ.",
      as: "কোনো ৰাসায়নিক ঔষধৰ প্ৰয়োজন নাই। উপকাৰী কীটবোৰ সংৰক্ষণ কৰক।",
    },
    prevention: {
      en: "Maintain regular drip schedule, optimal soil aeration, and scout field twice weekly for any early signs.",
      hi: "नियमित ड्रिप सिंचाई जारी रखें और सप्ताह में दो बार खेत का निरीक्षण करते रहें।",
      kn: "ನಿಯಮಿತ ಹನಿ ನೀರಾವರಿ ಮುಂದುವರಿಸಿ.",
      as: "নিয়মীয়াকৈ পানী দিয়ক আৰু সপ্তাহত দুবাৰ পথাৰ পৰিদৰ্শন কৰক।",
    },
    safeDosageWarning: {
      en: "Maintain biological balance. Routine unnecessary sprays create pesticide resistance.",
      hi: "अनावश्यक दवा न छिड़कें, इससे कीटों में प्रतिरोधक क्षमता बढ़ती है।",
      kn: "ಅನಗತ್ಯವಾಗಿ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ.",
      as: "অপ্ৰয়োজনীয়ভাৱে কীটনাশক ব্যৱহাৰ নকৰিব।",
    },
    visual3d: {
      leafColor: "#15803d",
      spotColor: "#16a34a",
      spotSize: 0,
      spotCount: 0,
      wilted: false,
      deformScale: 1.0,
    },
    sampleImage: generateLeafSvg('Tomato', '#16a34a', '#22c55e', 'clean'),
  },

  // 13. Rice - Healthy Foliage
  {
    id: "rice_healthy",
    crop: "Rice",
    cropLocalName: {
      en: "Rice (Paddy)",
      hi: "धान (चावल)",
      kn: "ಭತ್ತ",
      as: "ধান",
    },
    diseaseName: "Healthy Paddy (No Disease)",
    diseaseLocalName: {
      en: "Healthy Paddy (No Disease)",
      hi: "स्वस्थ धान (कोई रोग नहीं)",
      kn: "ಆರೋಗ್ಯಕರ ಭತ್ತ (ರೋಗವಿಲ್ಲ)",
      as: "নিৰোগী ধান (কোনো ৰোগ নাই)",
    },
    scientificName: "Oryza sativa (Optimal Chlorophyll)",
    isHealthy: true,
    severity: "low",
    confidence: 99.1,
    symptoms: {
      en: "Uniform lush emerald green canopy, erect leaves with optimal photosynthetic angle, clean tillers, robust panicle initiation.",
      hi: "धान की फसल हरी-भरी और लहलहाती है। पत्तियां सीधी, तने मजबूत और स्वस्थ कल्ले फूट रहे हैं।",
      kn: "ಏಕರೂಪದ ಹಸಿರು ಬೆಳೆ, ನೆಟ್ಟಗೆ ನಿಂತಿರುವ ಎಲೆಗಳು, ಆರೋಗ್ಯಕರ ತೆನೆಗಳು.",
      as: "সমানে সেউজীয়া হৈ থকা ধাননি, থিয় পাত আৰু নিৰোগী পোখা।",
    },
    organicTreatment: {
      en: "Maintain bio-fertilizer health: apply Azospirillum and Phosphate Solubilizing Bacteria (PSB) with vermicompost.",
      hi: "एजोस्पिरिलम और फॉस्फेट घुलनशील बैक्टीरिया (PSB) को वर्मीकम्पोस्ट के साथ दें।",
      kn: "ಅಜೋಸ್ಪೈರಿಲಮ್ ಮತ್ತು ಜೈವಿಕ ಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ.",
      as: "জৈৱিক সাৰ আৰু পি.এছ.বি (PSB) প্ৰয়োগ অব্যাহত ৰাখক।",
    },
    chemicalTreatment: {
      en: "Zero chemical application needed. Monitor weather alerts for high humidity or rainfall forecasting.",
      hi: "रासायनिक कीटनाशक की कोई आवश्यकता नहीं है। मौसम के पूर्वानुमान पर नजर रखें।",
      kn: "ರಾಸಾಯನಿಕಗಳ ಅಗತ್ಯವಿಲ್ಲ.",
      as: "কোনো ৰাসায়নিক স্প্ৰে’ৰ প্ৰয়োজন নাই।",
    },
    prevention: {
      en: "Keep bunds clean of wild host grasses; practice Alternate Wetting and Drying (AWD) irrigation to strengthen root aeration.",
      hi: "मेड़ों को खरपतवार मुक्त रखें। पानी बचत के लिए रुक-रुक कर सिंचाई (AWD) करें जिससे जड़ें मजबूत रहें।",
      kn: "ಬದುಗಳನ್ನು ಕಳೆ ಮುಕ್ತವಾಗಿಡಿ.",
      as: "আলিৰ বন-বাত পৰিষ্কাৰ কৰি ৰাখক।",
    },
    safeDosageWarning: {
      en: "Keep water table well managed. Do not spray chemicals when crops are thriving healthily.",
      hi: "स्वस्थ फसल पर बेवजह कोई रसायन न डालें।",
      kn: "ಆರೋಗ್ಯಕರ ಬೆಳೆಯ ಮೇಲೆ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ.",
      as: "নিৰোগী শস্যত কোনো ৰাসায়নিক দ্ৰব্য নিছিটিব।",
    },
    visual3d: {
      leafColor: "#22c55e",
      spotColor: "#4ade80",
      spotSize: 0,
      spotCount: 0,
      wilted: false,
      deformScale: 1.0,
    },
    sampleImage: generateLeafSvg('Rice', '#22c55e', '#86efac', 'clean'),
  },
];
