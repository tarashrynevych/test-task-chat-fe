import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { AddNewMessageComponent } from './components/add-new-message/add-new-message.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginPageComponent,
    MessageListComponent,
    AddNewMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
