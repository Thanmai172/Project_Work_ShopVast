import React from 'react';  

const ServiceListings = () => {  
  const services = [  
    { id: 1, title: 'Website Development', description: 'Build a responsive website customized to your needs.' },  
    { id: 2, title: 'Graphic Design', description: 'Professional graphic design services for branding and promotional materials.' },  
    { id: 3, title: 'SEO Optimization', description: 'Improve your website ranking on search engines with effective SEO techniques.' },  
  ];  

  return (  
    <div>  
      <h1>Service Listings</h1>  
      <ul>  
        {services.map(service => (  
          <li key={service.id}>  
            <h2>{service.title}</h2>  
            <p>{service.description}</p>  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default ServiceListings;