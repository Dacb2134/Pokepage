// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private api: ApiService) {}

  getItemList(limit: number = 20, offset: number = 0): Observable<any> {
    return this.api.get(`item?limit=${limit}&offset=${offset}`);
  }

  getItemDetail(nameOrId: string | number): Observable<any> {
    return this.api.get(`item/${nameOrId}`);
  }
}
