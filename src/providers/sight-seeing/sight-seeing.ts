import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http";
import { SIGHT_SEEING_BASE_URL,APP_HOME_PAGE, SIGHT_SEEING_USER_ID, SIGHT_SEEING_USER_PASSWORD, SIGHT_SEEING_ACCESS, SIGHT_SEEING_IP_ADDRESS } from "../constants/constants";

/*
  Generated class for the SightSeeingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SightSeeingProvider {
  // sightSeeingLocation=[];
  constructor(public nativeHttp: HTTP) {
    console.log("Hello SightSeeingProvider Provider");
    //  this.getSightSeeingsLocation();
  }

  getAboutUs(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = APP_HOME_PAGE + "get_cms_details?user_id=" + SIGHT_SEEING_USER_ID +
        "&user_password=" + SIGHT_SEEING_USER_PASSWORD +
        "&access=" + SIGHT_SEEING_ACCESS +
        "&ip_address=" + SIGHT_SEEING_IP_ADDRESS +
        "&cms_content=about_us"
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  privacyPolicy(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = APP_HOME_PAGE + "get_cms_details?user_id=" + SIGHT_SEEING_USER_ID +
        "&user_password=" + SIGHT_SEEING_USER_PASSWORD +
        "&access=" + SIGHT_SEEING_ACCESS +
        "&ip_address=" + SIGHT_SEEING_IP_ADDRESS +
        "&cms_content=privacy_policy"
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  
  support(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = APP_HOME_PAGE + "get_cms_details?user_id=" + SIGHT_SEEING_USER_ID +
        "&user_password=" + SIGHT_SEEING_USER_PASSWORD +
        "&access=" + SIGHT_SEEING_ACCESS +
        "&ip_address=" + SIGHT_SEEING_IP_ADDRESS +
        "&cms_content=support"
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }


  getSightSeeingsCuntry(name): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = SIGHT_SEEING_BASE_URL + "destination?user_id=" + SIGHT_SEEING_USER_ID +
        "&user_password=" + SIGHT_SEEING_USER_PASSWORD +
        "&access=" + SIGHT_SEEING_ACCESS +
        "&ip_address=" + SIGHT_SEEING_IP_ADDRESS +
        "&&destination=" + name;
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getSightSeeingsCitys(term): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = SIGHT_SEEING_BASE_URL + "getlocation?country=" + term;
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(data);
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
      } catch (err) {
        reject(err);
      }
    });
  }

  getSightSeeingResults(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = SIGHT_SEEING_BASE_URL + "search";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log("providerResults DATA----------",url,data)
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
      } catch (err) {
        reject(err);
      }
    });
  }

  getSightSeeingDetails(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = SIGHT_SEEING_BASE_URL + "details";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log("getSight---provader",data)
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getSightSeeingBook(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = SIGHT_SEEING_BASE_URL + "book";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log("getSight---provader",data)
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
  
}
