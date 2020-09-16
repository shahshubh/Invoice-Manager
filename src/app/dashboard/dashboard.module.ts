import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { ClientsModule } from '../clients/clients.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../core/services/http-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InvoicesModule,
    ClientsModule,
    MaterialModule
  ],
  declarations: [DashboardComponent, SideNavComponent, ToolbarComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }]
})
export class DashboardModule { }
