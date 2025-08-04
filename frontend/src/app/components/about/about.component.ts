import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { TerminalComponent } from '../terminal/terminal.component';
@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true
})
export class AboutComponent {
  @ViewChild(TerminalComponent) terminal!: TerminalComponent;
  certifications = [
    {
      title: 'Full Stack Developer',
      issuer: 'DigiPakistan',
      date: 'Dec 2023',
      logo: 'assets/images/google.jpg',
      link: 'https://example.com/fullstack'
    },
    {
      title: 'AWS & Microservices',
      issuer: 'Self Learning',
      date: 'Aug 2022',
      logo: 'assets/images/google.jpg',
      link: 'https://example.com/aws'
    },
    {
      title: 'Graphic Designer',
      issuer: 'DigiSkills',
      date: 'May 2020',
      logo: 'assets/images/google.jpg',
      link: 'https://example.com/graphic'
    },
    {
      title: 'Full Stack Developer',
      issuer: 'DigiPakistan',
      date: 'Dec 2023',
      logo: 'assets/images/google.jpg',
      link: 'https://example.com/fullstack'
    },
    {
      title: 'AWS & Microservices',
      issuer: 'Self Learning',
      date: 'Aug 2022',
      logo: 'assets/images/google.jpg',
      link: 'https://example.com/aws'
    },
    {
      title: 'Graphic Designer',
      issuer: 'DigiSkills',
      date: 'May 2020',
      logo: 'assets/images/google.jpg',
      link: 'https://example.com/graphic'
    },
    {
      title: 'AWS & Microservices',
      issuer: 'Self Learning',
      date: 'Aug 2022',
      logo: 'assets/images/google.jpg',
      link: 'https://example.com/aws'
    },
    {
      title: 'Graphic Designer',
      issuer: 'DigiSkills',
      date: 'May 2020',
      logo: 'assets/images/google.jpg',
      link: 'https://example.com/graphic'
    },
  ];
}