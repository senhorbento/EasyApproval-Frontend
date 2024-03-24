import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent as LoginPageComponent } from './shared/login-page/login-page.component';
import { MyDocumentsPageComponent } from './shared/my-documents-page/my-documents-page.component';
import { SignerPageComponent } from './shared/signer-page/signer-page.component';
import { AdminUsersPage } from './admin/users-page/admin-users-page';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'mydocuments', component: MyDocumentsPageComponent },
  { path: 'requests', component: SignerPageComponent },
  { path: 'admin/users', component: AdminUsersPage },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
