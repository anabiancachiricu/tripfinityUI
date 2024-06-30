import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports:[
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
    MatProgressSpinnerModule
  ],
  standalone:true,
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  prompt: string = '';
  // messages: { type: string, text: string }[] = [];
  messages: { type: string, text: any }[] = [];
  isPending: boolean = false;
  hasMessages: boolean = false;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log("is logged in: " + this.authService.isLoggedIn());
      console.log("token: " + this.authService.getAuthToken());
    }
  }

  askAiChat() {
    this.isPending = true;
    const apiUrl = `http://localhost:8080/chat/ask`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams().set('prompt', this.prompt);

    // Add the user's question to the messages array
    this.messages.push({ type: 'question', text: this.prompt });
    this.prompt = '';  // Clear the input field

    this.http.get<any>(apiUrl, { headers, params }).subscribe(
      (response: any) => {
        // Add the AI's response to the messages array
        // this.messages.push({ type: 'response', text: response.message });
        this.messages.push({ type: 'response', text: response });
        this.isPending = false;
        this.hasMessages = true;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isPending = false;
      }
    );
  }
}
