import { Box, Button, Grid } from '@mui/material';

import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import UniversalDialog from 'components/popup/UniversalDialog';
import AddTransporter from 'components/transporter/AddTransporter';

import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import TransportTable from 'components/transporter/TransportTable';
import { useQuery } from '@tanstack/react-query';
import TransporterServiceInstance from 'services/transporter.services';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import { exportToCsv } from 'utils/download';
import SEO from 'components/SEO';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Transporter = () => {
  // const [isLoading, setLoading] = useState(true);
  const [transporterData, setTransporterData] = useState();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const handleDownload = async () => {
    try {
      const columns = [
        { header: 'Avatar', key: 'avatar', width: 35 },
        { header: 'ID', key: '_id', width: 35 },
        { header: 'Transport Name', key: 'transportName', width: 30 },
        { header: 'Transporter First Name', key: 'first_name', width: 30 },
        { header: 'Transporter Last Name', key: 'last_name', width: 30 },
        { header: 'Mobile Number', key: 'mobileNumber', width: 30 },
        { header: 'Office Number', key: 'officeNumber', width: 30 },
        { header: 'Registration Number', key: 'registrationNumber', width: 30 },
        { header: 'GST Number', key: 'gstNumber', width: 30 },
        { header: 'Transport Address', key: 'transportAddress', width: 30 },
        { header: 'Faith Line', key: 'faithLine', width: 30 },
        { header: 'PAN Card Number', key: 'panCardNumber', width: 30 },
        { header: 'Pin Code', key: 'pinCode', width: 30 },
        { header: 'City', key: 'city', width: 30 },
        { header: 'State', key: 'state', width: 30 },
        { header: 'Country', key: 'country', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Password', key: 'password', width: 30 },
        { header: 'Is Deleted', key: 'isDeleted', width: 30 },
        { header: 'Role', key: 'role', width: 30 },
        { header: 'Version', key: '__v', width: 30 }
      ];

      if (transporterData) {
        await exportToCsv(columns, transporterData, 'transporters');
      }
    } catch (error) {}
  };

  // -----------useQuery-----------
  const {
    data: transporter,
    refetch: refetchTransporterAllData,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['transporters_data', page, limit, query],
    queryFn: async () => {
      const response = await TransporterServiceInstance.getAllTransporter(page, limit, query);
      return response;
    },
    refetchOnWindowFocus: false
  });

  //---------------useeffect--------------
  useEffect(() => {
    if (transporter) {
      setTransporterData(transporter.data);
      setCount(transporter.total);
    }
  }, [transporter]);

  return (
    <>
      <SEO
        title="Transporters Management | Speedupora TMS"
        description="Manage transporter profiles, assign trips, track performance, and maintain transport records efficiently with Speedupora TMS."
        canonicalUrl="https://www.speedupora.com/transporters"
        noIndex
      />
      <Box sx={{ display: 'flex' }} className="ps-6">
        <Grid container spacing={2.5}>
          <Grid item xs={12} className="flex flex-col xl:flex-row justify-between items-center gap-2 mb-5">
            {/* Left side - Buttons */}
            <div className="flex gap-2">
              {user.role === 'super_admin' && (
                <Button onClick={() => handleTogglePopup()} variant="outlined">
                  Add Transport
                </Button>
              )}

              {user.role === 'super_admin' && (
                <Button onClick={() => navigate('/managed-transporters')} variant="outlined">
                  Manage Transporter
                </Button>
              )}

              {user.isPremium === true && (
                <Button onClick={() => handleDownload()} variant="outlined">
                  Download Transporters
                </Button>
              )}
            </div>

            {/* Right side - Search */}
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
            refetchTransporterAllData={refetchTransporterAllData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default Transporter;
