export class ApprovalUpdate {
  documentId: number = -1;
  approverId: number = -1;
  approved: boolean = false;
}

export class Approval {
  approvalDate: string = "";
  approverName: string = "";
  approved: boolean = false;
}