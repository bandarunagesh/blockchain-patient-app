import { Component } from '@angular/core';
import { AuthService } from './Rest/auth.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blockchainapp';
  submitted = false;
  first_name = "";
  last_name = "";
  mail = "";
  DOB = "";
  SSN = "";
  MPI = "";

  onSubmit() {
    debugger
    alert();
    this.submitted = true;

    const body = {
      "peers": ["peer0.org1.example.com", "peer0.org2.example.com"],
      "fcn": "initPatient",
      "args": ["1240", "test11", "user", "nagesh@outlook.com", "11-10-1985", "111111", "444441"]
    }


    // .set('id', '121212')
    // .set('first_name', this.first_name)
    // .set('last_name', this.last_name)
    // .set('mail', this.mail)
    // .set('DOB', this.DOB)
    // .set('SSN', this.SSN)
    // .set('MPI', this.MPI)

    this.service.submitPostRequest(body);
  }
  constructor(private service: AuthService) {

  }

  ngOnInit() {
    this.service.gettoken();
  }
}
