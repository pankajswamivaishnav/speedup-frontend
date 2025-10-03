// types
import { NavItemType } from 'types/menu';
import other, { transporters, drivers, bilty, vendors, transportCards, driverCards, vendorCards } from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [other]
};

export const superAdminMenuItems: { items: NavItemType[] } = {
  items: [transporters, drivers, bilty, vendors, transportCards, driverCards, vendorCards]
};

export const transporterMenuItems: { items: NavItemType[] } = {
  items: [transporters, drivers, bilty, vendors, transportCards, driverCards, vendorCards]
};

export const driverMenuItems: { items: NavItemType[] } = {
  items: [transportCards]
};

export const vendorMenuItems: { items: NavItemType[] } = {
  items: [transporters, transportCards]
};

export default menuItems;
