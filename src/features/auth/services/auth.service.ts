
import type {
  AuthUser,
  LoginCredentials,
} from '../types/auth.types';

export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthUser> {
  // Temporary mock authentication.
  // Replace this function with your backend API request later.

  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    id: 'mock-user-001',
    email: credentials.email,
    fullName: 'Go-Along User',
  };
}
