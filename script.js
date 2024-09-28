document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch data from CoinGecko API
    const fetchCryptoData = async () => {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            updateTable(data); 
        } catch (error) {
            console.error('Error fetching the cryptocurrency data:', error);
        }
    };

    // Function to update the table with fetched data
    const updateTable = (data) => {
        const tbody = document.getElementById('PriceChange');
        tbody.innerHTML = ''; // Clear previous rows if any

        data.forEach(crypto => {
            const row = document.createElement('tr');
            
            // Creating table cells for name, symbol, current price, and 24h change
            const nameCell = document.createElement('td');
            nameCell.textContent = crypto.name;

            const symbolCell = document.createElement('td');
            symbolCell.textContent = crypto.symbol.toUpperCase();

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${crypto.current_price.toLocaleString()}`;

            const changeCell = document.createElement('td');
            changeCell.textContent = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
         
            if (crypto.price_change_percentage_24h > 5) {
                row.classList.add("green-highlight");
            } else if (crypto.price_change_percentage_24h >= 0 && crypto.price_change_percentage_24h <= 5) {
                row.classList.add("yellow-highlight");
            } else if (crypto.price_change_percentage_24h < 0) {
                row.classList.add("red-highlight");
            }
          

            // Append cells to the row
            row.appendChild(nameCell);
            row.appendChild(symbolCell);
            row.appendChild(priceCell);
            row.appendChild(changeCell);

            // Append row to table body
            tbody.appendChild(row);
        });
    };

    // Fetch the data when the page loads
    fetchCryptoData();
});
