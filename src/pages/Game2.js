import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiTrash, BiGridVertical, BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Roulette from "../components/Roulette";
import "../styles/pages/Game2.css";

const Game2 = () => {
  const [inputList, setInputList] = useState([]);
  const [categoryCount, setCategoryCount] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Manejar el cambio en la cantidad de categorías
  const handleCategoryCountChange = (e) => {
    const count = parseInt(e.target.value);
    setCategoryCount(e.target.value); // Almacenar la cadena de texto en el estado
    if (count > 0) {
      const newList = Array.from({ length: count }, () => ({
        id: uuidv4(),
        text: "",
      }));
      setInputList(newList);
      setShowForm(true);
    } else {
      setShowForm(false);
      setInputList([]);
    }
  };

  // Manejar el cambio en los inputs
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // Manejar la eliminación de un input
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setCategoryCount(list.length.toString()); // Actualizar la cantidad de categorías
  };

  // Manejar la adición de un nuevo input
  const handleAddClick = () => {
    const newList = [...inputList, { text: "", id: uuidv4() }];
    setInputList(newList);
    setCategoryCount(newList.length.toString()); // Actualizar la cantidad de categorías
  };

  // Manejar el final del drag and drop
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(inputList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputList(items);
  };

  return (
    <div className="game2-container">
      <div className="text-title">
        <h2>Ruleta</h2>
      </div>

      <div className="category-selector">
        <label>Selecciona la cantidad de categorías: </label>
        <input
          type="number"
          min="1"
          value={categoryCount}
          onChange={handleCategoryCountChange}
          className="input-cantidad"
        />
      </div>

      {showForm && (
        <>
          <Roulette data={inputList} />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <ul
                  className="items"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ listStyle: "none" }}
                >
                  {inputList.map((x, index) => (
                    <Draggable key={x.id} draggableId={x.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list-item"
                        >
                          <div className="item">
                            <BiGridVertical />
                            <input
                              name="text"
                              placeholder="Escribe el nombre de la categoría"
                              value={x.text}
                              onChange={(e) => handleInputChange(e, index)}
                              className="input"
                            />
                            <button
                              className="button-trash"
                              onClick={() => handleRemoveClick(index)}
                            >
                              <BiTrash />
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <button onClick={handleAddClick} className="button">
            <BiPlus />
          </button>
        </>
      )}
    </div>
  );
};

export default Game2;
