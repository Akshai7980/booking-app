import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the JsonSearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JsonSearchProvider {
  countryDetails = [];
  airportDetails = [];
  airlineDetails = [];
  transferRegions = [];
  airportHotelDetails = [];
  airlineHotelDetails = [];
  constructor(public http: HttpClient) {
    console.log("in json search")
    this.getAirlineResult();
    this.getAirportResult();
    this.getAirlineHotelResult();
    this.getAirportHotelResult();
    this.getIsdResult();
    this.getTransferRegion();
  }

  getSearchCountryCodeResult(term) {
    if (this.countryDetails.length > 0) {
      return this.searchContryCode(term);
    } else {
      this.getIsdResult().then(data => {
        return this.searchContryCode(term);
      });
    }
  }

  searchContryCode(term) {
    return this.countryDetails.filter(country => {
      return (
        country.name.toUpperCase().match(term.toUpperCase()) ||
        country.unNum.toUpperCase().match(term.toUpperCase())
      );
    });
  }

  getIsdResult() {
    return new Promise(resolve => {
      this.http.get("../assets/json/isd.json").subscribe(data => {
        this.countryDetails = <any[]>data;
        console.log(this.countryDetails);
        resolve(this.countryDetails);
      });
    });
  }

  getSearchAirportResult(term) {
    if (this.airportDetails.length > 0) {
      return this.searchAirports(term);
    } else {
      this.getAirportResult().then(data => {
        return this.searchAirports(term);
      });
    }
  }

  getAirportResult() {
    return new Promise(resolve => {
      this.http.get("../assets/json/airport.json").subscribe(data => {
        this.airportDetails = <any[]>data;
        resolve(this.airportDetails);
      });
    });
  }

  searchAirports(term) {
    let airports = [];
    for (let i = 0; i < this.airportDetails.length; i++) {
      if (airports.length <= 20) {
        if (
          this.airportDetails[i].AirportCode.toUpperCase().match(
            term.toUpperCase()
          ) ||
          this.airportDetails[i].City.toUpperCase().match(term.toUpperCase())
        ) {
          airports.push(this.airportDetails[i]);
        }
      } else {
        break;
      }
    }
    return airports;
  }

  getAirlineName(airlineCode) {
    if (this.airlineDetails.length > 0) {
      return this.airlineDetails.filter(airline => {
        return airline.AirLineCode == airlineCode;
      })[0];
    } else {
      this.getAirlineResult().then(data => {
        return this.airlineDetails.filter(airline => {
          return airline.AirLineCode == airlineCode;
        })[0];
      });
    }
  }

  getAirlineResult() {
    console.log("getAirlineResult")
    return new Promise(resolve => {
      this.http.get("../assets/json/airline.json").subscribe(data => {
        this.airlineDetails = <any[]>data;
        resolve(this.airlineDetails);
      });
    });
  }

  getAirportName(airportCode) {
    if (this.airportDetails.length > 0) {
      return this.airportDetails.filter(airport => {
        return airport.AirportCode == airportCode;
      })[0];
    } else {
      this.getAirportResult().then(data => {
        return this.airportDetails.filter(airport => {
          return airport.AirportCode == airportCode;
        })[0];
      });
    }
  }

  getTransferRegion() {
    return new Promise(resolve => {
      this.http.get("../assets/json/transfer_region.json").subscribe(data => {
        this.transferRegions = <any[]>data;
        console.log(this.transferRegions);
        resolve(this.transferRegions);
      });
    });
  }
  
  getSearchAirportHotelResult(term) {
    if (this.airportHotelDetails.length > 0) {
      return this.searchHotelAirports(term);
    } else {
      this.getAirlineHotelResult().then(data => {
        return this.searchHotelAirports(term);
      });
    }
  }

  getAirportHotelResult() {
    return new Promise(resolve => {
      this.http.get("../assets/json/hotel-airport.json").subscribe(data => {
        this.airportHotelDetails = <any[]>data;
        resolve(this.airportHotelDetails);
      });
    });
  }

  searchHotelAirports(term) {
    let airports = [];
    for (let i = 0; i < this.airportHotelDetails.length; i++) {
      if (airports.length <= 20) {
        if (
          this.airportHotelDetails[i].AirportCode.toUpperCase().match(term.toUpperCase()) ||
          this.airportHotelDetails[i].City.toUpperCase().match(term.toUpperCase())
        ) {
          airports.push(this.airportHotelDetails[i]);
        }
      } else {
        break;
      }
    }
    return airports;
  }

  getAirlineHOtelName(airlineCode) {
    if (this.airlineHotelDetails.length > 0) {
      return this.airlineHotelDetails.filter(airline => {
        return airline.AirLineCode == airlineCode;
      })[0];
    } else {
      this.getAirlineHotelResult().then(data => {
        return this.airlineHotelDetails.filter(airline => {
          return airline.AirLineCode == airlineCode;
        })[0];
      });
    }
  }

  getAirlineHotelResult() {
    console.log("getAirlineHotelResult")
    return new Promise(resolve => {
      this.http.get("../assets/json/airline.json").subscribe(data => {
        this.airlineHotelDetails = <any[]>data;
        resolve(this.airlineHotelDetails);
      });
    });
  }

  getAirportHotelName(airportCode) {
    if (this.airportHotelDetails.length > 0) {
      return this.airportHotelDetails.filter(airport => {
        return airport.AirportCode == airportCode;
      })[0];
    } else {
      this.getAirportHotelResult().then(data => {
        return this.airportHotelDetails.filter(airport => {
          return airport.AirportCode == airportCode;
        })[0];
      });
    }
  }

}
