import { Box, Button, Grid } from '@mui/material';

import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import UniversalDialog from 'components/popup/UniversalDialog';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import { useQuery } from '@tanstack/react-query';
// import TransporterServiceInstance from 'services/transporter.services';
import DriverTable from 'components/drivers/DriverTable';
import AddDriver from 'components/drivers/AddDriver';
// import useAuth from 'hooks/useAuth';
import DriverServiceInstance from 'services/driver.services';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import { exportToCsv } from 'utils/download';

const Drivers = () => {
  const [driversData, setDriversData] = useState();
  // const [transportData, setTransportData] = useState<{ label: string; id: string }[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [count, setCount] = useState<number>(0);
  // const { user } = useAuth();
  const [query, setQuery] = useState<string>('');
  // -------------- Add driver page pop up --------------
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

  const handleDownload = async () => {
    try {
      const columns = [
        { header: 'Bilty Number', key: 'biltyNumber', width: 25 },
        { header: 'Transport ID', key: 'transportId', width: 30 },
        { header: 'GST Number', key: 'gstNumber', width: 20 },
        { header: 'Registration Number', key: 'registrationNumber', width: 20 },
        { header: 'Transporter Number', key: 'transporterNumber', width: 20 },
        { header: 'Truck Number', key: 'truckNumber', width: 18 },
        { header: 'From', key: 'from', width: 18 },
        { header: 'To', key: 'to', width: 18 },
        { header: 'Driver Name', key: 'driverName', width: 22 },
        { header: 'Driver Phone', key: 'driverPhoneNumber', width: 20 },
        { header: 'Date', key: 'date', width: 25 },

        // sender information
        { header: 'Sender Name', key: 'senderInformation.name', width: 22 },
        { header: 'Sender Number', key: 'senderInformation.number', width: 20 },

        // receiver information
        { header: 'Receiver Name', key: 'receiverInformation.name', width: 22 },
        { header: 'Receiver Number', key: 'receiverInformation.number', width: 20 },

        { header: 'Goods Category', key: 'goodsCategory', width: 25 },
        { header: 'Weight', key: 'weight', width: 15 },
        { header: 'Truck Charge', key: 'truckCharge', width: 20 },
        { header: 'Advance Payment', key: 'advancePayment', width: 20 },
        { header: 'Remaining Payment', key: 'remainingPayment', width: 22 },
        { header: 'Broking Charge', key: 'brokingCharge', width: 20 },
        { header: 'Payment Type', key: 'paymentType', width: 18 },
        { header: 'Is Deleted', key: 'isDeleted', width: 12 }
      ];

      if (driversData) {
        await exportToCsv(columns, driversData, 'drivers');
      }
    } catch (error) {}
  };

  // -----------useQuery-----------
  const {
    data: drivers,
    refetch: refetchDrivers,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['drivers_data', page, limit, query],
    queryFn: async () => {
      const response = await DriverServiceInstance.getAllDrivers(page, limit, query);
      return response;
    }
  });

  // Here get transporter data
  // const fetchData = async () => {
  //   if (user?.role === 'super_admin') {
  //     try {
  //       const response = await TransporterServiceInstance.getAllTransporter(0, 0);
  //       const formattedData = response.data.map((transporter: any) => ({
  //         label: transporter.transportName,
  //         id: transporter._id
  //       }));
  //       setTransportData(formattedData);
  //     } catch (error) {
  //       console.error('Error fetching transporters:', error);
  //     }
  //   }
  // };

  //---------------useeffect------------------
  useEffect(() => {
    // fetchData();
    if (drivers) {
      setDriversData(drivers.data);
      setCount(drivers.total);
    }
    // eslint-disable-next-line
  }, [drivers]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2.5} className="ps-6">
          <Grid item xs={12} className="flex flex-col xl:flex-row justify-between items-center gap-2 mb-5">
            {/* Left side - Buttons */}
            <div className="flex gap-2">
              <Button onClick={() => handleTogglePopup()} variant="outlined">
                Add Driver
              </Button>
              <Button onClick={() => handleDownload()} variant="outlined">
                Download Drivers
              </Button>
            </div>

            {/* Right side - Search */}
            <div className="w-full xl:w-auto pr-5">
              <Search setQuery={setQuery} />
            </div>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isLoading || isFetching ? (
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
                  refetchDriversAllData={refetchDrivers}
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
            data={driversData}
            refetchDrivers={refetchDrivers}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default Drivers;
