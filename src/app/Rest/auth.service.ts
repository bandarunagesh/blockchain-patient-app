import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://192.168.0.6:4000/users'



  gettoken() {
    const body = new HttpParams()
      .set('username', 'nagesh')
      .set('orgName', 'Org1');

    return this.http.post(this.baseUrl,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).subscribe(
      (data: any) => {
        console.log('success', data),
          localStorage.setItem('token', data.token)
      },
      error => {
        debugger
        console.log('oops', error)
      }
    );
  }

  submitPostRequest(body: any) {
    debugger
    return this.http.post('http://192.168.0.6:4000/channels/mychannel/chaincodes/patient',
      {
        "peers": ["peer0.org1.example.com", "peer0.org2.example.com"],
        "fcn": "initPatient",
        "args": ["124522", "test11", "user", "nagesh@outlook.com", "11-10-1985", "111111", "444441"]
      },
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${localStorage.getItem('token')}`)
      }
    ).subscribe(
      (data: any) => {
        debugger
        console.log('success', data),
          localStorage.setItem('token', data.token)
      },
      error => {
        debugger
        console.log('oops', error)
      }
    );
  }

}
