import React from 'react';
import './Card.css';

export default function Card({ value, isFlipped, onClick }) {
  return (
    <div className={`card ${isFlipped ? 'is-flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front"></div> {/* face-down side */}
        <div className="card-back">{value}</div> {/* face-up side with emoji */}
      </div>
    </div>
  );
}