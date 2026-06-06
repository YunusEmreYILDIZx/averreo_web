import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, X, Save, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductManager({ products, token, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = (id, product) => {
    setEditingId(id);
    // Deep copy to avoid mutating state directly
    setFormData(JSON.parse(JSON.stringify(product)));
  };

  const handleAddNew = () => {
    const newId = `prod_${Date.now()}`;
    setEditingId(newId);
    setFormData({
      id: newId,
      image: '',
      tr: { name: '', category: 'Operasyonel İHA', breadcrumb: '', description: '', details: '', features: [{title:'', value:''}] },
      en: { name: '', category: 'Operational UAV', breadcrumb: '', description: '', details: '', features: [{title:'', value:''}] }
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(null);
    setError('');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadFormData = new FormData(); // Not used because our backend expects raw binary in request body and headers.
      // Wait, server.js /api/upload uses:
      // const filename = decodeURIComponent(req.headers['x-file-name'] || 'upload.bin');
      // const fileType = req.headers['x-file-type'] === 'video' ? 'videos' : 'images';
      // req.pipe(writeStream);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-file-name': encodeURIComponent(file.name),
          'x-file-type': file.type.startsWith('video') ? 'video' : 'image',
          'Content-Type': file.type || 'application/octet-stream'
        },
        body: file // send raw file
      });
      
      const data = await res.json();
      if (data.success) {
        setFormData({...formData, image: data.path.substring(1)}); // e.g. assets/images/file.png
      } else {
        setError(data.error || 'Dosya yüklenemedi.');
      }
    } catch (err) {
      setError('Yükleme sırasında hata oluştu.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedProducts = { ...products, [formData.id]: formData };
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProducts)
      });
      const data = await res.json();
      if (data.success) {
        onRefresh();
        handleCancel();
        window.dispatchEvent(new Event('productsUpdated'));
      } else {
        setError(data.error || 'Kaydedilemedi.');
      }
    } catch (err) {
      setError('Kaydetme hatası.');
    }
  };

  const handleMove = async (id, direction) => {
    const entries = Object.entries(products);
    const index = entries.findIndex(([key]) => key === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === entries.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const temp = entries[index];
    entries[index] = entries[targetIndex];
    entries[targetIndex] = temp;

    const newProducts = {};
    for (const [k, v] of entries) {
      newProducts[k] = v;
    }

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProducts)
      });
      const data = await res.json();
      if (data.success) {
        onRefresh();
        window.dispatchEvent(new Event('productsUpdated'));
      } else {
        alert(data.error || 'Sıralama kaydedilemedi.');
      }
    } catch (err) {
      alert('Sıralama işlemi başarısız oldu.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    try {
      const updatedProducts = { ...products };
      delete updatedProducts[id];
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProducts)
      });
      const data = await res.json();
      if (data.success) {
        onRefresh();
        window.dispatchEvent(new Event('productsUpdated'));
      }
    } catch (err) {
      alert('Silme işlemi başarısız oldu.');
    }
  };

  const addFeature = (lang) => {
    const newData = { ...formData };
    newData[lang].features.push({ title: '', value: '' });
    setFormData(newData);
  };

  const updateFeature = (lang, index, key, value) => {
    const newData = { ...formData };
    newData[lang].features[index][key] = value;
    setFormData(newData);
  };

  const removeFeature = (lang, index) => {
    const newData = { ...formData };
    newData[lang].features.splice(index, 1);
    setFormData(newData);
  };

  if (editingId && formData) {
    return (
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative">
        <button onClick={handleCancel} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">
          {products[editingId] ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
        </h2>
        
        {error && <div className="bg-red-500/20 text-red-400 p-4 rounded-xl mb-6">{error}</div>}

        <div className="space-y-8">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Ürün Görseli (Dosyayı Seçin)</label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <img src={`/${formData.image}`} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-white/10" />
              )}
              <label className="flex items-center justify-center w-full max-w-sm h-24 border-2 border-dashed border-white/20 rounded-xl hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                <div className="flex flex-col items-center gap-2 text-white/50">
                  <Upload size={20} />
                  <span>{isUploading ? 'Yükleniyor...' : 'Bilgisayardan Seç'}</span>
                </div>
              </label>
            </div>
            <div className="mt-2 text-xs text-white/40">Mevcut Yol: {formData.image}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* TR Form */}
            <div className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold border-b border-white/10 pb-2">Türkçe (TR)</h3>
              
              <div>
                <label className="block text-xs text-white/50 mb-1">Ürün Adı</label>
                <input type="text" value={formData.tr.name} onChange={e => setFormData({...formData, tr: {...formData.tr, name: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Kategori</label>
                <select value={formData.tr.category || ''} onChange={e => setFormData({...formData, tr: {...formData.tr, category: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none appearance-none">
                  <option value="" disabled>Seçiniz</option>
                  <option value="Operasyonel İHA">Operasyonel İHA</option>
                  <option value="Gözetleme İHA">Gözetleme İHA</option>
                  <option value="Lojistik İHA">Lojistik İHA</option>
                  <option value="Denizcilik İDA">Denizcilik İDA</option>
                  <option value="Tarımsal İHA">Tarımsal İHA</option>
                  <option value="Endüstriyel İHA">Endüstriyel İHA</option>
                  <option value="Bilimsel Araştırma İDA">Bilimsel Araştırma İDA</option>
                  <option value="Kamikaze İHA">Kamikaze İHA</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Breadcrumb (Örn: Savunma &gt; İHA &gt; Sokak)</label>
                <input type="text" value={formData.tr.breadcrumb} onChange={e => setFormData({...formData, tr: {...formData.tr, breadcrumb: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Açıklama</label>
                <textarea value={formData.tr.description} onChange={e => setFormData({...formData, tr: {...formData.tr, description: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none h-24" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Detay Bilgileri</label>
                <textarea value={formData.tr.details || ''} onChange={e => setFormData({...formData, tr: {...formData.tr, details: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none h-32" placeholder="Ürünle ilgili geniş açıklamalar..." />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs text-white/50">Özellikler (Menzil, Hız vb.)</label>
                  <button onClick={() => addFeature('tr')} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors text-white">+ Ekle</button>
                </div>
                <div className="space-y-2">
                  {formData.tr.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input type="text" placeholder="Başlık (Menzil)" value={feat.title} onChange={e => updateFeature('tr', idx, 'title', e.target.value)} className="w-1/2 bg-black border border-white/10 rounded-lg p-2 text-xs text-white" />
                      <input type="text" placeholder="Değer (150 km)" value={feat.value} onChange={e => updateFeature('tr', idx, 'value', e.target.value)} className="w-1/2 bg-black border border-white/10 rounded-lg p-2 text-xs text-white" />
                      <button onClick={() => removeFeature('tr', idx)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg"><X size={14}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EN Form */}
            <div className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold border-b border-white/10 pb-2">English (EN)</h3>
              
              <div>
                <label className="block text-xs text-white/50 mb-1">Product Name</label>
                <input type="text" value={formData.en.name} onChange={e => setFormData({...formData, en: {...formData.en, name: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Category</label>
                <select value={formData.en.category || ''} onChange={e => setFormData({...formData, en: {...formData.en, category: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none appearance-none">
                  <option value="" disabled>Select</option>
                  <option value="Operational UAV">Operational UAV</option>
                  <option value="Surveillance UAV">Surveillance UAV</option>
                  <option value="Logistics UAV">Logistics UAV</option>
                  <option value="Maritime USV">Maritime USV</option>
                  <option value="Agricultural UAV">Agricultural UAV</option>
                  <option value="Industrial UAV">Industrial UAV</option>
                  <option value="Scientific Research USV">Scientific Research USV</option>
                  <option value="Kamikaze UAV">Kamikaze UAV</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Breadcrumb (e.g. Defense &gt; UAV &gt; Sokak)</label>
                <input type="text" value={formData.en.breadcrumb} onChange={e => setFormData({...formData, en: {...formData.en, breadcrumb: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Description</label>
                <textarea value={formData.en.description} onChange={e => setFormData({...formData, en: {...formData.en, description: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none h-24" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Detailed Information</label>
                <textarea value={formData.en.details || ''} onChange={e => setFormData({...formData, en: {...formData.en, details: e.target.value}})} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white focus:border-white/30 outline-none h-32" placeholder="Detailed description of the product..." />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs text-white/50">Features (Range, Speed etc.)</label>
                  <button onClick={() => addFeature('en')} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors text-white">+ Ekle</button>
                </div>
                <div className="space-y-2">
                  {formData.en.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input type="text" placeholder="Title (Range)" value={feat.title} onChange={e => updateFeature('en', idx, 'title', e.target.value)} className="w-1/2 bg-black border border-white/10 rounded-lg p-2 text-xs text-white" />
                      <input type="text" placeholder="Value (150 km)" value={feat.value} onChange={e => updateFeature('en', idx, 'value', e.target.value)} className="w-1/2 bg-black border border-white/10 rounded-lg p-2 text-xs text-white" />
                      <button onClick={() => removeFeature('en', idx)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg"><X size={14}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
            <button onClick={handleCancel} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 font-medium transition-colors">
              İptal
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 font-bold transition-colors">
              <Save size={18} /> Kaydet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-1">Ürün Yönetimi</h2>
          <p className="text-white/50">Tüm otonom sistemleri buradan ekleyebilir ve düzenleyebilirsiniz.</p>
        </div>
        <button onClick={handleAddNew} className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
          <Plus size={20} /> Yeni Ürün
        </button>
      </div>

      {!products ? (
        <div className="flex items-center justify-center h-64 text-white/50">Ürün verisi yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(products).map(([id, product], index) => (
            <div key={id} className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors group">
              <div className="h-48 relative overflow-hidden bg-black/50">
                {product.image && (
                  <img src={`/${product.image}`} alt={product.tr.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80" />
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-5 right-4 flex gap-2">
                  <button onClick={() => handleMove(id, 'up')} disabled={index === 0} className="p-2.5 bg-blue-500/20 backdrop-blur-md rounded-full text-blue-400 hover:bg-blue-500/40 transition-colors shadow-lg disabled:opacity-30 disabled:cursor-not-allowed" title="Sola Kaydır (Öne Al)">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => handleMove(id, 'down')} disabled={index === Object.keys(products).length - 1} className="p-2.5 bg-blue-500/20 backdrop-blur-md rounded-full text-blue-400 hover:bg-blue-500/40 transition-colors shadow-lg disabled:opacity-30 disabled:cursor-not-allowed" title="Sağa Kaydır (Geriye Al)">
                    <ChevronRight size={16} />
                  </button>
                  <button onClick={() => handleEdit(id, product)} className="p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors shadow-lg" title="Düzenle">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(id)} className="p-2.5 bg-red-500/20 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500/40 transition-colors shadow-lg" title="Sil">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{product.tr.name}</h3>
                <p className="text-sm text-white/50">{product.tr.category}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tr.features.slice(0,2).map((f, i) => (
                    <span key={i} className="text-xs bg-white/5 border border-white/10 rounded-md px-2 py-1 text-white/70">
                      {f.title}: {f.value}
                    </span>
                  ))}
                  {product.tr.features.length > 2 && (
                    <span className="text-xs bg-white/5 border border-white/10 rounded-md px-2 py-1 text-white/50">
                      +{product.tr.features.length - 2} özellik
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
