import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
 // DataUrl_test: string = 'http://192.168.1.137:3000/api/v1/'
  DataUrl_test: string = 'https://pop-cash.herokuapp.com/api/v1/'
  DataUrl_prod: string = 'https://pop-cash.herokuapp.com/api/v1/'
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }

  onCreatedCompte(nom, prenom, cni, phone, password) {
    let postData = {
      "nom": nom,
      "prenom": prenom,
      "cni": cni,
      "phone": phone,
      "password": password
    }
    return this.http.post(this.DataUrl_test + 'session/signup', postData, this.httpOptions)
  }

  onConnexion(phone, password) {
    return this.http.post(this.DataUrl_test + 'session/signin', { phone, password }, this.httpOptions)
  }

  onPaiement(payeur, receveur, montant, password) {
    let postData = {
      "payeur": payeur,
      "receveur": receveur,
      "montant": montant,
      "password": password
    }
    return this.http.post(this.DataUrl_test + 'session/transaction', postData, this.httpOptions)
  }

  onScanneQRCode(qrcode) {
    return this.http.get(this.DataUrl_test + 'session/qrcode/' + qrcode)
  }


  onHistory(phone) {
    return this.http.get(this.DataUrl_test + 'session/history/' + phone)
  }
  
  onSolde(phone, password){
    return this.http.get(this.DataUrl_test + 'session/get_balance/'+ phone+'/' + password)
  }

  onRetrait(phone){
    return this.http.get(this.DataUrl_test + 'session/check_retrait/' + phone)
  }

  onRetrait2(phone, password){
    return this.http.post(this.DataUrl_test + 'session/validate_retrait/', {phone, password}, this.httpOptions)
  }

}
