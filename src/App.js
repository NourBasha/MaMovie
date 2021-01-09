 import Routes from "./router/routes";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faStar, faUserCog } from "@fortawesome/free-solid-svg-icons";

import {ThemeProvider} from "styled-components";
import {GlobalStyles} from './utils/theme/globalStyles';
import {lightTheme,darkTheme} from './utils/theme/theme';

import Context from './utils/context';
import { useContext } from "react";


library.add(fab, faStar,faUserCog);

const App = () => {

  const context = useContext(Context);

  return (
      <ThemeProvider theme = { context.appTheme==='light' ? lightTheme :darkTheme}>
        <> 
               <GlobalStyles/>
          
                  <Routes />
            
        </>
      </ThemeProvider>

  );
};

export default App;
