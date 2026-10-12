import { Language } from '../types/i18n';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private listeners: Array<(speaking: boolean) => void> = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (speaking: boolean) => void): () => void {
    this.listeners.push(listener);
    listener(this.isSpeakingState);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private setSpeaking(speaking: boolean) {
    this.isSpeakingState = speaking;
    this.listeners.forEach(l => l(speaking));
  }

  public speak(text: string, lang: Language): boolean {
    if (!this.synth) return false;

    this.stop();

    if (!text || text.trim() === '') return false;

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Map language code to BCP 47 locale
    const langMap: Record<Language, string[]> = {
      en: ['en-IN', 'en-US', 'en-GB'],
      hi: ['hi-IN', 'hi'],
      kn: ['kn-IN', 'kn'],
      as: ['as-IN', 'as', 'bn-IN', 'hi-IN'], // Assamese with Bengali fallback if speech engine lacks 'as-IN'
    };

    const targetLocales = langMap[lang] || ['en-US'];
    const voices = this.synth.getVoices();

    // Find best matching voice
    let selectedVoice: SpeechSynthesisVoice | undefined;
    for (const loc of targetLocales) {
      selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith(loc.toLowerCase()));
      if (selectedVoice) break;
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = targetLocales[0];
    }

    utterance.rate = 0.95; // Slightly slower, clear tone for field instructions
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.setSpeaking(true);
    };

    utterance.onend = () => {
      this.setSpeaking(false);
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.setSpeaking(false);
      this.currentUtterance = null;
    };

    try {
      this.synth.speak(utterance);
      return true;
    } catch {
      this.setSpeaking(false);
      return false;
    }
  }

  public stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.setSpeaking(false);
    this.currentUtterance = null;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const speechService = new SpeechService();
