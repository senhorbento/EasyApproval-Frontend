import { BehaviorSubject, catchError, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './Constants';
import { UserInfo, UserInsert, UserList, UserLogin, UserUpdate } from '../models/User';
import { HTTPService } from './HTTPService';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private BASE_URL: string = Constants.USER;
  private currentUserSource = new BehaviorSubject<UserInfo | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  getCurrentUser = () => sessionStorage.getItem('name');
  getCurrentUserId = () => Number(sessionStorage.getItem('id'));
  getCurrentAcessLevel = () => sessionStorage.getItem('roles');

  constructor(private http: HttpClient) { }

  Logout = () => sessionStorage.clear();

  Login = (user: UserLogin) => this.http.get<UserInfo>(`${Constants.USER}/read/${user.user}/${user.password}/`).pipe(
    map((user: UserInfo) => {
      if (user.isValid) {
        sessionStorage.setItem('roles', user.admin ? 'admin' : 'user');
        sessionStorage.setItem('id', user.id.toString());
        sessionStorage.setItem('name', user.name);
      }
      else {
        throw {
          message: user.id ?
            "Password Is Incorrect" :
            "User Not Found"
        };
      }
    }),
    catchError(error => {
      throw HTTPService.HandleError(error);
    })
  );

  GetList = () => this.http.get<UserList[]>(`${Constants.USER}/read`).pipe(
    map((response: UserList[]) => response),
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  GetListNames = () => this.http.get<UserList[]>(`${Constants.USER}/read/names`).pipe(
    map((response: UserList[]) => response),
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  Insert = (obj: UserInsert) => this.http.post(`${Constants.USER}/create`, obj).pipe(
    catchError(error => { throw HTTPService.HandleError(error); })
  );

  Update = (obj: UserUpdate) => this.http.put(`${Constants.USER}/update`, obj).pipe(
    catchError(error => { throw HTTPService.HandleError(error); })
  );

}
