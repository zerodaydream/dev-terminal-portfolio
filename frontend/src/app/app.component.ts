import { Component } from '@angular/core';
import { TerminalComponent } from './components/terminal/terminal.component';
import { MatrixBackgroundComponent } from './components/matrix-background/matrix-background.component';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { CompanyTimelineComponent } from './components/company-timeline/company-timeline.component';
import { ProjectGridsComponent } from './components/projects-grid/projects-grid.component';
import { AboutComponent } from './components/about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TerminalComponent,
    MatrixBackgroundComponent,
    CommonModule,
    SafeUrlPipe,
    CompanyTimelineComponent,
    ProjectGridsComponent,
    AboutComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  terminalHeight: string = '100vh';
  displayedText = '';
  roles: string[] = ['Fullstack', 'Data Science', 'Machine Learning', 'Artificial Intelligence'];

  private roleIndex = 0;
  private charIndex = 0;
  private typingSpeed = 100;
  private deletingSpeed = 40;
  private pauseTime = 1200;

  showResume = false;
  isLoadingPdf = false;
  resumeKey = Date.now();
  resumeUrl = '../../assets/resume/resume.pdf';

  workExp = false;
  showProjects = false;
  showAbout = true; // Show About page by default

  showFloatingTerminal = false;
  terminalMinimized = false;

  showDefaultProfile = false;

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
    const lowerCmd = command.trim().toLowerCase();
    if (this.showFloatingTerminal) {
      this.terminalMinimized = true;
      setTimeout(() => {
        this.runMainCommand(lowerCmd);
      }, 900);
    } else {
      this.runMainCommand(lowerCmd);
    }
  }

  closeFloatingTerminal() {
    this.terminalMinimized = false;
    this.showFloatingTerminal = false;
    this.terminalHeight = '100vh';
  }

  runMainCommand(cmd: string) {
    this.terminalHeight = cmd === 'resume' ? '36vh' : '100vh';
    document.body.style.overflow = cmd === 'about' ? 'hidden' : 'auto';

    this.resetAllViews();

    setTimeout(() => {
      switch (cmd) {
        case 'resume':
          this.showResume = true;
          this.isLoadingPdf = true;
          this.resumeKey = Date.now();
          setTimeout(() => (this.isLoadingPdf = false), 2000);
          break;
        case 'projects':
          this.showProjects = true;
          break;
        case 'exp':
          this.workExp = true;
          break;
        case 'about':
          this.showAbout = true;
          break;
        default:
          this.showDefaultProfile = true;
          break;
      }
    }, 200);
  }

  resetAllViews() {
    this.showResume = false;
    this.isLoadingPdf = false;
    this.workExp = false;
    this.showProjects = false;
    this.showAbout = false;
    this.showDefaultProfile = false;
  }
}