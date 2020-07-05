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
  totalPaginas: number;


  constructor(private http: HttpClient) { }

  public getAllMovies(): Observable<any> {
    
    return this.http.get(this.baseURL + "movie/popular" + this.apiKey + "&page=" + this.page)

  };

  public setPage(nrPage) {
    this.page = nrPage + 1;
  }
}
