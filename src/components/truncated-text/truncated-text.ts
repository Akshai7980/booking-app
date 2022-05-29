import { Component, Input } from '@angular/core';

/**
 * Generated class for the TruncatedTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'truncated-text',
  templateUrl: 'truncated-text.html'
})
export class TruncatedTextComponent {

  @Input() text: string;
  @Input() limit: number = 40;
  truncating = true;

  constructor() {
    
  }

}
