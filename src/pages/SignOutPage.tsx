// SPDX-FileCopyrightText: Copyright Orangebot, Inc. and Medplum contributors
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Title } from '@mantine/core';
import { useMedplum } from '@medplum/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export function SignOutPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const medplum = useMedplum();

  useEffect(() => {
    medplum.signOut().catch(console.error);
  }, [medplum]);

  return (
    <Box p="xl">
      <Title>{t('signout.title')}</Title>
      <Button onClick={() => navigate('/')?.catch(console.error)}>{t('signout.button')}</Button>
    </Box>
  );
}
