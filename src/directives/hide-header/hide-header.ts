import { Directive, Input, Renderer } from '@angular/core';

/**
 * Generated class for the HideHeaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {
  oldScrollTop: number = 0;
  @Input("header") header: HTMLElement;
  // @Input("header1") header1: HTMLElement;
  constructor( public renderer: Renderer) {
    console.log('Hello HideHeaderDirective Directive');
  }
 
  ngOnInit() {
    this.renderer.setElementStyle(this.header, 'display', 'none');
   // this.renderer.setElementStyle(this.header1, 'webkitTransition', 'top 100ms');
    // this.renderer.setElementStyle(this.footer, 'webkitTransition', 'bottom 700ms');
  }
 
    onContentScroll(event) {
      console.log(event);
      if (event.scrollTop - this.oldScrollTop > 142) {
      //  console.log("down")
        this.renderer.setElementStyle(this.header, 'display', 'block');
       // this.renderer.setElementStyle(this.header1, 'webkitTransition', 'top 700ms');
       //this.renderer.setElementStyle(this.header1, 'top', '-56px');
        // this.renderer.setElementStyle(this.footer, 'bottom', '-56px');
      }
      else if(event.scrollTop - this.oldScrollTop > 0) {
      //  console.log("up")
      // this.renderer.setElementStyle(this.header1, 'top', '0px');
        this.renderer.setElementStyle(this.header, 'display', 'none');
        // this.renderer.setElementStyle(this.footer, 'bottom', '0px');
      }
    }
  }


