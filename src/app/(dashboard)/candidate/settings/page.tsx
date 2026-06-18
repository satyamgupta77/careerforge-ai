import React from 'react';
import { User, Lock, Bell, Eye, Shield, Globe } from 'lucide-react';

export default function CandidateSettings() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 floating-island mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500 mt-1">Manage your preferences, privacy, and account details.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-2 floating-island sticky top-6">
              {[
                { label: 'Profile Information', icon: User, active: true },
                { label: 'Security', icon: Lock },
                { label: 'Notifications', icon: Bell },
                { label: 'Privacy', icon: Eye },
                { label: 'Preferences', icon: Globe },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-100 floating-island hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="w-20 h-20 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-blue-600 font-bold text-2xl shrink-0">
                    AL
                  </div>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm w-full sm:w-auto">
                    Change Avatar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" defaultValue="Alex" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" defaultValue="Lee" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" defaultValue="alex.lee@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Headline</label>
                    <input type="text" defaultValue="Senior Frontend Engineer | React & Next.js Enthusiast" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md w-full sm:w-auto">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-100 floating-island hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Profile Visibility
              </h2>
              <p className="text-gray-500 mb-6 text-sm">Control who can see your profile and resume.</p>
              
              <div className="space-y-4">
                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="visibility" className="mt-1 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <div>
                    <h4 className="font-semibold text-gray-900">Public (Recommended)</h4>
                    <p className="text-sm text-gray-500">Recruiters can find you and view your profile.</p>
                  </div>
                </label>
                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="visibility" className="mt-1 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Private</h4>
                    <p className="text-sm text-gray-500">Your profile is hidden. Only companies you apply to can see it.</p>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
