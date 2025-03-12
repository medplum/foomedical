import { BackgroundImage, Box, SimpleGrid } from '@mantine/core';
import { RegisterForm } from '@medplum/react';
import { useNavigate } from 'react-router';
import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID } from '../config';

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Box pt={100} pb={200} sx={{ padding: '2rem' }}>
        <RegisterForm
          type="patient"
          projectId={MEDPLUM_PROJECT_ID}
          googleClientId={MEDPLUM_GOOGLE_CLIENT_ID}
          onSuccess={() => navigate('/')?.catch(console.error)}
        >
          <h2>Register with My Health Pass Plus</h2>
        </RegisterForm>
      </Box>
      <BackgroundImage 
        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1567&amp;q=80"
        sx={{ display: { base: 'none', md: 'block' } }}
      />
    </SimpleGrid>
  );
}
