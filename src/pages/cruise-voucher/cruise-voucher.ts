import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { LoginProvider } from '../../providers/login/login';
import { CruiseProvider } from '../../providers/cruise/cruise';
import { HomePage } from '../home/home';


/**
 * Generated class for the CruiseVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruise-voucher',
  templateUrl: 'cruise-voucher.html',
})
export class CruiseVoucherPage {
  contactDeatil;AdultCount;ChildCount;
  loading;cruiseCabin;cruiseDetails;adultsAll;children;paxDetails= {};
  departDate = new Date();currencys;cruiseAllMarkup;cruiseAllFix;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cruiseProvider: CruiseProvider,
    public loadingCtrl: LoadingController, public  loginProvider: LoginProvider) {
    this.presentLoading();
    this.contactDeatil = this.navParams.get("contactDeatil");
    this.AdultCount =  this.navParams.get("AdultCount");
    this.ChildCount =  this.navParams.get("ChildCount");
    this.adultsAll =  this.navParams.get("adultsAll");
    this.children =  this.navParams.get("children");
    this.cruiseCabin = this.navParams.get("cruiseCabin");
    this.cruiseDetails = this.navParams.get("cruiseDetails");
    this.currencys = this.navParams.get("currencys");
    this.cruiseAllMarkup = this.navParams.get("cruiseAllMarkup");
    this.cruiseAllFix = this.navParams.get("cruiseAllFix");
    var adultTitle =[];
    for(var t = 0; t < this.adultsAll.length; t++) { 
      adultTitle.push(this.adultsAll[t].title);
    }
    var adultFname =[];
    for(var f = 0; f < this.adultsAll.length; f++) { 
      adultFname.push(this.adultsAll[f].firstName);
    }
    var adultLname =[];
    for(var ln = 0; ln < this.adultsAll.length; ln++) { 
      adultLname.push(this.adultsAll[ln].lastName);
    }
    var adultMeal =[];
    for(var m = 0; m < this.adultsAll.length; m++) { 
      adultMeal.push(this.adultsAll[m].meal);
    }
    var adultDob =[];
    for(var d = 0; d < this.adultsAll.length; d++) { 
      adultDob.push(this.adultsAll[d].dob);
    }
    var childTitle =[];
    for(var ct = 0; ct < this.children.length; ct++) { 
      childTitle.push(this.children[ct].title);
    }
    var childFname = [];
    for(var cf = 0; cf < this.children.length; cf++) { 
      childFname.push(this.children[cf].firstName);
    }
    var childLname = [];
    for(var cln = 0; cln < this.children.length; cln++) { 
      childLname.push(this.children[cln].lastName);
    }
    var childDOB = [];
    for(var cd = 0; cd < this.children.length; cd++) { 
      childDOB.push(this.children[cd].dob);
    }
    var childMeal = [];
    for(var cm = 0; cm < this.children.length; cm++) { 
      childMeal.push(this.children[cm].meal);
    }

    this.paxDetails = {
      adult:{title:adultTitle,firstName:adultFname,lastName:adultLname,dob:adultDob,meal:adultMeal},
      child:{title:childTitle,firstName:childFname,lastName:childLname,dob:childDOB,meal:childMeal}
    };

      console.log("paxdetails==",this.paxDetails)
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CruiseVoucherPage');
    this.doneBooking();
  }

  doneBooking() {
    let jsonObj = {
      user_id: "mobileApi234",
      user_password: "mobileapppwd429",
      access: "Test",
      ip_address: "106.51.139.16",
      cruise_name: this.cruiseDetails[0].operator_title,
      embark_at: this.cruiseDetails[0].fly_in,
      disembark_at: this.cruiseDetails[0].fly_out,
      cruise_nights: this.cruiseDetails[0].cruise_nights,
      logo: this.cruiseDetails[0].ship_operator_logo,
      sailing_date: this.cruiseDetails[0].starts_on,
      adult_count: this.AdultCount.adults,
      child_count: this.ChildCount.childs,
      pre_cruise: "0",
      post_cruise: this.cruiseDetails[0].post_cruise,
      cabin_type: this.cruiseCabin.cabin_type,
      price: this.cruiseCabin.price_per_person,
      area_code: this.contactDeatil.country_code,
      enq_phone: this.contactDeatil.mobile_no,
      landline: this.contactDeatil.landline,
      region: this.cruiseDetails[0].region,
      email: this.contactDeatil.email,
      message: this.contactDeatil.message,
      address: this.contactDeatil.address,
      // city:this.contactDeatil.city,
      // state: this.contactDeatil.state,
      to_currency_place: this.cruiseDetails[0].currency,
      currencyconvert: "1.1",
      paxDetails: this.paxDetails
    };
    console.log(jsonObj);
    this.cruiseProvider.getCruiseBook(jsonObj).then((data) => {
      this.loading.dismiss();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
  goBack(){
    this.navCtrl.push(HomePage)
  }
 

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }

}
