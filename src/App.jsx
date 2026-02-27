import "./App.css";
import { Hello } from "./components/Hello";
import { Card } from "./components/Card";
import { Deck } from "./components/Deck";

function App() {
  return (
    <>
      <div>
        <Hello />
        <Card />
        <div className="py-2" />
        <Deck />
      </div>
    </>
  );
}

export default App;
