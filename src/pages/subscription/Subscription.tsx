import { useState, useEffect } from 'react';

// material-ui
import { Box, Grid, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import Pricing from './Pricing';
import MySubscription from './MySubscription';

// ==============================|| SUBSCRIPTION PAGE ||============================== //

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`subscription-tabpanel-${index}`}
      aria-labelledby={`subscription-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `subscription-tab-${index}`,
    'aria-controls': `subscription-tabpanel-${index}`
  };
}

const Subscription = () => {
  const { user } = useAuth();

  // Set default tab based on isPremium status
  // If user is premium, default to "My Plan" tab (index 1), otherwise "Plans" tab (index 0)
  const [value, setValue] = useState(user?.isPremium === true ? 1 : 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Update tab if user premium status changes
  useEffect(() => {
    if (user?.isPremium === true) {
      setValue(1);
    } else if (user?.isPremium === false) {
      setValue(0);
    }
  }, [user?.isPremium]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={value} onChange={handleChange} aria-label="subscription tabs">
              <Tab label="Plans" {...a11yProps(0)} />
              <Tab label="My Plan" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Pricing />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MySubscription setValue={setValue} />
          </TabPanel>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Subscription;
