import { Fragment } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Chip, CircularProgress } from '@mui/material';

// third-party
import { CheckOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

// project imports
import MainCard from 'components/MainCard';
import planServiceInstance from 'services/plan.services';

const MySubscription = ({ setValue }: any) => {
  const theme = useTheme();

  // ----------- useQuery -----------
  const { data, isLoading, isFetching, error } = useQuery<any>({
    queryKey: ['my_subscription'],
    queryFn: async () => {
      const response = await planServiceInstance.getMySubscription();
      console.log('response-->', response);
      return response;
    }
  });

  if (isLoading || isFetching) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '60vh' }}>
        <CircularProgress />
      </Stack>
    );
  }

  // Handle error or no data
  if (error || !data || !data.plan) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard>
            <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
              <Typography variant="h4" color="textSecondary">
                No Active Subscription
              </Typography>
              <Typography color="textSecondary" textAlign="center">
                You don't have an active subscription yet. Choose a plan to get started.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setValue(0)}>
                View Plans
              </Button>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    );
  }

  const { plan, payment } = data;
  const startDate = payment?.createdAt ? new Date(payment.createdAt) : new Date();
  const endDate = new Date(startDate);
  if (plan?.durationInDays) {
    endDate.setDate(endDate.getDate() + plan.durationInDays);
  }

  return (
    <Grid container spacing={3}>
      {/* ---------- Current Plan Card ---------- */}
      <Grid item xs={12}>
        <MainCard>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3">{plan?.name || 'N/A'}</Typography>
              <Chip label="Active" color="success" />
            </Stack>

            <Typography color="textSecondary">{plan?.description || 'No description available'}</Typography>

            <Stack direction="row" spacing={4}>
              <Typography variant="h4">₹{plan?.price || 0} / month</Typography>
              <Typography color="textSecondary">
                Valid till: <strong>{endDate.toDateString()}</strong>
              </Typography>
            </Stack>
          </Stack>
        </MainCard>
      </Grid>

      {/* ---------- Features ---------- */}
      <Grid item xs={12} md={6}>
        <MainCard title="Plan Benefits">
          <List
            sx={{
              '& svg': {
                fill: theme.palette.success.dark
              }
            }}
          >
            {plan.features && plan.features.length > 0 ? (
              plan.features.map((feature: string, index: number) => (
                <Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <CheckOutlined />
                    </ListItemIcon>
                    <ListItemText primary={feature.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())} />
                  </ListItem>
                </Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No features available" />
              </ListItem>
            )}
          </List>
        </MainCard>
      </Grid>

      {/* ---------- Payment Details ---------- */}
      <Grid item xs={12} md={6}>
        <MainCard title="Payment Details">
          <Stack spacing={1.5}>
            <Typography>
              <strong>Order ID:</strong> {payment?.orderId || 'N/A'}
            </Typography>
            <Typography>
              <strong>Payment ID:</strong> {payment?.paymentId || 'N/A'}
            </Typography>
            <Typography>
              <strong>Status:</strong>{' '}
              <Chip label={payment?.status || 'Unknown'} color={payment?.status === 'completed' ? 'success' : 'warning'} size="small" />
            </Typography>
            <Typography>
              <strong>Amount:</strong> ₹{payment?.amount || 0}
            </Typography>
            <Typography>
              <strong>Payment Method:</strong> {payment?.method || 'N/A'}
            </Typography>
          </Stack>
        </MainCard>
      </Grid>

      {/* ---------- Actions ---------- */}
      <Grid item xs={12}>
        <MainCard>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" color="primary" onClick={() => (window.location.href = '/subscription')}>
              Upgrade Plan
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                // later integrate cancel API
                alert('Cancel plan feature coming soon');
              }}
            >
              Cancel Subscription
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default MySubscription;
