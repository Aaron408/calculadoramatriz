import React, { useState } from "react";
import Fraction from "fraction.js";

function App() {
  const [x1, setA1] = useState("");
  const [y1, setB1] = useState("");
  const [x2, setA2] = useState("");
  const [y2, setB2] = useState("");

  const [independiente1, setC1] = useState("");
  const [independiente2, setC2] = useState("");

  const [op1, setOp1] = useState("+");
  const [op2, setOp2] = useState("+");

  const [procedimiento, setProcedimiento] = useState(null);
  const [resultado, setResultado] = useState(null);

  const handleChange = (setter) => (e) => {
    const value = e.target.value;

    if (/^-?\d*\/?\d*$/.test(value) || value === "-") {
      setter(value);
    }
  };

  const calcular = (e) => {
    e.preventDefault();

    if(!x1 || !x2 || !y1 || !y2 || !independiente1 || !independiente2){
      alert("Llena correctamente el formulario");
      return;
    }

    const Y1_conjunto = op1 === "+" ? y1 : "-" + y1;
    const Y2_conjunto = op2 === "+" ? y2 : "-" + y2;

    const X1 = new Fraction(x1);
    const Y1 = new Fraction(Y1_conjunto);
    const INDEPENDIENTE1 = new Fraction(independiente1);
    const X2 = new Fraction(x2);
    const Y2 = new Fraction(Y2_conjunto);
    const INDEPENDIENTE2 = new Fraction(independiente2);

    const D = X1.mul(Y2).sub(X2.mul(Y1));
    const Dx = INDEPENDIENTE1.mul(Y2).sub(INDEPENDIENTE2.mul(Y1));
    const Dy = X1.mul(INDEPENDIENTE2).sub(X2.mul(INDEPENDIENTE1));

    if (!D.equals(0)) {
      const x = Dx.div(D);
      const y = Dy.div(D);
      setResultado({ x: x.toFraction(), y: y.toFraction() });
      setProcedimiento(`
      Δ = (${X1.toFraction()})(${Y2.toFraction()}) - (${X2.toFraction()})(${Y1.toFraction()}) = ${D.toFraction()}

      Determinante X:
      Δx = (${INDEPENDIENTE1.toFraction()})(${Y2.toFraction()}) - (${INDEPENDIENTE2.toFraction()})(${Y1.toFraction()}) = ${Dx.toFraction()}
        X = Δx/Δ = ${Dx.toFraction()}/${D.toFraction()} = ${x.toFraction()}

      Determinante Y:
      Δy = (${X1.toFraction()})(${INDEPENDIENTE2.toFraction()}) - (${X2.toFraction()})(${INDEPENDIENTE1.toFraction()}) = ${Dy.toFraction()}
        Y = Δy/Δ = ${Dy.toFraction()}/${D.toFraction()} = ${y.toFraction()}
    `);
    } else {
      setResultado(
        "El sistema no tiene solución ya que la determinante es igual a 0."
      );
      setProcedimiento(null);
    }
  };

  return (
    <div className="container">
      <h1>Calculadora de Matrices</h1>

      <div className="input-group">
        <input value={x1} onChange={handleChange(setA1)} placeholder="aX"/>x{" "}
        <select value={op1} onChange={(e) => setOp1(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
        <input value={y1} onChange={handleChange(setB1)} placeholder="aY"/>
        y =
        <input value={independiente1} onChange={handleChange(setC1)} placeholder="Result"/>
      </div>

      <div className="input-group">
        <input value={x2} onChange={handleChange(setA2)} placeholder="aX" />x{" "}
        <select value={op2} onChange={(e) => setOp2(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
        <input value={y2} onChange={handleChange(setB2)} placeholder="aY" />
        y =
        <input value={independiente2} onChange={handleChange(setC2)} placeholder="Result" />
      </div>

      <button onClick={calcular}>Calcular</button>

      {procedimiento && (
        <div>
          <h3>Procedimiento:</h3>
          <pre>{procedimiento}</pre>
        </div>
      )}

      {resultado && (
        <div>
          <h3>Resultado:</h3>
          <p>
            x = {resultado.x}, y = {resultado.y}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
