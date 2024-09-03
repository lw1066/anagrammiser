import logo from "../../assets/alpha-spag-round.jpg";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" />
      <div>
        <h1>The Ana-gram-miser</h1>
        <h2>
          Solve anagrams - visualise, check words in a dictionary or cheat...
        </h2>
      </div>
    </header>
  );
};

export default Header;
