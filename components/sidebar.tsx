'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    label: 'Dashboard',
    href: '/',
    roles: ['admin', 'agent'],
  },
  {
    label: 'Cases',
    href: '/cases',
    roles: ['admin', 'agent'],
  },
  {
    label: 'New Case',
    href: '/cases/new',
    roles: ['admin', 'agent'],
  },
  {
    label: 'Admin',
    href: '/admin',
    roles: ['admin'],
  },
  {
    label: 'Reports',
    href: '/reports',
    roles: ['admin'],
  },
  {
    label: 'Documentation',
    href: '/readme',
    roles: ['admin', 'agent'],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const visibleItems = navigationItems.filter((item) =>
    item.roles.includes(user?.role || ''),
  );

  return (
    <aside className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border flex-col h-screen sticky top-0 shadow-lg">
      <nav className="flex-1 px-4 py-6 space-y-1">
        {visibleItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both` }}
              className={cn(
                'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-400',
                isActive
                  ? 'bg-accent text-white shadow-md hover:shadow-lg'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-accent',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4 text-xs text-sidebar-foreground/70 space-y-1">
        <p className="font-semibold text-sidebar-foreground">© 2024 Housing</p>
        <p className="text-sidebar-foreground/50">Management System</p>
      </div>
    </aside>
  );
}
