import React from 'react';
import { NavLink } from 'react-router-dom';

export interface SubMenuProps {
  name: string;
  href: string;
}

export interface SideMenuProps {
  title: string;
  menu: { name: string; href: string; subMenu?: SubMenuProps[] }[];
}

export function SideMenu(props: SideMenuProps): JSX.Element {
  return (
    <section className="lg:col-span-1 lg:col-start-1">
      <h2 className="mb-3 text-lg font-medium text-gray-900">{props.title}</h2>
      <nav className="space-y-1" aria-label="Sidebar">
        {props.menu.map((item) => (
          <React.Fragment key={item.name}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900'
                  : 'flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
              end={true}
            >
              <span className="truncate">{item.name}</span>
            </NavLink>
            <nav className="space-y-1" aria-label="Sidebar">
              {item.subMenu?.map((item: SubMenuProps) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    isActive
                      ? 'ml-3 flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900'
                      : 'ml-3 flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                >
                  <span className="truncate">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </React.Fragment>
        ))}
      </nav>
    </section>
  );
}
