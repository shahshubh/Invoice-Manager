import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private jwtService: JwtService,
    private router: Router

  ) { }

  canActivate() : boolean{
    if(this.jwtService.getToken()){
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild() : boolean {
    return this.canActivate();
  }

}
