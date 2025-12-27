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

  // -------------- Managed Vendor Services ----------------
  // Create Managed Vendor
  async createManagedVendor(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/managed/create-vendor`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed vendor created successfully.',
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

  // Get All Managed Vendors
  async getAllManagedVendors(page: Number, limit: Number, query?: string, creatorId?: string, unique?: boolean, isSuperAdmin?: boolean) {
    try {
      let url = '';
      if (isSuperAdmin) {
        url = `api/v1/admin/get-all-managed-vendors?page=${page}&limit=${limit}`;
        if (query) url += `&search=${query}`;
        if (creatorId) url += `&creatorId=${creatorId}`;
        if (unique) url += `&unique=true`;
      } else {
        url = `api/v1/managed/get-all-vendors?page=${page}&limit=${limit}&filter=${query}`;
      }
      const response = await axiosServices.get(url);
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

  // Get Managed Vendor By ID
  async getManagedVendorById(id: string) {
    try {
      const response = await axiosServices.get(`api/v1/managed/get-vendor/${id}`);
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

  // Update Managed Vendor
  async updateManagedVendor(id: string, data: any) {
    try {
      const response = await axiosServices.put(`api/v1/managed/update-vendor/${id}`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed vendor updated successfully.',
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

  // Delete Managed Vendor
  async deleteManagedVendor(id: string) {
    try {
      const response = await axiosServices.delete(`api/v1/managed/delete-vendor/${id}`);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed vendor deleted successfully',
            variant: 'alert',
            alert: {
              color: 'info'
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
}

const VendorServiceInstance = new VendorServices();
export default VendorServiceInstance;
