import PageContainer from '@/components/layout/page-container';
import { ControllUsersView } from '@/features/controll/components/controll-users-view';

export const metadata = {
  title: 'Dashboard: Controll Users'
};

export default function ControllUsersPage() {
  return (
    <PageContainer
      scrollable
      pageTitle='Controll Users'
      pageDescription='Users stored in Mongo (JWT-protected API).'
    >
      <ControllUsersView />
    </PageContainer>
  );
}
