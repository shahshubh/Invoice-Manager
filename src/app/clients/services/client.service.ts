import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Client } from '../models/client';



const BASE_URL = environment.apiUrl;

@Injectable()
export class ClientService {

  constructor(private httpClient : HttpClient) { }

  getClients() : Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${BASE_URL}/clients`);
  }

  createClient(body: Client) : Observable<Client> {
    return this.httpClient.post<Client>(`${BASE_URL}/clients`, body);
  }

  getClientById(id:string) : Observable<Client> {
    return this.httpClient.get<Client>(`${BASE_URL}/clients/${id}`);
  }

  updateClient(id: string, body: Client) : Observable<Client> {
    return this.httpClient.put<Client>(`${BASE_URL}/clients/${id}`, body);
  }

  deleteClient(id:string) : Observable<Client> {
    return this.httpClient.delete<Client>(`${BASE_URL}/clients/${id}`);
  }


}
