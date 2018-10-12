import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public documentId = null;
  public reports = [];
  public currentStatus = 1;
  public newReportForm = new FormGroup({
    device: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    id: new FormControl('')
  });


  constructor(
     private firestoreService: FirestoreService
  ) {
    this.newReportForm.setValue({
      id: '',
      device: '',
      description: '',
    });
  }

  ngOnInit() {
    // console.log('inicio?')
    let i = 0;
    this.firestoreService.getReports().subscribe((reportsSnaphot)=>{
      this.reports = [];
      reportsSnaphot.forEach((reportData: any) => {
        this.reports.push({
          id: reportData.payload.doc.id,
          data: reportData.payload.doc.data(),
        });
          // console.log(`reports: ${this.reports[i].id}`)
          // i++;
      })
    });


  }
  public newReport(form, documentId = this.documentId) {
    //console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        device: form.device,
        description: form.description,
        // date:form.date,
        // state: form.state,
        // id: form.id,
      }
      console.log(`Device: ${form.device} Description: ${form.description}`);

      this.firestoreService.creatReport(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newReportForm.setValue({
          device: '',
          description: '',
          id: '',
        });
      }, (error) => {
        console.error(error);
      });
    }
    else {
      let data = {
        device: form.device,
        description: form.description
      }
      this.firestoreService.updateReport(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newReportForm.setValue({
          device: '',
          description: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editReport(documentId) {
    console.log(`id: ${documentId}`)
    let editSubscribe = this.firestoreService.getReport(documentId).subscribe((report) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newReportForm.setValue({
        id: documentId,
        device: report.payload.data().device,
        description: report.payload.data().description,
      });
      editSubscribe.unsubscribe();
    });
  }
  public deleteReport(documentId) {
    this.firestoreService.deleteReport(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

}
