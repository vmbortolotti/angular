import { ChangeDetectionStrategy, Component, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './weather.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Weather } from './weather.model';

@Component({
  selector: 'weather-widget',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class WeatherComponent {
  protected readonly city = signal('London');
  protected readonly cityControl = new FormControl(this.city());

  constructor(protected readonly weatherService: WeatherService) {
    this.cityControl.valueChanges.subscribe(value => {
      if (value) this.city.set(value);
    });
  }

  protected fetch() {
    this.weatherService.fetchWeather(this.city());
  }

  protected weather = <Signal<Weather>>computed(() => this.weatherService.weather());
  protected readonly loading = computed(() => this.weatherService.loading());
  protected readonly error = computed(() => this.weatherService.error());
}