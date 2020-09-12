import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Client } from '../models/client';

const BASE_URL = 'http://localhost:3000/api';

@Injectable()
export class ClientService {

  constructor(private httpClient : HttpClient) { }

  getClients() : Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${BASE_URL}/clients`);
  }

  createClient(body: Client) : Observable<Client> {
    return this.httpClient.post<Client>(`${BASE_URL}/clients`, body)
  }


}
