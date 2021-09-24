import { BehaviorSubject, Subject } from 'rxjs';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { io, Socket } from 'socket.io-client';

import { Injectable } from '@angular/core';

import { Message } from '../interfaces/message.interface';
import { SocketEventsEnum } from '../enums/socket-events.enum';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public readonly usersList$: Subject<User[]> = new Subject<User[]>();
  public readonly newMessage$: Subject<Message> = new Subject<Message>();
  public readonly userIsSet$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private userId: string;
  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() {
    this.initSocket();
    this.addSocketListeners();
  }

  public postMessage(message: string): void {
    this.socket.emit('new message', message)
  }

  public addUser(userName: string): void {
    this.userIsSet$.next(true);
    this.socket.emit(SocketEventsEnum.ADD_USER, userName)
  }

  private initSocket(): void {
    this.socket = io(environment.socketURL, { transports: ['websocket'] });
  }

  private addSocketListeners(): void {
    this.socket.on(SocketEventsEnum.CONNECT, () => {
      this.userId = this.socket.id;
    });
    this.socket.on(SocketEventsEnum.USERS_LIST_UPDATED, (usersList: User[]) => {
      const currentUser = usersList.find((user: User) => user.id === this.userId);
      const usersWithoutCurrent = usersList.filter((user: User) => user.id !== this.userId);
      const sortedUsers = [currentUser, ...usersWithoutCurrent];
      this.usersList$.next(sortedUsers)
    });
    this.socket.on(SocketEventsEnum.NEW_MESSAGE, (message: Message) => {
      this.newMessage$.next(message)
    });
    this.socket.on(SocketEventsEnum.DISCONNECT, () => {
      this.userIsSet$.next(false);
      alert('Connection is lost, please try to re-login')
    });
  }
}
