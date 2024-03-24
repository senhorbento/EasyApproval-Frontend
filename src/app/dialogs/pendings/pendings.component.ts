import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBar } from 'src/app/components/snack-bar/snack-bar.component';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';
import { Approval } from 'src/app/core/models/Approval';
import { ApprovalService } from 'src/app/core/services/ApprovalService';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.scss']
})
export class PendingsComponent {
  displayedColumns: string[] = ['approverId', 'approvedDate', 'approval', 'observation'];
  pendingList: MatTableDataSource<Approval> = new MatTableDataSource<Approval>;
  length: number = 0;

  documentGuid: string = "";

  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PendingsComponent>,
    private approvalService: ApprovalService,
    private spinner: SpinnerService,
    private snackBar: SnackBar
  ) {
    this.documentGuid = data.documentGuid;
    this.GetPendings();
  }

  Close = () => this.dialogRef.close();

  GetPendings() {
    this.spinner.show();
    this.approvalService.GetListById(this.documentGuid).subscribe({
      next: data => {
        this.pendingList = new MatTableDataSource(data);
        this.pendingList.sort = this.sort;
        this.length = this.pendingList._filterData.length;
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
}
