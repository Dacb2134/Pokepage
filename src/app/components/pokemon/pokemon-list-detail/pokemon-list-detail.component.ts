import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonDetail } from '../../../models/pokemon';

@Component({
  selector: 'app-pokemon-list-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list-detail.component.html',
  styleUrls: ['./pokemon-list-detail.component.css']
})
export class PokemonListDetailComponent implements OnInit {
  pokemon: PokemonDetail | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPokemonDetail(id);
    }
  }

  fetchPokemonDetail(id: string): void {
    this.loading = true;
    this.pokemonService.getPokemonDetail(id).subscribe((data: PokemonDetail) => {
      this.pokemon = data;
      this.loading = false;
    });
  }
}
