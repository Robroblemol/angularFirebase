import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { ReportsComponent } from './reports/reports.component';
import { FirestoreService } from './services/firestore/firestore.service';

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
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
