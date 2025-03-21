(function() {
    function addParcelSelector() {
        let shippingOptions = document.getElementById('checkout-shipping-options');
        // wait for element to load if not loaded yet
        if (!shippingOptions) {
            setTimeout(addParcelSelector, 500);

            return;
        }
        if (document.getElementById('parcel-machine-container')) return;

        let parcelDiv = document.createElement('div');
        parcelDiv.id = 'parcel-machine-container';
        parcelDiv.style.marginTop = '20px';
        parcelDiv.innerHTML = `
            <label for="parcel-machine"><strong>Select a Parcel Machine:</strong></label>
            <select id="parcel-machine" style="width: 100%; padding: 5px; margin-top: 5px;">
                <option value="">Select...</option>
                <option value="machine_1">Parcel Machine 1 - Main Street 123</option>
                <option value="machine_2">Parcel Machine 2 - Elm Street 456</option>
                <option value="machine_2">Parcel Machine 3 - Oak Avenue 789</option>
            </select>
        `;

        // insert the html above the shipping options
        shippingOptions.insertAdjacentElement('beforebegin', parcelDiv);

        let orderId = document.getElementById('order-id')?.innerText ?? null; 

        // Send POST request to server when a parcel machine is selected
        document.getElementById('parcel-machine').addEventListener('change', async function(event) {
            let selectedParcel = event.target.value;
            localStorage.setItem('selectedParcel', selectedParcel);

            if (selectedParcel) {
                try {
                    await fetch('https://fd00-89-221-127-29.ngrok-free.app/api/saveParcel', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ parcel: selectedParcel, orderId: orderId })
                    });
                    // eslint-disable-next-line no-console
                    console.log("Parcel selection sent to server:", selectedParcel);
                } catch (error) {
                    console.error("Error sending parcel selection:", error);
                }
            }
        });
    }

    addParcelSelector();
})();
