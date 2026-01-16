export function valid_email(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * - Must be 3–20 characters long
 * - Can contain letters, numbers, underscores, or dots
 */
export function valid_username(username: string): boolean {
    const regex = /^[a-zA-Z0-9._]{3,20}$/;
    return regex.test(username);
}

/**
 * - Must be at least 8 characters long
 * - Must contain at least one letter
 * - Must contain at least one special character
 */
export function valid_password(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z\s]).{8,}$/;
    return passwordRegex.test(password);
}