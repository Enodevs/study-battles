import { supabase } from './supabase';

export async function ensureAuthenticated() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (session) {
    return session.user;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signInAnonymously();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error('Failed to create anonymous user');
  }

  return user;
}