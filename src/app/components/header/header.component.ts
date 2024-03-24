import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/UserService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: string | null = "";
  acessLevel: string | null = "";
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  Logout() {
    this.userService.Logout();
    this.router.navigate(['']);
  }

  CheckAdmin = (): boolean => {
    return true;
    const roles = this.acessLevel!.toLowerCase();
    return roles.includes('admin');
  }

  Users = () => this.router.navigate(['/admin/users']);
  MyDocuments = () => this.router.navigate(['/mydocuments']);
  RequestsToMe = () => this.router.navigate(['/requests']);
}
