import { Component, DestroyRef, inject } from '@angular/core';
import { CityWeatherComponent } from "../city-weather-card/city-weather-card.component";
import { Weather } from '../../models/weather.interface';
import { WeatherService } from '../../services/weather.service';
import { City } from '../../models/city.enum';
import { forkJoin, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-city-weathers-card',
  standalone: true,
  imports: [CityWeatherComponent],
  templateUrl: './city-weathers-card.component.html',
  styleUrl: './city-weathers-card.component.scss'
})
export class CityWeathersCardComponent {
  cityWeathers?: Weather[];

  private readonly refreshInterval = 10_000;
  private readonly changeCitiesInterval = 60_000;
  private weatherService = inject(WeatherService);
  private destroyRef = inject(DestroyRef);
  private readonly cities = [
    City.Warsaw,
    City.London,
    City.NewYork,
    City.Lodz,
    City.Berlin,
  ];

  constructor() {
    this.fetchCities();
  }

  private fetchCities(): void {
    timer(0, this.changeCitiesInterval).pipe(
      switchMap(() => {
        const selectedCities = this.getRandomCities(this.cities, 3);
        const requests = selectedCities.map(city =>
          this.weatherService.getWeatherByCity(city)
        );

        return timer(0, this.refreshInterval).pipe(
          switchMap(() => forkJoin(requests))
        );
      })
    )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(cityWeathers => {
      this.cityWeathers = cityWeathers;
    });
  }

  private getRandomCities(allCities: City[], count: number): City[] {
    const citiesCopy = [...allCities];
    const selectedCities: City[] = [];

    while (selectedCities.length < count && citiesCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * citiesCopy.length);
      const city = citiesCopy.splice(randomIndex, 1)[0]; 
      selectedCities.push(city);
    }

    return selectedCities;
  }  
}
