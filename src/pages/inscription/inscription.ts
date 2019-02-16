import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';

/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  nom:any;
  prenom:any;
  cni:any;
  phone:number;
  password: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: DataServiceProvider,
    public control: DataControllerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }


  onCompte(){
    this.control.LoadinService();
    this.service.onCreatedCompte(this.nom, this.prenom, this.cni, this.phone, this.password).subscribe(
      (res: any)=>{
        if(res.status == true){
          this.control.loadingDismiss()
          this.navCtrl.pop();
          console.log(this.phone)
          console.log(res);
        }else{
          this.control.loadingDismiss();
          this.control.AlerteService2(res.status);
          console.log(res);
        }    
      },error=>{
        this.control.loadingDismiss();
        this.control.AlerteService1()
        console.log('Désolé monsieur')
      }
    )
  }


}
