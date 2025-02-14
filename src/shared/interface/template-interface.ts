export interface CallToAction {
  text: string;
  url: string;
  type: "url" | "phone";
}

export interface TemplateInterface {
  name: string;
  category: string;
  type: string;
  language: string;
  header?: string | undefined;
  body?: string;
  footer?: string;
  interactiveAction?: string;
  add_security_recommendation?: boolean;
  code_expiration_minutes?: number;
}

export interface ContactInterface {
  contactId: string;
  name: string;
  countryCode: string;
  phone: string;
}

export interface url {
  buttonName: string;
  url: string;
}

export interface InteractiveActionsInterface {
  action: string;
  url?: url[];
  quickReply?: string[];
  phone?: string[];
}
