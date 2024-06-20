import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authService';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { WishlistDialogComponent } from '../wishlist-dialog/wishlist-dialog.component';


@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [NavbarComponent,
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
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.scss'
})
export class ActivityDetailsComponent {

  activity: any;
  city: string ='';
  activityId: string ='';
  visibleImages: string[] = [];
  images: string[]=[];
  private currentIndex: number = 0;
  private intervalId: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log("is logged in"  + this.authService.isLoggedIn());
      console.log("is logged in with token"  + this.authService.getAuthToken());
      this.city = this.route.snapshot.paramMap.get('city')!;
      this.activityId = this.route.snapshot.paramMap.get('id')!;
      this.getActivityDetails();
      this.initializeVisibleImages();
      this.startCarousel();
    }
  }

  getActivityDetails() {
    const apiUrl = `http://localhost:8080/activities/searchByIdAndCity`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams();
    params = params.append('id', this.activityId);
    params = params.append('city', this.city);

    this.http.get<any>(apiUrl, { headers, params}).subscribe(
      (response: any) => {
        this.activity = response;
        this.images=this.activity.pictures;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

   public goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initializeVisibleImages(): void {
    this.visibleImages = this.images.slice(0, 3);
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.moveCarousel();
    }, 3000); // Change image every 3 seconds
  }

  moveCarousel(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateVisibleImages();
  }

  updateVisibleImages(): void {
    const nextIndex = (this.currentIndex + 3) % this.images.length;
    if (this.currentIndex <= this.images.length - 3) {
      this.visibleImages = this.images.slice(this.currentIndex, this.currentIndex + 3);
    } else {
      this.visibleImages = [
        ...this.images.slice(this.currentIndex),
        ...this.images.slice(0, nextIndex),
      ];
    }
  }

  public addToWishlist(){}

  public addToFavourites(){
    const apiUrl = `http://localhost:8080/favourite/addToFavouritesForUser`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    const params = new HttpParams()
      .set('activityId', this.activity.activityId)
      .set('city', this.city)
      .set('activityName', this.activity.name);

    this.http.post(apiUrl, {}, { headers, params }).subscribe(
      (response: any) => {
        console.log('Added to favourites successful', response);
        this.openSnackBar("Added to favourites", "OK");
      },
      (error) => {
        console.error('Add to favourites failed', error.errorMessage);
        this.errorMessage = error.errorMessage;
        this.openSnackBar("Already added to favourites", "OK");
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(WishlistDialogComponent, {
      width: '400px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with the result:', result);
        this.addItemToWishlist(result);
        // Handle the result here (e.g., save it to your service or update the UI)
      }
    });
  }

  addItemToWishlist(result: string){

    const apiUrl = `http://localhost:8080/wishlist/addItemToWishlist`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    const params = new HttpParams()
      .set('wishlistName', result)
      .set('city',this.city )
      .set('activityName', this.activity.name)
      .set('activityId', this.activity.activityId);

    this.http.post(apiUrl, {}, { headers, params }).subscribe(
      (response: any) => {
        console.log('New item added to wishlist', response);
        this.openSnackBar("Item added to wishlist", "OK");
      },
      (error) => {
        console.error('Add new item failed', error.errorMessage);
        this.errorMessage = error.errorMessage;
        this.openSnackBar("Add new item failed", "OK");
      }
    );

  }
}
