import React from "react";
import Switch from "react-switch";
import { IconOn, IconOff } from "./Icon";
import { Draggable } from "react-beautiful-dnd";
import Image from "next/image";

const decideComponent = (props) => {
  switch (props.item.type) {
    case "curtain":
    case "garage":
    case "lamp":
      return <SwitchItem {...props} />;
    case "temprature":
    case "plant":
      return <ValueItem {...props} />;
    default:
      return null;
  }
};

function Handle(props) {
  return (
    <div
      {...props}
      className="inline-block h-8 w-8 rounded-md bg-slate-300 "
    ></div>
  );
}

function Item(props) {
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={
            (snapshot.isDragging ? "bg-green-100" : "bg-inherit") +
            " flex align-center space-x-2 py-1"
          }
        >
          <Handle {...provided.dragHandleProps} />
          {decideComponent(props)}
        </div>
      )}
    </Draggable>
  );
}

function ValueItem({ item }) {
  return (
    <label className="flex items-center space-x-2 select-none">
      <span>{item.displayName}:</span>
      <IconOn iconType={item.type} />
      <span className="text-2xl font-bold text-gray-600">{item.value}</span>
    </label>
  );
}

function SwitchItem({ item, onSwitchItemChange }) {
  return (
    <label className="flex items-center space-x-2 select-none">
      <span>{item.displayName}:</span>
      {item.value ? (
        <IconOn iconType={item.type} />
      ) : (
        <IconOff iconType={item.type} />
      )}
      <Switch
        onChange={(param) => onSwitchItemChange(item, param)}
        checked={item.value}
      />
    </label>
  );
}

export default Item;
