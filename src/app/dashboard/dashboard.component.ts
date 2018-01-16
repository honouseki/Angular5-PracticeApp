import { Component, OnInit } from '@angular/core';
import { Friend } from '../classes/friend';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // This component's set-up is extremely similar to FriendsComponent
  // Reference that file for notes (friends.components.ts)
  friends: Friend[];

  getFriends(): void {
    // Grabs the first 4 of the returned array with the slice function
    this.friendService.getFriends()
      .subscribe(friends => this.friends = friends.slice(0, 4));
  }

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    console.log("onInit DashboardComponent");
    this.getFriends();
  }

}
