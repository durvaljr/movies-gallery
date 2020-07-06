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


  constructor(private http: HttpClient) { }

  public getPopularMovies(): Observable<any> {
    console.log(this.page)
    return this.http.get(this.baseURL + "movie/popular" + this.apiKey + "&page=" + this.page + "&include_adult=false")
  };

  public getSearchMovies(query: string): Observable<any> {
    console.log(this.page)
    return this.http.get(this.baseURL + "search/movie" + this.apiKey + "&query=" + query + "&page=" + this.page + "&include_adult=false")
  }

  public setPage(nrPage) {
    this.page = nrPage + 1;
  }
}
