import { AUTH_ROLE_STATES } from "./auth-state-constants.ts";

export const USER_CREDENTIALS = {
  firstCustomer: {
    email: 'test-customer@example.com',
    password: 'superSecret123',
    jsonPath: AUTH_ROLE_STATES.customer.first,
  },

  firstProffi: {
    email: 'test-proffi@example.com',
    password: 'superSecret123',
    jsonPath: AUTH_ROLE_STATES.professional.first,
  },  
  admin: {
    email: 'test-admin@example.com',
    password: 'superSecret123',
    jsonPath: AUTH_ROLE_STATES.admin.main,
  }
} 