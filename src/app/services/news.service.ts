import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse,ArticleByCategoryAndPage } from '../interfaces';
import {map} from 'rxjs/operators';
import { storedArticlesByCategory } from '../data/mock-news';
const apiKey=environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private articleByCategoryAndPage:ArticleByCategoryAndPage=storedArticlesByCategory;
  constructor(private http:HttpClient) { }
  getTopHeadLine():Observable<Article[]>{
    return this.getTopHeadLineByCategory('*');
    return this.getArticleByCategory('*');
  }

  getTopHeadLineByCategory(category: string,loadMore:boolean=false):Observable<Article[]>{
    
    return of(this.articleByCategoryAndPage[category].articles);

    if(loadMore){
      return this.getArticleByCategory(category);
    }
    if(this.articleByCategoryAndPage[category]){
      return of(this.articleByCategoryAndPage[category].articles);
    }

    return this.getArticleByCategory(category);
  }
  private getArticleByCategory(category: string):Observable<Article[]>{
    if(!Object.keys(this.articleByCategoryAndPage).includes(category)){
      this.articleByCategoryAndPage[category]={
        page:0,
        articles:[]
      }
    }
    const page = this.articleByCategoryAndPage[category].page+1;
    if(category != '*'){
    return  this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us`,{
      params:{
        page:page,
        category:category,
        apiKey:apiKey
      }
    })
    .pipe(
      map(({articles})=>{
        if(articles.length===0) return this.articleByCategoryAndPage[category].articles;;

        this.articleByCategoryAndPage[category]={
          page:page,
          articles:[...this.articleByCategoryAndPage[category].articles, ...articles]
        }
        
        return this.articleByCategoryAndPage[category].articles;})
    );}
    else{
      return  this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us`,{
        params:{
          page:page,
          apiKey:apiKey
        }
      })
      .pipe(
        map(({articles})=>{
          if(articles.length===0) return this.articleByCategoryAndPage[category].articles;;
  
          this.articleByCategoryAndPage[category]={
            page:page,
            articles:[...this.articleByCategoryAndPage[category].articles, ...articles]
          }
          
          return this.articleByCategoryAndPage[category].articles;})
      );  
    }
  }
}
