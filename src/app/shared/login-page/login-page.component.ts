import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/components/snack-bar/snack-bar.component';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';
import { UserLogin } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/UserService';

@Component({
  selector: 'button-page-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  user: UserLogin = new UserLogin();

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: SnackBar,
    private spiner: SpinnerService) { }

  ngOnInit(): void { }

  CheckBlank() {
    if (!this.user.user) {
      this.snackBar.open("User Cannot Be Blank", true);
      return true;
    }
    if (!this.user.password) {
      this.snackBar.open("Password Cannot Be Blank", true);
      return true;
    }
    return false;
  }

  Login() {
    if (!this.CheckBlank()) {
      this.spiner.show();
      this.userService.Login(this.user).subscribe({
        next: () => this.router.navigate(['/requests']),
        error: error => {
          this.spiner.hide();
          this.snackBar.open(error, true);
        },
        complete: () => this.spiner.hide()
      });
    }
  }
}
