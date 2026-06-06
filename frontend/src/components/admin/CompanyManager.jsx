import { useState } from 'react';
import { Save } from 'lucide-react';

export default function CompanyManager({ company, token, onRefresh }) {
  const [formData, setFormData] = useState(company ? JSON.parse(JSON.stringify(company)) : null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async () => {
    try {
      const res = await fetch('/api/save-company', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        onRefresh();
        setSuccessMsg('Şirket bilgileri başarıyla güncellendi.');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setError(data.error || 'Kaydedilemedi.');
      }
    } catch (err) {
      setError('Kaydetme hatası.');
    }
  };

  if (!formData) {
    return <div className="text-white/50">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-1">Şirket Bilgileri</h2>
          <p className="text-white/50">Kurumsal sayfaların içeriklerini yönetin.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
          <Save size={20} /> Kaydet
        </button>
      </div>

      {error && <div className="bg-red-500/20 text-red-400 p-4 rounded-xl mb-6">{error}</div>}
      {successMsg && <div className="bg-green-500/20 text-green-400 p-4 rounded-xl mb-6">{successMsg}</div>}

      <div className="space-y-8">
        {/* Misyon */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Misyon & Vizyon (TR)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1">Ana Başlık</label>
              <input type="text" value={formData.misyon.tr.mainTitle} onChange={e => setFormData({...formData, misyon: {...formData.misyon, tr: {...formData.misyon.tr, mainTitle: e.target.value}}})} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-white/30 outline-none" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Ana Metin</label>
              <textarea value={formData.misyon.tr.mainText} onChange={e => setFormData({...formData, misyon: {...formData.misyon, tr: {...formData.misyon.tr, mainText: e.target.value}}})} className="w-full h-32 bg-black border border-white/10 rounded-lg p-3 text-white focus:border-white/30 outline-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-sm text-white/40 italic">
        * Not: Diğer şirket bilgilerini (Haberler, Liderlik, İngilizce Metinler) yönetmek için daha kapsamlı formlar sonraki aşamalarda eklenecektir. Şu an sadece TR Misyon düzenlemesi aktiftir.
      </div>
    </div>
  );
}
