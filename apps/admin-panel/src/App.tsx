import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Plugins from './pages/Plugins';
import Settings from './pages/Settings';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<Customers />} />
        <Route path="/plugins" element={<Plugins />} />
        <Route path="/plugins/:id" element={<Plugins />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
