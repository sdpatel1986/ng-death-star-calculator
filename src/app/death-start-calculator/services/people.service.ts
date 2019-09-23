import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../models/person';
import { SwapiResultModel } from '../models/search-model';
import { Planet } from '../models/planet';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private baseUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  search(name: string) {
    return this.http.get<SwapiResultModel>(`${this.baseUrl}/people?search=${name}`)
      .pipe(map(list =>
        list.results.map(person => Object.assign(person, { homeworld: this.getHomeWorldId(person.homeworld) }))));
  }

  private getHomeWorldId(homeWorlURL: string): number {
    const splittedURL = homeWorlURL.split('/');
    return +splittedURL[splittedURL.length - 2];
  }

}
