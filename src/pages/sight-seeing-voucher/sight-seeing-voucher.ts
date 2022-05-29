import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { SightSeeingProvider } from '../../providers/sight-seeing/sight-seeing';
import { HomePage } from '../home/home';
import { addres } from '../../providers/constants/constants';

/**
 * Generated class for the SightSeeingVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sight-seeing-voucher',
  templateUrl: 'sight-seeing-voucher.html',
})
export class SightSeeingVoucherPage {
  AdultCount;ChildCount;contactDeatil;tourBook;sightSeeing;sessionId;tourDetail;
  loading;adultsAll;children;paxDetails= {};
  departDate = new Date(); bool= false;addres;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sightSeeingProvider:SightSeeingProvider,
    public loadingCtrl: LoadingController) {
      this.addres = addres;
    this.presentLoading();
    this.AdultCount =  this.navParams.get("AdultCount");
    this.ChildCount =  this.navParams.get("ChildCount");
    this.contactDeatil = this.navParams.get("contactDeatil");
    this.adultsAll =  this.navParams.get("adultsAll");
    this.children =  this.navParams.get("children");
    this.sightSeeing = this.navParams.get("sightSeeing");
    this.tourDetail = this.navParams.get("tourDetail");
    this.sessionId = this.navParams.get("sessionId");
    console.log("paxdetails==",this.adultsAll)
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
    
    var adultDob =[];
    for(var d = 0; d < this.adultsAll.length; d++) { 
      adultDob.push(this.adultsAll[d].age);
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
      childDOB.push(this.children[cd].age);
    }
    

    this.paxDetails = {
      adult:{title:adultTitle,firstName:adultFname,lastName:adultLname},
      child:{title:childTitle,firstName:childFname,lastName:childLname}
    };

      console.log("paxdetails==",this.paxDetails)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SightSeeingVoucherPage');
    this.getTourDetail();
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
  goBack(){
    this.bool = true
    this.navCtrl.push(HomePage)
  }
  

  getTourDetail() {
    let obj = {
      sessionId: this.sessionId.sessionId,
      tokenId: this.sessionId.tokenId,
      clientReference: this.sightSeeing.code,
      leadPassanger: {
        title: this.adultsAll[0].title,
        firstName: this.adultsAll[0].firstName,
        lastName: this.adultsAll[0].lastName,
        email:this.contactDeatil.email,
        address: "wooden garden road",
        zipcode: "000000",
        telephone: this.contactDeatil.mobile_no,
        countryCode: this.contactDeatil.country_code,
    },
    activities:[{
      rateKey:this.tourDetail.activity.options[0].rates[0].rateDetails[0].rateKey,
      answers: [{
        answer:this.tourDetail.activity.options[0].rates[0].rateDetails[0].operationDates[0].from,
        question:this.tourDetail.activity.options[0].questions[0]
      }],
      from:this.tourDetail.activity.options[0].rates[0].rateDetails[0].operationDates[0].from,
      to:this.tourDetail.activity.options[0].rates[0].rateDetails[0].operationDates[0].to,
    }],
      // activities: [
      //   {
      //     rateKey:this.tourDetail.activity.options[0].rates[0].rateDetails[0].rateKey,
      //     from:this.tourDetail,
      //     to:this.tourDetail,
      //     answers:this.tourDetail.activity.options[0].questions
      //   }
      // ],
      paxes: this.paxDetails,
    };
    this.sightSeeingProvider.getSightSeeingBook(obj).then(data => {
     this.loading.dismiss();
     console.log("tsdata",data);
      this.tourBook = data;
      console.log("data",this.tourBook);
    })
    .catch(err => {
      console.log(err);
    });
  }


  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }
}
