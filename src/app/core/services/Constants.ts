import { environment } from "src/environments/environment";

export class Constants {
  private static BASE_URL = environment.apiUrl;

  static APPROVAL : string = `${this.BASE_URL}/Approval`;
  static DOCUMENT : string = `${this.BASE_URL}/Document`;
  static USER : string = `${this.BASE_URL}/User`;
}

