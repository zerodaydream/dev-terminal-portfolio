import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-company-timeline',
  imports: [CommonModule],
  templateUrl: './company-timeline.component.html',
  styleUrls: ['./company-timeline.component.css'],
  standalone: true
})
export class CompanyTimelineComponent implements OnInit {
  experiences: any[] = [];
  expandedCompany: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/company-experience.json').subscribe(data => {
      this.experiences = data;
    });
  }

  expandCompany(exp: any): void {
    this.expandedCompany = exp;
  }

  closeExpanded(): void {
    this.expandedCompany = null;
  }
}