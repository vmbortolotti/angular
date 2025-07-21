import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly apiKey = '';
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  readonly weather = signal<unknown | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  fetchWeather(city: string) {
    this.loading.set(true);
    this.error.set(null);
    this.http.get(`${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`)
      .subscribe({
        next: data => {
          this.weather.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('City not found or API error');
          this.weather.set(null);
          this.loading.set(false);
        }
      });
  }
}