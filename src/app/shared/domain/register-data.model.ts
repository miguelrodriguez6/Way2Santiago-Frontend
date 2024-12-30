export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  description: string;
  date_of_birth: string;
  nationality: string;
  role: "DEFAULT" | "ADMIN";
}
