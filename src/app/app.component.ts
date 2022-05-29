import { Component,ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { OneSignal } from '@ionic-native/onesignal';
import { SpalshPage } from '../pages/spalsh/spalsh';
import { HomePage } from '../pages/home/home';

//import firebase from 'firebase/app';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    //  private oneSignal: OneSignal
     ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      if (platform.is('android')) {
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#0b68b5');
      }
      // setTimeout(function(){
      //   this.splashScreen.hide();
      // }, 9000);
      // setTimeout(() => {
      //   this.splashScreen.hide();
      // }, 1000);

      splashScreen.hide();
      // firebase.initializeApp({
      //   apiKey: 'AIzaSyCiedwzukhAZ_CgkV67JqrIKwVGxl1u_Vg',
      //   authDomain: 'trawex-983fb.firebaseapp.com',
      //   databaseURL: 'https://trawex-983fb.firebaseio.com',
      //   storageBucket: 'trawex-983fb.appspot.com',
      //   messagingSenderId: '113358291068',
      // });

    //   this.oneSignal.startInit('85140cdd-c1ac-4968-b15b-1ec495a0444e', '51986596008');

    //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    //   this.oneSignal.handleNotificationReceived().subscribe((data) => {
    //     console.log("data",data)
    //     // this.nav.push(FlightSearchEnginePage)
    //      // do something when notification is received
    //   });

    //   this.oneSignal.handleNotificationOpened().subscribe((data) => {
    //     console.log("data",data)
    //     // this.nav.push(FlightSearchEnginePage)
    //     // do something when a notification is opened
    //   });
    //   this.oneSignal.endInit();

    });
  }


}

