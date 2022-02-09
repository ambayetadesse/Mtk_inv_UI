import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  readonly APIURL = environment.apiURL;
  constructor(private http: HttpClient) {
  }
  create(userR) {
    return this.http.post(this.APIURL + '/userrole', userR);
  }
  getAllUserRole() {
    return this.http.get<any>(this.APIURL + '/userrole');
  }
  //filter by userId from userRole table
  getUerRoleId(id: any) {
    return this.http.get(this.APIURL + '/userrole', id);
  }
  deleteUserRole(id) {
    // console.log(id)
    return this.http.delete(this.APIURL + '/userrole/' + id);
  }
}
