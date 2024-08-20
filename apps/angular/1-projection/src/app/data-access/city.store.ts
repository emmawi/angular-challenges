import { Injectable, WritableSignal, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  cities: WritableSignal<City[]> = signal([]);

  addAll(cities: City[]) {
    this.cities.set(cities);
    console.log(this.cities());
  }

  addOne(city: City) {
    this.cities.set([...this.cities(), city]);
  }

  deleteOne(id: number) {
    this.cities.set(this.cities().filter((s) => s.id !== id));
  }
}
