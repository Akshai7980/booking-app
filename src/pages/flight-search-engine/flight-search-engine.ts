import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams,ActionSheetController, ModalController, ToastController ,Slides} from "ionic-angular";
import { AddFlightTravellersComponent } from "../../components/add-flight-travellers/add-flight-travellers";
import { AirportSearchPage } from "../airport-search/airport-search";
import { FlightSearchResultsPage } from "../flight-search-results/flight-search-results";
import { FlightSearchTwoWayResultsPage } from "../flight-search-two-way-results/flight-search-two-way-results";
import { FlightSearchMultiWayResultsPage } from "../flight-search-multi-way-results/flight-search-multi-way-results";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import { FlightsProvider } from '../../providers/flights/flights';
import { addres } from '../../providers/constants/constants';

/**
 * Generated class for the FlightSearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-flight-search-engine",
  templateUrl: "flight-search-engine.html"
})
export class FlightSearchEnginePage {
  @ViewChild('imageSlide') imageSlide: Slides;
  flightWay = 1;
  fromCity = {
    id: "871",
    AirportCode: "BOM",
    AirportName: "Chhatrapati Shivaji International Airport",
    City: "Mumbai",
    Country: "India"
  };
  toCity = {
    id: "801",
    AirportCode: "BLR",
    AirportName: "Bengaluru International Airport",
    City: "Bangalore",
    Country: "India"
  };
  destinationDetail = [
    {
      from: {
        id: "871",
        AirportCode: "BOM",
        AirportName: "Chhatrapati Shivaji International Airport",
        City: "Mumbai",
        Country: "India"
      },
      to: {
        id: "801",
        AirportCode: "BLR",
        AirportName: "Bengaluru International Airport",
        City: "Bangalore",
        Country: "India"
      },
      date: new Date()
    }
  ];
  personDetail = {  adults: 1,  children: 0,  infants: 0 };
  flightClass = "Economy";
  departDate: Date = new Date();returnDate: Date = new Date();dept; totalTravellers = 0;
  currency; currencys =[];dest;rowNumber = 0; paytm : any;  superOffers; FlightAllMarkup;flightMarkup;FlightAllFix;addres;
  constructor( public navCtrl: NavController,public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,public toastCtrl: ToastController,
    public jsonSearchProvider:JsonSearchProvider, public flightProvider:FlightsProvider) {
    this.addres=addres;
    this.totalTravellers = this.personDetail.adults + this.personDetail.children + this.personDetail.infants;
    this.currency =this.navParams.get("currency");
    this.superOffers = this.navParams.get("superOffers");
    console.log("ionViewDidLoad ",this.superOffers);
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FlightSearchEnginePage");
    this.getmarkp();
    this.getcurrency();
  }
  
  getcurrency(){
    this.flightProvider.getcurrency(this.currency).then(data=>{
      console.log(data);
      this.currencys = data;
    }).catch(err=>{
      console.log(err)
    })
  } 

  getmarkp(){
    this.flightProvider.getMarkup().then((data) => {
    this.flightMarkup = data;
    var objmarkup = {
      dest: this.flightMarkup.fli_dest[0] == null ? 0 : parseInt(this.flightMarkup.fli_dest[0].markup),
      fare: this.flightMarkup.fli_fare[0] == null ? 0 : parseInt(this.flightMarkup.fli_fare[0].markup),
      date: this.flightMarkup.fli_date[0] == null ? 0 : parseInt(this.flightMarkup.fli_date[0].markup),
      star: this.flightMarkup.fli_air[0] == null ? 0 : parseInt(this.flightMarkup.fli_air[0].markup),
      b2c: this.flightMarkup.b2c_markup[0] == null ? 0 : parseInt(this.flightMarkup.b2c_markup[0].markup)
    };
    this.FlightAllMarkup = objmarkup
    console.log(this.FlightAllMarkup);
    var objFix = {
      dest: this.flightMarkup.fli_dest[0] == null ? 0 : parseInt(this.flightMarkup.fli_dest[0].fix),
      fare: this.flightMarkup.fli_fare[0] == null ? 0 : parseInt(this.flightMarkup.fli_fare[0].fix),
      date: this.flightMarkup.fli_date[0] == null ? 0 : parseInt(this.flightMarkup.fli_date[0].fix),
      star: this.flightMarkup.fli_air[0] == null ? 0 : parseInt(this.flightMarkup.fli_air[0].fix),
      b2c: this.flightMarkup.b2c_markup[0] == null ? 0 : parseInt(this.flightMarkup.b2c_markup[0].fix)
    };
    this.FlightAllFix = objFix
    console.log(this.FlightAllFix);
    console.log(this.flightMarkup);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  openCalendar() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Select Dates',
      defaultScrollTo:  new Date(year, month + 1, day),
      closeLabel: '',
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      console.log(date);
      if(date){
        this.departDate = date.from.dateObj;
        this.returnDate = date.to.dateObj;
      }
      else {
        myCalendar.onDidDismiss
        
       }
      console.log(type);
    });
  }

  opensingleCalendar() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const options: CalendarModalOptions = {
      title: 'Select Dates',
      defaultScrollTo:  new Date(year, month + 1, day),
      closeLabel: '',
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      console.log(date);
      if(date){
        this.departDate = date.dateObj;
      }
      else {
        myCalendar.onDidDismiss
       }
      console.log(type);
    });
  }

  selectJourneyDate(i)  {
    this.destinationDetail[i].date.setDate(this.destinationDetail[i].date.getDate()+1);
   // date: this.destinationDetail[i].date || this.destinationDetail[i - 1].date,
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const options: CalendarModalOptions = {
      title: 'Select Dates',
      defaultScrollTo:  new Date(year, month + 1, day),
      closeLabel: '',
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      console.log(date);
      if(date){
        this.destinationDetail[i].date = date.dateObj;
      }
      else {
        myCalendar.onDidDismiss
        
       }
      console.log(type);
    });
  }
  
  goBack() {
    this.navCtrl.pop();
  }
  selectedButton(selected) {
    this.flightWay = selected;
    console.log(this.flightWay);
    if (this.flightWay == 2) {
      this.returnDate = this.departDate
    }
  }
  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  classSelection() {
    const actionSheet  = this.actionSheetCtrl.create({
    title: 'CABIN CLASS',
    buttons: [
      {text: 'Economy',role: 'Economy',
        handler: () => {this.flightClass = "Economy"}
      },{text: 'Business',role: 'Business',
        handler: () => {this.flightClass = "Business"}
      },{text: 'First Class', role: 'First',
        handler: () => {this.flightClass = "First"}
      },
      {text: 'Premium Economy', role: 'Premium',
        handler: () => {this.flightClass = "Premium"}
      }]
  });
  actionSheet.present();
  } 

  travellerSelection() {
    let travellersModal = this.modalCtrl.create(
      AddFlightTravellersComponent,
      {
        adults: this.personDetail.adults,
        children: this.personDetail.children,
        infants: this.personDetail.infants
      },
      { cssClass: "flightAddTraveller" }
    );
    travellersModal.present();
    travellersModal.onDidDismiss(data => {
      if (data) {
        this.personDetail.adults = data.adults;
        this.personDetail.children = data.children;
        this.personDetail.infants = data.infants;
        this.totalTravellers =this.personDetail.adults + this.personDetail.children + this.personDetail.infants;
      }
      console.log(data);
    });
  }

  swap(event) {
    event.stopPropagation();
    let temp = JSON.parse(JSON.stringify(this.fromCity));
    this.fromCity = JSON.parse(JSON.stringify(this.toCity));
    this.toCity = temp;
  }
  swapround(event) {
    event.stopPropagation();
    let temp = JSON.parse(JSON.stringify(this.destinationDetail[this.rowNumber].from));
    this.destinationDetail[this.rowNumber].from = JSON.parse(JSON.stringify(this.destinationDetail[this.rowNumber].to));
    this.destinationDetail[this.rowNumber].to = temp;
  }

  addRow() {
    if (this.destinationDetail.length < 5) {
      this.destinationDetail.push({
        from: this.destinationDetail[this.destinationDetail.length - 1].to,
        to: this.destinationDetail[this.destinationDetail.length - 1].from,
        date: this.destinationDetail[this.destinationDetail.length - 1].date
      });
    }
  }

  removeRow() {
    if (this.destinationDetail.length > 1) {
      this.destinationDetail.pop();
    }
  }

  getFromAirport() {
    this.dest = "from";
    this.navCtrl.push(AirportSearchPage, { callback: this.getData });
  }

  getToAirport() {
    this.dest = "to";
    this.navCtrl.push(AirportSearchPage, { callback: this.getData });
  }

  getFromMultiAirport(i) {
    this.dest = "from";
    this.rowNumber = i;
    this.navCtrl.push(AirportSearchPage, { callback: this.getData });
  }

  getToMultyAirport(i) {
    this.dest = "to";
    this.rowNumber = i;
    this.navCtrl.push(AirportSearchPage, { callback: this.getData });
  }

  
  getData = data => {
    return new Promise<void>((resolve, reject) => {
      console.log("this.flightWay", this.flightWay);
      if (this.flightWay == 3) {
        console.log(this.flightWay, "3");
        if (this.dest == "from") {
          this.destinationDetail[this.rowNumber].from = data;
        } else {
          this.destinationDetail[this.rowNumber].to = data;
        }
      } else {
        console.log(this.flightWay);
        if (this.dest == "from") {
          this.fromCity = data;
        } else {
          this.toCity = data;
        }
      }

      console.log(data);
      resolve();
    });
  };


  searchFlights() {
    if (this.flightWay == 1) {
      this.navCtrl.push(FlightSearchResultsPage, {
        fromCity: this.fromCity,
        toCity: this.toCity,
        departDate: this.departDate,
        returnDate: this.returnDate,
        personDetail: this.personDetail,
        flightClass: this.flightClass,
        FlightAllMarkup: this.FlightAllMarkup,
        FlightAllFix:this.FlightAllFix,
        currencys: this.currencys
      });
    } else if (this.flightWay == 2) {
      this.navCtrl.push(FlightSearchTwoWayResultsPage, {
        fromCity: this.fromCity,
        toCity: this.toCity,
        departDate: this.departDate,
        returnDate: this.returnDate,
        personDetail: this.personDetail,
        flightClass: this.flightClass,
        FlightAllMarkup: this.FlightAllMarkup,
        FlightAllFix:this.FlightAllFix,
        currencys: this.currencys
      });
    } else {
      if (this.destinationDetail.length > 1) {
        this.navCtrl.push(FlightSearchMultiWayResultsPage, {
          destinationDetails: this.destinationDetail,
          personDetail: this.personDetail,
          flightClass: this.flightClass,
          FlightAllMarkup: this.FlightAllMarkup,
          FlightAllFix:this.FlightAllFix,
          currencys: this.currencys
        });
      } else {
        this.presentToast("Atleast 2 routes has to be selected.");
      }
    }
  }

}


