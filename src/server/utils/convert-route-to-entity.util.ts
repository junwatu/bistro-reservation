const mapping: Record<string, string> = {
  bistros: 'bistro',
  orders: 'order',
  reservations: 'reservation',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
