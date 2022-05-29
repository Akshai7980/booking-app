import { Directive, Input, Renderer } from '@angular/core';

/**
 * Generated class for the ScrollHideDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[scroll-hide]', // Attribute selector
  host: {
    "(ionScroll)": "onContentScroll($event)",
  },
})
export class ScrollHideDirective {
    oldScrollTop: number = 10;
    @Input("header") header: HTMLElement;
    constructor(private renderer: Renderer){
    console.log('Hello ScrollHideDirective Directive');
  }
  ngOnInit() {
    this.renderer.setElementStyle(this.header, 'display', 'none');
  }
 
    onContentScroll(event) {
      console.log(event);
      if (event.scrollTop - this.oldScrollTop > 10) {
      //  console.log("down")
        this.renderer.setElementStyle(this.header, 'display', 'block');
      }
      else if(event.scrollTop = this.oldScrollTop > 5) {
       // console.log("up")
        this.renderer.setElementStyle(this.header, 'display', 'none');
      }
    } 
}

