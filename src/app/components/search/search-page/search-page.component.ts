import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../../services/pokemon.service';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe, SearchFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  query: string = '';
  result: any;
  error?: string;

  constructor(private pokemonService: PokemonService) {}

  onSubmit(): void {
    if (!this.query) {
      this.result = null;
      return;
    }

    this.pokemonService.getPokemonDetail(this.query.toLowerCase()).subscribe({
      next: (data) => {
        this.result = data;
        this.error = undefined;
      },
      error: () => {
        this.result = null;
        this.error = 'Pokémon no encontrado';
      }
    });
  }
}

