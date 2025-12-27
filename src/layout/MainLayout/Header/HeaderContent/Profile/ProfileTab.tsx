import { useEffect, useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import AddTransporter from 'components/transporter/AddTransporter';
import UniversalDialog from 'components/popup/UniversalDialog';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import { FormattedMessage } from 'react-intl';
import useAuth from 'hooks/useAuth';
import AddVendor from 'components/vendor/AddVendor';
import AddDriver from 'components/drivers/AddDriver';
import TransporterServiceInstance from 'services/transporter.services';
import { useQuery } from '@tanstack/react-query';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

interface Props {
  handleLogout: () => void;
}

const ProfileTab = ({ handleLogout }: Props) => {
  // ----------- Constants -------------
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [profileData, setProfileData] = useState();
  const navigate = useNavigate();
  const { user } = useAuth();
  // -------------- Add transporter page pop up --------------
  const [transporterFormPopup, setTransporterFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'lg'
    },
    title: 'Update Profile',
    data: { existingData: {}, isEditMode: false }
  });
  // -------------- Add vendor page pop up --------------
  const [vendorFormPopup, setVendorFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      fullScreen: true
    },
    title: 'Update Vendor',
    data: { existingData: {}, isEditMode: false }
  });
  // -------------- Add driver page pop up --------------
  const [driverFormPopup, setDriverFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'lg'
    },
    title: 'Update Profile',
    data: { existingData: {}, isEditMode: false }
  });

  // -----------useQuery-----------
  const {
    data: profile
    // refetch: refetchUser
    // isLoading,
    // isFetching
  } = useQuery({
    queryKey: ['user_data'],
    queryFn: async () => {
      const response = await TransporterServiceInstance.getUser();
      return response;
    }
  });

  // ----------- Handlers ---------------

  const handleTogglePopup = async (id?: string) => {
    if (transporterFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setTransporterFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: true, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Update Profile" />
      };
    });
  };

  const handleVendorTogglePopup = async (id?: string) => {
    if (vendorFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setVendorFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: true, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Update Profile" />
      };
    });
  };

  const handleDriverTogglePopup = async (id?: string) => {
    if (driverFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setDriverFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: true, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Update Profile" />
      };
    });
  };

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedIndex(index);

    // Action according to index number
    switch (index) {
      case 0: {
        switch (user?.role) {
          case 'transporter': {
            handleTogglePopup();
            break;
          }
          case 'driver': {
            handleDriverTogglePopup();
            break;
          }
          case 'vendor': {
            handleVendorTogglePopup();
            break;
          }
          default: {
            handleTogglePopup();
            break;
          }
        }
        break;
      }
      case 1: {
        navigate('/profile');
        break;
      }
    }
  };

  // ---------Use Effect ----------
  useEffect(() => {
    if (profile) {
      setProfileData(profile.data);
    }
  }, [profile]);

  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 3} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 3)}>
          <ListItemIcon>
            <ProfileOutlined />
          </ListItemIcon>
          <ListItemText primary="Social Profile" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 4} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 4)}>
          <ListItemIcon>
            <WalletOutlined />
          </ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
      {/* ----------- Users Modal like Transporter, Vendor, Driver -------------- */}
      {!!transporterFormPopup && transporterFormPopup.action.open && (
        <UniversalDialog
          action={{ ...transporterFormPopup.action }}
          onClose={handleTogglePopup}
          title={transporterFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddTransporter
            onClose={() => handleTogglePopup()}
            isEditMode={transporterFormPopup?.data?.isEditMode}
            existingData={{ transporterData: profileData }}
          />
        </UniversalDialog>
      )}

      {/* Vendor */}
      {!!vendorFormPopup && vendorFormPopup.action.open && (
        <UniversalDialog
          action={{ ...vendorFormPopup.action }}
          onClose={handleVendorTogglePopup}
          title={vendorFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddVendor
            onClose={() => handleVendorTogglePopup()}
            isEditMode={vendorFormPopup?.data?.isEditMode}
            existingData={{ vendorData: profileData }}
          />
        </UniversalDialog>
      )}

      {/* Driver */}
      {!!driverFormPopup && driverFormPopup.action.open && (
        <UniversalDialog
          action={{ ...driverFormPopup.action }}
          onClose={handleDriverTogglePopup}
          title={driverFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddDriver
            onClose={() => handleDriverTogglePopup()}
            isEditMode={driverFormPopup?.data?.isEditMode}
            existingData={{
              driverData: profileData
            }}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default ProfileTab;
