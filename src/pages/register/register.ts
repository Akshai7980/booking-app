import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, ModalController,ActionSheetController } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginProvider } from "../../providers/login/login";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PRIVACY_POLICY } from "../../providers/constants/constants";
import { SearchCountryCodeComponent } from "../../components/search-country-code/search-country-code";
import { SafeResourceUrl } from "@angular/platform-browser";
import { PROD_PROFILE_IMG_BASE_URL } from "../../providers/constants/constants";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  imageData:any='';
  imageSafeData: SafeResourceUrl;
  profileImage: any='';
  profileBaseUrl;
  user: any = {
    emailid:'',
    countryCode:'',
    phoneNumber:'',
    password:'',
    confirmPassword:'',
    title:'',
    firstName:'',
    lastName:'',
  };
  public type = "password";
  public confirmtype = "password"
  public showPass = false;
  public showConPass = false;
  isConfirm = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public toastCtrl: ToastController,
    public iab:InAppBrowser,
    public modalCtrl:ModalController,
    private camera: Camera,
    private actionSheetCtrl:ActionSheetController
  ) {
    this.imageData=PROD_PROFILE_IMG_BASE_URL.image;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: sourceType,
      targetWidth: 400,
      targetHeight: 400
    };
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.imageData = 'data:image/png;base64,' + imageData;
        this.imageSafeData = 'data:image/png;base64,' + imageData;
        this.profileImage = "";
        console.log(this.imageData);
      },
      err => {
        // Handle error
        console.log(err);
      }
    );
  }

  register(form) {
    this.loginProvider.registerUser(this.user).then(data => {
        if (data.Success == "true") {
          this.presentToast("You have registered successfully. Please login ");
          this.navCtrl.pop();
        } else {
          this.presentToast(data.ErrorMessage);
        }
      })
      .catch(err => {
        console.log(err);
        this.presentToast(err);
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

  popBack() {
    this.navCtrl.pop();
  }

  privacyLink() {
    console.log(",{hideurlbar:'yes'}");
    let target = "_blank";
    const browser = this.iab.create(PRIVACY_POLICY, target);
    browser.show();
  }

  getIsdCode() {
    let nationalityModal = this.modalCtrl.create(
      SearchCountryCodeComponent,
      { userId: 8675309 },
      { cssClass: "searchCountryNameModel" }
    );
    nationalityModal.present();
    nationalityModal.onDidDismiss(data => {
      if (data) {
        //this.detail.nationality = data.countryName;
        this.user.countryCode = data.countryCode;
      }
      console.log(data);
    });
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }
  showConfirmPassword() {
    this.showConPass = !this.showConPass;
    if (this.showConPass) {
      this.confirmtype = "text";
    } else {
      this.confirmtype = "password";
    }
  }

  getButtonStatus() {
    if (
      this.user.emailid.trim() &&
      // this.user.countryCode.trim() &&
      // this.user.phoneNumber.trim() &&
      this.user.password.trim() &&
      this.user.title.trim() &&
      this.user.firstName.trim() &&
      this.user.lastName.trim() &&
      this.validateEmail()
    ) {
      return false;
    } else {
      return true;
    }
  }

  onChange(val) {
    console.log("change")
    if (this.user.password == this.user.confirmPassword) {
      this.isConfirm = true;
    } else {
      this.isConfirm = false;
    }
  }
  validateEmail() {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(this.user.emailid) == false) {
      //    alert('Invalid Email Address');
      return false;
    } else {
      return true;
    }
  }


  
}
