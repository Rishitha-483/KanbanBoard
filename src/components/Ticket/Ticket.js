import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "./Ticket.css";
import highPriority from "../../assets/Img - High Priority.svg";
import lowPriority from "../../assets/Img - Low Priority.svg";
import mediumPriority from "../../assets/Img - Medium Priority.svg";
import noPriority from "../../assets/No-priority.svg";
import urgent from "../../assets/SVG - Urgent Priority colour.svg";

const priorityIcons = {
  0: noPriority,
  1: lowPriority,
  2: mediumPriority,
  3: highPriority,
  4: urgent,
};

const getPriorityIcon = (priority) => priorityIcons[priority] || "";


const findUserById = (userId, users) => users.find((user) => user.id === userId);

const Ticket = ({ ticket, grouping, users }) => {
  const { id, title, priority, tag, userId } = ticket;

  
  const user = findUserById(userId, users);

 
  const userName = user ? user.name : "Unknown User";
  const isAvailable = user ? user.available : false;

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        
        <span className="ticket-id">{id}</span>
        {grouping !== "user" && (
          <div className="ticket-user-avatar-wrapper">
            <img
              className="ticket-user-avatar"
              src="https://via.placeholder.com/40"
              alt={`${userName} Avatar`}
            />
            
            <span className={`availability-dot ${isAvailable ? "available" : "unavailable"}`}>
              
            </span>
          </div>
        )}
      </div>
      <div className="ticket-title">{title}</div>
      <div className="ticket-priority-tag">
        {grouping !== "priority" && (
          <span className="priority-icon">
            <img
              src={getPriorityIcon(priority)}
              alt={`${priority} icon`}
              className="group-icon"
            />
          </span>
        )}
        <span className="ticket-tag">
          <span>
            <FontAwesomeIcon icon={faCircle} className="dot-icon" />
          </span>
          {tag}
        </span>
      </div>
    </div>
  );
};

export default Ticket;
