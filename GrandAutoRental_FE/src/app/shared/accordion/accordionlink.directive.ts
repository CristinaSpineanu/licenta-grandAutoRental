import {
  Directive,
  HostBinding,
  Inject,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

import { AccordionDirective } from './accordion.directive';

@Directive({
  selector: '[appAccordionLink]'
})
export class AccordionLinkDirective implements OnInit, OnDestroy {
  @Input()
  public group: any;

  @HostBinding('class.selected')
  @Input()
  get selected(): boolean {
    return this._selected;
  }

  protected _selected: boolean=false;
  protected nav: AccordionDirective;

  public constructor(@Inject(AccordionDirective) nav: AccordionDirective) {
    this.nav = nav;
  }

  set selected(value: boolean) {
    this._selected = value;
    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  public ngOnInit(): any {
    this.nav.addLink(this);
  }

  public ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  public toggle(): any {
    this.selected = !this.selected;
  }
}
