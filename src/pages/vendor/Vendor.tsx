import { Box, Button, Grid, Stack } from '@mui/material';

import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import UniversalDialog from 'components/popup/UniversalDialog';

import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import { useQuery } from '@tanstack/react-query';
import VendorTable from 'components/vendor/VendorTable';
import VendorServiceInstance from 'services/vendor.services';
import AddVendor from 'components/vendor/AddVendor';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
const Vendor = () => {
  const [isLoading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  // -------------- Add transporter page pop up --------------
  const [vendorFormPopup, setVendorFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      fullScreen: true
    },
    title: 'Add Vendor',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTogglePopup = async (id?: string) => {
    if (vendorFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setVendorFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Add Vendor" />
      };
    });
  };

  // -----------useQuery-----------
  const { data: vendors, refetch: refetchVendorAllData } = useQuery({
    queryKey: ['vendors_data', page, limit, query],
    queryFn: async () => {
      setLoading(true);
      const response = await VendorServiceInstance.getAllVendors(page, limit, query);
      return response;
    }
  });

  //---------------useeffect--------------
  useEffect(() => {
    if (vendors) {
      setVendorData(vendors.data);
      setCount(vendors.total);
      setLoading(false);
    }
  }, [vendors]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} className="flex flex-col xl:flex-row">
            <Stack alignItems={'end'} sx={{ p: 1 }} spacing={2} textAlign={'center'} style={{ width: '100%' }}>
              <Button onClick={() => handleTogglePopup()} sx={{ textAlign: 'center' }} variant="outlined">
                Add Vendor
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
                <VendorTable
                  data={vendorData || []}
                  limit={limit}
                  setLimit={setLimit}
                  page={page}
                  setPage={setPage}
                  count={count}
                  refetchVendorAllData={refetchVendorAllData}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* -----------Universal dialog for open add transport page----------------*/}
      {!!vendorFormPopup && vendorFormPopup.action.open && (
        <UniversalDialog
          action={{ ...vendorFormPopup.action }}
          onClose={handleTogglePopup}
          title={vendorFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddVendor
            onClose={() => handleTogglePopup()}
            isEditMode={vendorFormPopup?.data?.isEditMode}
            existingData={vendorFormPopup?.data.existingData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default Vendor;
