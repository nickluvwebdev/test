"use client";
import { useState } from "react";

export default function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState({
    inc: 0,
    dec: 0,
    reset: 0,
    double: 0,
  });

  const totalClicks = clicks.inc + clicks.dec + clicks.reset + clicks.double;

  return (
    <div className="card text-center">
      <h2 className="text-2xl font-bold mb-4">Advanced Counter</h2>

      <div className="bg-gray-100 py-8 rounded-lg mb-6 text-5xl font-bold text-blue-700">
        {count}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => {
            setCount((c) => c + 1);
            setClicks((p) => ({ ...p, inc: p.inc + 1 }));
          }}
          className="btn btn-green"
        >
          Increment
        </button>
        <button
          onClick={() => {
            setCount((c) => c - 1);
            setClicks((p) => ({ ...p, dec: p.dec + 1 }));
          }}
          className="btn btn-red"
        >
          Decrement
        </button>
        <button
          onClick={() => {
            setCount(0);
            setClicks((p) => ({ ...p, reset: p.reset + 1 }));
          }}
          className="btn btn-gray"
        >
          Reset
        </button>
        <button
          onClick={() => {
            setCount((c) => c * 2);
            setClicks((p) => ({ ...p, double: p.double + 1 }));
          }}
          className="btn btn-blue"
        >
          Double
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-left">
        <h3 className="font-semibold mb-2 text-gray-800 text-center">
          Button Click Stats
        </h3>
        <p>Increment clicks: {clicks.inc}</p>
        <p>Decrement clicks: {clicks.dec}</p>
        <p>Reset clicks: {clicks.reset}</p>
        <p>Double clicks: {clicks.double}</p>
        <p className="font-bold mt-2">Total clicks: {totalClicks}</p>
      </div>
    </div>
  );
}
