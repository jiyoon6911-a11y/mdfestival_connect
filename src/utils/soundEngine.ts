// 16-bit Retro Chiptune Web Audio Synthesizer (Zero external assets required)

type SfxType = 'click' | 'walk' | 'stamp' | 'victory';

class RetroSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted = false;
  private bgmTimer: number | null = null;
  private bgmRunning = false;
  private noteIndex = 0;

  // Cheerful 16-bit festival town loop (frequencies in Hz, 0 = rest)
  private readonly melodyNotes = [
    523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 523.25,
    587.33, 698.46, 880.0, 698.46, 783.99, 659.25, 587.33, 0,
    523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 659.25, 587.33,
    659.25, 587.33, 523.25, 392.0, 523.25, 0, 523.25, 0,
  ];

  private readonly bassNotes = [
    261.63, 0, 196.0, 0, 220.0, 0, 196.0, 0,
    174.61, 0, 220.0, 0, 196.0, 0, 196.0, 0,
    261.63, 0, 196.0, 0, 220.0, 0, 174.61, 0,
    196.0, 0, 196.0, 0, 130.81, 0, 196.0, 0,
  ];

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.pauseBgmTimer();
    } else if (this.bgmRunning) {
      this.resumeBgmTimer();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  private playTone(
    freq: number,
    durationSec: number,
    type: OscillatorType,
    volume: number,
    delaySec = 0
  ) {
    if (this.isMuted || freq <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delaySec;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  }

  public startBgm(): void {
    if (this.bgmRunning) return;
    this.bgmRunning = true;
    this.ensureContext();
    if (!this.isMuted) {
      this.resumeBgmTimer();
    }
  }

  public stopBgm(): void {
    this.bgmRunning = false;
    this.pauseBgmTimer();
  }

  private pauseBgmTimer(): void {
    if (this.bgmTimer !== null) {
      window.clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  private resumeBgmTimer(): void {
    if (this.bgmTimer !== null) return;
    this.bgmTimer = window.setInterval(() => {
      if (this.isMuted || !this.bgmRunning) return;
      const idx = this.noteIndex % this.melodyNotes.length;
      const lead = this.melodyNotes[idx];
      const bass = this.bassNotes[idx];
      if (lead > 0) this.playTone(lead, 0.16, 'square', 0.022);
      if (bass > 0) this.playTone(bass, 0.18, 'triangle', 0.032);
      this.noteIndex += 1;
    }, 200);
  }

  public playSfx(type: SfxType): void {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    if (type === 'click') {
      this.playTone(620, 0.06, 'square', 0.045, 0);
      this.playTone(880, 0.07, 'square', 0.04, 0.045);
      return;
    }

    if (type === 'walk') {
      // Two gentle footstep thuds
      this.playTone(190, 0.05, 'triangle', 0.06, 0);
      this.playTone(220, 0.05, 'triangle', 0.055, 0.18);
      this.playTone(190, 0.05, 'triangle', 0.06, 0.36);
      this.playTone(230, 0.05, 'triangle', 0.055, 0.52);
      return;
    }

    if (type === 'stamp') {
      // Bright RPG stamp fanfare
      this.playTone(523.25, 0.09, 'square', 0.055, 0);
      this.playTone(659.25, 0.09, 'square', 0.055, 0.08);
      this.playTone(783.99, 0.09, 'square', 0.055, 0.16);
      this.playTone(1046.5, 0.22, 'square', 0.065, 0.24);
      return;
    }

    if (type === 'victory') {
      // Heroic Kingdom Saved 16-bit fanfare
      const notes = [
        [523.25, 0.11, 0],
        [523.25, 0.11, 0.12],
        [523.25, 0.11, 0.24],
        [659.25, 0.25, 0.36],
        [587.33, 0.13, 0.64],
        [659.25, 0.13, 0.78],
        [783.99, 0.45, 0.94],
        [1046.5, 0.55, 1.15],
      ];
      notes.forEach(([f, d, t]) => {
        this.playTone(f, d, 'square', 0.065, t);
        this.playTone(f * 0.5, d, 'triangle', 0.05, t);
      });
    }
  }
}

export const soundEngine = new RetroSoundEngine();
