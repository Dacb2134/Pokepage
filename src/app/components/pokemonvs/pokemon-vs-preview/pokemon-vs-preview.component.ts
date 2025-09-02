import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-vs-preview',
  imports: [],
  templateUrl: './pokemon-vs-preview.component.html',
  styleUrls: ['./pokemon-vs-preview.component.css']

})

export class PokemonVsPreviewComponent implements OnInit, OnDestroy {
  pokemonSprites: string[] = [];
  leftIndex = 0;
  rightIndex = 1;
  intervalId: any;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList(20).subscribe(response => {
      const results = response.results;
      results.forEach((pokemon: any) => {
        this.pokemonService.getPokemonDetail(pokemon.name).subscribe(detail => {
          this.pokemonSprites.push(detail.sprites.front_default);
        });
      });
    });

    this.intervalId = setInterval(() => {
      this.leftIndex = (this.leftIndex + 1) % this.pokemonSprites.length;
      this.rightIndex = (this.rightIndex + 2) % this.pokemonSprites.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  goToVersus(): void {
    this.router.navigate(['/vs/versus']);
  }
}


