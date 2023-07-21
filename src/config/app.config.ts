interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Restaurant Manager', 'Wait Staff', 'Chef'],
  tenantName: 'Bistro',
  applicationName: 'Bistro Reservation and Dining Application',
  addOns: ['chat', 'notifications', 'file'],
};
