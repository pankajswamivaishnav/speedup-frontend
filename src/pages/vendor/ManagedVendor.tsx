import { Box, Button, Grid, Autocomplete, TextField } from '@mui/material';

import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import UniversalDialog from 'components/popup/UniversalDialog';
import AddManagedVendor from 'components/vendor/AddManagedVendor';

import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import ManagedVendorTable from 'components/vendor/ManagedVendorTable';
import { useQuery } from '@tanstack/react-query';
import VendorServiceInstance from 'services/vendor.services';
import TransporterServiceInstance from 'services/transporter.services';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import { exportToCsv } from 'utils/download';
import SEO from 'components/SEO';
import useAuth from 'hooks/useAuth';

const ManagedVendor = () => {
  const [managedVendorData, setManagedVendorData] = useState();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [selectedTransporter, setSelectedTransporter] = useState<any>(null);
  const [transportData, setTransportData] = useState<any[]>([]);
  const [unique, setUnique] = useState<boolean>(false);
  const { user } = useAuth();
  // -------------- Add managed vendor page pop up --------------
  const [managedVendorFormPopup, setManagedVendorFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Add Managed Vendor',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTogglePopup = async (id?: string) => {
    if (managedVendorFormPopup.action.open === true) {
      // refetchManagedVendorData();
    }
    setManagedVendorFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Add Managed Vendor" />
      };
    });
  };

  const handleDownload = async () => {
    try {
      const columns = [
        { header: 'ID', key: '_id', width: 35 },
        { header: 'First Name', key: 'first_name', width: 30 },
        { header: 'Last Name', key: 'last_name', width: 30 },
        { header: 'Mobile Number', key: 'mobileNumber', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Secondary Mobile Number', key: 'secondaryMobileNumber', width: 30 },
        { header: 'Business', key: 'business', width: 30 },
        { header: 'Address', key: 'address', width: 40 }
      ];

      if (managedVendorData) {
        await exportToCsv(columns, managedVendorData, 'managed-vendors');
      }
    } catch (error) {}
  };

  // Fetch transporter list for dropdown (only for super_admin)
  useEffect(() => {
    const fetchTransporters = async () => {
      if (user?.role === 'super_admin') {
        try {
          const response = await TransporterServiceInstance.getAllTransporter(0, 0);
          const formattedData = response.data.map((transporter: any) => ({
            label: transporter.transportName ? transporter.transportName : `${transporter.first_name}${transporter.last_name}`,
            id: transporter._id
          }));
          setTransportData(formattedData);
        } catch (error) {
          console.error('Error fetching transporters:', error);
        }
      }
    };
    fetchTransporters();
  }, [user?.role]);

  // -----------useQuery-----------
  const {
    data: managedVendor,
    refetch: refetchManagedVendorAllData,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['managed_vendors_data', page, limit, query, selectedTransporter?.id, unique, user?.role],
    queryFn: async () => {
      const creatorId = selectedTransporter?.id || undefined;
      const isSuperAdmin = user?.role === 'super_admin';
      const response = await VendorServiceInstance.getAllManagedVendors(page, limit, query, creatorId, unique, isSuperAdmin);
      return response;
    },
    refetchOnWindowFocus: false
  });

  //---------------useeffect--------------
  useEffect(() => {
    if (managedVendor) {
      setManagedVendorData(managedVendor.data);
      setCount(managedVendor.total);
    }
  }, [managedVendor]);

  return (
    <>
      <SEO
        title="Managed Vendors Management | Speedupora TMS"
        description="Manage managed vendor profiles efficiently with Speedupora TMS."
        canonicalUrl="https://www.speedupora.com/managed-vendors"
        noIndex
      />
      <Box sx={{ display: 'flex' }} className="ps-6">
        <Grid container spacing={2.5}>
          <Grid item xs={12} className="flex flex-col xl:flex-row justify-between items-center gap-2 mb-5">
            {/* Left side - Buttons */}
            <div className="flex gap-2 flex-wrap">
              {user.isPremium === true && (
                <Button onClick={() => handleTogglePopup()} variant="outlined">
                  Add Managed Vendor
                </Button>
              )}

              {user.isPremium === true && (
                <Button onClick={() => handleDownload()} variant="outlined">
                  Download Managed Vendors
                </Button>
              )}

              {user?.role === 'super_admin' && (
                <Button
                  onClick={() => setUnique(!unique)}
                  variant={unique ? 'contained' : 'outlined'}
                  color={unique ? 'primary' : 'inherit'}
                >
                  Unique Vendor
                </Button>
              )}
            </div>

            {/* Right side - Filters and Search */}
            <div className="flex gap-2 items-center flex-wrap">
              {user?.role === 'super_admin' && (
                <Autocomplete
                  sx={{ minWidth: 200 }}
                  value={selectedTransporter}
                  onChange={(event, newValue) => {
                    setSelectedTransporter(newValue);
                    setPage(0);
                  }}
                  options={transportData}
                  getOptionLabel={(option: any) => option?.label || ''}
                  renderInput={(params) => <TextField {...params} label="Select Transporter" size="small" />}
                />
              )}
              <div className="w-full xl:w-auto">
                <Search setQuery={setQuery} />
              </div>
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
                <ManagedVendorTable
                  data={managedVendorData || []}
                  limit={limit}
                  setLimit={setLimit}
                  page={page}
                  setPage={setPage}
                  count={count}
                  refetchManagedVendorAllData={refetchManagedVendorAllData}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* -----------Universal dialog for open add managed vendor page----------------*/}
      {!!managedVendorFormPopup && managedVendorFormPopup.action.open && (
        <UniversalDialog
          action={{ ...managedVendorFormPopup.action }}
          onClose={handleTogglePopup}
          title={managedVendorFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddManagedVendor
            onClose={() => handleTogglePopup()}
            isEditMode={managedVendorFormPopup?.data?.isEditMode}
            existingData={managedVendorFormPopup?.data.existingData}
            refetchManagedVendorAllData={refetchManagedVendorAllData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default ManagedVendor;
