import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { BookingInfoProvider } from "../../providers/booking-info/booking-info";

/**
 * Generated class for the MyTransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-my-transactions",
  templateUrl: "my-transactions.html"
})
export class MyTransactionsPage {
  user;
  transactions = [];
  loading;
  isBookingAvailable: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public loginProvider:LoginProvider,
    public bookingInfoProvider:BookingInfoProvider
  ) {
    this.presentLoading();
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyTransactionsPage");
    this.getTransaction();
  }

  goBack() {
    this.navCtrl.pop();
  }

  getTransaction() {
    let jsonObj={
      email:this.user.emailid
    }
    this.bookingInfoProvider
      .getTransactions(jsonObj)
      .then(data => {
        console.log(data);
        this.loading.dismiss();
        if (data.ErrorMessage) {
          this.isBookingAvailable = false;
        } else {
          this.transactions = data;
          console.log("this.transactions", this.transactions);
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
