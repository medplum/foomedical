// SPDX-FileCopyrightText: Copyright Orangebot, Inc. and Medplum contributors
// SPDX-License-Identifier: Apache-2.0
import { Container, Group } from '@mantine/core';
import { JSX, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';
import { SideMenu } from '../../components/SideMenu';

export function AccountPage(): JSX.Element {
  const { t } = useTranslation();

  const sideMenu = {
    title: t('account.title'),
    menu: [
      { name: t('account.menu.profile'), href: '/account/profile' },
      { name: t('account.menu.provider'), href: '/account/provider' },
      { name: t('account.menu.billing'), href: '/account/membership-and-billing' },
    ],
  };

  return (
    <Container>
      <Group align="top">
        <SideMenu {...sideMenu} />
        <div style={{ width: 800, flex: 800 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </Group>
    </Container>
  );
}
