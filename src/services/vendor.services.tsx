import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';
// import axiosServices from 'utils/axios';

class VendorServices {
  // Get All Drivers
  async getAllVendors(page: Number, limit: Number) {
    try {
      const response = await axiosServices.get(`api/v1/admin/totalVendors?page=${page}&limit=${limit}`);
      if (response.status) {
        return response.data;
      }
    } catch (error) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: 'Something went wrong vendorsServices!!',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
      throw error;
    }
  }

  // Create Driver
  async createVendor(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/vendor/createVendor`, data);
      if (response) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Vendor created successfully',
            variant: 'alert',
            alert: {
              color: 'info'
            },
            close: true
          })
        );
        return true;
      }
    } catch (error) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
    }
  }
}

const VendorServiceInstance = new VendorServices();
export default VendorServiceInstance;
