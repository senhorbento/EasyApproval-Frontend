import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBar } from 'src/app/components/snack-bar/snack-bar.component';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';
import { UsersDialog } from '../../dialogs/users-dialog/users-dialog';
import { UserService } from 'src/app/core/services/UserService';
import { UserList } from 'src/app/core/models/User';

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.css']
})
export class AdminUsersTable {
  displayedColumns: string[] = ['name', 'admin', 'edit'];
  itemList: MatTableDataSource<UserList> = new MatTableDataSource<UserList>;
  documentList: MatTableDataSource<UserList> = new MatTableDataSource<UserList>;
  pageSizes: number[] = [25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private userService: UserService,
    private snackBar: SnackBar,
    private spinner: SpinnerService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.Refresh();
  }

  Refresh() {
    this.spinner.show();
    this.userService.GetList().subscribe({
      next: data => {
        this.itemList = new MatTableDataSource(data);
        this.itemList.paginator = this.paginator;
        this.itemList.sort = this.sort;
        this.documentList = new MatTableDataSource(data);
        this.spinner.hide();
      },
      error: error => {
        this.snackBar.open(error.message, true);
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide;
      }
    });
  }

  Edit = (obj: any) => this.OpenDialog("Edit", obj);

  Insert = () => this.OpenDialog("New");

  OpenDialog(title: string, object?: any) {
    const dialogRef = this.dialog.open(UsersDialog, {
      height: 'auto',
      maxHeight: '90vh',
      width: 'auto',
      maxWidth: '75vw',
      disableClose: true,
      data: {
        title: title,
        object: object
      },
    });
    dialogRef.afterClosed().subscribe(() => this.Refresh());
  }
}
