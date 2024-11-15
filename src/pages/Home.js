import React from 'react'
import { ArrowRight, LogIn, UserPlus, Layout, Database } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Progress Tracker System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A sample application showcasing DataFlower's Backend-as-a-Service capabilities
          </p>
          <div className="flex justify-center gap-6">
            <a href="/signin" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </a>
            <a href="/signup" className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors">
              <UserPlus className="mr-2 h-5 w-5" />
              Sign Up
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Database className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Database</h3>
            <p className="text-gray-600">Store and manage your documents with DataFlower's powerful database system.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Layout className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Authentication</h3>
            <p className="text-gray-600">Secure user authentication and authorization powered by DataFlower.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Database className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Storage</h3>
            <p className="text-gray-600">Upload and manage files with DataFlower's storage solution.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home