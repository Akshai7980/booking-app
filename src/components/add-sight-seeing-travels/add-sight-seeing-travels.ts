import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the AddSightSeeingTravelsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-sight-seeing-travels',
  templateUrl: 'add-sight-seeing-travels.html'
})
export class AddSightSeeingTravelsComponent {


  Arr = Array;
  
  paxes = [{adults: 1, childs: 0, child_ages: []}];
  constructor(public navParams:NavParams, public viewCtrl:ViewController) {
    console.log('Hello AddSightSeeingTravelsComponent Component');
    this.paxes=this.navParams.get('paxes');
    
  }

  decreaseAdults(i){
    if(this.paxes[i].adults>1){
      this.paxes[i].adults--;
    }
  }

  increaseAdults(i){
    if(this.paxes[i].adults<10){
      this.paxes[i].adults++;
    } 
  }

  decreaseChildren(i){
    if(this.paxes[i].childs>0){
      this.paxes[i].childs--;
      this.paxes[i].child_ages.pop();
    }
  }

  increaseChildren(i){
    if(this.paxes[i].childs<10){
      this.paxes[i].childs++;
      this.paxes[i].child_ages.push(2)
    } 
  }
  // addRoom(){
  //   this.sightSeeingTravels.push({
  //     adults:1,
  //     childs:0,
  //     child_ages:[],
  //   })
  // }

  // deleteRoom(i){
  //   console.log(i);
  //   this.sightSeeingTravels.splice(i, 1);
  // }

  done(){
    this.viewCtrl.dismiss({paxes:this.paxes})
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
