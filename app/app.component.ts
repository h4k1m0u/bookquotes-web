import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    appName = 'Bookquotes';
    
    // inject classes
    constructor(private router: Router, private googleAnalytics: Angulartics2GoogleAnalytics) { }

    ngOnInit() {
        // redirect to list of quotes
        this.router.navigateByUrl('/bookquotes/quotes/1');
    }
}
