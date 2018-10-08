import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public reports = [];

  constructor(
     private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.firestoreService.getReports().subscribe((reportsSnaphot)=>{
      this.reports = [];
      reportsSnaphot.forEach((reportData: any) => {
        this.reports.push({
          id: reportData.payload.doc.id,
          data: reportData.payload.doc.data()
        });
      })
    });
  }

}
