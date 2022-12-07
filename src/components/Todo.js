import React, { useEffect, useState } from "react";
// useEffect
import classes from "./styles/Todo.module.css";

// get todo local data

function getLocalData() {
  const lists = localStorage.getItem("mystorage");

  if (lists) {
    return JSON.parse(lists);
  }
  return [];
}

// get completed todo local data

function getCompletedLocalData() {
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
  const [doneItems, setDoneItems] = useState(getCompletedLocalData());

  // add todo items function

  function addItems() {
    if (!inputData) {
      alert("please enter value !");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((currentEl) => {
          const names = items.find((findEl) => findEl.name === inputData);
          if (names) {
            return currentEl;
          }
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
      const names = items.find((currentEl) => currentEl.name === inputData);
      if (names) {
        setInputData("");
        return;
      }
      const newItems = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, newItems]);
      setInputData("");
    }
  }

  // edit items function

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

  // add values into new storage function

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

  // delete done items function

  const deleteCompletedItem = (index) => {
    const updatedValue = doneItems.filter(
      (currentEl) => currentEl.id !== index
    );
    setDoneItems(updatedValue);
  };

  // useeffect

  useEffect(() => {
    localStorage.setItem("mystorage", JSON.stringify(items));
    localStorage.setItem("donestorage", JSON.stringify(doneItems));
  }, [items, doneItems]);

  return (
    <div className={classes.todoBg}>
      <div className={classes.content}>
        {/* todo input form and lists  */}
        <div className={classes.inputField}>
          <input
            type="text"
            placeholder="Enter your Todo..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {toggleButton ? (
            <i className="bx bx-edit-alt" onClick={addItems} />
          ) : (
            <i className="bx bx-plus" onClick={addItems} />
          )}
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.todoLists}>
            <h4>
              {items.length === 0
                ? "There is no work left🙂"
                : "You need to complete these tasks☹"}
            </h4>
            <ul className={classes.lists}>
              {items.map((currentEl) => (
                <li className={classes.items} key={currentEl.id}>
                  <div className={classes.name}>
                    <input
                      type="checkbox"
                      onClick={() => changeStorage(currentEl.id)}
                      id={currentEl.name}
                    />
                    <label htmlFor={currentEl.name}>{currentEl.name}</label>
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
          <div className={`${classes.todoLists} ${classes.complete}`}>
            <h4>
              {items.length === 0 && doneItems.length === 0
                ? "no task found🙂"
                : doneItems.length > 0
                ? "You have completed these tasks😀"
                : "you need to finished your task☹"}
            </h4>
            <ul className={classes.lists}>
              {doneItems.map((currentEl) => (
                <li className={classes.items} key={currentEl.id}>
                  <span>{currentEl.name}</span>
                  <div className={classes.modify}>
                    <i
                      className="bx bxs-trash"
                      onClick={() => deleteCompletedItem(currentEl.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* todo done lists  */}
      </div>
    </div>
  );
}

export default Todo;
