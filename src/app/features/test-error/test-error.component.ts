import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-test-error',
  imports: [
    MatButton
  ],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  errService = inject(ErrorService);
  validationErrors?: string[];
  get400Error() {
    this.errService.get400Error().subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get401Error() {
    this.errService.get401Error().subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get404Error() {
    this.errService.get404Error().subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get500Error() { 
    this.errService.get500Error().subscribe({
      next: response => console.log(response),  
      error: error => console.log(error)
    });
  }

  get400ValidationError() { 
    this.errService.grt400ValidationError().subscribe({
      next: response => console.log(response),  
      error: error => this.validationErrors = error
    });
  }
}
