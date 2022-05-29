import { NgModule } from '@angular/core';
import { SafeUrlPipe } from './safe-url/safe-url';
import { SortPipe } from './sort/sort';
import { DomesticSortPipe } from './domestic-sort/domestic-sort';
@NgModule({
	declarations: [SafeUrlPipe,
    SortPipe,DomesticSortPipe],
	imports: [],
	exports: [SafeUrlPipe,
    SortPipe,DomesticSortPipe]
})
export class PipesModule {}
