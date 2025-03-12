import { BackgroundImage, Box, SimpleGrid } from '@mantine/core';
import { RegisterForm } from '@medplum/react';
import { useNavigate } from 'react-router';
import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID } from '../config';

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Box 
        p="2rem" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh' // Volle Bildschirmhöhe, genau wie das Bild
        }}
      >
        <div style={{ width: '100%', maxWidth: '450px' }}>
          <RegisterForm
            type="patient"
            projectId={MEDPLUM_PROJECT_ID}
            googleClientId={MEDPLUM_GOOGLE_CLIENT_ID}
            onSuccess={() => navigate('/')?.catch(console.error)}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Register with Health Pass</h2>
          </RegisterForm>
        </div>
      </Box>
      <BackgroundImage 
        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1567&amp;q=80"
        style={{ 
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' 
        }}
      />
    </SimpleGrid>
  );
}
