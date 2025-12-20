// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Locales from 'components/Locales';
// import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { registerServiceWorker, askNotificationPermission, createSubscription } from 'notification/pushNotification';
import { useEffect } from 'react';
import axiosServices from 'utils/axios';

const queryClient = new QueryClient();
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  useEffect(() => {
    (async () => {
      try {
        const permission = await askNotificationPermission();
        if (permission !== 'granted') {
          console.log('Notification permission not granted');
          return;
        }

        const registration = await registerServiceWorker();
        if (!registration) {
          console.error('Service Worker registration failed');
          return;
        }

        const subscription = await createSubscription(registration);
        if (!subscription) {
          console.error('Failed to create subscription');
          return;
        }

        // TODO: replace with real logged-in userId
        const userId = '692873ae8035e9862e99c1c8';

        // Serialize subscription to JSON format
        const subscriptionJson = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))),
            auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth'))))
          }
        };

        await axiosServices.post(`${process.env.REACT_APP_API_URL}api/v1/subscribe`, {
          subscription: subscriptionJson,
          userId
        });
        console.log('Subscription sent to server successfully');
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    })();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeCustomization>
        {/* <RTLLayout> */}
        <Locales>
          <ScrollTop>
            <AuthProvider>
              <>
                <Routes />
                <Notistack>
                  <Snackbar />
                </Notistack>
              </>
            </AuthProvider>
          </ScrollTop>
        </Locales>
        {/* </RTLLayout> */}
      </ThemeCustomization>
    </QueryClientProvider>
  );
};

export default App;
