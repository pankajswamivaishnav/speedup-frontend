// types
import { NavItemType } from 'types/menu';
import other, {
  transporters,
  drivers,
  bilty,
  vendors,
  transportCards,
  driverCards,
  vendorCards,
  dashboard,
  managedTransporters,
  managedDrivers,
  managedVendors,
  pricing
} from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [other]
};

export const superAdminMenuItems: { items: NavItemType[] } = {
  items: [
    dashboard,
    transporters,
    drivers,
    vendors,
    managedTransporters,
    managedDrivers,
    managedVendors,
    bilty,
    transportCards,
    driverCards,
    vendorCards,
    pricing
  ]
};

export const transporterMenuItems: { items: NavItemType[] } = {
  items: [dashboard, managedTransporters, managedDrivers, managedVendors, bilty, transportCards, driverCards, vendorCards, pricing]
};

export const driverMenuItems: { items: NavItemType[] } = {
  items: [dashboard, managedTransporters, managedDrivers, managedVendors, transportCards, pricing]
};

export const vendorMenuItems: { items: NavItemType[] } = {
  items: [dashboard, managedTransporters, managedDrivers, managedVendors, transportCards, pricing]
};

export default menuItems;
