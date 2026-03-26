import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard: Integrations'
};

export default function IntegrationsPage() {
  return (
    <PageContainer
      scrollable
      pageTitle='Integrations'
      pageDescription='Connect and query external systems.'
    >
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>GitHub</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href='/dashboard/integrations/github' className='underline'>
              Open
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Jira</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href='/dashboard/integrations/jira' className='underline'>
              Open
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
