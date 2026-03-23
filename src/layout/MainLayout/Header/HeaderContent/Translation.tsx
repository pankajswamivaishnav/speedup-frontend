import { Box, ClickAwayListener, MenuItem, Paper, Popper } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from 'components/@extended/IconButton';
import { TranslationOutlined } from '@ant-design/icons';
import { ThemeMode } from 'types/config';

const Translation = () => {
  const theme = useTheme();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  // Initialize selected language from cookie on mount
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const googtrans = getCookie('googtrans');
    if (googtrans) {
      if (googtrans.includes('/hi')) {
        setSelectedLang('Hindi');
      } else {
        setSelectedLang('English');
      }
    }
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) return;
    setOpen(false);
  };

  // Helper function to find Google Translate select element
  const findTranslateSelect = (): HTMLSelectElement | null => {
    // Try multiple selectors to find the Google Translate select element
    const selectors = ['.goog-te-combo', 'select.goog-te-combo', '#\\:0\\.select'];

    let select: HTMLSelectElement | null = null;
    for (const selector of selectors) {
      select = document.querySelector(selector) as HTMLSelectElement | null;
      if (select) return select;
    }

    // Also try to find in iframes (Google Translate often uses iframes)
    try {
      const frames = document.querySelectorAll('iframe');
      for (const frame of Array.from(frames)) {
        try {
          if (frame.contentDocument) {
            select = frame.contentDocument.querySelector('.goog-te-combo') as HTMLSelectElement | null;
            if (select) return select;
          }
        } catch (e) {
          // Cross-origin restrictions - try accessing via contentWindow
          try {
            if (frame.contentWindow) {
              select = (frame.contentWindow as any).document?.querySelector('.goog-te-combo') as HTMLSelectElement | null;
              if (select) return select;
            }
          } catch (e2) {
            // Ignore
          }
        }
      }
    } catch (e) {
      // Ignore errors
    }

    return null;
  };

  // Helper function to trigger translation on select element
  const triggerTranslation = (select: HTMLSelectElement, langCode: string) => {
    if (select.value !== langCode) {
      select.value = langCode;

      // Try multiple event types to ensure it triggers
      const changeEvent = new Event('change', { bubbles: true, cancelable: true });
      select.dispatchEvent(changeEvent);

      // Also try input event
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      select.dispatchEvent(inputEvent);

      // Try triggering via native methods
      if ('createEvent' in document) {
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('change', false, true);
        select.dispatchEvent(evt);
      }
    }

    // Hide banner after translation
    setTimeout(() => {
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) {
        (banner as HTMLElement).style.display = 'none';
        (banner as HTMLElement).style.visibility = 'hidden';
        (banner as HTMLElement).style.height = '0';
      }
      const skipTranslate = document.querySelector('.skiptranslate');
      if (skipTranslate) {
        (skipTranslate as HTMLElement).style.display = 'none';
      }
      document.body.style.top = '0';
    }, 50);
  };

  // ✅ Fast function to trigger Google Translate language change
  const translateTo = (langCode: string) => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Set cookie for Google Translate (fallback method)
    const setCookie = (name: string, value: string, days: number) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    // Set the Google Translate cookie immediately
    const cookieValue = langCode === 'en' ? '/en/en' : `/en/${langCode}`;
    setCookie('googtrans', cookieValue, 365);

    // Try to find and trigger immediately (fast path)
    const select = findTranslateSelect();
    if (select) {
      triggerTranslation(select, langCode);
      return; // Success! Exit early - instant translation
    }

    // Use requestAnimationFrame for ultra-fast initial checks (runs at 60fps = ~16ms)
    let rafAttempts = 0;
    const maxRafAttempts = 10; // ~160ms of ultra-fast checking

    const checkWithRAF = () => {
      rafAttempts++;
      const foundSelect = findTranslateSelect();

      if (foundSelect) {
        triggerTranslation(foundSelect, langCode);
        return; // Success!
      }

      if (rafAttempts < maxRafAttempts) {
        requestAnimationFrame(checkWithRAF);
      } else {
        // Fallback to interval polling if RAF didn't find it
        let attempts = 0;
        const maxAttempts = 30; // 1.5 seconds max wait time (30 * 50ms)

        intervalRef.current = setInterval(() => {
          attempts++;
          const foundSelect = findTranslateSelect();

          if (foundSelect) {
            triggerTranslation(foundSelect, langCode);
            // Clear interval on success
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          } else if (attempts >= maxAttempts) {
            // If select not found after max attempts, reload page to apply cookie-based translation
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            // Reload to apply cookie-based translation (only as last resort)
            window.location.reload();
          }
        }, 50); // Fast polling: 50ms intervals
      }
    };

    // Start with ultra-fast RAF checking
    requestAnimationFrame(checkWithRAF);
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    setOpen(false);

    if (lang === 'Hindi') {
      translateTo('hi');
    } else if (lang === 'English') {
      translateTo('en');
    }
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ flexShrink: 0, ml: 0.75, position: 'relative' }}>
        <IconButton
          color="secondary"
          variant="light"
          sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
          aria-label="open translation menu"
          ref={anchorRef}
          aria-controls={open ? 'translation-menu' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <TranslationOutlined />
        </IconButton>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
          style={{ zIndex: 1200 }}
        >
          <Paper
            elevation={3}
            sx={{
              mt: 1,
              minWidth: 160,
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: theme.palette.background.paper
            }}
          >
            <MenuItem selected={selectedLang === 'English'} onClick={() => handleLanguageSelect('English')}>
              English
            </MenuItem>
            <MenuItem selected={selectedLang === 'Hindi'} onClick={() => handleLanguageSelect('Hindi')}>
              हिंदी (Hindi)
            </MenuItem>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default Translation;
