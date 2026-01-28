'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-border/40 bg-white dark:bg-card sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between h-16 px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300">
            HC
          </div>
          <div className="space-y-0.5">
            <h1 className="text-xl font-bold text-foreground">Housing Cases</h1>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-6">
            <div className="text-right text-sm hidden sm:block">
              <p className="font-semibold text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 font-bold">
                  {user.name.charAt(0)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border border-border/40 bg-white dark:bg-card shadow-lg">
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  <span>{user.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/5 transition-colors">Settings</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/5 transition-colors">Help & Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-medium">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
