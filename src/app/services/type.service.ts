// src/app/services/type.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private api: ApiService) {}

  getTypeList(): Observable<any> {
    return this.api.get('type');
  }

  getTypeDetail(nameOrId: string | number): Observable<any> {
    return this.api.get(`type/${nameOrId}`);
  }
}
