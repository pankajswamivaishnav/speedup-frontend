import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';
// import axiosServices from 'utils/axios';

class VendorServices {
  // Get All vendor
  async getAllVendors(page: Number, limit: Number, query?: String) {
    try {
      const response = await axiosServices.get(`api/v1/admin/totalVendors?page=${page}&limit=${limit}&filter=${query}`);
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

  // Create vendor
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
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
    }
  }

  // delete vendor
  async deleteVendor(id: string) {
    try {
      const response = await axiosServices.delete(`api/v1/admin/deleteVendor/${id}`);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Vendor deleted successfully',
            variant: 'alert',
            alert: {
              color: 'primary'
            },
            close: true
          })
        );
        return response.data.data;
      }
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.message,
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

  // -------------- Vendor Cards Services ----------------
  // Create Vendor Card
  async createVendorCard(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/createVendorCard`, data);
      if (response) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Vendor Card created successfully',
            variant: 'alert',
            alert: {
              color: 'info'
            },
            close: true
          })
        );
        return true;
      }
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
    }
  }
  // get all vendors cards
  async getAllVendorCards(query?: string) {
    try {
      const response = await axiosServices.get(`api/v1/getAllVendorCards?filter=${query}`);
      if (response.status) {
        return response.data;
      }
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.message,
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
}

const VendorServiceInstance = new VendorServices();
export default VendorServiceInstance;
