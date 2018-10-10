import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }
  //crear reporte
  //public creatReport(data:{date: string, description: string, device: string, state: string, id: string}){
  public creatReport(data:any){
    return this.firestore.collection('report').add(data);
  }
  //obtenemos un report
  public getReport(documentId: string) {
   return this.firestore.collection('report').doc(documentId).snapshotChanges();
  }
  //obtenemos todos los reportes
  public getReports() {
    return this.firestore.collection('report').snapshotChanges();
  }
  //Actualiza un report
  public updateReport(documentId: string, data: any) {
    return this.firestore.collection('report').doc(documentId).set(data);
  }
  //borrar un report
  public deleteReport(documentId: string) {
    return this.firestore.collection('report').doc(documentId).delete();
  }


}
