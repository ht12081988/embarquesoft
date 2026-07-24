'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Tag, Bell, LogOut, Search, User, MapPin, ChevronDown, ChevronRight, Smartphone, MessageSquare, FileText, Calculator, Star } from 'lucide-react';
import './admin.css';

export default function TenantAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCustomerAppExpanded, setIsCustomerAppExpanded] = useState(true);

  const navItems = [
    { name: 'Deals', href: '/tenantadmin/deals', icon: Tag },
    { name: 'Push Notifications', href: '/tenantadmin/push-notifications', icon: Bell },
    { name: 'Branch Locations', href: '/tenantadmin/locations', icon: MapPin },
    { name: 'Inquiries', href: '/tenantadmin/inquiries', icon: MessageSquare },
    { name: 'Quotes', href: '/tenantadmin/quotes', icon: FileText },
    { name: 'Price Estimation', href: '/tenantadmin/price-estimation', icon: Calculator },
    { name: 'Points', href: '/tenantadmin/points', icon: Star },
  ];

  return (
    <>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h2>Tenant Admin</h2>
          </div>
          <nav className="admin-sidebar-nav">
            <div style={{ padding: '0 20px', marginBottom: '10px', fontSize: '0.75rem', color: '#a0a6d4', textTransform: 'uppercase', fontWeight: 'bold' }}>
              Menu
            </div>

            <div className="admin-sidebar-group" style={{ marginBottom: '16px' }}>
              <Link
                href="/tenantadmin/customers"
                className={`admin-sidebar-group-btn ${pathname === '/tenantadmin/customers' || pathname.startsWith('/tenantadmin/customers/') ? 'active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <User size={20} />
                  Customers
                </div>
              </Link>
            </div>

            <div className="admin-sidebar-group">
              <button
                onClick={() => setIsCustomerAppExpanded(!isCustomerAppExpanded)}
                className="admin-sidebar-group-btn"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Smartphone size={20} />
                  Customer App
                </div>
                {isCustomerAppExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {isCustomerAppExpanded && (
                <div className="admin-sidebar-group-content">
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
              )}
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
                Tenant / Admin / BranchNew12
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
