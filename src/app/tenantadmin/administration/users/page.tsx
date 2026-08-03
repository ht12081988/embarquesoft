'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Settings2, Search, Edit2, Trash2, ChevronLeft, ChevronRight, Eye, Lock, Printer } from 'lucide-react';

const mockUsers = [
  { id: 'TUS-000010', username: 'esha123', name: 'Esha Test', roles: '-', email: 'esha123@gmr.la', branch: 'Branch20', warehouse: '-', emailCo: 'No' },
  { id: 'TUS-000009', username: 'esha', name: 'Esha Test', roles: 'Role 3', email: 'esha@gmr.la', branch: 'Branch20', warehouse: '-', emailCo: 'No' },
  { id: 'TUS-000008', username: 'cache1', name: 'Cache1 Cache1', roles: 'Role 3', email: 'cache1@gmr.la', branch: 'userone', warehouse: '-', emailCo: 'No' },
  { id: 'TUS-000007', username: 'cache', name: 'Test User12 Cache...', roles: 'Role 3', email: 'cache@gmr.la', branch: 'userone', warehouse: '-', emailCo: 'No' },
  { id: 'TUS-000006', username: 'Sneha', name: 'Sneha Chanekar', roles: 'Role 3', email: 'sneha.chanekar@indianic.com', branch: 'USBranch', warehouse: '-', emailCo: 'No' },
  { id: 'TUS-000005', username: 'AIAssistant', name: 'AI Assistant', roles: '-', email: 'ai@gmail.com', branch: 'branch214', warehouse: '-', emailCo: 'No' },
  { id: 'TUS-000004', username: 'testuser1', name: 'Test User', roles: 'new role branch', email: 'testuser1@gmr.la', branch: 'branch2', warehouse: '-', emailCo: 'No' },
  { id: 'TUS-000002', username: 'UserOne', name: 'Userone Ln', roles: 'new role branch', email: 'test@gmr.la', branch: 'branch214', warehouse: '-', emailCo: 'No' },
  { id: 'TUS-000001', username: 'snehachanekar1', name: 'Sneha Chanekar ...', roles: 'Role 3', email: 'snehachanekar1@gmr.la', branch: 'BranchNew12', warehouse: '-', emailCo: 'No' },
];

export default function UserListPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b' }}>Users</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/tenantadmin/administration/users/new" className="admin-btn admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <Plus size={16} /> Add User
          </Link>
          <button className="admin-btn admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Columns <Settings2 size={16} />
          </button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="admin-card" style={{ padding: '16px', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap', backgroundColor: '#f8fafc' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <label style={{ color: '#475569', fontSize: '0.875rem', fontWeight: 500, minWidth: '60px' }}>Search</label>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <input 
              type="text" 
              placeholder="Search" 
              className="admin-form-control"
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
            <button className="admin-btn" style={{ backgroundColor: '#ef4444', color: 'white', border: 'none' }}>
              Search
            </button>
            <button className="admin-btn" style={{ backgroundColor: '#f1f5f9', color: '#ef4444', border: 'none' }}>
              Clear
            </button>
          </div>
        </div>

      </div>

      {/* Table Area */}
      <div className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', width: '40px' }}><input type="checkbox" /></th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>User ID ↕</th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>Username ↕</th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>Name ↕</th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>Roles ↕</th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>Email Address ↕</th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>Branch Name ↕</th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>Warehouse Name ↕</th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>Email Co</th>
                <th style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', whiteSpace: 'nowrap' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
                  <td style={{ padding: '12px 16px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#1e293b', fontWeight: 500 }}>{user.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#0f172a' }}>{user.username}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#0f172a' }}>{user.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#0f172a' }}>{user.roles}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#0f172a' }}>{user.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#0f172a' }}>{user.branch}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#0f172a' }}>{user.warehouse}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem' }}>
                    <span style={{ backgroundColor: '#1e293b', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{user.emailCo}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <Eye size={16} />
                      </button>
                      <button style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <Lock size={16} />
                      </button>
                      <button style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <Printer size={16} />
                      </button>
                      <Link href={`/tenantadmin/administration/users/new`} style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <Edit2 size={16} />
                      </Link>
                      <button style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', color: '#64748b' }}>
            Showing 
            <select style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 8px', outline: 'none' }}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            per page
          </div>
          
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Showing 1 to 9 out of 9 records
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{ padding: '6px 10px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>
              <ChevronLeft size={16} />
            </button>
            <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: '#2d338a', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
              1
            </button>
            <button style={{ padding: '6px 10px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
