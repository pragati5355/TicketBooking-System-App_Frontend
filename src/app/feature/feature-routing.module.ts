import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { PlaysComponent } from './plays/plays.component';

const routes: Routes = [

  {
    path : 'movies',
    component : MoviesComponent
  },
  {
    path : 'plays',
    component : PlaysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
