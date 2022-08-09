import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { CounterContainerComponent } from './counter-container/counter-container.component';
import { FillableFormComponent } from './fillable-form/fillable-form.component';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
    {path: 'form', component: FillableFormComponent},
    {path: 'clock', component: CounterContainerComponent},
    {path: 'list', component: ListViewComponent},
    {path: '', component: FillableFormComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }