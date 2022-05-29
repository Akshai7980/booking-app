import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { CAR_SEARCH_BASE_URL, CAR_USER_ID, CAR_USER_PASSWORD, ACCESS, IP_ADDRESS, TARGET } from '../constants/constants';
import * as xml2js from "xml2js";
// import * as xml2json from "xml2json";

/*
  Generated class for the CarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarProvider {
 // parser = require('xml2json');
   option={
  explicitCharkey: false, trim: true, normalize: true, normalizeTags: true,
  attrkey: "", charkey: "", rootName: 'root',
  explicitArray: true, ignoreAttrs: false, mergeAttrs: true, explicitRoot: false,headless: false,
  validator: null, xmlns: false, explicitChildren: false, preserveChildrenOrder: false,
  childkey: '$$', emptyTag: '',
  charsAsChildren: false, includeWhiteChars: false, async: false, strict: true,
  attrNameProcessors: null, attrValueProcessors: null, tagNameProcessors: null, valueProcessors: null,
  xmldec: { 'version': '1.0', 'encoding': 'UTF-8', 'standalone': true },
  doctype: null,
  renderOpts: {'pretty': true, 'indent': '  ', 'newline': '\n' },
  chunkSize: 10000, cdata: false
  }
  constructor(public http: HttpClient, public nativeHttp:HTTP) {
    console.log('Hello CarProvider Provider');
  }

  getCarCitySeach(term): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = CAR_SEARCH_BASE_URL + "car_destinations_auto?text=" + term;
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


  
  getCarSeach(pickUPCode,dropOffCode,pickUpDate,pickUpTime,dropOffDate,dropOffTime,sameLocation,residentCountry,driverAge,currency): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = CAR_SEARCH_BASE_URL +
        "car_search?user_id=" + CAR_USER_ID+
        "&user_password="+CAR_USER_PASSWORD+
        "&access="+ACCESS+
        "&ip_address="+IP_ADDRESS+
        "&pickup_code="+pickUPCode+
        "&dropoff_code="+dropOffCode+
        "&pickup_date="+pickUpDate+
        "&pickup_time="+pickUpTime+
        "&dropoff_date="+dropOffDate+
        "&dropoff_time="+dropOffTime+
        "&same_location="+sameLocation+
        "&country_res="+residentCountry+
        "&driver_age="+driverAge +
        "&currency=" + currency
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(url,data.data)
            if (data.status == 200) {
            //  console.log(this.parser.toJson(data.data));
              xml2js.parseString(data.data, this.option, function (err, result) {
                console.log(result,result.errors,result.vehavailrscore,result.ota_vehavailraters);
                if(result.errors){
                  resolve([])
                }else{
                  resolve(result.vehavailrscore)
                }
                });
              //  xml2js
           //   resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            console.log("err",url,err)
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getCarRentalCondtions(pickUpDate,dropOffDate,pickUpTime,dropOffTime,pickUPCode,dropOffCode,residentCountry,referenceId,referenceDateTime,referenceUrl): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = CAR_SEARCH_BASE_URL + "rental_conditions?user_id=" + CAR_USER_ID+
        "&user_password="+CAR_USER_PASSWORD+
        "&access="+ACCESS+
        "&ip_address="+IP_ADDRESS+
        "&target="+TARGET+
        "&pick="+pickUpDate+
        "&drop="+dropOffDate+
        "&pick_time="+pickUpTime+
        "&drop_time="+dropOffTime+
        "&loc_from="+pickUPCode+
        "&loc_to="+dropOffCode+
        "&country="+residentCountry+
        "&ref_id="+referenceId+
        "&fuldate="+referenceDateTime+
        "&ref_url="+referenceUrl

        this.nativeHttp .get(url, {}, {}).then(data => {
          console.log("dattastasa", url, data)
            if (data.status == 200) {
              xml2js.parseString(data.data, this.option, function (err, result) {
                console.log("alldata-inxml",result);
                if(result.errors){
                  reject(result.errors)
                }else{
                  resolve({rentalconditions:result.rentalconditions,rentalconditionssummary:result.rentalconditionssummary})
                }
                });
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

  getCarBooking(pickUPCode,dropOffCode,pickUpDate,pickUpTime,dropOffDate,dropOffTime,title,fName,lName,email,
    areaCode,phone,country,city,custStateCode,address,driverAge,postCode,cardType,ccType,ccNumber,
    ccMonth,ccYear,ccCode,CardHolderName,airlinesCode,flightNumber,referenceUrl,refId,fulDate,driverFirstName,driverLastName,residentCountry): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = CAR_SEARCH_BASE_URL + "car_book?user_id=" + CAR_USER_ID+
        "&user_password="+CAR_USER_PASSWORD+
        "&access="+ACCESS+
        "&ip_address="+IP_ADDRESS+
        "&pickup_code="+pickUPCode +
        "&dropoff_code="+dropOffCode +
        "&pickup_date="+pickUpDate +
        "&pickup_time="+ pickUpTime +
        "&dropoff_date="+ dropOffDate +
        "&dropoff_time="+ dropOffTime +
        "&title="+ title +
        "&first_name="+fName+
        "&last_name="+lName+
        "&emailid="+email +
        "&areacode=" + areaCode +
        "&phone_no=" + phone +
        "&country=" + country +
        "&city=" + city +
        "&cust_state_code=" + custStateCode +
        "&address=" + address + 
        "&driver_age=" + driverAge +
        "&postcode=" + postCode + 
        "&CardType=" + cardType +
        "&*cc_type=" + ccType +
        "&cc_number=" + ccNumber + 
        "&cc_mo=" + ccMonth +
        "&cc_yr=" + ccYear +
        "&cc_code=" + ccCode +
        "&cardholdername=" + CardHolderName +
        "&airline_code=" + airlinesCode +
        "&flight_number=" + flightNumber + 
        "&Reference_URL=" + referenceUrl +
        "&ref_id=" + refId +
        "&fuldate=" + fulDate +
        "&driver_first_name=" + driverFirstName +
        "&driver_last_name=" + driverLastName +
        "&country_res=" + residentCountry;

        this.nativeHttp .get(url, {}, {}).then(data => {
          console.log("dattastasa", url, data)
            if (data.status == 200) {
              xml2js.parseString(data.data, this.option, function (err, result) {
                console.log("alldata-inxml",result);
                if(result.errors){
                  reject(result.errors)
                }else{
                  resolve({rentalconditions:result.rentalconditions,rentalconditionssummary:result.rentalconditionssummary})
                }
                });
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
