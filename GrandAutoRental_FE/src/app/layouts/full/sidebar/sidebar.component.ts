import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import jwt_decode from 'jwt-decode';
import { MenuItems } from 'src/app/shared/items-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
})
export class AppSidebarComponent implements OnDestroy {
  public mobileQuery: MediaQueryList;
  public token:any = localStorage.getItem('token');
  public tokenPayload: any;

  private _mobileQueryListener: () => void;

  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public menuItems:MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.tokenPayload=jwt_decode(this.token);
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
