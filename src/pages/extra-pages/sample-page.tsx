// material-ui
import { UsergroupAddOutlined, UserOutlined, FileExcelOutlined } from '@ant-design/icons';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import DetailCard from 'components/cards/DetailCard';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import biltyServiceInstance from 'services/bilty.services';
import DriverServiceInstance from 'services/driver.services';
import TransporterServiceInstance from 'services/transporter.services';
import VendorServiceInstance from 'services/vendor.services';

// types
import { ThemeMode } from 'types/config';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const [transportersData, setTransportersData] = useState<any>();
  const [driversData, setDriversData] = useState<any>();
  const [vendorsData, setVendorsData] = useState<any>();
  const [biltiesData, setBiltiesData] = useState<any>();
  // const [vendorsData, setVendorsData] = useState<any>();
  const { user } = useAuth();
  const theme = useTheme();

  // Here get transporter data
  const fetchData = async () => {
    if (user?.role === 'super_admin') {
      try {
        const response = await TransporterServiceInstance.getAllTransporter(0, 0);
        const drivers = await DriverServiceInstance.getAllDrivers(0, 0);
        const vendors = await VendorServiceInstance.getAllVendors(0, 0);
        const bilties = await biltyServiceInstance.getAllbilties(0, 0);

        setTransportersData(response);
        setDriversData(drivers);
        setVendorsData(vendors);
        setBiltiesData(bilties);
      } catch (error) {
        console.error('Error fetching transporters, drivers, vendors :', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  console.log('transportersData', driversData);
  return (
    <MainCard title="Super Admin Page">
      <Typography variant="body2">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3} sm={6}>
            <DetailCard
              primary="Total Transporters"
              secondary={`${transportersData?.total} +`}
              iconPrimary={UsergroupAddOutlined}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} lg={3} sm={6}>
            <DetailCard
              primary="Total Drivers"
              secondary={`${driversData?.total} +`}
              iconPrimary={UserOutlined}
              color={theme.palette.info.main}
            />
          </Grid>
          <Grid item xs={12} lg={3} sm={6}>
            <DetailCard
              primary="Total Vendors"
              secondary={`${vendorsData?.total} +`}
              iconPrimary={UserOutlined}
              color={theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary.lighter : theme.palette.secondary.dark}
            />
          </Grid>
          <Grid item xs={12} lg={3} sm={6}>
            <DetailCard
              primary="Total Bilties"
              secondary={`${biltiesData?.total} +`}
              iconPrimary={FileExcelOutlined}
              color={theme.palette.error.main}
            />
          </Grid>
        </Grid>
      </Typography>
    </MainCard>
  );
};

export default SamplePage;
