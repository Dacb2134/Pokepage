// src/app/services/ability.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  constructor(private api: ApiService) {}

  getAbilityList(): Observable<any> {
    return this.api.get('ability');
  }

  getAbilityDetail(nameOrId: string | number): Observable<any> {
    return this.api.get(`ability/${nameOrId}`);
  }
}
