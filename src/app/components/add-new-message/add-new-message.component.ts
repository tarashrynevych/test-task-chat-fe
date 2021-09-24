import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommunicationHelperService } from '../../services/communication-helper.service';

@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.scss']
})
export class AddNewMessageComponent implements OnInit, OnDestroy {
  @Output() addNewMessage: EventEmitter<string> = new EventEmitter<string>();

  public readonly addNewMessageForm = this.buildAddNewMessageForm();

  private readonly componentDestroyed$: Subject<void> = new Subject<void>();

  private get messageFormControl(): AbstractControl {
    return this.addNewMessageForm.get('message');
  }

  constructor(private formBuilder: FormBuilder, private communicationHelperService: CommunicationHelperService) {}

  public ngOnInit(): void {
    this.initAddSelectedUserListener();
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public submitNewMessage(): void {
    this.addNewMessage.emit(this.messageFormControl.value);
    this.messageFormControl.reset();
  }

  private buildAddNewMessageForm(): FormGroup {
    return this.formBuilder.group({
      message: ['', Validators.required]
    })
  }

  private initAddSelectedUserListener(): void {
    this.communicationHelperService.addSelectedUser$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((selectedUser) => {
        this.messageFormControl.setValue(`${this.messageFormControl.value}@${selectedUser.name} `);
      })
  }
}
