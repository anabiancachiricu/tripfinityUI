import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-wishlist-dialog',
  standalone: true,
  imports: [ MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule],
  templateUrl: './wishlist-dialog.component.html',
  styleUrl: './wishlist-dialog.component.scss'
})
export class WishlistDialogComponent {
  wishlistName: string = '';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

    
  constructor(
    public dialogRef: MatDialogRef<WishlistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.wishlistName);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addOption() {
    const inputValue = this.myControl.value;
    if (inputValue && !this.options.includes(inputValue)) {
      this.options.push(inputValue);
      this.myControl.setValue('');
    }
  }

}
