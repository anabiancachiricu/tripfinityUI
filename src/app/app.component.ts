import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tripfinityUI';
  images = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    'assets/image4.jpg'
  ];

  currentSlide = 0;

  get transformStyle() {
    return `translateX(-${this.currentSlide * 25}%)`;
  }

  prev() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }
}
