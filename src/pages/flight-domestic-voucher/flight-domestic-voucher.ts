import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FlightsProvider } from '../../providers/flights/flights';
import { JsonSearchProvider } from '../../providers/json-search/json-search';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home';



/**
 * Generated class for the FlightDomesticVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-domestic-voucher',
  templateUrl: 'flight-domestic-voucher.html',
})
export class FlightDomesticVoucherPage {
  destinationDetails;totalFareOne;totalFareTwo;totalBaseFare;totalTaxFare;flightInfoOneAll;flightInfoTwoAll;
  flightInfoTraveller;flightInfoTwo;flightInfoOne;
  personDetail; flightClass; destInfo; callBack; adults; children; infants; 
  isPostCode: boolean = false; isAreaCode: boolean = false; isNationality: boolean = false;
  postalCode = ""; areaCode = "";
  isFareRules: boolean = false;
  bool= false;
  cityPair: string = "";departDate: Date = new Date();user;fixMarkUpAmount;
  gestDetails = [];bookingDetails;loading;FlightAllMarkup;FlightAllFix;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    public flightProvider: FlightsProvider, public toastCtrl: ToastController, public loginProvider: LoginProvider,
    public jsonSearchProvider:JsonSearchProvider ) {
      this.presentLoading();
      this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
      this.flightInfoOneAll = this.navParams.get("flightInfoOneAll"),
      this.flightInfoTwoAll = this.navParams.get("flightInfoTwoAll"),
      this.flightInfoTwo = this.navParams.get("flightInfoTwo"),
      this.flightInfoOne = this.navParams.get("flightInfoOne"),
      this.totalFareOne = this.navParams.get("totalFareOne");
      this.totalFareTwo= this.navParams.get("totalFareTwo");
      this.totalBaseFare= this.navParams.get("totalBaseFare");
      this.totalTaxFare= this.navParams.get("totalTaxFare");
      this.personDetail = this.navParams.get("personDetail");
      this.flightClass = this.navParams.get("flightClass");
      this.destinationDetails = this.navParams.get("destinationDetails");
      this.destInfo = this.navParams.get("destInfo");
      this.adults = this.navParams.get("adults");
      this.children = this.navParams.get("children");
      this.infants = this.navParams.get("infants");
      this.callBack = this.navParams.get("callBack"); 
      this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
      this.FlightAllFix = this.navParams.get("FlightAllFix");
      this.fixMarkUpAmount = this.navParams.get("fixMarkUpAmount");
      var adulttitle  = [];
      var adultfirstName = [];
      var adultlastName = [];
      var adultDOB = [];
      var adultgender = [];
      var issueCountry = [];
      var passportExpiry = [];
      var passportNumber = [];
      for (var i = 0; i < this.adults.length; i++) {
        adulttitle.push(this.adults[i].title);
        adultfirstName.push(this.adults[i].firstName);
        adultlastName.push(this.adults[i].lastName);
        adultgender.push(this.adults[i].gender);
        adultDOB.push(this.adults[i].dob);
        issueCountry.push(this.adults[i].issueCountry);
        passportExpiry.push(this.adults[i].passportExpiry);
        passportNumber.push(this.adults[i].passportNumber);
      }
      
      
      var childttitle = [];
      var childfirstName = [];
      var childlastName = [];
      var childDOB = [];
      var childgender = [];
      var childissueCountry = [];
      var childpassportExpiry = [];
      var childpassportNumber = [];
      for (var j = 0; j < this.children.length; j++) {
        childttitle.push(this.children[j].title);
        childfirstName.push(this.children[j].firstName);
        childlastName.push(this.children[j].lastName);
        childgender.push(this.children[j].gender);
        childDOB.push(this.children[j].dob);
        childissueCountry.push(this.children[j].issueCountry);
        childpassportExpiry.push(this.children[j].passportExpiry);
        childpassportNumber.push(this.children[j].passportNumber);
      }
      var infantsTitle = [];
      var infantsFirstName = [];
      var infantsLastName = [];
      var infantsDOB = [];
      var infantsGender = [];
      var infantsissueCountry = [];
      var infantspassportExpiry = [];
      var infantsdpassportNumber = [];
      for (var k = 0; k < this.infants.length; k++) {
        infantsTitle.push(this.infants[k].title);
        infantsFirstName.push(this.infants[k].firstName);
        infantsLastName.push(this.infants[k].lastName);
        infantsDOB.push(this.infants[k].dob);
        infantsGender.push(this.infants[k].gender);
        infantsissueCountry.push(this.infants[k].issueCountry);
        infantspassportExpiry.push(this.infants[k].passportExpiry);
        infantsdpassportNumber.push(this.infants[k].passportNumber);
      }
  
      this.gestDetails.push({
        adult: {
          title: adulttitle,
          firstName: adultfirstName,
          lastName: adultlastName,
          dob: adultDOB,
          gender: adultgender,
          issueCountry: issueCountry,
          passportExpiry: passportExpiry,
          passportNumber: passportNumber,
        },
        child: {
          title: childttitle,
          firstName: childfirstName,
          lastName: childlastName,
          dob: childDOB,
          gender: childgender,
          issueCountry: childissueCountry,
          passportExpiry: childpassportExpiry,
          passportNumber: childpassportNumber,
        },
        infants: {
          title: infantsTitle,
          firstName: infantsFirstName,
          lastName: infantsLastName,
          dob: infantsDOB,
          gender: infantsGender,
          issueCountry: infantsissueCountry,
          passportExpiry: infantspassportExpiry,
          passportNumber: infantsdpassportNumber,
        },
      });
      console.log("gestDetails",this.gestDetails);
    }
    
    

  ionViewDidLoad() {
    // this.flightBook();
    
  }
  

 
  // flightBook() 
  // {
  //   this.flightProvider.flightRDBook(
  //       this.user.country_code,
  //       this.user.country_code,
  //       this.gestDetails[0].adult.firstName,
  //       this.gestDetails[0].adult.lastName,
  //       this.gestDetails[0].adult.title,
  //       this.user.emailid,
  //       this.user.mobile,
  //       this.gestDetails[0].adult.dob,
  //       this.gestDetails[0].adult.gender,
  //       // this.gestDetails[0].adult.issueCountry,
  //       // this.gestDetails[0].adult.passportExpiry,
  //       // this.gestDetails[0].adult.passportNumber,
  //       // this.user.FrequentFlyerNumber,
  //       this.personDetail.adults,
  //       this.personDetail.children,
  //       this.personDetail.infants,
  //       this.gestDetails[0].child.dob,
  //       this.gestDetails[0].child.gender,
  //       this.gestDetails[0].child.title,
  //       this.gestDetails[0].child.firstName,
  //       this.gestDetails[0].child.lastName,
  //       // this.gestDetails[0].child.issueCountry,
  //       // this.gestDetails[0].child.passportExpiry,
  //       // this.gestDetails[0].child.passportNumber,
  //       // this.user.FrequentFlyerNumber,
  //       this.gestDetails[0].infants.dob,
  //       this.gestDetails[0].infants.gender,
  //       this.gestDetails[0].infants.firstName,
  //       this.gestDetails[0].infants.lastName,
  //       this.gestDetails[0].infants.title,
  //       // this.gestDetails[0].infants.issueCountry,
  //       // this.gestDetails[0].infants.passportExpiry,
  //       // this.gestDetails[0].infants.passportNumber,
  //       // this.user.FrequentFlyerNumber,
  //       // "Public",
  //       this.flightInfoOneAll.FareItinerary.IsPassportMandatory,
  //       this.flightInfoOneAll.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.Baggage,
  //       this.flightInfoOneAll.FareItinerary.AirItineraryFareInfo.FareSourceCode,
  //       this.flightInfoTwoAll.FareItinerary.AirItineraryFareInfo.FareSourceCode,
  //       this.user.emailid,this.fixMarkUpAmount, 
  //       this.flightInfoOneAll.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[0].FlightSegment.DepartureDateTime).then((data) => {
  //       console.log("flightSearch", data);
  //       this.bookingDetails = data;
  //       console.log("fhdfh", this.bookingDetails)
  //       this.loading.dismiss();
  //       }).catch(err => {
  //       if (err == "Invalid Session Id") {
  //         this.flightProvider.getAuthSession().then(data => {
  //             console.log(data);
  //             this.loading.dismiss();
  //           })
  //           .catch(err => {
  //             console.log(err);
  //             this.loading.dismiss();
  //           });
  //       }
  //     });
  // }

  ionViewCanLeave() {
    return this.bool;
  }
  goBack(){
    this.bool = true
    this.navCtrl.push(HomePage)
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });

    this.loading.present();
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
        amount = parseInt(farebreakdown[i].PassengerFare.EquivFare.Amount); 
        break;
      }
    }
    return amount;
  }
  getFareBreakDownDetailD(farebreakdown, code) {
    let amount = 0;
    for (let i = 0; i < farebreakdown.length; i++) {
      if (farebreakdown[i].PassengerTypeQuantity.Code == code) {
        // return farebreakdown[i].PassengerFare.EquivFare.Amount;
        amount = parseInt(farebreakdown[i].PassengerFare.EquivFare.Amount); 
        break;
      }
    }
    return amount;
  }
}
