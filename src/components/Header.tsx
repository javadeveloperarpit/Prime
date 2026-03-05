import React, { useState } from 'react';
import { LogIn, User, Lock, Mail } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { cn } from '../lib/utils';
import Image from "next/image"


interface HeaderProps {
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  t: any;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, setIsAdmin, t }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [clickCount, setClickCount] = useState(0);

const handleSecretClick = () => {
  setClickCount(prev => {
    const newCount = prev + 1;
    if (newCount >= 5) {
      setShowAdminLogin(true);
      return 0;
    }
    return newCount;
  });
};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAdmin(true);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError('Invalid credentials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 py-4 px-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-4">
        <div className="rotating-logo-container">
    <div className="rotating-logo-inner">
      <Image
        src="https://yielding-silver-7lbswgmn7e.edgeone.app/p.jpg"
        onClick={handleSecretClick}
        width={400}
 height={250}
 
        alt="Prime Bharat News"
        className="rotating-logo-front"
      />
      <Image
        src="https://yielding-silver-7lbswgmn7e.edgeone.app/p.jpg"
        onClick={handleSecretClick}
        width={400}
 height={250}
 alt="news"
        alt="Prime Bharat News"
        className="rotating-logo-back"
      />
    </div>
  </div>
        <div className="block">
  <h1 className="text-xl md:text-3xl font-black tracking-tighter text-brand-red dark:text-white uppercase italic">
    PRIME <span className="text-brand-red">भारत</span> NEWS
  </h1>
  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-700 dark:text-gray-300">
    {t.truth} • {t.integrity} • {t.excellence}
  </p>
</div>
      </div>

      <div className="flex items-center">
        {isAdmin ? (
  <div className="flex items-center space-x-4">
    <span className="text-sm font-medium text-green-600 flex items-center">
      <User size={16} className="mr-1" /> {t.adminActive}
    </span>
    <button
      onClick={handleLogout}
      className="bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold"
    >
      {t.logout}
    </button>
  </div>
) : (
  showAdminLogin && (
    <form onSubmit={handleLogin} className="flex flex-wrap items-center gap-2 justify-center">
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 pr-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-xs focus:ring-1 focus:ring-brand-red outline-none w-40"
                required
              />
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="password" 
                placeholder={t.password} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-xs focus:ring-1 focus:ring-brand-red outline-none w-40"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-brand-red hover:bg-red-900 text-white px-4 py-2 rounded text-xs font-bold transition-colors flex items-center"
            >
              {loading ? '...' : <LogIn size={14} className="mr-1" />} {t.login}
            </button>
            <div 
  onClick={() => setShowAdminLogin(!showAdminLogin)}
  className="w-3 h-3 bg-transparent hover:bg-zinc-400 rounded-full cursor-pointer"
  title="."
></div>
            {error && <p className="text-[10px] text-brand-red w-full text-center mt-1">{error}</p>}
          </form>)
        )}
      </div>
    </div>
  );
};
