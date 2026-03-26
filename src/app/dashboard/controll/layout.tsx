import { redirect } from 'next/navigation';
import { requireControllAuth } from '@/features/controll/server/auth-next';

export default async function ControllLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const claims = await requireControllAuth();
  if (!claims) redirect('/controll/login');
  return children;
}
