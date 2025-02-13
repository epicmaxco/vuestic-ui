/**
 * Unwraps type from MyTypeAlias to type value
 *
 * @example
 *
 * type User = { name: string }
 *
 * type Admin = User & { role: 'admin' }
 * type UnwrappedUser = UnwrapType<Admin> // { name: string, role: 'admin } instead of User
 *
 * @notice
 *
 * Use for better type readability. Prefer unwrapped types instead of unknown type aliases
 */
export type UnwrapType<T> = true extends boolean ? T : never
