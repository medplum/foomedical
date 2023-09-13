import {
  Burger,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Menu,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ResourceAvatar, useMedplumProfile } from '@medplum/react';
import { IconChevronDown, IconLogout, IconSettings, IconUserCircle } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { SmarterFhirContext } from '../App';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoButton: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background as string,
        0.95
      ),
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  integrationLink: {
    display: 'flex',
    gap: "0.5rem",
    alignItems: "center",
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  integrationText: {
    display: 'block',
    lineHeight: 1,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,
  },

  linkLabel: {
    marginRight: 5,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

const navigation = [
  { name: 'Health Record', href: '/health-record' },
  { name: 'Messages', href: '/messages' },
  { name: 'Care Plan', href: '/care-plan' },
  { name: 'Get Care', href: '/get-care' },
];

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const profile = useMedplumProfile();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { client, setClient } = useContext(SmarterFhirContext);

  return (
    <MantineHeader height={80} mb={120} fixed={true}>
      <Container>
        <div className={classes.inner}>
          <UnstyledButton className={classes.logoButton} onClick={() => navigate('/')}>
            <Logo width={240} />
          </UnstyledButton>
          <Link to={'/integrations'} className={classes.integrationLink}>
            <div style={{ position: "relative", height: "1rem", width: "1rem" }}>
              <span style={{ height: "1rem", width: "1rem", backgroundColor: client !== null ? "#cbe6de" : "rgb(255, 235, 235)", borderRadius: "50%", position: "absolute" }}></span>
              {client !== null
                ? <svg style={{ position: "absolute", margin: "0.05rem", fill: "#099268", height: "0.9rem", width: "0.9rem"  }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"/>
                </svg>
                : <svg style={{ position: "absolute", margin: "0.175rem", fill: "#f79999" }} height="0.65rem" width="0.65rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 460.775 460.775" xmlSpace="preserve">
                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
                  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
                  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
                  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
                  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
                  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
              </svg>}
            </div>
            <div className={classes.integrationText} >
              {"Epic Integration"}
            </div>
          </Link>
          <Group spacing={5} className={classes.links}>
            {navigation.map((link) => (
              <Link key={link.name} to={link.href} className={classes.link}>
                {link.name}
              </Link>
            ))}
          </Group>
          <Menu
            width={260}
            shadow="xl"
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                <Group spacing={7}>
                  <ResourceAvatar radius="xl" value={profile} />
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconUserCircle size={16} color={theme.colors.red[6]} stroke={1.5} />}
                onClick={() => navigate('/account/profile')}
              >
                Your profile
              </Menu.Item>
              <Menu.Item
                icon={<IconSettings size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                onClick={() => navigate('/account/profile')}
              >
                Settings
              </Menu.Item>
              <Menu.Item
                icon={<IconLogout size={16} color={theme.colors.gray[6]} stroke={1.5} />}
                onClick={() => navigate('/signout')}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </div>
      </Container>
    </MantineHeader>
  );
}
