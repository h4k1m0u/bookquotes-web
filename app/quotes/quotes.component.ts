/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

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
    styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
    quotes: MatTableDataSource<Quote>;
    displayedColumns = ['text', 'author'];
    page: number;
    numPages: number;

    // inject http
    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    ngOnInit() {
        // get quotes in requested page asynchronously
        this.route.params.subscribe(params => {
            this.page = Number(params['page'])
            this.getQuotes();
        });
    }

    getQuotes() {
        // get quotes from the server
        this.http.get<Feed>(URL + '/api/quotes/?page=' + this.page).subscribe(
            res => {
                let results: Quote[] = res.results;
                this.quotes = new MatTableDataSource<Quote>(results);
                this.numPages = Math.ceil(res.count / 10);
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
