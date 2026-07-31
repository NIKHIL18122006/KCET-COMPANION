import Approutes from "./routes/AppRoutes";
import Navbar from "./components/Common/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="pt-20">
        <Approutes />
      </main>
    </div>
  );
}

export default App;