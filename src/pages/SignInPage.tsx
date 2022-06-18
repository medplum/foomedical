import { SignInForm } from '@medplum/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div id="signin" className="flex h-screen flex-col justify-between">
      <main>
        <div className="relative bg-white">
          <div className="lg:absolute lg:inset-0">
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover lg:absolute lg:h-full"
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8 lg:py-32">
            <div className="lg:pr-8">
              <SignInForm
                googleClientId="679052511930-8dqur4mmg8egbttgos5pmr4ljtf3etbb.apps.googleusercontent.com"
                onSuccess={() => navigate('/')}
              >
                <h2>Sign in to Foo Medical</h2>
              </SignInForm>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
