import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkModeSubject = new BehaviorSubject<boolean>(false);

  public activeazaDarkMode() {
    this.isDarkModeSubject.next(!this.isDarkModeSubject.value);
  }

}
