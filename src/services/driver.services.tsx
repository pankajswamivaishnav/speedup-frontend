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
}

const DriverServiceInstance = new DriverServices();
export default DriverServiceInstance;
