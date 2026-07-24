'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Settings2, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const mockCustomers = [
  { id: 'CUS-007990', date: '12/09/2025', name: 'Customer Testtype', address: '47 W 13th St', tele: '-', cell: '+1 201-455-4565', balance: 32 },
  { id: 'CUS-005552', date: '08/12/2025', name: 'Ana L Custodio', address: '750 East 166th St...', tele: '-', cell: '+1 914-75677 14737', balance: 0 },
  { id: 'CUS-005083', date: '08/12/2025', name: 'Perla Guerrero', address: '64 Locust Hill Av...', tele: '-', cell: '+1 914-343-2868', balance: 0 },
  { id: 'CUS-003211', date: '08/12/2025', name: 'Marie Isaac', address: '77 Locust Hill Av...', tele: '+1 914-562-5114', cell: '+1 96645 83284', balance: 0 },
  { id: 'CUS-003222', date: '08/12/2025', name: 'Rafael Antonio D...', address: '40 Locust Hill Av...', tele: '+1 914-387-8315', cell: '+1 914-498-1723', balance: 0 },
  { id: 'CUS-003249', date: '08/12/2025', name: 'Moises Custodio', address: '230 East 95th Str...', tele: '-', cell: '+1 914-75677 14737', balance: 0 },
  { id: 'CUS-002985', date: '08/12/2025', name: 'Xiomara Autocall...', address: '144 Locust Street', tele: '+1 516-599-2885', cell: '+1 63027 58853', balance: 0 },
  { id: 'CUS-000565', date: '08/12/2025', name: 'Milcia Pena', address: '2 Locust Avenue', tele: '+1 917-405-0165', cell: '+1 914-75677 14737', balance: 0 },
  { id: 'CUS-000005', date: '06/18/2025', name: 'Customeronene...', address: '15 Temmuz Şehit...', tele: '-', cell: '+1 914-75677 14737', balance: 0 },
  { id: 'CUS-000002', date: '04/09/2025', name: 'Customer Cone72', address: '1234 Maple Ave', tele: '-', cell: '+1 201-555-0123', balance: 0 },
];

export default function CustomerListPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b' }}>Customer List</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="admin-btn admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} /> Add
          </button>
          <button className="admin-btn admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Columns <Settings2 size={16} />
          </button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="admin-card" style={{ padding: '16px', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '300px' }}>
          <label style={{ color: '#475569', fontSize: '0.875rem', fontWeight: 500 }}>Customer</label>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="cust" 
              className="admin-form-control"
              style={{ paddingLeft: '36px', width: '100%' }}
            />
          </div>
          <button className="admin-btn" style={{ backgroundColor: '#ef4444', color: 'white', border: 'none' }}>
            Search
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '300px' }}>
          <label style={{ color: '#475569', fontSize: '0.875rem', fontWeight: 500 }}>ShipTo</label>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search" 
              className="admin-form-control"
              style={{ paddingLeft: '36px', width: '100%' }}
            />
          </div>
          <button className="admin-btn" style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', opacity: 0.7 }}>
            Search
          </button>
        </div>

      </div>

      {/* Table Area */}
      <div className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>Customer ID ↕</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>Date ↕</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>Customer Name ↕</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>Address ↕</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>Tele.No ↕</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>Cell.No ↕</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>Balance ↕</th>
                <th style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((cust, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
                  <td style={{ padding: '16px', fontSize: '0.875rem', color: '#1e293b', fontWeight: 600 }}>{cust.id}</td>
                  <td style={{ padding: '16px', fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>{cust.date}</td>
                  <td style={{ padding: '16px', fontSize: '0.875rem', color: '#ef4444', fontWeight: 600 }}>{cust.name}</td>
                  <td style={{ padding: '16px', fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>{cust.address}</td>
                  <td style={{ padding: '16px', fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>{cust.tele}</td>
                  <td style={{ padding: '16px', fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>{cust.cell}</td>
                  <td style={{ padding: '16px', fontSize: '0.875rem', color: '#0f172a', fontWeight: 600 }}>{cust.balance}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/tenantadmin/customers/${cust.id}`} style={{ padding: '6px', borderRadius: '4px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Edit2 size={14} color="#475569" />
                      </Link>
                      <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer' }}>
                        <Trash2 size={14} color="#475569" />
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
            Showing 1 to 10 out of 10 records
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{ padding: '6px 10px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>
              <ChevronLeft size={16} />
            </button>
            <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: '#1e3a8a', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
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
