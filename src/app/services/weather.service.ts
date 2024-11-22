import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.enum';
import { WeatherResponse } from '../models/weather-response.interface';
import { map, Observable } from 'rxjs';
import { Weather } from '../models/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);

  getWeatherByCity(city: City): Observable<Weather> {
    return this.httpClient.get<WeatherResponse>(`${this.apiUrl}&id=${city}`).pipe(
      map(this.mapWeatherResponseToWeather)
    );
  }

  private mapWeatherResponseToWeather(response: WeatherResponse): Weather {
    return {
      id: response.id,
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      temp: response.main.temp,
      city: response.name
    };
  }
}
