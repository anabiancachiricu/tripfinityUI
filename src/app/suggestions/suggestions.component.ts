import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [
    MatButtonModule,
    NavbarComponent,
    NavbarComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss'
})
export class SuggestionsComponent {

  cards = [
    { name: 'Discover the Ultimate Beach Getaways: Your Dream Vacation Awaits!', image: '/assets/beach_books.jpg' , text:'Are you yearning for the sun-kissed shores and the gentle caress of ocean breezes? Look no further! Embark on an unforgettable journey to the world’s most breathtaking beach destinations, where turquoise waters meet golden sands, and paradise comes to life.' },
    { name: 'Unveil the Majesty of Mountain Retreats: Your Dream Adventure Awaits!', image: '/assets/mountain_backpack.jpg', text:'Are you craving the crisp mountain air and the thrill of alpine vistas? Look no further! Embark on an unforgettable journey to the world’s most breathtaking mountain destinations, where majestic peaks meet tranquil valleys, and adventure comes to life.'},
    { name: 'Discover the Vibrancy of Urban Escapes: Your Dream City Adventure Awaits!', image: '/assets/city.jpg', text: 'Are you longing for the excitement of bustling streets and the allure of urban sophistication? Look no further! Embark on an unforgettable journey to the world’s most dynamic city destinations, where culture, history, and modernity converge to create the ultimate urban experience.' }
];
currentCardIndex = 0;

ngOnInit() {
    setInterval(() => this.nextCard(), 5000); // change card every 3 seconds
}

nextCard() {
    this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
}



}
