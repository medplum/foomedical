import { RegisterForm } from '@medplum/react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div id="signin" className="flex h-screen flex-col justify-between">
      <main>
        <div className="relative bg-white">
          <div className="lg:absolute lg:inset-0">
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover lg:absolute lg:h-full"
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1567&amp;q=80"
                alt=""
              />
            </div>
          </div>
          <div className="relative py-4 px-4 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col justify-between lg:pr-8">
              <RegisterForm
                type="patient"
                projectId="0545eccf-bc2a-4d67-8b04-b3894fd94874"
                googleClientId="679052511930-8dqur4mmg8egbttgos5pmr4ljtf3etbb.apps.googleusercontent.com"
                recaptchaSiteKey="6LfFd_8gAAAAAOCVrZQ_aF2CN5b7s91NEYIu5GxL"
                onSuccess={() => navigate('/')}
              >
                <h2>Register with Foo Medical</h2>
              </RegisterForm>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
