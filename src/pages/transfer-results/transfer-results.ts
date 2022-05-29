import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { TransferProvider } from "../../providers/transfer/transfer";
import { TRANSFER_IMAGE_BASE } from "../../providers/constants/constants";
import { TransferDetailPage } from "../transfer-detail/transfer-detail";
import { NoResultPage } from "../no-result/no-result";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";

/**
 * Generated class for the TransferResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-transfer-results",
  templateUrl: "transfer-results.html"
})
export class TransferResultsPage {
  transferWay = 1;
  transferType = 1;
  pickUPLocation;
  dropOffLocation;
  arrivalDate = new Date();
  departureDate = new Date();
  personDetail = {
    adults: 1,
    children: 0,
    infants: 0
  };
  searchResults: any;
  transferResults: any[] = [];
  loading;currencys;time;  arrivaltime;departuretime;
  constructor(public navCtrl: NavController,public navParams: NavParams,public trasferProvider: TransferProvider,public loadingCtrl:LoadingController
  ) {
    this.presentLoading();
    this.currencys = this.navParams.get("currencys"); 
    console.log("currencys", this.currencys);
    this.transferWay = this.navParams.get("transferWay");
    this.transferType = this.navParams.get("transferType");
    this.pickUPLocation = this.navParams.get("pickUPLocation");
    this.dropOffLocation = this.navParams.get("dropOffLocation");
    this.arrivalDate = this.navParams.get("arrivalDate");
    this.departureDate = this.navParams.get("departureDate");
    this.personDetail = this.navParams.get("personDetail");
    this.arrivaltime = this.navParams.get("arrivaltime");
    this.departuretime = this.navParams.get("departuretime")
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TransferResultsPage");
    this.getTransferResult();
  }

  getTransferResult() {
    this.trasferProvider.getTransferSearchIttenary(
        this.dateFormatter(this.arrivalDate),
        this.arrivaltime[0].houres,
        this.arrivaltime[0].mintues,
        this.dateFormatter(this.departureDate),
        this.departuretime[0].houres,
        this.departuretime[0].mintues,
        this.pickUPLocation.atype == "GIATA" ? 0 : 1,
        this.transferType == 1 ? this.pickUPLocation.from_code: this.pickUPLocation.from_code,
        this.transferType == 1 ? this.dropOffLocation.drop_code: this.dropOffLocation.drop_code,
        // this.pickUPLocation,
        // this.dropOffLocation,
        this.personDetail.adults,
        this.personDetail.children,
        this.personDetail.infants,
        this.transferWay == 1 ? "one_way" : "return",
        this.transferType == 1 ? this.dropOffLocation.dropoff_lat_long: this.dropOffLocation.dropoff_lat_long,).then(data => {
        console.log(data);
        this.loading.dismiss();
        if (!data.errors) {
          this.searchResults = data;
          this.transferResults = data.travelling.products;
          for (let i = 0; i < this.transferResults.length; i++) {
            switch (this.transferResults[i].general.producttype) {
              case "Private Transfer":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "ret2_private.jpg";
                break;
              case "Private Luxury Car":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "ret2_suv.jpg";
                break;
              case "Private Minivan":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "minibus.jpg";
                break;
              case "Private Minibus":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "minibus.jpg";
                break;
              case "Private Coach":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "minibus.jpg";
                break;
              default:
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "ret2_private.jpg";
            }
          }
        } else {
          console.log("no Results found");
          this.goToNoResultPage();
        }
      })
      .catch(err => {
        console.log(err);
        this.loading.dismiss();
        this.goToNoResultPage();
      });
  }

  dateFormatter(dateString) {
    if (dateString) {
      return (("0" + dateString.getDate()).slice(-2) +"/" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "/" +dateString.getFullYear() );
    } else {
      return null;
    }
  }
  timwFormatter(timeString) {
    console.log(timeString)
    if (timeString) {
      return (("0" + timeString).slice(-2) +"/" + ("0" + (timeString+ 1)).slice(-2) + "/" +timeString );
    } else {
      return null;
    }
  }

  // getTravellingTime(travellingTime) {
  //   return (
  //     ("0" + parseInt(travellingTime) / 60).slice(-2) +"h " +("0" + (parseInt(travellingTime) % 60)).slice(-2) +"m");
  // }

  goBack() {
    this.navCtrl.pop();
  }

  getTotalPrice(transfer) {
    if (this.transferWay == 1) {
      return transfer.pricing.price;
    } else {
      return (
        parseFloat(
          this.searchResults.returning.products.filter(prod => {
            return prod.general.productid == transfer.general.productid;
          })[0].pricing.price
        ) + parseFloat(transfer.pricing.price)
      );
    }
  }

  transferSelected(transfer) {
    this.navCtrl.push(TransferDetailPage, {
      transferWay: this.transferWay,
      transferType: this.transferType,
      pickUPLocation: this.pickUPLocation,
      dropOffLocation: this.dropOffLocation,
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
      personDetail: this.personDetail,
      transfer: transfer,
      arrivaltime:this.arrivaltime,
      departuretime: this.departuretime,
      currencys:this.currencys,
      returning: this.transferWay == 1? null: this.searchResults.returning.products.filter(prod => { return prod.general.productid == transfer.general.productid; })[0]
    });
  }

  // presentLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     content: `
  //       Please Wait...`
  //   });
  //   this.loading.present();
  // }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
       spinner: "bubbles",
       content: "Loading Please Wait...",
     // content: '<img src="../assets/imgs/transfers.gif"  alt="loading">'+ 'The Walztravels Explore the world your way with our app for iPhone and Android',
     // spinner: 'hide'
    });
    this.loading.present();
  }

  goToNoResultPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(NoResultPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  goToNoWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
}
