import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Invoice, InvoicePaginationRsp } from '../models/invoice';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiUrl;
@Injectable()
export class InvoiceService {
  constructor(private httpClient : HttpClient) {}

  getInvoices({page, perPage=10, sortField, sortDir, filter}) : Observable<InvoicePaginationRsp>{
    let queryUrl = `${BASE_URL}/invoices?page=${page+1}&perPage=${perPage}`;
    if(sortField && sortDir){
      queryUrl = `${queryUrl}&sortField=${sortField}&sortDir=${sortDir}`;
    }
    if(filter){
      queryUrl = `${queryUrl}&filter=${filter}`;
    }
    return this.httpClient.get<InvoicePaginationRsp>(queryUrl);
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
