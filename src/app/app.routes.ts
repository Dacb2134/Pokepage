import { Routes } from '@angular/router';
import { views } from './components/views/views.routes';

export const routes: Routes = [
  //pokemon
  {
    path: 'Pokemon',
    loadChildren: () =>
      import('./components/pokemon/pokemon.routes').then(
        (m) => m.pokemonroutes
      ),
  },
  //pokemonvs
  {
    path: 'vs',
    loadChildren: () =>
      import('./components/pokemonvs/pokemonvs.routes').then(
        (m) => m.pokemonvsroutes
      ),
  },
  //search
  {
    path: 'search',
    loadChildren: () =>
      import('./components/search/search.routes').then(
        (m) => m.searchroutes
      ),
  },
  ...views,
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];
