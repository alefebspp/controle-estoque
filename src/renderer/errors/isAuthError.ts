import { FirebaseError } from 'firebase/app';

export function isAuthError(error: unknown): error is FirebaseError {
  return (
    typeof (error as FirebaseError).code === 'string' &&
    (error as FirebaseError).code.startsWith('auth/')
  );
}
