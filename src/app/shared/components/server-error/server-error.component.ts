import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent {
  error?: any;

  constructor(private elementRef: ElementRef, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras.state?.['error'];
    console.log(this.error);
  }



  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const eyes = this.elementRef.nativeElement.querySelectorAll('.eye');
    
    eyes.forEach((eye: HTMLElement) => {
      const rect = eye.getBoundingClientRect();
      const x = (rect.left) + (rect.width / 2);
      const y = (rect.top) + (rect.height / 2);
      const rad = Math.atan2(event.pageX - x, event.pageY - y);
      const rot = (rad * (180 / Math.PI) * -1) + 180;
      
      eye.style.transform = `rotate(${rot}deg)`;
    });
  }
}
