export const routes = {
  root: {
    root: '/',
    companies: 'companies',
    users: 'users',
  },
  company: {
    root: '/companies/:id',
    groups: 'groups',
    groupBatchCreation: 'group-batch-creation',
    users: 'users',
    invitations: 'invitations',
  },
  user: {
    root: '/users/:id',
    companies: 'companies',
    groups: 'groups',
  },
  group: {
    root: '/groups/:id',
    users: 'users',
    invitations: 'invitations',
  },
} as const;
