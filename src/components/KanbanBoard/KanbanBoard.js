import React from "react";
import Ticket from "../Ticket/Ticket";
import "./KanbanBoard.css";
import addIcon from "../../assets/add.svg";
import threeDotIcon from "../../assets/3 dot menu.svg";
import todoIcon from "../../assets/To-do.svg";
import inProgressIcon from "../../assets/in-progress.svg";
import backlogIcon from "../../assets/Backlog.svg";
import cancelled from "../../assets/Cancelled.svg";
import done from "../../assets/Done.svg";
import highPriority from "../../assets/Img - High Priority.svg";
import lowPriority from "../../assets/Img - Low Priority.svg";
import mediumPriority from "../../assets/Img - Medium Priority.svg";
import noPriority from "../../assets/No-priority.svg";
import urgent from "../../assets/SVG - Urgent Priority colour.svg";

const getGroupIcon = (group) => {
  switch (group) {
    case "Todo":
      return todoIcon;
    case "In progress":
      return inProgressIcon;
    case "Backlog":
      return backlogIcon;
    case "Canceled":
      return cancelled;
    case "Done":
      return done;
    case "0":
      return noPriority;
    case "1":
      return lowPriority;
    case "2":
      return mediumPriority;
    case "3":
      return highPriority;
    case "4":
      return urgent;
    default:
      return "";
  }
};

const priorityIcons = {
  0: "No Priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

const findUserNameById = (userId, users) => {
  const user = users.find((user) => user.id === userId);
  return user ? user.name : "Unknown User";
};

const isUserAvailable = (userId, users) => {
  const user = users.find((user) => user.id === userId);
  return user ? user.available : false;
};

const KanbanBoard = ({ groupedTickets, sortTickets, grouping, users }) => {
  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="kanban-column">
          <h3>
            <div className="group-info">
              {grouping === "user" ? (
                <div className="userDetails">
                  <div className="ticket-user-avatar-wrapper">
                    <img
                      className="ticket-user-avatar"
                      src="https://via.placeholder.com/40"
                      alt={`Avatar`}
                    />

                    <span
                      className={`availability-dot ${
                        isUserAvailable(group, users)
                          ? "available"
                          : "unavailable"
                      }`}
                    ></span>
                    
                  </div>
                  <span className="group-name">
                      {findUserNameById(group, users)}
                    </span>
                </div>
              ) : (
                <div>
                  <img
                    src={getGroupIcon(group)}
                    alt={`${group} icon`}
                    className="group-icon"
                  />
                  {grouping === "priority" ? (
                    <span className="group-name">{priorityIcons[group]}</span>
                  ) : (
                    <span className="group-name">{group}</span>
                  )}
                </div>
              )}
              <span className="ticket-count">
                {groupedTickets[group].length}
              </span>
            </div>
            <div className="action-icons">
              <img src={addIcon} alt="Add" className="action-icon" />
              <img src={threeDotIcon} alt="Menu" className="action-icon" />
            </div>
          </h3>
          {sortTickets(groupedTickets[group]).map((ticket) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              grouping={grouping}
              users={users}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
