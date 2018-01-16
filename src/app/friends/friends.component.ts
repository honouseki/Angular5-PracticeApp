import { Component, OnInit } from '@angular/core';
import { Friend } from '../classes/friend';
// import { FRIENDS } from '../mock-friends';
// Now we are using a SERVICE to retrieve the FRIENDS list above
import { FriendService } from '../friend.service';

@Component({
  // selector = name of the component to reference on the html
  selector: 'app-friends',
  // path of the html page for said component
  templateUrl: './friends.component.html',
  // custom style sheet for component
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  // Sets 'friends' to FRIENDS list imported above
  // friends = FRIENDS;
  // Since we are not importing the file directly anymore,
  //     and we are retrieving the data through a service (FriendService)...
  //     Note: use = to set variables to something, : to declare variables of a certain type     
  friends: Friend[];

  // Sets selectedFriend to an instance of the class "Friend""
  selectedFriend: Friend;

  // Function to retrieve friends
  getFriends(): void {
    // Sets friends (array value) to the result of the function 'getFriends()' in friendService
    // Important to note: This is currently a 'synchronous' operation (which is okay when using the mock-data directly as there is little-no delay)
    //     This means the browser will wait (freeze) while it waits for the response
    //     But when accessing data from other sources (databases), it MUST be done asynchronously
    //          to avoid the browser from blocking while the service waits to retrieve data
    //     An asynchronous signature of some kind is required so that it can return a callback, a Promise, or an Observable
    //     In this case, the HttpClient.get() angular method will return an Observable
    // this.friends = this.friendService.getFriends()

    // Using Observables (the above line does not); using Observable.subscribe()
    // This is done asynchronously; this waits for the Observable to emit the array of friends (which could happen anytime)
    //     Subscribe then passes the emitted array to the callback, setting the friends property
    this.friendService.getFriends()
      .subscribe(friends => this.friends = friends);
  }

  // Void function (returns nothing) that takes in a parameter 'friend' of class type "Friend"
  // When triggered by an event handler (click on the html), sets selectedFriend to specific object that was clicked
  onSelect(friend: Friend): void {
    this.selectedFriend = friend;
    console.log(this.selectedFriend);
  }

  // Function to add a new friend
  add(name: string): void {
    // trim() removes whitespace from both ends of a string
    name = name.trim();
    if (!name) { return; }
    this.friendService.addFriend({ name } as Friend)
      .subscribe(friend => this.friends.push(friend));
  }

  // Function to delete friend
  delete(friend: Friend): void {
    // Removing deleted friend from friends array; filters (loop) where friend DOES NOT EQUAL to deleted friend
    this.friends = this.friends.filter(f => f !== friend);
    // ALWAYS subscribe, even if nothing is to be done with the returned Observable
    //     The Observable does NOTHING until something subscribes; by excluding subscribe(), the service will not send the request to the server 
    this.friendService.deleteFriend(friend).subscribe();
  }

  // Use the constructor to inject FriendService
  // A private method is made (friendService) and set to an instance of FriendService
  constructor(private friendService: FriendService) { }

  ngOnInit() {
    console.log("onInit FriendsComponent");
    // Upon page load, run getFriends() to retrieve list of friends, set to 'friends' variable
    this.getFriends();
  }

}
