import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";

const getBackgroundColor = (snapshot) => {
  if (snapshot.isDraggingOver) {
    return "bg-pink-100";
  }

  if (snapshot.draggingFromThisWith) {
    return "bg-blue-100";
  }

  return "bg-inherit";
};

function Column({ column, devices, state, setState }) {
  const onSwitchItemChange = (item, newValue) => {
    for (const deviceId in state.devices) {
      let deviceToBeUpdated = state.devices[deviceId];
      if (deviceToBeUpdated.id !== item.id) continue;

      deviceToBeUpdated.value = newValue;
      setState({
        ...state,
        devices: {
          ...state.devices,
          [deviceId]: deviceToBeUpdated,
        },
      });
      return;
    }
  };

  const onColumnHeaderChange = (e) => {
    setState({
      ...state,
      columns: {
        ...state.columns,
        [column.id]: {
          ...column,
          title: e.target.value,
        },
      },
    });
  };

  const deleteColumn = () => {
    if (devices?.length > 0) {
      toast.error("İçerisinde cihaz olan odaları silemezsiniz");
      return;
    }
    const newColumns = state.columns;
    delete newColumns[column.id];
    setState({
      ...state,
      columnOrder: state.columnOrder.filter((col) => col !== column.id),
      columns: newColumns,
    });
  };

  const carryDownColumn = () => {
    const columnOrder = state.columnOrder;
    let index = columnOrder.findIndex((columnId) => columnId === column.id);
    if (index !== -1 && index !== columnOrder.length - 1) {
      let temp = columnOrder[index + 1];
      columnOrder[index + 1] = columnOrder[index];
      columnOrder[index] = temp;
    }

    setState({
      ...state,
      columnOrder,
    });
  };

  const carryUpColumn = () => {
    const columnOrder = state.columnOrder;
    let index = columnOrder.findIndex((columnId) => columnId === column.id);
    if (index !== -1 && index !== 0) {
      let temp = columnOrder[index - 1];
      columnOrder[index - 1] = columnOrder[index];
      columnOrder[index] = temp;
    }

    setState({
      ...state,
      columnOrder,
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          id="columnTitle"
          name="columnTitle"
          className="w-48 pb-2 border-b-2 border-orange-500 bg-transparent"
          onChange={onColumnHeaderChange}
          value={column.title}
        ></input>
        <div className="inline space-x-1">
          <button
            className="border border-slate-300 rounded-md w-8 h-8 text-center"
            onClick={carryUpColumn}
          >
            ⬆️
          </button>
          <button
            className="border border-slate-300 rounded-md w-8 h-8 text-center"
            onClick={carryDownColumn}
          >
            ⬇️
          </button>
          <button
            className="border border-red-400 rounded-md w-8 h-8 text-center text-red-400"
            onClick={deleteColumn}
          >
            X
          </button>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              getBackgroundColor(snapshot) + " transition-colors min-h-[50px]"
            }
          >
            {devices?.map((device, index) => (
              <Item
                key={device.id}
                item={device}
                index={index}
                onSwitchItemChange={onSwitchItemChange}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
}

export default Column;
