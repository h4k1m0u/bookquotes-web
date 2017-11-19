import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../constants';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AddService } from '../services/add.service';

// Success and error response interfaces
interface Quote {
    text: string;
    firstname: string;
    lastname: string;
}

interface ErrorMessage {
    text: string[1];
    firstname: string[1];
    lastname: string[1];
    non_field_errors: string[1];
}

interface ErrorResponse {
    error: ErrorMessage;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router, private dialogRef: MatDialogRef<AddComponent>,
                private snackBar: MatSnackBar, private add: AddService) { }

    ngOnInit() {
    }

    onAdd(text: string, firstname: string, lastname: string) {
        // triggered when add expense button is clicked
        const body = {
            text: text,
            firstname: firstname,
            lastname: lastname
        };

        this.http.post<Quote>(URL + '/api/quotes/', body).subscribe(
            res => {
                // close dialog
                this.dialogRef.close(res.firstname + ' ' + res.lastname);

                // send isAdded=true to quotes component
                this.add.added.next(true);
            },
            (err: ErrorResponse) => {
                let error = err.error;

                // show error messages in snackbar
                if (error.hasOwnProperty('text') && error.hasOwnProperty('firstname') && error.hasOwnProperty('lastname'))
                    this.snackBar.open('Text: ' + error.text[0] + ' Firstname: ' + error.firstname[0] + ' Lastname: ' + error.firstname[0], 'Error', {duration: 2000});
                else {
                    if (error.hasOwnProperty('text'))
                        this.snackBar.open('Text: ' + error.text[0], 'Error', {duration: 2000});
                    if (error.hasOwnProperty('firstname'))
                        this.snackBar.open('Firstname: ' + error.firstname[0], 'Error', {duration: 2000});
                    if (error.hasOwnProperty('lastname'))
                        this.snackBar.open('Lastname: ' + error.lastname[0], 'Error', {duration: 2000});
                    if (error.hasOwnProperty('non_field_errors'))
                        this.snackBar.open('Credentials: ' + error.non_field_errors[0], 'Error', {duration: 2000});
                }
            }
        );
    }
}
