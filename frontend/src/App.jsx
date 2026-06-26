import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Platformlar from './pages/Platformlar';
import Cozumler from './pages/Cozumler';
import Hakkimizda from './pages/Hakkimizda';
import Ekip from './pages/Ekip';
import Iletisim from './pages/Iletisim';
import Kvkk from './pages/Kvkk';

import PageTransition from './components/PageTransition';

function App() {
  return (
    <BrowserRouter>
      <PageTransition>
        {(displayLocation) => (
          <Routes location={displayLocation}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="platformlar" element={<Platformlar />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cozumler" element={<Cozumler />} />
              <Route path="hakkimizda" element={<Hakkimizda />} />
              <Route path="ekip" element={<Ekip />} />
              <Route path="iletisim" element={<Iletisim />} />
              <Route path="kvkk" element={<Kvkk />} />
            </Route>
            {/* Admin is outside Layout to have its own design or no public navbar */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        )}
      </PageTransition>
    </BrowserRouter>
  );
}

export default App;
