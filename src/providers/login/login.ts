import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http";
import { Subject } from "rxjs/Subject";
import { PROD_TRAWEX_LOGIN_URL } from "../constants/constants";
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  user;
  userObservable = new Subject();

  constructor(private nativeHttp: HTTP) {
    console.log("Hello LoginProvider Provider");
    this.getUserDeatil();
  }

  getUserDeatil() {
    let user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
      this.userObservable.next(true);
      return this.user;
    } else {
      this.user = null;
      return null;
    }
  }

  registerUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      const url =
        PROD_TRAWEX_LOGIN_URL +
        "registration?email_id=" +
        user.emailid +
        "&password=" +
        user.password +
        "&mobile=" +
        user.phoneNumber +
        "&user_title=" +
        user.title +
        "&first_name=" +
        user.firstName +
        "&last_name=" +
        user.lastName +
        "&image=" +
        user.image +
        "&country_code=" +
        user.countryCode.trim();
      this.nativeHttp.get(url, {}, {}).then(data => {
          resolve(JSON.parse(data.data));
          console.log(url,data);
        })
        .catch(err => {
          console.log(err);
          reject("Somthing is wrong: " + err);
        });
    });
  }

  loginUser(email, password): Promise<any> {
    return new Promise((resolve, reject) => {
      const url =
        PROD_TRAWEX_LOGIN_URL +
        "login?user_name=" +
        email +
        "&password=" +
        password;
      this.nativeHttp.get(url, {}, {})
        .then(data => {
          console.log(data);

          if (!JSON.parse(data.data).ErrorMessage) {
            localStorage.setItem("user", data.data);
            this.user = JSON.parse(data.data);
            this.userObservable.next(true);
          }
          resolve(JSON.parse(data.data));
        })
        .catch(err => {
          console.log(err);
          reject("Somthing is wrong: " + err);
        });
    });
  }

  
  forgotPassword(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_LOGIN_URL + "forgot_password";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            if (data.status == 200) {
              console.log(data.data);
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }


  changedPassword(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_LOGIN_URL + "change_password";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            if (data.status == 200) {
              console.log(data.data);
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }



  updateProfile(jsonObj) {
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_LOGIN_URL + "update_profile";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        console.log(url);
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
          console.log(data.data);
            if (data.status == 200) {
              console.log(data.data);
              if(JSON.parse(data.data).ErrorMessage){
                reject(JSON.parse(data.data).ErrorMessage);
              }else{
                localStorage.setItem("user", data.data);
                this.user = JSON.parse(data.data);
                this.userObservable.next(true);
                resolve(JSON.parse(data.data));
              }
              
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  otpAuthentication(){
    
  }
}
