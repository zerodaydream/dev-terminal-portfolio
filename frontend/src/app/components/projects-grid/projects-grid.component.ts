import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-grid',
  imports: [CommonModule],
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.css'],
  standalone: true
})
export class ProjectGridsComponent implements OnInit {
  projects: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/data/projects.json').subscribe(data => {
      this.projects = [...data, ...data];
    });
  }

  pause() {
    const track = document.querySelector('.card-track') as HTMLElement;
    if (track) track.style.animationPlayState = 'paused';
  }
  
  resume() {
    const track = document.querySelector('.card-track') as HTMLElement;
    if (track) track.style.animationPlayState = 'running';
  }
}