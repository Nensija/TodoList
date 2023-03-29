import "./styles.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPenToSquare,
  faCheck,
  // faSquareCheck,
  //faTrash,
  faTrashAlt,
  faCircleMinus,
  faFolderMinus,
  faBoxArchive,
  //faFloppyDisk,
  faRotateRight,
  faPaperclip
} from "@fortawesome/free-solid-svg-icons";

import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const arraObjects = [
  {
    id: 1,
    text: "Apliet puķes",
    completed: false,
    deleted: false,
    isEdit: false
  },
  {
    id: 2,
    text: "Notīrīt palodzes ",
    completed: false,
    deleted: false,
    isEdit: false
  },
  {
    id: 3,
    text: " Izpildīt mājasdarbus ",
    completed: false,
    deleted: false,
    isEdit: false
  },
  {
    id: 4,
    text: "Uzprogramēt aplikāciju",
    completed: false,
    deleted: false,
    isEdit: false
  }
];

export default function ToodoWiewComp() {
  const [todoList, settodoList] = useState(arraObjects);
  const [viewType, setviewType] = useState(0); //Piešķir sākotnējo vērtību
  const [editText, seteditText] = useState("");
  const [inpuetText, setinputText] = useState("");
  function RemoveAll() {
    settodoList([]);
  }

  function completedTodoItem(itemId) {
    const newTodolist = todoList.map((todo) => {
      //Kas notiks todoList funkcija =>//
      if (todo.id === itemId) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    settodoList(newTodolist);
  }
  function deletedTodoItem(itemId) {
    const newTodolist = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, deleted: true };
      }
      return todo;
    });
    settodoList(newTodolist);
  }

  function recreateTodoItem(itemId) {
    const newTodolist = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, deleted: false, completed: false, isEdit: false };
      }
      return todo;
    });
    settodoList(newTodolist);
  }
  function deleteSelected() {
    const newTodolist = todoList.filter(
      (todoList) => todoList.deleted === false
    );
    settodoList(newTodolist);
  }
  function complitedSelected() {
    const newTodolist = todoList.filter(
      (todoList) => todoList.completed === false
    );
    settodoList(newTodolist);
  }
  function editTodolist(itemId) {
    const newTodolist = todoList.map((todo) => {
      if (todo.id === itemId) {
        seteditText(todo.text); // Lai text ierakstitos laukuma loga edit rezima//
        return { ...todo, isEdit: true };
      } else {
        return { ...todo, isEdit: false };
      }
    });
    settodoList(newTodolist);
  }
  function savetodoItem(itemId) {
    if (editText.length === 0) return; // Length cik array ir liels//
    const newTodolist = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, isEdit: false, text: editText };
      }
      return todo;
    });
    settodoList(newTodolist);
    seteditText("");
  }
  function getNewId() {
    let maxId = 0; //let izveido parametru//
    todoList.map((todo) => {
      if (todo.id > maxId) {
        maxId = todo.id;
      }
    });
    return maxId + 1;
  }

  function addTodoItem() {
    let todoId = getNewId();

    let newTodolist = {
      id: todoId,
      text: inpuetText,
      completed: false,
      deleted: false,
      isEdit: false
    };
    const items = todoList;
    settodoList([...items, newTodolist]);
    setinputText("");
  }

  let newTodolist = [];
  if (viewType === 0) {
    newTodolist = todoList;
  } else if (viewType === 1) {
    newTodolist = todoList.filter((task) => {
      return task.deleted === true;
    });
  } else if (viewType === 2) {
    newTodolist = todoList.filter((task) => {
      return task.completed === true;
    });
  } else if (viewType === 3) {
    newTodolist = todoList.filter((task) => {
      return task.completed === false && task.deleted === false;
    });
  }

  return (
    <div>
      <div>
        <div className="RowStyle">
          <button className="BtnStyle2" onClick={() => setviewType(0)}>
            Atēlot visus
          </button>
          <button className="BtnStyle2" onClick={() => setviewType(1)}>
            Atēlot dzēstos
          </button>
          <button className="BtnStyle2" onClick={() => setviewType(2)}>
            Atēlot pabeigtos
          </button>
          <button className="BtnStyle2" onClick={() => setviewType(3)}>
            Atēlot aktīvos
          </button>
        </div>
        <div className="RowInputStyle">
          <div className="RowInputStyle1st">
            <div class="task-input">
              <FontAwesomeIcon className="iconMeklet" icon={faPenToSquare} />

              <input
                className="InputText"
                type="text"
                icon={faPenToSquare}
                value={inpuetText} //Prekš pievienošanas
                placeholder="Pievienot darbiņu"
                onChange={(e) => setinputText(e.target.value)}
              />
              <button
                className="buttonStyle"
                onClick={addTodoItem}
                title="Pievienot"
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </button>
            </div>
          </div>

          <div className="RowInputStyle2nd">
            <button
              className="buttonStyle"
              onClick={RemoveAll}
              title="Dzēst visu"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button
              className="buttonStyle"
              onClick={() => deleteSelected()}
              title="Noņemt dzēstos"
            >
              <FontAwesomeIcon icon={faCircleMinus} />
            </button>
            <button
              className="buttonStyle"
              onClick={() => complitedSelected()}
              title="Noņemt pabeigtos"
            >
              <FontAwesomeIcon icon={faFolderMinus} />
            </button>
          </div>
        </div>
      </div>
      <div className="RowStyle">
        {newTodolist.map((item) => {
          let spanClassName = "TodoItemText";
          if (item.completed) spanClassName = "TodoItemTextcompleted";
          if (item.deleted) spanClassName = "TodoItemTextDeleted";

          return (
            <div key={item.id} className="RowItemStyle">
              <div>
                <FontAwesomeIcon className="faPaperclip" icon={faPaperclip} />
              </div>
              <div className="RowItemStyleText">
                {!item.isEdit && (
                  <span className={spanClassName}>{item.text}</span>
                )}
                {item.isEdit && (
                  <input
                    type="text"
                    className="RowItemStyleInput"
                    value={editText}
                    onChange={(e) => seteditText(e.target.value)}
                    autoFocus
                  />
                )}
              </div>
              <div>
                {!item.completed && !item.deleted && !item.isEdit && (
                  <>
                    <button
                      className="completedButton"
                      onClick={() => completedTodoItem(item.id)}
                      title="
                Pabeigt"
                    >
                      <FontAwesomeIcon
                        className="completedIcon"
                        icon={faCheck}
                      />
                    </button>
                    <button
                      className="editButton"
                      onClick={() => editTodolist(item.id)}
                      title="Labot"
                    >
                      <FontAwesomeIcon
                        className="editicon"
                        icon={faPenToSquare}
                      />
                    </button>
                    <button
                      className="deletedButton"
                      onClick={() => deletedTodoItem(item.id)}
                      title="Dzēst"
                    >
                      <FontAwesomeIcon
                        className="deletedIcon"
                        icon={faTrashCan}
                      />
                    </button>
                  </>
                )}
                {item.isEdit && (
                  <button
                    className="saveButton"
                    onClick={() => savetodoItem(item.id)}
                    title="Saglabāt"
                  >
                    <FontAwesomeIcon className="saveIcon" icon={faBoxArchive} />
                  </button>
                )}
                {(item.completed === true ||
                  item.deleted === true ||
                  item.isEdit) && (
                  <button
                    className="recreateButton"
                    onClick={() => recreateTodoItem(item.id)}
                    title="Atjaunot"
                  >
                    <FontAwesomeIcon
                      className="recreateIutton"
                      icon={faRotateRight}
                    />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
