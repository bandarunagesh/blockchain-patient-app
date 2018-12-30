import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Rest/auth.service';
import { Router } from '@angular/router';
//import { AuthService } from '../Rest/auth.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  constructor(private service: AuthService, private route: Router) {

  }

  things: any = [];
  // things   = [{"TxId":"5206f9063c280dfad648cb9fd186407e6f0143bf5ac738cb388464a5ca573416","Timestamp":{"seconds":{"low":1546162245,"high":0,"unsigned":false},"nanos":961000000},"IsDelete":"false","Value":{"docType":"patient","provider":"nagesh","first_name":"apollo","last_name":"bandaru","mail":"praveen@gmail.com","DOB":"15/06/1986","SSN":"AAA-123-0009-A","MSP":"MP012, 12AO"}},{"TxId":"f42bc43b58cf0bb8aa168527849ff0a26004275a0d57d399919455c11792f45e","Timestamp":{"seconds":{"low":1546162625,"high":0,"unsigned":false},"nanos":577000000},"IsDelete":"false","Value":{"docType":"patient","provider":"apollo","first_name":"bandaru","last_name":"bandaru","mail":"praveen@gmail.com","DOB":"15/06/1986","SSN":"AAA-123-0009-A","MSP":"MP012, 12AO"}},{"TxId":"51f355be8728edc7a1f5afb8235f44c462e8c9edffa129e43d88afb5998e17cd","Timestamp":{"seconds":{"low":1546162743,"high":0,"unsigned":false},"nanos":25000000},"IsDelete":"false","Value":{"docType":"patient","provider":"health systems","first_name":"bandaru","last_name":"bandaru","mail":"praveen@gmail.com","DOB":"15/06/1986","SSN":"AAA-123-0009-A","MSP":"MP012, 12AO"}}]
  ngOnInit() {
    this.service.getUserHistory(localStorage.getItem('username')).subscribe(
      (data: any) => {

      },
      (error: any) => {
        debugger;
        const errorIndex = error.error.text.indexOf('Error');
        if (errorIndex > 0) {
          alert("User does not exists");
        } else {
          const startIndex = error.error.text.indexOf('[');
          const endIndex = error.error.text.indexOf(']') + 1;

          let data = JSON.parse(error.error.text.substring(startIndex, endIndex));
          this.things = data;

        }
      }
    );;
    debugger;
  }

}
