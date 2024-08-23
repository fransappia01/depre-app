import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import "../styles/pages/Game4.css";

const Game4 = () => {
  const [names, setNames] = useState([]);
  const [input, setInput] = useState('');
  const [sortedNames, setSortedNames] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Manejar el cambio en el campo de entrada
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Manejar la adición de nombres a la lista
  const handleAddName = () => {
    if (input.trim()) {
      setNames([...names, input.trim()]);
      setInput('');
    }
  };

  // Manejar el sorteo
  const handleDraw = () => {
    if (names.length > 0) {
      const shuffled = [...names].sort(() => Math.random() - 0.5);
      setSortedNames(shuffled);
    }
  };

  // Manejar la edición de nombres
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(names[index]);
  };

  // Confirmar la edición del nombre
  const handleSaveEdit = () => {
    const updatedNames = [...names];
    updatedNames[editingIndex] = editValue;
    setNames(updatedNames);
    setEditingIndex(null);
    setEditValue('');
  };

  // Manejar la eliminación de nombres
  const handleDelete = (index) => {
    const updatedNames = names.filter((_, i) => i !== index);
    setNames(updatedNames);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditValue('');
    }
    // Limpiar resultados si la lista está vacía
    if (updatedNames.length === 0) {
      setSortedNames([]);
    }
  };

  // Manejar el cambio en el campo de edición
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <div className="game4-container">
      <h2>Sorteo</h2>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ingresa un nombre"
          className="input-box"
        />
        <button onClick={handleAddName} className="add-button">Agregar</button>
      </div>

      {names.length > 0 && (
        <div className="names-list">
          <h3>Nombres Agregados</h3>
          <ul className="added-names-list">
            {names.map((name, index) => (
              <li key={index} className="added-name-item">
                {editingIndex === index ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                    <button onClick={handleSaveEdit} className="save-button">Guardar</button>
                  </div>
                ) : (
                  <>
                    <span>{name}</span>
                    <div className="edit-buttons">
                      <button onClick={() => handleEdit(index)} className="edit-button">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(index)} className="delete-button">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleDraw} className="draw-button">Sortear</button>

      {sortedNames.length > 0 && (
        <div className="result-container">
          <h3>Resultado</h3>
          <ul className="sorted-list">
            {sortedNames.map((name, index) => (
              <li key={index}>
                {index + 1}. {index === 0 ? <span className="first-name">{name}</span> : name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game4;
