import { Component } from '@angular/core';
import { TerminalComponent } from './components/terminal/terminal.component';
import { MatrixBackgroundComponent } from './components/matrix-background/matrix-background.component';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TerminalComponent,
    MatrixBackgroundComponent,
    CommonModule,
    SafeUrlPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showResume = false;
  isLoadingPdf = true;
  resumeKey = Date.now();
  resumeUrl = '../../assets/resume/resume.pdf';

  onTerminalCommand(command: string) {
    if (command === 'resume') {
      this.showResume = true;
      this.isLoadingPdf = true;
      this.resumeKey = Date.now(); 
      // Delay 2 seconds before showing resume
      setTimeout(() => {
        this.isLoadingPdf = false;
        
        // Reload iframe with cache buster
        this.resumeUrl = `../../assets/resume/resume.pdf?${Date.now()}`;
      }, 2000);
  
    } 
    else if (command === 'profile') {
      this.showResume = false;
      this.isLoadingPdf = false;
    }else if (command === 'clear') {
      this.showResume = false;
      this.isLoadingPdf = false;
    }
  }
}