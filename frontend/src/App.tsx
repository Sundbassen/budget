import React from 'react';
import BudgetNavbar from './components/bugetNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Colors from './styles/colors';
import Container from 'react-bootstrap/Container';
import FilterContainer from './components/filters/filterContainer';
import BudgetRoutes from './routes/budgetRoutes';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
    
    <div style={{background: Colors.lightPink(0.1), height: '100vh'}}>
      <BudgetNavbar />
      <br />
      <Container>
          <FilterContainer header='Filters'/>
          <BudgetRoutes />
          
      </Container>
    </div>
    </QueryClientProvider>
  );
}

export default App;
