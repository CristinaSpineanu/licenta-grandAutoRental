import { Component, HostBinding } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'grandautorental_fe';

  @HostBinding('class') get themeMode() {
    return this.isDarkMode ? 'theme-dark' : '';
  }

  constructor(private themeService: ThemeService) {}

  get isDarkMode(): boolean {
    //ia valoarea curenta a temei din service
    return this.themeService.isDarkModeSubject.value;
  }
}
