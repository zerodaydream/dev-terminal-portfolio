// Updated TerminalComponent with streaming, history, corrections, and personal intro
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent {
  @Input() height: string = '100vh';
  command: string = '';
  output: string[] = [];
  logs: string[] = [];
  user = 'dev-portfolio@dhanush ~ %';
  commandHistory: string[] = [];
  historyIndex: number = -1;
  knownCommands = ['help', 'about', 'projects', 'tools', 'skills', 'awards', 'contact', 'clear'];
  isStreaming: boolean = false;
  outputIndex: number = -1;
  @Output() commandIssued = new EventEmitter<string>();

  constructor() {
    this.streamText('🟢 Welcome to Dhanush\'s Dev Terminal!\n Type `help` to explore.');
  }

  animateIntro(lines: string[], delay: number = 600) {
    let i = 0;
    const interval = setInterval(() => {
      this.logs.push(lines[i]);
      i++;
      if (i >= lines.length) clearInterval(interval);
    }, delay);
  }

  runCommand() {
    const trimmed = this.command.trim();
    if (!trimmed) return;

    this.output.push(`${this.user} ${trimmed}`);
    this.commandHistory.unshift(trimmed);
    this.historyIndex = -1;

    switch (trimmed.toLowerCase()) {
      case 'clear':
        this.output = [];
        break;
      case 'help':
        this.streamText(
          'Available commands:\n' +
          '| help      - Show available commands\n' +
          '| about     - Who is Dhanush?\n' +
          '| exp  - Peek at my work experience\n' +
          '| tools     - Tech I breathe\n' +
          '| contact   - Reach out\n' +
          '| awards    - Trophies & medals\n' +
          '| skills    - Superpowers\n' +
          '| clear     - Wipe the screen'
        );
        break;
      case 'about':
        this.streamText(
          "Hey, I'm Dhanush 👋 ML & Fullstack Dev. I build cool AI tools, real-time voice bots, and chat systems that scale. From browser extensions to terminal UIs — I craft clean code & sleek UX."
        );
        break;
      case 'projects':
        this.streamText(
          '⚡ Freya Fusion Migration – Angular → React, .NET → FastAPI\n🤖 RegRadar GPT – LLM-powered doc validation & automation\n🛰 MMOTU Tumor Segmentation – EffDUCK-Net on ultrasound images\n📺 Subtitle Burner – Real-time ASR with Whisper & Streamlit\n🧠 Twitter + GPT-Vision – Chrome Extn for scraping + AI summary'
        );
        break;
      case 'tools':
        this.streamText(
          '⚙️ Angular • React • FastAPI • LangChain • Whisper • Azure\n🧪 PyMuPDF • HuggingFace • SQLAlchemy • Streamlit • Docker'
        );
        break;
      case 'skills':
        this.streamText(
          '🧠 Python, TypeScript, C\n🧰 LangChain, LangGraph, GPT-4 Turbo, TensorFlow, OpenCV\n🔧 CI/CD • Git • DevSecOps • Pytest • Azure Pipelines'
        );
        break;
      case 'awards':
        this.streamText(
          '🏆 Team Impact Award 2024 – Freyr Solutions\n🏓 National-level Table Tennis Medalist\n🎖️ Best All-Rounder – Academics + Sports (High School)'
        );
        break;
      case 'contact':
        this.streamText(
          '📧 adhanush.atwork@gmail.com\n🔗 linkedin.com/in/dhanush-anumakonda\n🐙 github.com/dhanusha-dev'
        );
        break;
      case 'resume':
        this.streamText("Opening resume...");
        break;
      case 'profile':
        this.streamText("Opening profile...");
        break;
        case 'exp':
          this.streamText("Compilation Done, fetching work experience...");
          break;
      default:
        const suggestion = this.getClosestCommand(trimmed);
        this.streamText(
          `❌ Unknown command: '${trimmed}'` +
          (suggestion ? ` — did you mean '${suggestion}'?` : '')
        );
    }
    this.commandIssued.emit(trimmed.toLowerCase());
    this.command = '';
    setTimeout(() => this.scrollToBottom(), 0);
  }

  streamText(text: string, speed: number = 12) {
    if (this.isStreaming) return;
    this.isStreaming = true;
    const lines = text.split('\n');

    const streamLine = (line: string, index: number) => {
      let rendered = '';
      const chars = line.split('');
      let charIndex = 0;

      const streamChar = () => {
        if (charIndex < chars.length) {
          rendered += chars[charIndex++];
          if (this.output.length <= this.outputIndex + index) this.output.push('');
          this.output[this.outputIndex + index] = rendered;
          this.scrollToBottom(); 
          setTimeout(streamChar, speed);
        } else if (index + 1 < lines.length) {
          streamLine(lines[index + 1], index + 1);
        } else {
          this.isStreaming = false;
        }
      };
      streamChar();
    };

    this.outputIndex = this.output.length;
    streamLine(lines[0], 0);
  }

  getClosestCommand(input: string): string | null {
    let closest = '';
    let minDist = Infinity;
    for (const cmd of this.knownCommands) {
      const dist = this.levenshteinDistance(input, cmd);
      if (dist < minDist) {
        minDist = dist;
        closest = cmd;
      }
    }
    return minDist <= 2 ? closest : null;
  }

  levenshteinDistance(a: string, b: string): number {
    const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[a.length][b.length];
  }

  autoComplete() {
    if (!this.command) return;
    const matches = this.knownCommands.filter(cmd =>
      cmd.startsWith(this.command.toLowerCase())
    );
    if (matches.length === 1) {
      this.command = matches[0]; // only one match, auto-complete
    } else if (matches.length > 1) {
      this.output.push(`${this.user} ${this.command}`);
      this.output.push(`Found ${matches.length} matches: ${matches.join(', ')}`);
      this.scrollToBottom();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.autoComplete();
    }
  }

  @HostListener('document:keydown.arrowup')
  onArrowUp() {
    if (this.commandHistory.length > 0 && this.historyIndex + 1 < this.commandHistory.length) {
      this.historyIndex++;
      this.command = this.commandHistory[this.historyIndex];
    }
  }

  @HostListener('document:keydown.arrowdown')
  onArrowDown() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.command = this.commandHistory[this.historyIndex];
    } else {
      this.historyIndex = -1;
      this.command = '';
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const el = document.querySelector('.terminal-output');
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  }
}