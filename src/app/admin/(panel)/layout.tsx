import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export const metadata = {
	title: 'Admin',
	robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
	if (!(await isAuthenticated())) {
		redirect('/admin/login');
	}
	return <>{children}</>;
}
