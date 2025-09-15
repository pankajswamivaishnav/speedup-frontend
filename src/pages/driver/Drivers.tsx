import { Box, Button, Grid, Stack } from '@mui/material';

import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import UniversalDialog from 'components/popup/UniversalDialog';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import { useQuery } from '@tanstack/react-query';
import TransporterServiceInstance from 'services/transporter.services';
import DriverTable from 'components/drivers/DriverTable';
import AddDriver from 'components/drivers/AddDriver';
import useAuth from 'hooks/useAuth';
import DriverServiceInstance from 'services/driver.services';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';

const Drivers = () => {
  const [isLoading, setLoading] = useState(true);
  const [driversData, setDriversData] = useState();
  const [transportData, setTransportData] = useState<{ label: string; id: string }[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [count, setCount] = useState<number>(0);
  const { user } = useAuth();
  const [query, setQuery] = useState<string>('');
  // -------------- Add transporter page pop up --------------
  const [driverFormPopup, setDriverFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'lg'
    },
    title: 'Add Driver',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTogglePopup = async (id?: string) => {
    if (driverFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setDriverFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Add Driver" />
      };
    });
  };

  // -----------useQuery-----------
  const { data: drivers, refetch: refetchDrivers } = useQuery({
    queryKey: ['drivers_data', page, limit, query],
    queryFn: async () => {
      setLoading(true);
      const response = await DriverServiceInstance.getAllDrivers(page, limit, query);
      return response;
    }
  });

  // Here get transporter data
  const fetchData = async () => {
    if (user?.role === 'super_admin') {
      try {
        const response = await TransporterServiceInstance.getAllTransporter(0, 0);
        const formattedData = response.data.map((transporter: any) => ({
          label: transporter.transportName,
          id: transporter._id
        }));
        setTransportData(formattedData);
      } catch (error) {
        console.error('Error fetching transporters:', error);
      }
    }
  };

  //---------------useeffect--------------
  useEffect(() => {
    fetchData();
    if (drivers) {
      setDriversData(drivers.data);
      setCount(drivers.total);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [drivers]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} className="flex flex-col xl:flex-row">
            <Stack alignItems={'end'} sx={{ p: 1 }} spacing={2} textAlign={'center'} style={{ width: '100%' }}>
              <Button onClick={() => handleTogglePopup()} sx={{ textAlign: 'center' }} variant="outlined">
                Add Driver
              </Button>
            </Stack>
            <Stack alignItems={'start'} sx={{ p: 1 }} spacing={2}>
              <Search setQuery={setQuery} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isLoading ? (
                [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <Grid item xs={12} key={item}>
                    <SkeletonProductPlaceholder />
                  </Grid>
                ))
              ) : (
                <DriverTable
                  data={driversData || []}
                  limit={limit}
                  setLimit={setLimit}
                  page={page}
                  setPage={setPage}
                  count={count}
                  refetchTransporterAllData={refetchDrivers}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* -----------Universal dialog for open add transport page----------------*/}
      {!!driverFormPopup && driverFormPopup.action.open && (
        <UniversalDialog
          action={{ ...driverFormPopup.action }}
          onClose={handleTogglePopup}
          title={driverFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddDriver
            onClose={() => handleTogglePopup()}
            isEditMode={driverFormPopup?.data?.isEditMode}
            existingData={driverFormPopup?.data.existingData}
            data={transportData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default Drivers;
