import './styles/HomeStyles.css';
import HomeBoxes from './components/HomeBoxes';
import ToolBoxes from './components/ToolBoxes';
import PreventiveBox from './components/PreventiveBox';
import TotalBoxes from './components/TotalBoxes';

import logo from '../assets/logo.jpg';
import HistoryChart from './components/HistoryChart';
import { useAuth } from '../auth/AuthContext';

function Home() {
  const { user } = useAuth();

  document.title = "Controle TI"

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem Vindo de Volta, {user?.displayName && user?.displayName.split(" ")[0]}</h1>
        <img alt='Logotipo INNARA' src={logo} />
      </header>
      <div className='home-body'>
        <div className='home-content'>
          <HomeBoxes />
          <HistoryChart />
        </div>
        <div className='home-side-bar'>
          <ToolBoxes />
          <PreventiveBox />
          <TotalBoxes />
        </div>
      </div>
    </div>
  );
}

export default Home;

// import { Document, Page, Text } from "@react-pdf/renderer";

// import { PDFDownloadLink } from "@react-pdf/renderer";

// 


// const MyDocument = () => (
//     <Document>
//         <Page>
//             <Text>Teste</Text>
//         </Page>
//     </Document>
// )



// return (
//         <>
//         <div>
//             <PDFDownloadLink document={<MyDocument />} fileName="Teste" >
//                 {({ loading }) => ( loading ? 'Loading' : 'Download' )}
//             </PDFDownloadLink>
//         </div>
        
//         </>
//     );