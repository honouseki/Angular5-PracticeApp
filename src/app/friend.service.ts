import { Injectable } from '@angular/core';
import { Friend } from './classes/friend';
// The file imported below is no longer needed when using http services instead to retrieve data
import { FRIENDS } from './mock-friends';
// Injecting the MessageService into FriendService  (which is then injected into the FriendsComponent)
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
// Using Http
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class FriendService {
  // GET method returning mock friends list
  //getFriends(): Friend[] {
  //  return FRIENDS;
  //}

  // Using Observables
  //     of(FRIENDS) returns an Observable<Friend[]> that emits a single value, the array of mock friends
  // If wanting to test, remove the OG, and comment out the function of the same name under HttpClient
  getFriendsOG(): Observable<Friend[]> {
    // Triggers messageService.add to push new message string item
    this.messageService.add('FriendService: Fetched friends');
    return of(FRIENDS);
  }

  // Returns an Observable<Friend> that emits a Friend object,
  //     specifically finding the friend where the id is equal to the parameter value
  getFriendOG(id: number): Observable<Friend> {
      // Note: Using backticks `` will embed the id
      this.messageService.add(`FriendService: Fetched specified friend #${id}`);
      return of(FRIENDS.find(friend => friend.id === id));
  }
  // ---------------------------------
  // Using HttpClient
  // HTTP is a request/response protocol; when a request is made, a single response is returned
  private log(message: string) {
    this.messageService.add("FriendService: " + message);
  }
  private friendsUrl = 'api/friends';
  // This HttpClient.get call returns an 'observable of an array of Friend objects'
  // By default, http.get returns JSON data
  // Note: Some APIs may bury the data you want within an object
  //     You'd have to dig that data out by processing the Obserable result with the RxJS 'map' operator
  getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.friendsUrl)
      // A pipe takes in data input and transforms it to a desired output
      .pipe(
        // FriendService methods will tap into the flow of observable values and send a message (via log())
        //     'tap' looks at the observable values, does *something* with those values, then passes them along
        tap(friends => this.log(`fetched friends`)),
      // Error handling; 'pipe' through a catchError() operator to catch errors
        catchError(this.handleError('getFriends', []))
      );
  }

  // GET friend by ID; will 404 if not found
  getFriend(id: number): Observable<Friend> {
    const url = `${this.friendsUrl}/${id}`;
    return this.http.get<Friend>(url)
      .pipe(
        tap(_ => this.log(`fetched friend with id ${id}`)),
        catchError(this.handleError(`getFriend id ${id}`, []))
      );
  }

  // PUT ; Updates friend
  updateFriend(friend: Friend): Observable<any> {
    // API expects a special header in HTTP save requests, defined below
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // URL is unchanged because the api knows which friend to update by looking at its id
    return this.http.put(this.friendsUrl, friend, httpOptions)
      .pipe(
        tap(_ => this.log(`updated friend with id ${friend.id}`)),
        catchError(this.handleError<any>(`updateFriend id ${friend.id}`))
      );
  }

  // POST ; Adds new friend
  addFriend(friend: Friend): Observable<Friend> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Friend>(this.friendsUrl, friend, httpOptions)
      .pipe(
        tap((friend: Friend) => this.log(`added friend with id ${friend.id}`)),
        catchError(this.handleError<Friend>('addFriend'))
      );
  }

  // DELETE ; Deletes friend
  deleteFriend(friend: Friend | number): Observable<Friend> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // Sets id either to the number parameter(provided the type is a number) or to friend.id (if input is a friend object)
    const id = typeof friend === 'number' ? friend : friend.id;
    const url = `${this.friendsUrl}/${id}`;
    return this.http.delete<Friend>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted friend with id ${id}`)),
        catchError(this.handleError<Friend>('deleteFriend'))
      );
  }

  // Search by name; as a user types a name into the search box, repeated HTTP requests will be made filtering by that name
  searchFriends(term: string): Observable<Friend[]> {
    if (!term.trim()) {
      // If no search term, return empty array
      return of([]);
    }
    return this.http.get<Friend[]>(`${this.friendsUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found friends matching "${term}"`)),
        catchError(this.handleError<Friend[]>('searchFriends', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Consoles the error; send to remote logging infrastructure
      console.error(error);
      // Transforms error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Allows app to keep running by returning an empty result
      return of(result as T);
    }
  }

  // ----------------------------------
  // Setting private method 'messageService' to injected MessageService
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

}
