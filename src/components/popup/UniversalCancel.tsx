// material-ui
import { Button, Dialog, DialogContent, Grid, Stack, TextField, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { PlusCircleOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';

// types
interface Props {
  open: boolean;
  handleClose: (status: boolean) => void;
  handleCancel: (id: string, notes: string) => void;
  id: string;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function UniversalCancel({ id, open, handleClose, handleCancel }: Props) {
  const [cancelNotes, setCancelNotes] = useState<string>('');
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)} // Close dialog on close
      TransitionComponent={PopupTransition} // Use custom transition
      keepMounted
      maxWidth="xs"
      aria-labelledby="item-delete-title"
      aria-describedby="item-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          {/* Avatar with delete icon */}
          <Avatar color="primary" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <PlusCircleOutlined rotate={45} />
          </Avatar>
          <Stack spacing={2}>
            {/* Confirmation message */}
            <Typography variant="h4" align="center">
              <FormattedMessage id="Are you sure you want to Cancel?" />
            </Typography>
            <Grid container item xs={12}>
              <TextField
                type="text"
                label={<FormattedMessage id="Cancellation Reason (Optional)" />}
                value={cancelNotes}
                onChange={(e) => setCancelNotes(e.target.value)}
                size="small"
                name="first_name"
                fullWidth
              />
            </Grid>
          </Stack>

          {/* Action buttons */}
          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
              <FormattedMessage id="Cancel" />
            </Button>
            <Button fullWidth color="primary" variant="contained" onClick={() => handleCancel(id, cancelNotes)} autoFocus>
              <FormattedMessage id="Cancel Now" />
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
