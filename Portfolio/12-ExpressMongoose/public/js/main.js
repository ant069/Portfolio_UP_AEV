// Toggle between drivers and teams view
document.getElementById('viewByDrivers').addEventListener('click', function() {
    document.getElementById('driversView').style.display = 'block';
    document.getElementById('teamsView').style.display = 'none';
    this.classList.add('active');
    document.getElementById('viewByTeams').classList.remove('active');
});

document.getElementById('viewByTeams').addEventListener('click', function() {
    document.getElementById('driversView').style.display = 'none';
    document.getElementById('teamsView').style.display = 'block';
    this.classList.add('active');
    document.getElementById('viewByDrivers').classList.remove('active');
});

// Toggle edit mode for a driver card
function toggleEditMode(driverId) {
    const card = document.querySelector(`[data-driver-id="${driverId}"]`);
    const viewMode = card.querySelector('.driver-view');
    const editMode = card.querySelector('.driver-edit');
    
    if (viewMode.style.display === 'none') {
        // Switch back to view mode
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
    } else {
        // Switch to edit mode
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
    }
}

// Save driver changes
async function saveDriver(driverId) {
    const card = document.querySelector(`[data-driver-id="${driverId}"]`);
    
    const num = card.querySelector('.edit-num').value;
    const code = card.querySelector('.edit-code').value;
    const forename = card.querySelector('.edit-forename').value;
    const surname = card.querySelector('.edit-surname').value;
    const dob = card.querySelector('.edit-dob').value;
    const nationality = card.querySelector('.edit-nationality').value;
    const teamId = card.querySelector('.edit-team').value;
    const url = card.querySelector('.edit-url').value;
    
    // Validate
    if (!num || !code || !forename || !surname || !dob || !nationality || !teamId || !url) {
        alert('Please fill all fields');
        return;
    }
    
    try {
        const response = await fetch(`/driver/${driverId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                num: parseInt(num),
                code,
                forename,
                surname,
                dob,
                nationality,
                teamId,
                url
            })
        });
        
        if (response.ok) {
            // Reload the page to show updated data
            window.location.reload();
        } else {
            const error = await response.json();
            alert('Error updating driver: ' + (error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating driver');
    }
}

// Delete a driver
async function deleteDriver(driverId) {
    if (!confirm('Are you sure you want to delete this driver?')) {
        return;
    }
    
    try {
        const response = await fetch(`/driver/${driverId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            // Remove the card from DOM with animation
            const card = document.querySelector(`[data-driver-id="${driverId}"]`);
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.remove();
                // Check if there are no more drivers
                const remainingCards = document.querySelectorAll('.driver-card');
                if (remainingCards.length === 0) {
                    const driversGrid = document.querySelector('.drivers-grid');
                    driversGrid.innerHTML = '<p class="empty-message">No drivers in the database yet.</p>';
                }
            }, 300);
        } else {
            const error = await response.json();
            alert('Error deleting driver: ' + (error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting driver');
    }
}

// Form handling
const driverForm = document.getElementById('driverForm');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtnText = document.getElementById('submitBtnText');

// Cancel button - reset form
cancelBtn.addEventListener('click', function() {
    driverForm.reset();
    document.getElementById('driverId').value = '';
    submitBtnText.textContent = 'Add Driver';
    cancelBtn.style.display = 'none';
});
