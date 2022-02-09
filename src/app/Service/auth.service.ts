import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(users) {
    let user = this.http.post(this.APIURL + '/users/authenticate', users);
    console.log(user)
    return user
  }
  getAllUser(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/users');
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logOutUser(): Promise<void> {
    return firebase.auth().signOut();
  }


}
