import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from 'src/app/components/snack-bar/snack-bar.component';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';
import { UserInsert, UserList, UserUpdate } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/UserService';
import { ValidationComponent } from 'src/app/dialogs/validation/validation.component';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.html',
  styleUrls: ['./users-dialog.scss']
})
export class UsersDialog {
  title: string = '';
  obj: UserList = new UserList();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ValidationComponent>,
    private userService: UserService,
    private spinner: SpinnerService,
    private snackBar: SnackBar) {
    this.title = data.title;
    console.log(data.object)
    if (this.title != "New") this.obj = data.object;
  }

  Save = () => {
    if (this.title == "Edit")
      this.UpdateUsers();
    if (this.title == "New")
      this.InsertUsers();
  };

  Close = () => this.dialogRef.close();

  InsertUsers = () => {
    this.spinner.show();
    const objInsert: UserInsert = new UserInsert();
    objInsert.name = this.obj.name;
    objInsert.password = this.obj.password;
    objInsert.admin = this.obj.admin;

    this.userService.Insert(objInsert).subscribe({
      next: () => this.snackBar.open("Successfully Inserted", false),
      error: error => {
        this.spinner.hide();
        this.snackBar.open(error, true);
        this.Close();
      },
      complete: () => {
        this.spinner.hide();
        this.Close();
      }
    });
  }

  UpdateUsers = () => {
    this.spinner.show();
    const objUpdate: UserUpdate = new UserUpdate();
    objUpdate.id = this.obj.id;
    objUpdate.name = this.obj.name;
    objUpdate.password = this.obj.password;
    objUpdate.admin = this.obj.admin;

    this.userService.Update(objUpdate).subscribe({
      next: () => this.snackBar.open("Successfully Update", false),
      error: error => {
        this.spinner.hide();
        this.snackBar.open(error, true);
        this.Close();
      },
      complete: () => {
        this.spinner.hide();
        this.Close();
      }
    });
  }
}
