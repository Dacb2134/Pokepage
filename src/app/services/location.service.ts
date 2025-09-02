// src/app/services/location.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private api: ApiService) {}

  getLocationList(limit: number = 20, offset: number = 0): Observable<any> {
    return this.api.get(`location?limit=${limit}&offset=${offset}`);
  }

  getLocationDetail(nameOrId: string | number): Observable<any> {
    return this.api.get(`location/${nameOrId}`);
  }
}
