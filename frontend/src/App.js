    import React from 'react';  
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
    import Auth from './components/Auth';  
    import JobList from './components/JobList';  
    import FreelancerDashboard from './components/FreelancerDashboard';  
    import ServiceListings from './components/ServiceListings';  
    import Reviews from './components/Reviews';  
    import PaymentProcessing from "./components/PaymentProcessing";
    import './App.css';  

    function App() {  
      return (  
        <Router>  
          <div className="App">  
            <header className="App-header">  
              <h1>JobVisit and E commerce Website</h1>  
            </header>  
            <main>  
              <Routes>  
                <Route path="/auth" element={<Auth />} />  
                <Route path="/jobs" element={<JobList />} />  
                <Route path="/dashboard" element={<FreelancerDashboard />} />  
                <Route path="/freelancer-service-listings" element={<ServiceListings />} />  
                <Route path="/freelancer-reviews" element={<Reviews />} />  
                <Route path="/payment" element={<PaymentProcessing />} />
                <Route path="/" element={<h2>JobVisit and E commerce Website<br/><a href="/auth">Login/Register</a></h2>} />  
              </Routes>  
            </main>  
          </div>  
        </Router>  
      );  
    }  

    export default App;