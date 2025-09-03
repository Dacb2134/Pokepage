import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../../services/pokemon.service';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';
import { PokemonSummary } from '../../../models/pokemon';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe, SearchFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  query: string = '';
  filters: { type?: string; ability?: string } = {};
  results: PokemonSummary[] | null = null;
  error?: string;

  constructor(private pokemonService: PokemonService) {}

  onFiltersChange(filters: { type?: string; ability?: string }): void {
    this.filters = filters;
  }

  onSubmit(): void {
    const params = {
      name: this.query ? this.query.toLowerCase() : undefined,
      type: this.filters.type,
      ability: this.filters.ability,
    };

    this.pokemonService.searchPokemon(params).subscribe({
      next: (data) => {
        this.results = data.results;
        this.error = data.results.length ? undefined : 'No se encontraron resultados';
      },
      error: () => {
        this.results = null;
        this.error = 'Error en la búsqueda';
      }
    });
  }
}
