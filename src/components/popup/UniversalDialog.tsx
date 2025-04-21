import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { forwardRef } from 'react';
import { TUniversalDialogPropsWActions } from 'types/types.UniversalDialog';

// Transition component for the dialog
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// UniversalDialog component
const UniversalDialog = (props: TUniversalDialogPropsWActions) => {
  const { hasPrimaryButton = true, hasSecondaryButton = false, disablePrimaryButton = false, disableSecondaryButton = false } = props;

  // Handler to close the dialog
  const handleClose = () => {
    props?.onClose();
  };

  // Handler for primary button click
  const handlePrimaryClick = () => {
    props?.onSave && props?.onSave();
  };

  return (
    <Dialog {...props.action} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div className="w-full flex items-center">
            {props?.title ? (
              <>
                {typeof props?.title === 'string' ? (
                  // Display the title if it's a string
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                    {props?.title}
                  </Typography>
                ) : (
                  // Display the title if it's a React element
                  props?.title
                )}
              </>
            ) : (
              <></>
            )}
          </div>

          {/* Icon button to close the dialog */}
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseCircleFilled />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Dialog content */}
      <DialogContent className={`py-4 ${hasSecondaryButton || (hasPrimaryButton && 'pb-12 ')}`}>{props.children}</DialogContent>

      {/* Dialog actions */}
      {(hasSecondaryButton || hasPrimaryButton) && (
        <DialogActions>
          {hasSecondaryButton && (
            <Button color="secondary" variant="text" onClick={() => props?.handleSecondaryClick?.()} disabled={disableSecondaryButton}>
              {props?.secondaryButonTitle || 'Cancel'}
            </Button>
          )}
          {hasPrimaryButton && (
            <Button
              onClick={handlePrimaryClick}
              startIcon={props?.isPrimaryButtonLoading && <LoadingOutlined />}
              variant="shadow"
              size="large"
              className="py-2 px-7"
              disabled={disablePrimaryButton}
              type="button"
            >
              {props?.primaryButonTitle || 'Save'}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default UniversalDialog;
