import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SpalshPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spalsh',
  templateUrl: 'spalsh.html',
})
export class SpalshPage {
  public loadProgress : number = 50;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('ionViewDidLoad SpalshPage');
    setTimeout(()=>{
      this.navCtrl.push(HomePage)
   }, 4000);

  }

  ionViewDidLoad() {
    setInterval(() => {
      if (this.loadProgress < 100)
        this.loadProgress += 1;
      else
        clearInterval(this.loadProgress);
    }, 50);
  }
  

}
