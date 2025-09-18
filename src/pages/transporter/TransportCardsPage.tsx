import MainCard from 'components/MainCard';
import { VisitingCardProps } from 'components/cards/VisitingCard';
import VisitingCardGrid from 'components/cards/VisitingCardGrid';

const TransportCardsPage = () => {
  // Sample data for demonstration
  const sampleCards: VisitingCardProps[] = [
    {
      name: 'Sarah Johnson',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: 'San Francisco, CA',
      website: 'sarah-dev.com',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face',
      department: 'Engineering',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL']
    },
    {
      name: 'Michael Chen',
      jobTitle: 'Product Manager',
      company: 'Innovation Labs',
      email: 'm.chen@innovationlabs.io',
      phone: '+1 (555) 987-6543',
      address: 'New York, NY',
      website: 'michaelchen.dev',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      department: 'Product',
      skills: ['Strategy', 'Analytics', 'Agile', 'UX Research']
    },
    {
      name: 'Emily Rodriguez',
      jobTitle: 'UX/UI Designer',
      company: 'Creative Studio',
      email: 'emily@creativestudio.design',
      phone: '+1 (555) 456-7890',
      address: 'Austin, TX',
      website: 'emilydesigns.com',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      department: 'Design',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    },
    {
      name: 'David Kim',
      jobTitle: 'DevOps Engineer',
      company: 'CloudTech Inc',
      email: 'david.kim@cloudtech.com',
      phone: '+1 (555) 234-5678',
      address: 'Seattle, WA',
      website: 'davidkim.tech',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      department: 'Infrastructure',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform']
    },
    {
      name: 'Lisa Thompson',
      jobTitle: 'Data Scientist',
      company: 'Analytics Pro',
      email: 'lisa.thompson@analyticspro.com',
      phone: '+1 (555) 345-6789',
      address: 'Boston, MA',
      website: 'lisadata.com',
      imageUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
      department: 'Data Science',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow']
    },
    {
      name: 'James Wilson',
      jobTitle: 'Full Stack Developer',
      company: 'WebSolutions LLC',
      email: 'james@websolutions.com',
      phone: '+1 (555) 567-8901',
      address: 'Denver, CO',
      website: 'jameswilson.dev',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      department: 'Development',
      skills: ['JavaScript', 'React', 'Python', 'MongoDB', 'Express']
    }
  ];
  return (
    <>
      <MainCard border={false} boxShadow sx={{ height: '100%' }}>
        <VisitingCardGrid cards={sampleCards} title="Our Speed Up Transporters" />
      </MainCard>
    </>
  );
};

export default TransportCardsPage;
