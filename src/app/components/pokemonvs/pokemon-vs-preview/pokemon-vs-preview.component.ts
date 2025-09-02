import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { Router } from '@angular/router';
import { Subscription, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-vs-preview',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-vs-preview.component.html',
  styleUrls: ['./pokemon-vs-preview.component.css']
})

export class PokemonVsPreviewComponent implements OnInit, OnDestroy {
  pokemonSprites: string[] = [];
  leftIndex = 0;
  rightIndex = 1;
  intervalId: any;
  private subscription?: Subscription;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.pokemonService
      .getPokemonList(20)
      .pipe(
        switchMap((response) =>
          forkJoin(
            response.results.map((pokemon: any) =>
              this.pokemonService.getPokemonDetail(pokemon.name)
            )
          )
        )
      )
      .subscribe({
        next: (details: any[]) => {
          this.pokemonSprites = details.map(
            (detail) => detail.sprites.front_default
          );
        },
        error: (error) => {
          console.error('Error fetching Pokémon details', error);
        },
      });

    this.intervalId = setInterval(() => {
      this.leftIndex = (this.leftIndex + 1) % this.pokemonSprites.length;
      this.rightIndex = (this.rightIndex + 2) % this.pokemonSprites.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.subscription?.unsubscribe();
  }

  goToVersus(): void {
    this.router.navigate(['/vs/versus']);
  }
}


