import { redirect } from 'next/navigation';
import { requireControllAuth } from '@/features/controll/server/auth-next';

export default async function Dashboard() {
  const claims = await requireControllAuth();
  if (!claims) return redirect('/controll/login');
  redirect('/dashboard/controll');
}
