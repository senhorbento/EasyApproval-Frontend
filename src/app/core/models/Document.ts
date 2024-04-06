export class DocumentList {
  id: number = -1;
  requesterName: string = "";
  name: string = "";
  status: string = "";
  requestDate: string = "";
}

export class DocumentInsert {
  name: string = "";
  requesterId: number = -1;
  status: string = "";
  pdfOriginal: string = "";
  approverName: string[] = [];
}