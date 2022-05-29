import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, Events } from "ionic-angular";
import { RegisterPage } from "../register/register";
import { LoginProvider } from "../../providers/login/login";
import { addres } from '../../providers/constants/constants';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  emailid='';
  password='';
  public type = "password";
  public showPass = false;
  addres;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public toastCtrl:ToastController,
    public events: Events ) {
      this.addres=addres;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  getLoginButtonStatus() {
    if (this.emailid && this.validateEmail() && this.password.trim()) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail() {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(this.emailid) == false) {
      return false;
    } else {
      return true;
    }
  }

  getForgetButtonStatus() {
    if (this.emailid && this.validateEmail()) {
      return false;
    } else {
      return true;
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.loginProvider
      .loginUser(this.emailid, this.password)
      .then(data => {
        console.log(data);
        if (data.ErrorMessage) {
          this.presentToast(data.ErrorMessage);
        } else {
          this.events.publish("user", data);
          if (this.navParams.get("resolve")) {
            this.navCtrl
              .pop()
              .then(() => this.navParams.get("resolve")("push"));
          } else {
            this.navCtrl.pop();
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  forgotPassord(){
    let jsonObj={
        email_id:this.emailid
      }
    this.loginProvider.forgotPassword(jsonObj).then(data=>{
      console.log(data)
      if(data.Success=="true"){
        this.presentToast("Reset Password link has been successfully sent to the given Email ID")
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  goBack(){
    this.navCtrl.pop();
  }
}
