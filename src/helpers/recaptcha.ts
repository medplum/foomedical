import { createScriptTag } from '@medplum/react';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

/**
 * Dynamically loads the recaptcha script.
 * We do not want to load the script on page load unless the user needs it.
 */
export function initRecaptcha(): void {
  if (typeof grecaptcha === 'undefined') {
    createScriptTag('https://www.google.com/recaptcha/api.js?render=' + RECAPTCHA_SITE_KEY);
  }
}

/**
 * Starts a request to generate a recapcha token.
 * @returns Promise to a recaptcha token for the current user.
 */
export function getRecaptcha(): Promise<string> {
  return new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(RECAPTCHA_SITE_KEY as string, { action: 'submit' }).then(resolve);
    });
  });
}
