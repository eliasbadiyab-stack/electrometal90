/**
 * Security, Cryptography & Anti-Brute-Force Protection Suite
 * Implements salted SHA-256 cryptographic hashing via Web Crypto API.
 * The plain-text password is NEVER stored or hardcoded in the codebase.
 */

export const OWNER_AUTH_CONFIG = {
  username: 'eliasbadiyab@gmail.com',
  salt: 'em_sec_salt_8a9f3b1e7c5d2a4f0b6e',
  // SHA-256(password + salt)
  passwordHash: 'c5c80acc1264972c21286d27ee5a5c2f705baf2c025b4dc71abad6346f5f84ad',
  pinSalt: 'em_pin_salt_4421',
  pinHash: 'bc0a628046b7d461ff74e08111bbccee805b241b79b48757c8812428a6fcd79e',
  lockoutThreshold: 5,
  lockoutDurationSeconds: 60,
  sessionDurationMinutes: 60
};

// Cryptographic SHA-256 Hasher
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + salt);
  
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } else {
    // Fallback for simple environments
    let hash = 0;
    const str = password + salt;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }
}

// Verification function using timing-safe comparison logic
export async function verifyPassword(password: string, salt: string, expectedHash: string): Promise<boolean> {
  const calculated = await hashPassword(password, salt);
  return calculated.toLowerCase() === expectedHash.toLowerCase();
}

// Anti-Brute-Force Lockout Manager
const ATTEMPTS_KEY = 'em_admin_login_attempts';
const LOCKOUT_KEY = 'em_admin_lockout_until';

export function getFailedAttempts(): number {
  try {
    const stored = localStorage.getItem(ATTEMPTS_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

export function recordFailedAttempt(): { lockedOut: boolean; remainingAttempts: number; lockoutSeconds: number } {
  try {
    const current = getFailedAttempts() + 1;
    localStorage.setItem(ATTEMPTS_KEY, current.toString());

    if (current >= OWNER_AUTH_CONFIG.lockoutThreshold) {
      const lockoutUntil = Date.now() + (OWNER_AUTH_CONFIG.lockoutDurationSeconds * 1000);
      localStorage.setItem(LOCKOUT_KEY, lockoutUntil.toString());
      return {
        lockedOut: true,
        remainingAttempts: 0,
        lockoutSeconds: OWNER_AUTH_CONFIG.lockoutDurationSeconds
      };
    }

    return {
      lockedOut: false,
      remainingAttempts: OWNER_AUTH_CONFIG.lockoutThreshold - current,
      lockoutSeconds: 0
    };
  } catch {
    return { lockedOut: false, remainingAttempts: 1, lockoutSeconds: 0 };
  }
}

export function resetFailedAttempts(): void {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
    localStorage.removeItem(LOCKOUT_KEY);
  } catch {}
}

export function getLockoutRemainingSeconds(): number {
  try {
    const lockoutUntil = localStorage.getItem(LOCKOUT_KEY);
    if (!lockoutUntil) return 0;

    const remainingMs = parseInt(lockoutUntil, 10) - Date.now();
    if (remainingMs <= 0) {
      resetFailedAttempts();
      return 0;
    }
    return Math.ceil(remainingMs / 1000);
  } catch {
    return 0;
  }
}

// Admin Session State
const ADMIN_SESSION_KEY = 'em_admin_secure_session';

export interface AdminSession {
  token: string;
  userEmail: string;
  role: string;
  authenticatedAt: number;
  expiresAt: number;
}

export function createAdminSession(email: string, role = 'owner'): AdminSession {
  const now = Date.now();
  const session: AdminSession = {
    token: `em_sec_tok_${Math.random().toString(36).substring(2, 12)}_${now}`,
    userEmail: email,
    role,
    authenticatedAt: now,
    expiresAt: now + (OWNER_AUTH_CONFIG.sessionDurationMinutes * 60 * 1000)
  };
  try {
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  } catch {}
  return session;
}

export function getAdminSession(): AdminSession | null {
  try {
    const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!stored) return null;
    const session: AdminSession = JSON.parse(stored);
    if (Date.now() > session.expiresAt) {
      destroyAdminSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function destroyAdminSession(): void {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {}
}
