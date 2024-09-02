// script.js

function validateAndDisplay(event) {
    // Prevent form from submitting
    event.preventDefault();

    var trainNo = document.getElementById('trainNo').value.trim();
    var source = document.getElementById('source').value.trim();
    var destination = document.getElementById('destination').value.trim();
    var date = document.getElementById('date').value.trim();
    var quota = document.getElementById('quota').value;
    var classType = document.getElementById('class').value;

    // Check if either trainNo is filled or all other fields are filled
    if (trainNo || (source && destination && date)) {
        // Display the entered details
        document.getElementById('details').style.display = 'block';
        document.getElementById('detailTrainNo').textContent = trainNo || 'N/A';
        document.getElementById('detailSource').textContent = source || 'N/A';
        document.getElementById('detailDestination').textContent = destination || 'N/A';
        document.getElementById('detailDate').textContent = date || 'N/A';
        document.getElementById('detailQuota').textContent = quota;
        document.getElementById('detailClass').textContent = classType;

        // Prepare form data for sending to server
        const formData = {
            trainNo,
            source,
            destination,
            date,
            quota,
            class: classType
        };

        // Send the data to the server using fetch
        fetch('/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            alert('Booking saved successfully');
            console.log('Success:', data);
        })
        .catch(error => {
            alert('Error saving booking: ' + error.message);
            console.error('Error:', error);
        });
    } else {
        // Alert to fill either Train Number or other details
        alert('Please fill either the Train Number or all the details for Source, Destination, and Date.');
    }
}

// Attach the validateAndDisplay function to the form's submit event
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bookingForm').addEventListener('submit', validateAndDisplay);
});
