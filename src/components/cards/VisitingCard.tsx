import React from 'react';
import { Card, Avatar } from '@mui/material';
import { Mail, Phone, MapPin, Globe, Briefcase, Building } from 'lucide-react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
export interface VisitingCardProps {
  name: string;
  jobTitle?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  imageUrl?: string;
  department?: string;
  linkedin?: string;
  skills?: string[];
}

const VisitingCard: React.FC<VisitingCardProps> = ({
  name,
  jobTitle,
  company,
  email,
  phone,
  address,
  website,
  imageUrl,
  department,
  skills = []
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
            src={imageUrl}
            alt={name}
            sx={{
              width: 80,
              height: 80,
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              bgcolor: 'hsl(var(--primary))',
              fontSize: '2rem',
              fontWeight: 600,
              backgroundColor: theme.palette.primary.main
            }}
          >
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </Avatar>

          <div className="flex-1 pt-1">
            <h3 className="text-xl font-bold text-white mb-1 leading-tight">{name}</h3>
            {jobTitle && <p className="text-white/90 text-sm font-medium mb-1">{jobTitle}</p>}
            {company && (
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <Building size={14} />
                <span>{company}</span>
              </div>
            )}
          </div>
        </Box>

        {/* Contact Information */}
        <div className="space-y-3 flex-1">
          {email && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Mail size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium truncate">{email}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Phone size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium">{phone}</span>
            </div>
          )}

          {address && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <MapPin size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium truncate">{address}</span>
            </div>
          )}

          {website && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Globe size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium truncate">{website}</span>
            </div>
          )}

          {department && (
            <div className="flex items-center gap-3 text-text-body">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Briefcase size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium">{department}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VisitingCard;
