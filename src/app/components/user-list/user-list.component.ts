import { Component, Input } from '@angular/core';

import { User}  from '../../interfaces/user.interface';
import { CommunicationHelperService } from "../../services/communication-helper.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: User[];

  constructor(private communicationHelperService: CommunicationHelperService) {}

  public selectUser(user: User): void {
    this.communicationHelperService.addSelectedUser$.next(user)
  }
}
