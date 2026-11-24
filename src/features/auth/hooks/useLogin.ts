
import { useState } from 'react';

import { loginUser } from '../services/auth.service';
import type { AuthUser } from '../types/auth.types';

interface UseLoginProps {
  onSuccess: (user: AuthUser) => void;
}

export function useLogin({ onSuccess }: UseLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const updateEmail = (value: string) => {
    setEmail(value);
    setError('');
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    setError('');
  };

  const validate = (): boolean => {
    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (isSubmitting || !validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const user = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      onSuccess(user);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous);
  };

  return {
    email,
    password,
    showPassword,
    isSubmitting,
    error,
    updateEmail,
    updatePassword,
    togglePasswordVisibility,
    submit,
  };
}
