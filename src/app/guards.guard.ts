import { CanActivateFn } from '@angular/router';

export const guardsGuard: CanActivateFn = (route, state) => {
  const data = localStorage.getItem('user_id')
  if (!data) {
    return false;
  }
  return true;
};
