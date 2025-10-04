// types
import { NavItemType } from 'types/menu';
import other, { transporters, drivers, bilty, vendors, transportCards, driverCards, vendorCards, dashboard } from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [other]
};

export const superAdminMenuItems: { items: NavItemType[] } = {
  items: [dashboard, transporters, drivers, bilty, vendors, transportCards, driverCards, vendorCards]
};

export const transporterMenuItems: { items: NavItemType[] } = {
  items: [dashboard, transporters, drivers, bilty, vendors, transportCards, driverCards, vendorCards]
};

export const driverMenuItems: { items: NavItemType[] } = {
  items: [dashboard, transportCards]
};

export const vendorMenuItems: { items: NavItemType[] } = {
  items: [dashboard, transporters, transportCards]
};

export default menuItems;
