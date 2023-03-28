import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Background from "./img/background.jpg";

const App = () => {
  return (
    <div
      class="bg-image"
      style={{
        backgroundImage: `url(${Background})`,
        height: `100vh`,
      }}
    >
      <Container
        style={{
          background: "#4d5953",
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "100%",
        }}
      >
        <Router>
          <Routes>
            <Route path="" element={<Dashboard />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
};

export default App;
