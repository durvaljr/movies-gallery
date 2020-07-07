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

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit() {

    // recebendo o ID da Rota
    this.route.params.subscribe((data: any) => {
      this.movieId = data;
      // console.log("movieSelect", this.movieId)
      // console.log("data", data)
    })

    // buscando dos dados na API passando o Id recebido da rota como parâmetro
    this.moviesService.getMovieDetails(this.movieId.id).subscribe((data: any) => {
      this.movieSelect = data
      // console.log("data", data)
      console.log("movieSelect", this.movieSelect)
    }, error => {
      this.err = error
      console.log(this.err)
    })
  }

  

}
