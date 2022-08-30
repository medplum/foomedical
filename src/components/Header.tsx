import { Menu, Popover, Transition } from '@headlessui/react';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatHumanName, ProfileResource } from '@medplum/core';
import { useMedplumProfile } from '@medplum/react';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as AvatarPlaceholder } from '../img/avatar-placeholder.svg';
import { ReactComponent as Logo } from '../img/logo.svg';

const navigation = [
  { name: 'Health Record', href: '/health-record' },
  { name: 'Messages', href: '/messages' },
  { name: 'Care Plan', href: '/care-plan' },
  { name: 'Get Care', href: '/get-care' },
];
const userNavigation = [
  { name: 'Your Profile', href: '/account/profile' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/signout' },
];
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Header(): JSX.Element {
  const profile = useMedplumProfile() as ProfileResource;

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <Popover className="flex h-20 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <a href="/">
                <Logo className="h-10 w-60" />
              </a>
            </div>
          </div>
          <nav aria-label="Global" className="hidden lg:flex lg:items-center lg:space-x-4 xl:space-x-7">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.href} className="text-lg text-neutral-500 hover:text-neutral-900">
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Transition.Root as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" aria-hidden="true" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute top-0 right-0 z-30 w-full max-w-none origin-top transform p-2 transition"
                >
                  <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="pt-3 pb-2">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <Logo className="h-8 w-auto" />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 pb-2">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          {profile.photo && profile.photo?.length > 0 ? (
                            <img className="h-11 w-11 rounded-full" src={profile.photo[0].url} alt="" />
                          ) : (
                            <AvatarPlaceholder className="inline-block h-11 w-11 overflow-hidden rounded-full bg-gray-100 p-1" />
                          )}
                        </div>
                        <div className="ml-3">
                          {profile.name && (
                            <div className="text-base font-medium text-gray-800">
                              {formatHumanName(profile.name[0])}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
          <div className="hidden justify-end lg:flex lg:w-60 lg:items-center">
            {/* Profile dropdown */}
            <Menu as="div" className="relative flex-shrink-0">
              <div>
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  {profile.photo && profile.photo?.length > 0 ? (
                    <img className="h-11 w-11 rounded-full" src={profile.photo[0].url} alt="" />
                  ) : (
                    <AvatarPlaceholder className="inline-block h-11 w-11 overflow-hidden rounded-full bg-gray-100 p-0.5" />
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </Popover>
      </div>
    </header>
  );
}
