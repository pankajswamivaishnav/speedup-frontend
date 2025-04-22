import { Box, Button, Grid, Stack } from '@mui/material';

import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import UniversalDialog from 'components/popup/UniversalDialog';
import AddTransporter from 'components/transporter/AddTransporter';
import TransportTable from 'components/transporter/TransportTable';

import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';

const Transporter = () => {
  const [isLoading, setLoading] = useState(true);
  const [transporterFormPopup, setTransporterFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      fullScreen: true
    },
    title: 'Add Transport',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers---------------
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

  //---------------useeffect--------------
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Stack alignItems={'end'} sx={{ p: 1 }} spacing={2} textAlign={'center'} style={{ width: '100%' }}>
              <Button onClick={() => handleTogglePopup()} sx={{ textAlign: 'center' }} variant="contained">
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
                <TransportTable />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* -----------Universal dialog for open appointment steper----------------*/}
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
