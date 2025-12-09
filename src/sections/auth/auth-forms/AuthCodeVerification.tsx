import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';

// third-party
import OtpInput from 'react18-input-otp';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// types
import { ThemeMode } from 'types/config';
import useAuth from 'hooks/useAuth';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = (data: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState<string>();
  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[200] : theme.palette.grey[300];

  // ------------ Handlers -----------------
  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(data.data[0].email, otp);
      if (response.status === 200 && response.data.success) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Your verification has been successfully completed.',
            variant: 'alert',
            alert: {
              color: 'primary'
            },
            close: false
          })
        );
        navigate('/login');
      }
    } catch (error) {
      console.log('Error Occured while verify otp', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OtpInput
          value={otp}
          onChange={(otp: string) => setOtp(otp)}
          numInputs={4}
          containerStyle={{ justifyContent: 'space-between' }}
          inputStyle={{
            width: '100%',
            margin: '8px',
            padding: '10px',
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            ':hover': {
              borderColor: theme.palette.primary.main
            }
          }}
          focusStyle={{
            outline: 'none',
            boxShadow: theme.customShadows.primary,
            border: `1px solid ${theme.palette.primary.main}`
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" variant="contained" onClick={handleVerifyOtp}>
            Continue
          </Button>
        </AnimateButton>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography>Did not receive the email? Check your spam filter, or</Typography>
          <Typography variant="body1" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer' }} color="primary">
            Resend code
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthCodeVerification;
