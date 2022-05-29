import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { HotelsProvider } from "../../providers/hotels/hotels";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { HOTEL_IP_ADDRESS,USER_ID,USER_PASSWORD,ACCESS,addres } from '../../providers/constants/constants';
import { HomePage } from '../home/home';

/**
 * Generated class for the HotelBookingVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-hotel-booking-voucher",
  templateUrl: "hotel-booking-voucher.html",
})

export class HotelBookingVoucherPage {
  selectedOption;hotelContentDetail; rooms; roomDetails; totalAdultCount; totalChildCount; user;  hotelDetail;
  guestDetails;totalPrice;loading;ORDER_ID;hotelAllMarkup;HotelFix;fixMarkUpAmount;
  checkInDate = new Date();checkoutDate = new Date();departDate = new Date();
  sessionId;getNightStayDays;contactDeatil;paxDetailsObj =[];paxDetails=[];roomBook=[];bookingDetails = [];
  bool= false;addres;
  constructor( public navCtrl: NavController,  public navParams: NavParams,public loginProvider: LoginProvider,
    public hotelProvider: HotelsProvider, public loadingCtrl: LoadingController ) {
    this.presentLoading();
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.addres = addres;
    this.rooms = this.navParams.get("rooms");
    this.checkInDate = this.navParams.get("checkInDate");
    this.checkoutDate = this.navParams.get("checkoutDate");
    this.roomDetails = this.navParams.get("roomDetails");
    this.selectedOption = this.navParams.get("selectedOption");
    this.hotelContentDetail = this.navParams.get("hotelContentDetail");
    this.totalAdultCount = this.navParams.get("totalAdultCount");
    this.totalChildCount = this.navParams.get("totalChildCount");
    this.guestDetails = this.navParams.get("guestDetails");
    this.contactDeatil = this.navParams.get("contactDeatil");
    this.totalPrice = this.navParams.get("totalPrice");
    this.hotelDetail = this.navParams.get("hotelDetail");
    this.sessionId = this.navParams.get("sessionId");
    this.getNightStayDays = this.navParams.get("getNightStayDays");
    this.ORDER_ID = this.navParams.get("ORDER_ID");
    this.hotelAllMarkup = this.navParams.get("hotelAllMarkup");
    this.HotelFix  = this.navParams.get("HotelFix");
    this.fixMarkUpAmount = this.navParams.get("fixMarkUpAmount");
    console.log('adult arr -->', this.ORDER_ID );
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
   
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HotelBookingVoucherPage");
     this.doneBooking();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });
    this.loading.present();
  }

  doneBooking() {
    let jsonObj = {
      sessionId: this.sessionId,
      productId: this.hotelDetail.productId,
      tokenId: this.hotelDetail.tokenId,
      rateBasisId: this.selectedOption.rateBasisId,
      clientRef: this.ORDER_ID,
      customerEmail: this.contactDeatil.email,
      customerPhone: this.contactDeatil.mobile_no,
      bookingNote: "Remark",
      paxDetails: this.paxDetails
    };
    console.log(jsonObj);
    this.hotelProvider.getBooking(jsonObj).then((data) => {
      this.loading.dismiss();
        console.log(data);
      this.roomBook.push(data);
      this.doneBookingInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  
  
  doneBookingInfo() {
    let jsonObj = {
      user_id: USER_ID,
      user_password:USER_PASSWORD,
      ip_address: HOTEL_IP_ADDRESS,
      access: ACCESS,
      passanger_email: this.contactDeatil.email,
      title: this.guestDetails[0].adults[0].title,
      first_name: this.guestDetails[0].adults[0].firstName,
      last_name: this.guestDetails[0].adults[0].lastName,
      status: this.roomBook[0].status,
      travel_date:this.roomBook[0].roomBookDetails.checkIn,
      countrycode:this.contactDeatil.country_code,
      mobile_no:this.contactDeatil.mobile_no,
      city:this.hotelContentDetail[0].city,
      state:this.hotelContentDetail[0].country,
      zipcode:this.hotelContentDetail[0].postalCode,
      markupAmount:this.fixMarkUpAmount,
      sale_Amount:this.selectedOption.netPrice,
      noOf_days:this.getNightStayDays,
      adult_count: this.totalAdultCount,
      child_count:this.totalChildCount,
      cust_name:this.guestDetails[0].adults[0].firstName + this.guestDetails[0].adults[0].lastName,
      country:this.hotelContentDetail[0].country,
      hotelCode:this.hotelContentDetail[0].hotelId,
      hotelName: this.hotelContentDetail[0].name,
      room_description: this.selectedOption.roomType,
      boardBasis: this.selectedOption.boardType,
      cancellation_policy: this.selectedOption.cancellationPolicy,
      address: this.hotelContentDetail[0].city,
      org_cin:this.roomBook[0].roomBookDetails.checkIn,
      org_cout:  this.roomBook[0].roomBookDetails.checkOut,
      room_count:this.rooms.length,
      refcode:this.ORDER_ID,
      customer_id:this.contactDeatil.email,
      paxDetails:this.paxDetails,
      supplierConfirmationNum: this.roomBook[0].supplierConfirmationNum
    };
    console.log(jsonObj);
    this.hotelProvider.getBookingInfo(jsonObj).then((data) => {
      this.loading.dismiss();
      console.log("flightSearch", data);
        this.bookingDetails.push(data);
        console.log("fhdfh", this.bookingDetails)
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
    this.bool = true
    this.navCtrl.push(HomePage)
  }
  
  goToSomethingWentWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
}
