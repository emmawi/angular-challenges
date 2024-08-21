import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStore {
  name = signal('Bob');
  address = signal(
    {
      street: '',
      zipCode: '',
      city: '',
    },
    {
      equal: (a, b) =>
        a.street === b.street && a.zipCode === b.zipCode && a.city === b.city,
    },
  );
  note = signal('');
  title = signal('');
  salary = signal(0);
}
