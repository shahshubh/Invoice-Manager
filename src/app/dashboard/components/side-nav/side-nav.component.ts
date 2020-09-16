import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../../../core/services/jwt.service';
const MAX_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  private mediaMatcher:MediaQueryList = matchMedia(`(max-width: ${MAX_WIDTH_BREAKPOINT}px)`);
  links = [
    {
      name: 'Invoices',
      url: 'invoices',
      iconName: 'article'
    },
    {
      name: 'Clients',
      url: 'clients',
      iconName: 'groups'
    }
  ]


  constructor(
    zone: NgZone,
    private router: Router,
    private jwtService: JwtService
    ) {
    this.mediaMatcher.addListener(() => {
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${MAX_WIDTH_BREAKPOINT}px)`))
    })
  }

  ngOnInit() {
  }

  logout(){
    this.jwtService.destroyToken();
    this.router.navigate(['/login'])
  }

  isScreenSmall(){
    return this.mediaMatcher.matches;
  }

}
