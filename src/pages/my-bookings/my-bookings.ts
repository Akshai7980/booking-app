import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Events
} from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { BookingInfoProvider } from "../../providers/booking-info/booking-info";
import { FlightBookingVoucherPage } from "../flight-booking-voucher/flight-booking-voucher";
import { HotelBookingVoucherPage } from "../hotel-booking-voucher/hotel-booking-voucher";

/**
 * Generated class for the MyBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-my-bookings",
  templateUrl: "my-bookings.html"
})
export class MyBookingsPage {
  user;
  bookings = [];
  loading;
  isBookingAvailable: boolean = true;
  isGoBack:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public loginProvider:LoginProvider,
    public events:Events,
    public bookingInfoProvider:BookingInfoProvider
  ) {
    this.isGoBack = this.navParams.get("isGoBack");
    this.presentLoading();
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    console.log(this.user);
    this.events.subscribe("bookingStatus", bookingId => {
      console.log(bookingId, this.bookings);
      if (this.bookings.length > 0) {
        console.log(
          this.bookings.filter(booking => {
            return booking.booking_id == bookingId;
          })[0].status
        );
        this.bookings.filter(booking => {
          return booking.booking_id == bookingId;
        })[0].status = "Cancelled";
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyBookingsPage");
    this.getMyBookings();
  }

  goBack() {
    this.navCtrl.pop();
  }

  getDateFormat(date) {
    return date.trim().replace(" ", "T");
    // console.log(date)
    // return new Date(date)
  }

  bookInfo(booking) {
    if(booking.module=='hotel'){
      this.navCtrl.push(HotelBookingVoucherPage, { booking: booking });
    }else{
      this.navCtrl.push(FlightBookingVoucherPage, { booking: booking });
    }
  }

  getMyBookings() {
    let jsonObj={
      customer_id:this.user.emailid
    }
    this.bookingInfoProvider
      .getMyBookings(jsonObj)
      .then(data => {
        console.log(data);
        this.loading.dismiss();
        if (data.ErrorMessage) {
          this.isBookingAvailable = false;
        } else {
          this.bookings = data;
          this.isBookingAvailable = true;
        }
      })
      .catch(err => {
        console.log(err);
        this.loading.dismiss();
        this.isBookingAvailable = false;
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
