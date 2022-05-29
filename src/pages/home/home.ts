import { Component } from "@angular/core";
import { NavController, Events } from "ionic-angular";
import { MyHomePage } from "../my-home/my-home";
import { MyAccountPage } from "../my-account/my-account";
import { MyTripsPage } from "../my-trips/my-trips";
import { MorePage } from "../more/more";
import { LoginProvider } from "../../providers/login/login";
import { MyBookingsPage } from "../my-bookings/my-bookings";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  homePage = MyHomePage;
  accountPage = MyAccountPage;
  tripsPage: any = MyTripsPage;
  morePage = MorePage;
  tabIndex = 1;bool= false;
  constructor(
    public navCtrl: NavController,
    public loginProvider: LoginProvider,
    public events: Events
  ) {
    let user = this.loginProvider.user || this.loginProvider.getUserDeatil();

    if (user) {
      this.tripsPage = MyBookingsPage;
    } else {
      this.tripsPage = MyTripsPage;
    }

    events.subscribe("user", user => {
      let user1 = this.loginProvider.user || this.loginProvider.getUserDeatil();
      this.tab3SetIndex(user1);
    });
  }

  ionViewCanLeave() {
    return this.bool;
  }
  tab3SetIndex(user1) {
    if (user1) {
      this.tripsPage = MyBookingsPage;
      setTimeout(() => {
        this.tripsPage = MyBookingsPage;
      }, 750);
    } else {
      this.tripsPage = MyTripsPage;
      setTimeout(() => {
        this.tripsPage = MyTripsPage;
      }, 750);
    }
    if (this.tabIndex == 3) {
      setTimeout(() => {
        let event = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true
        });

        let theTabId = "tab-t0-3"; //inspect element your tab to get your tab id
        let theTabElement = document.getElementById(theTabId);

        if (theTabElement) {
          if (theTabElement.dispatchEvent(event)) {
            console.log(["clicking", theTabElement, "success"]);
          } else {
            console.log(["clicking", theTabElement, "failed"]);
          }
        }
      }, 750);
    }
  }
  myHome() {
    this.tabIndex = 1;
  }
  myAccount() {
    this.tabIndex = 2;
  }

  myTrips() {
    this.tabIndex = 3;
    // setTimeout(() => {
    //   let event = new MouseEvent("click", {
    //     view: window,
    //     bubbles: true,
    //     cancelable: true
    //   });

    //   let theTabId = "tab-t0-3"; //inspect element your tab to get your tab id
    //   let theTabElement = document.getElementById(theTabId);

    //   if (theTabElement) {
    //     if (theTabElement.dispatchEvent(event)) {
    //       console.log(["clicking", theTabElement, "success"]);
    //     } else {
    //       console.log(["clicking", theTabElement, "failed"]);
    //     }
    //   }
    // }, 750);
  }
  more() {
    this.tabIndex = 4;
  }
}
