import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MatPaginator } from '@angular/material';

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

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private moviesService: MoviesService) {
    this.getMovies();
  }
  ngOnInit() {
  }

  getMovies() {
    this.moviesService.getPopularMovies().subscribe(
      (data: any) => {
        this.movies = data.results;
        this.totalResults = data.total_results;
        this.nMovies = data.results.length;

        console.log(data)
      }, error => {
        this.err = error;
        console.log(this.err)
      }
    )
  }

  getSearchMovies(movieName: string) {
    this.moviesService.getSearchMovies(movieName).subscribe(
      (data: any) => {
        this.movies = data.results;
        this.totalResults = data.total_results;
        this.nMovies = data.results.length;

        console.log(data)
      }, error => {
        this.err = error;
        console.log(this.err)
      }
    )
  }

  nextPreviewsPage(event) {
    this.moviesService.setPage(event.pageIndex);
    this.filterName(this.queryMovie);
  }

  filterName(movieName: string) {

    if (this.queryMovie != movieName) {
      console.log("passei por aqui")
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
}
