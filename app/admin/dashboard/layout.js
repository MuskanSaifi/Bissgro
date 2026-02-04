import AdminSidebar from '@/components/AdminSidebar';
import DashboardAuthGuard from '@/components/DashboardAuthGuard';

export default function DashboardLayout({ children }) {
  return (
    <DashboardAuthGuard>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--muted)' }}>
        <AdminSidebar />
        <main style={{ flex: 1, padding: '30px' }}>{children}</main>
      </div>
    </DashboardAuthGuard>
  );
}
