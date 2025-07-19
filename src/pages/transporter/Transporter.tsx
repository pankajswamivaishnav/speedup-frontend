import { Box, Button, Grid, Stack } from '@mui/material';

import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import UniversalDialog from 'components/popup/UniversalDialog';
import AddTransporter from 'components/transporter/AddTransporter';

import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import TransportTable from 'components/transporter/TransportTable';
import { useQuery } from '@tanstack/react-query';
import TransporterServiceInstance from 'services/transporter.services';
const Transporter = () => {
  const [isLoading, setLoading] = useState(true);
  const [transporterData, setTransporterData] = useState();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [count, setCount] = useState<number>(0);

  // -------------- Add transporter page pop up --------------
  const [transporterFormPopup, setTransporterFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      fullScreen: true
    },
    title: 'Add Transport',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTogglePopup = async (id?: string) => {
    if (transporterFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setTransporterFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Add Transport" />
      };
    });
  };

  // -----------useQuery-----------
  const { data: transporter, refetch: refetchTransporterAllData } = useQuery({
    queryKey: ['transporters_data', page, limit],
    queryFn: async () => {
      setLoading(true);
      const response = await TransporterServiceInstance.getAllTransporter(page, limit);
      return response;
    }
  });

  //---------------useeffect--------------
  useEffect(() => {
    if (transporter) {
      setTransporterData(transporter.data);
      setCount(transporter.total);
      setLoading(false);
    }
  }, [transporter]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Stack alignItems={'end'} sx={{ p: 1 }} spacing={2} textAlign={'center'} style={{ width: '100%' }}>
              <Button onClick={() => handleTogglePopup()} sx={{ textAlign: 'center' }} variant="outlined">
                Add Transport
              </Button>
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
                <TransportTable
                  data={transporterData || []}
                  limit={limit}
                  setLimit={setLimit}
                  page={page}
                  setPage={setPage}
                  count={count}
                  refetchTransporterAllData={refetchTransporterAllData}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* -----------Universal dialog for open add transport page----------------*/}
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
            existingData={transporterFormPopup?.data.existingData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default Transporter;
