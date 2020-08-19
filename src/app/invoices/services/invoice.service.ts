import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../models/invoice';

const BASE_URL = 'http://localhost:3000/api';
@Injectable()
export class InvoiceService {
  constructor(private httpClient : HttpClient) {}

  getInvoices() : Observable<Invoice[]>{
    return this.httpClient.get<Invoice[]>(`${BASE_URL}/invoices`);
  }
}
