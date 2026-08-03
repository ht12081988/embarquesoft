'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Plus, Eye, Edit, Trash2, ShoppingBag } from 'lucide-react';

export default function TenantAdminSalesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for Sales items
  const initialSalesItems = [
    {
      id: 'SALE-001',
      category: 'Electronics',
      description: 'Used iPhone 13 Pro - 256GB, excellent condition.',
      price: '$650.00',
      image: 'https://placehold.co/40x40/e2e8f0/94a3b8?text=IMG',
      activationDate: '2026-07-28',
      expirationDate: '2026-09-26',
      isActive: true
    },
    {
      id: 'SALE-002',
      category: 'Furniture',
      description: 'Wooden Dining Table with 6 chairs. Minor scratches.',
      price: '$200.00',
      image: 'https://placehold.co/40x40/e2e8f0/94a3b8?text=IMG',
      activationDate: '2026-07-15',
      expirationDate: '2026-09-13',
      isActive: true
    },
    {
      id: 'SALE-003',
      category: 'Vehicles',
      description: '2015 Honda Civic LX. 85k miles, clean title.',
      price: '$10,500.00',
      image: 'https://placehold.co/40x40/e2e8f0/94a3b8?text=IMG',
      activationDate: '',
      expirationDate: '',
      isActive: false
    }
  ];

  const [salesItems, setSalesItems] = useState(initialSalesItems);

  const toggleActiveStatus = (id: string) => {
    setSalesItems(prev => prev.map(item => {
      if (item.id === id) {
        const newIsActive = !item.isActive;
        if (newIsActive) {
          const today = new Date();
          const activation = today.toISOString().split('T')[0];
          const expDate = new Date();
          expDate.setDate(today.getDate() + 60);
          const expiration = expDate.toISOString().split('T')[0];
          return { ...item, isActive: newIsActive, activationDate: activation, expirationDate: expiration };
        } else {
          return { ...item, isActive: newIsActive, activationDate: '', expirationDate: '' };
        }
      }
      return item;
    }));
  };

  const filteredSales = salesItems.filter(item => 
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>For Sale Marketplace</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Manage classifieds items listed for sale.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/tenantadmin/sales/new">
            <button className="admin-btn admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={16} />
              Add Sale Item
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="admin-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by category or description..." 
              className="admin-form-control"
              style={{ paddingLeft: '36px', height: '36px', fontSize: '0.875rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Image</th>
                <th>Category</th>
                <th style={{ width: '30%' }}>Description</th>
                <th>Price</th>
                <th>Activation Date</th>
                <th>Expiration Date</th>
                <th>Status</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.length > 0 ? (
                filteredSales.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.category} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.category}</span>
                    </td>
                    <td>
                      <span style={{ color: '#475569', fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.description}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#eb5b27' }}>{item.price}</span>
                    </td>
                    <td>
                      <span style={{ color: '#475569' }}>{item.activationDate || '-'}</span>
                    </td>
                    <td>
                      <span style={{ color: '#475569' }}>{item.expirationDate || '-'}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={item.isActive}
                        onClick={() => toggleActiveStatus(item.id)}
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          alignItems: 'center',
                          height: '24px',
                          width: '44px',
                          borderRadius: '9999px',
                          backgroundColor: item.isActive ? '#eb5b27' : '#cbd5e1',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease-in-out',
                          border: 'none',
                          padding: 0
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            height: '20px',
                            width: '20px',
                            borderRadius: '9999px',
                            backgroundColor: 'white',
                            transform: item.isActive ? 'translateX(22px)' : 'translateX(2px)',
                            transition: 'transform 0.2s ease-in-out',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                        />
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <Link href={`/tenantadmin/sales/new`}>
                          <button className="admin-icon-btn" title="Edit Item">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button className="admin-icon-btn" style={{ color: '#ef4444' }} title="Delete Item">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <ShoppingBag size={32} color="#cbd5e1" />
                      <p>No sales items found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fafafa', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Showing 1 to {filteredSales.length} of {filteredSales.length} entries
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="admin-btn admin-btn-secondary" style={{ padding: '6px', minWidth: '32px', display: 'flex', justifyContent: 'center' }} disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="admin-btn admin-btn-primary" style={{ padding: '6px 12px', minWidth: '32px', display: 'flex', justifyContent: 'center' }}>
              1
            </button>
            <button className="admin-btn admin-btn-secondary" style={{ padding: '6px', minWidth: '32px', display: 'flex', justifyContent: 'center' }} disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
