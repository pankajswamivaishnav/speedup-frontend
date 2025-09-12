// material-ui
import { UsergroupAddOutlined, UserOutlined, FileExcelOutlined } from '@ant-design/icons';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BiltyTable from 'components/Bilty/BiltyTable';

// project import
import MainCard from 'components/MainCard';
import DetailCard from 'components/cards/DetailCard';
import DriverTable from 'components/drivers/DriverTable';
import TransportTable from 'components/transporter/TransportTable';
import VendorTable from 'components/vendor/VendorTable';
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
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(0);
  const [transportersCount, setTransportersCount] = useState<number>(0);
  const [driversCount, setDriversCount] = useState<number>(0);
  const [vendorsCount, setVendorsCount] = useState<number>(0);
  const [biltiesCount, setBiltiesCount] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<any>({
    transportTableVisible: true,
    driverTableVisible: false,
    vendorTableVisible: false,
    biltiesTableVisible: false
  });

  const { user } = useAuth();
  const theme = useTheme();

  // Here get transporter data
  const fetchData = async () => {
    if (user?.role === 'super_admin') {
      try {
        const transporters = await TransporterServiceInstance.getAllTransporter(0, 0);
        const drivers = await DriverServiceInstance.getAllDrivers(0, 0);
        const vendors = await VendorServiceInstance.getAllVendors(0, 0);
        const bilties = await biltyServiceInstance.getAllbilties(0, 0);

        setTransportersData(transporters);
        setDriversData(drivers);
        setVendorsData(vendors);
        setBiltiesData(bilties);
        setTransportersCount(transporters.total);
        setDriversCount(drivers.total);
        setVendorsCount(vendors.total);
        setBiltiesCount(bilties.total);
      } catch (error) {
        console.error('Error fetching transporters, drivers, vendors :', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  console.log(driversCount, vendorsCount, biltiesCount);
  return (
    <MainCard title="Super Admin Page">
      <Typography variant="body2">
        {/* Detaild Card where show transporters, drivers, bendors and bilties count */}
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            lg={3}
            sm={6}
            className="cursor-pointer"
            onClick={() => {
              setModalVisible((prev: any) => ({
                ...prev,
                transportTableVisible: true,
                driverTableVisible: false,
                vendorTableVisible: false,
                biltiesTableVisible: false
              }));
            }}
          >
            <DetailCard
              primary="Total Transporters"
              secondary={`${transportersData?.total} +`}
              iconPrimary={UsergroupAddOutlined}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sm={6}
            className="cursor-pointer"
            onClick={() => {
              setModalVisible((prev: any) => ({
                ...prev,
                driverTableVisible: true,
                transportTableVisible: false,
                vendorTableVisible: false,
                biltiesTableVisible: false
              }));
            }}
          >
            <DetailCard
              primary="Total Drivers"
              secondary={`${driversData?.total} +`}
              iconPrimary={UserOutlined}
              color={theme.palette.info.main}
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sm={6}
            className="cursor-pointer"
            onClick={() => {
              setModalVisible((prev: any) => ({
                ...prev,
                vendorTableVisible: true,
                driverTableVisible: false,
                transportTableVisible: false,
                biltiesTableVisible: false
              }));
            }}
          >
            <DetailCard
              primary="Total Vendors"
              secondary={`${vendorsData?.total} +`}
              iconPrimary={UserOutlined}
              color={theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary.lighter : theme.palette.secondary.dark}
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sm={6}
            className="cursor-pointer"
            onClick={() => {
              setModalVisible((prev: any) => ({
                ...prev,
                biltiesTableVisible: true,
                driverTableVisible: false,
                transportTableVisible: false,
                vendorTableVisible: false
              }));
            }}
          >
            <DetailCard
              primary="Total Bilties"
              secondary={`${biltiesData?.total} +`}
              iconPrimary={FileExcelOutlined}
              color={theme.palette.error.main}
            />
          </Grid>
        </Grid>
      </Typography>
      <Typography variant="body2" className="mt-5">
        {/* All users table (Transporters, drivers, vendors, bilties) */}
        <Grid container>
          {/* transporters table */}
          {modalVisible.transportTableVisible && (
            <TransportTable
              data={transportersData?.data || []}
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              count={transportersCount}
            />
          )}
          {/* drivers table */}
          {modalVisible.driverTableVisible && (
            <DriverTable
              data={driversData?.data || []}
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              count={driversCount}
            />
          )}
          {/* vendors table */}
          {modalVisible.vendorTableVisible && (
            <VendorTable
              data={vendorsData?.data || []}
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              count={vendorsCount}
            />
          )}
          {/* bilties table */}
          {modalVisible.biltiesTableVisible && (
            <BiltyTable
              data={biltiesData?.data || []}
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              count={biltiesCount}
            />
          )}
        </Grid>
      </Typography>
    </MainCard>
  );
};

export default SamplePage;
