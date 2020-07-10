import { MoviesService } from 'src/app/services/movies.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movieId: any;
  movieSelect: Array<any>;
  err: any;
  getIdElement: any;
  currentFontSize: any;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {
    
   }

  ngOnInit() {

    // recebendo o ID da Rota
    this.route.params.subscribe((data: any) => {
      this.movieId = data;
    })

    // buscando dos dados na API passando o Id recebido da rota como parâmetro
    this.moviesService.getMovieDetails(this.movieId.id).subscribe((data: any) => {
      this.movieSelect = data
    }, error => {
      this.err = error
      console.log(this.err)
    })

  }

  changeFontSize(event) {
    this.getIdElement = document.getElementById("acessibilidade");
    this.currentFontSize = this.getIdElement.style.fontSize;

    if(event == 'plus') {
      this.currentFontSize = parseInt(this.currentFontSize) + 2 + 'px'
    } else if (event == 'less') {
      this.currentFontSize = parseInt(this.currentFontSize) - 2 + 'px'
    } else if (event == 'standardSize') {
      this.currentFontSize = 16 + 'px'
    }
    this.getIdElement.style.fontSize = this.currentFontSize;
  }

}
