import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { PokemonSummary, PokemonSummaryResponse } from '../../../models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [TitleCasePipe, CommonModule, MatIconModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: PokemonSummary[] = [];
  loading = false;
  offset = 0;

  constructor(
    private pokemonService: PokemonService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.fetchPokemonList();
  }

  fetchPokemonList(): void {
    this.loading = true;
    this.pokemonService.getPokemonList(20, this.offset).subscribe((data: PokemonSummaryResponse) => {
      this.pokemonList = data.results;
      this.loading = false;
    });
  }

  refreshPokemonList(): void {
    this.offset += 20;
    this.fetchPokemonList();
  }

  getIdFromUrl(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

  verDetalle(pokemon: PokemonSummary): void {
    const id = this.getIdFromUrl(pokemon.url);
    console.log('Navegando a /detalle/' + id); // 👀 debug
    this.router.navigate(['/Pokemon/detalle', id]);
  }


}
