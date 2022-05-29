import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  order=1;
  transform(array: Array<string>, args?: any): Array<string> {
    console.log("args",args)
    this.order=args.order;
    console.log(this.order)
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
    // return array.sort(function(a, b){
    //   if(args.property=='DEPART'){
    //     console.log("in depart  ",a['FareItinerary'],a             )
    //     if(new Date(a['FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime']).getTime() < new Date(b['FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime']).getTime()){
    //       return -1 * args.order;
    //   }
    //   else if( new Date(a['FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime']).getTime() > new Date(b['FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime']).getTime()){
    //       return 1 * args.order;
    //   }
    //   else{
    //       return 0;
    //   }
    //   }
      // if(a[args.property] < b[args.property]){
      //     return -1 * args.order;
      // }
      // else if( a[args.property] > b[args.property]){
      //     return 1 * args.order;
      // }
      // else{
      //     return 0;
      // }
  //  });
  }

  sortByDepartDate(a,b){
    //console.log("in sortByDepartDate",a)
    //console.log("in sortByDepartDate",a, a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime)
   // console.log(this.order)
    let departA = new Date( a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime).getTime();
    let departB = new Date(b.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime).getTime();

    // return arriveA > arriveB ? 1 : -1;
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
  // console.log("in sortByArriveDate",a, a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length-1].FlightSegment.ArrivalDateTime)
   // console.log(this.order)
    let arriveA = new Date(
      a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[
        a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length-1
      ].FlightSegment.ArrivalDateTime
    ).getTime();
    let arriveB = new Date(
      b.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[
        b.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length-1
      ].FlightSegment.ArrivalDateTime
    ).getTime();

    // return arriveA > arriveB ? 1 : -1;
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
  // console.log("in sortByArriveDate",a, a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length-1].FlightSegment.ArrivalDateTime)
   // console.log(this.order)
   let totalTimeA=new Date(
    a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length - 1].FlightSegment.ArrivalDateTime
   ).getTime() -
   new Date(a.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime).getTime();
   let totalTimeB=new Date(
    b.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[b.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length - 1].FlightSegment.ArrivalDateTime
   ).getTime() -
   new Date(b.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime).getTime();

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
   // console.log("in sortByArriveDate",a, a.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount)
   // console.log(this.order)
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
