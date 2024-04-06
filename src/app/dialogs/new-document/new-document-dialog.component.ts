import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { SnackBar } from 'src/app/components/snack-bar/snack-bar.component';
import { SpinnerService } from 'src/app/components/spinner/spinner.service';
import { DocumentInsert } from 'src/app/core/models/Document';
import { DocumentService } from 'src/app/core/services/DocumentService';
import { UserService } from 'src/app/core/services/UserService';

@Component({
  selector: 'app-item',
  templateUrl: './new-document-dialog.component.html',
  styleUrls: ['./new-document-dialog.component.scss']
})
export class NewDocumentDialogComponent implements OnInit {
  private validApprovers: string[] = [];
  private approverData = new BehaviorSubject<string[]>([]);
  listApprover = this.approverData.asObservable();


  copyControl = new FormControl<string>('');
  approverControl = new FormControl<string>('');
  filteredApproverOptions: Observable<string[]> = new Observable<string[]>;

  panelOpenState: boolean = false;
  title: string = "";

  item: DocumentInsert = new DocumentInsert();

  fileName: string = "File not selected";
  displayedColumns: string[] = ['Approver', 'Delete'];

  approver: string = "";

  errorDocument: boolean = false;
  errorPdf: boolean = false;
  errorApprover: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewDocumentDialogComponent>,
    private userService: UserService,
    private documentService: DocumentService,
    private snackBar: SnackBar,
    private spinner: SpinnerService) {
    this.title = this.data.title;
    this.item = this.data.object ?? new DocumentInsert();
    this.item.requesterId = this.userService.getCurrentUserId()!;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.userService.GetListNames().subscribe({
      next: (data) => {
        this.validApprovers = data;
      },
      error: error => {
        this.spinner.hide();
        this.snackBar.open(error.statusText, true);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
    this.filteredApproverOptions = this.approverControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return value ? this._filter(value) : this.validApprovers.slice();
      }),
    );
  }

  displayApprover = (approver: string): string => approver ?? '';
  private _filter = (name: string): string[] => this.validApprovers.filter(approver => approver.toLowerCase().includes(name.toLowerCase()));

  Close = () => this.dialogRef.close();

  RemoveApprover = (approver: string) => {
    this.approverData.next(this.approverData.value.filter(item => item !== approver));
    this.item.approverName = [...this.approverData.value];
  }
  AddApprover = () => {
    if (!this.approver)
      return;
    this.approver = this.approver.toLowerCase();
    const splited = this.approver.split(";");
    splited.forEach(element => {
      if (this.approverData.value.filter(item => element == item).length > 0)
        return this.snackBar.open("Approver already inserted", true);
      if (this.validApprovers.find(approver => element == approver.toLowerCase()) == undefined)
        return this.snackBar.open("Approver not valid", true);
      this.item.approverName = [...this.approverData.value, element];
      this.approverControl.setValue(null);
      this.approverData.next(this.item.approverName);
    });
    this.approver = "";
  }

  CheckFields = () => {
    let isValid = true;
    this.errorDocument = false;
    this.errorPdf = false;

    if (this.approverData.value.length < 1) {
      isValid = false;
      this.errorApprover = true;
    }
    if (!this.item.name) {
      isValid = false;
      this.errorDocument = true;
    }
    if (this.fileName == "File not selected") {
      isValid = false;
      this.errorPdf = true;
    }
    if (!isValid)
      this.snackBar.open("Check the fields marked in red", true);
    return isValid;
  }

  UploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const result = event.target.result;
        this.item.pdfOriginal = result.split(',')[1];
        this.fileName = file.name;
      }
      reader.readAsDataURL(file);
      reader.onerror = (error) => {
        this.snackBar.open(`Error reading file: ${error}`, true);
      };
    }
  }

  Insert() {
    this.spinner.show();
    if (this.CheckFields()) {
      this.item.status = "Pending: " + this.item.approverName.length;
      this.documentService.Insert(this.item).subscribe({
        next: () => this.snackBar.open("Successfully Inserted", false),
        error: error => {
          this.spinner.hide();
          this.snackBar.open(error.statusText, true);
        },
        complete: () => {
          this.spinner.hide();
          this.Close();
        }
      });
    }
    this.spinner.hide();
  }
}
