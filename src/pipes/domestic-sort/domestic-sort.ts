import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domesticSort',
})
export class DomesticSortPipe implements PipeTransform {
  
  order=1;
  transform(array: Array<string>, args?: any): Array<string> {
    // console.log("args",args)
    this.order=args.order;
   // console.log(this.order)
    if(args.property=='DEPART'){
      if(args.order==-1){
        return array.sort(this.sortByDepartDate);
      }else{
        return array.sort(this.sortByDepartDate).reverse();
      }
    } else if(args.property=='ARRIVE'){
      if(args.order==-1){
        return array.sort(this.sortByArriveDate);
      }else{
        return array.sort(this.sortByArriveDate).reverse();
      }
    } else if(args.property=='DURATION'){
      if(args.order==-1){
        return array.sort(this.sortByDuration);
      }else{
        return array.sort(this.sortByDuration).reverse();
      }
    } else if(args.property=='PRICE'){
      if(args.order==-1){
        return array.sort(this.sortByPrice);
      }else{
        return array.sort(this.sortByPrice).reverse();
      }
    } 
  }

  sortByDepartDate(a,b){
    let departA = new Date(a.OriginDestinationOptions[0].FlightSegment.DepartureDateTime).getTime();
    let departB = new Date(b.OriginDestinationOptions[0].FlightSegment.DepartureDateTime).getTime();
    if(departA < departB){
          return -1 ;
      }
      else if( departA > departB){
          return 1 ;
      }
      else{
          return 0;
      }
  }

  sortByArriveDate(a,b){
    let arriveA = new Date(a.OriginDestinationOptions[0].FlightSegment.ArrivalDateTime).getTime();
    let arriveB = new Date(b.OriginDestinationOptions[0].FlightSegment.ArrivalDateTime).getTime();
    if(arriveA < arriveB){
          return -1 ;
      }
      else if( arriveA > arriveB){
          return 1 ;
      }
      else{
          return 0;
      }
  }

  sortByDuration(a,b){
   let totalTimeA=new Date(a.OriginDestinationOptions[0].StopQuantityInfo.Duration).getTime() 
   let totalTimeB=new Date(b.OriginDestinationOptions[0].StopQuantityInfo.Duration).getTime()
    if(totalTimeA < totalTimeB){
          return -1 ;
      }
      else if( totalTimeA > totalTimeB){
          return 1 ;
      }
      else{
          return 0;
      }
  }

  sortByPrice(a,b){
   let priceA=parseFloat(a.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
   let priceB=parseFloat(b.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
    if(priceA < priceB){
          return -1 ;
      }
      else if( priceA > priceB){
          return 1 ;
      }
      else{
          return 0;
      }
  }
}
