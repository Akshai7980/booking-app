import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HotelFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hotel-filter',
  templateUrl: 'hotel-filter.html'
})
export class HotelFilterComponent {
  pricelist = {};
  facilityList = [];
  hotelTypeList= [];
  subLocalityList=[];
  price: any = {lower: 0, upper: 100};
  minPrice:number=0;
  maxPrice:number=0;

  isHiddenl =[];
  isHidden = [];

  facilities = [];
  propertyType= [];
  locality=[];
  ratingList= [];
  fareTypes = [];
  tripAdvisor=[];
  currency =[];
  constructor(public navParams:NavParams, public viewCtrl:ViewController) {
   this.pricelist=this.navParams.get('pricelist');
   this.facilityList = this.navParams.get("facilityList");
   this.hotelTypeList=this.navParams.get('hotelTypeList');
   this.subLocalityList=this.navParams.get('subLocalityList');
   this.minPrice=this.navParams.get('minPrice');
   this.maxPrice=this.navParams.get('maxPrice');
   this.currency = this.navParams.get('currency');
   this.price={
    lower:this.minPrice,
    upper:this.maxPrice 
  }
  }

  closeModal(){
    this.viewCtrl.dismiss()
  }
 
  starRating(sizeListId){
    let index = this.ratingList.indexOf(sizeListId);
    if(index > -1){
      this.ratingList.splice(index, 1);
      console.log(this.ratingList.splice)
    }else{
      this.ratingList.push(sizeListId);
      console.log(this.ratingList)
    }
  }

  tripAdvisorRating(sizeListId){
    let index = this.tripAdvisor.indexOf(sizeListId);
    if(index > -1){
      this.tripAdvisor.splice(index, 1);
      console.log(this.tripAdvisor.splice)
    }else{
      this.tripAdvisor.push(sizeListId);
      console.log(this.tripAdvisor)
    }
  }

  // tripAdvisorRating(size:HotelFilterComponent, val){
  //   console.log(val);
  //   if(val === true){
  //     size.isOutline = false;
  //     console.log( size.isOutline);
  //   }else{
  //     size.isOutline = val;
  //     console.log( size.isOutline);
  //     this.tripAdvisor.push(size.isOutline) 
  //   }
  // }

  sizeData1= [
    {id: "2",isOutline:true},
    {id: "3.5",isOutline:true},
    {id: "4",isOutline:true},
    {id: "4.5",isOutline:true},
  ]
  sizeData= [
    {id: "2",hasTrue:true},
    {id: "3",hasTrue:true},
    {id: "4",hasTrue:true},
    {id: "5",hasTrue:true},
  ]
  

  selectfare(ev,data){
    if (ev.checked == true) {
       this.fareTypes.push(data);
     } else {
      let index = this.fareTypes.findIndex((category)=>{
        return category === data;
      })
      this.fareTypes.splice(index,1)
    }
    console.log('my selected array',this.fareTypes);
  }

   
  selectMember(ev,data){
    console.log(ev);
    console.log(data);
    if (ev.checked == true) {
       this.facilities.push(data);
     } else {
      let index = this.facilities.findIndex((category)=>{
        return category === data;
      })
      this.facilities.splice(index,1)
    }
    console.log('my selected array',this.facilities);
   }

   selecthotelType(ev,data){
    if (ev.checked == true) {
       this.propertyType.push(data);
     } else {
      let index = this.propertyType.findIndex((category)=>{
        return category === data;
      })
      this.propertyType.splice(index,1)
    }
    console.log('my selected array',this.propertyType);
   }

   selectlocality(ev,data){
    if (ev.checked == true) {
       this.locality.push(data);
     } else {
      let index = this.locality.findIndex((category)=>{
        return category === data;
      })
      this.locality.splice(index,1)
    }
    console.log('my selected array',this.locality);
   }

  done(){
    console.log()
    this.viewCtrl.dismiss({
      facilityList:this.facilities,
      hotelTypeList:this.propertyType,
      subLocalityList:this.locality,
      hotelRating: this.ratingList,
      tripAdvisorRating:this.tripAdvisor,
      fareTypes: this.fareTypes,
      price:this.price,
    })
  }
}
