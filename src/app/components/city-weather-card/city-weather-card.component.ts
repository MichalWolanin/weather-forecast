import { Component, input } from '@angular/core';
import { Weather } from '../../models/weather.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-city-weather-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './city-weather-card.component.html',
  styleUrl: './city-weather-card.component.scss'
})
export class CityWeatherComponent{
  weather = input.required<Weather>();
}
