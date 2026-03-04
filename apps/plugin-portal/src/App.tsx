// React import removed
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Marketplace from './pages/Marketplace';
import PluginDetail from './pages/PluginDetail';
import MyPlugins from './pages/MyPlugins';
import Developer from './pages/Developer';
import SubmitPlugin from './pages/SubmitPlugin';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/plugin/:id" element={<PluginDetail />} />
        <Route path="/my-plugins" element={<MyPlugins />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/developer/submit" element={<SubmitPlugin />} />
      </Routes>
    </Layout>
  );
}

export default App;
