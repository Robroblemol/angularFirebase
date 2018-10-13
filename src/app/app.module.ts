import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { FirestoreService } from './services/firestore/firestore.service';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent }
    ]),
  ],
  providers: [
    AngularFirestore,
    FirestoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
