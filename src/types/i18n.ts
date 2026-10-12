export type Language = 'en' | 'hi' | 'kn' | 'as';

export interface Translations {
  appName: string;
  tagline: string;
  offlineReady: string;
  modules: {
    scanner: string;
    scannerDesc: string;
    simulation: string;
    simulationDesc: string;
    guidance: string;
    guidanceDesc: string;
    history: string;
  };
  scanner: {
    startCamera: string;
    capture: string;
    retake: string;
    uploadPhoto: string;
    samplePresets: string;
    analyzing: string;
    onDeviceAi: string;
    confidence: string;
    severity: string;
    symptoms: string;
    organicTreatment: string;
    chemicalTreatment: string;
    prevention: string;
    safeDosageWarning: string;
    viewIn3dAr: string;
    readAloud: string;
    stopAudio: string;
    saveScan: string;
    savedSuccessfully: string;
    noCameraMsg: string;
    selectPresetPrompt: string;
    arGuideText: string;
  };
  simulation: {
    title: string;
    subtitle: string;
    vrMode: string;
    exitVr: string;
    dayNight: string;
    weather: string;
    weatherSunny: string;
    weatherRain: string;
    weatherDrought: string;
    weatherFog: string;
    soilHealth: string;
    moisture: string;
    yieldEstimate: string;
    waterSaved: string;
    currentStage: string;
    actionsTitle: string;
    irrigateAction: string;
    fertilizeAction: string;
    pestAction: string;
    harvestAction: string;
    cardboardHint: string;
  };
  guidance: {
    title: string;
    subtitle: string;
    selectModule: string;
    step: string;
    of: string;
    markDone: string;
    completed: string;
    listenGuidance: string;
    tips: string;
    warning: string;
    congrats: string;
    certText: string;
    restartTask: string;
  };
  common: {
    language: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    reset: string;
    demoMode: string;
    certified: string;
    offlineModeActive: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "KrishiXR",
    tagline: "AR/VR Smart Agriculture Training & Field Assistant",
    offlineReady: "100% Offline Capable",
    modules: {
      scanner: "AR Crop Doctor",
      scannerDesc: "On-device AI plant disease diagnosis with 3D AR symptom visualization",
      simulation: "VR Farm Simulation",
      simulationDesc: "Interactive 3D farming lifecycle, weather impact & Google Cardboard VR",
      guidance: "AR Field Tasks",
      guidanceDesc: "Interactive 3D step-by-step agricultural operations & voice guides",
      history: "Scan History",
    },
    scanner: {
      startCamera: "Open Camera",
      capture: "Analyze Crop Leaf",
      retake: "New Scan",
      uploadPhoto: "Upload Photo",
      samplePresets: "Demo Specimens (Instant Offline Test)",
      analyzing: "Running On-Device Neural Classifier...",
      onDeviceAi: "On-Device Offline Edge AI",
      confidence: "Confidence Match",
      severity: "Infection Severity",
      symptoms: "Key Symptoms",
      organicTreatment: "Organic / Bio Remedies",
      chemicalTreatment: "Targeted Chemical Control",
      prevention: "Long-term Prevention",
      safeDosageWarning: "Safe Dosage & PPE Advisory",
      viewIn3dAr: "View 3D / AR Hologram",
      readAloud: "Listen Diagnosis (Voice)",
      stopAudio: "Stop Voice",
      saveScan: "Save to Offline Diary",
      savedSuccessfully: "Saved to Offline Records",
      noCameraMsg: "Camera stream unavailable in current environment. Using simulated live AR optical sensor.",
      selectPresetPrompt: "Select a sample specimen below to simulate live scanning instantly:",
      arGuideText: "Move device to inspect 3D lesion spots. Tap anchor to place leaf in physical space.",
    },
    simulation: {
      title: "Virtual Farm Ecosystem",
      subtitle: "Experience crop growth cycles, manage soil, and test decisions in 3D & VR",
      vrMode: "Google Cardboard VR",
      exitVr: "Exit VR Mode",
      dayNight: "Time of Day",
      weather: "Weather System",
      weatherSunny: "Sunny Clear",
      weatherRain: "Monsoon Rain",
      weatherDrought: "Heatwave / Drought",
      weatherFog: "High Humidity Fog",
      soilHealth: "Soil Health Index",
      moisture: "Soil Moisture",
      yieldEstimate: "Projected Yield",
      waterSaved: "Water Conserved",
      currentStage: "Crop Stage",
      actionsTitle: "Agronomic Interventions",
      irrigateAction: "Precision Drip Irrigation",
      fertilizeAction: "Organic Vermicompost & NPK",
      pestAction: "Neem Bio-Spray Protection",
      harvestAction: "Optimal Maturity Harvest",
      cardboardHint: "Slide your phone into Google Cardboard headset. Look at buttons to trigger actions.",
    },
    guidance: {
      title: "Practical Field Training",
      subtitle: "Hands-on step-by-step masterclasses with 3D equipment interaction and audio narration",
      selectModule: "Choose Agricultural Protocol",
      step: "Step",
      of: "of",
      markDone: "Mark Step Complete",
      completed: "Completed",
      listenGuidance: "Play Voice Instructions",
      tips: "Agronomist's Pro Tip",
      warning: "Safety Hazard / Crucial Alert",
      congrats: "Module Certification Achieved!",
      certText: "You have verified competence in this field operation under scientific ICAR/FAO protocols.",
      restartTask: "Practice Again",
    },
    common: {
      language: "Language",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      reset: "Reset",
      demoMode: "Demo Ready Mode",
      certified: "Verified Protocol",
      offlineModeActive: "Offline Storage Active",
    },
  },

  hi: {
    appName: "कृषि-XR (KrishiXR)",
    tagline: "एआर/वीआर स्मार्ट कृषि प्रशिक्षण एवं खेत सहायता प्रणाली",
    offlineReady: "100% ऑफलाइन कार्यक्षम",
    modules: {
      scanner: "एआर फसल डॉक्टर",
      scannerDesc: "ऑन-डिवाइस एआई रोग पहचान व 3D एआर लक्षण निरीक्षण",
      simulation: "वीआर फार्म सिमुलेशन",
      simulationDesc: "3D फसल जीवन चक्र, मौसम प्रभाव व गूगल कार्डबोर्ड वीआर",
      guidance: "एआर चरणबद्ध मार्गदर्शन",
      guidanceDesc: "3D एनिमेटेड उपकरण, सटीक दूरी एवं ध्वनि मार्गदर्शन",
      history: "स्कैन इतिहास",
    },
    scanner: {
      startCamera: "कैमरा चालू करें",
      capture: "पत्ती स्कैन करें",
      retake: "नया स्कैन",
      uploadPhoto: "फोटो अपलोड करें",
      samplePresets: "डेमो नमूने (त्वरित ऑफलाइन टेस्ट)",
      analyzing: "डिवाइस पर न्यूरल क्लासिफायर विश्लेषण कर रहा है...",
      onDeviceAi: "ऑन-डिवाइस ऑफलाइन एज एआई",
      confidence: "सटीकता दर",
      severity: "रोग की तीव्रता",
      symptoms: "प्रमुख लक्षण",
      organicTreatment: "जैविक / देशी उपचार",
      chemicalTreatment: "रासायनिक नियंत्रण",
      prevention: "दीर्घकालिक रोकथाम",
      safeDosageWarning: "सुरक्षित मात्रा एवं पीपीई किट सलाह",
      viewIn3dAr: "3D / एआर होलोग्राम देखें",
      readAloud: "आवाज में सुनें",
      stopAudio: "आवाज बंद करें",
      saveScan: "ऑफलाइन डायरी में सहेजें",
      savedSuccessfully: "रिकॉर्ड में सुरक्षित हो गया",
      noCameraMsg: "कैमरा अनुपलब्ध है। एआर ऑप्टिकल सेंसर सिमुलेशन सक्रिय है।",
      selectPresetPrompt: "त्वरित परीक्षण के लिए नीचे दिए गए पौधों के नमूने चुनें:",
      arGuideText: "3D पत्ती के रोग धब्बों को देखने के लिए फोन घुमाएँ या स्पेस में स्थापित करें।",
    },
    simulation: {
      title: "वर्चुअल खेत सिमुलेशन",
      subtitle: "फसल विकास चक्र, मिट्टी स्वास्थ्य और कृषि निर्णय 3D और वीआर में सीखें",
      vrMode: "गूगल कार्डबोर्ड वीआर",
      exitVr: "वीआर से बाहर निकलें",
      dayNight: "दिन / रात चक्र",
      weather: "मौसम प्रणाली",
      weatherSunny: "धूप खिली",
      weatherRain: "मानसून वर्षा",
      weatherDrought: "सूखा / तेज गर्मी",
      weatherFog: "घना कोहरा",
      soilHealth: "मृदा स्वास्थ्य स्कोर",
      moisture: "मृदा नमी",
      yieldEstimate: "अनुमानित पैदावार",
      waterSaved: "पानी की बचत",
      currentStage: "फसल अवस्था",
      actionsTitle: "कृषि प्रबंधन क्रियाएँ",
      irrigateAction: "ड्रिप सिंचाई चालू करें",
      fertilizeAction: "जैविक वर्मीकम्पोस्ट व संतुलित खाद",
      pestAction: "नीम अर्क जैविक छिड़काव",
      harvestAction: "उचित समय पर कटाई",
      cardboardHint: "फोन को गूगल कार्डबोर्ड हेडसेट में लगाएं। बटनों पर ध्यान केंद्रित कर चयन करें।",
    },
    guidance: {
      title: "व्यावहारिक क्षेत्रीय प्रशिक्षण",
      subtitle: "3D उपकरण मॉडल और क्षेत्रीय भाषा ऑडियो के साथ चरणबद्ध अभ्यास",
      selectModule: "कृषि कार्य चुनें",
      step: "चरण",
      of: "कुल",
      markDone: "चरण पूरा चिह्नित करें",
      completed: "पूर्ण",
      listenGuidance: "ध्वनि निर्देश सुनें",
      tips: "वैज्ञानिक सलाह",
      warning: "सुरक्षा चेतावनी / सावधानी",
      congrats: "कार्य कुशलता प्रमाणपत्र!",
      certText: "आपने आईसीएआर एवं वैज्ञानिक मानकों के अनुसार इस कार्य का अभ्यास पूर्ण किया है।",
      restartTask: "पुनः अभ्यास करें",
    },
    common: {
      language: "भाषा (Language)",
      close: "बंद करें",
      back: "पीछे",
      next: "आगे",
      previous: "पिछला",
      reset: "रीसेट",
      demoMode: "डेमो मोड",
      certified: "प्रमाणित विधि",
      offlineModeActive: "ऑफलाइन स्टोरेज सक्रिय",
    },
  },

  kn: {
    appName: "ಕೃಷಿ-XR (KrishiXR)",
    tagline: "ಎಆರ್/ವಿಆರ್ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ತರಬೇತಿ ಮತ್ತು ಕ್ಷೇತ್ರ ಸಹಾಯಕ ವ್ಯವಸ್ಥೆ",
    offlineReady: "100% ಆಫ್‌ಲೈನ್ ಕಾರ್ಯಸಾಧ್ಯ",
    modules: {
      scanner: "ಎಆರ್ ಬೆಳೆ ವೈದ್ಯ",
      scannerDesc: "ಸಾಧನದಲ್ಲಿಯೇ ರೋಗ ಪತ್ತೆ ಮತ್ತು 3D ಎಆರ್ ರೋಗಲಕ್ಷಣ ವೀಕ್ಷಣೆ",
      simulation: "ವಿಆರ್ ಜಮೀನು ಸಿಮ್ಯುಲೇಶನ್",
      simulationDesc: "3D ಬೆಳೆ ಬೆಳವಣಿಗೆ, ಹವಾಮಾನ ಪರಿಣಾಮ ಮತ್ತು ಗೂಗಲ್ ಕಾರ್ಡ್‌ಬೋರ್ಡ್ ವಿಆರ್",
      guidance: "ಎಆರ್ ಹಂತ-ಹಂತದ ಮಾರ್ಗದರ್ಶನ",
      guidanceDesc: "3D ಆನಿಮೇಟೆಡ್ ಉಪಕರಣಗಳು ಮತ್ತು ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ",
      history: "ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸ",
    },
    scanner: {
      startCamera: "ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ",
      capture: "ಎಲೆ ಪರೀಕ್ಷಿಸಿ",
      retake: "ಮತ್ತೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      uploadPhoto: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      samplePresets: "ಮಾದರಿ ಮಾದರಿಗಳು (ತ್ವರಿತ ಆಫ್‌ಲೈನ್ ಪರೀಕ್ಷೆ)",
      analyzing: "ನ್ಯೂರಲ್ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
      onDeviceAi: "ಆಫ್‌ಲೈನ್ ಸಾಧನ ಎಐ",
      confidence: "ಖಚಿತತೆ",
      severity: "ತೀವ್ರತೆ",
      symptoms: "ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು",
      organicTreatment: "ಸಾವಯವ ಪರಿಹಾರ",
      chemicalTreatment: "ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ",
      prevention: "ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು",
      safeDosageWarning: "ಸುರಕ್ಷಿತ ಪ್ರಮಾಣ ಮತ್ತು ಪಿಪಿಇ ಎಚ್ಚರಿಕೆ",
      viewIn3dAr: "3D / ಎಆರ್ ಮಾದರಿ ನೋಡಿ",
      readAloud: "ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ",
      stopAudio: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
      saveScan: "ಆಫ್‌ಲೈನ್ ಡೈರಿಯಲ್ಲಿ ಉಳಿಸಿ",
      savedSuccessfully: "ದಾಖಲೆಗಳಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ",
      noCameraMsg: "ಕ್ಯಾಮೆರಾ ಲಭ್ಯವಿಲ್ಲ. ಎಆರ್ ಸಂವೇದಕ ಸಿಮ್ಯುಲೇಶನ್ ಸಕ್ರಿಯವಾಗಿದೆ.",
      selectPresetPrompt: "ತ್ವರಿತ ಪರೀಕ್ಷೆಗಾಗಿ ಕೆಳಗಿನ ಸಸ್ಯ ಮಾದರಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      arGuideText: "3D ಎಲೆಯನ್ನು ವೀಕ್ಷಿಸಲು ಫೋನ್ ತಿರುಗಿಸಿ ಅಥವಾ ಸ್ಥಳದಲ್ಲಿ ಇರಿಸಿ.",
    },
    simulation: {
      title: "ವರ್ಚುವಲ್ ತೋಟ ಸಿಮ್ಯುಲೇಶನ್",
      subtitle: "3D ಮತ್ತು ವಿಆರ್‌ನಲ್ಲಿ ಬೆಳೆ ಹಂತಗಳು ಮತ್ತು ತೀರ್ಮಾನಗಳನ್ನು ಕಲಿಯಿರಿ",
      vrMode: "ಗೂಗಲ್ ಕಾರ್ಡ್‌ಬೋರ್ಡ್ ವಿಆರ್",
      exitVr: "ವಿಆರ್ ನಿರ್ಗಮಿಸಿ",
      dayNight: "ದಿನ ಮತ್ತು ರಾತ್ರಿ",
      weather: "ಹವಾಮಾನ",
      weatherSunny: "ಬಿಸಿಲು",
      weatherRain: "ಮಳೆ",
      weatherDrought: "ಬರಗಾಲ / ಬಿಸಿ ಗಾಳಿ",
      weatherFog: "ದಟ್ಟ ಮಂಜು",
      soilHealth: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸ್ಕೋರ್",
      moisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
      yieldEstimate: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ",
      waterSaved: "ಉಳಿಸಿದ ನೀರು",
      currentStage: "ಬೆಳೆಯ ಹಂತ",
      actionsTitle: "ಕೃಷಿ ನಿರ್ವಹಣೆ",
      irrigateAction: "ಹನಿ ನೀರಾವರಿ",
      fertilizeAction: "ವರ್ಮಿಕಾಂಪೋಸ್ಟ್ ಗೊಬ್ಬರ",
      pestAction: "ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಣೆ",
      harvestAction: "ಸರಿಯಾದ ಕೊಯ್ಲು",
      cardboardHint: "ಗೂಗಲ್ ಕಾರ್ಡ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಫೋನ್ ಇರಿಸಿ. ಬಟನ್‌ಗಳನ್ನು ನೋಡಿ ಆಯ್ಕೆಮಾಡಿ.",
    },
    guidance: {
      title: "ಪ್ರಾಯೋಗಿಕ ಕ್ಷೇತ್ರ ತರಬೇತಿ",
      subtitle: "3D ಮಾದರಿಗಳು ಮತ್ತು ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಹಂತ-ಹಂತದ ತರಬೇತಿ",
      selectModule: "ಕಾರ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      step: "ಹಂತ",
      of: "ರ ಪೈಕಿ",
      markDone: "ಹಂತ ಪೂರ್ಣ ಎಂದು ಗುರುತಿಸಿ",
      completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
      listenGuidance: "ಧ್ವನಿ ಸೂಚನೆಗಳನ್ನು ಕೇಳಿ",
      tips: "ವಿಜ್ಞಾನಿಗಳ ಸಲಹೆ",
      warning: "ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ",
      congrats: "ತರಬೇತಿ ಪ್ರಮಾಣಪತ್ರ!",
      certText: "ನೀವು ವೈಜ್ಞಾನಿಕ ಕೃಷಿ ವಿಧಾನಗಳ ತರಬೇತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.",
      restartTask: "ಮತ್ತೆ ಅಭ್ಯಾಸ ಮಾಡಿ",
    },
    common: {
      language: "ಭಾಷೆ (Language)",
      close: "ಮುಚ್ಚಿ",
      back: "ಹಿಂದೆ",
      next: "ಮುಂದೆ",
      previous: "ಹಿಂದಿನದು",
      reset: "ಮರುಹೊಂದಿಸಿ",
      demoMode: "ಡೆಮೊ ಮೋಡ್",
      certified: "ದೃಢೀಕೃತ ವಿಧಾನ",
      offlineModeActive: "ಆಫ್‌ಲೈನ್ ಸಂಗ್ರಹಣೆ ಸಕ್ರಿಯವಾಗಿದೆ",
    },
  },

  as: {
    appName: "কৃষি-XR (KrishiXR)",
    tagline: "এআৰ/ভিআৰ স্মাৰ্ট কৃষি প্ৰশিক্ষণ আৰু ক্ষেত্ৰ সহায়ক প্ৰণালী",
    offlineReady: "১০০% অফলাইন কাৰ্যক্ষম",
    modules: {
      scanner: "এআৰ শস্য চিকিৎসক",
      scannerDesc: "অন-ডিভাইচ এআই ৰোগ চিনাক্তকৰণ আৰু 3D এআৰ লক্ষণ নিৰীক্ষণ",
      simulation: "ভিআৰ পথাৰ চিমুলেচন",
      simulationDesc: "3D শস্য জীৱনচক্ৰ, বতৰৰ প্ৰভাৱ আৰু গুগল কাৰ্ডবৰ্ড ভিআৰ",
      guidance: "এআৰ পদক্ষেপ নিৰ্দেশনা",
      guidanceDesc: "3D সঁজুলিৰ ব্যৱহাৰ আৰু স্থানীয় ভাষাত মৌখিক নিৰ্দেশনা",
      history: "স্কেন ইতিহাস",
    },
    scanner: {
      startCamera: "কেমেৰা খোলক",
      capture: "পাত পৰীক্ষা কৰক",
      retake: "নতুন স্কেন",
      uploadPhoto: "ফটো আপলোড কৰক",
      samplePresets: "ডেমো নমুনা (তাৎক্ষণিক অফলাইন পৰীক্ষা)",
      analyzing: "ডিভাইচত নিউৰেল ক্লাছিফায়াৰে পৰীক্ষা কৰি আছে...",
      onDeviceAi: "অন-ডিভাইচ অফলাইন এজ এআই",
      confidence: "নিখুঁততা",
      severity: "ৰোগৰ তীব্ৰতা",
      symptoms: "মূল লক্ষণসমূহ",
      organicTreatment: "জৈৱিক প্ৰতিকাৰ",
      chemicalTreatment: "ৰাসায়নিক নিয়ন্ত্ৰণ",
      prevention: "প্ৰতিৰোধ ব্যৱস্থা",
      safeDosageWarning: "নিৰাপদ মাত্ৰা আৰু সুৰক্ষা কিট সতৰ্কতা",
      viewIn3dAr: "3D / এআৰ আৰ্হি চাওক",
      readAloud: "কণ্ঠত শুনক",
      stopAudio: "কণ্ঠ বন্ধ কৰক",
      saveScan: "অফলাইন ডায়েৰীত সংৰক্ষণ কৰক",
      savedSuccessfully: "সফলভাৱে সংৰক্ষণ কৰা হ'ল",
      noCameraMsg: "কেমেৰা অনুপলব্ধ। এআৰ চেন্সৰ চিমুলেচন সক্ৰিয় কৰা হৈছে।",
      selectPresetPrompt: "তাৎক্ষণিক পৰীক্ষাৰ বাবে তলৰ উদ্ভিদৰ নমুনা বাছক:",
      arGuideText: "3D পাতৰ দাগ চাবলৈ ফোনটো ঘূৰাওক বা স্থানত স্থাপন কৰক।",
    },
    simulation: {
      title: "ভাৰ্চুৱেল পথাৰ চিমুলেচন",
      subtitle: "3D আৰু ভিআৰত শস্য বৃদ্ধি আৰু কৃষি সিদ্ধান্ত অনুশীলন কৰক",
      vrMode: "গুগল কাৰ্ডবৰ্ড ভিআৰ",
      exitVr: "ভিআৰৰ পৰা ওলাই যাওক",
      dayNight: "দিন আৰু ৰাতি",
      weather: "বতৰ প্ৰণালী",
      weatherSunny: "ৰৌদ্ৰোজ্জ্বল",
      weatherRain: "বাৰিষাৰ বৰষুণ",
      weatherDrought: "খৰাং / প্ৰখৰ ৰ'দ",
      weatherFog: "ডাঠ কুঁৱলী",
      soilHealth: "মাটিৰ স্বাস্থ্য স্ক'ৰ",
      moisture: "মাটিৰ আৰ্দ্ৰতা",
      yieldEstimate: "আনুমানিক উৎপাদন",
      waterSaved: "পানী সংৰক্ষণ",
      currentStage: "শস্যৰ স্তৰ",
      actionsTitle: "কৃষি পৰিচালনা কাৰ্য্য",
      irrigateAction: "ড্ৰিপ জলসিঞ্চন",
      fertilizeAction: "জৈৱিক কেঁচুসাৰ আৰু সন্তুলিত সাৰ",
      pestAction: "নিম তেল জৈৱিক স্প্ৰে'",
      harvestAction: "উপযুক্ত সময়ত শস্য চপোৱা",
      cardboardHint: "গুগল কাৰ্ডবৰ্ড হেডছেটত ফোনটো সুমুৱাওক। বুটামবোৰলৈ চাই নিৰ্বাচন কৰক।",
    },
    guidance: {
      title: "বাস্তৱিক ক্ষেত্ৰ প্ৰশিক্ষণ",
      subtitle: "3D সঁজুলি মডেল আৰু কণ্ঠ নিৰ্দেশনাৰ সৈতে পদক্ষেপসমূহ শিকক",
      selectModule: "কৃষি কাম বাছক",
      step: "পদক্ষেপ",
      of: "ৰ ভিতৰত",
      markDone: "পদক্ষেপ সম্পূৰ্ণ চিহ্নিত কৰক",
      completed: "সম্পূৰ্ণ হ'ল",
      listenGuidance: "কণ্ঠ নিৰ্দেশনা শুনক",
      tips: "কৃষি বিজ্ঞানীৰ পৰামৰ্শ",
      warning: "সুৰক্ষা সাৱধানতা",
      congrats: "কাৰ্য্য প্ৰমাণপত্ৰ লাভ!",
      certText: "আপুনি বৈজ্ঞানিক পদ্ধতি অনুসৰি এই কৃষি কামটো সফলতাৰে সম্পূৰ্ণ কৰিলে।",
      restartTask: "পুনৰ অনুশীলন কৰক",
    },
    common: {
      language: "ভাষা (Language)",
      close: "বন্ধ কৰক",
      back: "পিছলৈ",
      next: "আগলৈ",
      previous: "পূৰ্বৱৰ্তী",
      reset: "পুনৰাৰম্ভ",
      demoMode: "ডেমো মোড",
      certified: "প্ৰমাণিত পদ্ধতি",
      offlineModeActive: "অফলাইন সংৰক্ষণ সক্ৰিয়",
    },
  },
};
