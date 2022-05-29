import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FlightsProvider } from '../../providers/flights/flights';
import { JsonSearchProvider } from '../../providers/json-search/json-search';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home';
import { addres } from '../../providers/constants/constants';

/**
 * Generated class for the FlightTwoWayVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-two-way-voucher',
  templateUrl: 'flight-two-way-voucher.html',
})
export class FlightTwoWayVoucherPage {
  flightInfo; destinationDetails;
  personDetail; flightClass; destInfo; callBack; adults; children; infants; 
  isPostCode: boolean = false; isAreaCode: boolean = false; isNationality: boolean = false;
  postalCode = ""; areaCode = "";
  isFareRules: boolean = false;
  bool= false;currencys;
  map = {};gestDetails = [];bookingDetails;
  FlightAllMarkup;TXN_AMOUNT;contact;  flightFareRules;

  cityPair: string = "";departDate: Date = new Date();user;loading;FlightAllFix;session_id;fromCity;toCity;ORDER_ID;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    public flightProvider: FlightsProvider, public toastCtrl: ToastController, public loginProvider: LoginProvider,
    public jsonSearchProvider:JsonSearchProvider ) {
     // this.presentLoading();
      this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
      this.flightFareRules = this.navParams.get("flightFareRules");
      console.log("fare",this.flightFareRules);
      this.flightInfo = this.navParams.get("flightInfo");
      this.personDetail = this.navParams.get("personDetail");
      this.flightClass = this.navParams.get("flightClass");
      this.session_id= this.navParams.get("session_id");
      this.fromCity = this.navParams.get("fromCity");
      this.toCity = this.navParams.get("toCity");
      this.currencys = this.navParams.get("currencys");
      this.destinationDetails = this.navParams.get("destinationDetails");
      this.destInfo = this.navParams.get("destInfo");
      this.adults = this.navParams.get("adults");
      this.children = this.navParams.get("children");
      this.infants = this.navParams.get("infants");
      this.callBack = this.navParams.get("callBack");  
      this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
      this.FlightAllFix= this.navParams.get("FlightAllFix");
      this.TXN_AMOUNT = this.navParams.get("TXN_AMOUNT");
      this.contact=addres
      var adulttitle = [];
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
      console.log("ionViewDidLoad FlightBookingVoucherPage",this.gestDetails);
    }
    
    ionViewDidLoad() {
     // this.flightBook();
      console.log("ionViewDidLoad FlightBookingVoucherPage");
    }
    flightBook() {
      let passport: boolean = false;  
      if (this.fromCity.Country == this.toCity.Country){
        passport = false;
      }
      else{
       passport = true;
      }
      let r = String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(16161235679);
      this.ORDER_ID = 'TheWalzTravels'+r
      let obj = {
        "flightBookingInfo": {
            "flight_session_id": this.session_id,
            "fare_source_code": this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode,
            "IsPassportMandatory": passport,
            "fareType": "WebFare",
            "areaCode": "INDIA",
            "countryCode": "91"
        },
        "paxInfo": {
            "clientRef": this.ORDER_ID,
            "customerEmail": this.user.emailid,
            "customerPhone": this.user.mobile,
            "bookingNote": "this is booking note",
            "paxDetails": this.gestDetails
        }
    }
    console.log("mysendobj", JSON.stringify(obj));
      this.flightProvider.getFlightBook(obj).then((data) => {
          console.log("ts-data", data);
          this.bookingDetails=data;
          console.log("flightSearch", this.bookingDetails);
          this.flightBookingDetails();
          this.loading.dismiss();
        })
        .catch(err => {
          console.log("err", err)
            this.loading.dismiss();
        });
    }

    getBaggageInfo(dest){
      return  this.flightFareRules.BaggageInfos.filter(baggage=>{
          return baggage.BaggageInfo.Arrival==dest.ArrivalAirportLocationCode
           && baggage.BaggageInfo.Departure==dest.DepartureAirportLocationCode && 
           baggage.BaggageInfo.FlightNo==dest.MarketingAirlineCode+dest.FlightNumber})
           [0].BaggageInfo.Baggage;
      }
  
  
    flightBookingDetails() {
      console.log("booking", this.bookingDetails.BookFlightResponse.BookFlightResult.UniqueID)
      let obj = {
          "trawexMarkup": 0,
          "markupAmountAgent": 0,
          "markupAmount": this.TXN_AMOUNT,
          "markupAmountAgentToSub": 0,
          "currencyCode": this.currencys.currency,
          "currencyConvert": this.currencys.value,
           "customerId":this.user.id,
           "UniqueID" : this.bookingDetails.BookFlightResponse.BookFlightResult.UniqueID
      }
  
        // "bookByInfo": {
        //   "bookedBy": "Agent",
        //   "agentId": 1,
        //   "parentAgentId": null,
        //   "customerid":    this.user.emailid,
        //   "staffId": 0,
        //   "branchId": 1
        // },
        // "passengerInfo": {
        //   "passengerCount": this.personDetail.adults+this.personDetail.children+this.personDetail.infants,
        //   "emailid": this.user.emailid,
        //   "custAddress": "Address",
        //   "zipCode": "680501",
        //   "city": "city",
        //   "passengers":  this.gestDetails
        // },
        // "bookingInfo": {
        //   "trawexMarkup": this.TXN_AMOUNT,
        //   "markupAmountAgent": 10,
        //   "markupAmount": 10,
        //   "markupAmountAgentToSub": 10,
        //   "servProvider": "aeroapi",
        //   "status": "pending",
        //   "refcode": "wlz54465",
        //   "countryCode": "+91",
        //   "country": "India",
        //   "mobileNo": 8610632556,
        //   "flightSession": "df54s6df46sd5f4sd6f",
        //   "fareType": "WebFare",
        //   "refundable": "No",
        //   "totalFare": 500,
        //   "currencyCode": "USD",
        //   "currencyConvert": "1",
        //   "baseAmount": "200",
        //   "servicetaxAmount": "0",
        //   "totaltaxAmount": "300",
        //   "farebase": "OZ0R",
        //   "pass_type": "ADT<br>CHD<br>INF",
        //   "pass_basefare_amount": "60<br>40<br>10",
        //   "pass_tax_amount": "60<br>40<br>10",
        //   "pass_servicetax_amount": "60<br>40<br>10",
        //   "pass_totalfare_amount": "60<br>40<br>10",
        //   "pass_quantity": "1<br>1<br>1",
        //   "directionInd": "Return",
        //   "is_passport_mandatory": "false",
        //   "arrival_airportcode": "BLR",
        //   "ArrivalDateTime": "2021-06-13T15:28:00<br>2021-06-13T18:53:00",
        //   "CabinClassCode": "F<br>C",
        //   "CabinClassText": "",
        //   "departure_airportcode": "DFW<br>IAH",
        //   "DepartureDateTime": "2021-06-13T14:15:00<br>2021-06-13T17:07:00",
        //   "FlightNumber": "6095<br>291",
        //   "JourneyDuration": "73<br>166",
        //   "OperatingAirline_Code": "EY<br>EY",
        //   "OperatingAirline_Equipment": "",
        //   "OperatingAirline_FlightNumber": "217<br>5416",
        //   "arrival_airportcode_return": "AUH<br>BLR",
        //   "ArrivalDateTime_return": "2021-08-13T23:50:00<br>2021-08-14T07:00:00",
        //   "CabinClassCode_return": "M<br>M",
        //   "CabinClassText_return": "",
        //   "departure_airportcode_return": "XNB<br>AUH",
        //   "DepartureDateTime_return": "2021-08-13T22:30:00<br>2021-08-14T01:40:00",
        //   "Eticket_return": "1<br>1",
        //   "FlightNumber_return": "5427<br>236",
        //   "JourneyDuration_return": "80<br>230",
        //   "OperatingAirline_Code_return": "EY<br>EY",
        //   "OperatingAirline_Equipment_return": "",
        //   "OperatingAirline_FlightNumber_return": "5427<br>236",
        //   "Stop_Duration_return": "",
        //   "Stop_Duration": "",
        //   "Eticket": "1<br>1",
        //   "airport_from": "Bangalore, BLR, India",
        //   "airport_to": "Dubai, DXB, UAE",
        //   "departure_date": "2021-08-12",
        //   "return_date": "2021-08-13",
        //   "journey_type": "R",
        //   "adult_flight": "1",
        //   "child_flight": "0",
        //   "infant_flight": "0",
        //   "class": "Y",
        //   "success": "",
        //   "target": "",
        //   "TktTimeLimit": "",
        //   "UniqueID": "",
        //   "ticket_message": "",
        //   "PassengerType": "",
        //   "ItemRPH": "",
        //   "eTicketNumber": "",
        //   "UniqueID_return": "",
        //   "ticket_message_return": "",
        //   "status_return": "",
        //   "request_file": "",
        //   "response_file": "",
        //   "AirSegment_Key": "",
        //   "AirSegment_Group": "",
        //   "Carrier": "",
        //   "SupplierLocatorCode": "",
        //   "SupplierCode": "",
        //   "transaction_id": "",
        //   "AirReservation_LocatorCode": "",
        //   "AirPricingInfo_Key": "",
        //   "wheel_chair": "",
        //   "net_price": "",
        //   "airline_UniqueID": "",
        //   "extra_service_tax_price": "",
        //   "OtherCharges": "",
        //   "baggage": "0 KG<br>0 KG<br>30 KG<br>30 KG",
        //   "extra_baggage_amount": "",
        //   "meal_request": "",
        //   "mail_sent": ""
        // }
      
    console.log("mysendobj", JSON.stringify(obj));
      this.flightProvider.getFlightBookingDetails(obj).then((data) => {
          console.log("flightSearch", data);
         // this.bookingDetails.push(data);
         //this.loading.dismiss();
        })
        .catch(err => {
          console.log("err", err)
            this.loading.dismiss();
        });
    }

  ionViewCanLeave() {
    return this.bool;
  }
  goBack(){
    this.bool = true
    this.navCtrl.push(HomePage)
  }
  
  roundOff(amount){
    var num = parseFloat(amount);
    var round = num+this.FlightAllMarkup.b2c
    var n = round.toFixed(2);
    return n
  }

  roundOffPer(amount){
    var num = parseFloat(amount);
    var round = (num*this.FlightAllMarkup.b2c/100)+num;
    var n = round.toFixed(2);
    return n
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
}
