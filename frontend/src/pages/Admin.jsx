import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut, Package } from 'lucide-react';
import ProductManager from '../components/admin/ProductManager';
import CompanyManager from '../components/admin/CompanyManager';

export default function Admin() {
  const [token, setToken] = useState(sessionStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState(null);
  const [company, setCompany] = useState(null);
  
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  const fetchData = () => {
    if (token) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Products fetch error:', err));
        
      fetch('/api/company')
        .then(res => res.json())
        .then(data => setCompany(data))
        .catch(err => console.error('Company fetch error:', err));
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        sessionStorage.setItem('adminToken', data.token);
      } else {
        setError(data.error || 'Hatalı kullanıcı adı veya şifre');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu');
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('adminToken');
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        <form onSubmit={handleLogin} className="bg-[#080808]/80 backdrop-blur-xl p-10 rounded-3xl border border-white/10 flex flex-col gap-5 w-96 relative z-10 shadow-2xl">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">Admin Girişi</h2>
            <p className="text-white/50 text-sm mt-2">Averreo Industries Yönetim Paneli</p>
          </div>
          
          {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center border border-red-500/20">{error}</div>}
          
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Kullanıcı Adı" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 outline-none text-white transition-all placeholder:text-white/30"
            />
            <input 
              type="password" 
              placeholder="Şifre" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 outline-none text-white transition-all placeholder:text-white/30"
            />
          </div>

          <button type="submit" className="w-full p-4 bg-white text-black font-bold rounded-xl mt-4 hover:bg-gray-200 transition-colors">
            Giriş Yap
          </button>
          
          <button type="button" onClick={() => navigate('/')} className="text-white/40 text-sm mt-4 hover:text-white transition-colors">
            &larr; Siteye Dön
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050505] border-r border-white/10 flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-tight">Averreo</h1>
          <p className="text-white/40 text-sm mt-1">Yönetim Paneli</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-white text-black font-medium' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Package size={20} />
            Ürünler
          </button>
          <button 
            onClick={() => setActiveTab('company')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'company' ? 'bg-white text-black font-medium' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Settings size={20} />
            Şirket Bilgileri
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors">
            <LayoutDashboard size={20} />
            Siteye Dön
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-colors">
            <LogOut size={20} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'products' && (
            <ProductManager products={products} token={token} onRefresh={fetchData} />
          )}
          
          {activeTab === 'company' && (
            <CompanyManager company={company} token={token} onRefresh={fetchData} />
          )}
        </div>
      </main>
    </div>
  );
}
