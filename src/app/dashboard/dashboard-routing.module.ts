import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { ClientListingComponent } from '../clients/components/client-listing/client-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { InvoiceViewComponent } from '../invoices/components/invoice-view/invoice-view.component';
import { EditInvoiceResolverService } from '../invoices/services/edit-invoice-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'invoices',
        component: InvoiceListingComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'invoices/new',
        component: InvoiceFormComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'invoices/:id/view',
        component: InvoiceViewComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          invoice: EditInvoiceResolverService
        }
      },
      {
        path: 'invoices/:id',
        component: InvoiceFormComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          invoice: EditInvoiceResolverService
        }
      },
      {
        path: 'clients',
        component: ClientListingComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: 'invoices',
        canActivateChild: [AuthGuardService]
      }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
