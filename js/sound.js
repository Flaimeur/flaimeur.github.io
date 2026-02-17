class WiiSynth {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  play(type) {
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === 'hover') {
      // Wii Hover: High, soft, short "Tick" or "Wup"
      // Sine wave, very short envelope
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
      
      gain.gain.setValueAtTime(0.1, t); // Quiet -> louder
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
      
      osc.start(t);
      osc.stop(t + 0.05);
    } 
    else if (type === 'click') {
      // Wii Click: Very High "Crystal Tick"
      // Sine wave, stable high pitch
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000, t); 
      osc.frequency.exponentialRampToValueAtTime(2000, t + 0.05);
      
      gain.gain.setValueAtTime(0.3, t); // Louder start
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05); // Super quick decay
      
      osc.start(t);
      osc.stop(t + 0.05);
    }
    else if (type === 'back') {
      // Wii Back: "Swoosh" down / Cancel
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.2);
      
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
      
      osc.start(t);
      osc.stop(t + 0.2);
    }
    else if (type === 'start') {
      // Start: Positive chime (Major triad arpeggio could be cool, but keep simple)
      // Just a longer "Ping"
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.3);
      
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.5);
      
      osc.start(t);
      osc.stop(t + 0.5);
    }
  }
}

export class SoundManager {
  constructor() {
    this.synth = new WiiSynth();
    this.sounds = {
      hover: new Audio('asset/sounds/hover.mp3'),
      click: new Audio('asset/sounds/click.mp3'),
      back: new Audio('asset/sounds/back.mp3'),
      start: new Audio('asset/sounds/start.mp3')
    };

    // Track load errors to fallback to synth
    Object.keys(this.sounds).forEach(key => {
      const audio = this.sounds[key];
      audio.volume = 0.5;
      audio.hasError = false;
      
      // If file missing (404), mark as error
      audio.addEventListener('error', () => {
        audio.hasError = true;
      });
      
      audio.load(); // Trigger load to check existence
    });

    this.enabled = true;
  }

  play(soundName) {
    if (!this.enabled) return;
    
    // Try play file first
    const audio = this.sounds[soundName];
    
    if (audio && !audio.hasError) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // If play failed (e.g. no interaction yet or 404 not caught), fallback
        this.synth.play(soundName);
      });
    } else {
      // File known missing/error -> Synth
      this.synth.play(soundName);
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  
  unlock() {
    this.synth.resume();
  }
}

export const soundManager = new SoundManager();
