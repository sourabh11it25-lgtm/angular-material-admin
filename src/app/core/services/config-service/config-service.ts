import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  
  private http = inject(HttpClient);
  private _config = signal<any>(null);

  // Getter to expose a read-only version of the signal
  public readonly config = this._config.asReadonly();

  loadConfig() {
    this.http.get('./assets/data/admin-config.json').subscribe({
      next: (data) => this._config.set(data),
      error: (err) => console.error('Failed to load JSON config:', err)
    });
  }
}
