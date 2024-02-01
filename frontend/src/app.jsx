import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConferencePage from './pages/ConferencePage';
import MainLayoutRoutes from './routes/MainLayoutRoutes';
import './app.css';


function App({ authService , imageUploader}) {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          {/* 컨퍼런스(내비게이션바 X) */}
          <Route path="/conference/:id" element={<ConferencePage />} />
          <Route path="*" element={<MainLayoutRoutes authService={authService} imageUploader= {imageUploader} />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;