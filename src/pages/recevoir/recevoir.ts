import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';

/**
 * Generated class for the RecevoirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recevoir',
  templateUrl: 'recevoir.html',
})
export class RecevoirPage {

  recevoir: any;
  optionMontant: any;
  montant: string;
  myAngularxQrCode: any;
  phone: string = localStorage.getItem('phone')
  lat: number;
  long: number;
  // nom: string= localStorage.getItem('nom')

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public controle: DataControllerProvider) {
    /// this.recevoir = true;
    this.myAngularxQrCode = this.montant;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RecevoirPage');
    this.recevoir = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }


  onAnnule() {
    this.navCtrl.pop();
  }

  onValidePayement() {
    if ( this.montant == null) {
      this.controle.AlerteServiceFinale('Montant insuffisant !', 'Désolé le montant de la transaction ne peux pas etre inférieur à 25 f cfa.', true, 'REPRENDRE');
    } else {
      this.myAngularxQrCode = this.montant + '@' + this.phone ;
      this.recevoir = false;
      this.optionMontant = true;
      console.log(this.myAngularxQrCode);
    }

  }
}
