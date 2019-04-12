import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from './document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) { }


  getDocument(id: string) {
    this.socket.emit('getDoc', id);
  }

  newDocument() {
    this.socket.emit('addDoc', {id: this.docId(), doc: ''})
  }

  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }

  private docId() {
    let num = '';
    const possible = '0123456789';
     for (let i = 0; i < 4; i++) {
      num += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'Room' + num;
  }
}
