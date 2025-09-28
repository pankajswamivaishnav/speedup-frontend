import { Button, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import MainCard from 'components/MainCard';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import { VisitingCardProps } from 'components/cards/VisitingCard';
import VisitingCardGrid from 'components/cards/VisitingCardGrid';
import AddDriverCard from 'components/drivers/AddDriverCard';
import UniversalDialog from 'components/popup/UniversalDialog';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import DriverServiceInstance from 'services/driver.services';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';

const DriverCardPage = () => {
  const [driverCards, setDriverCardData] = useState<VisitingCardProps[]>([]);
  const [query, setQuery] = useState<string>('');
  // -------------- Add transporter card pop up --------------
  const [driverCardFormPopup, setDriverCardFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Add Driver Card',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTogglePopup = async (id?: string) => {
    if (driverCardFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setDriverCardFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Add Driver Card" />
      };
    });
  };

  // -----------useQuery-----------
  const {
    data: driverCardsData,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['drivers_data', query],
    queryFn: async () => {
      const response = await DriverServiceInstance.getAllDriverCards(query);
      return response;
    }
  });
  //---------------useeffect--------------
  useEffect(() => {
    if (driverCardsData) {
      setDriverCardData(driverCardsData.data);
    }
    // eslint-disable-next-line
  }, [driverCardsData]);
  return (
    <>
      <MainCard border={false} boxShadow sx={{ height: '100%' }}>
        <Grid item xs={12} className="flex flex-col xl:flex-row justify-between items-center gap-2 mb-5">
          {/* Left side - Buttons */}
          <div className="flex gap-2">
            <Button onClick={() => handleTogglePopup()} variant="outlined">
              Add Card
            </Button>
          </div>

          {/* Right side - Search */}
          <div className="w-full xl:w-auto">
            <Search setQuery={setQuery} />
          </div>
        </Grid>
        {isLoading || isFetching ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Grid item xs={12} key={item}>
              <SkeletonProductPlaceholder />
            </Grid>
          ))
        ) : (
          <VisitingCardGrid cards={driverCards ?? []} title="Speed Up Professional Drivers" />
        )}
      </MainCard>
      {/* -----------Universal dialog for open add driver card----------------*/}
      {!!driverCardFormPopup && driverCardFormPopup.action.open && (
        <UniversalDialog
          action={{ ...driverCardFormPopup.action }}
          onClose={handleTogglePopup}
          title={driverCardFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddDriverCard
            onClose={() => handleTogglePopup()}
            isEditMode={driverCardFormPopup?.data?.isEditMode}
            existingData={driverCardFormPopup?.data.existingData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default DriverCardPage;
