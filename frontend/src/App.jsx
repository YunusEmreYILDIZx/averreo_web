import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Misyon from './pages/Misyon';
import Haberler from './pages/Haberler';
import Liderlik from './pages/Liderlik';

import PageTransition from './components/PageTransition';

function App() {
  return (
    <BrowserRouter>
      <PageTransition>
        {(displayLocation) => (
          <Routes location={displayLocation}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="misyon" element={<Misyon />} />
              <Route path="haberler" element={<Haberler />} />
              <Route path="liderlik" element={<Liderlik />} />
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
