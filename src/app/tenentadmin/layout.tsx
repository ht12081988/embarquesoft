'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Tag, Bell, LogOut, Search, User, MapPin, ChevronDown, ChevronRight, Smartphone, MessageSquare } from 'lucide-react';
import './admin.css';

export default function TenantAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCustomerAppExpanded, setIsCustomerAppExpanded] = useState(true);

  const navItems = [
    { name: 'Deals', href: '/tenentadmin/deals', icon: Tag },
    { name: 'Push Notifications', href: '/tenentadmin/push-notifications', icon: Bell },
    { name: 'Branch Locations', href: '/tenentadmin/locations', icon: MapPin },
    { name: 'Inquiries', href: '/tenentadmin/inquiries', icon: MessageSquare },
  ];

  return (
    <>
      <div className="mobile-restriction-message">
        <LayoutDashboard size={48} color="#ffffff" style={{ marginBottom: '16px' }} />
        <h1>Desktop Only</h1>
        <p>The Tenant Admin Panel is designed for desktop use only. Please access this page from a device with a larger screen.</p>
      </div>

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
