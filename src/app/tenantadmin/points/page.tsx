'use client';

import React, { useState } from 'react';
import { Save, Star } from 'lucide-react';

export default function PointsConfigPage() {
  const [formData, setFormData] = useState({
    pointsPercent: 2,
    platinumThreshold: 10000,
    platinumBonus: 500,
    goldThreshold: 5000,
    goldBonus: 250,
    resetCustomerEveryYear: 'yes',
    resetPoints: 'yes' // 'yes' or 'no'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h1 className="admin-card-title">Points Configuration</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', alignItems: 'flex-start' }}>
            <div className="admin-form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="admin-form-label">Points % of Invoice</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="number" 
                  className="admin-form-control" 
                  required 
                  value={formData.pointsPercent}
                  onChange={(e) => setFormData({...formData, pointsPercent: Number(e.target.value)})}
                  style={{ width: '150px' }}
                />
                <span style={{ color: 'var(--admin-text-light)', fontSize: '0.85rem' }}>
                  % (Invoice = $100 and % = 2 then Points = 2)
                </span>
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="admin-form-label">Point value 1$ =</label>
              <input 
                type="text" 
                className="admin-form-control" 
                readOnly
                value="1"
                style={{ backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }}
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div className="admin-card" style={{ padding: '12px', backgroundColor: '#f8fafc', margin: 0, boxShadow: 'none', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={16} color="#475569" /> Platinum Tier
              </h3>
              <div className="admin-form-group" style={{ marginBottom: '10px' }}>
                <label className="admin-form-label">Threshold Per Year</label>
                <input 
                  type="number" 
                  className="admin-form-control" 
                  required 
                  value={formData.platinumThreshold}
                  onChange={(e) => setFormData({...formData, platinumThreshold: Number(e.target.value)})}
                />
              </div>
              <div className="admin-form-group" style={{ marginBottom: '4px' }}>
                <label className="admin-form-label">Extra Earned Points</label>
                <input 
                  type="number" 
                  className="admin-form-control" 
                  required 
                  value={formData.platinumBonus}
                  onChange={(e) => setFormData({...formData, platinumBonus: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="admin-card" style={{ padding: '12px', backgroundColor: '#fcf8eb', margin: 0, boxShadow: 'none', border: '1px solid #fde68a' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#b45309', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={16} fill="#eab308" color="#eab308" /> Gold Tier
              </h3>
              <div className="admin-form-group" style={{ marginBottom: '10px' }}>
                <label className="admin-form-label">Threshold Per Year</label>
                <input 
                  type="number" 
                  className="admin-form-control" 
                  required 
                  value={formData.goldThreshold}
                  onChange={(e) => setFormData({...formData, goldThreshold: Number(e.target.value)})}
                />
              </div>
              <div className="admin-form-group" style={{ marginBottom: '4px' }}>
                <label className="admin-form-label">Extra Earned Points</label>
                <input 
                  type="number" 
                  className="admin-form-control" 
                  required 
                  value={formData.goldBonus}
                  onChange={(e) => setFormData({...formData, goldBonus: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div className="admin-form-group" style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', margin: 0 }}>
              <label className="admin-form-label" style={{ marginBottom: '12px', fontSize: '0.95rem' }}>Would you like to reset customer points every year?</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#334155' }}>
                  <input 
                    type="radio" 
                    name="resetCustomerEveryYear" 
                    value="yes"
                    checked={formData.resetCustomerEveryYear === 'yes'}
                    onChange={(e) => setFormData({...formData, resetCustomerEveryYear: e.target.value})}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <strong>Yes</strong> - Display Reset Points Every Year option
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#334155' }}>
                  <input 
                    type="radio" 
                    name="resetCustomerEveryYear" 
                    value="no"
                    checked={formData.resetCustomerEveryYear === 'no'}
                    onChange={(e) => setFormData({...formData, resetCustomerEveryYear: e.target.value})}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <strong>No</strong> - Allow customer to use points in subsequent years
                </label>
              </div>
            </div>

            {formData.resetCustomerEveryYear === 'yes' ? (
              <div className="admin-form-group" style={{ padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '8px', border: '1px solid #cbd5e1', margin: 0 }}>
                <label className="admin-form-label" style={{ marginBottom: '12px', fontSize: '0.95rem' }}>Reset Points Every Year</label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#334155' }}>
                    <input 
                      type="radio" 
                      name="resetPoints" 
                      value="yes"
                      checked={formData.resetPoints === 'yes'}
                      onChange={(e) => setFormData({...formData, resetPoints: e.target.value})}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <strong>Yes</strong> - Reset Total points and Earned points
                  </label>
                  
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#334155' }}>
                    <input 
                      type="radio" 
                      name="resetPoints" 
                      value="no"
                      checked={formData.resetPoints === 'no'}
                      onChange={(e) => setFormData({...formData, resetPoints: e.target.value})}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <strong>No</strong> - Reset Total points only
                  </label>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <Save size={16} /> Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
