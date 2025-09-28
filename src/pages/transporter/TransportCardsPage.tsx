import { Button, Divider, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import MainCard from 'components/MainCard';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import { VisitingCardProps } from 'components/cards/VisitingCard';
import VisitingCardGrid from 'components/cards/VisitingCardGrid';
import UniversalDialog from 'components/popup/UniversalDialog';
import AddTransportCard from 'components/transporter/AddTransportCard';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import TransporterServiceInstance from 'services/transporter.services';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';

const TransportCardsPage = () => {
  const [query, setQuery] = useState<string>('');
  const [transportCards, setTransportCardData] = useState<VisitingCardProps[]>([]);
  // -------------- Add transporter card pop up --------------
  const [transportCardFormPopup, setTransportCardFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Add Transport Card',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTogglePopup = async (id?: string) => {
    if (transportCardFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setTransportCardFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Add Transport Card" />
      };
    });
  };

  // -----------useQuery-----------
  const {
    data: transportCardData,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['drivers_data', query],
    queryFn: async () => {
      const response = await TransporterServiceInstance.getAllTransportCards(query);
      return response;
    }
  });
  //---------------useeffect--------------
  useEffect(() => {
    if (transportCardData) {
      setTransportCardData(transportCardData.data);
    }
    // eslint-disable-next-line
  }, [transportCardData]);
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
        <Divider />
        {isLoading || isFetching ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Grid item xs={12} key={item}>
              <SkeletonProductPlaceholder />
            </Grid>
          ))
        ) : (
          <VisitingCardGrid cards={transportCards} title="Our Speed Up Transporters" />
        )}
      </MainCard>

      {/* -----------Universal dialog for open add transport card----------------*/}
      {!!transportCardFormPopup && transportCardFormPopup.action.open && (
        <UniversalDialog
          action={{ ...transportCardFormPopup.action }}
          onClose={handleTogglePopup}
          title={transportCardFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddTransportCard
            onClose={() => handleTogglePopup()}
            isEditMode={transportCardFormPopup?.data?.isEditMode}
            existingData={transportCardFormPopup?.data.existingData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default TransportCardsPage;
