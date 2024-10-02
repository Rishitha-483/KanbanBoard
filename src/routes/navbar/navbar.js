import GroupingSelector from "../../components/GroupingSelector/GroupingSelector";
import "./navbar.css";

const Navbar = ({ grouping, setGrouping, ordering, setOrdering }) => {
  return (
    <nav className="navbar">
      <GroupingSelector
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
      />
    </nav>
  );
};

export default Navbar;
