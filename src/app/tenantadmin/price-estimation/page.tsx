'use client';

import React, { useState } from 'react';
import { Plus, Search, X, Calculator, Globe, Edit2, Trash2 } from 'lucide-react';

interface PriceEstimation {
  id: string;
  country: string;
  shippingType: 'maritime' | 'air';
  category: string;
  rate: string;
}

export default function PriceEstimationPage() {
  const [estimations, setEstimations] = useState<PriceEstimation[]>([
    {
      id: '1',
      country: 'Dominican Republic',
      shippingType: 'maritime',
      category: 'boxes',
      rate: '20'
    },
    {
      id: '2',
      country: 'USA',
      shippingType: 'air',
      category: 'boxes',
      rate: '4.50'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<PriceEstimation, 'id'>>({
    country: 'Dominican Republic',
    shippingType: 'maritime',
    category: 'boxes',
    rate: ''
  });

  const filteredEstimations = estimations.filter(est => 
    est.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
    est.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    est.shippingType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      country: 'Dominican Republic',
      shippingType: 'maritime',
      category: 'boxes',
      rate: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (est: PriceEstimation) => {
    setEditingId(est.id);
    setFormData({
      country: est.country,
      shippingType: est.shippingType,
      category: est.category,
      rate: est.rate
    });
    setIsModalOpen(true);
  };

  const deleteEstimation = (id: string) => {
    if (confirm('Are you sure you want to delete this price rule?')) {
      setEstimations(estimations.filter(e => e.id !== id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicate country + mode + category
    const isDuplicate = estimations.some(est => 
      est.country === formData.country && 
      est.shippingType === formData.shippingType && 
      est.category === formData.category &&
      est.id !== editingId
    );

    if (isDuplicate) {
      alert(`A pricing rule for ${formData.country} - ${formData.shippingType} - ${formatCategory(formData.category)} already exists.`);
      return;
    }

    if (editingId) {
      setEstimations(estimations.map(est => est.id === editingId ? { ...formData, id: editingId } : est));
    } else {
      setEstimations([
        { 
          id: Date.now().toString(),
          ...formData
        },
        ...estimations
      ]);
    }
    closeModal();
  };

  const getRateLabel = () => {
    if (formData.shippingType === 'maritime') {
      if (formData.category === 'tv') {
        return 'Price per inch ($)';
      }
      return 'Price per cubic ft³ ($)';
    }
    // For Air
    return 'Price per lb ($)';
  };

  const formatCategory = (cat: string) => {
    const map: Record<string, string> = {
      'boxes': 'Boxes',
      'tv': 'TV',
      'appliances': 'Appliances',
      'furniture': 'Furniture'
    };
    return map[cat] || cat;
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h1 className="admin-card-title">Price Estimation Rules</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search rules..." 
                className="admin-form-control"
                style={{ paddingLeft: '32px', width: '250px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>
            <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
              <Plus size={16} /> Add Rule
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Mode</th>
                <th>Category</th>
                <th>Rate</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEstimations.length > 0 ? (
                filteredEstimations.map(est => (
                  <tr key={est.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                        <Globe size={16} color="var(--admin-primary)" />
                        {est.country}
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        backgroundColor: est.shippingType === 'maritime' ? '#e0f2fe' : '#fef3c7',
                        color: est.shippingType === 'maritime' ? '#0369a1' : '#b45309'
                      }}>
                        {est.shippingType}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{formatCategory(est.category)}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 'bold' }}>
                        ${est.rate} 
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal', marginLeft: '4px' }}>
                          {est.shippingType === 'maritime' 
                            ? (est.category === 'tv' ? '/ inch' : '/ ft³') 
                            : '/ lb'}
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => openEditModal(est)}
                        title="Edit Rule"
                        style={{ background: 'none', border: 'none', color: 'var(--admin-primary)', cursor: 'pointer', marginRight: '12px', verticalAlign: 'middle' }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteEstimation(est.id)}
                        title="Delete Rule"
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', verticalAlign: 'middle' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>No pricing rules found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" style={{ padding: '20px', overflowY: 'auto' }}>
          <div className="admin-modal" style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
            <div className="admin-modal-header" style={{ flexShrink: 0 }}>
              <h2 className="admin-modal-title">{editingId ? 'Edit Rule' : 'Add Price Rule'}</h2>
              <button className="admin-btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              <div className="admin-modal-body" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">Country</label>
                  <select 
                    className="admin-form-control"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="USA">USA</option>
                    <option value="India">India</option>
                  </select>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label className="admin-form-label">Shipping Type</label>
                    <select 
                      className="admin-form-control"
                      required
                      value={formData.shippingType}
                      onChange={(e) => setFormData({...formData, shippingType: e.target.value as 'maritime' | 'air'})}
                    >
                      <option value="maritime">Maritime</option>
                      <option value="air">Air</option>
                    </select>
                  </div>
                  
                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label className="admin-form-label">Category</label>
                    <select 
                      className="admin-form-control"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="boxes">Boxes</option>
                      <option value="tv">TV</option>
                      <option value="appliances">Appliances</option>
                      <option value="furniture">Furniture</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-form-label">{getRateLabel()}</label>
                  <input 
                    type="number"
                    step="0.01"
                    min="0"
                    className="admin-form-control" 
                    required 
                    value={formData.rate}
                    onChange={(e) => setFormData({...formData, rate: e.target.value})}
                    placeholder="e.g. 20.00"
                  />
                </div>

              </div>
              <div className="admin-modal-footer" style={{ flexShrink: 0 }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
