// pnr.js

const handlePnrSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
  
    const pnrInput = document.getElementById('pnr').value; // Get PNR input value
    const baseUrl = 'https://rails.makemytrip.com/railways/tgspnrsearch/?pnr=';
    const url = baseUrl + pnrInput; // Construct the URL with PNR input
  
    window.location.href = url; // Redirect to the constructed URL
  };
  
  export { handlePnrSubmit };
  