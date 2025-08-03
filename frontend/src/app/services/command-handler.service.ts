import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandHandlerService {
  getResponse(command: string): string[] {
    switch (command.trim().toLowerCase()) {
      case 'help':
        return [
          'Available commands:',
          '  about     - Learn about me',
          '  projects  - See my projects',
          '  tools     - Tech stack I use',
          '  contact   - Get in touch with me',
          '  clear     - Clear terminal'
        ];
      case 'about':
        return ['I am a passionate developer focused on building clean, user-friendly applications.'];
      case 'projects':
        return ['1. DevFolio Terminal Site', '2. AI Chatbot', '3. Image Annotator'];
      case 'tools':
        return ['Angular', 'TypeScript', 'Python (FastAPI)', 'Git', 'Docker'];
      case 'contact':
        return ['Email: your.email@example.com', 'GitHub: github.com/yourusername'];
      case 'clear':
        return []; // will be handled in component
      default:
        return [`Command not found: ${command}`, `Type 'help' to see available commands.`];
    }
  }
}