import { store } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import axiosServices from 'utils/axios';

class PlanServices {
  //   Create Order
  async createOrder(planId: string) {
    try {
      const response: any = await axiosServices.post(`api/v1/payment/create-order`, { planId });
      if (response.data.success) {
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

  //   Verify Payment
  async verifyPayment(data: any) {
    try {
      const response: any = await axiosServices.post(`api/v1/payment/verify-payment`, data);
      console.log('verify in price page', response);
      if (response.data.success) {
        store.dispatch(
          openSnackbar({
            open: true,
            message: response.data.message || 'Payment Verified Successfully',
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

  // Get My Subscription
  async getMySubscription() {
    try {
      const response = await axiosServices.get(`api/v1/plan/get-my-plan`);
      if (response.data.success) {
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

const planServiceInstance = new PlanServices();
export default planServiceInstance;
