'use server';

import { createClient } from './supabase/server';
import { loginSchema, forgotPasswordSchema, resetPasswordSchema, updateProfileSchema, changePasswordSchema } from './validations/auth.schema';
import { AuditService } from './audit';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validated = loginSchema.safeParse({ email, password });
  if (!validated.success) {
    return { error: 'Email sau parolă nevalidă' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  await AuditService.log({
    userId: data.user.id,
    action: 'user.login',
    resource: 'auth',
    details: { email: validated.data.email },
  });

  redirect('/admin/dashboard');
}

export async function logoutAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await AuditService.log({
      userId: user.id,
      action: 'user.logout',
      resource: 'auth',
    });
  }

  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email') as string;

  const validated = forgotPasswordSchema.safeParse({ email });
  if (!validated.success) {
    return { error: 'Adresă de email nevalidă' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(validated.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: 'Un email cu instrucțiunile de resetare a fost trimis.' };
}

export async function resetPasswordAction(formData: FormData) {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validated = resetPasswordSchema.safeParse({ password, confirmPassword });
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message || 'Eroare de validare' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: validated.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/admin/dashboard');
}

export async function updateProfileAction(formData: FormData) {
  const full_name = formData.get('full_name') as string;
  const avatar_url = formData.get('avatar_url') as string;

  const validated = updateProfileSchema.safeParse({ full_name, avatar_url });
  if (!validated.success) {
    return { error: 'Date de profil nevalide' };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Neautorizat' };
  }

  const { error } = await supabase.from('profiles').update({
    full_name: validated.data.full_name,
    avatar_url: validated.data.avatar_url || null,
  }).eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: 'Profilul a fost actualizat cu succes.' };
}

export async function changePasswordAction(formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;

  const validated = changePasswordSchema.safeParse({ currentPassword, newPassword });
  if (!validated.success) {
    return { error: 'Parolă nevalidă' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: validated.data.newPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: 'Parola a fost schimbată cu succes.' };
}
