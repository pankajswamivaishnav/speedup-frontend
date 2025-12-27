// material-ui
import { Theme } from '@mui/material/styles';
import {
  useMediaQuery,
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography,
  ListItemText
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { AimOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';

const avatarImage = 'https://avatar.iran.liara.run/public/13';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const Profile = () => {
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [profileData, setProfileData] = useState<any>();
  const profile = useAuth();

  useEffect(() => {
    if (profile.isLoggedIn === true) {
      setProfileData(profile.user);
    }
  }, [profile]);

  // ------------- Render Profile According to Role -------------
  const renderProfileByRole = () => {
    if (!profileData) return null;
    switch (profileData?.role) {
      case 'transporter': {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5} md={4} xl={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          <Chip label="Pro" size="small" color="primary" />
                        </Stack>
                        <Stack spacing={2.5} alignItems="center">
                          <Avatar alt="Avatar 1" size="xl" src={profileData?.avatar?.url || avatarImage} />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">{profileData?.transportName}</Typography>
                            <Typography color="secondary">{`${profileData?.first_name} ${profileData?.last_name}`}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-around" alignItems="center">
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">86</Typography>
                            <Typography color="secondary">Post</Typography>
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">40</Typography>
                            <Typography color="secondary">Project</Typography>
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">4.5K</Typography>
                            <Typography color="secondary">Members</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                          <ListItem>
                            <ListItemIcon>
                              <MailOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.email}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PhoneOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.mobileNumber}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <AimOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.country}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <EnvironmentOutlined />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Link href="http://pankajswamivaishnav.vercel.app/" target="_blank" className="break-words">
                                  http://pankajswamivaishnav.vercel.app/
                                </Link>
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Skills">
                    <Grid container spacing={1.25}>
                      <Grid item xs={6}>
                        <Typography color="secondary">Junior</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={30} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">UX Reseacher</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={80} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Wordpress</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={90} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">HTML</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={30} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Graphic Design</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={95} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Code Style</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={75} />
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={7} md={8} xl={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard title="About me">
                    <Typography color="secondary">
                      Hello, I’m{' '}
                      <strong className="text-black">
                        {profileData?.first_name} {profileData?.last_name}
                      </strong>{' '}
                      and <strong className="text-black">{profileData?.transportName}</strong> is one of the oldest and most trusted names
                      in the Indian transport industry. As a professional transport broker, we connect businesses with reliable trucks and
                      carriers across India.
                      <br />
                      From vegetables and household items to industrial and government goods, we ensure safe, timely, and cost-effective
                      delivery. With decades of experience and a strong network, our focus remains on transparency, reliability, and
                      building trust with every client.
                    </Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Personal Details">
                    <List sx={{ py: 0 }}>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Full Name</Typography>
                              <Typography>{`${profileData?.first_name} ${profileData?.last_name}`}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Email</Typography>
                              <Typography>{profileData?.email}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Phone</Typography>
                              <Typography>
                                (+91) <PatternFormat value={profileData?.mobileNumber} displayType="text" type="text" format="##########" />
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Office Number</Typography>
                              <Typography>
                                (+91) <PatternFormat value={profileData?.officeNumber} displayType="text" type="text" format="##########" />
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Registration Number</Typography>
                            <Typography>{profileData?.registrationNumber}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">G.S.T Number</Typography>
                            <Typography>{profileData?.gstNumber}</Typography>
                          </Stack>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Faith Line</Typography>
                              <Typography>{profileData?.faithLine}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Zip Code</Typography>
                              <Typography>{profileData?.pinCode}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Address</Typography>
                          <Typography>{profileData?.transportAddress}</Typography>
                        </Stack>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Education">
                    <List sx={{ py: 0 }}>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Master Degree (Year)</Typography>
                              <Typography>2014-2017</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>-</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Bachelor (Year)</Typography>
                              <Typography>2011-2013</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>Imperial College London</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">School (Year)</Typography>
                              <Typography>2009-2011</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>School of London, England</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Emplyment">
                    <List sx={{ py: 0 }}>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Senior UI/UX designer (Year)</Typography>
                              <Typography>2019-Current</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Job Responsibility</Typography>
                              <Typography>
                                Perform task related to project manager with the 100+ team under my observation. Team management is key role
                                in this company.
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Trainee cum Project Manager (Year)</Typography>
                              <Typography>2017-2019</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Job Responsibility</Typography>
                              <Typography>Team management is key role in this company.</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }
      case 'driver': {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5} md={4} xl={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          <Chip label="Pro" size="small" color="primary" />
                        </Stack>
                        <Stack spacing={2.5} alignItems="center">
                          <Avatar alt="Avatar 1" size="xl" src={profileData?.avatar?.url || avatarImage} />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">{profileData?.transportName}</Typography>
                            <Typography color="secondary">{`${profileData?.first_name} ${profileData?.last_name}`}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-around" alignItems="center">
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">86</Typography>
                            <Typography color="secondary">Post</Typography>
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">40</Typography>
                            <Typography color="secondary">Project</Typography>
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">4.5K</Typography>
                            <Typography color="secondary">Members</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                          <ListItem>
                            <ListItemIcon>
                              <MailOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.email}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PhoneOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.mobileNumber}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <AimOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.country}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <EnvironmentOutlined />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Link href="http://pankajswamivaishnav.vercel.app/" target="_blank" className="break-words">
                                  http://pankajswamivaishnav.vercel.app/
                                </Link>
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Skills">
                    <Grid container spacing={1.25}>
                      <Grid item xs={6}>
                        <Typography color="secondary">Junior</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={30} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">UX Reseacher</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={80} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Wordpress</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={90} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">HTML</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={30} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Graphic Design</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={95} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Code Style</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={75} />
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={7} md={8} xl={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard title="About me">
                    <Typography color="secondary">
                      Hello, I’m{' '}
                      <strong className="text-black">
                        {profileData?.first_name} {profileData?.last_name}
                      </strong>{' '}
                      and I work as a professional driver in the Indian transport industry. With years of road experience, I ensure safe,
                      reliable, and on-time delivery of goods across different states.
                      <br />
                      Whether it’s vegetables, household items, industrial materials, or long-route loads, I take complete responsibility
                      for handling goods with care and professionalism. My focus is always on safety, punctuality, and maintaining strong
                      trust with transporters, vendors, and clients.
                    </Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Personal Details">
                    <List sx={{ py: 0 }}>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Full Name</Typography>
                              <Typography>{`${profileData?.first_name} ${profileData?.last_name}`}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Email</Typography>
                              <Typography>{profileData?.email}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Phone</Typography>
                              <Typography>
                                (+91) <PatternFormat value={profileData?.mobileNumber} displayType="text" type="text" format="##########" />
                              </Typography>
                            </Stack>
                          </Grid>
                          {/* <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Office Number</Typography>
                              <Typography>
                                (+91) <PatternFormat value={profileData?.officeNumber} displayType="text" type="text" format="##########" />
                              </Typography>
                            </Stack>
                          </Grid> */}
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Zip Code</Typography>
                              <Typography>{profileData?.pinCode}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Address</Typography>
                          <Typography>{profileData?.transportAddress}</Typography>
                        </Stack>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Emplyment">
                    <List sx={{ py: 0 }}>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Senior UI/UX designer (Year)</Typography>
                              <Typography>2019-Current</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Job Responsibility</Typography>
                              <Typography>
                                Perform task related to project manager with the 100+ team under my observation. Team management is key role
                                in this company.
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Trainee cum Project Manager (Year)</Typography>
                              <Typography>2017-2019</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Job Responsibility</Typography>
                              <Typography>Team management is key role in this company.</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }
      case 'vendor': {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5} md={4} xl={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          <Chip label="Pro" size="small" color="primary" />
                        </Stack>
                        <Stack spacing={2.5} alignItems="center">
                          <Avatar
                            className="object-top"
                            alt={profileData?.first_name}
                            size="xl"
                            src={profileData.avatar.url || avatarImage}
                          />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">{profileData?.transportName}</Typography>
                            <Typography color="secondary">{`${profileData?.first_name} ${profileData?.last_name}`}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-around" alignItems="center">
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">86</Typography>
                            <Typography color="secondary">Post</Typography>
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">40</Typography>
                            <Typography color="secondary">Project</Typography>
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">4.5K</Typography>
                            <Typography color="secondary">Members</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                          <ListItem>
                            <ListItemIcon>
                              <MailOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.email}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PhoneOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.mobileNumber}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <AimOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.country}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <EnvironmentOutlined />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Link href="http://pankajswamivaishnav.vercel.app/" target="_blank" className="break-words">
                                  http://pankajswamivaishnav.vercel.app/
                                </Link>
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Skills">
                    <Grid container spacing={1.25}>
                      <Grid item xs={6}>
                        <Typography color="secondary">Junior</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={30} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">UX Reseacher</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={80} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Wordpress</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={90} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">HTML</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={30} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Graphic Design</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={95} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Code Style</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={75} />
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={7} md={8} xl={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard title="About me">
                    <Typography color="secondary">
                      Hello, I’m{' '}
                      <strong className="text-black">
                        {profileData?.first_name} {profileData?.last_name}
                      </strong>{' '}
                      and <strong className="text-black">{profileData?.transportName}</strong> is one of the oldest and most trusted names
                      in the Indian transport industry. As a professional transport broker, we connect businesses with reliable trucks and
                      carriers across India.
                      <br />
                      From vegetables and household items to industrial and government goods, we ensure safe, timely, and cost-effective
                      delivery. With decades of experience and a strong network, our focus remains on transparency, reliability, and
                      building trust with every client.
                    </Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Personal Details">
                    <List sx={{ py: 0 }}>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Full Name</Typography>
                              <Typography>{`${profileData?.first_name} ${profileData?.last_name}`}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Email</Typography>
                              <Typography>{profileData?.email}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Phone</Typography>
                              <Typography>
                                (+91) <PatternFormat value={profileData?.mobileNumber} displayType="text" type="text" format="##########" />
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Office Number</Typography>
                              <Typography>
                                (+91) <PatternFormat value={profileData?.officeNumber} displayType="text" type="text" format="##########" />
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Registration Number</Typography>
                            <Typography>{profileData?.registrationNumber}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">G.S.T Number</Typography>
                            <Typography>{profileData?.gstNumber}</Typography>
                          </Stack>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Faith Line</Typography>
                              <Typography>{profileData?.faithLine}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Zip Code</Typography>
                              <Typography>{profileData?.pinCode}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Address</Typography>
                          <Typography>{profileData?.transportAddress}</Typography>
                        </Stack>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Education">
                    <List sx={{ py: 0 }}>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Master Degree (Year)</Typography>
                              <Typography>2014-2017</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>-</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Bachelor (Year)</Typography>
                              <Typography>2011-2013</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>Imperial College London</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">School (Year)</Typography>
                              <Typography>2009-2011</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>School of London, England</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Emplyment">
                    <List sx={{ py: 0 }}>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Senior UI/UX designer (Year)</Typography>
                              <Typography>2019-Current</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Job Responsibility</Typography>
                              <Typography>
                                Perform task related to project manager with the 100+ team under my observation. Team management is key role
                                in this company.
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Trainee cum Project Manager (Year)</Typography>
                              <Typography>2017-2019</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Job Responsibility</Typography>
                              <Typography>Team management is key role in this company.</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }
      default: {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5} md={4} xl={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          <Chip label="Pro" size="small" color="primary" />
                        </Stack>
                        <Stack spacing={2.5} alignItems="center">
                          <Avatar
                            alt={`${profileData?.first_name} ${profileData?.last_name}`}
                            size="xl"
                            src={profileData?.avatar?.url || avatarImage}
                            sx={{
                              '& img': {
                                objectFit: 'cover',
                                objectPosition: 'center top'
                              }
                            }}
                          />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">{profileData?.transportName}</Typography>
                            <Typography color="secondary">{`${profileData?.first_name} ${profileData?.last_name}`}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-around" alignItems="center">
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">86</Typography>
                            <Typography color="secondary">Post</Typography>
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">40</Typography>
                            <Typography color="secondary">Project</Typography>
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">4.5K</Typography>
                            <Typography color="secondary">Members</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                          <ListItem>
                            <ListItemIcon>
                              <MailOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.email}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PhoneOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.mobileNumber}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <AimOutlined />
                            </ListItemIcon>
                            <ListItemSecondaryAction>
                              <Typography align="right">{profileData?.country}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <EnvironmentOutlined />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Link href="http://pankajswamivaishnav.vercel.app/" target="_blank" className="break-words">
                                  http://pankajswamivaishnav.vercel.app/
                                </Link>
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Skills">
                    <Grid container spacing={1.25}>
                      <Grid item xs={6}>
                        <Typography color="secondary">Junior</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={30} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">UX Reseacher</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={80} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Wordpress</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={90} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">HTML</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={30} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Graphic Design</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={95} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="secondary">Code Style</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <LinearWithLabel value={75} />
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={7} md={8} xl={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard title="About me">
                    <Typography color="secondary">
                      Hello, I’m{' '}
                      <strong className="text-black">
                        {profileData?.first_name} {profileData?.last_name}
                      </strong>{' '}
                      and <strong className="text-black">{profileData?.transportName}</strong> is one of the oldest and most trusted names
                      in the Indian transport industry. As a professional transport broker, we connect businesses with reliable trucks and
                      carriers across India.
                      <br />
                      From vegetables and household items to industrial and government goods, we ensure safe, timely, and cost-effective
                      delivery. With decades of experience and a strong network, our focus remains on transparency, reliability, and
                      building trust with every client.
                    </Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Personal Details">
                    <List sx={{ py: 0 }}>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Full Name</Typography>
                              <Typography>{`${profileData?.first_name} ${profileData?.last_name}`}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Email</Typography>
                              <Typography>{profileData?.email}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Phone</Typography>
                              <Typography>
                                (+91) <PatternFormat value={profileData?.mobileNumber} displayType="text" type="text" format="##########" />
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Office Number</Typography>
                              <Typography>
                                (+91) <PatternFormat value={profileData?.officeNumber} displayType="text" type="text" format="##########" />
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Registration Number</Typography>
                            <Typography>{profileData?.registrationNumber}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">G.S.T Number</Typography>
                            <Typography>{profileData?.gstNumber}</Typography>
                          </Stack>
                        </Grid>
                      </ListItem>
                      <ListItem divider={!matchDownMD}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Faith Line</Typography>
                              <Typography>{profileData?.faithLine}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Zip Code</Typography>
                              <Typography>{profileData?.pinCode}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Address</Typography>
                          <Typography>{profileData?.transportAddress}</Typography>
                        </Stack>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Education">
                    <List sx={{ py: 0 }}>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Master Degree (Year)</Typography>
                              <Typography>2014-2017</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>-</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Bachelor (Year)</Typography>
                              <Typography>2011-2013</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>Imperial College London</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">School (Year)</Typography>
                              <Typography>2009-2011</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Institute</Typography>
                              <Typography>School of London, England</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
                <Grid item xs={12}>
                  <MainCard title="Emplyment">
                    <List sx={{ py: 0 }}>
                      <ListItem divider>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Senior UI/UX designer (Year)</Typography>
                              <Typography>2019-Current</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Job Responsibility</Typography>
                              <Typography>
                                Perform task related to project manager with the 100+ team under my observation. Team management is key role
                                in this company.
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container spacing={matchDownMD ? 0.5 : 3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Trainee cum Project Manager (Year)</Typography>
                              <Typography>2017-2019</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={0.5}>
                              <Typography color="secondary">Job Responsibility</Typography>
                              <Typography>Team management is key role in this company.</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }
    }
  };

  // ------------- Main Profile JSX ---------------
  return <>{renderProfileByRole()}</>;
};

export default Profile;
