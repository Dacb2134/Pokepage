// src/app/services/evolution.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EvolutionService {

  constructor(private api: ApiService) {}

  getEvolutionChainList(limit: number = 20, offset: number = 0): Observable<any> {
    return this.api.get(`evolution-chain?limit=${limit}&offset=${offset}`);
  }

  getEvolutionChainDetail(id: number): Observable<any> {
    return this.api.get(`evolution-chain/${id}`);
  }
}
