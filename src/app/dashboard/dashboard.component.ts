import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errMessage: string;

  note: Note = new Note();
  notes: Array<Note> = [];
  constructor(private notesService: NotesService) {

  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(data => {
      if (data) {
        this.notes = data;
      } else {
        this.errMessage = 'We are unable to retreive notes list.';
      }
    },
      error => {
        this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
      });
  }

  takeNote() {
    if (this.note.text && this.note.title) {

      this.notesService.addNote(this.note).subscribe(
        data => {
          if (data) {
            this.notes.push(this.note);
          } else {
            this.errMessage = 'We are unable to add the selected note.';
          }
        },
        error => {
          this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
        });
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
