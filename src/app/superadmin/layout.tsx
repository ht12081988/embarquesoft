'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Tag, LogOut, User, Users } from 'lucide-react';
import '../tenentadmin/admin.css';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Tenants', href: '/superadmin/tenants', icon: Users },
    { name: 'Deals', href: '/superadmin/deals', icon: Tag },
  ];

  return (
    <>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h2>Super Admin</h2>
          </div>
          <nav className="admin-sidebar-nav">
            <div style={{ padding: '0 20px', marginBottom: '10px', fontSize: '0.75rem', color: '#a0a6d4', textTransform: 'uppercase', fontWeight: 'bold' }}>
              Menu
            </div>

            <div className="admin-sidebar-group">
              <div className="admin-sidebar-group-content" style={{ display: 'block' }}>
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href);
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={`admin-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <item.icon size={20} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main">
          {/* Top Navbar */}
          <header className="admin-topbar">
            <div className="admin-topbar-brand">
              EmbarqueSoft.com
            </div>
            <div className="admin-topbar-info">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} />
                Super Admin
              </span>
              <button className="admin-btn-icon" title="Logout">
                <LogOut size={18} color="#ef4444" />
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="admin-content">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
