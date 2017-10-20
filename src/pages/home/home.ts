import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import base64url from "base64url";
import crypto from "crypto";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  payload: any = {
    "user_id": "123",
    "username": "josh",
    "country": "Australia"
  };

  header: any = {
    "alg": "HS256",
    "typ": "JWT"
  };

 token:string;
 key:string       = 'superDuperSecret';
 algorithm:string = 'sha256';
 hash:any
 hmac: any;
 final:any;
  constructor(public navCtrl: NavController) {

  this.payload = btoa(JSON.stringify(this.payload));
  this.header = btoa(JSON.stringify(this.header));
  this.token = this.header + '.' + this.payload;
  this.hmac = crypto.createHmac(this.algorithm, this.key);
  this.hmac.setEncoding('base64');
  this.hmac.write(this.token);
  this.hmac.end();
  this.hash = this.hmac.read();
  this.hash = base64url.fromBase64(this.hash);
  console.log(this.header);
  console.log(this.payload);
  console.log(this.hash);

  this.final = this.header + '.' + this.payload + '.' + this.hash;

  console.log(this.final);


  }

}
