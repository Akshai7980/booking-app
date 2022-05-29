import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { MyAccountPage } from '../my-account/my-account';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-change-password",
  templateUrl: "change-password.html"
})
export class ChangePasswordPage {
  public currenttype = "password";
  public newtype = "password";
  public confirmtype = "password";
  public showCurrentPass = false;
  public showNewPass = false;
  public showConfirmPass = false;
  emailid;
  currentPassword = "";
  newPassword = "";
  confirmPassword = "";
  isConfirm = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public toastCtrl:ToastController
  ) {
    this.emailid = this.navParams.get("emailid");
  }

  ionViewDidLoad() {
  }

  showCurrentPassword() {
    this.showCurrentPass = !this.showCurrentPass;

    if (this.showCurrentPass) {
      this.currenttype = "text";
    } else {
      this.currenttype = "password";
    }
  }

  showNewPassword() {
    this.showNewPass = !this.showNewPass;

    if (this.showNewPass) {
      this.newtype = "text";
    } else {
      this.newtype = "password";
    }
  }

  showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass;
    if (this.showConfirmPass) {
      this.confirmtype = "text";
    } else {
      this.confirmtype = "password";
    }
  }

  onChange(val) {
    console.log("change")
    if (this.newPassword == this.confirmPassword) {
      this.isConfirm = true;
    } else {
      this.isConfirm = false;
    }
  }
  getButtonStatus() {
    if (
      this.currentPassword &&
      this.newPassword &&
      this.confirmPassword &&
      this.isConfirm
    ) {
      return false;
    } else {
      return true;
    }
  }

  changePassword() {
    let jsoObj={
      email_id:this.emailid,
      old_password:this.currentPassword,
      new_password: this.newPassword,
    }
    this.loginProvider.changedPassword(jsoObj).then(data => {
        if (data.ErrorMessage) {
          this.presentToast(data.ErrorMessage);
        } else {
          this.loginProvider.user.password = this.newPassword;
          localStorage.setItem("user", JSON.stringify(this.loginProvider.user));
          this.presentToast("Your password has been changed successfully");
          this.navCtrl.push(MyAccountPage);
        }
      })
      .catch(err => {});
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
  goBack(){
    this.navCtrl.pop();
  }
}
