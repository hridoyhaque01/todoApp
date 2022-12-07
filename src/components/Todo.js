import React, { useEffect, useState } from "react";
// useEffect
import classes from "./styles/Todo.module.css";

function getLocalData() {
  const lists = localStorage.getItem("mystorage");

  if (lists) {
    return JSON.parse(lists);
  }
  return [];
}
function getDoneLocalData() {
  const lists = localStorage.getItem("donestorage");

  if (lists) {
    return JSON.parse(lists);
  }
  return [];
}

function Todo() {
  const [inputData, setInputData] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [editedIndex, setEditedIndex] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [doneItems, setDoneItems] = useState(getDoneLocalData());

  function handleClick() {
    if (!inputData) {
      alert("please enter value !");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((currentEl) => {
          if (currentEl.id === editedIndex) {
            return { ...currentEl, name: inputData };
          }
          return currentEl;
        })
      );
      setInputData("");
      setEditedIndex("null");
      setToggleButton(false);
    } else {
      const newItems = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, newItems]);
      setInputData("");
    }
  }

  // edit items

  const editItem = (index) => {
    const editedValue = items.find((currentEl) => currentEl.id === index);
    setInputData(editedValue.name);
    setEditedIndex(index);
    setToggleButton(true);
  };

  // deleteItem function

  const deleteItem = (index) => {
    const updatedItems = items.filter((currentEl) => currentEl.id !== index);
    setItems(updatedItems);
  };

  const changeStorage = (index) => {
    const changeValue = items.find((currentEl) => currentEl.id === index);
    const newData = {
      id: index,
      name: changeValue.name,
    };
    setDoneItems([...doneItems, newData]);
    const updatedItems = items.filter((currentEl) => currentEl.id !== index);
    setItems(updatedItems);
  };

  const deleteDoneItem = (index) => {
    console.log(index);
    const updatedValue = doneItems.filter(
      (currentEl) => currentEl.id !== index
    );
    setDoneItems(updatedValue);
  };

  useEffect(() => {
    localStorage.setItem("mystorage", JSON.stringify(items));
    localStorage.setItem("donestorage", JSON.stringify(doneItems));
  }, [items, doneItems]);

  return (
    <div className={classes.todoBg}>
      <div className={classes.content}>
        <div className={classes.mainDiv}>
          <div className={classes.inputField}>
            <input
              type="text"
              placeholder="Enter your todo.."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="bx bx-edit-alt" onClick={handleClick} />
            ) : (
              <i className="bx bx-plus" onClick={handleClick} />
            )}
          </div>
          <div className={classes.todoLists}>
            <h4>{items.length === 0 ? "There is no work left🙂" : " "}</h4>
            <ul className={classes.lists}>
              {items.map((currentEl) => (
                <li className={classes.items} key={currentEl.id}>
                  <div className={classes.name}>
                    <input
                      type="checkbox"
                      onClick={() => changeStorage(currentEl.id)}
                    />
                    <span>{currentEl.name}</span>
                  </div>
                  <div className={classes.modify}>
                    <i
                      className="bx bx-edit-alt"
                      onClick={() => editItem(currentEl.id)}
                    />

                    <i
                      className="bx bxs-trash"
                      onClick={() => deleteItem(currentEl.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {items.length > 0 ? (
          <div className={`${classes.todoLists} ${classes.complete}`}>
            <h4>
              {doneItems.length === 0
                ? "you have to finished your work!🙂"
                : " "}
            </h4>
            <ul className={classes.lists}>
              {doneItems.map((currentEl) => (
                <li className={classes.items} key={currentEl.id}>
                  <span>{currentEl.name}</span>
                  <div className={classes.modify}>
                    <i
                      className="bx bxs-trash"
                      onClick={() => deleteDoneItem(currentEl.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Todo;
