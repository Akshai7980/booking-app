import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http";
import { HttpClient } from '@angular/common/http';
import { PROD_TRAWEX_BASE_URL,FLIGHT_BOOKING_URL, USER_ID, USER_PASSWORD, IP_ADDRESS, ACCESS, TARGET,APP_HOME_PAGE ,PROD_TRAWEX_CURRENCY_URL,FLIGHT_MARKUP_URL} from "../constants/constants";

/*
  Generated class for the FlightsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FlightsProvider {
  sess_id;
  constructor(public nativeHttp: HTTP, public http: HttpClient) {
    console.log("Hello FlightsProvider Provider");
  }

  getAuthSession() {
    return new Promise((resolve, reject) => {
      const url =
        PROD_TRAWEX_BASE_URL +
        "authenticate?user_id=" +
        USER_ID +
        "&user_password=" +
        USER_PASSWORD +
        "&ip_address=" +
        IP_ADDRESS +
        "&access=" +
        ACCESS;
        console.log("getAuthSession",url);
      this.nativeHttp.get(url, {}, {}).then(data => {
          console.log("auth",data.data);
          let data1 = JSON.parse(data.data);
          console.log(data1.url);
          if (data1 && data1.SessionId) {
            this.sess_id = data1.SessionId;
            localStorage.setItem("session_id", this.sess_id);
            resolve(data);
          } else {
            reject("Invalid SessionId");
          }
        })
        .catch(err => {
          console.log("auth",err);
          console.log(err.url);
          reject("Somthing is wrong");
        });
    });
  }

  getFlightResults(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_BASE_URL + "availability";
        let headers = {
          "Content-Type": "application/json"
        };
        console.log("url----data---",url);
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
          console.log("reval----data---",data.data);
          let data1 = JSON.parse(data.data);
          console.log("reval",data1);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
            else {
              reject("Some error Occured");
            }
          } else {
            console.log("provider FlightResults data------------",data1)
            resolve(data1);
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

  flightSeach(journeyType,airportFromCode,airportToCode, departureDate, returnDate, adultFlight, childFlight, infantFlight,travelClass) {
    return new Promise((resolve, reject) => {
      console.log("in flight search");
      let session_id = this.sess_id || localStorage.getItem("session_id");
      if (session_id) {
        console.log("if");
        const url =
          PROD_TRAWEX_BASE_URL +
          "flight_availability_search?user_id=" +
          USER_ID +
          "&user_password=" +
          USER_PASSWORD +
          "&ip_address=" +
          IP_ADDRESS +
          "&access=" +
          ACCESS +
          "&sessionId=" +
          session_id +
          "&journey_type=" +
          journeyType +
          "&airport_from_code=" +
          airportFromCode +
          "&airport_to_code=" +
          airportToCode +
          "&departure_date=" +
          departureDate +
          "&return_date=" +
          returnDate +
          "&adult_flight=" +
          adultFlight +
          "&child_flight=" +
          childFlight +
          "&infant_flight=" +
          infantFlight +
          "&class=" +
          travelClass +
          "&target=" +
          TARGET;
          console.log(url);
          this.nativeHttp.clearCookies();
          this.nativeHttp.setRequestTimeout(5000);
          this.nativeHttp.get(url, {}, {}).then(data => {
            console.log("seapr", data, data.url);
            if (data.data) {
              let data1 = JSON.parse(data.data);
              if (data1.Errors) {
                if (data1.Errors.ErrorCode == "FLERSEA022") {
                  reject("Invalid Session Id");
                } else if (data1.Errors.ErrorCode == "ERSER021") {
                  resolve([]);
                } else {
                  console.log(data1.Errors);
                  reject("Some Error Occurred");
                }
              } else {
                resolve(
                  data1.AirSearchResponse.AirSearchResult.FareItineraries
                );
              }
            } else {
              resolve([]);
            }
          })
          .catch(err => {
            console.log("cat", err, err.url);
            reject("Some Error Occurred");
          });
      } else {
        console.log("else");
        reject("Invalid Session Id");
      }
    });
  }
  getFareRuleDetail(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_BASE_URL + "fare_rules";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
          let data1 = JSON.parse(data.data);
          // console.log("reval",data1);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
            else {
              reject("Some error Occured");
            }
          } else {
            console.log("provider fare_rules data------------",data1)
            resolve(data1.FareRules1_1Response.FareRules1_1Result);
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

  flightFareRuleDetail(fareSourceCode) {
    return new Promise((resolve, reject) => {
      let session_id = this.sess_id || localStorage.getItem("session_id");
      if (session_id) {
        const url = PROD_TRAWEX_BASE_URL + "fare_rules?user_id=" +USER_ID +
          "&user_password=" +USER_PASSWORD +
          "&ip_address=" + IP_ADDRESS +
          "&access=" + ACCESS +
          "&sessionid=" + session_id +"&fare_source_code=" +
          fareSourceCode;
          console.log(url)
        this.nativeHttp.get(url,{},{}).then(data => {
          let data1 = JSON.parse(data.data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            } else if(data1.Errors.ErrorCode == "ERFRU012"){
              resolve({});
            }
            else {
              reject("Some error Occured");
            }
          } else {
            console.log("uiuiuui",data1)
            resolve(data1.FareRules1_1Response.FareRules1_1Result);
          }
        }).catch(err=>{
          reject("Some error Occured");
        });
      } else {
        reject("Invalid Session Id");
      }
    });
  }

  revalidatingFares(fare_source_code) :any{
    return new Promise((resolve, reject) => {
      let session_id = this.sess_id || localStorage.getItem("session_id");
      if (session_id) {
        const url = PROD_TRAWEX_BASE_URL +"revalidate?user_id=" + USER_ID +
        "&user_password=" + USER_PASSWORD +
        "&ip_address=" + IP_ADDRESS +
        "&access=" + ACCESS +
        "&session_id=" + session_id +
        "&fare_source_code=" + fare_source_code;
        console.log(url)
        this.nativeHttp.get(url,{},{}).then(data => {
          let data1 = JSON.parse(data.data);
          console.log("reval",data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
            else {
              reject("Some error Occured");
            }
          } else {
            console.log("provider revalidate data------------",data1)
            resolve(data1.AirRevalidateResponse.AirRevalidateResult);
          }
        }).catch(err=>{
          reject("Some error Occured");
        });
      }else{
        reject("Invalid Session Id");
      }
    });
  }
  getRevalidatingFares(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_BASE_URL + "revalidate";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
          let data1 = JSON.parse(data.data);
          console.log("reval",data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
            else {
              reject("Some error Occured");
            }
          } else {
            console.log("provider revalidate data------------",data1)
            resolve(data1);
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
  getFlightBook(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_BASE_URL + "booking";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
          console.log("provider data=====",data);
          let data1 = JSON.parse(data.data);
          console.log("reval",data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
            else {
              reject("Some error Occured");
            }
          } else {
            console.log("provider booking data------------",data1)
            resolve(data1);
          }
          })
          .catch(err => {
            console.log("err",err);
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
  getFlightBookingDetails(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = FLIGHT_BOOKING_URL + "apiBookingFinal";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
          console.log("bookingsave data",data);
          let data1 = JSON.parse(data.data);
          console.log("reval",data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
            else {
              reject("Some error Occured");
            }
          } else {
            console.log("provider booking data------------",data1)
            resolve(data1);
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


  flightBook(areaCode,countryCode,firstName,lastName, title, emailId, mobileNo, dob, gender,issueCountry, passportExpiry,
    passportNo, adultFlight, childFlight, infantFlight,childDob,childGender,
    childTitle, childFirstName, childLastName,  childIssueCountry, childPassportExpiryDate, childPassportNo,
    infantDob, infantGender, infantFirstName, infantLastName, infantTitle, infantIssueCountry, infantPassportExpiryDate,
    infantPassportNo, IsPassportMandatory,baggage, fareSourceCode, customerId,markup,travelDate) {
    return new Promise((resolve, reject) => {
      let session_id = this.sess_id || localStorage.getItem("session_id");
      if (session_id) {
        const url =
          PROD_TRAWEX_BASE_URL +
          "book?user_id=" + USER_ID +
          "&user_password=" + USER_PASSWORD +
          "&ip_address=" + IP_ADDRESS +
          "&access=" + ACCESS +
          "&target=" + TARGET +
          "&sessionId=" + session_id +
          "&area_code=" + areaCode +
          "&country_code=" + countryCode +
          "&first_name=" + firstName +
          "&last_name=" + lastName +
          "&title=" + title +
          "&email_id=" + emailId +
          "&mobile_no=" + mobileNo +
          "&dob=" + dob +
          "&gender=" + gender +
          "&issue_country=" + issueCountry +
          "&passport_expiry=" + passportExpiry +
          "&passport_no=" + passportNo +
          // "&adult_frequentFlyrNum=" + adultFrequentFlyrNum +
          // "&adultmealplan=" + adultmealplan +
          "&adult_flight=" + adultFlight +
          "&child_flight=" + childFlight +
          "&infant_flight=" + infantFlight +
          "&child_dob=" + childDob +
          "&child_gender=" + childGender +
          "&child_title=" + childTitle +
          "&child_first_name=" + childFirstName +
          "&child_last_name=" + childLastName +
          "&child_issue_country=" + childIssueCountry +
          "&child_passport_expiry_date=" + childPassportExpiryDate +
          "&child_passport_no=" + childPassportNo +
          // "&child_frequentFlyrNum=" + childFrequentFlyrNum +
          // "&childMealplan=" + childMealplan +
          "&infant_dob=" + infantDob + 
          "&infant_gender=" + infantGender +
          "&infant_first_name=" + infantFirstName +
          "&infant_last_name=" + infantLastName +
          "&infant_title=" + infantTitle +
          "&infant_issue_country=" + infantIssueCountry +
          "&infant_passport_expiry_date=" + infantPassportExpiryDate +
          "&infant_passport_no=" + infantPassportNo +
          // "&infant_frequentFlyrNum=" + infantFrequentFlyrNum +
          // "&frequentFlyrNum=" + frequentFlyrNum +
          // "&type=" + type +
          "&IsPassportMandatory=" + IsPassportMandatory +
          "&baggage=" + baggage +
          "&FareSourceCode=" + fareSourceCode +
          "&customer_id=" + customerId +
          "&markup=" + markup +
          "&travel_date=" + travelDate;
          // "&PostCode=" + PostCode;
          console.log(url); 
          this.nativeHttp.get(url, {}, {}).then(data => {
          console.log("reval",data.data);
          let data1 = JSON.parse(data.data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
          } else {
            resolve(data1.BookFlightResponse.BookFlightResult);
            console.log(data1)
          }
        }).catch(err=>{
          reject("Some error Occured");
        });
      }else{
        reject("Invalid Session Id");
      }
    });
  }
  flightRDBook(areaCode,countryCode,firstName,lastName, title, emailId, mobileNo, dob, gender,
     adultFlight, childFlight, infantFlight,childDob,childGender,childTitle, childFirstName,
    childLastName, infantDob, infantGender, infantFirstName, infantLastName, infantTitle,
    IsPassportMandatory,baggage,fareSourceCode,fareSourceCodeTwo, customerId,markup,travelDate) {
    return new Promise((resolve, reject) => {
      let session_id = this.sess_id || localStorage.getItem("session_id");
      if (session_id) {
        const url =
          PROD_TRAWEX_BASE_URL +
          "book_round?user_id=" + USER_ID +
          "&user_password=" + USER_PASSWORD +
          "&ip_address=" + IP_ADDRESS +
          "&access=" + ACCESS +
          "&target=" + TARGET +
          "&sessionId=" + session_id +
          "&area_code=" + areaCode +
          "&country_code=" + countryCode +
          "&first_name=" + firstName +
          "&last_name=" + lastName +
          "&title=" + title +
          "&email_id=" + emailId +
          "&mobile_no=" + mobileNo +
          "&dob=" + dob +
          "&gender=" + gender +
          // "&issue_country=" + issueCountry +
          // "&passport_expiry=" + passportExpiry +
          // "&passport_no=" + passportNo +
          // "&adult_frequentFlyrNum=" + adultFrequentFlyrNum +
          // "&adultmealplan=" + adultmealplan +
          "&adult_flight=" + adultFlight +
          "&child_flight=" + childFlight +
          "&infant_flight=" + infantFlight +
          "&child_dob=" + childDob +
          "&child_gender=" + childGender +
          "&child_title=" + childTitle +
          "&child_first_name=" + childFirstName +
          "&child_last_name=" + childLastName +
          // "&child_issue_country=" + childIssueCountry +
          // "&child_passport_expiry_date=" + childPassportExpiryDate +
          // "&child_passport_no=" + childPassportNo +
          // "&child_frequentFlyrNum=" + childFrequentFlyrNum +
          // "&childMealplan=" + childMealplan +
          "&infant_dob=" + infantDob + 
          "&infant_gender=" + infantGender +
          "&infant_first_name=" + infantFirstName +
          "&infant_last_name=" + infantLastName +
          "&infant_title=" + infantTitle +
          // "&infant_issue_country=" + infantIssueCountry +
          // "&infant_passport_expiry_date=" + infantPassportExpiryDate +
          // "&infant_passport_no=" + infantPassportNo +
          // "&infant_frequentFlyrNum=" + infantFrequentFlyrNum +
          // "&frequentFlyrNum=" + frequentFlyrNum +
          // "&type=" + type +
          "&IsPassportMandatory=" + IsPassportMandatory +
          "&baggage=" + baggage +
          "&FareSourceCode=" + fareSourceCode +
          "&FareSourceCode2=" + fareSourceCodeTwo +
          "&customer_id=" + customerId +
          "&markup=" + markup+
          "&travel_date=" + travelDate;
          // "&PostCode=" + PostCode;
          console.log(url); 
          this.nativeHttp.get(url, {}, {}).then(data => {
          console.log("reval",data.data);
          let data1 = JSON.parse(data.data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
          } else {
            resolve(data1);
            console.log(data1)
          }
        }).catch(err=>{
          reject("Some error Occured");
        });
      }else{
        reject("Invalid Session Id");
      }
    });
  }
  flightBookRound(areaCode,countryCode,firstName,lastName, title, emailId, mobileNo, dob, gender,issueCountry, passportExpiry,
    passportNo, adultFlight, childFlight, infantFlight,childDob,childGender,
    childTitle, childFirstName, childLastName,  childIssueCountry, childPassportExpiryDate, childPassportNo,
    infantDob, infantGender, infantFirstName, infantLastName, infantTitle, infantIssueCountry, infantPassportExpiryDate,
    infantPassportNo, IsPassportMandatory,baggage, fareSourceCode, customerId,markup,travelDate) {
    return new Promise((resolve, reject) => {
      let session_id = this.sess_id || localStorage.getItem("session_id");
      if (session_id) {
        const url =
          PROD_TRAWEX_BASE_URL +
          "book_round?user_id=" + USER_ID +
          "&user_password=" + USER_PASSWORD +
          "&ip_address=" + IP_ADDRESS +
          "&access=" + ACCESS +
          "&target=" + TARGET +
          "&sessionId=" + session_id +
          "&area_code=" + areaCode +
          "&country_code=" + countryCode +
          "&first_name=" + firstName +
          "&last_name=" + lastName +
          "&title=" + title +
          "&email_id=" + emailId +
          "&mobile_no=" + mobileNo +
          "&dob=" + dob +
          "&gender=" + gender +
          "&issue_country=" + issueCountry +
          "&passport_expiry=" + passportExpiry +
          "&passport_no=" + passportNo +
          // "&adult_frequentFlyrNum=" + adultFrequentFlyrNum +
          // "&adultmealplan=" + adultmealplan +
          "&adult_flight=" + adultFlight +
          "&child_flight=" + childFlight +
          "&infant_flight=" + infantFlight +
          "&child_dob=" + childDob +
          "&child_gender=" + childGender +
          "&child_title=" + childTitle +
          "&child_first_name=" + childFirstName +
          "&child_last_name=" + childLastName +
          "&child_issue_country=" + childIssueCountry +
          "&child_passport_expiry_date=" + childPassportExpiryDate +
          "&child_passport_no=" + childPassportNo +
          // "&child_frequentFlyrNum=" + childFrequentFlyrNum +
          // "&childMealplan=" + childMealplan +
          "&infant_dob=" + infantDob + 
          "&infant_gender=" + infantGender +
          "&infant_first_name=" + infantFirstName +
          "&infant_last_name=" + infantLastName +
          "&infant_title=" + infantTitle +
          "&infant_issue_country=" + infantIssueCountry +
          "&infant_passport_expiry_date=" + infantPassportExpiryDate +
          "&infant_passport_no=" + infantPassportNo +
          // "&infant_frequentFlyrNum=" + infantFrequentFlyrNum +
          // "&frequentFlyrNum=" + frequentFlyrNum +
          // "&type=" + type +
          "&IsPassportMandatory=" + IsPassportMandatory +
          "&baggage=" + baggage +
          "&FareSourceCode=" + fareSourceCode +
          "&customer_id=" + customerId +
          "&markup=" + markup+
          "&travel_date=" + travelDate;
          // "&PostCode=" + PostCode;
          console.log(url); 
          this.nativeHttp.get(url, {}, {}).then(data => {
          console.log("reval",data.data);
          let data1 = JSON.parse(data.data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
          } else {
            resolve(data1.BookFlightResponse.BookFlightResult);
            console.log(data1)
          }
        }).catch(err=>{
          reject("Some error Occured");
        });
      }else{
        reject("Invalid Session Id");
      }
    });
  }
   
  flightBookMulti(areaCode,countryCode,firstName,lastName, title, emailId, mobileNo, dob, gender,issueCountry, passportExpiry,
    passportNo, adultFlight, childFlight, infantFlight,childDob,childGender,
    childTitle, childFirstName, childLastName,  childIssueCountry, childPassportExpiryDate, childPassportNo,
    infantDob, infantGender, infantFirstName, infantLastName, infantTitle, infantIssueCountry, infantPassportExpiryDate,
    infantPassportNo, IsPassportMandatory,baggage, fareSourceCode, customerId,markup,travelDate) {
    return new Promise((resolve, reject) => {
      let session_id = this.sess_id || localStorage.getItem("session_id");
      if (session_id) {
        const url =
          PROD_TRAWEX_BASE_URL +
          "book_multi?user_id=" + USER_ID +
          "&user_password=" + USER_PASSWORD +
          "&ip_address=" + IP_ADDRESS +
          "&access=" + ACCESS +
          "&target=" + TARGET +
          "&sessionId=" + session_id +
          "&area_code=" + areaCode +
          "&country_code=" + countryCode +
          "&first_name=" + firstName +
          "&last_name=" + lastName +
          "&title=" + title +
          "&email_id=" + emailId +
          "&mobile_no=" + mobileNo +
          "&dob=" + dob +
          "&gender=" + gender +
          "&issue_country=" + issueCountry +
          "&passport_expiry=" + passportExpiry +
          "&passport_no=" + passportNo +
          // "&adult_frequentFlyrNum=" + adultFrequentFlyrNum +
          // "&adultmealplan=" + adultmealplan +
          "&adult_flight=" + adultFlight +
          "&child_flight=" + childFlight +
          "&infant_flight=" + infantFlight +
          "&child_dob=" + childDob +
          "&child_gender=" + childGender +
          "&child_title=" + childTitle +
          "&child_first_name=" + childFirstName +
          "&child_last_name=" + childLastName +
          "&child_issue_country=" + childIssueCountry +
          "&child_passport_expiry_date=" + childPassportExpiryDate +
          "&child_passport_no=" + childPassportNo +
          // "&child_frequentFlyrNum=" + childFrequentFlyrNum +
          // "&childMealplan=" + childMealplan +
          "&infant_dob=" + infantDob + 
          "&infant_gender=" + infantGender +
          "&infant_first_name=" + infantFirstName +
          "&infant_last_name=" + infantLastName +
          "&infant_title=" + infantTitle +
          "&infant_issue_country=" + infantIssueCountry +
          "&infant_passport_expiry_date=" + infantPassportExpiryDate +
          "&infant_passport_no=" + infantPassportNo +
          // "&infant_frequentFlyrNum=" + infantFrequentFlyrNum +
          // "&frequentFlyrNum=" + frequentFlyrNum +
          // "&type=" + type +
          "&IsPassportMandatory=" + IsPassportMandatory +
          "&baggage=" + baggage +
          "&FareSourceCode=" + fareSourceCode +
          "&customer_id=" + customerId +
          "&markup=" + markup+
          "&travel_date=" + travelDate;
          // "&PostCode=" + PostCode;
          console.log(url); 
          this.nativeHttp.get(url, {}, {}).then(data => {
          console.log("reval",data.data);
          let data1 = JSON.parse(data.data);
          if (data1.Errors) {
            if (data1.Errors.ErrorCode == "ERSER002") {
              reject("Invalid Session Id");
            }
          } else {
            resolve(data1.BookFlightResponse.BookFlightResult);
            console.log(data1)
          }
        }).catch(err=>{
          reject("Some error Occured");
        });
      }else{
        reject("Invalid Session Id");
      }
    });
  }

    getAdminBalance(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const url = APP_HOME_PAGE + "admin_balance" 
            console.log(url)
            this.nativeHttp.get(url, {}, {}) .then(data => {
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
        } catch (err) {
          reject(err);
        }
      });
    }

    
    getMarkup():Promise<any[]> {
      return new Promise((resolve) => {
        const url = FLIGHT_MARKUP_URL + "flight_markup" ;
        this.http.get(url).subscribe(data=>{
          let  hotdeals = <any[]>data;
          resolve(hotdeals);       
       });
     });
    }



    getcurrency(to):Promise<any[]> {
      return new Promise((resolve) => {
        const url = PROD_TRAWEX_CURRENCY_URL + "update_currency_api?to=" + to;
        this.http.get(url).subscribe(data=>{
          let  hotdeals = <any[]>data;
          resolve(hotdeals);       
       });
     });
    }

    getUsdcurrency(to):Promise<any[]> {
      return new Promise((resolve) => {
        const url = PROD_TRAWEX_CURRENCY_URL + "currency_to_usd/" + to;
        this.http.get(url).subscribe(data=>{
          let  hotdeals = <any[]>data;
          resolve(hotdeals);       
       });
     });
    }

    getcurrenc(to):Promise<any>{
      return new Promise((resolve, reject) => {
        try {
          const url = PROD_TRAWEX_CURRENCY_URL + "update_currency_api?to=" + to;
          this.nativeHttp.get(url, {}, {}).then(data => {
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
