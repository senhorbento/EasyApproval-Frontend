import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class PdfService {
  private Base64ToBlob(base64: string, type = 'application/pdf'): Blob {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);

    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return new Blob([bytes], {type: type});
  }

  OpenPdf(base64String: string) {
    const blob = this.Base64ToBlob(base64String);

    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  }

  DownloadPdf(base64String: string, filename: string) {
    const blob = this.Base64ToBlob(base64String);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.parentNode!.removeChild(link);
  }
}
