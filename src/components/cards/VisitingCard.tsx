import React from 'react';
import { Card, Avatar } from '@mui/material';
import { Mail, Phone, MapPin, Building2, Building, Truck } from 'lucide-react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
export interface VisitingCardProps {
  first_name?: string;
  last_name?: string;
  mobileNumber?: string;
  officeNumber?: string;
  address?: string;
  role?: string;
  city?: string;
  avatar?: { public_id: string; url: string };
  truckNumber?: string;
  business?: string;
  transportName?: string;
  email?: string;
}

const VisitingCard: React.FC<VisitingCardProps> = ({
  first_name,
  last_name,
  mobileNumber,
  officeNumber,
  truckNumber,
  business,
  role,
  city,
  transportName,
  avatar,
  email,
  address
}) => {
  const theme = useTheme();
  return (
    <Card
      className="group relative overflow-hidden bg-card border-0 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
      sx={{
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        height: '350px',
        background: 'hsl(var(--card))',
        '&:hover': {
          transform: 'translateY(-4px)'
        },
        cursor: 'pointer'
      }}
    >
      {/* Professional gradient header */}
      <Box
        className="absolute top-0 left-0 right-0 h-20 bg-gradient-professional opacity-90"
        sx={{ backgroundColor: theme.palette.primary.main }}
      />

      <div className="relative z-10 flex flex-col h-fulls">
        {/* Profile Section */}
        <Box className={`flex items-start gap-4 mb-4`}>
          <Avatar
            src={avatar?.url || 'https://avatar.iran.liara.run/public/boy'}
            alt={`${first_name} ${last_name}`}
            sx={{
              width: 80,
              height: 80,
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              bgcolor: 'hsl(var(--primary))',
              fontSize: '2rem',
              fontWeight: 600,
              backgroundColor: theme.palette.primary.main,
              '& img': {
                objectFit: 'cover', // keep full cover
                objectPosition: 'center top' // move image slightly down (face shows better)
              }
            }}
          >
            {(first_name ?? '')
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </Avatar>

          <div className="flex-1 pt-1">
            <h3 className="text-xl font-bold text-white mb-1 leading-tight">{`${first_name} ${last_name}`}</h3>
            {(business || role || transportName) && (
              <div className="flex items-center gap-1 text-white/80 text-sm">
                {transportName || business ? (
                  <Building size={14} className="text-white/80" />
                ) : (
                  <Truck size={14} className="text-white/80" />
                )}
                <span className="text-white/80">{business?.toUpperCase() || role?.toUpperCase() || transportName?.toUpperCase()}</span>
              </div>
            )}
          </div>
        </Box>

        {/* Contact Information */}
        <div className="space-y-3 flex-1">
          {email && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Mail size={16} color={theme.palette.primary.main} />
              </div>
              <span className="text-sm font-medium truncate">{email}</span>
            </div>
          )}

          {mobileNumber && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Phone size={16} color={theme.palette.primary.main} />
              </div>
              <span className="text-sm font-medium">{mobileNumber}</span>
            </div>
          )}

          {officeNumber && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Phone size={16} color={theme.palette.primary.main} />
              </div>
              <span className="text-sm font-medium">{officeNumber}</span>
            </div>
          )}

          {truckNumber && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Truck size={16} color={theme.palette.primary.main} />
              </div>
              <span className="text-sm font-medium truncate">{truckNumber}</span>
            </div>
          )}

          {address && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <MapPin size={16} color={theme.palette.primary.main} />
              </div>
              <span className="text-sm font-medium truncate">{address}</span>
            </div>
          )}

          {city && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Building2 size={16} color={theme.palette.primary.main} />
              </div>
              <span className="text-sm font-medium">{city}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VisitingCard;
