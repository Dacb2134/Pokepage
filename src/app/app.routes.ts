
import { Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { NotFoundComponent } from './components/views/not-found/not-found.component';

export const routes: Routes = [
    //pokemon
     { path: 'Pokemon', loadChildren: () => import('./components/pokemon/pokemon.routes').then(m => m.pokemonroutes) },
    //pokemonvs
    { path: 'vs', loadChildren: () => import('./components/pokemonvs/pokemonvs.routes').then(m => m.pokemonvsroutes)},


    //Homen
    { path: 'home', component: HomeComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: 'not-found' }

];
