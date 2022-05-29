import { NgModule } from '@angular/core';

import { ScrollHideDirective } from './scroll-hide/scroll-hide';
import { HideHeaderDirective } from './hide-header/hide-header';
@NgModule({
	declarations: [ScrollHideDirective,
    HideHeaderDirective],
	imports: [],
	exports: [ScrollHideDirective,
    HideHeaderDirective]
})
export class DirectivesModule {}
