import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() device: string;
  @Input() description: string;
  @Input() state: string;
  @Input() fix: string;


  constructor() { }

  ngOnInit() {
    
  }

}
