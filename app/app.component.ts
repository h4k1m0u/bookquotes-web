import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    appName = 'Bookquotes';
    
    // inject classes
    constructor(private router: Router) { }

    ngOnInit() {
        // redirect to list of quotes
        this.router.navigateByUrl('/quotes/1');
    }
}
