import { Injectable, inject } from '@angular/core';
import {
  CanMatch,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
} from '@angular/router';
import { UserStore } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class HasPermissionGuard implements CanMatch {
  private router = inject(Router);
  private userStore = inject(UserStore);

  canMatch(route: Route): MaybeAsync<GuardResult> {
    const user = this.userStore.user();
    if (user === undefined) {
      this.router.navigate(['/']);
      return false;
    }
    if (user.isAdmin && route.data?.['isAdmin']) {
      return true;
    }
    const requiredPermission = route.data?.['roles'];
    if (requiredPermission === undefined) {
      return false;
    }
    return this.userStore.hasRole(requiredPermission);
  }
}
