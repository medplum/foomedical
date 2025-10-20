// SPDX-FileCopyrightText: Copyright Orangebot, Inc. and Medplum contributors
// SPDX-License-Identifier: Apache-2.0
import { BackgroundImage, Box, SimpleGrid } from '@mantine/core';
import { SignInForm } from '@medplum/react';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID } from '../config';

export function SignInPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <SimpleGrid cols={2}>
      <Box pt={100} pb={200}>
        <SignInForm
          projectId={MEDPLUM_PROJECT_ID}
          googleClientId={MEDPLUM_GOOGLE_CLIENT_ID}
          onSuccess={() => navigate('/')?.catch(console.error)}
        >
          <h2>{t('signin.title')}</h2>
        </SignInForm>
      </Box>
      <BackgroundImage src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1567&amp;q=80" />
    </SimpleGrid>
  );
}
