import { useState, Fragment } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Switch, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { CheckOutlined } from '@ant-design/icons';
import StandardLogo from 'assets/images/price/Standard';
import StandardPlusLogo from 'assets/images/price/StandardPlus';

// plan list
const plans = [
  {
    active: false,
    icon: <StandardLogo />,
    title: 'Standard',
    description:
      'Includes essential trip management, digital bilty creation, basic driver and vendor records, and a simple dashboard to manage daily transport operations efficiently.',
    price: 99,
    permission: [0, 1]
  },
  {
    active: true,
    icon: <StandardPlusLogo />,
    title: 'Standard Plus',
    description:
      'Ideal for growing transport businesses. Manage trips, vehicles, drivers, and customers with advanced reporting, billing support, and real-time operational control.',
    price: 499,
    permission: [0, 1, 2, 3]
  },
  {
    active: false,
    icon: <StandardPlusLogo />,
    title: 'Extended',
    description:
      'Includes complete transport management with unlimited digital bilty storage, advanced analytics, monthly and yearly commission reports, full dashboard insights, priority support, and scalable tools for high-volume transport operations.',
    price: 999,
    permission: [0, 1, 2, 3, 4, 5, 6, 7]
  }
];

const planList = [
  'Transporter, Driver & Vendor Management',
  'Digital Bilty (LR) Creation & Management',
  'Centralized Dashboard for Complete Control',
  'Automatic Commission Calculation (Monthly / Yearly)',
  'Quick Bilty Search with Filters',
  'Paperless Records with Lifetime Digital Storage',
  'Save & Search Transporter Contact Cards',
  'Create & Manage Driver & Vendor Cards'
];

const Pricing = () => {
  const theme = useTheme();
  const [timePeriod, setTimePeriod] = useState(true);

  const priceListDisable = {
    opacity: 0.4,
    '& >div> svg': {
      fill: theme.palette.secondary.light
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <Grid container item xs={12} md={9} lg={7}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Typography variant="subtitle1" color={timePeriod ? 'textSecondary' : 'textPrimary'}>
                  Billed Yearly
                </Typography>
                <Switch checked={timePeriod} onChange={() => setTimePeriod(!timePeriod)} inputProps={{ 'aria-label': 'container' }} />
                <Typography variant="subtitle1" color={timePeriod ? 'textPrimary' : 'textSecondary'}>
                  Billed Monthly
                </Typography>
              </Stack>
              <Typography color="textSecondary">
                A complete Transport Management System designed to simplify daily operations. Manage transporters, drivers, vendors, digital
                bilty, commissions, and reports from one powerful dashboard — no manual records required.
              </Typography>
            </Stack>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item container spacing={3} xs={12}>
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MainCard sx={{ pt: 1.75 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} textAlign="center">
                    {plan.icon}
                    <Typography variant="h4">{plan.title}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{plan.description}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1} alignItems="flex-end">
                    {timePeriod && <Typography variant="h2">₹{plan.price}</Typography>}
                    {!timePeriod && <Typography variant="h2">₹{plan.price * 12 - 99}</Typography>}
                    <Typography variant="h6" color="textSecondary">
                      Monthly
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Button variant={plan.active ? 'contained' : 'outlined'} fullWidth>
                    Order Now
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <List
                    sx={{
                      m: 0,
                      p: 0,
                      '&> li': {
                        px: 0,
                        py: 0.625,
                        '& svg': {
                          fill: theme.palette.success.dark
                        }
                      }
                    }}
                    component="ul"
                  >
                    {planList.map((list, i) => (
                      <Fragment key={i}>
                        <ListItem sx={!plan.permission.includes(i) ? priceListDisable : {}} divider>
                          <ListItemIcon>
                            <CheckOutlined />
                          </ListItemIcon>
                          <ListItemText primary={list} />
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Pricing;
