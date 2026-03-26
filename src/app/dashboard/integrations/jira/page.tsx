import PageContainer from '@/components/layout/page-container';
import { JiraIssuesView } from '@/features/integrations/jira/components/jira-issues-view';

export const metadata = {
  title: 'Dashboard: Jira'
};

export default function JiraIntegrationsPage() {
  return (
    <PageContainer
      scrollable
      pageTitle='Jira'
      pageDescription='Search issues using Jira JQL.'
    >
      <JiraIssuesView />
    </PageContainer>
  );
}
