import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { PROD_TRAWEX_MY_PAYMENT_URL } from "../constants/constants";

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {
  
  constructor(public http: HttpClient, public nativeHttp:HTTP) {
    console.log('Hello PaymentProvider Provider');
  }
  
  SendPayment(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_MY_PAYMENT_URL;
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log("secrateCode",data)
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


  GetPaymentCallback(MID,CUST_ID,INDUSTRY_TYPE_ID,CHANNEL_ID,TXN_AMOUNT,WEBSITE,ORDER_ID): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_MY_PAYMENT_URL + "process?CUST_ID=" + CUST_ID +
        "&MID=" + MID +
        "&INDUSTRY_TYPE_I=" +  INDUSTRY_TYPE_ID +
        "&CHANNEL_ID=" +  CHANNEL_ID +
        "&TXN_AMOUNT=" +  TXN_AMOUNT +
        "&WEBSITE=" +  WEBSITE +
        "&ORDER_ID" + ORDER_ID;
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(data.data)
            if (data && data.status == 200) {
              try {
                if (JSON.parse(data.data).hotels) {
                  resolve(JSON.parse(data.data));
                } else {
                  reject(JSON.parse(data.data));
                }
              } catch (err) {
                reject(err);
              }
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

  


