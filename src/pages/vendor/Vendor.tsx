import { Box, Button, Grid } from '@mui/material';

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
import { exportToCsv } from 'utils/download';
import SEO from 'components/SEO';
const Vendor = () => {
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

  const handleDownload = async () => {
    try {
      const columns = [
        { header: 'Vendor Name', key: 'vendorName', width: 25 },
        { header: 'Phone Number', key: 'vendorPhoneNumber', width: 20 },
        { header: 'Email', key: 'vendorEmail', width: 30 },
        { header: 'Secondary Phone', key: 'vendorSecondaryPhoneNumber', width: 20 },
        { header: 'Business', key: 'vendorBussiness', width: 25 },
        { header: 'Address', key: 'vendorAddress', width: 40 },
        { header: 'Pin Code', key: 'pinCode', width: 12 },
        { header: 'City', key: 'city', width: 20 },
        { header: 'State', key: 'state', width: 20 },
        { header: 'Avatar URL', key: 'avatar.url', width: 40 },
        { header: 'Is Deleted', key: 'isDeleted', width: 12 }
      ];

      if (vendorData) {
        await exportToCsv(columns, vendorData, 'vendors');
      }
    } catch (error) {}
  };

  // -----------useQuery-----------
  const {
    data: vendors,
    refetch: refetchVendors,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['vendors_data', page, limit, query],
    queryFn: async () => {
      const response = await VendorServiceInstance.getAllVendors(page, limit, query);
      return response;
    }
  });

  //---------------useeffect--------------
  useEffect(() => {
    if (vendors) {
      setVendorData(vendors.data);
      setCount(vendors.total);
    }
  }, [vendors]);
  return (
    <>
      <SEO
        title="Vendors Management | Speedupora TMS"
        description="Manage vendors, contracts, payments, and service records seamlessly with Speedupora TMS vendor management module."
        canonicalUrl="https://www.speedupora.com/vendors"
        noIndex
      />

      <Box sx={{ display: 'flex' }} className="ps-6">
        <Grid container spacing={2.5}>
          <Grid item xs={12} className="flex flex-col xl:flex-row justify-between items-center gap-2 mb-5">
            {/* Left Side - Buttons */}
            <div className="flex gap-2">
              <Button onClick={() => handleTogglePopup()} variant="outlined">
                Add Vendor
              </Button>
              <Button onClick={() => handleDownload()} variant="outlined">
                Download Vendors
              </Button>
            </div>

            {/* Right Side - Search */}
            <div className="w-full xl:w-auto">
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
                <VendorTable
                  data={vendorData || []}
                  limit={limit}
                  setLimit={setLimit}
                  page={page}
                  setPage={setPage}
                  count={count}
                  refetchVendorAllData={refetchVendors}
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
            refetchVendors={refetchVendors}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default Vendor;
