import { Component } from '@angular/core';
import { IndexComponent } from './index/index.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IndexComponent],
  template: `<app-index></app-index>`,
})
export class AppComponent {}
