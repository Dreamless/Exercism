type StopwatchState = 'ready' | 'running' | 'stopped';

export class SplitSecondStopwatch {
  private _state: StopwatchState;
  private _currentLapTime: number;
  private _laps: number[];

  constructor() {
    this._state = 'ready';
    this._currentLapTime = 0;
    this._laps = [];
  }

  private formatTime(seconds: number): string {
    const hh = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mm = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  private timeToSeconds(timeStr: string): number {
    const [hh, mm, ss] = timeStr.split(':').map(Number);
    return (hh * 3600) + (mm * 60) + ss;
  }

  public get state(): StopwatchState {
    return this._state;
  }

  public get currentLap(): string {
    return this.formatTime(this._currentLapTime);
  }

  public get total(): string {
    const totalSeconds = this._laps.reduce((acc, lap) => acc + lap, 0) +
      this._currentLapTime;
    return this.formatTime(totalSeconds);
  }

  public get previousLaps(): string[] {
    return this._laps.map(lap => this.formatTime(lap));
  }

  public start(): void {
    if (this._state === 'ready' || this._state === 'stopped') {
      this._state = 'running';
    }
  }

  public stop(): void {
    if (this._state === 'running') {
      this._state = 'stopped';
    }
  }

  public lap(): void {
    if (this._state === 'running') {
      this._laps.push(this._currentLapTime);
      this._currentLapTime = 0;
    }
  }

  public reset(): void {
    if (this._state === 'stopped') {
      this._state = 'ready';
      this._currentLapTime = 0;
      this._laps = [];
    }
  }

  public advanceTime(duration: string): void {
    if (this._state === 'running') {
      this._currentLapTime += this.timeToSeconds(duration);
    }
  }
}
