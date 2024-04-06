import { catchError, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './Constants';
import { HTTPService } from './HTTPService';
import { DocumentInsert, DocumentList } from '../models/Document';

@Injectable({
  providedIn: 'root',
})

export class DocumentService {
  constructor(private http: HttpClient) { }

  GetListById = (id: number) => this.http.get<DocumentList[]>(`${Constants.DOCUMENT}/read/${id}`).pipe(
    map((response: DocumentList[]) => response),
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  GetListByName = (name: string) => this.http.get<DocumentList[]>(`${Constants.DOCUMENT}/readToApprover/${name}`).pipe(
    map((response: DocumentList[]) => response),
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  GetPdf = (id: number) => this.http.get<any>(`${Constants.DOCUMENT}/readPdf/${id}`).pipe(
    map((response: any) => response),
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  Insert = (obj: DocumentInsert) => this.http.post(`${Constants.DOCUMENT}/create`, obj).pipe(
    catchError(error => { throw HTTPService.HandleError(error); })
  );
}
