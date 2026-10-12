export interface HotspotPin {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
}

export interface TaskStep {
  stepNumber: number;
  title: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  instruction: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  tips: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  warning: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  modelFocus: string;
  hotspots?: HotspotPin[];
}

export interface TrainingTask {
  id: string;
  title: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  category: 'Agronomy' | 'Irrigation' | 'Plant Protection' | 'Organic Farming' | 'Farm Machinery';
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: {
    en: string;
    hi: string;
    kn: string;
    as: string;
  };
  scene3dType: 'sowing_spacing' | 'drip_irrigation' | 'pesticide_ppe' | 'compost_pit' | 'sri_rice' | 'tractor_safety';
  steps: TaskStep[];
}

export const TRAINING_TASKS: TrainingTask[] = [
  // 1. Seed Sowing & Spacing Protocol
  {
    id: "seed_sowing_spacing",
    title: {
      en: "Scientific Seed Sowing & Row Spacing",
      hi: "वैज्ञानिक बीज बुवाई एवं कतार दूरी प्रोटोकॉल",
      kn: "ವೈಜ್ಞಾನಿಕ ಬೀಜ ಬಿತ್ತನೆ ಮತ್ತು ಸಾಲು ಅಂತರ",
      as: "বৈজ্ঞানিক বীজ সিঁচা আৰু শাৰীৰ দূৰত্ব",
    },
    category: "Agronomy",
    estimatedMinutes: 8,
    difficulty: "Beginner",
    summary: {
      en: "Master optimal furrow depth, seed treatment with bio-agents, and laser-precise plant-to-plant spacing for maximum yield.",
      hi: "अधिकतम पैदावार हेतु सटीक नाली गहराई, ट्राइकोडर्मा बीज शोधन एवं कतार-से-कतार दूरी का संपूर्ण अभ्यास।",
      kn: "ಗರಿಷ್ಠ ಇಳುವರಿಗಾಗಿ ಸೂಕ್ತ ಸಾಲುಗಳ ಅಂತರ ಮತ್ತು ಬೀಜೋಪಚಾರದ ತರಬೇತಿ.",
      as: "সঠিক বীজ শোধন আৰু শাৰীৰ দূৰত্ব মানি বীজ সিঁচাৰ ব্যৱহাৰিক পদ্ধতি।",
    },
    scene3dType: "sowing_spacing",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Bio-Fungicide Seed Treatment",
          hi: "जैविक फफूंदनाशी से बीज शोधन",
          kn: "ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ ಬೀಜೋಪಚಾರ",
          as: "জৈৱিক ভেঁকুৰনাশকৰে বীজ শোধন",
        },
        instruction: {
          en: "Coat 1 kg seeds with 10g Trichoderma viride or Pseudomonas fluorescens using 10ml jaggery (gur) slurry as adhesive binder. Dry in shade for 30 minutes.",
          hi: "1 किलो बीज में 10 ग्राम ट्राइकोडर्मा विरिडी या स्यूडोमोनास मिलाएं। गुड़ के 10 मिली शीरे का उपयोग चिपकने के लिए करें और 30 मिनट छांव में सुखाएं।",
          kn: "೧ ಕೆಜಿ ಬೀಜಕ್ಕೆ ೧೦ ಗ್ರಾಂ ಟ್ರೈಕೋಡರ್ಮಾ ಮತ್ತು ಬೆಲ್ಲದ ನೀರನ್ನು ಬೆರೆಸಿ. ೩೦ ನಿಮಿಷ ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸಿ.",
          as: "১ কেজি বীজত ১০ গ্ৰাম ট্ৰাইকোডাৰ্মা আৰু গুড়ৰ পানী মিহলাই ৩০ মিনিট ছাঁত শুকুৱাওক।",
        },
        tips: {
          en: "Never dry bio-treated seeds in direct harsh sunlight; UV rays deactivate living microbial spores.",
          hi: "बीज शोधन के बाद कभी भी तेज धूप में न सुखाएं, इससे जीवित जीवाणु नष्ट हो जाते हैं।",
          kn: "ನೇರ ಸೂರ್ಯನ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಬೇಡಿ.",
          as: "পোনপটীয়া ৰ'দত বীজ নুশুকাব।",
        },
        warning: {
          en: "If seeds were pre-treated with chemical fungicide, do not mix bio-agents simultaneously (keep 24-hr gap).",
          hi: "यदि रासायनिक फफूंदनाशी से उपचार किया गया हो, तो जैविक कल्चर तुरंत न मिलाएं। 24 घंटे का अंतर रखें।",
          kn: "ರಾಸಾಯನಿಕ ಮತ್ತು ಜೈವಿಕ ಔಷಧಗಳನ್ನು ಒಟ್ಟಿಗೆ ಬಳಸಬೇಡಿ.",
          as: "ৰাসায়নিক আৰু জৈৱিক ঔষধ একেলগে ব্যৱহাৰ নকৰিব।",
        },
        modelFocus: "seed_dish",
        hotspots: [
          { id: 'h1', position: [0, 0.4, 0], title: 'Jaggery Slurry Binder', description: 'Provides carbohydrates to bacteria and adheres powder to seed coats.' },
          { id: 'h2', position: [0.6, 0.2, 0], title: 'Shade Drying Mat', description: 'Prevents UV-induced spore mortality.' }
        ]
      },
      {
        stepNumber: 2,
        title: {
          en: "Furrow Depth Calibration (3-5 cm)",
          hi: "नाली की गहराई मापन (3-5 सेमी)",
          kn: "ಸಾಲುಗಳ ಆಳ ಮಾಪನ (೩-೫ ಸೆಂ.ಮೀ)",
          as: "নলাৰ গভীৰতা নিৰ্ধাৰণ (৩-৫ ছেমি)",
        },
        instruction: {
          en: "Open straight parallel furrows at exactly 3 to 5 cm depth. Sowing deeper than 5 cm causes poor coleoptile emergence and weak seedlings.",
          hi: "खेत में ठीक 3 से 5 सेमी गहराई की समानांतर नालियां बनाएं। 5 सेमी से अधिक गहरा बोने पर बीज का अंकुरण कमजोर होता है।",
          kn: "೩ ರಿಂದ ೫ ಸೆಂ.ಮೀ ಆಳದ ಸಾಲುಗಳನ್ನು ಮಾಡಿ. ಹೆಚ್ಚು ಆಳವಾಗಿ ಬಿತ್ತಿದರೆ ಮೊಳಕೆ ದುರ್ಬಲವಾಗುತ್ತದೆ.",
          as: "ঠিক ৩-৫ ছেমি গভীৰ নলা কাচক। বেছি দকৈ সিঁচিলে গজালি ওলোৱাত বাধা হয়।",
        },
        tips: {
          en: "Use a depth-limiting notch on your wooden seed marker or peg pegboard.",
          hi: "नाली बनाते समय लकड़ी के खूंटे पर 5 सेमी पर निशान लगाकर गहराई सुनिश्चित करें।",
          kn: "ಆಳವನ್ನು ಅಳೆಯಲು ಗುರುತು ಮಾಡಿದ ಕೋಲನ್ನು ಬಳಸಿ.",
          as: "গভীৰতা জুখিবলৈ চিহ্নিত মাৰি ব্যৱহাৰ কৰক।",
        },
        warning: {
          en: "Shallow sowing (< 2 cm) exposes seeds to bird feeding and rapid surface desiccation.",
          hi: "2 सेमी से कम उथला बोने पर चिड़िया बीज चुग लेती हैं और नमी जल्दी सूख जाती है।",
          kn: "೨ ಸೆಂ.ಮೀ ಗಿಂತ ಕಡಿಮೆ ಆಳದಲ್ಲಿ ಬಿತ್ತಿದರೆ ಪಕ್ಷಿಗಳು ಬೀಜಗಳನ್ನು ತಿನ್ನುತ್ತವೆ.",
          as: "অতি পাতলকৈ সিঁচিলে চৰায়ে বীজ খাই পেলাব পাৰে।",
        },
        modelFocus: "furrow_trench",
        hotspots: [
          { id: 'h3', position: [0, 0.05, 0], title: 'Furrow Base (4 cm)', description: 'Optimum capillary moisture zone for radicle emergence.' }
        ]
      },
      {
        stepNumber: 3,
        title: {
          en: "Standard Geometry (45 cm × 15 cm)",
          hi: "कतार और पौधे की दूरी (45 सेमी × 15 सेमी)",
          kn: "ಸಾಲು ಮತ್ತು ಗಿಡಗಳ ಅಂತರ (೪೫ ಸೆಂ.ಮೀ × ೧೫ ಸೆಂ.ಮೀ)",
          as: "শাৰী আৰু গছৰ দূৰত্ব (৪৫ ছেমি × ১৫ ছেমি)",
        },
        instruction: {
          en: "Maintain 45 cm between rows and 15 cm between individual plants. This spatial configuration maximizes light interception and canopy photosynthesis.",
          hi: "कतार से कतार की दूरी 45 सेमी और पौधे से पौधे की दूरी 15 सेमी रखें। इससे पौधों को पूरी धूप, हवा और पोषक तत्व मिलते हैं।",
          kn: "ಸಾಲುಗಳ ನಡುವೆ ೪೫ ಸೆಂ.ಮೀ ಮತ್ತು ಗಿಡಗಳ ನಡುವೆ ೧೫ ಸೆಂ.ಮೀ ಅಂತರವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ.",
          as: "শাৰীৰ মাজত ৪৫ ছেমি আৰু গছৰ মাজত ১৫ ছেমি ব্যৱধান ৰাখক।",
        },
        tips: {
          en: "Stretched jute guide ropes with pre-tied knot markers guarantee perfectly straight rows.",
          hi: "खेत में सूत की रस्सी पर 15-15 सेमी पर गांठें बांधकर बुवाई करने से कतारें बिल्कुल सीधी रहती हैं।",
          kn: "ನೇರ ಸಾಲುಗಳಿಗಾಗಿ ಹಗ್ಗದ ಮೇಲೆ ಗುರುತುಗಳನ್ನು ಬಳಸಿ.",
          as: "পোন শাৰীৰ বাবে ৰচীৰ ওপৰত গাঁঠি মাৰি ব্যৱহাৰ কৰক।",
        },
        warning: {
          en: "Crowding (< 10 cm) triggers apical dominance, leggy weak stalks, and severe lodging risk.",
          hi: "10 सेमी से कम दूरी रखने पर पौधे पतले और कमजोर हो जाते हैं तथा हवा चलने पर गिर जाते हैं।",
          kn: "ಹೆಚ್ಚು ದಟ್ಟವಾಗಿ ಬಿತ್ತಿದರೆ ಬೆಳೆ ಗಾಳಿಗೆ ಬೀಳುವ ಸಾಧ್ಯತೆಯಿದೆ.",
          as: "অধিক ঘনকৈ সিঁচিলে গছবোৰ ওখ আৰু দুৰ্বল হৈ বাগৰি পৰে।",
        },
        modelFocus: "spacing_grid",
        hotspots: [
          { id: 'h4', position: [-0.45, 0.1, 0], title: 'Row Margin (45 cm)', description: 'Permits easy inter-cultivation and mechanical weeding.' },
          { id: 'h5', position: [0.15, 0.1, 0], title: 'Intra-Row Gap (15 cm)', description: 'Eliminates root zone resource competition.' }
        ]
      },
      {
        stepNumber: 4,
        title: {
          en: "Fine Soil Blanket & Light Packing",
          hi: "भुरभुरी मिट्टी से ढंकना व हल्का दबाव",
          kn: "ಮಣ್ಣು ಮುಚ್ಚುವುದು ಮತ್ತು ಹಗುರ ಒತ್ತಡ",
          as: "মিহি মাটিৰে ঢকা আৰু সামান্য হেঁচা",
        },
        instruction: {
          en: "Gently cover seeds with friable, crumbly pulverized topsoil. Press lightly with palm or wooden plank to ensure solid seed-to-soil capillary contact.",
          hi: "बीज को भुरभुरी बारीक मिट्टी से ढकें। हथेली या लकड़ी के पाटे से हल्का दबाएं ताकि बीज मिट्टी से अच्छी तरह सट जाए।",
          kn: "ಬೀಜಗಳನ್ನು ಮೃದುವಾದ ಮಣ್ಣಿನಿಂದ ಮುಚ್ಚಿ ಮತ್ತು ನಿಧಾನವಾಗಿ ಒತ್ತಿ.",
          as: "বীজবোৰ মিহি মাটিৰে ঢাকি হাতৰ তলুৱাৰে সামান্য হেঁচি দিয়ক যাতে মাটিৰ সৈতে ভালদৰে লাগি থাকে।",
        },
        tips: {
          en: "Sprinkle light dry straw mulch on top if extreme daytime heat is anticipated.",
          hi: "यदि तेज धूप या गर्मी हो तो ऊपर से हल्के पुआल की पतली परत बिछाएं।",
          kn: "ಹೆಚ್ಚು ಬಿಸಿಲಿದ್ದರೆ ಮೇಲೆ ತೆಳುವಾದ ಒಣ ಹುಲ್ಲನ್ನು ಹರಡಿ.",
          as: "অধিক ৰ’দ থাকিলে পাতলকৈ খেৰৰ জাবৰ ছটিয়াই দিয়ক।",
        },
        warning: {
          en: "Do not tamp with heavy feet; crusting impedes tender shoot emergence.",
          hi: "मिट्टी को पैरों से जोर से न दबाएं, कठोर पपड़ी जमने से अंकुर बाहर नहीं आ पाएगा।",
          kn: "ಮಣ್ಣನ್ನು ಗಟ್ಟಿಯಾಗಿ ತುಳಿಯಬೇಡಿ.",
          as: "মাটি ওপৰত টানকৈ ভৰিৰে গচকি নিদিব।",
        },
        modelFocus: "soil_bed",
      }
    ]
  },

  // 2. Drip-Irrigation Setup & Maintenance
  {
    id: "drip_irrigation_setup",
    title: {
      en: "Drip-Irrigation Setup & Maintenance",
      hi: "ड्रिप सिंचाई प्रणाली स्थापना एवं रखरखाव",
      kn: "ಹನಿ ನೀರಾವರಿ ಸ್ಥಾಪನೆ ಮತ್ತು ನಿರ್ವಹಣೆ",
      as: "ড্ৰিপ জলসিঞ্চন ব্যৱস্থা স্থাপন আৰু সংৰক্ষণ",
    },
    category: "Irrigation",
    estimatedMinutes: 10,
    difficulty: "Intermediate",
    summary: {
      en: "Learn mainline connection, venturi fertigation injector calibration, lateral drip line layout, and emitter de-clogging.",
      hi: "मुख्य पाइपलाइन जोड़ना, वेंचुरी फर्टिगेशन यूनिट, ड्रिप लेटरल बिछाना एवं ड्रिपर की सफाई का व्यावहारिक प्रशिक्षण।",
      kn: "ಮುಖ್ಯ ಪೈಪ್‌ಲೈನ್, ವೆಂಚುರಿ ಘಟಕ ಮತ್ತು ಹನಿ ರಂಧ್ರಗಳ ನಿರ್ವಹಣೆಯ ಸಮಗ್ರ ಮಾರ್ಗದರ್ಶನ.",
      as: "মূল পাইপ সংস্থাপন, ভেঞ্চুৰি সাৰ প্ৰয়োগ আৰু ড্ৰিপাৰ পৰিষ্কাৰ কৰাৰ ব্যৱহাৰিক শিক্ষা।",
    },
    scene3dType: "drip_irrigation",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Mainline & Disc Filter Assembly",
          hi: "मुख्य पाइप एवं डिस्क फिल्टर फिटिंग",
          kn: "ಮುಖ್ಯ ಪೈಪ್ ಮತ್ತು ಡಿಸ್ಕ್ ಫಿಲ್ಟರ್ ಅಳವಡಿಕೆ",
          as: "মূল পাইপ আৰু ফিল্টাৰ সংযোগ",
        },
        instruction: {
          en: "Connect 63mm PVC mainline through 120-mesh Disc Filter. Verify water flow direction arrow marked on the filter casing.",
          hi: "63 मिमी मुख्य पीवीसी पाइप को 120-मेश डिस्क फिल्टर से जोड़ें। फिल्टर पर बने तीर के निशान से पानी के बहाव की दिशा जांचें।",
          kn: "೬೩ ಎಂಎಂ ಪೈಪ್‌ಗೆ ಡಿಸ್ಕ್ ಫಿಲ್ಟರ್ ಜೋಡಿಸಿ. ನೀರಿನ ಹರಿವಿನ ಬಾಣದ ಗುರುತನ್ನು ಪರೀಕ್ಷಿಸಿ.",
          as: "৬৩ মিমি পাইপত ১২০-মেশ্ব ডিস্ক ফিল্টাৰ লগাওক আৰু পানীৰ দিশ পৰীক্ষা কৰক।",
        },
        tips: {
          en: "A dual pressure gauge setup before and after the filter reveals clogging when pressure drop exceeds 0.5 kg/cm².",
          hi: "फिल्टर के आगे-पीछे प्रेशर गेज लगाएं; 0.5 किग्रा से ज्यादा दबाव गिरने पर फिल्टर तुरंत साफ करें।",
          kn: "ಒತ್ತಡದ ವ್ಯತ್ಯಾಸ ತಿಳಿದುಕೊಳ್ಳಲು ಪ್ರೆಶರ್ ಗೇಜ್ ಬಳಸಿ.",
          as: "ফিল্টাৰৰ চাপ পৰীক্ষা কৰিবলৈ প্ৰেচাৰ গজ ব্যৱহাৰ কৰক।",
        },
        warning: {
          en: "Operating without disc filter will irreversibly clog micro-emitters within 48 hours.",
          hi: "बिना फिल्टर के ड्रिप चलाने पर 48 घंटे के अंदर बारीक ड्रिपर कचरे से जाम हो जाएंगे।",
          kn: "ಫಿಲ್ಟರ್ ಇಲ್ಲದೆ ಹನಿ ನೀರಾವರಿ ಚಲಾಯಿಸಬೇಡಿ.",
          as: "ফিল্টাৰ নোহোৱাকৈ পানী দিলে ড্ৰিপাৰবোৰ বন্ধ হৈ পৰিব।",
        },
        modelFocus: "disc_filter",
        hotspots: [
          { id: 'h_f1', position: [0, 0.5, 0], title: '120-Mesh Disc Stack', description: 'Traps organic algae and sand particulates.' },
          { id: 'h_f2', position: [0.3, 0.8, 0], title: 'Pressure Gauge Port', description: 'Monitors operating line pressure (optimum: 1.5 - 2.0 bar).' }
        ]
      },
      {
        stepNumber: 2,
        title: {
          en: "Venturi Fertigation Unit Installation",
          hi: "वेंचुरी फर्टिगेशन यूनिट जोड़ना",
          kn: "ವೆಂಚುರಿ ರಸಗೊಬ್ಬರ ಘಟಕ ಅಳವಡಿಕೆ",
          as: "ভেঞ্চুৰি সাৰ প্ৰয়োগ ইউনিট সংযোগ",
        },
        instruction: {
          en: "Install bypass venturi injector across control valve. Adjust throttle valve to generate a 25% differential pressure that creates vacuum suction.",
          hi: "बायपास वॉल्व के साथ वेंचुरी इंजेक्टर लगाएं। थ्रॉटल वॉल्व को ऐसे सेट करें कि वैक्यूम खिंचाव पैदा होकर खाद का घोल खिंचने लगे।",
          kn: "ವೆಂಚುರಿ ಇಂಜೆಕ್ಟರ್ ಅಳವಡಿಸಿ. ನಿರ್ವಾತ ಹೀರುವಿಕೆಯನ್ನು ಸರಿಹೊಂದಿಸಿ.",
          as: "ভেঞ্চুৰি ইনজেক্টৰ সংযোগ কৰক আৰু সাৰ টানি নিবলৈ ভেকুৱাম সৃষ্টি কৰক।",
        },
        tips: {
          en: "Always dissolve water-soluble fertilizer in a clean plastic drum; strain through nylon mesh before suction.",
          hi: "पानी में घुलनशील खाद को प्लास्टिक ड्रम में घोलें और छानकर ही वेंचुरी से खींचे।",
          kn: "ಗೊಬ್ಬರವನ್ನು ಚೆನ್ನಾಗಿ ಕರಗಿಸಿ ಸೋಸಿ ಬಳಸಿ.",
          as: "সাৰৰ মিশ্ৰণটো ভালদৰে চেকি ব্যৱহাৰ কৰক।",
        },
        warning: {
          en: "Never inject insoluble superphosphate or uncomposted slurry through venturi.",
          hi: "अघुलनशील खाद या गोबर की गाढ़ी स्लरी वेंचुरी में कभी न डालें।",
          kn: "ಕರಗದ ರಸಗೊಬ್ಬರಗಳನ್ನು ಹಾಕಬೇಡಿ.",
          as: "পানীত নিমিহলি হোৱা সাৰ কেতিয়াও প্ৰয়োগ নকৰিব।",
        },
        modelFocus: "venturi_valve",
      },
      {
        stepNumber: 3,
        title: {
          en: "Lateral Tube Laying & Emitter Spacing",
          hi: "लेटरल पाइप बिछाना व ड्रिपर की स्थिति",
          kn: "ಹನಿ ಕೊಳವೆಗಳನ್ನು ಹಾಸುವುದು",
          as: "ড্ৰিপ নলী পৰা আৰু ড্ৰিপাৰৰ স্থান নিৰ্ধাৰণ",
        },
        instruction: {
          en: "Unroll 16mm LLDPE lateral pipes along crop beds without sharp kinks. Position online/inline emitters (2 or 4 LPH) facing upward.",
          hi: "16 मिमी लेटरल पाइप को क्यारियों के साथ सीधा बिछाएं, पाइप मुड़ने न पाए। ड्रिपर (2 या 4 लीटर/घंटा) का मुंह ऊपर की ओर रखें।",
          kn: "೧೬ ಎಂಎಂ ಕೊಳವೆಗಳನ್ನು ನೇರವಾಗಿ ಹರಡಿ. ಡ್ರಿಪ್ಪರ್ ಮೇಲ್ಮುಖವಾಗಿರಲಿ.",
          as: "১৬ মিমি নলী চিধাকৈ পাৰক আৰু ড্ৰিপাৰৰ মুখখন ওপৰলৈ ৰাখক।",
        },
        tips: {
          en: "Upward-facing emitters allow sediments to settle at bottom of pipe without blocking micro-orifices.",
          hi: "ड्रिपर ऊपर रखने से पाइप की तली में बैठा कचरा ड्रिपर में नहीं घुसता।",
          kn: "ಡ್ರಿಪ್ಪರ್ ಮೇಲಿದ್ದರೆ ಕಸ ತುಂಬಿಕೊಳ್ಳುವುದಿಲ್ಲ.",
          as: "ড্ৰিপাৰ ওপৰমুৱা হৈ থাকিলে তলৰ ধূলিয়ে ফুটা বন্ধ নকৰে।",
        },
        warning: {
          en: "Avoid dragging pipes over sharp stone surfaces to prevent perforation leaks.",
          hi: "नुकीले पत्थरों पर पाइप खींचने से बचें, पाइप में छेद हो सकता है।",
          kn: "ಚೂಪಾದ ಕಲ್ಲುಗಳ ಮೇಲೆ ಪೈಪ್ ಎಳೆಯಬೇಡಿ.",
          as: "চোকা শিলৰ ওপৰেৰে পাইপ নিটানিলে ফুটা হ’ব পাৰে।",
        },
        modelFocus: "lateral_pipe",
      },
      {
        stepNumber: 4,
        title: {
          en: "System Flushing & End Cap Sealing",
          hi: "सिस्टम फ्लशिंग एवं एंड-कैप बंद करना",
          kn: "ಪೈಪ್ ಸ್ವಚ್ಛಗೊಳಿಸುವಿಕೆ ಮತ್ತು ಎಂಡ್ ಕ್ಯಾಪ್ ಮುಚ್ಚುವುದು",
          as: "পানীৰে পৰিষ্কাৰ কৰা আৰু শেষৰ মূৰ বন্ধ কৰা",
        },
        instruction: {
          en: "Turn on pump with all end caps open for 3 minutes to flush dirt and manufacturing debris. Close end caps with figure-8 locks once clean water emerges.",
          hi: "सभी पाइपों के अंतिम सिरे (एंड कैप) खुले रखकर 3 मिनट पानी चलाएं ताकि कचरा बाहर निकल जाए। साफ पानी आने पर 8-आकार के लॉक से सिरे बंद करें।",
          kn: "ಕಸ ಹೊರಹೋಗಲು ತುದಿಗಳನ್ನು ತೆರೆದು ೩ ನಿಮಿಷ ನೀರು ಹರಿಸಿ. ನಂತರ ಎಂಡ್ ಕ್ಯಾಪ್ ಹಾಕಿ.",
          as: "পাইপৰ শেষ মূৰবোৰ খুলি ৩ মিনিট পানী ওলাই যাবলৈ দিয়ক আৰু পৰিষ্কাৰ পানী ওলালে বন্ধ কৰক।",
        },
        tips: {
          en: "Perform acid treatment (Hydrochloric acid / Phosphoric acid @ pH 4.0) once every 3 months to dissolve carbonate scale.",
          hi: "हर 3 महीने में खारे पानी की पपड़ी छुड़ाने के लिए हल्का एसिड ट्रीटमेंट करें।",
          kn: "ಉಪ್ಪಿನ ಅಂಶ ತೆಗೆಯಲು ೩ ತಿಂಗಳಿಗೊಮ್ಮೆ ಆಮ್ಲ ಚಿಕಿತ್ಸೆ ಮಾಡಿ.",
          as: "৩ মাহৰ মূৰে মূৰে লৱণৰ ডাঠ আৱৰণ পৰিষ্কাৰ কৰক।",
        },
        warning: {
          en: "Never close end caps before flushing; trapped gravel will plug emitters immediately upon pressurization.",
          hi: "फ्लश किए बिना कभी एंड कैप न लगाएं, नहीं तो सारा कचरा ड्रिपर में फंस जाएगा।",
          kn: "ಸ್ವಚ್ಛಗೊಳಿಸದೆ ಎಂಡ್ ಕ್ಯಾಪ್ ಹಾಕಬೇಡಿ.",
          as: "নলা পৰিষ্কাৰ নকৰাকৈ মূৰ বন্ধ নকৰিব।",
        },
        modelFocus: "end_cap",
      }
    ]
  },

  // 3. Safe Chemical Spraying & PPE Protocol
  {
    id: "pesticide_ppe_safety",
    title: {
      en: "Safe Pesticide Spraying & 5-Point PPE",
      hi: "सुरक्षित कीटनाशक छिड़काव एवं 5-बिंदु पीपीई किट",
      kn: "ಸುರಕ್ಷಿತ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಮತ್ತು ಪಿಪಿಇ",
      as: "নিৰাপদ কীটনাশক প্ৰয়োগ আৰু ৫-দফীয়া সুৰক্ষা সঁজুলি",
    },
    category: "Plant Protection",
    estimatedMinutes: 7,
    difficulty: "Beginner",
    summary: {
      en: "Essential occupational safety guidelines: PPE donning sequence, wind direction assessment, nozzle height control, and de-contamination.",
      hi: "किसान सुरक्षा: पीपीई किट पहनने का सही क्रम, हवा की दिशा की जांच, नोजल ऊंचाई नियंत्रण एवं उपकरण की धुलाई।",
      kn: "ರೈತರ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು: ಪಿಪಿಇ ಧರಿಸುವ ವಿಧಾನ ಮತ್ತು ಗಾಳಿಯ ದಿಕ್ಕಿನ ಪರಿಶೀಲನೆ.",
      as: "কৃষকৰ স্বাস্থ্য সুৰক্ষা: সুৰক্ষা কিট পিন্ধাৰ ক্ৰম আৰু বতাহৰ দিশ চাই স্প্ৰে কৰাৰ নিয়ম।",
    },
    scene3dType: "pesticide_ppe",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "5-Point Personal Protective Equipment (PPE)",
          hi: "5-बिंदु व्यक्तिगत सुरक्षा उपकरण (पीपीई)",
          kn: "೫-ಹಂತದ ವೈಯಕ್ತಿಕ ಸುರಕ್ಷತಾ ಸಾಧನಗಳು",
          as: "৫-দফীয়া ব্যক্তিগত সুৰক্ষা সাজ-পোছাক",
        },
        instruction: {
          en: "Don protective equipment in exact sequence: 1) Nitrile chemical-resistant gloves, 2) Chemical splash goggles, 3) N95/organic vapor respirator, 4) Waterproof apron/suit, 5) Rubber gumboots.",
          hi: "पीपीई किट सही क्रम में पहनें: 1) रासायनिक नाइट्राइल दस्ताने, 2) आंखों का चश्मा, 3) एन95 मास्क/श्वसन यंत्र, 4) वाटरप्रूफ एप्रन, 5) रबर के गमबूट।",
          kn: "ರಾಸಾಯನಿಕ ನಿರೋಧಕ ಕೈಗವಸು, ಕನ್ನಡಕ, ಮಾಸ್ಕ್, ಆಪ್ರನ್ ಮತ್ತು ಗಂಬೂಟ್ ಧರಿಸಿ.",
          as: "ক্ৰম অনুসৰি হাতমোজা, চশমা, মাস্ক, ৱাটাৰপ্ৰুফ এপ্ৰন আৰু ৰবৰৰ গামবুট পিন্ধক।",
        },
        tips: {
          en: "Tuck trouser legs outside the gumboots, not inside, so drips roll down without entering boots.",
          hi: "पैंट के पाएचों को गमबूट के बाहर रखें, अंदर नहीं, ताकि दवा की बूंदें जूते में न जाएं।",
          kn: "ಪ್ಯಾಂಟ್ ಅನ್ನು ಬೂಟುಗಳ ಹೊರಗೆ ಹಾಕಿ, ಒಳಗೆ ಹಾಕಬೇಡಿ.",
          as: "পেন্টটো গামবুটৰ বাহিৰত ৰাখক যাতে দৰৱ তললৈ সৰি পৰে।",
        },
        warning: {
          en: "Never use thin cloth/leather gloves; they absorb liquid pesticides and increase dermal absorption tenfold!",
          hi: "कपड़े या चमड़े के दस्ताने कभी न पहनें; वे दवा सोखकर त्वचा में जहर तेजी से पहुंचाते हैं!",
          kn: "ಬಟ್ಟೆ ಅಥವಾ ಚರ್ಮದ ಕೈಗವಸುಗಳನ್ನು ಬಳಸಬೇಡಿ.",
          as: "কাপোৰৰ হাতমোজা কেতিয়াও ব্যৱহাৰ নকৰিব, ই বিষাক্ত দ্ৰব্য শুহি লয়।",
        },
        modelFocus: "ppe_suit",
      },
      {
        stepNumber: 2,
        title: {
          en: "Wind Direction & Environmental Check",
          hi: "हवा की दिशा एवं मौसम की जांच",
          kn: "ಗಾಳಿಯ ದಿಕ್ಕು ಮತ್ತು ಪರಿಸರ ಪರಿಶೀಲನೆ",
          as: "বতাহৰ দিশ আৰু পৰিৱেশ পৰীক্ষা",
        },
        instruction: {
          en: "Tie a light ribbon to the spray lance or inspect grass sway. Always spray downwind or crosswind. NEVER walk or spray facing into the wind.",
          hi: "स्प्रे रॉड पर हल्का रिबन बांधें या घास के झुकाव से हवा की दिशा देखें। हमेशा हवा की दिशा में या आड़े छिड़कें, कभी हवा के विपरीत मुंह करके न छिड़कें।",
          kn: "ಯಾವಾಗಲೂ ಗಾಳಿಯ ದಿಕ್ಕಿನಲ್ಲಿ ಸಿಂಪಡಿಸಿ. ಗಾಳಿಗೆ ಎದುರಾಗಿ ಎಂದಿಗೂ ಸಿಂಪಡಿಸಬೇಡಿ.",
          as: "সদায় বতাহৰ দিশত স্প্ৰে কৰক। বতাহৰ বিপৰীতে মুখ কৰি কেতিয়াও নকৰিব।",
        },
        tips: {
          en: "Ideal spray hours are early morning (6:30 - 9:00 AM) or late afternoon (4:30 - 6:30 PM) when thermal inversion is absent.",
          hi: "छिड़काव का सबसे अच्छा समय सुबह 6:30 से 9:00 या शाम 4:30 से 6:30 है जब धूप और हवा शांत हो।",
          kn: "ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆ ತಂಪಾದ ಸಮಯದಲ್ಲಿ ಸಿಂಪಡಿಸಿ.",
          as: "পুৱা বা গধূলি সময়ত স্প্ৰে কৰাটো উত্তম।",
        },
        warning: {
          en: "Immediately halt spraying if wind speed exceeds 15 km/h (branches moving briskly) to prevent severe chemical drift into neighboring crops or livestock.",
          hi: "यदि हवा तेज चल रही हो (15 किमी/घंटे से अधिक) तो तुरंत छिड़काव रोक दें।",
          kn: "ಬಿರುಗಾಳಿ ಬೀಸುವಾಗ ಸಿಂಪಡಿಸಬೇಡಿ.",
          as: "অধিক বতাহ বলিলে স্প্ৰে কৰা তৎক্ষণাত বন্ধ কৰক।",
        },
        modelFocus: "wind_indicator",
      },
      {
        stepNumber: 3,
        title: {
          en: "Nozzle Height (50 cm) & Overlap Swath",
          hi: "नोजल ऊंचाई (50 सेमी) एवं फैलाव कोण",
          kn: "ನಾಜಲ್ ಎತ್ತರ (೫೦ ಸೆಂ.ಮೀ)",
          as: "নজলৰ উচ্চতা (৫০ ছেমি) নিৰ্ধাৰণ",
        },
        instruction: {
          en: "Maintain nozzle exactly 45 to 50 cm above crop canopy. Use a hollow cone nozzle for fungicides/insecticides and flat fan nozzle for herbicides.",
          hi: "नोजल को फसल की ऊपरी पत्तियों से ठीक 45 से 50 सेमी ऊपर रखें। कीटनाशक के लिए हॉलो कोन नोजल और खरपतवारनाशी के लिए फ्लैट फैन नोजल लगाएं।",
          kn: "ಬೆಳೆಯ ಮೇಲ್ಭಾಗದಿಂದ ನಾಜಲ್ ಅನ್ನು ೫೦ ಸೆಂ.ಮೀ ಎತ್ತರದಲ್ಲಿ ಹಿಡಿದುಕೊಳ್ಳಿ.",
          as: "ফচলৰ ওপৰৰ পৰা নজলটো ৫০ ছেমি উচ্চতাত ধৰি ৰাখক।",
        },
        tips: {
          en: "Walking at a steady 1 meter per second ensures uniform droplet density (30 to 50 droplets/cm²).",
          hi: "समान चाल (1 मीटर प्रति सेकंड) से चलें ताकि हर पौधे पर दवा की समान बूंदें पड़ें।",
          kn: "ಒಂದೇ ವೇಗದಲ್ಲಿ ಸಾಗಿ ಏಕರೂಪವಾಗಿ ಸಿಂಪಡಿಸಿ.",
          as: "সমানে খোজকাঢ়ি স্প্ৰে কৰিলে দৰৱ সমভাৱে পৰে।",
        },
        warning: {
          en: "Holding nozzle too high (> 75 cm) causes 40% drift loss into atmosphere; holding too low causes scorching bands.",
          hi: "नोजल बहुत ऊंचा रखने से 40% दवा हवा में उड़ जाती है; बहुत नीचा रखने से पौधे झुलस जाते हैं।",
          kn: "ನಾಜಲ್ ಅನ್ನು ಹೆಚ್ಚು ಎತ್ತರದಲ್ಲಿ ಹಿಡಿಯಬೇಡಿ.",
          as: "নজল বেছি ওপৰত ধৰিলে দৰৱ বতাহত উৰি যায়।",
        },
        modelFocus: "spray_nozzle",
      },
      {
        stepNumber: 4,
        title: {
          en: "Triple-Rinse Decontamination & Empty Container Disposal",
          hi: "तीन बार धुलाई एवं खाली डिब्बे का निपटान",
          kn: "ಉಪಕರಣ ಸ್ವಚ್ಛಗೊಳಿಸುವಿಕೆ ಮತ್ತು ವಿಲೇವಾರಿ",
          as: "তিনিবাৰ পৰিষ্কাৰ কৰা আৰু পাত্ৰ ধ্বংস কৰা",
        },
        instruction: {
          en: "Triple-rinse the knapsack sprayer and empty chemical bottles with fresh water. Puncture the bottom of empty plastic pesticide containers and bury safely.",
          hi: "स्प्रे पंप और खाली डिब्बों को तीन बार पानी से धोएं। खाली कीटनाशक डिब्बों के तले में छेद करके सुरक्षित रूप से मिट्टी में दबा दें।",
          kn: "ಪಂಪ್ ಅನ್ನು ೩ ಬಾರಿ ಸ್ವಚ್ಛ ನೀರಿನಿಂದ ತೊಳೆಯಿರಿ. ಖಾಲಿ ಡಬ್ಬಿಗಳನ್ನು ನಾಶಮಾಡಿ.",
          as: "স্প্ৰে পাম্প আৰু খালী বটল ৩ বাৰ ধুব। খালী বটল ফুটা কৰি মাটিত পুতি পেলাওক।",
        },
        tips: {
          en: "Take a thorough soap bath immediately after field work and wash spray clothes separately from family laundry.",
          hi: "छिड़काव के तुरंत बाद साबुन से स्नान करें और छिड़काव वाले कपड़े परिवार के कपड़ों से अलग धोएं।",
          kn: "ಕೆಲಸದ ನಂತರ ತಕ್ಷಣ ಸಾಬೂನಿನಿಂದ ಸ್ನಾನ ಮಾಡಿ.",
          as: "কামৰ পিছত লগে লগে চাবোনেৰে গা ধুব আৰু কাপোৰ সুকীয়াকৈ ধুব।",
        },
        warning: {
          en: "NEVER reuse empty pesticide containers for household water, food, or animal feed storage; fatal poison residues persist indefinitely.",
          hi: "खाली कीटनाशक डिब्बों में कभी भी पीने का पानी, अनाज या पशु आहार न रखें; यह जानलेवा हो सकता है!",
          kn: "ಖಾಲಿ ಕೀಟನಾಶಕ ಡಬ್ಬಿಗಳನ್ನು ನೀರು ಅಥವಾ ಆಹಾರ ಸಂಗ್ರಹಿಸಲು ಬಳಸಬೇಡಿ!",
          as: "খালী বটলত খোৱাপানী বা খাদ্য সামগ্ৰী কেতিয়াও নাৰাখিব!",
        },
        modelFocus: "decon_tank",
      }
    ]
  },

  // 4. Scientific Composting & Bio-Waste Recycling
  {
    id: "scientific_composting",
    title: {
      en: "Scientific Composting & Bio-Waste Recycling",
      hi: "वैज्ञानिक कम्पोस्ट निर्माण एवं जैविक कचरा प्रबंधन",
      kn: "ವೈಜ್ಞಾನಿಕ ಕಾಂಪೋಸ್ಟ್ ತಯಾರಿಕೆ",
      as: "বৈজ্ঞানিক পচন সাৰ প্ৰস্তুতি",
    },
    category: "Organic Farming",
    estimatedMinutes: 6,
    difficulty: "Intermediate",
    summary: {
      en: "Construct high-efficiency aerobic compost pits with optimal 30:1 Carbon to Nitrogen ratio, moisture management, and turning thermophilic cycles.",
      hi: "30:1 कार्बन-नाइट्रोजन अनुपात, नमी नियंत्रण एवं 15 दिवसीय पलटाई चक्र के साथ उच्च गुणवत्ता जैविक खाद तैयार करें।",
      kn: "೩೦:೧ ಕಾರ್ಬನ್-ಸಾರಜನಕ ಅನುಪಾತದೊಂದಿಗೆ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಸಾವಯವ ಗೊಬ್ಬರ ತಯಾರಿಸಿ.",
      as: "৩০:১ অনুপাতত কাৰ্বন আৰু নাইট্ৰ’জেন মিহলাই উচ্চ মানৰ পচন সাৰ প্ৰস্তুত কৰক।",
    },
    scene3dType: "compost_pit",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Pit Dimensions (3m × 1.5m × 1m)",
          hi: "गड्ढे का वैज्ञानिक आकार (3 मी × 1.5 मी × 1 मी)",
          kn: "ಗುಂಡಿಯ ಅಳತೆ (೩ ಮೀ × ೧.೫ ಮೀ × ೧ ಮೀ)",
          as: "গাঁতৰ জোখ (৩ মি × ১.৫ মি × ১ মি)",
        },
        instruction: {
          en: "Excavate pit under tree shade with dimensions: Length 3m, Width 1.5m, Depth 1.0m. Compact the bottom and plaster side walls with clay-cowdung slurry.",
          hi: "छांवदार जगह पर 3 मीटर लंबा, 1.5 मीटर चौड़ा और 1 मीटर गहरा गड्ढा खोदें। तल को समतल कर दीवारों पर गोबर-मिट्टी का लेप लगाएं।",
          kn: "ನೆರಳಿನ ಸ್ಥಳದಲ್ಲಿ ೩ ಮೀ × ೧.೫ ಮೀ × ೧ ಮೀ ಅಳತೆಯ ಗುಂಡಿ ತೆಗೆಯಿರಿ.",
          as: "ছাঁ থকা ঠাইত ৩ মি × ১.৫ মি × ১ মি জোখৰ গাঁত খান্দক আৰু তলভাগ সমান কৰক।",
        },
        tips: {
          en: "Avoid waterlogged low depressions to prevent anaerobic foul-smelling swamp conditions.",
          hi: "नीचे गड्ढे में पानी भरने वाली जगह पर कम्पोस्ट न बनाएं, हवादार जगह चुनें।",
          kn: "ನೀರು ನಿಲ್ಲುವ ತಗ್ಗು ಪ್ರದೇಶವನ್ನು ತಪ್ಪಿಸಿ.",
          as: "পানী জমা হোৱা দ ঠাইত গাঁত নাখান্দিব।",
        },
        warning: {
          en: "Depth must not exceed 1 meter; deeper heaps suffer oxygen starvation in bottom zones.",
          hi: "गड्ढे की गहराई 1 मीटर से अधिक न रखें, अन्यथा नीचे हवा नहीं पहुंचेगी और सड़न खराब होगी।",
          kn: "ಆಳ ೧ ಮೀಟರ್‌ಗಿಂತ ಹೆಚ್ಚಿರಬಾರದು.",
          as: "গাঁতটো ১ মিটাৰতকৈ অধিক দ নকৰিব।",
        },
        modelFocus: "compost_trench",
      },
      {
        stepNumber: 2,
        title: {
          en: "Layering: 3:1 Brown (Carbon) to Green (Nitrogen)",
          hi: "परतें: 3:1 भूरा (कार्बन) व हरा (नाइट्रोजन) कचरा",
          kn: "ಪದರಗಳು: ಕಂದು ಮತ್ತು ಹಸಿರು ತ್ಯಾಜ್ಯದ ಸಮತೋಲನ",
          as: "তৰপ: ৩:১ অনুপাতত শুকান আৰু সেউজীয়া আৱৰ্জনা",
        },
        instruction: {
          en: "Layer 1: 15cm dry brown biomass (straw, dry leaves, twigs = Carbon). Layer 2: 5cm green waste (green weeds, vegetable peel = Nitrogen). Layer 3: 5cm fresh cow dung slurry innoculated with Trichoderma.",
          hi: "पहली परत: 15 सेमी सूखा भूरा कचरा (पुआल, सूखी पत्तियां = कार्बन)। दूसरी परत: 5 सेमी हरा कचरा (सब्जी के छिलके, हरी घास = नाइट्रोजन)। तीसरी परत: 5 सेमी गोबर का घोल।",
          kn: "ಒಣ ಕಸ, ಹಸಿ ಕಸ ಮತ್ತು ಸಗಣಿ ದ್ರಾವಣದ ಪದರಗಳನ್ನು ಒಂದರ ಮೇಲೊಂದರಂತೆ ಜೋಡಿಸಿ.",
          as: "১৫ ছেমি শুকান খেৰ বা পাত, তাৰ ওপৰত ৫ ছেমি সেউজীয়া আৱৰ্জনা আৰু ৫ ছেমি গোবৰৰ মিশ্ৰণ দিয়ক।",
        },
        tips: {
          en: "Chopping dry straw to 5-10cm length doubles the surface area accessible to microbial enzymes.",
          hi: "पुआल को 5-10 सेमी टुकड़ों में काटकर डालने से खाद दोगुनी तेजी से पकती है।",
          kn: "ಒಣ ಹುಲ್ಲನ್ನು ಸಣ್ಣದಾಗಿ ಕತ್ತರಿಸಿ ಹಾಕಿ.",
          as: "খেৰবোৰ সৰুকৈ কাটি দিলে সোনকালে পচে।",
        },
        warning: {
          en: "Never add diseased crop residue, plastics, treated wood, or meat waste.",
          hi: "रोगग्रस्त पौधे, प्लास्टिक, कांच या मांसाहारी कचरा कम्पोस्ट में कभी न डालें।",
          kn: "ಪ್ಲಾಸ್ಟಿಕ್ ಅಥವಾ ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಹಾಕಬೇಡಿ.",
          as: "প্লাষ্টিক বা ৰোগাক্ৰান্ত গছৰ অংশ গাঁতত নিদিব।",
        },
        modelFocus: "compost_layers",
      },
      {
        stepNumber: 3,
        title: {
          en: "Moisture Fist-Squeeze Test (55-60%)",
          hi: "मुट्ठी दबाकर नमी परीक्षण (55-60%)",
          kn: "ತೇವಾಂಶ ಪರೀಕ್ಷೆ (೫೫-೬೦%)",
          as: "হাতৰ মুঠিৰে আৰ্দ্ৰতা পৰীক্ষা (৫৫-৬০%)",
        },
        instruction: {
          en: "Take a handful of compost material from center and squeeze firmly. It should feel like a damp wrung-out sponge—a few drops squeeze out between fingers without dripping puddles.",
          hi: "कम्पोस्ट सामग्री को मुट्ठी में लेकर जोर से दबाएं। यह गीले स्पंज की तरह महसूस होना चाहिए—उंगलियों से 2-3 बूंदें टपकें, ज्यादा पानी न बहे।",
          kn: "ಕಾಂಪೋಸ್ಟ್ ಅನ್ನು ಮುಷ್ಟಿಯಲ್ಲಿ ಹಿಡಿದು ಒತ್ತಿದಾಗ ಕೆಲವು ಹನಿ ನೀರು ಮಾತ್ರ ಇಳಿಯಬೇಕು.",
          as: "মুঠিত লৈ টানকৈ হেঁচি চাওক—কেৱল কেইটোপালমান পানী ওলাব লাগে।",
        },
        tips: {
          en: "If too wet, add chopped dry straw; if too dry, sprinkle water mixed with buttermilk.",
          hi: "यदि ज्यादा गीला हो तो सूखा भूसा मिलाएं; यदि सूखा हो तो छाछ मिला पानी छिड़कें।",
          kn: "ಹೆಚ್ಚು ತೇವವಾಗಿದ್ದರೆ ಒಣ ಹುಲ್ಲು ಸೇರಿಸಿ.",
          as: "বেছি তিতা হ’লে শুকান খেৰ আৰু শুকান হ’লে পানী ছটিয়াই দিয়ক।",
        },
        warning: {
          en: "Excess moisture (> 70%) suffocates aerobic thermophilic bacteria, causing methane smell.",
          hi: "70% से ज्यादा पानी होने पर बदबूदार गैसें बनती हैं और अच्छे जीवाणु मर जाते हैं।",
          kn: "ಹೆಚ್ಚು ನೀರಾದರೆ ಕೆಟ್ಟ ವಾಸನೆ ಬರುತ್ತದೆ.",
          as: "অতিৰিক্ত পানী জমা হ’লে দুৰ্গন্ধ ওলায়।",
        },
        modelFocus: "moisture_gauge",
      },
      {
        stepNumber: 4,
        title: {
          en: "Turning Cycle (Day 15 & Day 30)",
          hi: "पलटाई चक्र (15वें और 30वें दिन)",
          kn: "ತಿರುವಿ ಹಾಕುವ ಚಕ್ರ (೧೫ ಮತ್ತು ೩೦ ನೇ ದಿನ)",
          as: "উভতাই দিয়াৰ সময় (১৫ আৰু ৩০ দিনত)",
        },
        instruction: {
          en: "Turn the heap inside out on Day 15 and Day 30 using a pitchfork. Bring outer cooler edges into the hot core (55-65°C) to kill weed seeds and pathogens uniformly.",
          hi: "15वें और 30वें दिन कांटेदार जेली से पूरे ढेर को पलटें। बाहरी सामग्री को बीच में और बीच की पकी सामग्री को बाहर लाएं ताकि 60°C ताप में खरपतवार बीज नष्ट हों।",
          kn: "೧೫ ಮತ್ತು ೩೦ ನೇ ದಿನದಂದು ಕಾಂಪೋಸ್ಟ್ ಅನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತಿರುವಿ ಹಾಕಿ.",
          as: "১৫ আৰু ৩০ দিনত গাঁতৰ আৱৰ্জনাবোৰ তল-ওপৰ কৰি দিয়ক যাতে সকলো অংশ সমানে পচে।",
        },
        tips: {
          en: "Black, crumbly texture smelling of fresh forest floor indicates fully matured compost.",
          hi: "काली, भुरभुरी और जंगल की ताजी मिट्टी जैसी सुगंधित खाद पकने की निशानी है।",
          kn: "ಕಪ್ಪು ಬಣ್ಣ ಮತ್ತು ಮಣ್ಣಿನ ಸುಗಂಧವು ಗೊಬ್ಬರ ಸಿದ್ಧವಾಗಿರುವುದರ ಸಂಕೇತ.",
          as: "ক’লা বৰণ আৰু মাটিৰ সুগন্ধিয়ে পচন সাৰ প্ৰস্তুত হোৱা বুজায়।",
        },
        warning: {
          en: "Wear gloves during turning to protect from sharp twigs and soil fungus spores.",
          hi: "ढेर पलटते समय दस्ताने अवश्य पहनें ताकि हाथ न छिलें।",
          kn: "ತಿರುಗಿಸುವಾಗ ಕೈಗವಸುಗಳನ್ನು ಧರಿಸಿ.",
          as: "উভতাই দিয়াৰ সময়ত হাতমোজা ব্যৱহাৰ কৰক।",
        },
        modelFocus: "pitchfork_turning",
      }
    ]
  },

  // 5. System of Rice Intensification (SRI) Transplanting
  {
    id: "sri_rice_transplanting",
    title: {
      en: "System of Rice Intensification (SRI) Transplanting",
      hi: "श्री विधि (SRI) धान रोपाई तकनीक",
      kn: "ಎಸ್.ಆರ್.ಐ ಭತ್ತ ನಾಟಿ ಪದ್ಧತಿ",
      as: "এছ.আৰ.আই (SRI) ধান ৰোপণ পদ্ধতি",
    },
    category: "Agronomy",
    estimatedMinutes: 8,
    difficulty: "Advanced",
    summary: {
      en: "Revolutionary water-saving paddy methodology: 8-12 day single young seedling transplanting, 25cm × 25cm square grid, and shallow root placement.",
      hi: "कम पानी में बंपर पैदावार: 8-12 दिन का एक-एक पौधा, 25×25 सेमी चौकोर मार्कर ग्रिड एवं उथली रोपाई का वैज्ञानिक अभ्यास।",
      kn: "ಕಡಿಮೆ ನೀರಿನಲ್ಲಿ ಹೆಚ್ಚು ಇಳುವರಿ: ಕಿರಿಯ ಸಸಿಗಳ ನಾಟಿ ಮತ್ತು ಚೌಕಾಕಾರದ ಅಂತರ.",
      as: "কম পানীত অধিক ধান উৎপাদন: ৮-১২ দিনীয়া পোখা ৰোপণ আৰু ২৫×২৫ ছেমি দূৰত্ব নিৰ্ধাৰণ।",
    },
    scene3dType: "sri_rice",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Young Seedling Uprooting (8-12 Days Old)",
          hi: "कम उम्र की नर्सरी से पौध उखाड़ना (8-12 दिन)",
          kn: "ಕಿರಿಯ ಸಸಿಗಳನ್ನು ಕೀಳುವುದು (೮-೧೨ ದಿನ)",
          as: "৮-১২ দিনীয়া কোমল পোখা তোলা",
        },
        instruction: {
          en: "Uproot young seedlings at 2-leaf stage (8 to 12 days old). Gently lift with root-soil ball intact and transplant into mud within 30 minutes of uprooting.",
          hi: "2 पत्तियों वाली 8 से 12 दिन की छोटी पौध को मिट्टी की जड़ पिंडली सहित धीरे से निकालें। उखाड़ने के 30 मिनट के भीतर तुरंत खेत में रोपें।",
          kn: "೨ ಎಲೆಗಳಿರುವ ಕಿರಿಯ ಸಸಿಗಳನ್ನು ಮಣ್ಣು ಸಮೇತ ನಿಧಾನವಾಗಿ ಕಿತ್ತು ೩೦ ನಿಮಿಷದಲ್ಲಿ ನಾಟಿ ಮಾಡಿ.",
          as: "৮-১২ দিনীয়া দুপতীয়া পোখাবোৰ মাটিৰ সৈতে উঠাই ৩০ মিনিটৰ ভিতৰত ৰোপণ কৰক।",
        },
        tips: {
          en: "Keep nursery bed moist like a sponge before scooping out seedlings with a flat trowel.",
          hi: "पौध निकालते समय खुरपी से नीचे की मिट्टी सहित उठाएं ताकि जड़ें न टूटें।",
          kn: "ಬೇರುಗಳಿಗೆ ಹಾನಿಯಾಗದಂತೆ ಮಣ್ಣು ಸಹಿತ ಸಸಿಗಳನ್ನು ತೆಗೆಯಿರಿ.",
          as: "খুৰপীৰে মাটিসহ তুলি আনক যাতে শিপাত আঘাত নালাগে।",
        },
        warning: {
          en: "Never shake or wash mud off the roots; stripping root hairs causes severe transplanting shock.",
          hi: "जड़ों को धोएं या झाड़ें नहीं, ऐसा करने से पौधे का विकास रुक जाता है।",
          kn: "ಬೇರುಗಳನ್ನು ತೊಳೆದು ಮಣ್ಣು ತೆಗೆಯಬೇಡಿ.",
          as: "শিপাৰ মাটি ধুই পেলাবলৈ চেষ্টা নকৰিব।",
        },
        modelFocus: "young_seedling",
      },
      {
        stepNumber: 2,
        title: {
          en: "Square Grid Marking (25 cm × 25 cm)",
          hi: "चौकोर ग्रिड मार्कर चलाना (25 सेमी × 25 सेमी)",
          kn: "ಚೌಕಾಕಾರದ ಗುರುತು ಹಾಕುವುದು (೨೫ ಸೆಂ.ಮೀ × ೨೫ ಸೆಂ.ಮೀ)",
          as: "২৫ ছেমি × ২৫ ছেমি চকাৰে দাগ কটা",
        },
        instruction: {
          en: "Draw intersecting grid lines across mud using a roller marker at 25 cm × 25 cm intervals. Single seedlings will be planted at each grid intersection.",
          hi: "खेत के कीचड़ पर 25 सेमी × 25 सेमी का रोलर मार्कर चलाकर चौकोर खाने बनाएं। हर चौराहे पर केवल एक पौधा रोपना है।",
          kn: "೨೫ ಸೆಂ.ಮೀ ಅಂತರದ ಚೌಕಾಕಾರದ ಗುರುತುಗಳನ್ನು ಮಾಡಿ.",
          as: "২৫ ছেমি × ২৫ ছেমি ব্যৱধানত দাগ কাটি প্ৰতিটো কটাকটি কৰা বিন্দুত এটা পোখা ৰোপণ কৰক।",
        },
        tips: {
          en: "The square pattern enables mechanical weeding in perpendicular directions with a cono-weeder.",
          hi: "चौकोर विधि से कोनो-वीडर चलाकर दोनों दिशाओं से खरपतवार निकालना आसान होता है।",
          kn: "ಚೌಕಾಕಾರದ ಮಾದರಿಯು ಕಳೆ ಕೀಳಲು ಸಹಕಾರಿಯಾಗಿದೆ.",
          as: "চৌকোণীয়া আৰ্হিত ক’ন’-ৱীডাৰ চলাই ঘাঁহ বচা সহজ হয়।",
        },
        warning: {
          en: "Field must be leveled and drained with no standing water (> 1 cm) while marking lines.",
          hi: "निशान लगाते समय खेत में ज्यादा पानी नहीं होना चाहिए, केवल गीला कीचड़ हो।",
          kn: "ಗುರುತು ಮಾಡುವಾಗ ಗದ್ದೆಯಲ್ಲಿ ಹೆಚ್ಚು ನೀರು ಇರಬಾರದು.",
          as: "দাগ দিয়াৰ সময়ত পথাৰত পানী জমা হৈ থাকিব নালাগে।",
        },
        modelFocus: "grid_marker",
      },
      {
        stepNumber: 3,
        title: {
          en: "Single Seedling Shallow Planting (L-Shape)",
          hi: "एकल पौधा उथली रोपाई (एल-आकार तकनीक)",
          kn: "ಒಂದೇ ಸಸಿಯ ಆಳವಿಲ್ಲದ ನಾಟಿ",
          as: "এল-আকৃতিৰে পাতলকৈ এটা পোখা ৰোপণ",
        },
        instruction: {
          en: "Plant only 1 single seedling per hill at merely 1 to 2 cm depth. Slide roots sideways in an \"L\" shape rather than thrusting straight down.",
          hi: "प्रत्येक बिंदु पर केवल 1 पौधा 1-2 सेमी उथला लगाएं। जड़ को सीधा नीचे धंसाने के बजाय \"L\" आकार में क्षैतिज रूप से कीचड़ में सरकाएं।",
          kn: "ಪ್ರತಿ ಗುಂಡಿಗೆ ಕೇವಲ ೧ ಸಸಿಯನ್ನು ಮಾತ್ರ ನೆಡಿ. ಬೇರುಗಳನ್ನು \"L\" ಆಕಾರದಲ್ಲಿ ಇರಿಸಿ.",
          as: "প্ৰতি স্থানত কেৱল এটা পোখা ১-২ ছেমি দকৈ \"L\" আকৃতিৰে ৰোপণ কৰক।",
        },
        tips: {
          en: "Shallow root placement allows aerobic tillering, triggering 40-60 productive tillers per hill.",
          hi: "उथली रोपाई से पौधे को हवा मिलती है और एक पौधे से 40 से 60 कल्ले (टिलर) निकलते हैं।",
          kn: "ಆಳವಿಲ್ಲದ ನಾಟಿಯಿಂದ ಹೆಚ್ಚು ಕವಲುಗಳು ಒಡೆಯುತ್ತವೆ.",
          as: "পাতলকৈ ৰোপণ কৰিলে এজোপা ধানৰ পৰা ৪০-৬০ টা পোখা ওলায়।",
        },
        warning: {
          en: "Thrusting roots deep (4-5 cm) curls the root tips upward, causing root suffocation and delayed tillering.",
          hi: "गहरा दबाने से जड़ें मुड़ जाती हैं और पौधे में कल्ले बहुत देर से निकलते हैं।",
          kn: "ಸಸಿಗಳನ್ನು ಆಳವಾಗಿ ಒತ್ತಬೇಡಿ.",
          as: "পোখা বেছি দকৈ পুতিলে শিপা বেঁকা হৈ মৰি যায়।",
        },
        modelFocus: "l_plant_trowel",
      }
    ]
  },

  // 6. Tractor Pre-Start Safety & Maintenance Checklist
  {
    id: "tractor_safety_checklist",
    title: {
      en: "Tractor Pre-Start Safety & Checklist",
      hi: "ट्रैक्टर स्टार्ट-पूर्व सुरक्षा एवं रखरखाव चेकलिस्ट",
      kn: "ಟ್ರಾಕ್ಟರ್ ಸುರಕ್ಷತೆ ಮತ್ತು ಪೂರ್ವ-ಪರಿಶೀಲನೆ",
      as: "ট্ৰেক্টৰ চলোৱাৰ পূৰ্বৰ নিৰাপত্তা পৰীক্ষা",
    },
    category: "Farm Machinery",
    estimatedMinutes: 6,
    difficulty: "Beginner",
    summary: {
      en: "Crucial 6-point walk-around safety inspection: engine oil dipstick, coolant level, tire pressure, PTO safety guard, and neutral safety switch.",
      hi: "सुरक्षित संचालन: इंजन ऑयल डिपस्टिक, कूलेंट स्तर, टायर हवा दबाव, पीटीओ सुरक्षा कवर एवं न्यूट्रल स्विच की गहन जांच।",
      kn: "ಎಂಜಿನ್ ಆಯಿಲ್, ಕೂಲೆಂಟ್, ಟೈರ್ ಒತ್ತಡ ಮತ್ತು ಪಿಟಿಒ ಗಾರ್ಡ್ ಪರಿಶೀಲನೆಯ ತರಬೇತಿ.",
      as: "ইঞ্জিন তেল, কুলেন্ট, টায়াৰৰ চাপ আৰু পি.টি.অ’ (PTO) নিৰাপত্তা পৰীক্ষাৰ নিৰ্দেশনা।",
    },
    scene3dType: "tractor_safety",
    steps: [
      {
        stepNumber: 1,
        title: {
          en: "Engine Oil Dipstick & Fluid Levels",
          hi: "इंजन ऑयल डिपस्टिक एवं तरल स्तर जांच",
          kn: "ಎಂಜಿನ್ ಆಯಿಲ್ ಮತ್ತು ದ್ರವ ಮಟ್ಟದ ಪರಿಶೀಲನೆ",
          as: "ইঞ্জিনৰ তেল আৰু তৰল পৰীক্ষা",
        },
        instruction: {
          en: "Park on level ground before starting. Pull dipstick, wipe clean with lint-free rag, re-insert fully, and check oil film between Min and Max notches.",
          hi: "समतल जमीन पर ट्रैक्टर खड़ा करें। डिपस्टिक निकालें, कपड़े से पोंछें, दोबारा पूरा डालकर निकालें। तेल का स्तर न्यूनतम और अधिकतम के बीच होना चाहिए।",
          kn: "ಡಿಪ್‌ಸ್ಟಿಕ್ ತೆಗೆದು ಒರೆಸಿ, ಎಣ್ಣೆಯ ಮಟ್ಟವನ್ನು ಪರಿಶೀಲಿಸಿ.",
          as: "ডিপষ্টিক উলিয়াই কাপোৰেৰে মচি পুনৰ ভৰাই তেলৰ মাত্ৰা পৰীক্ষা কৰক।",
        },
        tips: {
          en: "Golden amber oil is good; gritty pitch-black oil signals urgent oil filter and lube change.",
          hi: "सुनहरा भूरा तेल अच्छा है; काला और खुरदरा तेल होने पर तुरंत मोबिल ऑयल बदलें।",
          kn: "ಕಪ್ಪು ಮತ್ತು ಜಿಗುಟಾದ ಎಣ್ಣೆ ಇದ್ದರೆ ಬದಲಾಯಿಸಿ.",
          as: "তেল ক’লা হৈ গ’লে লগে লগে সলনি কৰক।",
        },
        warning: {
          en: "Never unscrew radiator pressure cap while engine is hot; boiling coolant can erupt causing 3rd degree burns.",
          hi: "गर्म इंजन का रेडिएटर ढक्कन कभी न खोलें, उबलता पानी चेहरे पर पड़ सकता है!",
          kn: "ಬಿಸಿ ಎಂಜಿನ್‌ನ ರೇಡಿಯೇಟರ್ ಕ್ಯಾಪ್ ತೆರೆಯಬೇಡಿ!",
          as: "ইঞ্জিন গৰম থকা অৱস্থাত ৰেডিয়েটৰৰ ঢাকনি কেতিয়াও নোখোলিব!",
        },
        modelFocus: "dipstick_check",
      },
      {
        stepNumber: 2,
        title: {
          en: "Tire Pressure & Lug Nut Inspection",
          hi: "टायर हवा का दबाव एवं नट-बोल्ट जांच",
          kn: "ಟೈರ್ ಒತ್ತಡ ಮತ್ತು ನಟ್ ಪರಿಶೀಲನೆ",
          as: "টায়াৰৰ বতাহ আৰু নাট-বোল্ট পৰীক্ষা",
        },
        instruction: {
          en: "Check rear tires (12-16 PSI for field traction, 18-22 PSI for road haulage) and front tires (24-28 PSI). Inspect rim lug nuts for any loosening.",
          hi: "खेत में जुताई के लिए पिछले टायरों में 12-16 PSI और सड़क पर 18-22 PSI हवा रखें। पहिए के सभी नट-बोल्ट की कसावट जांचें।",
          kn: "ಹೊಲದಲ್ಲಿ ಕೆಲಸ ಮಾಡಲು ಹಿಂದಿನ ಟೈರ್ ಒತ್ತಡ ೧೨-೧೬ ಪಿಎಸ್‌ಐ ಇರಲಿ.",
          as: "পথাৰত কাম কৰাৰ সময়ত পিছৰ টায়াৰত ১২-১৬ পি.এছ.আই বতাহ ৰাখক।",
        },
        tips: {
          en: "Slightly lower tire pressure in wet sticky fields prevents heavy wheel slippage and soil compaction.",
          hi: "गीले खेत में हल्का कम दबाव रखने से पहिए कम फिसलते हैं।",
          kn: "ತೇವವಾದ ಮಣ್ಣಿನಲ್ಲಿ ಕಡಿಮೆ ಒತ್ತಡವು ಚಕ್ರ ಜಾರದಂತೆ ತಡೆಯುತ್ತದೆ.",
          as: "বোকা পথাৰত বতাহ সামান্য কম ৰাখিলে চকা পিছলি নাযায়।",
        },
        warning: {
          en: "Cracked or under-inflated front tires during heavy front loader work create catastrophic rollover hazard.",
          hi: "कटे-फटे टायरों से ट्रैक्टर पलटने का भारी खतरा रहता है।",
          kn: "ಒಡೆದ ಟೈರ್‌ಗಳನ್ನು ಬಳಸಬೇಡಿ.",
          as: "ফটা টায়াৰ ব্যৱহাৰ কৰিলে ট্ৰেক্টৰ ওলটি পৰাৰ সম্ভাৱনা থাকে।",
        },
        modelFocus: "tire_wheel",
      },
      {
        stepNumber: 3,
        title: {
          en: "PTO Master Shield & Hazard Guards",
          hi: "पीटीओ (PTO) मास्टर शील्ड एवं सुरक्षा गार्ड",
          kn: "ಪಿಟಿಒ ಸುರಕ್ಷತಾ ಕವಚ ಪರಿಶೀಲನೆ",
          as: "পি.টি.অ’ (PTO) সুৰক্ষা আৱৰণ পৰীক্ষা",
        },
        instruction: {
          en: "Inspect the rear Power Take-Off (PTO) stub master shield. Ensure the rotating shaft guard turns freely by hand without jamming.",
          hi: "ट्रैक्टर के पीछे पीटीओ शाफ्ट के ऊपर लगा सुरक्षा कवर (मास्टर शील्ड) चेक करें। शाफ्ट का प्लास्टिक गार्ड हाथ से आसानी से घूमना चाहिए।",
          kn: "ಪಿಟಿಒ ಗಾರ್ಡ್ ಸರಿಯಾಗಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
          as: "পিছৰ পি.টি.অ’ (PTO) নিৰাপত্তা কভাৰ ভালদৰে পৰীক্ষা কৰক।",
        },
        tips: {
          en: "Grease the universal joints on your rotavator PTO shaft every 10 operating hours.",
          hi: "रोटावेटर शाफ्ट के जोड़ों में हर 10 घंटे के काम के बाद ग्रीस लगाएं।",
          kn: "ಪ್ರತಿ ೧೦ ಗಂಟೆಗಳಿಗೊಮ್ಮೆ ಗ್ರೀಸ್ ಹಾಕಿ.",
          as: "প্ৰতি ১০ ঘণ্টা কাম কৰাৰ পিছত গ্ৰীচ লগাওক।",
        },
        warning: {
          en: "NEVER operate tractor implements with a missing or damaged PTO shield; entanglement takes < 0.2 seconds and is frequently fatal!",
          hi: "बिना पीटीओ कवर के कभी ट्रैक्टर न चलाएं; कपड़े फंसने पर सेकंड के सौवें हिस्से में जानलेवा हादसा हो सकता है!",
          kn: "ಗಾರ್ಡ್ ಇಲ್ಲದೆ ಎಂದಿಗೂ ಟ್ರಾಕ್ಟರ್ ಚಲಾಯಿಸಬೇಡಿ! ಇದು ಅತ್ಯಂತ ಅಪಾಯಕಾರಿ!",
          as: "কভাৰ নোহোৱাকৈ কেতিয়াও নচলাব, কাপোৰ মেৰ খাই গুৰুতৰ বিপদ হ’ব পাৰে!",
        },
        modelFocus: "pto_guard",
      },
      {
        stepNumber: 4,
        title: {
          en: "Neutral Safety Switch & Pre-Start Horn",
          hi: "न्यूट्रल सेफ्टी स्विच एवं हॉर्न चेतावनी",
          kn: "ನ್ಯೂಟ್ರಲ್ ಸ್ವಿಚ್ ಮತ್ತು ಹಾರ್ನ್",
          as: "নিউট্ৰেল চুইচ আৰু হৰ্ণ বজাই সতৰ্ক কৰা",
        },
        instruction: {
          en: "Verify gear shift and PTO lever are in neutral. Press clutch down completely. Honk horn once to alert bystanders and animals before turning the key.",
          hi: "जांचें कि गियर और पीटीओ लीवर न्यूट्रल में हैं। क्लच पूरा दबाएं। चाबी घुमाने से पहले हॉर्न बजाकर आसपास खड़े लोगों व पशुओं को सचेत करें।",
          kn: "ಗೇರ್ ನ್ಯೂಟ್ರಲ್‌ನಲ್ಲಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ. ಕ್ಲಚ್ ಒತ್ತಿ ಹಾರ್ನ್ ಮಾಡಿ ನಂತರ ಸ್ಟಾರ್ಟ್ ಮಾಡಿ.",
          as: "গিয়াৰ নিউট্ৰেল কৰি ক্লটচ হেঁচি ধৰক আৰু হৰ্ণ বজাই মানুহ-পশুক সাৱধান কৰক।",
        },
        tips: {
          en: "Warm up engine at 1000 RPM idle for 2 minutes before engaging heavy hydraulic loads.",
          hi: "ट्रैक्टर स्टार्ट करने के बाद 2 मिनट तक धीमी गति (1000 RPM) पर चलने दें फिर काम शुरू करें।",
          kn: "ಕೆಲಸ ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಎಂಜಿನ್ ಅನ್ನು ೨ ನಿಮಿಷ ಚಲಾಯಿಸಿ.",
          as: "কাম আৰম্ভ কৰাৰ আগতে ২ মিনিট ইঞ্জিনটো চলিবলৈ দিয়ক।",
        },
        warning: {
          en: "Never bypass the neutral start switch; cranking in gear can cause the tractor to lurch forward uncontrollably.",
          hi: "गियर में ट्रैक्टर स्टार्ट करने की कभी गलती न करें, ट्रैक्टर बेकाबू होकर आगे बढ़ सकता है।",
          kn: "ಗೇರ್‌ನಲ್ಲಿದ್ದಾಗ ಎಂದಿಗೂ ಸ್ಟಾರ್ಟ್ ಮಾಡಬೇಡಿ.",
          as: "গিয়াৰত থকা অৱস্থাত কেতিয়াও ষ্টাৰ্ট নকৰিব।",
        },
        modelFocus: "cockpit_dash",
      }
    ]
  }
];
