import { DialogProps, SxProps, Theme } from '@mui/material';

export type TUniversalDialogProps = {
  action: {
    open: boolean;
    maxWidth?: DialogProps['maxWidth'];
    fullScreen?: boolean;
    fullWidth?: boolean;
  };
  title?: string | React.ReactElement;
  hasSecondaryButton?: boolean;
  secondaryButonTitle?: string;
  hasPrimaryButton?: boolean;
  primaryButonTitle?: string;
  data?: any | null;
  children?: React.ReactElement;
  disablePrimaryButton?: boolean;
  isPrimaryButtonLoading?: boolean;
  disableSecondaryButton?: boolean;
  sx?: SxProps<Theme>;
};

export type TUniversalDialogPropsWActions = TUniversalDialogProps & {
  onClose: () => void;
  onSave?: (arg0?: string, arg1?: string) => void;
  handleSecondaryClick?: () => void;
};
