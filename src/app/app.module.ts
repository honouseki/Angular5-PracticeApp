// Importing needed modules/packages/libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Import ALL components and set them below as proper
import { AppComponent } from './app.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Import ALL services and set them below as proper
import { FriendService } from './friend.service';
import { MessageService } from './message.service';
import { FriendSearchComponent } from './friend-search/friend-search.component';

@NgModule({
  declarations: [
    AppComponent,
    FriendsComponent,
    FriendDetailComponent,
    MessagesComponent,
    DashboardComponent,
    FriendSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Module below intercepts HTTP requests and returns simulated server responses
    // Remove when using a real server to receive real server responses
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [
    FriendService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
