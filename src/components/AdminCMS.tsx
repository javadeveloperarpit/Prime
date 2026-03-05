import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Video as VideoIcon, Zap } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc,serverTimestamp, Timestamp } from 'firebase/firestore';
import { Article, Video, BreakingNews, BusinessAd, LiveTv } from '../types';


interface AdminCMSProps {
  articles: Article[];
  videos: Video[];
  breakingNews: BreakingNews[];
   businessAds: BusinessAd[]; // business category articles
  liveTv: LiveTv[];

}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  articles = [],
  videos = [],
  breakingNews = [],
  businessAds = [],
  liveTv = []
}): any => {
  const [activeTab, setActiveTab] = useState<'articles' | 'videos' | 'breaking' | 'business' | 'liveTv'>('articles');
  
  
  // Form states
  const [articleForm, setArticleForm] = useState({ title: '', image: '', description: '', category: 'national' });
  const [videoForm, setVideoForm] = useState({ title: '', youtubeUrl: '' });
  const [breakingForm, setBreakingForm] = useState({ text: '' });
const [businessForm, setBusinessForm] = useState({
  title: '',
  imageUrl: '',
  link: ''
});
const expiresAt = Timestamp.fromDate(
  new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
);
  const [liveTvForm, setLiveTvForm] = useState({ title: '', url: '' });

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'articles'), {
        ...articleForm,
        createdAt: serverTimestamp()
      });
      setArticleForm({ title: '', image: '', description: '', category: 'national' });
    } catch (err) { console.error(err); }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'videos'), {
        ...videoForm,
        createdAt: serverTimestamp()
      });
      setVideoForm({ title: '', youtubeUrl: '' });
    } catch (err) { console.error(err); }
  };

  const handleAddBreaking = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!breakingForm.text?.trim()) {
    alert("Breaking news text required");
    return;
  }

  try {

    // 24 hours expiry calculate
    const expiresAt = Timestamp.fromDate(
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    await addDoc(collection(db, "breakingNews"), {
      text: breakingForm.text.trim(),
      createdAt: serverTimestamp(),
      expiresAt: expiresAt
    });

    setBreakingForm({ text: "" });
    alert("Breaking news added successfully");

  } catch (err) {
    console.error(err);
  }
};
    const handleAddBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'businessAds'), {
  ...businessForm,
  totalClicks: 0,   
  createdAt: serverTimestamp()
});
      setBusinessForm({ title: '', imageUrl: '', link: '' });
    } catch (err) { console.error(err); }
  };

  const handleAddLiveTv = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'liveTv'), {
        ...liveTvForm,
        createdAt: serverTimestamp()
      });
      setLiveTvForm({ title: '', url: '' });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (coll: string, id: string) => {
  try {
    await deleteDoc(doc(db, coll, id));
    alert('Deleted successfully');
  } catch (err) {
    console.error(err);
    alert('Delete failed. Check Firebase rules.');
  }
};

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-12 px-6 border-t-8 border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-brand-navy dark:text-white uppercase italic">
            Admin <span className="text-brand-red">CMS Panel</span>
          </h2>
          <div className="flex bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'articles' ? 'bg-brand-red text-white shadow-md' : 'text-zinc-500 hover:text-white'}`}
            >
              Articles
            </button>
            <button 
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'videos' ? 'bg-brand-red text-white shadow-md' : 'text-zinc-500 hover:text-white'}`}
            >
              Videos
            </button>
            <button 
              onClick={() => setActiveTab('breaking')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'breaking' ? 'bg-brand-red text-white shadow-md' : 'text-zinc-500 hover:text-white'}`}
            >
              Breaking News
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'business' ? 'bg-brand-red text-white shadow-md' : 'text-zinc-500 hover:text-white'}`}
            >
              Business
            </button>
            <button 
              onClick={() => setActiveTab('liveTv')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'liveTv' ? 'bg-brand-red text-white shadow-md' : 'text-zinc-500 hover:text-white'}`}
            >
              Live TV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-black mb-6 uppercase flex items-center">
              <Plus className="mr-2 text-brand-red" size={20} />
              Add New {activeTab === 'articles' ? 'Article' : activeTab === 'videos' ? 'Video' : 'Breaking News'}
            </h3>

            {activeTab === 'articles' && (
              <form onSubmit={handleAddArticle} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-white">Title</label>
                  <input 
                    type="text" 
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                    className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm"
                    placeholder="Article headline..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    value={articleForm.image}
                    onChange={(e) => setArticleForm({...articleForm, image: e.target.value})}
                    className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm"
                    placeholder="https://picsum.photos/..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1">Category</label>
                  <select 
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                    className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm"
                  >
                    <option value="national">National</option>
                    <option value="international">International</option>
                    <option value="business">Business</option>
                    <option value="sports">Sports</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1">Description</label>
                  <textarea 
                    value={articleForm.description}
                    onChange={(e) => setArticleForm({...articleForm, description: e.target.value})}
                    className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm h-32"
                    placeholder="Full article content..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-red text-white py-3 rounded-lg font-black uppercase tracking-widest hover:bg-red-700 transition-all">
                  Publish Article
                </button>
              </form>
            )}

            {activeTab === 'videos' && (
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1">Video Title</label>
                  <input 
                    type="text" 
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                    className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm"
                    placeholder="Video headline..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1">YouTube ID</label>
                  <input 
  type="text"
  value={videoForm.youtubeUrl}
  onChange={(e) => setVideoForm({...videoForm, youtubeUrl: e.target.value})}
  className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm"
  placeholder="Paste full YouTube link..."
  required
/>
                </div>
                <button type="submit" className="w-full bg-brand-red text-white py-3 rounded-lg font-black uppercase tracking-widest hover:bg-red-700 transition-all">
                  Upload Video
                </button>
              </form>
            )}

            {activeTab === 'breaking' && (
              <form onSubmit={handleAddBreaking} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1">Breaking News Text</label>
                  <textarea 
                    value={breakingForm.text}
                    onChange={(e) => setBreakingForm({...breakingForm, text: e.target.value})}
                    className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm h-32"
                    placeholder="Enter short breaking news alert..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-red text-white hover:bg-red-700 py-3 rounded-lg font-black uppercase tracking-widest hover:bg-yellow-400 transition-all">
                  Post Alert
                </button>
              </form>
            )}
           {activeTab === 'business' && (
  <form onSubmit={handleAddBusiness} className="space-y-4">
    
    <input
      type="text"
      placeholder="Ad Title"
      value={businessForm.title}
      onChange={e => setBusinessForm({ ...businessForm, title: e.target.value })}
      className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white"
      required
    />

    <input
      type="text"
      placeholder="Image URL"
      value={businessForm.imageUrl}
      onChange={e => setBusinessForm({ ...businessForm, imageUrl: e.target.value })}
      className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white"
      required
    />

    <input
      type="text"
      placeholder="Target Link (https://...)"
      value={businessForm.link}
      onChange={e => setBusinessForm({ ...businessForm, link: e.target.value })}
      className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white"
      required
    />

    <button
      type="submit"
      className="w-full bg-brand-red text-white py-3 rounded-lg font-black uppercase"
    >
      Publish Ad
    </button>
  </form>
)}

 {activeTab === 'liveTv' && (
  <form onSubmit={handleAddLiveTv} className="space-y-4">
    <div>
      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1">
        Channel Title
      </label>
      <input
        type="text"
        value={liveTvForm.title}
        onChange={e => setLiveTvForm({ ...liveTvForm, title: e.target.value })}
        className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm"
        required
      />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1">
        Live TV URL
      </label>
      <input
        type="text"
        value={liveTvForm.url}
        onChange={e => setLiveTvForm({ ...liveTvForm, url: e.target.value })}
        className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-white border-none focus:ring-2 focus:ring-brand-red outline-none text-sm"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-brand-red text-white py-3 rounded-lg font-black uppercase tracking-widest hover:bg-red-700 transition-all"
    >
      Add Live TV
    </button>
  </form>
)}
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-black mb-6 uppercase">Manage Content</h3>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {activeTab === 'articles' && articles.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-white rounded-xl border border-zinc-100 dark:border-zinc-700">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <h4 className="font-bold text-sm line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] uppercase font-black text-brand-red">{item.category}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete('articles', item.id)} className="text-zinc-400 hover:text-brand-red transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {activeTab === 'videos' && videos.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-white rounded-xl border border-zinc-100 dark:border-zinc-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded flex items-center justify-center">
                      <VideoIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] uppercase font-black text-zinc-400">{item.youtubeUrl}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete('videos', item.id)} className="text-zinc-400 hover:text-brand-red transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {activeTab === 'breaking' && breakingNews.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700">
                  <div className="flex items-center space-x-4">
                    <Zap size={20} className="text-brand-yellow" />
                    <h4 className="font-bold text-sm line-clamp-1">{item.text}</h4>
                  </div>
                  <button onClick={() => handleDelete('breakingNews', item.id)} className="text-zinc-400 hover:text-brand-red transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {activeTab === 'business' && businessAds?.map(item => (
  <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border">
    
    <div className="flex items-center space-x-4">
      <img
        src={item.imageUrl}
        className="w-16 h-16 object-contain rounded"
      />
      <div>
        <h4 className="font-bold text-sm">{item.title}</h4>

<p className="text-xs text-zinc-400 line-clamp-1">
  {item.link}
</p>

<p className="text-[11px] font-black text-brand-gold mt-1 uppercase tracking-wider">
  🔥 {item.totalClicks ?? 0} Clicks
</p>
      </div>
    </div>

    <button
      onClick={() => handleDelete('businessAds', item.id)}
      className="text-zinc-400 hover:text-red-500"
    >
      <Trash2 size={18} />
    </button>

  </div>
))}

  {activeTab === 'liveTv' && liveTv?.map(item => (
    <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border">
      <div>
        <h4 className="text-[11px] font-black text-brand-gold mt-1 uppercase tracking-wider" >{item.title}</h4>
        <span className="text-xs text-zinc-400 line-clamp-1">{item.url}</span>
      </div>
      <button onClick={() => handleDelete('liveTv', item.id)}
        className="text-zinc-400 hover:text-red-500">Delete</button>
    </div>
  ))}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
