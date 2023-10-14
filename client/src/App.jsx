import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import GetAllMedicines from './pages/GetAllMedicines'

// components
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/viewAllMedicines"
              element={<GetAllMedicines />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;