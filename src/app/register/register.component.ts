import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Rest/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'blockchainapp';
  submitted = false;
  first_name = "";
  last_name = "";
  mail = "";
  DOB = "";
  SSN = "";
  MSP = "";
  id = '';

  onSubmit() {
    this.submitted = true;
    const body = {
      "peers": ["peer0.org1.example.com", "peer0.org2.example.com"],
      "fcn": "initPatient",
      "args": [this.id, this.first_name, this.last_name, this.mail, this.DOB, this.SSN, this.MSP]
    }
    // .set('id', this.id)
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
    // const token = this.service.gettoken();
    debugger;
    const userdata: any = localStorage.getItem('userDetails');
    if (userdata) {
      var data = JSON.parse(userdata)
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.mail = data.mail;
      this.DOB = data.DOB;
      this.SSN = data.SSN;
      this.MSP = data.MSP;
      this.id = this.service.getUserName();

    }

  }

}
