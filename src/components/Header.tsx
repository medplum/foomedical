// SPDX-FileCopyrightText: Copyright Orangebot, Inc. and Medplum contributors
// SPDX-License-Identifier: Apache-2.0
import { AppShell, Burger, Container, Group, Menu, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ResourceAvatar, useMedplumProfile } from '@medplum/react';
import { IconChevronDown, IconLogout, IconSettings, IconUserCircle } from '@tabler/icons-react';
import cx from 'clsx';
import { JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import classes from './Header.module.css';
import { Logo } from './Logo';

export function Header(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const profile = useMedplumProfile();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const navigation = [
    { name: t('header.nav.healthrecord'), href: '/health-record' },
    { name: t('header.nav.messages'), href: '/messages' },
    { name: t('header.nav.careplan'), href: '/care-plan' },
    { name: t('header.nav.getcare'), href: '/get-care' },
  ];

  return (
    <AppShell.Header>
      <Container>
        <div className={classes.inner}>
          <UnstyledButton className={classes.logoButton} onClick={() => navigate('/')?.catch(console.error)}>
            <Logo width={240} />
          </UnstyledButton>
          <Group gap={5} className={classes.links}>
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
                <Group gap={7}>
                  <ResourceAvatar radius="xl" value={profile} />
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconUserCircle size={16} color={theme.colors.red[6]} stroke={1.5} />}
                onClick={() => navigate('/account/profile')?.catch(console.error)}
              >
                {t('header.menu.profile')}
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSettings size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                onClick={() => navigate('/account/profile')?.catch(console.error)}
              >
                {t('header.menu.settings')}
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout size={16} color={theme.colors.gray[6]} stroke={1.5} />}
                onClick={() => navigate('/signout')?.catch(console.error)}
              >
                {t('header.menu.signout')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </div>
      </Container>
    </AppShell.Header>
  );
}
