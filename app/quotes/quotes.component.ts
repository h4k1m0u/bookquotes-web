/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants';
import { AddService } from '../services/add.service';
import { MatTableDataSource } from '@angular/material';

// Success and error response interfaces
interface Quote {
    text: string;
    author: string;
}

interface Feed {
    count: number;
    next: string;
    previous: string;
    results: Quote[];
}

@Component({
    selector: 'app-quotes',
    templateUrl: './quotes.component.html',
    styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
    quotes: MatTableDataSource<Quote>;
    displayedColumns = ['text', 'author'];

    // inject http
    constructor(private http: HttpClient, private add: AddService) { }

    ngOnInit() {
        this.getQuotes()

        // receive boolean from add component to update quotes
        this.add.added.subscribe((isAdded) => {
            this.getQuotes();
        });
    }

    getQuotes() {
        // get quotes from the server
        this.http.get<Feed>(URL + '/api/quotes/').subscribe(
            res => {
                let results: Quote[] = res.results;
                this.quotes = new MatTableDataSource<Quote>(results);
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
