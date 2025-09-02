// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PokemonDetail, PokemonSummaryResponse } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private api: ApiService) {}

  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonSummaryResponse> {
    return this.api.get<PokemonSummaryResponse>(`pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetail(nameOrId: string | number): Observable<PokemonDetail> {
    return this.api.get<PokemonDetail>(`pokemon/${nameOrId}`);
  }
}
