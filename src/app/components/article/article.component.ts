import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageServicesService } from 'src/app/services/storage-services.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  {
  @Input() article:Article;
  @Input() index:number=0;
  constructor(
    private iab:InAppBrowser,
    private platform:Platform,
    private actionSheetController:ActionSheetController,
    private socialSharing:SocialSharing,
    private storageServices:StorageServicesService,
    ) { }

  openArticle(){
    if(this.platform.is("ios")||this.platform.is("android")){
    const browser = this.iab.create(this.article.url);
    browser.show();
    return;
  }
  window.open(this.article.url,'blank')
  }

  async onOpenMenu(){
    const articleInFavorite = this.storageServices.articleInFavorite(this.article);
    const btnDinamico:ActionSheetButton[]=[        {
      text:articleInFavorite ? 'Remover favorito':'Favorita',
      icon:articleInFavorite ? 'heart':'heart-outline',
      handler:() => this.onToggleFavorite()
    },
    {
      text:'Cancel',
      icon:'close-outline',
      role:'cancel',
      cssClass:'secondary'
    }]
    const share:ActionSheetButton ={
      text:'Compartir',
      icon:'share-outline',
      handler:() => this.onShareArticle()
    };
    if(this.platform.is('capacitor')){
      btnDinamico.unshift(share)
    }
    const actionSheet = await this.actionSheetController.create({
      header:'Opciones',
      buttons:btnDinamico
    });


    await actionSheet.present();
  }
  onShareArticle(){
    const{title, source, url}=this.article;
    this.socialSharing.share(
      title,
      source.name,
      null,
      url
    );
  }

  onToggleFavorite(){
    this.storageServices.saveRemover(this.article);
  }
}
