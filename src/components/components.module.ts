import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { Ionic2RatingModule } from 'ionic2-rating';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { SearchCountryCodeComponent } from "./search-country-code/search-country-code";
import { AddFlightTravellersComponent } from "./add-flight-travellers/add-flight-travellers";
import { AddHotelRoomsComponent } from "./add-hotel-rooms/add-hotel-rooms";
import { FlightFilterComponent } from './flight-filter/flight-filter';
import { HotelFilterComponent } from './hotel-filter/hotel-filter';
import { TruncatedTextComponent } from './truncated-text/truncated-text';
import { SightSeeingLocationSearchComponent } from './sight-seeing-location-search/sight-seeing-location-search';
import { AddFlightHotelTravelsComponent } from './add-flight-hotel-travels/add-flight-hotel-travels';
import { AddSightSeeingTravelsComponent } from './add-sight-seeing-travels/add-sight-seeing-travels';
import { CruiseCountryComponent } from './cruise-country/cruise-country';
import { PortComponent } from './port/port';
import { FlightFilterDomesticComponent } from './flight-filter-domestic/flight-filter-domestic';
import { ProgressBarComponent } from './progress-bar/progress-bar';



@NgModule({
  declarations: [
    SearchCountryCodeComponent,
    AddFlightTravellersComponent,
    AddHotelRoomsComponent,
    FlightFilterComponent,
    HotelFilterComponent,
    TruncatedTextComponent,
    SightSeeingLocationSearchComponent,
    AddFlightHotelTravelsComponent,
    AddSightSeeingTravelsComponent,
    CruiseCountryComponent,
    PortComponent,
    FlightFilterDomesticComponent,
    ProgressBarComponent
   
  ],
  imports: [IonicModule, Ionic2RatingModule, TruncateModule],
  exports: [
    SearchCountryCodeComponent,
    AddFlightTravellersComponent,
    AddHotelRoomsComponent,
    FlightFilterComponent,
    HotelFilterComponent,
    TruncatedTextComponent,
    SightSeeingLocationSearchComponent,
    AddFlightHotelTravelsComponent,
    AddSightSeeingTravelsComponent,
    CruiseCountryComponent,
    PortComponent,
    FlightFilterDomesticComponent,
    ProgressBarComponent
  
  ],
  entryComponents: [
    SearchCountryCodeComponent,
    AddFlightTravellersComponent,
    AddHotelRoomsComponent,
    FlightFilterComponent,
    HotelFilterComponent,
    TruncatedTextComponent,
    SightSeeingLocationSearchComponent,
    AddFlightHotelTravelsComponent,
    AddSightSeeingTravelsComponent,
    CruiseCountryComponent,
    PortComponent,
    FlightFilterDomesticComponent,
    ProgressBarComponent
  ]
})
export class ComponentsModule {}
