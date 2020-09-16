import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { LoginRsp, SignupRsp, User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }


  login(body: User) : Observable<LoginRsp>{
    return this.httpClient.post<LoginRsp>(`${environment.apiUrl}/users/login`, body);
  }
  
  signup(body: User) : Observable<SignupRsp>{
    return this.httpClient.post<SignupRsp>(`${environment.apiUrl}/users/signup`, body);
  }

}
