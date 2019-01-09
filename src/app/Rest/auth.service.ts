import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route: Router
  ) { }
  //baseUrl = 'http://192.168.1.2:4000';
  //baseUrl = 'http://35.211.11.214:4000';
  baseUrl = 'http://52.66.207.50:4000';

  gettoken() {
    return localStorage.getItem('token');
  }
  getUserName() {
    return localStorage.getItem('username');
  }
  signIn(username: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('orgName', 'Org1');

    return this.http.post(this.baseUrl+'/users',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).subscribe(
      (data: any) => {
        console.log('success', data);
        debugger;
        localStorage.setItem('token', data.token);
        this.getUserDetails(username);
      },
      error => {
        console.log('oops', error);
        localStorage.setItem('token', '');
        localStorage.setItem('username', '');
      }
    );
  }

  submitPostRequest(body: any) {
    return this.http.post(`${this.baseUrl}/channels/mychannel/chaincodes/patient`,
      body
      ,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${localStorage.getItem('token')}`)
      }
    ).subscribe(
      (data: any) => {
        console.log('success', data),
          localStorage.setItem('token', data.token)
      },
      (error: any) => {
        console.log('oops', error.error.text)
      }
    );
  }

  getUserDetails(username: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('orgName', 'Org1');

    return this.http.get(`${this.baseUrl}/channels/mychannel/chaincodes/patient?peer=peer0.org1.example.com&fcn=readPatient&args=%5B%22${username}%22%5D`,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${localStorage.getItem('token')}`)
      }
    ).subscribe(
      (data: any) => {
        console.log('success', data);
        localStorage.setItem('username', username);
        localStorage.setItem('userDetails', data);  
        this.route.navigate(['/register']);
      },
      (error: any) => {
        debugger;
        const errorIndex = error.error.text.indexOf('Error');
        if (errorIndex > 0) {
          
          alert("User does not exists");
        } else {
          const startIndex = error.error.text.indexOf('{');
          const endIndex = error.error.text.indexOf('}') + 1;

          let data = JSON.parse(error.error.text.substring(startIndex, endIndex));

          console.log('oops', error);
          console.log('success', error);
          localStorage.setItem('username', username);
          localStorage.setItem('userDetails', JSON.stringify(data));

          this.route.navigate(['/register']);
        }
      }
    );
  }


  getUserHistory(username: string):any {
   
    const body = new HttpParams()
      .set('username', username)
      .set('orgName', 'Org1');

    return this.http.get(`${this.baseUrl}/channels/mychannel/chaincodes/patient?peer=peer0.org1.example.com&fcn=getHistoryForPatient&args=%5B%22${username}%22%5D`,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${localStorage.getItem('token')}`)
      }
    )
    
  }

}
