const ipForm = document.getElementById('ip-form');
const ipInput = document.getElementById('ip-input');
const ipAddress = document.getElementById('ip-address');
const ipLocation = document.getElementById('ip-location');
const ipTimezone = document.getElementById('ip-timezone');
const ipIsp = document.getElementById('ip-isp');

const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

ipForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ip = ipInput.value;
    const apiKey = 'at_WYbgpk0fgYXEghCtDlmHNRYmfaRfZ'; // Replace with your actual API key
    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`);
    const data = await response.json();

    ipAddress.textContent = data.ip;
    ipLocation.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
    ipTimezone.textContent = `UTC ${data.location.timezone}`;
    ipIsp.textContent = data.isp;
    
    const { lat, lng } = data.location;
    map.setView([lat, lng], 13);
    console.log(lat, lng);
    
    L.marker([lat, lng]).addTo(map);
});
