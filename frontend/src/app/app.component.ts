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
  terminalHeight: string = '100vh'
  roles: string[] = [
    'Fullstack',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
  ];
  
  displayedText = '';
  private roleIndex = 0;
  private charIndex = 0;
  private typingSpeed = 100;
  private deletingSpeed = 40;
  private pauseTime = 1200;
  showResume = false;
  isLoadingPdf = true;
  resumeKey = Date.now();
  resumeUrl = '../../assets/resume/resume.pdf';
  isResizing = false;

  ngOnInit() {
    this.typeRole();
  }

  typeRole() {
    const currentRole = this.roles[this.roleIndex];
    if (this.charIndex < currentRole.length) {
      this.displayedText += currentRole.charAt(this.charIndex++);
      setTimeout(() => this.typeRole(), this.typingSpeed);
    } else {
      setTimeout(() => this.deleteRole(), this.pauseTime);
    }
  }

  deleteRole() {
    if (this.charIndex > 0) {
      this.displayedText = this.displayedText.slice(0, --this.charIndex);
      setTimeout(() => this.deleteRole(), this.deletingSpeed);
    } else {
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      setTimeout(() => this.typeRole(), this.typingSpeed);
    }
  }

  onTerminalCommand(command: string) {
    if (command === 'resume') {
      this.terminalHeight = '36vh';
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
    else if (command !== 'resume' && this.terminalHeight !== '100vh') {
      this.terminalHeight = '100vh';
      this.showResume = false;
      this.isLoadingPdf = false;
    }
    else if (command === 'profile') {
      this.showResume = false;
      this.isLoadingPdf = false;
    }else if (command === 'clear') {
      this.showResume = false;
      this.isLoadingPdf = false;
    }
  }

  startResize(event: MouseEvent) {
    this.isResizing = true;
  
    const startY = event.clientY;
    const startHeight = parseInt(this.terminalHeight);
  
    const onMouseMove = (e: MouseEvent) => {
      if (!this.isResizing) return;
  
      const deltaMultiplier = 0.5; // Reduce height change rate
      const delta = e.clientY - startY;
      let newHeight = startHeight - (delta * deltaMultiplier);
  
      // Clamp it to make the increase/decrease feel slow and controlled
      newHeight = Math.max(25, Math.min(100, newHeight)); // 20vh to 80vh
      this.terminalHeight = `${newHeight}vh`;
    };
  
    const onMouseUp = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}