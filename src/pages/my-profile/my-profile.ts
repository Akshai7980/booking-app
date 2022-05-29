import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SafeResourceUrl } from "@angular/platform-browser";
import { ChangePasswordPage } from "../change-password/change-password";
import { PROD_PROFILE_IMG_BASE_URL } from "../../providers/constants/constants";

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-my-profile",
  templateUrl: "my-profile.html"
})
export class MyProfilePage {

  user: any = {};
  imageData:any='';
  imageSafeData: SafeResourceUrl;
  profileImage: any='';
  profileBaseUrl=PROD_PROFILE_IMG_BASE_URL.image;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public toastCtrl:ToastController,
    private camera: Camera,
    private actionSheetCtrl:ActionSheetController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyProfilePage");
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.profileImage = this.user&&JSON.parse(JSON.stringify(this.user.image));
  }

  updateProfile() {
    let jsoObj={
      email_id:this.user.emailid,
      mobile:this.user.mobile,
      first_name:this.user.fname,
      last_name:this.user.lname,
      user_title:this.user.title,
      country_code:this.user.country_code,
      image:this.imageData
    }
    console.log(jsoObj)
    this.loginProvider.updateProfile(jsoObj).then(data => {
        this.user = data;
        console.log(data);
        this.presentToast("Your Profile  has been updated successfully.");
      })
      .catch(err => {
        this.presentToast(err);
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

  goBack(){
    this.navCtrl.pop();
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

  changePassword(){
    this.navCtrl.push(ChangePasswordPage, { emailid: this.user.emailid });
  }
}
