import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';
// import axiosServices from 'utils/axios';

class DriverServices {
  // Get All Drivers
  async getAllDrivers(page: Number, limit: Number, query?: String) {
    try {
      const response = await axiosServices.get(`api/v1/getAllDrivers?page=${page}&limit=${limit}&filter=${query}`);
      if (response.status) {
        return response.data;
      }
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: `${error.message} || Something went wrong driverServices!!`,
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
  async createDriver(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/createDriver`, data);
      if (response) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Driver created successfully',
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

  // -------------- Driver Cards Services ----------------

  // Create Driver Card
  async createDriverCard(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/createDriverCard`, data);
      if (response) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Driver created successfully',
            variant: 'alert',
            alert: {
              color: 'primary'
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
            color: 'primary'
          },
          close: true
        })
      );
    }
  }

  // get all driver cards
  async getAllDriverCards(query?: String) {
    try {
      const response = await axiosServices.get(`api/v1/getAllDriverCards?filter=${query}`);
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

  // delete driver
  async deleteDriver(id: string) {
    try {
      const response = await axiosServices.delete(`api/v1/deleteDriver/${id}`);
      if (response.data.success) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Driver deleted successfully.',
            variant: 'alert',
            alert: {
              color: 'primary'
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
      throw error;
    }
  }

  // -------------- Managed Driver Services ----------------
  // Create Managed Driver
  async createManagedDriver(data: any) {
    try {
      const response = await axiosServices.post(`api/v1/managed/create-driver`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed driver created successfully.',
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

  // Get All Managed Drivers
  async getAllManagedDrivers(page: Number, limit: Number, query?: string, creatorId?: string, unique?: boolean, isSuperAdmin?: boolean) {
    try {
      let url = '';
      if (isSuperAdmin) {
        url = `api/v1/admin/get-all-managed-drivers?page=${page}&limit=${limit}`;
        if (query) url += `&search=${query}`;
        if (creatorId) url += `&creatorId=${creatorId}`;
        if (unique) url += `&unique=true`;
      } else {
        url = `api/v1/managed/get-all-drivers?page=${page}&limit=${limit}&filter=${query}`;
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

  // Get Managed Driver By ID
  async getManagedDriverById(id: string) {
    try {
      const response = await axiosServices.get(`api/v1/managed/get-driver/${id}`);
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

  // Update Managed Driver
  async updateManagedDriver(id: string, data: any) {
    try {
      const response = await axiosServices.put(`api/v1/managed/update-driver/${id}`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed driver updated successfully.',
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

  // Delete Managed Driver
  async deleteManagedDriver(id: string) {
    try {
      const response = await axiosServices.delete(`api/v1/managed/delete-driver/${id}`);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Managed driver deleted successfully',
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

const DriverServiceInstance = new DriverServices();
export default DriverServiceInstance;
