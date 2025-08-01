// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { ChromeOutlined, QuestionOutlined, DeploymentUnitOutlined, UserAddOutlined, StockOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  DeploymentUnitOutlined,
  UserAddOutlined,
  StockOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other: NavItemType = {
  id: 'other',
  title: <FormattedMessage id="others" />,
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: <FormattedMessage id="sample-page" />,
      type: 'item',
      url: '/sample-page',
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

export default other;
