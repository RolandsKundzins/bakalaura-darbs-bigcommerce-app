(function() {
    function addParcelSelector() {
        let shippingOptions = document.getElementById('checkout-shipping-options');
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
                <option value="Parcel Box A">Parcel Box A</option>
                <option value="Parcel Box B">Parcel Box B</option>
            </select>
        `;

        shippingOptions.insertAdjacentElement('beforebegin', parcelDiv);

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
                        body: JSON.stringify({ parcel: selectedParcel })
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
