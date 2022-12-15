import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
// Page and layouts import
import Homepage from './pages/Homepage';
import Category from './pages/Category';
import ReviewDetails from './pages/ReviewDetails';
import SiteHeader from './components/SideHeader';

//apolo client
const client = new ApolloClient({
  uri: 'http://localhost:1340/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <SiteHeader />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details/:id" element={<ReviewDetails />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
