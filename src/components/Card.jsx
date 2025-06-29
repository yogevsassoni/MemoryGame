import React from 'react';

export default function Card({ value, isFlipped, onClick }) {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    width: '150px',
    height: '150px',
    margin: '20px auto',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    cursor: 'pointer',
    userSelect: 'none',
  };

  return (
    <div className="card" style={cardStyle} onClick={onClick}>
      {isFlipped ? value : "❓"}
    </div>
  );
}
