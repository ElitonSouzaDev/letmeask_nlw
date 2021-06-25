import { func, string } from 'prop-types';
import '../styles/toggle.scss';

type ThemeContextProps = "light" | "dark";
type ThemeContextType = {
  currentTheme: ThemeContextProps;
  toggleTheme: () => void;
};

const Toggle = function({currentTheme, toggleTheme}: ThemeContextType) {
  return (
    <button className={`toggle-theme ${currentTheme}`} onClick={toggleTheme} >
      <img src="/sun.png" alt="sol" />
      <img src="/moon.png" alt="lua" />
    </button>
  );
};

Toggle.propTypes = {
  currentTheme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle;