import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { User } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class CommunicationHelperService {
  public readonly addSelectedUser$: Subject<User> = new Subject<User>();
}
