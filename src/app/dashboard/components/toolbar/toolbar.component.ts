import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { Router } from '@angular/router';
// import { JwtService } from '../../../core/services/jwt.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter<void>();

  constructor(
    // private jwtService: JwtService,
    // private router: Router
  ) { }

  ngOnInit() {
  }

  // logout(){
  //   this.jwtService.destroyToken();
  //   this.router.navigate(['/login'])
  // }

}
