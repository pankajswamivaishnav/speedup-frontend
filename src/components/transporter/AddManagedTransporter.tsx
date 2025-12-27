import { Button, FormHelperText, TextField } from '@mui/material';
import { Box, Grid, InputLabel, Stack } from '@mui/material';
import { Formik } from 'formik';
import { RefObject, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import TransporterServiceInstance from 'services/transporter.services';
import { managedTransporterValidationSchema } from 'pages/validation/validation';
import useAuth from 'hooks/useAuth';

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

const AddManagedTransporter = ({
  onClose,
  isEditMode,
  existingData,
  isDisable,
  refetchManagedTransporterAllData
}: {
  onClose: (refetchData?: boolean) => void;
  isEditMode: Boolean;
  existingData: any;
  isDisable?: boolean;
  refetchManagedTransporterAllData?: () => void;
}) => {
  const inputRef = useInputRef();
  const { user } = useAuth();
  const [initialValues, setInitialValues] = useState({
    transportName: '',
    first_name: '',
    last_name: '',
    mobileNumber: '',
    officeNumber: '',
    address: '',
    email: '',
    creator: {
      userId: user._id,
      role: user.role === 'transporter' ? 'Transporter' : user.role === 'driver' ? 'Driver' : 'Vendors'
    }
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && existingData && existingData.managedTransporterData) {
      setInitialValues({
        transportName: existingData.managedTransporterData.transportName || '',
        first_name: existingData.managedTransporterData.first_name || '',
        last_name: existingData.managedTransporterData.last_name || '',
        mobileNumber: existingData.managedTransporterData.mobileNumber || '',
        officeNumber: existingData.managedTransporterData.officeNumber || '',
        address: existingData.managedTransporterData.address || '',
        email: existingData.managedTransporterData.email || '',
        creator: existingData.managedTransporterData.creator || {
          userId: user._id,
          role: user.role === 'transporter' ? 'Transporter' : user.role === 'driver' ? 'Driver' : 'Vendors'
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, existingData]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={managedTransporterValidationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setSubmitting(true);
          let response;
          if (isEditMode) {
            response = await TransporterServiceInstance.updateManagedTransporter(existingData.managedTransporterData._id, values);
          } else {
            response = await TransporterServiceInstance.createManagedTransporter(values);
          }
          if (response) {
            onClose(true);
            refetchManagedTransporterAllData && refetchManagedTransporterAllData();
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, submitCount }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-transport-name">
                      Transport Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-transport-name"
                      value={values.transportName}
                      name="transportName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Transport Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.transportName || submitCount > 0) && errors.transportName && (
                      <FormHelperText error id="managed-transport-name-helper">
                        {errors.transportName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-transporter-first-name">
                      First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-transporter-first-name"
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.first_name || submitCount > 0) && errors.first_name && (
                      <FormHelperText error id="managed-transporter-first-name-helper">
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} spacing={3}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-transporter-last-name">
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-transporter-last-name"
                      value={values.last_name}
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                      autoFocus
                      inputRef={inputRef}
                      disabled={isDisable}
                    />
                    {(touched.last_name || submitCount > 0) && errors.last_name && (
                      <FormHelperText error id="managed-transporter-last-name-helper">
                        {errors.last_name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-transporter-mobile-number">
                      Mobile Number <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.mobileNumber}
                      name="mobileNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="managed-transporter-mobile-number"
                      placeholder="Mobile Number"
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {(touched.mobileNumber || submitCount > 0) && errors.mobileNumber && (
                      <FormHelperText error id="managed-transporter-mobile-number-helper">
                        {errors.mobileNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-transporter-office-number">Office Number</InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.officeNumber}
                      name="officeNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="managed-transporter-office-number"
                      placeholder="Office Number"
                      disabled={isDisable}
                      inputProps={{ maxLength: 10 }}
                    />
                    {(touched.officeNumber || submitCount > 0) && errors.officeNumber && (
                      <FormHelperText error id="managed-transporter-office-number-helper">
                        {errors.officeNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-transporter-email">Email</InputLabel>
                    <TextField
                      fullWidth
                      id="managed-transporter-email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Email"
                      disabled={isDisable}
                    />
                    {(touched.email || submitCount > 0) && errors.email && (
                      <FormHelperText error id="managed-transporter-email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="managed-transporter-address">
                      Address <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="managed-transporter-address"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address"
                      disabled={isDisable}
                      multiline
                      rows={3}
                    />
                    {(touched.address || submitCount > 0) && errors.address && (
                      <FormHelperText error id="managed-transporter-address-helper">
                        {errors.address}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {isDisable ? (
                  ''
                ) : (
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                      <Button variant="outlined" type="button" color="secondary" onClick={() => onClose()}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="outlined" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
                      </Button>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddManagedTransporter;
