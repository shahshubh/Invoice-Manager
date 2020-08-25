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

  createInvoice(body: Invoice) : Observable<Invoice>{
    return this.httpClient.post<Invoice>(`${BASE_URL}/invoices`, body);
  }

  deleteInvoice(id: String) : Observable<Invoice>{
    return this.httpClient.delete<Invoice>(`${BASE_URL}/invoices/${id}`)
  }

  findInvoice(id:String) : Observable<Invoice>{
    return this.httpClient.get<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  updateInvoice(id:String, body:Invoice) : Observable<Invoice>{
    return this.httpClient.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
  }

}
