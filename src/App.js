
import GlobalStyles from "./components/styled/Global";
import { ThemeProvider } from 'styled-components';


const theme = {
  colors: {
    primary: {
      active: 'rgb(58, 123, 253)',
      checkBg: 'linear-gradient rgb(87, 221, 255) to rgb(192, 88, 243)',
    },
    lightMode: {
      bgMain: 'rgb(250, 250, 250)',
      bgTasks: 'rgb(255, 255, 255)',
      mainText: 'rgb(147, 148, 165)',
      tasksText: 'rgb(72, 75, 106)',
      borders: 'rgb(228, 229, 241)',
      complete: 'rgb(210, 211, 219)',
      hoverText: 'rgb(72, 75, 106)',
    },
    darkMode: {
      bgMain: 'rgb(22, 23, 34)',
      bgTasks: 'rgb(37, 39, 60)',
      mainText: 'rgb(119, 122, 146)',
      tasksText: 'rgb(202, 205, 232)',
      borders: 'rgb(57, 58, 76)',
      complete: 'rgb(77, 80, 102)',
      hoverText: 'rgb(228, 229, 241)',
    }
  },
}

function App() {
  return (
    <ThemeProvider theme={theme} >
      <>
      <GlobalStyles />
      <h1>test</h1>
      </>
    </ThemeProvider>
  );
}

export default App;
