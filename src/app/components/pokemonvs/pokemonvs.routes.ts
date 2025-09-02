import { PokemonVsPageComponent } from './pokemon-vs-page/pokemon-vs-page.component';
import { Routes } from '@angular/router';
import { PokemonVsPreviewComponent } from './pokemon-vs-preview/pokemon-vs-preview.component';

export const pokemonvsroutes: Routes=[
    {
        path: 'vspreview',
            component: PokemonVsPreviewComponent
    },
    { path: 'versus', 
        component: PokemonVsPageComponent },
]
