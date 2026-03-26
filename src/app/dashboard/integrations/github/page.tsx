import PageContainer from '@/components/layout/page-container';
import { GithubCommitsView } from '@/features/integrations/github/components/github-commits-view';

export const metadata = {
  title: 'Dashboard: GitHub'
};

export default function GithubIntegrationsPage() {
  return (
    <PageContainer
      scrollable
      pageTitle='GitHub'
      pageDescription='Fetch commit data from the GitHub API.'
    >
      <GithubCommitsView />
    </PageContainer>
  );
}
