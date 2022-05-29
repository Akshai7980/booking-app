import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginProvider } from '../../providers/login/login';
import { MyProfilePage } from '../my-profile/my-profile';
import { MyBookingsPage } from '../my-bookings/my-bookings';
import { MyTransactionsPage } from '../my-transactions/my-transactions';
import { PROD_PROFILE_IMG_BASE_URL, addres } from '../../providers/constants/constants';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  user;addres;
  profileBaseUrl=PROD_PROFILE_IMG_BASE_URL;
  constructor(public navCtrl: NavController, public navParams: NavParams, private events:Events, private loginProvider:LoginProvider) {
    this.user=this.loginProvider.user||this.loginProvider.getUserDeatil();
    this.addres=addres;
    this.events.subscribe('user',user=>{
      this.user=this.loginProvider.user||this.loginProvider.getUserDeatil();
    })
    this.loginProvider.userObservable.subscribe(data=>{
      if(data){
        this.user=this.loginProvider.user||this.loginProvider.getUserDeatil();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

  GoToLoginPage(){
    if(!this.user){
      this.navCtrl.push(LoginPage)
    }
  }

  goProfilePage(){
    //console.log(profile)
    if(this.user){
      this.navCtrl.push(MyProfilePage);
    }else{
      this.GoToLoginPage()
    }
  }

  myBookingPage(){
    if(this.user){
      this.navCtrl.push(MyBookingsPage,{isGoBack:true});
    }else{
      this.GoToLoginPage()
    } 
  }

  myTransactionPage(){
    if(this.user){
      this.navCtrl.push(MyTransactionsPage);
    }else{
      this.GoToLoginPage()
    } 
  }

  logout(){
    this.user=null;
    this.loginProvider.user=null;
    this.events.publish('user', this.user);
    this.loginProvider.userObservable.next(true);
    localStorage.removeItem("user");
  }
}
