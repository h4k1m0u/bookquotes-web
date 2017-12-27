import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

// import components
import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';

// import ngModel
import { FormsModule } from '@angular/forms';
// import http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import router
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: 'quotes', component: QuotesComponent},
];


@NgModule({
    declarations: [
        AppComponent,
        QuotesComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),

        // material
        BrowserAnimationsModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatTableModule,
        MatDialogModule,
        MatCardModule,
        MatChipsModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
