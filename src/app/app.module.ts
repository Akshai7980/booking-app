import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule  } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HTTP } from '@ionic-native/http';
import { Camera } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Stripe } from '@ionic-native/stripe';
import { PayPal } from '@ionic-native/paypal';
// import { OneSignal } from '@ionic-native/onesignal';
import { HotDealsProvider } from '../providers/hot-deals/hot-deals';
import { ConstantsProvider } from "../providers/constants/constants";
import { LoginProvider } from '../providers/login/login';
import { JsonSearchProvider } from '../providers/json-search/json-search';
import { BookingInfoProvider } from '../providers/booking-info/booking-info';
import { HotelsProvider } from '../providers/hotels/hotels';
import { FlightsProvider } from '../providers/flights/flights';
import { TransferProvider } from '../providers/transfer/transfer';
import { CarProvider } from '../providers/car/car';
import { SightSeeingProvider } from '../providers/sight-seeing/sight-seeing';
import { CruiseProvider } from '../providers/cruise/cruise';
import { HolidaysProvider } from '../providers/holidays/holidays';
import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from "../components/components.module";

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { MyHomePageModule } from '../pages/my-home/my-home.module';
import { MyAccountPageModule } from "../pages/my-account/my-account.module";
import { MyTripsPageModule } from "../pages/my-trips/my-trips.module";
import { MorePageModule } from "../pages/more/more.module";
import { MyBookingsPageModule } from "../pages/my-bookings/my-bookings.module";
import { MyProfilePageModule } from "../pages/my-profile/my-profile.module";
import { LoginPageModule } from "../pages/login/login.module";
import { RegisterPageModule } from "../pages/register/register.module";
import { ChangePasswordPageModule } from "../pages/change-password/change-password.module";
import { MyTransactionsPageModule } from "../pages/my-transactions/my-transactions.module";
import { AboutUsPageModule } from "../pages/about-us/about-us.module";
import { HelpSuportPageModule } from "../pages/help-suport/help-suport.module";
import { PrivacyPolicyPageModule } from '../pages/privacy-policy/privacy-policy.module';

import { AirportSearchPageModule } from "../pages/airport-search/airport-search.module";
import { FlightBookingVoucherPageModule } from "../pages/flight-booking-voucher/flight-booking-voucher.module";
import { FlightSearchEnginePageModule } from "../pages/flight-search-engine/flight-search-engine.module";
import { FlightSearchResultsPageModule } from "../pages/flight-search-results/flight-search-results.module";
import { FlightSearchTwoWayResultsPageModule } from "../pages/flight-search-two-way-results/flight-search-two-way-results.module";
import { FlightSearchMultiWayResultsPageModule } from "../pages/flight-search-multi-way-results/flight-search-multi-way-results.module";
import { SomethingWentWrongPageModule } from "../pages/something-went-wrong/something-went-wrong.module";
import { NoResultPageModule } from "../pages/no-result/no-result.module";
import { FlightDetailPageModule } from "../pages/flight-detail/flight-detail.module";
import { FlightDetailTwoWayPageModule } from "../pages/flight-detail-two-way/flight-detail-two-way.module";
import { FlightDetailMultiWayPageModule } from "../pages/flight-detail-multi-way/flight-detail-multi-way.module";
import { FlightFareRulePageModule } from "../pages/flight-fare-rule/flight-fare-rule.module";
import { FlightTravellerDetailPageModule } from "../pages/flight-traveller-detail/flight-traveller-detail.module";
import { FlightAddTravellerPageModule } from "../pages/flight-add-traveller/flight-add-traveller.module";

import { HotelResultsPageModule } from "../pages/hotel-results/hotel-results.module";
import { HotelResultsSearchPageModule } from "../pages/hotel-results-search/hotel-results-search.module";
import { HotelDetailPageModule } from "../pages/hotel-detail/hotel-detail.module";
import { HotelReviewPageModule } from "../pages/hotel-review/hotel-review.module";
import { HotelAddGuestPageModule } from "../pages/hotel-add-guest/hotel-add-guest.module";
import { HotelClusterMapPageModule } from "../pages/hotel-cluster-map/hotel-cluster-map.module";
import { HotelBookingVoucherPageModule } from "../pages/hotel-booking-voucher/hotel-booking-voucher.module";
import { HotelSearchEnginePageModule } from "../pages/hotel-search-engine/hotel-search-engine.module";
import { HotelCitySearchPageModule } from "../pages/hotel-city-search/hotel-city-search.module";

import { TransferSearchEnginePageModule } from "../pages/transfer-search-engine/transfer-search-engine.module";
import { TransferResultsPageModule } from "../pages/transfer-results/transfer-results.module";
import { TransferDetailPageModule } from "../pages/transfer-detail/transfer-detail.module";
import { TransferReviewPageModule } from '../pages/transfer-review/transfer-review.module';
import { TransferVoucherPageModule } from '../pages/transfer-voucher/transfer-voucher.module';
import { TransferSearchPageModule } from '../pages/transfer-search/transfer-search.module';

import { HolidayResultsPageModule } from "../pages/holiday-results/holiday-results.module";
import { HolidayDetailsPageModule } from "../pages/holiday-details/holiday-details.module";
import { HolidaySearchEnginePageModule } from "../pages/holiday-search-engine/holiday-search-engine.module";
import { HolidayPackageSearchPageModule } from "../pages/holiday-package-search/holiday-package-search.module";
import { HolidayTravellerDetailPageModule } from "../pages/holiday-traveller-detail/holiday-traveller-detail.module";
import { HolidayBookingVoucherPageModule } from '../pages/holiday-booking-voucher/holiday-booking-voucher.module';
import { HolidayAddTravellerPageModule } from '../pages/holiday-add-traveller/holiday-add-traveller.module';

import { TestPageModule } from "../pages/test/test.module";


import { FlightHotelSearchEnginePageModule } from '../pages/flight-hotel-search-engine/flight-hotel-search-engine.module';
import { FlightHotelResultsPageModule } from '../pages/flight-hotel-results/flight-hotel-results.module';
import { FlightHotelDetailsPageModule } from '../pages/flight-hotel-details/flight-hotel-details.module';
import { FlightFlightResultsPageModule } from '../pages/flight-flight-results/flight-flight-results.module';
import { FlightFightDetailPageModule } from '../pages/flight-fight-detail/flight-fight-detail.module';
import { FlightHotelTravellerDetailPageModule } from '../pages/flight-hotel-traveller-detail/flight-hotel-traveller-detail.module';
import { FlightHotelReviewPageModule } from '../pages/flight-hotel-review/flight-hotel-review.module';
import { FlightHotelBookingVoucherPageModule } from '../pages/flight-hotel-booking-voucher/flight-hotel-booking-voucher.module';
import { FlightAirportSearchPageModule } from '../pages/flight-airport-search/flight-airport-search.module';
import { DomesticFlightRulesPageModule } from '../pages/domestic-flight-rules/domestic-flight-rules.module';
import { FlightTwoWayTravllerDetailPageModule } from '../pages/flight-two-way-travller-detail/flight-two-way-travller-detail.module';
import { FlightTwoWayVoucherPageModule } from '../pages/flight-two-way-voucher/flight-two-way-voucher.module';
import { FlightMultiWatTravllerPageModule } from '../pages/flight-multi-wat-travller/flight-multi-wat-travller.module';
import { FlightMultiWayVoucherPageModule } from '../pages/flight-multi-way-voucher/flight-multi-way-voucher.module';
import { CarSearchEnginePageModule } from '../pages/car-search-engine/car-search-engine.module';
import { CarResultsPageModule } from '../pages/car-results/car-results.module';
import { CarRentalDetailPageModule } from '../pages/car-rental-detail/car-rental-detail.module';
import { CarCitySearchPageModule } from '../pages/car-city-search/car-city-search.module';
import { CarTravellerDetailPageModule } from '../pages/car-traveller-detail/car-traveller-detail.module';
import { CarBookingVoucherPageModule } from '../pages/car-booking-voucher/car-booking-voucher.module';
import { SightSeeingCitySearchPageModule } from '../pages/sight-seeing-city-search/sight-seeing-city-search.module';
import { SightSeeingSearchEnginePageModule } from '../pages/sight-seeing-search-engine/sight-seeing-search-engine.module';
import { SightSeeingResultsPageModule } from '../pages/sight-seeing-results/sight-seeing-results.module';
import { SightSeeingDetailPageModule } from '../pages/sight-seeing-detail/sight-seeing-detail.module';
import { SightSeeingVoucherPageModule } from '../pages/sight-seeing-voucher/sight-seeing-voucher.module';
import { BundleSaveSearchEnginePageModule } from '../pages/bundle-save-search-engine/bundle-save-search-engine.module';
import { CruiseSearchPageModule } from '../pages/cruise-search/cruise-search.module';
import { CruiseSearchEnginePageModule } from '../pages/cruise-search-engine/cruise-search-engine.module';
import { CruiseResultsPageModule } from '../pages/cruise-results/cruise-results.module';
import { CruiseItineraryPageModule } from '../pages/cruise-itinerary/cruise-itinerary.module';
import { CruiseDetailsPageModule } from '../pages/cruise-details/cruise-details.module';
import { CruiseReviewPageModule } from '../pages/cruise-review/cruise-review.module';
import { CruiseVoucherPageModule } from '../pages/cruise-voucher/cruise-voucher.module';
import { CruiseAddTravellerPageModule } from '../pages/cruise-add-traveller/cruise-add-traveller.module';
import { MyHotelResultsPageModule } from '../pages/my-hotel-results/my-hotel-results.module';
import { FlightHotelAddGuestPageModule } from '../pages/flight-hotel-add-guest/flight-hotel-add-guest.module';
import { FlightTransferResultsPageModule } from '../pages/flight-transfer-results/flight-transfer-results.module';
import { HotelPreviewPageModule } from '../pages/hotel-preview/hotel-preview.module';
import { SpalshPageModule } from '../pages/spalsh/spalsh.module';
import { PaymentProvider } from '../providers/payment/payment';






@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages:true}),
    HttpClientModule,
    ComponentsModule,
    DirectivesModule,
    HomePageModule,
    MyHomePageModule,
    MyAccountPageModule,
    MyTripsPageModule,
    MorePageModule,
    MyBookingsPageModule,
    MyProfilePageModule,
    LoginPageModule,
    RegisterPageModule,
    ChangePasswordPageModule,
    MyTransactionsPageModule,
    AboutUsPageModule,
    HelpSuportPageModule,
    FlightBookingVoucherPageModule,
    HotelBookingVoucherPageModule,
    FlightSearchEnginePageModule,
    AirportSearchPageModule,
    HotelSearchEnginePageModule,
    HotelCitySearchPageModule,
    TransferSearchEnginePageModule,
    FlightSearchResultsPageModule,
    FlightSearchTwoWayResultsPageModule,
    FlightSearchMultiWayResultsPageModule,
    SomethingWentWrongPageModule,
    NoResultPageModule,
    FlightDetailPageModule,
    FlightDetailTwoWayPageModule,
    FlightDetailMultiWayPageModule,
    FlightFareRulePageModule,
    FlightTravellerDetailPageModule,
    FlightAddTravellerPageModule,
    HotelResultsPageModule,
    HotelResultsSearchPageModule,
    HotelDetailPageModule,
    HotelReviewPageModule,
    HotelAddGuestPageModule,
    HotelClusterMapPageModule,
    TransferResultsPageModule,
    TransferDetailPageModule,
    HolidayResultsPageModule,
    HolidayDetailsPageModule,
    HolidaySearchEnginePageModule,
    HolidayPackageSearchPageModule,
    HolidayTravellerDetailPageModule,
    HolidayBookingVoucherPageModule,
    HolidayAddTravellerPageModule,
    TestPageModule,
    TransferReviewPageModule,
    TransferVoucherPageModule,
    PrivacyPolicyPageModule,
    FlightHotelSearchEnginePageModule,
    FlightHotelResultsPageModule,
    FlightHotelDetailsPageModule,
    FlightHotelReviewPageModule,
    FlightFlightResultsPageModule,
    FlightFightDetailPageModule,
    FlightHotelTravellerDetailPageModule,
    FlightHotelBookingVoucherPageModule,
    FlightAirportSearchPageModule,
    TransferSearchPageModule,
    DomesticFlightRulesPageModule,
    FlightTwoWayTravllerDetailPageModule,
    FlightTwoWayVoucherPageModule,
    FlightMultiWatTravllerPageModule,
    FlightMultiWayVoucherPageModule,
    CarSearchEnginePageModule,
    CarResultsPageModule,
    CarRentalDetailPageModule,
    CarCitySearchPageModule,
    CarCitySearchPageModule,
    CarTravellerDetailPageModule,
    CarBookingVoucherPageModule,
    SightSeeingCitySearchPageModule,
    SightSeeingSearchEnginePageModule,
    SightSeeingResultsPageModule,
    SightSeeingDetailPageModule,
    SightSeeingVoucherPageModule,
    BundleSaveSearchEnginePageModule,
    CruiseSearchPageModule,
    CruiseSearchEnginePageModule,
    CruiseResultsPageModule,
    CruiseItineraryPageModule,
    CruiseDetailsPageModule,
    CruiseReviewPageModule,
    CruiseVoucherPageModule,
    CruiseAddTravellerPageModule,
    MyHotelResultsPageModule,
    FlightHotelAddGuestPageModule,
    FlightTransferResultsPageModule,
    HotelPreviewPageModule,
    SpalshPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppRate,
    SocialSharing,
    AppVersion,
    InAppBrowser,
    HTTP,
    Camera,
    DatePicker,
    Geolocation,
    // OneSignal,
    PhotoViewer,
    Stripe,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HotDealsProvider,
    ConstantsProvider,
    LoginProvider,
    JsonSearchProvider,
    BookingInfoProvider,
    HotelsProvider,
    FlightsProvider,
    TransferProvider,
    CarProvider,
    SightSeeingProvider,
    HolidaysProvider,
    CruiseProvider,
    PaymentProvider
  ]
})
export class AppModule {}
