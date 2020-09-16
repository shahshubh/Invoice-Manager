import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operator/map';
import { take } from 'rxjs/operator/take';
import { Invoice } from '../models/invoice';
import { InvoiceService } from './invoice.service';

@Injectable()
export class EditInvoiceResolverService implements Resolve<Invoice> {

  constructor(
    private invoiceService : InvoiceService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Invoice>{
    let id = route.paramMap.get('id');
    return this.invoiceService.findInvoice(id).map(invoice => {
      if(invoice){
        return invoice;
      } else {
        this.router.navigate(['/dashboard', 'invoices']);
        return null;
      }
    })

  }

}
