import * as Yup from 'yup';

export const transporterValidationSchema = Yup.object({
  transportName: Yup.string().required('Transport name is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  registrationNumber: Yup.string().required('Registration number is required'),
  transportAddress: Yup.string().required('Address is required'),
  panCardNumber: Yup.string().required('PAN number is required'),
  pinCode: Yup.string().required('Pin code is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  password: Yup.string().required('Password is required')
});

export const driverValidationSchema = Yup.object({
  first_name: Yup.string().required('Driver first name is required'),
  last_name: Yup.string().required('Driver last name is required'),
  mobileNumber: Yup.number().required('Driver mobile number is required'),
  truckNumber: Yup.string().required('Truck number is required'),
  address: Yup.string().required('Adress is required'),
  licenseNumber: Yup.string().required('License number is required'),
  transportId: Yup.string().required('Choose transport')
});

export const driverCardValidationSchema = Yup.object({
  first_name: Yup.string().required('Driver first name is required'),
  last_name: Yup.string().required('Driver last name is required'),
  mobileNumber: Yup.number().required('Driver mobile number is required'),
  truckNumber: Yup.string().required('Truck number is required')
});

export const vendorValidationSchema = Yup.object({
  first_name: Yup.string().required('Vendor first name is required'),
  last_name: Yup.string().required('Vendor last name is required'),
  mobileNumber: Yup.number().required('Vendor mobile number is required'),
  address: Yup.string().required('Address is required'),
  business: Yup.string().required('Business name is required'),
  pinCode: Yup.string().required('Pin code is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required')
});

export const vendorValidationCardSchema = Yup.object({
  first_name: Yup.string().required('Vendor first name is required'),
  last_name: Yup.string().required('Vendor last name is required'),
  mobileNumber: Yup.number().required('Vendor mobile number is required'),
  address: Yup.string().required('Address is required'),
  business: Yup.string().required('Business name is required'),
  city: Yup.string().required('City is required')
});

export const biltiesValidationSchema = Yup.object({
  transporterNumber: Yup.number().typeError('Transporter Number must be a number').required('Transporter Number is required'),
  truckNumber: Yup.string().required('Truck number is required'),
  driverName: Yup.string().required('Driver name is required'),
  driverPhoneNumber: Yup.string()
    .required('Driver phone number is required')
    .matches(/^[0-9]{10}$/, 'Driver phone number must be 10 digits'),
  from: Yup.string().required('Loading place (from) is required'),
  to: Yup.string().required('Drop point (to) is required'),
  date: Yup.date().required('Date is required'),
  senderName: Yup.string().required('Sender name is required'),
  senderNumber: Yup.number().required('Sender number is required'),
  receiverNumber: Yup.number().required('Receiver number is required'),
  receiverName: Yup.string().required('Receiver name is required'),
  goodsCategory: Yup.string().required('Goods category is required'),
  weight: Yup.string().required('Weight is required'),
  truckCharge: Yup.string().required('Truck charge is required'),
  advancePayment: Yup.string().required('Advance payment is required'),
  remainingPayment: Yup.string().required('Remaining payment is required'),
  brokingCharge: Yup.string().required('Broking charge is required'),
  paymentType: Yup.string()
    .oneOf(['cash', 'upi', 'banktransfer', 'netbanking'], 'Invalid payment type')
    .required('Payment type is required')
});

export const managedTransporterValidationSchema = Yup.object({
  transportName: Yup.string().required('Transport name is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  officeNumber: Yup.string(),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Must be a valid email')
});

export const managedDriverValidationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  mobileNumber: Yup.number().typeError('Mobile number must be a number').required('Mobile number is required'),
  truckNumber: Yup.string(),
  address: Yup.string()
});

export const managedVendorValidationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  mobileNumber: Yup.number().typeError('Mobile number must be a number').required('Mobile number is required'),
  email: Yup.string().email('Must be a valid email'),
  secondaryMobileNumber: Yup.number().typeError('Secondary mobile number must be a number'),
  business: Yup.string().required('Business is required'),
  address: Yup.string().required('Address is required')
});
