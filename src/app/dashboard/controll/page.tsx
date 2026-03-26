import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard: Controll'
};

export default function ControllHomePage() {
  return (
    <PageContainer
      scrollable
      pageTitle='Controll'
      pageDescription='Legacy controll system features (Mongo + JWT).'
    >
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href='/controll/login' className='underline'>
              Open
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href='/dashboard/controll/users' className='underline'>
              Open
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>GitHub (DB)</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href='/dashboard/controll/github' className='underline'>
              Open
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
