"use client";

import React, { useState, useEffect } from 'react';
import { Settings, ShieldAlert, Star, ShoppingBag, Save } from 'lucide-react';

export default function AppSettingsPage() {
  const [settings, setSettings] = useState({
    claims: true,
    points: true,
    sales: true,
  });
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('customer_app_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing settings", e);
      }
    }
  }, []);

  const handleToggle = (key: keyof typeof settings) => {
    if (key === 'points' && settings[key] === true) {
      alert("Validation Error: Cannot disable 'My Points' because customers have already started accumulating points.");
      return;
    }
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    localStorage.setItem('customer_app_settings', JSON.stringify(settings));
    
    setToastMessage("Settings saved successfully.");
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="admin-page-container" style={{ padding: '24px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Settings size={28} color="#eb5b27" />
          Customer App Settings
        </h1>
      </div>

      {toastMessage && (
        <div style={{ backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>
          {toastMessage}
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
          Module Toggles
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
          Enable or disable specific modules in the customer mobile app. Disabled modules will be hidden from the home screen for all users.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {/* File a Claim Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111827' }}>File a Claim</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280', minHeight: '40px' }}>Allow customers to submit and track claims.</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: 'auto' }}>
              <div style={{ position: 'relative' }}>
                <input type="checkbox" className="sr-only" checked={settings.claims} onChange={() => handleToggle('claims')} style={{ opacity: 0, width: 0, height: 0 }} />
                <div style={{ 
                  width: '48px', height: '26px', borderRadius: '9999px', transition: 'background-color 0.3s',
                  backgroundColor: settings.claims ? '#10b981' : '#d1d5db' 
                }}>
                  <div style={{
                    position: 'absolute', top: '2px', left: '2px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'white', transition: 'transform 0.3s',
                    transform: settings.claims ? 'translateX(22px)' : 'translateX(0)'
                  }} />
                </div>
              </div>
            </label>
          </div>

          {/* My Points Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
              <Star size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111827' }}>My Points</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280', minHeight: '40px' }}>Customer loyalty and rewards program.</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: 'auto' }}>
              <div style={{ position: 'relative' }}>
                <input type="checkbox" className="sr-only" checked={settings.points} onChange={() => handleToggle('points')} style={{ opacity: 0, width: 0, height: 0 }} />
                <div style={{ 
                  width: '48px', height: '26px', borderRadius: '9999px', transition: 'background-color 0.3s',
                  backgroundColor: settings.points ? '#10b981' : '#d1d5db' 
                }}>
                  <div style={{
                    position: 'absolute', top: '2px', left: '2px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'white', transition: 'transform 0.3s',
                    transform: settings.points ? 'translateX(22px)' : 'translateX(0)'
                  }} />
                </div>
              </div>
            </label>
          </div>

          {/* Sale Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#be185d' }}>
              <ShoppingBag size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111827' }}>Sale</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280', minHeight: '40px' }}>Marketplace for selling items to customers.</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: 'auto' }}>
              <div style={{ position: 'relative' }}>
                <input type="checkbox" className="sr-only" checked={settings.sales} onChange={() => handleToggle('sales')} style={{ opacity: 0, width: 0, height: 0 }} />
                <div style={{ 
                  width: '48px', height: '26px', borderRadius: '9999px', transition: 'background-color 0.3s',
                  backgroundColor: settings.sales ? '#10b981' : '#d1d5db' 
                }}>
                  <div style={{
                    position: 'absolute', top: '2px', left: '2px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'white', transition: 'transform 0.3s',
                    transform: settings.sales ? 'translateX(22px)' : 'translateX(0)'
                  }} />
                </div>
              </div>
            </label>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <button 
            onClick={saveSettings}
            style={{ 
              backgroundColor: '#eb5b27', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontWeight: '600'
            }}
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
