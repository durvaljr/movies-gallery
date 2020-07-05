import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: any;
  err: any;
  totalPages: any;
  txTituloPesquisa: String = '';

  constructor(private moviesService: MoviesService) {
    this.getMovies();
  }
  ngOnInit() {
  }

  getMovies() {
    this.moviesService.getAllMovies().subscribe(
      (data: any) => {
        this.movies = data.results;
        this.totalPages = data.total_pages;

        console.log(data)
      }, error => {
        this.err = error;
        console.log(this.err)
      }
    )
  }

  nextPreviewsPage(ev) {
    this.moviesService.setPage(ev.pageIndex)
    this.getMovies();
  }

  filterName(texto: string) {
    console.log(texto)
    if (texto != '') {
      this.movies = this.movies.filter(res => {
        // console.log(res.title)
        return res.title.toLocaleLowerCase().match(texto.toLocaleLowerCase());
      })
    } else {
      this.ngOnInit();
      console.log("chegou")
      this.getMovies();
    }
  }
  
}
