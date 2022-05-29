import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddHotelRoomsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'add-hotel-rooms',
  templateUrl: 'add-hotel-rooms.html'
})
export class AddHotelRoomsComponent {

  Arr = Array;
  rooms=[{
    room_no:1,
    adult:1,
    child:0,
    child_age:[0],
    roomSize:1,
  }]
  
  public press: number = 2;
  constructor(public navParams:NavParams, public viewCtrl:ViewController) {
    console.log('Hello AddHotelRoomsComponent Component');
    this.rooms=this.navParams.get('rooms');

  }

  decreaseAdults(i){
    if(this.rooms[i].adult>1){
      this.rooms[i].adult--;
      this.rooms[i].roomSize--;
    }
  }

  increaseAdults(i){
    if(this.rooms[i].adult<6 && this.rooms[i].adult+this.rooms[i].child<6){
      this.rooms[i].adult++;
      this.rooms[i].roomSize++;
    } 
  }

  decreaseChildren(i){
    if(this.rooms[i].child>0){
      this.rooms[i].child--;
      this.rooms[i].child_age.pop();
      this.rooms[i].roomSize--;
    }
  }
  increaseChildren(i){
    if(this.rooms[i].child<6 && this.rooms[i].adult+this.rooms[i].child<6){
      this.rooms[i].child++;
      this.rooms[i].child_age.push(2)
      this.rooms[i].roomSize++;
    } 
  }

  addRoom(e){
    this.rooms.push({
      room_no:this.press++,
      adult:1,
      child:0,
      child_age:[0],
      roomSize:1,
    })
  }

  deleteRoom(i){
    console.log(i);
    this.rooms.splice(i, 1);
  }

  done(){
    this.viewCtrl.dismiss({rooms:this.rooms})
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
