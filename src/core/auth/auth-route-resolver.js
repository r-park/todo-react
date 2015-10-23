import { routePaths } from 'config';
import { authStore } from './auth-store';


export function authRouteResolver(nextState, replaceState) {
  const { pathname } = nextState.location;
  const { authenticated } = authStore;

  if (!authenticated && pathname !== routePaths.SIGN_IN) {
    replaceState(null, routePaths.SIGN_IN);
  }
  else if (authenticated && pathname !== routePaths.TASKS) {
    replaceState(null, routePaths.TASKS);
  }
}
