import React from 'react';
import { NavLink } from 'react-router-dom';

export interface SideMenuProps {
  title: string;
  navigation: { name: string; href: string }[];
}

export function SideMenu(props: SideMenuProps): JSX.Element {
  return (
    <section className="lg:col-start-1 lg:col-span-1">
      <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
        <h2 className="text-lg font-medium text-gray-900 mb-3">{props.title}</h2>
        <nav className="space-y-1" aria-label="Sidebar">
          {props.navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-100 text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md'
              }
            >
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </section>
  );
}
