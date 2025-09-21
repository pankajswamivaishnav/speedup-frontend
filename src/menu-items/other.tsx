// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  ChromeOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined,
  UserAddOutlined,
  StockOutlined,
  FilePdfOutlined,
  UserOutlined,
  IdcardOutlined,
  TruckOutlined,
  ShopOutlined
} from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined,
  UserAddOutlined,
  StockOutlined,
  FilePdfOutlined,
  UserOutlined,
  IdcardOutlined,
  TruckOutlined,
  ShopOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other: NavItemType = {
  id: 'other',
  title: <FormattedMessage id="others" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.ChromeOutlined
    },
    {
      id: 'transporter',
      title: <FormattedMessage id="Transporters" />,
      type: 'item',
      url: '/transporter',
      icon: icons.UserAddOutlined
    },
    {
      id: 'roadmap',
      title: <FormattedMessage id="roadmap" />,
      type: 'item',
      url: 'https://codedthemes.gitbook.io/mantis/roadmap',
      icon: icons.DeploymentUnitOutlined,
      external: true,
      target: true
    }
  ]
};

export const drivers: NavItemType = {
  id: 'drivers',
  title: <FormattedMessage id="Drivers" />,
  type: 'item',
  url: '/drivers',
  icon: icons.StockOutlined
};

export const transporters: NavItemType = {
  id: 'transporters',
  title: <FormattedMessage id="Transporters" />,
  type: 'item',
  url: '/transporters',
  icon: icons.UserAddOutlined
};

export const bilty: NavItemType = {
  id: 'bilties',
  title: <FormattedMessage id="Bilty" />,
  type: 'item',
  url: '/bilties',
  icon: icons.FilePdfOutlined
};

export const vendors: NavItemType = {
  id: 'vendors',
  title: <FormattedMessage id="Vendors" />,
  type: 'item',
  url: '/vendors',
  icon: icons.UserOutlined
};

export const transportCards: NavItemType = {
  id: 'transportCards',
  title: <FormattedMessage id="Transport Cards" />,
  type: 'item',
  url: '/transport-cards',
  icon: icons.IdcardOutlined
};

export const driverCards: NavItemType = {
  id: 'driverCards',
  title: <FormattedMessage id="Driver Cards" />,
  type: 'item',
  url: '/driver-cards',
  icon: icons.TruckOutlined
};

export const vendorCards: NavItemType = {
  id: 'vendorCards',
  title: <FormattedMessage id="Vendor Cards" />,
  type: 'item',
  url: '/vendor-cards',
  icon: icons.ShopOutlined
};

export default other;
