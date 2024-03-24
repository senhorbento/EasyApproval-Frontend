export class ApprovalInsert {
  approverId: string[] = [];
}

export class ApprovalUpdate {
  documentId: string = "";
  approverId: string = "";
  approved: boolean = false;
}

export class Approval {
  documentId: string = "";
  approverId: string = "";
  approved: boolean = false;
}
