'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

type MeResponse =
  | {
      ok: true;
      user: { _id: string; nome: string; email: string };
    }
  | { error: string };

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? 'U';
  const last = parts.length > 1 ? parts[parts.length - 1]![0] : '';
  return (first + last).toUpperCase();
}

export function ControllUserMenu() {
  const router = useRouter();
  const meQuery = useQuery({
    queryKey: ['controll-me'],
    queryFn: async () => {
      const res = await fetch('/api/controll/auth/me');
      const json = (await res.json()) as MeResponse;
      if (!res.ok || !('ok' in json)) return null;
      return json.user;
    }
  });

  const user = meQuery.data;

  async function logout() {
    await fetch('/api/controll/auth/logout', { method: 'POST' }).catch(
      () => {}
    );
    router.push('/controll/login');
    router.refresh();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarFallback className='rounded-lg'>
                  {user ? initials(user.nome) : '??'}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {user?.nome ?? 'Not signed in'}
                </span>
                <span className='truncate text-xs'>{user?.email ?? '—'}</span>
              </div>
              <Icons.chevronsDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side='bottom'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarFallback className='rounded-lg'>
                    {user ? initials(user.nome) : '??'}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {user?.nome ?? 'Not signed in'}
                  </span>
                  <span className='truncate text-xs'>{user?.email ?? '—'}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push('/dashboard/controll')}
            >
              <Icons.settings className='mr-2 h-4 w-4' />
              Controll
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} disabled={!user}>
              <Icons.logout className='mr-2 h-4 w-4' />
              Log out
            </DropdownMenuItem>
            {!user && (
              <DropdownMenuItem onClick={() => router.push('/controll/login')}>
                <Icons.login className='mr-2 h-4 w-4' />
                Log in
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
