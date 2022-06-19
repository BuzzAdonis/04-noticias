import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import {map} from 'rxjs/operators';
const apiKey=environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getTopHeadLine():Observable<Article[]>{
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?q=tesla&from=2022-05-19&sortBy=publishedAt`,{
      params:{
        apiKey:apiKey
      }
    })
    .pipe(
      map(({articles})=>articles)
    );
  }
}
