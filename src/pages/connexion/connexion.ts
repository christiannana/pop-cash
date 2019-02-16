import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {
  password: any;
  phone: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: DataServiceProvider,
    public control: DataControllerProvider) {
      if(localStorage.getItem('phone') != null){
        this.navCtrl.setRoot('TabsPage')
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

  opentabs() {
    this.control.LoadinService();
    this.service.onConnexion(this.phone, this.password).subscribe(
      (res: any)=> {
        console.log(res)
        if (res == false) {
          this.control.AlerteService2(res);
          this.control.loadingDismiss();
          console.log(res)
        } else {
          console.log(res[0].name)
          localStorage.setItem('nom', res[0].name)
          localStorage.setItem('phone', res[0].phone)
          this.navCtrl.setRoot('TabsPage');
          this.control.loadingDismiss();
        }

      }, error => {
        this.control.loadingDismiss();
        this.control.AlerteService1();
      });
   //this.navCtrl.setRoot('TabsPage');
  }

  openinscription() {
    this.navCtrl.push('InscriptionPage')
  }

}
