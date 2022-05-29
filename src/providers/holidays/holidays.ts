import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { HOLIDAY_BASE_URL } from '../constants/constants';

/*
  Generated class for the HolidaysProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HolidaysProvider {

  constructor(public http: HttpClient, public nativeHttp:HTTP) {
    console.log('Hello HolidaysProvider Provider');
  }

  getHolidayPackageSeach(term): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOLIDAY_BASE_URL + "holiday_dest?term=" + term;
        console.log(url)
        this.nativeHttp.get(url, {}, {})
          .then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log(data.data)
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

 
  getHolidaySeach(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = HOLIDAY_BASE_URL +"search_result";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        console.log("holidaturl-------------",url)
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            // console.log("providerDataAll---------",data)
            if (data.status == 200) {
              // console.log("providerData---------",data.data);
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


  getHolidayDetail(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOLIDAY_BASE_URL +"search_details";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        console.log(url)
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log(data.data)
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

  getHolidayBooking(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOLIDAY_BASE_URL + "booking";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        console.log(url)
        this.nativeHttp.get(url, jsonObj, headers).then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log(data.data)
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

  getHolidayContinentSeach(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOLIDAY_BASE_URL +"get_continent";
        this.nativeHttp
          .get(url, {}, {})
          .then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log(data.data)
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

  getHolidayCountrySeach(jsonObj): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOLIDAY_BASE_URL +"get_countries";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp
          .post(url, jsonObj, headers)
          .then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log(data.data)
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

  getHolidayTypeSeach(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOLIDAY_BASE_URL +"get_type";
        this.nativeHttp
          .get(url, {}, {})
          .then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log(data.data)
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

  getHolidayThemeSeach(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOLIDAY_BASE_URL +"get_theme";
        this.nativeHttp
          .get(url, {}, {})
          .then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log(data.data)
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
