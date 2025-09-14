import { Box, Button, Grid, Stack } from '@mui/material';

import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import UniversalDialog from 'components/popup/UniversalDialog';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import { useQuery } from '@tanstack/react-query';
import TransporterServiceInstance from 'services/transporter.services';
import useAuth from 'hooks/useAuth';
import BiltyTable from 'components/Bilty/BiltyTable';
import AddBilty from 'components/Bilty/AddBilty';
import biltyServiceInstance from 'services/bilty.services';
import MainCard from 'components/MainCard';
import PieChart from 'components/shared/PieChart';
import BarChart from 'components/shared/BarChart';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';

const Bilty = () => {
  const [isLoading, setLoading] = useState(true);
  const [biltyData, setbiltyData] = useState();
  const [transportData, setTransportData] = useState<{ label: string; id: string }[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [count, setCount] = useState<number>(0);
  const { user } = useAuth();
  const [query, setQuery] = useState<string>('');
  console.log('query bilty', query);
  // -------------- Add transporter page pop up --------------
  const [biltyFormPopup, setBiltyFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'lg'
    },
    title: 'Make Bilty',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTogglePopup = async (id?: string) => {
    if (biltyFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setBiltyFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Make Bilty" />
      };
    });
  };

  // -----------useQuery-----------
  const { data: bilties, refetch: refetchBilties } = useQuery({
    queryKey: ['bilties_data', page, limit],
    queryFn: async () => {
      setLoading(true);
      const response = await biltyServiceInstance.getAllbilties(page, limit);
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
    if (bilties) {
      setbiltyData(bilties.data);
      setCount(bilties.total);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [bilties]);

  return (
    <>
      <Grid className="space-y-5">
        <Box sx={{ display: 'flex' }} className="px-6">
          <Grid container spacing={2.5} className="flex flex-col xl:flex-row">
            <Grid item xs={12} className="flex flex-col xl:flex-row">
              <Stack alignItems={'end'} sx={{ p: 1 }} spacing={2} textAlign={'center'} style={{ width: '100%' }}>
                <Button onClick={() => handleTogglePopup()} sx={{ textAlign: 'center' }} variant="outlined">
                  Make Bilty
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
                  <BiltyTable
                    data={biltyData || []}
                    limit={limit}
                    setLimit={setLimit}
                    page={page}
                    setPage={setPage}
                    count={count}
                    refetchTransporterAllData={refetchBilties}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {/*  bilties Reports  */}

        <Box className="pr-6">
          <MainCard title="Turn-Over Reports" className="w-full">
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="flex-1">
                <PieChart />
              </div>
              <div className="flex-1">
                <BarChart />
              </div>
            </div>
          </MainCard>
        </Box>
      </Grid>
      {/* -----------Universal dialog for open add transport page----------------*/}
      {!!biltyFormPopup && biltyFormPopup.action.open && (
        <UniversalDialog
          action={{ ...biltyFormPopup.action }}
          onClose={handleTogglePopup}
          title={biltyFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddBilty
            onClose={() => handleTogglePopup()}
            isEditMode={biltyFormPopup?.data?.isEditMode}
            existingData={biltyFormPopup?.data.existingData}
            data={transportData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default Bilty;
