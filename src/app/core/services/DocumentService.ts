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

  GetListById = (id: number) => this.http.get<DocumentList[]>(`${Constants.DOCUMENT}/Read/${id}`).pipe(
    map((response: DocumentList[]) => response),
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  GetPdf = (guid: string) => this.http.get<any>(`${Constants.DOCUMENT}/ReadPdf/${guid}`).pipe(
    map((response: any) => response),
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  Insert = (obj: DocumentInsert) => this.http.post(`${Constants.DOCUMENT}/Create`, obj).pipe(
    catchError(error => { throw HTTPService.HandleError(error); })
  );
}
