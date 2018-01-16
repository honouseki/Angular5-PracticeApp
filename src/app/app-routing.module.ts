import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendsComponent } from './friends/friends.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';

// Setting routes; must import the component (as in the above)
// The path is the intended URL (in this case, localhost:4200/friends)
// The component router creates when navigating to the route path above
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default Route when path is empty (and path fully matches)
  { path: 'dashboard', component: DashboardComponent },
  { path: 'friends', component: FriendsComponent },
  // Parameterized url; ':id' indicates a placeholder for a specific id
  { path: 'friends/:id', component: FriendDetailComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    // This method forRoot() configures the router at the app's root level
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

