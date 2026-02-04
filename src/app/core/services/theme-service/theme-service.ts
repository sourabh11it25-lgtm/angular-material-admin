import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
   private document = inject(DOCUMENT);
  isDarkMode = signal(localStorage.getItem('theme') === 'dark');

  constructor() {
    effect(() => {
      const mode = this.isDarkMode();
      localStorage.setItem('theme', mode ? 'dark' : 'light');
      
      if (mode) {
        this.document.body.classList.add('dark-theme');
      } else {
        this.document.body.classList.remove('dark-theme');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }
}
