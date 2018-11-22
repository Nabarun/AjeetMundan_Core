import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import {GoogleMaps, GoogleMap} from '@ionic-native/google-maps'

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


declare var google:any;
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, private _googleMaps: GoogleMaps) {

  }

  ionViewDidLoad(){
    this.showMap();
  }

  showMap(){

    const location = new google.maps.LatLng(37.535371, -121.962345);

    const options = {
      center:location,
      zoom: 15
    }

    const map = new google.maps.Map(this.mapElement.nativeElement, options);
    this.addMarker(location, map);
  }

  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    })
  }
}
