import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from 'src/app/components/snack-bar/snack-bar.component';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';
import { ApprovalUpdate } from 'src/app/core/models/Approval';
import { ApprovalService } from 'src/app/core/services/ApprovalService';
import { DocumentService } from 'src/app/core/services/DocumentService';
import { UserService } from 'src/app/core/services/UserService';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {
  obj: ApprovalUpdate = new ApprovalUpdate();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ValidationComponent>,
    private userService: UserService,
    private approvalService: ApprovalService,
    private spinner: SpinnerService,
    private snackBar: SnackBar) {
    this.obj.approved = true;
    this.obj.documentId = data.guid;
  }

  Close = () => this.dialogRef.close();

  UpdateApproval = () => {
    this.spinner.show();
    this.approvalService.Approve(this.obj).subscribe({
      next: () => this.snackBar.open("Successfully Signed", false),
      error: error => {
        this.spinner.hide();
        this.snackBar.open("Successfully Signed", false);
        this.Close();
      },
      complete: () => {
        this.spinner.hide();
        this.Close();
      }
    });
  }
}
