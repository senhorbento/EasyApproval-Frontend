export class UserLogin {
  user: string = "";
  password: string = "";
}

export class UserInsert {
  name: string = "";
  password: string = "";
  admin: boolean = false;
}

export class UserUpdate {
  id: number = -1;
  name: string = "";
  password: string = "";
  admin: boolean = false;
}

export class UserList{
  id: number = -1;
  name: string = "";
  password: string = "";
  admin: boolean = false;
}

export class UserInfo {
  isValid: boolean = false;
  id: number = -1;
  name: string = "";
  admin: boolean = false;
}
