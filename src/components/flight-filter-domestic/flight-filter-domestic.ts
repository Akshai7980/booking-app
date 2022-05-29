import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { JsonSearchProvider } from '../../providers/json-search/json-search';

/**
 * Generated class for the FlightFilterDomesticComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'flight-filter-domestic',
  templateUrl: 'flight-filter-domestic.html'
})
export class FlightFilterDomesticComponent {

  price: any = {lower: 0, upper: 100};
  minPrice:number=0;
  maxPrice:number=0;
  selectedMinPrice:number=0;
  selectedMaxPrice:number=0;
  currencyCode:string="";
  fromCity:string="";
  toCity:string="";
  airlines=[];
  layowerAirports=[];
  isRoundTrip:boolean=false;
  isMultiWay:boolean=false;
  isZeroStopsSelected:boolean=true;
  isOneStopSelected:boolean=true;
  isTwoStopsSelected:boolean=true;
  isDepartEarlyMorning:boolean=true;
  isDepartDay:boolean=true;
  isDepartEvening:boolean=true;
  isDepartNight:boolean=true;
  isArriveEarlyMorning:boolean=true;
  isArriveDay:boolean=true;
  isArriveEvening:boolean=true;
  isArriveNight:boolean=true;
  isReturnDepartEarlyMorning:boolean=true;
  isReturnDepartDay:boolean=true;
  isReturnDepartEvening:boolean=true;
  isReturnDepartNight:boolean=true;
  isReturnArriveEarlyMorning:boolean=true;
  isReturnArriveDay:boolean=true;
  isReturnArriveEvening:boolean=true;
  isReturnArriveNight:boolean=true;
  selectedFareType:string="";
  allAirlineSelected:boolean=true;
  allLayowersSelected:boolean=true;
  constructor(public viewCtrl:ViewController, public navParams:NavParams, public jsonSearchProvider:JsonSearchProvider) {
    console.log('Hello FlightFilterDomesticComponent Component');
    this.minPrice=this.navParams.get('minPrice');
    this.maxPrice=this.navParams.get('maxPrice')
    this.selectedMinPrice=this.navParams.get('selectedMinPrice');
    this.selectedMaxPrice=this.navParams.get('selectedMaxPrice');
    this.currencyCode=this.navParams.get('currencyCode');
    this.fromCity=this.navParams.get('fromCity');
    this.toCity=this.navParams.get('toCity');
    this.airlines=this.navParams.get('airlines');
    this.isMultiWay =this.navParams.get('isMultiWay')
    for(let i=0;i<this.airlines.length-1;i++){
      if(!this.airlines[i].selected){
        this.allAirlineSelected=false;
        break;
      }
    }
    this.layowerAirports=this.navParams.get('layowerAirports');
    if(this.layowerAirports){
      for(let i=0;i<this.layowerAirports.length-1;i++){
        if(!this.layowerAirports[i].selected){
          this.allLayowersSelected=false;
          break;
        }
      }
    }
   
    this.price={ lower:this.selectedMinPrice,upper:this.selectedMaxPrice}
    this.isZeroStopsSelected=this.navParams.get('isZeroStopsSelected');
    this.isOneStopSelected=this.navParams.get('isOneStopSelected');
    this.isTwoStopsSelected=this.navParams.get('isTwoStopsSelected');
    this.isDepartEarlyMorning=this.navParams.get('isDepartEarlyMorning');
    this.isDepartDay=this.navParams.get('isDepartDay');
    this.isDepartEvening=this.navParams.get('isDepartEvening');
    this.isDepartNight=this.navParams.get('isDepartNight');
    this.isArriveEarlyMorning=this.navParams.get('isArriveEarlyMorning');
    this.isArriveDay=this.navParams.get('isArriveDay');
    this.isArriveEvening=this.navParams.get('isArriveEvening');
    this.isArriveNight=this.navParams.get('isArriveNight');
    this.isReturnDepartEarlyMorning=this.navParams.get('isReturnDepartEarlyMorning');
    this.isReturnDepartDay=this.navParams.get('isReturnDepartDay');
    this.isReturnDepartEvening=this.navParams.get('isReturnDepartEvening');
    this.isReturnDepartNight=this.navParams.get('isReturnDepartNight');
    this.isReturnArriveEarlyMorning=this.navParams.get('isReturnArriveEarlyMorning');
    this.isReturnArriveDay=this.navParams.get('isReturnArriveDay');
    this.isReturnArriveEvening=this.navParams.get('isReturnArriveEvening');
    this.isReturnArriveNight=this.navParams.get('isReturnArriveNight');
    this.selectedFareType=this.navParams.get('selectedFareType');
    this.isRoundTrip=this.navParams.get('isRoundTrip');
    console.log(this.airlines)
  }

  close(){
    this.viewCtrl.dismiss();
  }

  airlineCheckboxChange(ev){
    console.log(ev,this.airlines)
    this.allAirlineSelected=true;
    for(let i=0;i<this.airlines.length;i++){
      if(!this.airlines[i].selected){
        this.allAirlineSelected=false;
        break;
      }
    }
  }

  layowerCheckboxChange(ev){
    this.allLayowersSelected=true;
    for(let i=0;i<this.layowerAirports.length;i++){
      if(!this.layowerAirports[i].selected){
        this.allLayowersSelected=false;
        break;
      }
    }
  }

  allAirlineCheckboxChange(){
this.allAirlineSelected=!this.allAirlineSelected;
    if(this.allAirlineSelected){
      for(let i=0;i<this.airlines.length;i++){
        this.airlines[i].selected=true;
      }
    }else{
      for(let i=0;i<this.airlines.length;i++){
        this.airlines[i].selected=false;
      }
    }
  }

  allLayowerCheckboxChange(){
    this.allLayowersSelected=!this.allLayowersSelected;
    if(this.allLayowersSelected){
      for(let i=0;i<this.layowerAirports.length;i++){
        this.layowerAirports[i].selected=true;
      }
    }else{
      for(let i=0;i<this.layowerAirports.length;i++){
        this.layowerAirports[i].selected=false;
      }
    }
  }

  done(){
    this.viewCtrl.dismiss({
      selectedMaxPrice: this.price.upper,
      selectedMinPrice: this.price.lower,
      airlines:this.airlines,
      layowerAirports:this.layowerAirports,
      isZeroStopsSelected:this.isZeroStopsSelected,
      isOneStopSelected:this.isOneStopSelected,
      isTwoStopsSelected:this.isTwoStopsSelected,
      isDepartEarlyMorning:this.isDepartEarlyMorning,
      isDepartDay:this.isDepartDay,
      isDepartEvening:this.isDepartEvening,
      isDepartNight:this.isDepartNight,
      isArriveEarlyMorning:this.isArriveEarlyMorning,
      isArriveDay:this.isArriveDay,
      isArriveEvening:this.isArriveEvening,
      isArriveNight:this.isArriveNight,
      isReturnDepartEarlyMorning:this.isReturnDepartEarlyMorning,
      isReturnDepartDay:this.isReturnDepartDay,
      isReturnDepartEvening:this.isReturnDepartEvening,
      isReturnDepartNight:this.isReturnDepartNight,
      isReturnArriveEarlyMorning:this.isReturnArriveEarlyMorning,
      isReturnArriveDay:this.isReturnArriveDay,
      isReturnArriveEvening:this.isReturnArriveEvening,
      isReturnArriveNight:this.isReturnArriveNight,
      selectedFareType:this.selectedFareType,
     
    })
  }

  getAirlineName(airlineCode) {
   // console.log(airlineCode,this.jsonSearchProvider.airlineDetails)
    return this.jsonSearchProvider.getAirlineName(airlineCode).AirLineName;
  }

  reset(){
    this.selectedFareType = "";
    this.isZeroStopsSelected = true;
    this.isOneStopSelected = true;
    this.isTwoStopsSelected = true;
    this.isDepartEarlyMorning= true;
    this.isDepartDay = true;
    this.isDepartEvening = true;
    this.isDepartNight=true;
    this.isArriveEarlyMorning = true;
    this.isArriveDay = true;
    this.isArriveEvening = true;
    this.isArriveNight = true;


    this.minPrice=this.navParams.get('minPrice');
    this.maxPrice=this.navParams.get('maxPrice')
    this.selectedMinPrice=this.minPrice;
    this.selectedMaxPrice=this.maxPrice;
    for(let i=0;i<this.airlines.length;i++){
      this.airlines[i].selected=true;
    }
    this.allAirlineSelected=true;
      for(let i=0;i<this.layowerAirports.length;i++){
        this.layowerAirports[i].selected=true;
    }
    this.allLayowersSelected=true;
   
    this.price={
      lower:this.selectedMinPrice,
      upper:this.selectedMaxPrice 
    }

    this.isReturnDepartEarlyMorning=true;
    this.isReturnDepartDay=true;
    this.isReturnDepartEvening=true;
    this.isReturnDepartNight=true;
    this.isReturnArriveEarlyMorning=true;
    this.isReturnArriveDay=true;
    this.isReturnArriveEvening=true;
    this.isReturnArriveNight=true;
  }
}

