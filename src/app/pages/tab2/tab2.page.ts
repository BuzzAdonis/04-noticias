import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
categorys:string[]=['business','entertainment','general','health','science','sports','technology'];
selectedCategory:string=this.categorys[0];
articles: Article[]=[];
  @ViewChild(IonInfiniteScroll,{static:true}) ionInfiniteScroll:IonInfiniteScroll;
  constructor(private newsService:NewsService) {}
  ngOnInit(){
    this.newsService.getTopHeadLineByCategory(this.selectedCategory)
    .subscribe(articles =>this.articles.push(...articles));
  }
  segmentChanged(event:Event){
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsService.getTopHeadLineByCategory(this.selectedCategory)
    .subscribe(articles =>this.articles.push(...articles));
  }
  loadData(){
    this.newsService.getTopHeadLineByCategory(this.selectedCategory,true)
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
