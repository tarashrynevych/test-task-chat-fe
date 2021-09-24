import { Component, Input } from '@angular/core';

import { Message } from '../../interfaces/message.interface';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  @Input() messages: Message[];
}
