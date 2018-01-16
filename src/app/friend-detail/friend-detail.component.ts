import { Component, OnInit, Input } from '@angular/core';
import { Friend } from '../classes/friend';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {
  // Sets variable 'friend' to Friend (input bind);
  // Bind happens in the component selector printed on the html <app-friend-detail [friend]="selectedFriend"></app-friend-detail>
  // @Input() friend: Friend;

  // The above is currently not in use as we deprecated onSelect()
  // Now we obtain the specific friend's details through a get call using the id extracted from the URL
  friend: Friend;
  getFriend(): void {
      // route.snapshot is a static image of the route information
      // paramMap is a dictionary of route parameter values (always of type string) extracted from the URL
      // + operator converts the string to a number
      const id = +this.route.snapshot.paramMap.get('id');
      this.friendService.getFriend(id)
          .subscribe(friend => this.friend = friend);
  }

  // Function to return to the previous page
  goBack(): void {
      this.location.back();
  }

  save(): void {
    this.friendService.updateFriend(this.friend)
      .subscribe(() => this.goBack());
  }

  // Instantiating private methods of each needed module/service
  constructor(
      // ActivatedRoute holds information about the route;
      // We are using this to access the route's bag of parameters extracted from the URL (in particular, the friend's id)
      private route: ActivatedRoute,
      // Obtains friend's data from the remote server
      private friendService: FriendService,
      // Angular service for interacting with browser; We'll be using this to navigate back to the previous view
      private location: Location
  ) { }

  ngOnInit() {
      console.log("onInit FriendDetailComponent");
      this.getFriend();
  }

}
