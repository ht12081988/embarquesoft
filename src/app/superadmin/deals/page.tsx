'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  expiryDate: string;
  image: string;
  sequence: number;
}

export default function SuperAdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([
    { id: '1', title: 'Summer Special 20% Off', expiryDate: '2026-08-31', image: 'summer.jpg', sequence: 1 },
    { id: '2', title: 'Free Shipping Weekend', expiryDate: '2026-07-20', image: 'shipping.jpg', sequence: 2 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    expiryDate: '',
    image: '',
    sequence: 1,
  });

  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingDeal(null);
    setFormData({ title: '', expiryDate: '', image: '', sequence: deals.length + 1 });
    setIsModalOpen(true);
  };

  const openEditModal = (deal: Deal) => {
    setEditingDeal(deal);
    setFormData({ ...deal });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(d => d.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeal) {
      setDeals(deals.map(d => d.id === editingDeal.id ? { ...formData, id: editingDeal.id } : d));
    } else {
      setDeals([...deals, { ...formData, id: Date.now().toString() }]);
    }
    closeModal();
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h1 className="admin-card-title">Deals Management (Super Admin)</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search deals..." 
                className="admin-form-control"
                style={{ paddingLeft: '32px', width: '250px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>
            <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
              <Plus size={16} /> Add Deal
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sequence</th>
                <th>Image</th>
                <th>Title</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.length > 0 ? (
                filteredDeals.map(deal => (
                  <tr key={deal.id}>
                    <td>{deal.sequence}</td>
                    <td>
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon size={20} color="#94a3b8" />
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{deal.title}</td>
                    <td>{deal.expiryDate}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="admin-btn-icon" onClick={() => openEditModal(deal)} title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className="admin-btn-icon" onClick={() => handleDelete(deal.id)} title="Delete" style={{ color: 'var(--admin-danger)' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>No deals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">{editingDeal ? 'Edit Deal' : 'Create Deal'}</h2>
              <button className="admin-btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Title</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    required 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Expiry Date</label>
                  <input 
                    type="date" 
                    className="admin-form-control" 
                    required 
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Image Upload</label>
                  <input 
                    type="file" 
                    className="admin-form-control" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData({...formData, image: e.target.files[0].name});
                      }
                    }}
                  />
                  {formData.image && <div style={{ fontSize: '0.8rem', marginTop: '4px', color: '#64748b' }}>Selected: {formData.image}</div>}
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Sequence</label>
                  <input 
                    type="number" 
                    className="admin-form-control" 
                    required 
                    min="1"
                    value={formData.sequence}
                    onChange={(e) => setFormData({...formData, sequence: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingDeal ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
