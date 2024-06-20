import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './wishlist-dialog.component.html',
  styleUrls: ['./wishlist-dialog.component.scss']
})
export class WishlistDialogComponent {
  wishlistName: string = '';
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<WishlistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  ngOnInit() {
    this.getOptions();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addOption() {
    const inputValue = this.myControl.value;
    if (inputValue && !this.options.includes(inputValue)) {
      this.options.push(inputValue);
      this.myControl.setValue('');
    }
    this.dialogRef.close(inputValue);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getOptions() {
    const apiUrl = `http://localhost:8080/wishlist/getWishlistsNameByUser`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    this.http.get<string[]>(apiUrl, { headers }).subscribe(
      (response: string[]) => {
        this.options = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
