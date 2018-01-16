import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
// Use these operators (below) to reduce the number of calls to searchFriends()
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Friend } from '../classes/friend';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-friend-search',
  templateUrl: './friend-search.component.html',
  styleUrls: ['./friend-search.component.css']
})
export class FriendSearchComponent implements OnInit {
  // friends$ set to an Observable (of a Friend array)
  friends$: Observable<Friend[]>;
  // Declared as an RxJS Subject; special type of Observable that allows values to be multicasted to many Observers
  //     Plain Observables are unicast, where each subscribed Observer owns an independent execution of the Observable
  // A Subject is both a source of observable values and an Observable; you can subscribe to it as any other
  private searchTerms = new Subject<string>();

  // You can push values into the Subject by calling its next(value) method
  //     (searchTerms emits a steady stream of search terms)
  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    // Use these operators to reduce the number of calls to searchFriends()
    // This pipes the searchTerms Observable through a sequence of RxJS operators to reduce those calls,
    //     returning search data in a timely manner
    this.friends$ = this.searchTerms.pipe(
      // Wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // Ignore new term if same as the previous
      distinctUntilChanged(),
      // Switch to new search observable each time term changes; run searchfriends function from service
      switchMap((term:string) => this.friendService.searchFriends(term))
    );
  }

}
