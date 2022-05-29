import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { TransferProvider } from "../../providers/transfer/transfer";
import { addres } from '../../providers/constants/constants';
/**
 * Generated class for the TransferVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-voucher',
  templateUrl: 'transfer-voucher.html',
})
export class TransferVoucherPage {
  loading;departDate = new Date();user; transferWay; transferType; pickUPLocation; dropOffLocation; arrivalDate; departureDate;
   personDetail; transfer; returning; totalPrice; personDetails;arrivaltime;departuretime;currencys; addres;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl:LoadingController,
     public trasferProvider: TransferProvider,) {
    this.presentLoading();
    this.transferWay=this.navParams.get('transferWay');
    this.transferType=this.navParams.get('transferType');
    this.pickUPLocation=this.navParams.get('pickUPLocation');
    this.dropOffLocation=this.navParams.get('dropOffLocation');
    this.arrivalDate=this.navParams.get('arrivalDate');
    this.departureDate=this.navParams.get('departureDate');
    this.personDetail=this.navParams.get('personDetail');
    this.transfer=this.navParams.get('transfer');
    this.returning=this.navParams.get('returning');
    this.arrivaltime = this.navParams.get("arrivaltime");
    this.departuretime = this.navParams.get("departuretime");
    this.totalPrice=this.transferWay==1?parseFloat(this.transfer.pricing.price):parseFloat(this.transfer.pricing.price) +parseFloat(this.returning.pricing.price);
    this.personDetails=this.navParams.get('personDetails');
    this.currencys = this.navParams.get("currencys");
    this.addres = addres;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferVoucherPage');
    this.getTransferBooking();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }

  dateFormatter(dateString) {
    if (dateString) {
      return (
        ("0" + dateString.getDate()).slice(-2) +
        "/" +
        ("0" + (dateString.getMonth() + 1)).slice(-2) +
        "/" +
        dateString.getFullYear()
      );
    } else {
      return null;
    }
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }

  getTransferBooking() {
    this.trasferProvider.getTransferBooking( 
      this.dateFormatter(this.arrivalDate),
      this.arrivaltime[0].houres,
      this.arrivaltime[0].mintues,
      this.dateFormatter(this.departureDate),
      this.departuretime[0].houres,
      this.departuretime[0].mintues,
      this.pickUPLocation.atype == "GIATA" ? 0 : 1,
      this.personDetails.flight_number,
      this.personDetails.flying,
      this.transferType == 1 ? this.pickUPLocation.from_code: this.pickUPLocation.from_code,
      this.transferType == 1 ? this.dropOffLocation.value: this.dropOffLocation.value,
      this.personDetails.location,
      this.personDetails.location,
      this.personDetails.email,
      this.personDetails.title,
      this.personDetails.firstName,
      this.personDetails.lastName,
      this.personDetails.mobile_no,
      this.transfer.general.productid,
      this.transfer.general.bookingtypeid,
      this.totalPrice,
      this.personDetail.adults,
      this.personDetail.children,
      this.personDetail.infants,
      this.personDetail.adults+this.personDetail.children+this.personDetail.infants,
      this.transferWay == 1 ? "one_way" : "return",
      this.personDetails.flying2,
      this.personDetails.flight_number2,
      this.transferType == 1 ? this.pickUPLocation.from_code: this.pickUPLocation.from_code,
      this.personDetails.zipcode,
      this.personDetails.address ).then(data => {
        console.log(data);
        this.loading.dismiss();
        if (!data.errors) {
        } else {
          console.log("no Results found");
        }
      })
      .catch(err => {
        console.log(err);
        this.loading.dismiss();
        
      });
  }


}
