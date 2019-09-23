import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private baseUrl = environment.apiUrl 
  constructor(
    private http: HttpClient 
  ) { }

  getByID(id:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/planets/${id}`);
  }

}
