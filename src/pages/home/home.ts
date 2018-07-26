import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private androidPermissions: AndroidPermissions, private geolocation: Geolocation, private locationAccuracy: LocationAccuracy) {
  }

  ionViewDidLoad(){
  //this.gl();
}


gl(){

this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS, this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE]).then((success)=>{
//  alert("aaa");


  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    () => {
    //  alert('Request successful');
      this.geolocation.getCurrentPosition({ timeout: 30000 }).then((resp) => {
       alert(resp.coords.latitude+"  --LOCATION--  "+resp.coords.longitude);
      }).catch((error) => {
        alert(error);
      });
    },
    error => console.log('Error requesting location permissions', error)
  );




}).catch((error) => {
    alert("The following error occurred: "+error);
});
}




withNavi(){
  var onSuccess = function(position) {
          alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });

}




withNaviPermi(){

  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    () => {
      var onSuccess = function(position) {
              alert('Latitude: '          + position.coords.latitude          + '\n' +
                    'Longitude: '         + position.coords.longitude         + '\n' +
                    'Altitude: '          + position.coords.altitude          + '\n' +
                    'Accuracy: '          + position.coords.accuracy          + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                    'Heading: '           + position.coords.heading           + '\n' +
                    'Speed: '             + position.coords.speed             + '\n' +
                    'Timestamp: '         + position.timestamp                + '\n');
          };

          // onError Callback receives a PositionError object
          //
          function onError(error) {
              alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
          }

          navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
    },
    error => console.log('Error requesting location permissions', error)
  );
}



}
