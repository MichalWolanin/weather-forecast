import { Component } from '@angular/core';
import { CityWeathersCardComponent } from '../city-weathers-card/city-weathers-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CityWeathersCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export default class HomePageComponent {}
