import PageContainer from '@/components/layout/page-container';
import { ControllGithubDbView } from '@/features/controll/components/controll-github-db-view';

export const metadata = {
  title: 'Dashboard: Controll GitHub'
};

export default function ControllGithubPage() {
  return (
    <PageContainer
      scrollable
      pageTitle='Controll GitHub (DB)'
      pageDescription='Import commits from GitHub into Mongo and query reports from DB.'
    >
      <ControllGithubDbView />
    </PageContainer>
  );
}
