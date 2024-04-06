import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/core/entities/Item';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService } from 'src/app/core/services/DocumentService';
import { DocumentList } from 'src/app/core/models/Document';
import { SnackBar } from '../snack-bar/snack-bar.component';
import { SpinnerService } from '../spinner/spinner.service';
import { UserService } from 'src/app/core/services/UserService';
import { PdfService } from 'src/app/core/services/PdfService';
import { PendingsComponent } from 'src/app/dialogs/pendings/pendings.component';
import { NewDocumentDialogComponent } from 'src/app/dialogs/new-document/new-document-dialog.component';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css'],
})

export class MainTableComponent implements OnInit {
  displayedColumns: string[] = ['documentName', 'requesterName', 'documentStatus', 'requestDate', 'document', 'download'];
  itemList: MatTableDataSource<DocumentList> = new MatTableDataSource<DocumentList>;
  documentList: MatTableDataSource<DocumentList> = new MatTableDataSource<DocumentList>;
  pageSizes: number[] = [25, 50, 100];
  length: number = 0;

  listStatus: string[] = ['All', 'Pending', 'Approved', 'Disapproved'];
  filter: string = "All";

  userId: number = -1;
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
    this.userId = this.userService.getCurrentUserId()!;
    if (this.userId != -1)
      this.Refresh();
  }

  Insert = () => this.OpenDialog("New Document");

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
    this.documentService.GetListById(this.userId).subscribe({
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
            return data.documentStatus.toLowerCase().includes(filter.toLowerCase());
          return data.documentStatus.toLowerCase() === filter.toLowerCase();
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
        this.pdfService.OpenPdf(data);
        this.spinner.hide();
      },
      error: error => {
        this.spinner.hide();
        this.snackBar.open(error.message, true);
      },
      complete: () => this.spinner.hide()
    });
  }

  Download = (id: number, number: string) => {
    this.spinner.show();
    this.documentService.GetPdf(id).subscribe({
      next: (data) => {
        this.pdfService.DownloadPdf(data, number);
        this.spinner.hide();
      },
      error: error => {
        this.spinner.hide();
        this.snackBar.open(error.statusText, true);
      },
      complete: () => this.spinner.hide()
    });
  }

  OpenDialog(title: string, object?: Item) {
    const dialogRef = this.dialog.open(NewDocumentDialogComponent, {
      height: 'auto',
      maxHeight: '90vh',
      width: 'auto',
      maxWidth: '60vw',
      disableClose: true,
      data: {
        title: title,
        object: object
      },
    });
    dialogRef.afterClosed().subscribe(() => this.Refresh());
  }

  CheckStatus(status: string, guid: string) {
    const _status = status.toLowerCase();
    if (_status.includes("pending") || _status == "disapproved")
      this.OpenPendingDialog(guid);
  }

  OpenPendingDialog(guid: string) {
    const dialogRef = this.dialog.open(PendingsComponent, {
      height: '50vh',
      width: '50vw',
      disableClose: true,
      data: {
        documentGuid: guid,
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
