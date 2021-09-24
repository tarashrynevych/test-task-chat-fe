import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

import { Component } from '@angular/core';

import { ChatService } from './services/chat.service';
import { User } from './interfaces/user.interface';
import { Message } from './interfaces/message.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly users$: Observable<User[]> = this.chatService.usersList$;
  public readonly userNameIsSet$: Observable<boolean> = this.chatService.userIsSet$;
  public readonly messages$: Observable<Message[]> = this.chatService.newMessage$
    .pipe(scan((acc, curr) => [...acc, curr], []));

  constructor(private chatService: ChatService) {}

  public addNewMessage(message: string): void {
    this.chatService.postMessage(message)
  }

  public addNewUser(userName: string): void {
    this.chatService.addUser(userName);
  }
}
