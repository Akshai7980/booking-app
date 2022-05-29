import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http";
import { TRANSFER_BASE_URL,TRANSFER_DEST_URL, TRANSFER_USER_ID, TRANSFER_USER_PASSWORD, TRANSFER_ACCESS,TRANSFER_IP_ADDRESS } from "../constants/constants";

/*
  Generated class for the TransferProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransferProvider {
  constructor(public http: HttpClient, public nativeHttp: HTTP) {
    console.log("Hello TransferProvider Provider");
  }
  gettransferCitySeach(term): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = TRANSFER_DEST_URL + "transfer_dest_auto?term="+term;
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log("Transfer Dest Auto",data.data)
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

  gettransferSeach(city, type, term,): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = TRANSFER_DEST_URL + "transfer_drop_new?city=" +city +
          "&s_type=" + type +
          "&term="+ term;
          console.log(url)
          this.nativeHttp.get(url, {}, {}) .then(data => {
          //  console.log(data.data)
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

  getTransferAirportSeach(term): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = TRANSFER_BASE_URL + "airport_dests?term="+term;
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log("Airport Dests",data.data)
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

  getTransferAirlinesSeach(term): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = TRANSFER_BASE_URL + "airline_name?term="+term;
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(data)
            if (data.status == 200) {
              console.log("Airline Name",data.data)
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
  getDropOff(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = TRANSFER_BASE_URL + "get_dropoffdetails";
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
 
  getTransferSearch(arrivalDate,arrivalHours,arrivalMinutes, departureDate, departureHours, departureMinutes,transferType,
    pickUpLocation,  dropOffLocation,  adultCount,childCount, infantCount,transferWay) :Promise<any>{
    return new Promise((resolve, reject) => {
      try {
        const url =
        TRANSFER_BASE_URL + "search?user_id=" + TRANSFER_USER_ID +
          "&user_password=" +  TRANSFER_USER_PASSWORD +
          "&access=" + TRANSFER_ACCESS +
          "&ip_address=" + TRANSFER_IP_ADDRESS +
          "&arrival_date=" + arrivalDate +
          "&arrival_time_h=" + arrivalHours +
          "&arrival_time_m=" + arrivalMinutes +
          "&departure_date=" + departureDate +
          "&departure_time_h=" + departureHours +
          "&departure_time_m=" + departureMinutes +
          "&transfer_type=" + transferType +
          "&pickup_location=" + pickUpLocation +
          "&dropoff_location=" + dropOffLocation +
          "&trans_adult=" + adultCount +
          "&trans_children=" + childCount +
          "&trans_infant=" +infantCount +
          "&journey_type=" + transferWay;
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(url, data);
            if (data.status == 200) {
              console.log(data.data);
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            console.log(url, err);
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getTransferSearchIttenary(arrivalDate,arrivalHours,arrivalMinutes, departureDate, departureHours, departureMinutes,transferType,
    pickUpLocation,  dropOffLocation,  adultCount,childCount, infantCount,transferWay,tolatlong) :Promise<any>{
    return new Promise((resolve, reject) => {
      try {
        const url =
        TRANSFER_BASE_URL + "search?user_id=" + TRANSFER_USER_ID +
          "&user_password=" +  TRANSFER_USER_PASSWORD +
          "&access=" + TRANSFER_ACCESS +
          "&ip_address=" + TRANSFER_IP_ADDRESS +
          "&arrival_date=" + arrivalDate +
          "&arrival_time_h=" + arrivalHours +
          "&arrival_time_m=" + arrivalMinutes +
          "&departure_date=" + departureDate +
          "&departure_time_h=" + departureHours +
          "&departure_time_m=" + departureMinutes +
          "&transfer_type=" + transferType +
          "&pickup_location=" + pickUpLocation +
          "&dropoff_location=" + dropOffLocation +
          "&trans_adult=" + adultCount +
          "&trans_children=" + childCount +
          "&trans_infant=" +infantCount +
          "&journey_type=" + transferWay +
          "&to_lat_long=" + tolatlong;
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(url, data);
            if (data.status == 200) {
              console.log(data.data);
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            console.log(url, err);
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }


getTransferBooking(arrivalDate, arrivalHours, arrivalMinutes,departureDate,
  departureHours,departureMinutes,transferType, airlineNumbar,depAirport,
  deptAirportCode,accomodationName,accoAddress1,accoAddress2, emailid,
  leadTitle,leadName,leadSurname,mobileNo,productid,bookingtypeid,
  saleprice,noadults, nochildren,noinfants,nopax,transferWay,
  returnFlightNumber, returnAirportCode, inboundarrivalAirport,zipcode,address) :Promise<any>{
  return new Promise((resolve, reject) => {
    try {
      const url =
      TRANSFER_BASE_URL + "transfer_booking?user_id=" + TRANSFER_USER_ID +
        "&user_password=" + TRANSFER_USER_PASSWORD +
        "&access=" + TRANSFER_ACCESS +
        "&ip_address=" +  TRANSFER_IP_ADDRESS +
        "&transfer_type=" + transferType +
        "&arrival_date=" + arrivalDate +
        "&arrival_time_h=" + arrivalHours +
        "&arrival_time_m=" + arrivalMinutes +
        "&departure_date=" + departureDate +
        "&departure_time_h=" + departureHours +
        "&departure_time_m=" + departureMinutes +
        "&airline_number=" + airlineNumbar +
        "&dep_airport=" + depAirport +
        "&dest_airport_code=" + deptAirportCode +
        "&accomodation_name=" + accomodationName +
        "&acco_address1=" + accoAddress1 +
        "&acco_address2=" + accoAddress2 +
        "&emailid=" + emailid +
        "&lead_title=" + leadTitle +
        "&lead_name=" + leadName +
        "&lead_surname=" + leadSurname +
        "&mobile_no=" + mobileNo +
        "&productid=" + productid +
        "&bookingtypeid=" + bookingtypeid +
        "&saleprice=" + saleprice +
        "&noadults=" + noadults +
        "&nochildren=" + nochildren +
        "&noinfants=" + noinfants +
        "&nopax=" + nopax +
        "&journey_type=" + transferWay +
        "&return_flight_number=" + returnFlightNumber +
        "&return_airport_code=" + returnAirportCode + 
        "&inboundarrival_airport=" + inboundarrivalAirport +
        "&zipcode=" +  zipcode +
        "&address=" + address;
        console.log(url);
      this.nativeHttp.get(url, {}, {}).then(data => {
          console.log(url, data);
          if (data.status == 200) {
            console.log(data.data);
            resolve(JSON.parse(data.data));
          } else {
            reject(data.error);
          }
        })
        .catch(err => {
          console.log(url, err);
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
}
  // getAirportToHotelDestination(airportGroupId, transfer_type) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const url = TRANSFER_SEARCH_BASE_URL + "get_transfer_from?AirportGroupId=" + airportGroupId +
  //         "&transfer_type=" + transfer_type;
  //       this.nativeHttp.get(url, {}, {})
  //         .then(data => {
  //           console.log(url, data);
  //           if (data.status == 200) {
  //             console.log(data.data);
  //             resolve(JSON.parse(data.data));
  //           } else {
  //             reject(data.error);
  //           }
  //         })
  //         .catch(err => {
  //           console.log(url, err);
  //           reject(err);
  //         });
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  // getHotelToAirportFromDestination(airportGroupId, transfer_type) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const url =
  //       TRANSFER_SEARCH_BASE_URL + "h_a_transfer_from?AirportGroupId=" + airportGroupId +
  //         "&transfer_type=" + transfer_type;
  //       this.nativeHttp   .get(url, {}, {}).then(data => {
  //           console.log(url, data);
  //           if (data.status == 200) {
  //             console.log(data.data);
  //             resolve(JSON.parse(data.data));
  //           } else {
  //             reject(data.error);
  //           }
  //         })
  //         .catch(err => {
  //           console.log(url, err);
  //           reject(err);
  //         });
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  // getHotelToAirportToDestination(resortId) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const url =
  //       TRANSFER_SEARCH_BASE_URL + "h_a_transfer_to?h_ResortId=" + resortId;
  //       this.nativeHttp.get(url, {}, {}).then(data => {
  //           console.log(url, data);
  //           if (data.status == 200) {
  //             console.log(data.data);
  //             resolve(JSON.parse(data.data));
  //           } else {
  //             reject(data.error);
  //           }
  //         })
  //         .catch(err => {
  //           console.log(url, err);
  //           reject(err);
  //         });
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }
  


}
