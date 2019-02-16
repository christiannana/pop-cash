import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the TransfertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfert',
  templateUrl: 'transfert.html',
})
export class TransfertPage {

  option: any;
  qrcodedata: any;
  payeur: string = localStorage.getItem('phone');
  nom: any = localStorage.getItem('nom')
  lat: number;
  long: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanner: BarcodeScanner,
    public service: DataServiceProvider,
    public controle: DataControllerProvider,
    private geolocation: Geolocation) {


    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransfertPage');
  }

  onPayer() {
    this.navCtrl.push('PayerPage')
  }
  onRecevoir() {
    this.navCtrl.push('RecevoirPage')
  }


  onScanner() {

    this.scanner.scan().then(barcodeData => {
      this.qrcodedata = barcodeData.text;
      this.controle.LoadinService();
      this.service.onScanneQRCode(this.payeur + '@' + this.qrcodedata).subscribe(
        (res: any) => {
          console.log(res)
          if (res.message == 'errors') {
            this.controle.loadingDismiss();
            this.controle.AlerteService2(res.description)
          } else {
            this.navCtrl.push('PayerPage', { 'data': res });
            this.controle.loadingDismiss();
          }
        }, error => {
          this.controle.AlerteService1()
          this.controle.loadingDismiss();
        }
      )

    }).catch(err => {

      /**  console.log(Math.trunc(parseInt('5528.5abc33')/1000));
        console.log(Math.round(3.1 - parseInt('3.1')) * 10)
       console.log('Error', err);
        var str = "6985008711300";
        var sliced = str.slice(0, 9);
        console.log(parseInt(sliced));
        **/
      console.log('nana' + 'wanda')
    });
  }


}
