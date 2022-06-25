import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll,{static:true}) ionInfiniteScroll:IonInfiniteScroll;
  articles: Article[]=[];
  constructor(private newsService:NewsService) {}

  ngOnInit(){
    this.newsService.getTopHeadLine()
    .subscribe(articles => this.articles.push(...articles));
  }
  loadData(){
    this.newsService.getTopHeadLine()
    .subscribe(articles =>{
      if(articles.length===this.articles.length){
        this.ionInfiniteScroll.disabled = true;
        //event.target.disabled = true;
      }
      this.articles.push(...articles);
      this.ionInfiniteScroll.complete();
     // event.target.complete();
    });
  }
}
