// material-ui
import { UsergroupAddOutlined, FilePdfOutlined, TruckOutlined, ShopOutlined } from '@ant-design/icons';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BiltyTable from 'components/Bilty/BiltyTable';

// project import
import MainCard from 'components/MainCard';
import SEO from 'components/SEO';
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

const Dashboard = () => {
  const [transportersData, setTransportersData] = useState<any>();
  const [driversData, setDriversData] = useState<any>();
  const [vendorsData, setVendorsData] = useState<any>();
  const [biltiesData, setBiltiesData] = useState<any>([]);
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
    if (user?.role === 'super_admin' || user?.role === 'transporter') {
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
    } else if (user?.role === 'vendor') {
      const transporters = await TransporterServiceInstance.getAllTransporter(0, 0);
      const bilties = await biltyServiceInstance.getAllbilties(0, 0);
      setTransportersData(transporters);
      setBiltiesData(bilties);
    } else if (user?.role === 'driver') {
      const transporters = await TransporterServiceInstance.getAllTransporter(0, 0);
      const bilties = await biltyServiceInstance.getAllbilties(0, 0);
      setTransportersData(transporters);
      setBiltiesData(bilties);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // --------- Super Admin ----------
  const renderSuperAdmin = () => {
    return (
      <MainCard title="Dashboard">
        {/* Detaild Card where show transporters, drivers, vendors and bilties count */}
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
              iconPrimary={TruckOutlined}
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
              iconPrimary={ShopOutlined}
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
              iconPrimary={FilePdfOutlined}
              color={theme.palette.error.main}
            />
          </Grid>
        </Grid>

        {/* All users table (Transporters, drivers, vendors, bilties) */}
        <Box mt={5}>
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
        </Box>
      </MainCard>
    );
  };

  // --------- Transporter ----------
  const renderTransporter = () => {
    return (
      <MainCard title="Dashboard">
        {/* Detaild Card where show transporters, drivers, vendors and bilties count */}
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
              iconPrimary={TruckOutlined}
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
              iconPrimary={ShopOutlined}
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
              iconPrimary={FilePdfOutlined}
              color={theme.palette.error.main}
            />
          </Grid>
        </Grid>

        {/* All users table (Transporters, drivers, vendors, bilties) */}
        <Box mt={5}>
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
        </Box>
      </MainCard>
    );
  };

  // ----------- Driver --------------
  const renderDriver = () => {
    return (
      <MainCard title="Dashboard">
        {/* Detaild Card where show transporters, drivers, vendors and bilties count */}
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
              iconPrimary={FilePdfOutlined}
              color={theme.palette.error.main}
            />
          </Grid>
        </Grid>

        {/* All users table (Transporters, drivers, vendors, bilties) */}
        <Box mt={5}>
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
        </Box>
      </MainCard>
    );
  };

  // ---------- Vendor ------------
  const renderVendor = () => {
    return (
      <MainCard title="Dashboard">
        {/* Detaild Card where show transporters, drivers, vendors and bilties count */}
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
              iconPrimary={FilePdfOutlined}
              color={theme.palette.error.main}
            />
          </Grid>
        </Grid>

        {/* All users table (Transporters, drivers, vendors, bilties) */}
        <Box mt={5}>
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
        </Box>
      </MainCard>
    );
  };

  // ---------- Role-based Render ----------
  switch (user?.role) {
    case 'super_admin':
      return renderSuperAdmin();
    case 'transporter':
      return renderTransporter();
    case 'vendor':
      return renderVendor();
    case 'driver':
      return renderDriver();
    default:
      return (
        <>
          <SEO
            title="Dashboard | Speedupora TMS"
            description="Speedupora TMS dashboard provides a centralized view of trips, vehicles, drivers, billing status, and daily transport operations."
            canonicalUrl="https://www.speedupora.com/dashboard"
            noIndex
          />
          <MainCard title="Dashboard">
            <p>Role not recognized</p>
          </MainCard>
        </>
      );
  }
};

export default Dashboard;
