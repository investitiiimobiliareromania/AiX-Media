import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Adresă de email nevalidă'),
  password: z.string().min(6, 'Parola trebuie să aibă cel puțin 6 caractere'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Adresă de email nevalidă'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Parola nouă trebuie să aibă cel puțin 6 caractere'),
  confirmPassword: z.string().min(6, 'Confirmarea parolei este obligatorie'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Parolele nu se potrivesc',
  path: ['confirmPassword'],
});

export const updateProfileSchema = z.object({
  full_name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere').max(100),
  avatar_url: z.string().url('URL avatar nevalid').optional().or(z.literal('')),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Parola curentă este obligatorie'),
  newPassword: z.string().min(6, 'Parola nouă trebuie să aibă cel puțin 6 caractere'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
