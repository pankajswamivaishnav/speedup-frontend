// types
import { NavItemType } from 'types/menu';
import other, { transporters, drivers, bilty } from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [other]
};

export const superAdminMenuItems: { items: NavItemType[] } = {
  items: [transporters, drivers, bilty]
};

export const transporterMenuItems: { items: NavItemType[] } = {
  items: [drivers, bilty]
};

export const driverMenuItems: { items: NavItemType[] } = {
  items: []
};

export const vendorMenuItems: { items: NavItemType[] } = {
  items: []
};

export default menuItems;
