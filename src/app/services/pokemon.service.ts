// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private api: ApiService) {}

  getPokemonList(limit: number = 20, offset: number = 0): Observable<any> {
    return this.api.get(`pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetail(nameOrId: string | number): Observable<any> {
    return this.api.get(`pokemon/${nameOrId}`);
  }
}
