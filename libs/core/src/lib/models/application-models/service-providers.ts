export interface ServiceProvider {
  id?: number;
  email: string;
  phoneNumber?: string;
  password: string;
  roleaId?: number;
  status?: number;
  role: Role;
  dateCreated?: Date;
  token?: string;
}

export interface Role {
  id: number;
  name: string;
}
