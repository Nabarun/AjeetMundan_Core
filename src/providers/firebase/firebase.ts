import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class FirebaseProvider {

    constructor(public afd: AngularFireDatabase) {}

    getUsers(){
        return this.afd.list('/users/');
    }

    addUser(user){
        this.afd.list('/users/').push(user);
    }

}