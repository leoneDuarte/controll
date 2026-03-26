import { NavGroup } from '@/types';

/**
 * Navigation configuration with RBAC support
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 * Items are organized into groups, each rendered with a SidebarGroupLabel.
 *
 * RBAC Access Control:
 * Each navigation item can have an `access` property that controls visibility
 * based on permissions, plans, features, roles, and organization context.
 *
 * Examples:
 *
 * 1. Require organization:
 *    access: { requireOrg: true }
 *
 * 2. Require specific permission:
 *    access: { requireOrg: true, permission: 'org:teams:manage' }
 *
 * 3. Require specific plan:
 *    access: { plan: 'pro' }
 *
 * 4. Require specific feature:
 *    access: { feature: 'premium_access' }
 *
 * 5. Require specific role:
 *    access: { role: 'admin' }
 *
 * 6. Multiple conditions (all must be true):
 *    access: { requireOrg: true, permission: 'org:teams:manage', plan: 'pro' }
 *
 * Note: The `visible` function is deprecated but still supported for backward compatibility.
 * Use the `access` property for new items.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Controll',
    items: [
      {
        title: 'Users',
        url: '/dashboard/controll/users',
        icon: 'teams',
        isActive: false,
        items: []
      },
      {
        title: 'GitHub Commits',
        url: '/dashboard/controll/github',
        icon: 'github',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Integrations',
    items: [
      {
        title: 'GitHub (Live)',
        url: '/dashboard/integrations/github',
        icon: 'github',
        isActive: false,
        items: []
      },
      {
        title: 'Jira (Live)',
        url: '/dashboard/integrations/jira',
        icon: 'kanban',
        isActive: false,
        items: []
      }
    ]
  }
];
