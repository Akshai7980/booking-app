import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';

/**
 * Generated class for the HotelPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-preview',
  templateUrl: 'hotel-preview.html',
})
export class HotelPreviewPage {
  @ViewChild(Slides) slides: Slides;
  data;title;currentIndex=0; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("data");
    this.title = this.navParams.get("title");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelPreviewPage');
  }
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }
}
