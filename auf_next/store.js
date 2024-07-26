import { atom } from 'nanostores'

export const $user = atom(null)

export function addUser(user) {
  $user.set(user);
}
