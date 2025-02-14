export interface MessageInterface {
  id: number;
  sender: string;
  text: string;
  time: string;
}

export interface CallToAction {
  text: string;
  url: string;
  type: "url" | "phone";
}

export interface ApiResponse {
  url: string;
  reqType: string;
  headers: string;
}

export interface ColumnsInterface {
  field: string;
  headerName: string;
  width: number;
  editable: boolean;
}

export interface ResponseInterface {
  response: any;
  statusCode: number;
}

export interface ResponseInterface {
  response: any;
  statusCode: number;
}

export interface UserInterface {
  currentUser: object;
  otherUsers: object;
}
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryCode: string;
  phone: string;
  tags?: string[];
}

// i might thing that these interfaces willbe require later on so for now i am not removing them.
// interface Message {
//   id: number;
//   sender: string;
//   text: string;
//   time: string;
// }

//will be required later on
// interface component {
//   header: string;
//   body: string;
//   footer: string;
//   button: string;
// }

// interface Contact {
//   contactId: string;
//   name: string;
//   countryCode: string;
//   phone: string;
// }
