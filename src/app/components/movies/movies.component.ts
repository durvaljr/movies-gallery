import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  queryMovie: string = "";
  movies: any;
  err: any;
  totalResults: any;
  nMovies: any;
  genres: any;
  movieDetails: Array<any>;
  selected: any

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private moviesService: MoviesService, private router: Router) {
    this.getMovies();
    this.getGenre();
  }
  ngOnInit() {
  }

  // Selecionando os filmes popupalres
  getMovies() {
    this.moviesService.getPopularMovies().subscribe(
      (data: any) => {
        // recebendo os filmes / conteudo total e tamanho do results
        this.movies = data.results;
        this.totalResults = data.total_results;
        this.nMovies = data.results.length;

      }, error => {
        this.err = error;
        console.log(this.err)
      }
    )
  }

  // Metodo de buscar os filmes pelo nome
  getSearchMovies(movieName: string) {
    this.moviesService.getSearchMovies(movieName).subscribe(
      (data: any) => {
        this.movies = data.results;
        this.totalResults = data.total_results;
        this.nMovies = data.results.length;

      }, error => {
        this.err = error;
        console.log(this.err)
      }
    )
  }

  // Buscando o array de generos na API
  getGenre() {
    this.moviesService.getGenreMovies().subscribe(
      (data: any) => {
        this.genres = data.genres
      }, error => {
        this.err = error;
        console.log(this.err)
      })
  }

  // Paginação
  previewsPage(event) {
    this.moviesService.setPage(event.pageIndex);
    this.filterName(this.queryMovie);
    if(this.selected != "")
      this.getCategories(this.selected)
     
  }

  filterName(movieName: string) {
    if (this.queryMovie != movieName) {
      this.moviesService.setPage(0)
      this.paginator.firstPage()
    }

    this.queryMovie = movieName

    if (movieName != '') {
      this.getSearchMovies(movieName)
    } else {
      this.getMovies();
      
      // this.moviesService.setPage(0)
    }
  }

  // Selecionando o filme e passando o Id para a pagina de detalhes
  getDetails(movie: any) {
    this.moviesService.getMovieDetails(movie.id).subscribe(
      (data: any) => {
        this.movieDetails = data
        // console.log(this.movieDetails)
        this.router.navigate(['/movie-detail', movie.id])
      }, error => {
        this.err = error
        console.log(this.err)
      }
    )
  }

  getCategories(categoria: string) {
    categoria.toString()
    this.moviesService.filterGenreMovies(categoria).subscribe((data: any) => {
      this.movies = data.results
      this.totalResults = data.total_results;
      this.nMovies = data.results.length;
      // console.log(this.movies)
    }, error => {
      this.err = error
      console.log(this.err)
    })
  }
}
