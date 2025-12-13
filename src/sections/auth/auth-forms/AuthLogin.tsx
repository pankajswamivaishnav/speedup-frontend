import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ============================|| JWT - LOGIN ||============================ //
// This component supports both email and mobile number login
// The system automatically detects the input type and sends the appropriate data to the backend

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          emailOrMobile: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          emailOrMobile: Yup.string()
            .test('email-or-mobile', 'Must be a valid email or mobile number', function (value) {
              if (!value) return false;

              // Check if it's an email
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (emailRegex.test(value)) return true;

              // Check if it's a mobile number (10 digits, optionally with country code)
              const mobileRegex = /^(\+?91|0)?[6-9]\d{9}$/;
              if (mobileRegex.test(value)) return true;

              return false;
            })
            .max(255)
            .required('Email or mobile number is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.emailOrMobile, values.password, checked);

            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err: any) {
            store.dispatch(
              openSnackbar({
                open: true,
                message: err.message || err.error,
                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: true
              })
            );
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
            if (err.isVerified === false) {
              navigate(`/code-verification`, { state: { email: values.emailOrMobile, expiresAt: err.expiresAt } });
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="emailOrMobile-login">Email or Mobile Number</InputLabel>
                  <OutlinedInput
                    id="emailOrMobile-login"
                    type="text"
                    value={values.emailOrMobile}
                    name="emailOrMobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address or mobile number"
                    fullWidth
                    error={Boolean(touched.emailOrMobile && errors.emailOrMobile)}
                  />
                  {touched.emailOrMobile && errors.emailOrMobile && (
                    <FormHelperText error id="standard-weight-helper-text-emailOrMobile-login">
                      {errors.emailOrMobile}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="/forgot-password" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button size="large" type="submit" fullWidth className="bg-blue-500 text-white hover:bg-sky-400 hover:text-white">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
