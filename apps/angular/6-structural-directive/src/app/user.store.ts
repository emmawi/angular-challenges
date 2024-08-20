import { Injectable, WritableSignal, signal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  user: WritableSignal<User | undefined> = signal<User | undefined>(undefined, {
    equal: (a, b) => {
      // Check if array is the same
      const isArrayEqual = (
        a: string[] | undefined,
        b: string[] | undefined,
      ) => {
        if (a === undefined || b === undefined) return false;
        if (a.length !== b.length) return false;
        return a.every((v, i) => v === b[i]);
      };
      return (
        a?.name === b?.name &&
        isArrayEqual(a?.roles, b?.roles) &&
        a?.isAdmin === b?.isAdmin
      );
    },
  });

  add(user: User) {
    this.user.set(user);
  }

  hasRole(roles: Role[]): boolean {
    const hasRole = this.user()?.roles.some((r) => roles?.includes(r));
    return hasRole || false;
  }
}
