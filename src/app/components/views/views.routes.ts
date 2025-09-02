import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const views: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  // Additional view routes can be added here
];
