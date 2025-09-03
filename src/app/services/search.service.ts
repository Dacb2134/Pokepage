import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PokemonSummaryResponse } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private api: ApiService) {}

  searchPokemon(params: { name?: string; type?: string; ability?: string }): Observable<PokemonSummaryResponse> {
    const query = new URLSearchParams();
    if (params.name) {
      query.set('name', params.name);
    }
    if (params.type) {
      query.set('type', params.type);
    }
    if (params.ability) {
      query.set('ability', params.ability);
    }
    const endpoint = query.toString() ? `pokemon?${query.toString()}` : 'pokemon';
    return this.api.get<PokemonSummaryResponse>(endpoint);
  }
}
