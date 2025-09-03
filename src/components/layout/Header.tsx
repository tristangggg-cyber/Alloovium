'use client';

import { Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">RFI Assistant</h1>
                <p className="text-xs text-muted-foreground">Construction Intelligence Platform</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Analytics
            </a>
            <Button size="sm">Demo Mode</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <a href="#" className="px-2 py-2 text-sm font-medium text-foreground hover:text-primary">
                Dashboard
              </a>
              <a href="#" className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary">
                Projects
              </a>
              <a href="#" className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary">
                Analytics
              </a>
              <div className="px-2 pt-2">
                <Button size="sm" className="w-full">Demo Mode</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}