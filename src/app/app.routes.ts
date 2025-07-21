import { Routes } from '@angular/router';

export const routes: Routes = [ 
    {
    path: 'weather',
    loadComponent: () =>
      import('./weather/weather.component').then(m => m.WeatherComponent),
  },
  // ...other routes
];
