import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
username:string;
  constructor(private router: Router,private route:ActivatedRoute) {

   }

  ngOnInit() {
    this.getUser();
  }
  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.username = username;
  }
}
