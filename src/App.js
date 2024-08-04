import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import Body from "./Body/Body";
import Register from "./GetStarted/Register";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  const handleToggleRegister = () => {
    setShowRegister((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Navbar onRegisterClick={handleToggleRegister} />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          <Route path="/" element={<Body />} />
          {/* Add other routes here */}
        </Routes>
      </div>
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </BrowserRouter>
  );
}

export default App;
/* <BrowserRouter>
<div className="App">
<Navbar />
<main>
  
</main>
</div>
</BrowserRouter>
*/
