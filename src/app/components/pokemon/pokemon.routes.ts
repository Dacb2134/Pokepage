// src/app/components/pokemon/pokemon.routes.ts
import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonListDetailComponent } from './pokemon-list-detail/pokemon-list-detail.component';



export const pokemonroutes: Routes = [
  {
    path: 'List',
    component: PokemonListComponent
  },
  
    { path: 'detalle/:id', component: PokemonListDetailComponent }
  
  
];
