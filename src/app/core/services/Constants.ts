import { environment } from "src/environments/environment";

export class Constants {
  private static BASE_URL = environment.apiUrl;

  static APPROVAL : string = `${this.BASE_URL}/approval`;
  static DOCUMENT : string = `${this.BASE_URL}/document`;
  static USER : string = `${this.BASE_URL}/user`;
}

