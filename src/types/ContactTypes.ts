export interface Contact {
  id: string;
  avatar_url: string;
  firstName: string;
  lastName: string;
  email: string;
  tags: string[];
}

export interface NewContact {
  record_type: string;
  'first name': { value: string; modifier: string; label: string }[];
  'last name': { value: string; modifier: string; label: string }[];
  email: { value: string; modifier: string; label: string }[];
  privacy: { edit: null; read: null };
  owner_id: null;
}