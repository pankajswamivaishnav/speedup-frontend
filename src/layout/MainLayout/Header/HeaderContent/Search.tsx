import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  FormControl,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Paper,
  Typography
} from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import axiosServices from 'utils/axios';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //
type SearchProps = {
  setQuery?: (value: string) => void;
  universalSearch?: boolean;
};

type UniversalSearchItem = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  transportName?: string;
  vendorName?: string;
  driverName?: string;
  mobileNumber?: string;
  vendorPhoneNumber?: string;
  driverPhoneNumber?: string;
  phoneNumber?: string;
};

type UniversalSearchResponse = {
  data?: Record<string, UniversalSearchItem[]>;
};

type ModuleConfig = {
  key: string;
  title: string;
  route: string;
};

const MODULE_CONFIGS: ModuleConfig[] = [
  { key: 'transporters', title: 'Transporters', route: '/transporters' },
  { key: 'vendors', title: 'Vendors', route: '/vendors' },
  { key: 'drivers', title: 'Drivers', route: '/drivers' },
  { key: 'managedTransporters', title: 'Managed Transporters', route: '/managed-transporters' },
  { key: 'managedVendors', title: 'Managed Vendors', route: '/managed-vendors' },
  { key: 'managedDrivers', title: 'Managed Drivers', route: '/managed-drivers' },
  { key: 'loads', title: 'Loads', route: '/loads' },
  { key: 'bilties', title: 'Bilties', route: '/bilties' },
  { key: 'plans', title: 'Subscription Plans', route: '/subscription' }
];

const getPrimaryText = (item: UniversalSearchItem) => {
  const fullName = `${item.first_name || ''} ${item.last_name || ''}`.trim();
  return item.transportName || item.vendorName || item.driverName || fullName || 'Unnamed';
};

const getSecondaryText = (item: UniversalSearchItem) =>
  item.mobileNumber || item.vendorPhoneNumber || item.driverPhoneNumber || item.phoneNumber || '';

const Search = ({ setQuery, universalSearch = false }: SearchProps) => {
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<Record<string, UniversalSearchItem[]>>({});

  const trimmedQuery = localQuery.trim();
  const showDropdown = universalSearch && open && !!trimmedQuery;

  useEffect(() => {
    if (!universalSearch || !trimmedQuery) {
      setSearchData({});
      setLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axiosServices.get<UniversalSearchResponse>(`api/v1/search?search=${encodeURIComponent(trimmedQuery)}`);
        setSearchData(response?.data?.data || {});
      } catch (error) {
        setSearchData({});
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [trimmedQuery, universalSearch]);

  const groupedResults = useMemo(
    () =>
      MODULE_CONFIGS.map((module) => ({
        ...module,
        items: searchData[module.key] || []
      })).filter((module) => module.items.length > 0),
    [searchData]
  );

  const hasResults = groupedResults.length > 0;

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ width: '100%', ml: { xs: 0, md: 1 }, position: 'relative' }}>
        <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
          <OutlinedInput
            size="small"
            id="header-search"
            value={localQuery}
            startAdornment={
              <InputAdornment position="start" sx={{ mr: -0.5 }}>
                <SearchOutlined />
              </InputAdornment>
            }
            endAdornment={loading ? <CircularProgress size={16} /> : null}
            aria-describedby="header-search-text"
            inputProps={{
              'aria-label': 'search'
            }}
            placeholder="Search..."
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              const value = e.target.value;
              setLocalQuery(value);
              if (setQuery) {
                setQuery(value);
              }
              if (universalSearch && !open) {
                setOpen(true);
              }
            }}
          />
        </FormControl>

        {showDropdown && (
          <Paper
            elevation={8}
            sx={{
              mt: 1,
              maxHeight: 380,
              overflowY: 'auto',
              width: { xs: '100%', md: 320 },
              position: 'absolute',
              zIndex: 1200
            }}
          >
            {hasResults ? (
              groupedResults.map((group) => (
                <Box key={group.key}>
                  <Typography sx={{ px: 1.5, pt: 1, pb: 0.5, fontSize: 12, fontWeight: 700, color: 'text.secondary' }}>
                    {group.title}
                  </Typography>
                  <List dense disablePadding>
                    {group.items.map((item, index) => (
                      <ListItemButton
                        key={`${group.key}-${item._id || index}`}
                        onClick={() => {
                          navigate(group.route);
                          setOpen(false);
                        }}
                      >
                        <ListItemText primary={getPrimaryText(item)} secondary={getSecondaryText(item)} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              ))
            ) : (
              <Typography sx={{ px: 2, py: 1.5, color: 'text.secondary', fontSize: 13 }}>No results found</Typography>
            )}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default Search;
