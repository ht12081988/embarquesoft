'use client';

import React, { useState } from 'react';
import { Plus, Search, X, MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  lat: string;
  lng: string;
  cellPhone: string;
  telePhone: string;
  officeNumber: string;
}

export default function BranchLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([
    { 
      id: '1', name: 'Main Branch', address1: '123 Main St', address2: 'Suite 100', 
      city: 'New York', state: 'NY', zip: '10001', country: 'USA', 
      lat: '40.7128', lng: '-74.0060', cellPhone: '555-123-4567', telePhone: '555-987-6543',
      officeNumber: '555-000-1111' 
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<Location, 'id'>>({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    lat: '',
    lng: '',
    cellPhone: '',
    telePhone: '',
    officeNumber: ''
  });

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setFormData({
      name: '', address1: '', address2: '', city: '', state: '', 
      zip: '', country: '', lat: '', lng: '', cellPhone: '', telePhone: '', officeNumber: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocations([
      { 
        id: Date.now().toString(),
        ...formData
      },
      ...locations
    ]);
    closeModal();
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h1 className="admin-card-title">Branch Locations</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search locations..." 
                className="admin-form-control"
                style={{ paddingLeft: '32px', width: '250px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>
            <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
              <Plus size={16} /> Add Location
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City/State</th>
                <th>Phones</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.length > 0 ? (
                filteredLocations.map(loc => (
                  <tr key={loc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                        <MapPin size={16} color="var(--admin-primary)" />
                        {loc.name}
                      </div>
                    </td>
                    <td>
                      <div>{loc.address1}</div>
                      {loc.address2 && <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-light)' }}>{loc.address2}</div>}
                    </td>
                    <td>
                      {loc.city}, {loc.state} {loc.zip}
                      <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-light)' }}>{loc.country}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>Cell: {loc.cellPhone || 'N/A'}</div>
                      <div style={{ fontSize: '0.85rem' }}>Tel: {loc.telePhone || 'N/A'}</div>
                      <div style={{ fontSize: '0.85rem' }}>Office: {loc.officeNumber || 'N/A'}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>No branch locations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" style={{ padding: '20px', overflowY: 'auto' }}>
          <div className="admin-modal" style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div className="admin-modal-header" style={{ flexShrink: 0 }}>
              <h2 className="admin-modal-title">Add Branch Location</h2>
              <button className="admin-btn-icon" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              <div className="admin-modal-body" style={{ overflowY: 'auto' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Location Name</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Address 1</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      required 
                      value={formData.address1}
                      onChange={(e) => setFormData({...formData, address1: e.target.value})}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Address 2</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={formData.address2}
                      onChange={(e) => setFormData({...formData, address2: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">City</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      required 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">State</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      required 
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Zip</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      required 
                      value={formData.zip}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Country</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    required 
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Latitude (Lat)</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={formData.lat}
                      onChange={(e) => setFormData({...formData, lat: e.target.value})}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Longitude (Long)</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={formData.lng}
                      onChange={(e) => setFormData({...formData, lng: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Cell Phone</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={formData.cellPhone}
                      onChange={(e) => setFormData({...formData, cellPhone: e.target.value})}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Telephone</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={formData.telePhone}
                      onChange={(e) => setFormData({...formData, telePhone: e.target.value})}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Office Number</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={formData.officeNumber}
                      onChange={(e) => setFormData({...formData, officeNumber: e.target.value})}
                    />
                  </div>
                </div>

              </div>
              <div className="admin-modal-footer" style={{ flexShrink: 0 }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
