import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule}  from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';  
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatButtonModule,
    MatSelectModule, 
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  colorControl = new FormControl('accent' as ThemePalette);

 
}
