import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService } from 'src/app/core/services/DocumentService';
import { DocumentList } from 'src/app/core/models/Document';
import { SnackBar } from '../snack-bar/snack-bar.component';
import { SpinnerService } from '../spinner/spinner.service';
import { UserService } from 'src/app/core/services/UserService';
import { ValidationComponent } from 'src/app/dialogs/validation/validation.component';
import { PdfService } from 'src/app/core/services/PdfService';

@Component({
  selector: 'app-signer-table',
  templateUrl: './signer-table.component.html',
  styleUrls: ['./signer-table.component.css']
})
export class SignerTableComponent {
  displayedColumns: string[] = ['documentName', 'requesterName', 'documentStatus', 'requestDate', 'document', 'validate'];
  itemList: MatTableDataSource<DocumentList> = new MatTableDataSource<DocumentList>;
  documentList: MatTableDataSource<DocumentList> = new MatTableDataSource<DocumentList>;
  pageSizes: number[] = [25, 50, 100];
  length: number = 0;

  listStatus: string[] = ['All', 'Pending', 'Approved', 'Disapproved'];
  filter: string = "All";

  userName: string = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private documentService: DocumentService,
    private userService: UserService,
    private pdfService: PdfService,
    private snackBar: SnackBar,
    private spinner: SpinnerService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userName = this.userService.getCurrentUser()!;
    if (this.userName != "")
      this.Refresh();
  }

  IsPending = (status: string) => status.includes("Pending");

  ApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.itemList.filter = filterValue.trim().toLowerCase();

    if (this.itemList.paginator)
      this.itemList.paginator.firstPage();
  }

  Filter() {
    let filterValue = this.filter;
    this.documentList.filter = filterValue;
    this.itemList.data = this.documentList.filteredData;
  }

  Refresh() {
    this.spinner.show();
    this.documentService.GetListByName(this.userName).subscribe({
      next: data => {
        this.itemList = new MatTableDataSource(data);
        this.itemList.paginator = this.paginator;
        this.itemList.sort = this.sort;
        this.length = this.itemList._filterData.length;
        if (length > 100)
          this.pageSizes = [...this.pageSizes, length]
        this.documentList = new MatTableDataSource(data);
        this.documentList.filterPredicate = (data: any, filter: string) => {
          if (filter === "" || filter === "All") {
            return true;
          }
          if (filter === "Pending")
            return data.status.toLowerCase().includes(filter.toLowerCase());
          return data.status.toLowerCase() === filter.toLowerCase();
        };
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

  View = (id: number) => {
    this.spinner.show();
    this.documentService.GetPdf(id).subscribe({
      next: (data) => {
        this.pdfService.OpenPdf(data.pdfFile);
        this.spinner.hide();
      },
      error: error => {
        this.spinner.hide();
        this.snackBar.open(error.statusText, true);
      },
      complete: () => this.spinner.hide()
    });
  }

  Validate = (guid: string) => {
    const dialogRef = this.dialog.open(ValidationComponent, {
      height: '50vh',
      width: '40vw',
      disableClose: true,
      data: {
        guid: guid
      },
    });
    dialogRef.afterClosed().subscribe(() => this.Refresh());
  }

  GetDocumentStatusClass(status: string) {
    const _status = status.toLowerCase();
    if (_status.includes("pending"))
      return 'status-pending';
    if (_status == "approved")
      return 'status-approved';
    if (_status == "disapproved")
      return 'status-disapproved';
    return '';
  }
}
