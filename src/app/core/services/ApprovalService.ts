import { catchError, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './Constants';
import { Approval, ApprovalUpdate } from '../models/Approval';
import { HTTPService } from './HTTPService';

@Injectable({
  providedIn: 'root',
})

export class ApprovalService {
  constructor(private http: HttpClient) { }

  Approve = (obj: ApprovalUpdate) => this.http.put(`${Constants.APPROVAL}/updateById`, obj).pipe(
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  GetListById = (id: string) => this.http.get<Approval[]>(`${Constants.APPROVAL}/read/${id}`).pipe(
    map((response: Approval[]) => response),
    catchError(error => { throw HTTPService.HandleError(error); })
  );
}
