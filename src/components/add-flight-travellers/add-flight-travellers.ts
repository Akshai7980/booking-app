import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddFlightTravellersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-flight-travellers',
  templateUrl: 'add-flight-travellers.html'
})
export class AddFlightTravellersComponent {

  adults=1;
  children=0;
  infants=0;

  constructor(public navParams:NavParams, public viewCtrl:ViewController) {
    console.log('Hello AddFlightTravellersComponent Component');
    this.adults=this.navParams.get('adults');
    this.children=this.navParams.get('children');
    this.infants=this.navParams.get('infants');
  }

  decreaseAdults(){
    if(this.adults>1){
      this.adults--;
      if(this.infants>this.adults){
        this.infants--;
      }
    }
  }
  increaseAdults(){
    if(this.adults<9){
      if(this.adults+this.children<9){
        this.adults++;
      }
    }
  }
  decreaseChildren(){
    if(this.children>0){
      this.children--;
    }

  }
  increaseChildren(){
    // if(this.children<8){
      if(this.adults+this.children<9){
        this.children++;
      }
    // }
  }
  decreaseInfants(){
    if(this.infants>0){
      this.infants--;
    }
  }
  increaseInfants(){
    if(this.infants<this.adults){
      this.infants++;
    }
  }

  travellersSelected(){
    this.viewCtrl.dismiss({adults:this.adults,children:this.children,infants:this.infants})
  }

}
