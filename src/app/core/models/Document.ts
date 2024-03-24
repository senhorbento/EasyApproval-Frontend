import { ApprovalInsert } from "./Approval";

export class DocumentList {
  id: number = -1;
  requesterId: number = -1;
  name: string = "";
  status: string = "";
  requestDate: string = "";
}

export class DocumentInsert {
  name: string = "";
  requesterId: number = -1;
  status: string = "";
  pdfOriginal: string = "";
  approvals: ApprovalInsert = new ApprovalInsert();
}