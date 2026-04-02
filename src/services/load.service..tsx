import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';

const BASE_URL = 'api/v1/load';

class LoadService {
  async createLoad(data: any) {
    try {
      const response = await axiosServices.post(`${BASE_URL}/create-load`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Load created successfully.',
            variant: 'alert',
            alert: {
              color: 'primary'
            },
            close: true
          })
        );
        return response.data;
      }
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.error || error.message,
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

  async updateLoad(id: string, data: any) {
    try {
      const response = await axiosServices.put(`${BASE_URL}/update-load/${id}`, data);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Load updated successfully.',
            variant: 'alert',
            alert: {
              color: 'primary'
            },
            close: true
          })
        );
        return response.data;
      }
    } catch (error: any) {
      store.dispatch(
        openSnackbar({
          open: true,
          message: error.error || error.message,
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

  async getAllLoads({ page, limit, filter = '' }: { page: number; limit: number; filter?: string }) {
    try {
      const response = await axiosServices.get(
        `${BASE_URL}/get-all-loads?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`
      );
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

  async getMyLoads({ page, limit, startDate = '', endDate = '' }: { page: number; limit: number; startDate?: string; endDate?: string }) {
    try {
      const response = await axiosServices.get(
        `${BASE_URL}/get-my-loads?page=${page}&limit=${limit}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(
          endDate
        )}`
      );
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

  async deleteLoad(id: string) {
    try {
      const response = await axiosServices.delete(`api/v1/load/delete-load/${id}`);
      if (response.status) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: 'Load deleted successfully',
            variant: 'alert',
            alert: {
              color: 'primary'
            },
            close: true
          })
        );
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

const loadServiceInstance = new LoadService();
export default loadServiceInstance;
