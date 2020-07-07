import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  page: number;
  baseURL: string = "https://api.themoviedb.org/3/"
  apiKey: string = "?api_key=f5e7af4ec0af2af0112f5ee642d644bf"
  language: string = "&language=pt-BR"

  //https://api.themoviedb.org/3/movie/6795?api_key=f5e7af4ec0af2af0112f5ee642d644bf&language=en-US

  constructor(private http: HttpClient) { }

  public getPopularMovies(): Observable<any> {
    return this.http.get(this.baseURL + "movie/popular" + this.apiKey + this.language + "&page=" + this.page + "&include_adult=false")
  };

  public getSearchMovies(movieName: string): Observable<any> {
    return this.http.get(this.baseURL + "search/movie" + this.apiKey + "&query=" + movieName + "&page=" + this.page + "&include_adult=false")
  }

  public getGenreMovies(): Observable<any> {
    return this.http.get(this.baseURL + "genre/movie/list" + this.apiKey + this.language)
  }

  public filterGenreMovies(genresId: any): Observable<any> {
    return this.http.get(this.baseURL + "discover/movie" + this.apiKey + this.language + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + this.page + "&with_genres=" + genresId)
  }

  public getMovieDetails(movieId: string): Observable<any> {
    return this.http.get(this.baseURL + `movie/${movieId}` + this.apiKey + this.language)
  }

  public setPage(nrPage) {
    this.page = nrPage + 1;
  }
}
