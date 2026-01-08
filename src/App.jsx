
import { Container } from '@mui/material'
import './App.css'
import MainContent from './components/MainContent'
import { createTheme,ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography :{
    fontFamily:["PD"]
  },
   
  
 
})
function App() {
 
  return (

    <>
    <ThemeProvider theme={theme}> 
    <div style={{display:"flex"
                ,justifyContent:"center"
                ,width:"100vw"
                ,background:""
                }}>
                  
      <Container maxWidth="md">
         <MainContent/>
      </Container>
      
    </div>
    </ThemeProvider>
     </>
  )
}

export default App
