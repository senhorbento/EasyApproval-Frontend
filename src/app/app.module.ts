import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { MyDocumentsPageComponent } from './shared/my-documents-page/my-documents-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainTableComponent } from './components/main-table/main-table.component';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPService } from './core/services/HTTPService';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SignerPageComponent } from './shared/signer-page/signer-page.component';
import { NewDocumentDialogComponent } from './dialogs/new-document/new-document-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ValidationComponent } from './dialogs/validation/validation.component';
import { MatSelectModule } from '@angular/material/select';
import { SignerTableComponent } from './components/signertable/signer-table.component';
import { PendingsComponent } from './dialogs/pendings/pendings.component';
import { AdminUsersPage } from './admin/users-page/admin-users-page';
import { AdminUsersTable } from './admin/components/admin-users-table/admin-users-table.component';
import { UsersDialog } from './admin/dialogs/users-dialog/users-dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    MyDocumentsPageComponent,
    MainTableComponent,
    SignerPageComponent,
    NewDocumentDialogComponent,
    ValidationComponent,
    SignerTableComponent,
    PendingsComponent,
    AdminUsersPage,
    AdminUsersTable,
    UsersDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [
    HTTPService,
    { provide: HTTP_INTERCEPTORS, useClass: HTTPService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
