import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class StorageServicesService {
  private _storage: Storage | null = null;
  private _localArticle:Article[] = [];
  constructor(private storage: Storage) {
    this.init();
   }
   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.loadFavorite();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
 async saveRemover(article:Article){
  const exists = this._localArticle.find(localArticle => localArticle.title === article.title);
  if(exists){
    this._localArticle=this._localArticle.filter(localArticle => localArticle.title !== article.title);
  }
  else{
    this._localArticle = [article, ...this._localArticle];  
  }

  this._storage.set('article',this._localArticle);
  }

  async loadFavorite(){
    try{
      const articles = await this._storage.get('article');
      this._localArticle = articles || [];
    }catch(error){

    }
  }
  get getLocalArticles(){
    return [...this._localArticle]
  }
  
  articleInFavorite(article:Article){
    return !!this._localArticle.find(localArticle => localArticle.title === article.title);
  }
}
