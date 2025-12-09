// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthCodeVerification from 'sections/auth/auth-forms/AuthCodeVerification';

// react-router-dom
import { useLocation } from 'react-router-dom';

// ================================|| CODE VERIFICATION ||================================ //

const CodeVerification = () => {
  const location = useLocation();
  const { data } = location?.state || {};

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h3">Enter Verification Code</Typography>
            <Typography color="secondary">We send you on mail.</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography>We`ve send you code on {data?.[0].email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <AuthCodeVerification data={data} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default CodeVerification;
