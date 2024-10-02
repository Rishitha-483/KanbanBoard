import React, { useState } from "react";
import "./GroupingSelector.css";
import { ReactComponent as DisplayIcon } from "../../assets/Display.svg";
import down from "../../assets/down.svg";

const GroupingSelector = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="grouping-selector">
      <button onClick={() => setShowOptions(!showOptions)}>
        <span className="icon">
          <DisplayIcon width="16" height="16" fill="currentColor" />{" "}
        </span>
        {showOptions ? "Hide" : "Display"}
        <span className="icon">
          <img src={down} alt="down" />
        </span>
      </button>
      {showOptions && (
        <div className="grouping-options">
          <div className="options">
            <label>Grouping</label>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="options">
            <label>Ordering</label>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupingSelector;
