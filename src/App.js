import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import "./App.css";
import Navbar from "./routes/navbar/navbar";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") || "priority"
  );
  const [groupedTickets, setGroupedTickets] = useState({});

  // Fetch data from the API
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users)
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // console.log(tickets);

  // Group and save to localStorage whenever grouping or ordering changes
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);

    let grouped = {};
    if (grouping === "status") {
      grouped = groupByStatus(tickets);
    } else if (grouping === "user") {
      grouped = groupByUser(tickets);
    } else if (grouping === "priority") {
      grouped = groupByPriority(tickets);
    }
    setGroupedTickets(grouped);
  }, [grouping, ordering, tickets]);

  // Grouping functions
  const groupByStatus = (tickets) => {
    console.log(tickets);
    return tickets.reduce((acc, ticket) => {
      if (!acc[ticket.status]) acc[ticket.status] = [];
      acc[ticket.status].push(ticket);
      return acc;
    }, {});
  };

  const groupByUser = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      if (!acc[ticket.userId]) acc[ticket.userId] = [];
      acc[ticket.userId].push(ticket);
      return acc;
    }, {});
  };

  const groupByPriority = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      if (!acc[ticket.priority]) acc[ticket.priority] = [];
      acc[ticket.priority].push(ticket);
      return acc;
    }, {});
  };

  // Sorting tickets within each group
  const sortTickets = (group) => {
    return [...group].sort((a, b) => {
      if (ordering === "priority") {
        return b.priority - a.priority;
      } else if (ordering === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  return (
    <div className="app">
      <header>
        <Navbar
          grouping={grouping}
          setGrouping={setGrouping}
          ordering={ordering}
          setOrdering={setOrdering}
        />
      </header>
      <KanbanBoard
        groupedTickets={groupedTickets}
        sortTickets={sortTickets}
        grouping={grouping}
        users={users}
      />
    </div>
  );
};

export default App;
