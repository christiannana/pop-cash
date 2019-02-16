import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';


/**
 * Generated class for the PayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payer',
  templateUrl: 'payer.html',
})
export class PayerPage {

  phone: any;
  qrcodedata: any;
  montant: any;
  receveur: any;
  receveur_name: any;
  password: any;
  payeur: string = localStorage.getItem('phone');
  data:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public scanner: BarcodeScanner,
    public service: DataServiceProvider,
    public alertCtrl: AlertController,
    public controle: DataControllerProvider,) {

   this.data = this.navParams.get('data')
   this.receveur = this.data.marchand_phone;
   this.receveur_name = this.data.marchand_name;
   this.montant = this.data.amount;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayerPage');
  }

  onAnnule() {
    this.navCtrl.pop();
  }
/** 
  onScanner() {
    this.scanner.scan().then(barcodeData => {
      this.qrcodedata = barcodeData.text;
      this.controle.LoadinService();
      this.service.onScanneQRCode(this.payeur + '@' + this.qrcodedata).subscribe(
        (res: any) => {
          console.log(res)
          this.receveur = res.marchand_phone;
          this.receveur_name = res.marchand_name;
          this.montant = res.amount;
          this.controle.loadingDismiss();
        }, error => {
          this.controle.AlerteService1()
          this.controle.loadingDismiss();
        }
      )

    }).catch(err => {
      console.log(this.montant, 'nanana')
      /**  console.log(Math.trunc(parseInt('5528.5abc33')/1000));
        console.log(Math.round(3.1 - parseInt('3.1')) * 10)
       console.log('Error', err);
        var str = "6985008711300";
        var sliced = str.slice(0, 9);
        console.log(parseInt(sliced));
      console.log('nana' + 'wanda')
    });
  }
***/


  onValidate() {
    const prompt = this.alertCtrl.create({
      title: 'Mot de passe',
      message: "Veuillez renseigner le mot de passe pour terminer l'opération.",
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Mot de passe'
        },

      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.controle.LoadinService();
            this.service.onPaiement(this.payeur, this.receveur, this.montant, data.password).subscribe(
              res => {
                if(res==true){
                  this.controle.AlerteService3(res)
                  this.navCtrl.pop();
                }else {
                  this.controle.AlerteService4(res);
                }
                console.log(res)
                this.controle.loadingDismiss();
              }, error => {
                console.log('désolé une erreur est survenue')
                this.controle.loadingDismiss();
                this.controle.AlerteService1()
              }
            )
            console.log('Saved clicked', data.password);
          }
        }
      ]
    });
    prompt.present();
  }





}
