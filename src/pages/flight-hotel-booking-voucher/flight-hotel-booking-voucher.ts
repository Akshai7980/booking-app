import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { JsonSearchProvider } from '../../providers/json-search/json-search';
import { HomePage } from '../home/home';
import { FlightsProvider } from '../../providers/flights/flights';
/**
 * Generated class for the FlightHotelBookingVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-hotel-booking-voucher',
  templateUrl: 'flight-hotel-booking-voucher.html',
})
export class FlightHotelBookingVoucherPage {
  departDate: Date = new Date();
  flightInfo; destinationDetails; currencys;
  personDetail; flightClass; destInfo; callBack; 
  //adults; children; infants; 
  isPostCode: boolean = false; isAreaCode: boolean = false; isNationality: boolean = false;
  postalCode = ""; areaCode = "";
  isFareRules: boolean = false;
  map = {};guestDetails;bookingDetails = [];
  cityPair: string = "";rooms;loading;user;TXN_AMOUNT;
  hotelAllMarkup;HotelFix;FlightAllMarkup;FlightAllFix;
  paxDetails = [];paxDetailsObj = [];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl: LoadingController,
     public toastCtrl: ToastController, 
     public jsonSearchProvider:JsonSearchProvider,
     public flightProvider:FlightsProvider

     ) {
      this.flightInfo = this.navParams.get("flightInfo");
      this.rooms = this.navParams.get("rooms");
      this.flightClass = this.navParams.get("flightClass");
      this.destinationDetails = this.navParams.get("destinationDetails");
      this.destInfo = this.navParams.get("destInfo");
      this.callBack = this.navParams.get("callBack");
      this.currencys = this.navParams.get("currencys");
      this.user = this.navParams.get("user");
      this.TXN_AMOUNT = this.navParams.get("TXN_AMOUNT");
      this.hotelAllMarkup = this.navParams.get("hotelAllMarkup");
      this.HotelFix = this.navParams.get("HotelFix");
      this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
      this.FlightAllFix = this.navParams.get("FlightAllFix");
      this.guestDetails = this.navParams.get("guestDetails");
      console.log('guestDetails arr----- --> ', this.guestDetails );
      for(var i = 0; i < this.guestDetails.length; i++) {
        this.paxDetailsObj.push(this.guestDetails[i]); 
        let adlutArr;
        let childArr;
        let roomArr=[];
      for(var j = 0; j < this.paxDetailsObj.length; j++) { 
        adlutArr = this.paxDetailsObj[j].adults;
      }
      for(var k = 0; k < this.paxDetailsObj.length; k++) { 
        childArr = this.paxDetailsObj[k].children; 
      }
      for(var l = 0; l < this.paxDetailsObj.length; l++) { 
        roomArr = this.paxDetailsObj[l].room_no;
      }
   
      var adultTitle =[];
      for(var t = 0; t < adlutArr.length; t++) { 
        adultTitle.push(adlutArr[t].title);
      }
      var adultFname =[];
      for(var f = 0; f < adlutArr.length; f++) { 
        adultFname.push(adlutArr[f].firstName);
      }
      var adultLname =[];
      for(var ln = 0; ln < adlutArr.length; ln++) { 
        adultLname.push(adlutArr[ln].lastName);
      }
   
      var childTitle =[];
      for(var ct = 0; ct < childArr.length; ct++) { 
        childTitle.push(childArr[ct].title);
      }
      var childFname = [];
      for(var cf = 0; cf < childArr.length; cf++) { 
        childFname.push(childArr[cf].firstName);
      }
      var childLname = [];
      for(var cln = 0; cln < childArr.length; cln++) { 
        childLname.push(childArr[cln].lastName);
      }
  
      this.paxDetails.push({
        room_no:roomArr,
        adult:{title:adultTitle,firstName:adultFname,lastName:adultLname},
        child:{title:childTitle,firstName:childFname,lastName:childLname}});
    }

    console.log('paxDetails arr --> ', this.paxDetails );
      // var adulttitle = [];
      // var adultfirstName = [];
      // var adultlastName = [];
      // var adultDOB = [];
      // var adultgender = [];
      // var issueCountry = [];
      // var passportExpiry = [];
      // var passportNumber = [];
      // for (var i = 0; i < this.adults.length; i++) {
      //   adulttitle.push(this.adults[i].title);
      //   adultfirstName.push(this.adults[i].firstName);
      //   adultlastName.push(this.adults[i].lastName);
      //   adultgender.push(this.adults[i].gender);
      //   adultDOB.push(this.adults[i].dob);
      //   issueCountry.push(this.adults[i].issueCountry);
      //   passportExpiry.push(this.adults[i].passportExpiry);
      //   passportNumber.push(this.adults[i].passportNumber);
      // }
      
      
      // var childttitle = [];
      // var childfirstName = [];
      // var childlastName = [];
      // var childDOB = [];
      // var childgender = [];
      // var childissueCountry = [];
      // var childpassportExpiry = [];
      // var childpassportNumber = [];
      // for (var j = 0; j < this.children.length; j++) {
      //   childttitle.push(this.children[j].title);
      //   childfirstName.push(this.children[j].firstName);
      //   childlastName.push(this.children[j].lastName);
      //   childgender.push(this.children[j].gender);
      //   childDOB.push(this.children[j].dob);
      //   childissueCountry.push(this.children[j].issueCountry);
      //   childpassportExpiry.push(this.children[j].passportExpiry);
      //   childpassportNumber.push(this.children[j].passportNumber);
      // }
      // var infantsTitle = [];
      // var infantsFirstName = [];
      // var infantsLastName = [];
      // var infantsDOB = [];
      // var infantsGender = [];
      // var infantsissueCountry = [];
      // var infantspassportExpiry = [];
      // var infantsdpassportNumber = [];
      // for (var k = 0; k < this.infants.length; k++) {
      //   infantsTitle.push(this.infants[k].title);
      //   infantsFirstName.push(this.infants[k].firstName);
      //   infantsLastName.push(this.infants[k].lastName);
      //   infantsDOB.push(this.infants[k].dob);
      //   infantsGender.push(this.infants[k].gender);
      //   infantsissueCountry.push(this.infants[k].issueCountry);
      //   infantspassportExpiry.push(this.infants[k].passportExpiry);
      //   infantsdpassportNumber.push(this.infants[k].passportNumber);
      // }
  
      // this.gestDetails.push({
      //   adult: {
      //     title: adulttitle,
      //     firstName: adultfirstName,
      //     lastName: adultlastName,
      //     dob: adultDOB,
      //     gender: adultgender,
      //     issueCountry: issueCountry,
      //     passportExpiry: passportExpiry,
      //     passportNumber: passportNumber,
      //   },
      //   child: {
      //     title: childttitle,
      //     firstName: childfirstName,
      //     lastName: childlastName,
      //     dob: childDOB,
      //     gender: childgender,
      //     issueCountry: childissueCountry,
      //     passportExpiry: childpassportExpiry,
      //     passportNumber: childpassportNumber,
      //   },
      //   infants: {
      //     title: infantsTitle,
      //     firstName: infantsFirstName,
      //     lastName: infantsLastName,
      //     dob: infantsDOB,
      //     gender: infantsGender,
      //     issueCountry: infantsissueCountry,
      //     passportExpiry: infantspassportExpiry,
      //     passportNumber: infantsdpassportNumber,
      //   },
      // });
      // console.log("ionViewDidLoad FlightBookingVoucherPage",this.gestDetails);
    }

 
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightHotelBookingVoucherPage');
    //this.flightBook();
  }
 
  getAirlineName(airlineCode) {
    return this.jsonSearchProvider.getAirlineName(airlineCode).AirLineName;
  }
  getAirportDetail(airportCode) {
    return this.jsonSearchProvider.getAirportName(airportCode).City;
  }
  getAirportName(airportCode) {
    return this.jsonSearchProvider.getAirportName(airportCode).AirportName;
  }
  getFareBreakDownDetail(farebreakdown, code) {
    let amount = 0;
    for (let i = 0; i < farebreakdown.length; i++) {
      if (farebreakdown[i].PassengerTypeQuantity.Code == code) {
        // return farebreakdown[i].PassengerFare.EquivFare.Amount;
        amount = farebreakdown[i].PassengerFare.EquivFare.Amount;
        break;
      }
    }
    return amount;
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });

    this.loading.present();
  }

  // flightBook() 
  // {
  //   this.flightProvider.flightBook(
  //       this.user.country_code,
  //       this.user.country_code,
  //       this.gestDetails[0].adult.firstName,
  //       this.gestDetails[0].adult.lastName,
  //       this.gestDetails[0].adult.title,
  //       this.user.emailid,
  //       this.user.mobile,
  //       this.gestDetails[0].adult.dob,
  //       this.gestDetails[0].adult.gender,
  //       this.gestDetails[0].adult.issueCountry,
  //       this.gestDetails[0].adult.passportExpiry,
  //       this.gestDetails[0].adult.passportNumber,
  //       // this.user.FrequentFlyerNumber,
  //      "1",
  //       "0",
  //       "0",
  //       this.gestDetails[0].child.dob,
  //       this.gestDetails[0].child.gender,
  //       this.gestDetails[0].child.title,
  //       this.gestDetails[0].child.firstName,
  //       this.gestDetails[0].child.lastName,
  //       this.gestDetails[0].child.issueCountry,
  //       this.gestDetails[0].child.passportExpiry,
  //       this.gestDetails[0].child.passportNumber,
  //       // this.user.FrequentFlyerNumber,
  //       this.gestDetails[0].infants.dob,
  //       this.gestDetails[0].infants.gender,
  //       this.gestDetails[0].infants.firstName,
  //       this.gestDetails[0].infants.lastName,
  //       this.gestDetails[0].infants.title,
  //       this.gestDetails[0].infants.issueCountry,
  //       this.gestDetails[0].infants.passportExpiry,
  //       this.gestDetails[0].infants.passportNumber,
  //       // this.user.FrequentFlyerNumber,
  //       // "Public",
  //       this.flightInfo.FareItinerary.IsPassportMandatory,
  //       this.flightInfo.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.Baggage,
  //       this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode,
  //       this.user.emailid,this.TXN_AMOUNT,
  //       this.flightInfo.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime).then((data) => {
  //       console.log("flightSearch", data);
  //       this.bookingDetails.push(data);
  //       console.log("fhdfh", this.bookingDetails);
  //       this.loading.dismiss();
  //     })
  //     .catch(err => {
  //       if (err == "Invalid Session Id") {
  //         this.flightProvider.getAuthSession().then(data => {
  //             console.log(data);
  //           })
  //           .catch(err => {
  //             this.loading.dismiss();
  //           });
  //       } else {
  //         this.loading.dismiss();
  //       }
  //     });
  // }

  goBack(){
    this.navCtrl.push(HomePage)
  }



}
