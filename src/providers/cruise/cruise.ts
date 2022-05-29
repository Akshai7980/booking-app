import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http";
import { CRUISE_BASE_URL, CRUISE_USER_ID, CRUISE_USER_PASSWORD, CRUISE_IP_ADDRESS, CRUISE_ACCESS} from "../constants/constants";
/*
  Generated class for the CruiseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CruiseProvider {
  countryDetails = [];
  portDetails = [];
  destination;
  constructor(public http: HttpClient, public nativeHttp: HTTP) {
    console.log('Hello CruiseProvider Provider');
    this.getIsdResult();
    //this.getPorts();
  }
  getIsdResult() {
    return new Promise(resolve => {
      const url = CRUISE_BASE_URL + "countries";
      this.http.get(url).subscribe(data => {
        this.countryDetails = <any[]>data;
        console.log(this.countryDetails);
        resolve(this.countryDetails);
      });
    });
  }
  getCountry(term) {
    if (this.countryDetails.length > 0) {
      return this.searchContryCode(term);
    } else {
      this.getIsdResult().then(data => {
        return this.searchContryCode(data);
      });
    }
  }

  searchContryCode(term) {
    return this.countryDetails.filter(country => {
      return (
        country.area.toUpperCase().match(term.toUpperCase()) ||
        country.name.toUpperCase().match(term.toUpperCase())
      );
    });
  }



  getPorts(term) {
    return new Promise(resolve => {
      const url = CRUISE_BASE_URL  + "show_ports?cruise_destination=" + term;
      this.http.get(url).subscribe(data => {
        this.portDetails = <any[]>data;
        console.log(this.portDetails);
        resolve(this.portDetails);
      });
    });
  }
  getPortResult(term) {
    if (this.portDetails.length > 0) {
      return this.portCode(term);
    } else {
      this.getPorts(term).then(data => {
        return this.portCode(term);
      });
    }
  }

  portCode(term) {
    console.log("sdsd",term)
    return this.portDetails.filter(port => {
      return (
        port.port_name.toUpperCase().match(term.toUpperCase()) 
      );
    });
  }
  getCruiseCuntry(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = CRUISE_BASE_URL + "countries";
        this.nativeHttp.get(url, {}, {}).then(data => {
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

  getCruiseDestinations(term): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = CRUISE_BASE_URL + "show_ports?cruise_destination=" + term;
        this.nativeHttp.get(url, {}, {}).then(data => {
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

  getCruiseSeach(start,limint,destination, port, departureDate,returnDate,adultCount,childCount): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = CRUISE_BASE_URL +"cruise_lines?user_id=" + CRUISE_USER_ID +
        "&user_password=" + CRUISE_USER_PASSWORD +
        "&access=" + CRUISE_ACCESS+ 
        "&ip_address=" + CRUISE_IP_ADDRESS +
        "&start="+ start + 
        "&limit=" + limint +
        "&destination=" + destination +
        "&port=" + port +
        "&departure_date="  + departureDate +
        "&return_date=" + returnDate +
        "&adult_count=" + adultCount +
        "&child_count=" + childCount;
        console.log("urldata",url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log("-----------",data)
            if (data.status == 200) {
              console.log("allas",data.data)
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

  getCruiseDetails(start): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = CRUISE_BASE_URL +"cruise_info?user_id=" + CRUISE_USER_ID +
        "&user_password=" + CRUISE_USER_PASSWORD +
        "&access=" + CRUISE_ACCESS+ 
        "&ip_address=" + CRUISE_IP_ADDRESS +
        "&unique_id=" + start;
        console.log("urldata",url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log("-----------",data)
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
  
 
  
  getCruiseBook(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = CRUISE_BASE_URL + "booking";
        let headers = {
          "Content-Type": "application/json"
        };
        console.log(url,jsonObj)
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log(data.data)
            if (data.status == 200) {
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
  getMarkup():Promise<any[]> {
    return new Promise((resolve) => {
      const url = CRUISE_BASE_URL + "cruise_markup" ;
      this.http.get(url).subscribe(data=>{
        let  cruiseMarkup = <any[]>data;
        resolve(cruiseMarkup);       
     });
   });
  }


}

