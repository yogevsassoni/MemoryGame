import React from 'react';

export default function Card({ value, isFlipped, onClick }) {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    width: '150px',
    margin: '20px auto',
    textAlign: 'center',
  };
  const showCardValue = (isFlipped && <p className="card-content">
        {value}
      </p>);

  return (
    <div className="card" style={cardStyle} onClick={onClick}>
      {showCardValue}
    </div>
  );
}
