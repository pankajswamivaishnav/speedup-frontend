import { Button, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import MainCard from 'components/MainCard';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import { VisitingCardProps } from 'components/cards/VisitingCard';
import VisitingCardGrid from 'components/cards/VisitingCardGrid';
import UniversalDialog from 'components/popup/UniversalDialog';
import AddVendorCard from 'components/vendor/AddVendorCard';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import VendorServiceInstance from 'services/vendor.services';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';

const VendorCardsPage = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const [vendorCards, setVendorCardData] = useState<VisitingCardProps[]>([]);
  // -------------- Add vendor card pop up --------------
  const [vendorCardFormPopup, setVendorCardFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Add Transport Card',
    data: { existingData: {}, isEditMode: false }
  });

  //-------------------handlers-------------------
  const handleTogglePopup = async (id?: string) => {
    if (vendorCardFormPopup.action.open === true) {
      // refetchTransporterData();
    }
    setVendorCardFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Add Transport Card" />
      };
    });
  };

  // -----------useQuery-----------
  const { data: vendorCardData } = useQuery({
    queryKey: ['vendor_card_data', query],
    queryFn: async () => {
      setLoading(true);
      const response = await VendorServiceInstance.getAllVendorCards(query);
      return response;
    }
  });
  //---------------useeffect--------------
  useEffect(() => {
    if (vendorCardData) {
      setVendorCardData(vendorCardData.data);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [vendorCardData]);

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
        {isLoading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Grid item xs={12} key={item}>
              <SkeletonProductPlaceholder />
            </Grid>
          ))
        ) : (
          <VisitingCardGrid cards={vendorCards} title="Our Speed Up Vendors" />
        )}
      </MainCard>
      {/* -----------Universal dialog for open add transport card----------------*/}
      {!!vendorCardFormPopup && vendorCardFormPopup.action.open && (
        <UniversalDialog
          action={{ ...vendorCardFormPopup.action }}
          onClose={handleTogglePopup}
          title={vendorCardFormPopup.title}
          hasPrimaryButton={false}
        >
          <AddVendorCard
            onClose={() => handleTogglePopup()}
            isEditMode={vendorCardFormPopup?.data?.isEditMode}
            existingData={vendorCardFormPopup?.data.existingData}
          />
        </UniversalDialog>
      )}
    </>
  );
};

export default VendorCardsPage;
