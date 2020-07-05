import { Component } from '@angular/core';
import { MoviesComponent } from './components/movies/movies.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movies-desafio';
  rootPage: any = MoviesComponent;
}
