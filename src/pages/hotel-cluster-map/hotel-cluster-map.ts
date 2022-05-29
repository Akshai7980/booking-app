import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { GoogleMap, GoogleMaps, GoogleMapsEvent, MarkerCluster, GoogleMapsAnimation } from '@ionic-native/google-maps/ngx';

/**
 * Generated class for the HotelClusterMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-cluster-map',
  templateUrl: 'hotel-cluster-map.html',
})
export class HotelClusterMapPage {
  //private map: GoogleMap;
  

  hotelResults = [
  ];
  callBack;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hotelResults = this.navParams.get("hotelResults");
    this.callBack = this.navParams.get("callBack");
    //this.getClusterMap();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelClusterMapPage');
  }

  // getClusterMap() {
  //   let clusterData = [];
  //   for (let i = 0; i < this.hotelResults.length; i++) {
  //     if(this.hotelResults[i].latitude && this.hotelResults[i].longitude){
  //       let data = {
  //         position: {
  //           lat: parseFloat(this.hotelResults[i].latitude),
  //           lng: parseFloat(this.hotelResults[i].longitude)
  //         },
  //         name: this.hotelResults[i].hotelName,
  //         address: this.hotelResults[i].hotelIAddress
  //       };
  //       clusterData.push(data);
  //     }
 
      
  //   }
  //   this.loadMap(clusterData);
  // }

  // loadMap(clusterData) {

  //   // DEFINE YOUR OWN MAP SETTINGS
  //   console.log("clusterData.length",clusterData.length)
  //   this.map = GoogleMaps.create("cluster_map", {
  //     camera: {
  //       target: {
  //         lat: parseFloat(clusterData[0].position.lat),
  //         lng: parseFloat(clusterData[0].position.lng)
  //       },
  //       zoom: 10
  //     }
  //   });
  //   console.log("this.map", this.map);
  //   // Wait the MAP_READY before using any methods.
  //   this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
  //     // DO MAP STUFF HERE
  //     console.log("map is ready");
  //     this.addCluster(clusterData);
  //   });

  // }

  // addCluster(data) {
  //   console.log("data",data)
  //   let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
  //     markers: data,
  //     boundsDraw: false,
  //     icons: []
  //   });
  //   console.log("markerCluster",data)
  //   markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe(params => {
  //     let marker: any = params[1];
  //     marker.setTitle(marker.get("name"));
  //     marker.setSnippet(marker.get("address"));
  //     marker.showInfoWindow();

  //     marker.setAnimation(GoogleMapsAnimation.BOUNCE);

  //     marker.one(GoogleMapsEvent.INFO_CLICK, () => {
  //       console.log(
  //         this.hotelResults[
  //           marker
  //             .get("__pgmId")
  //             .split(/[_ ]+/)
  //             .pop()
  //         ]
  //       );
  //       let hotel = this.hotelResults[
  //         marker
  //           .get("__pgmId")
  //           .split(/[_ ]+/)
  //           .pop()
  //       ];
       
  //       this.callBack(hotel).then(() => {
  //         console.log("this.callBack")
  //         this.navCtrl.pop().then(() => this.navParams.get('resolve')())
  //       });
       
  //     });
  //   });
  // }

  close() {
    this.callBack('').then(() => {
      this.navCtrl.pop();
    });
  }

}
