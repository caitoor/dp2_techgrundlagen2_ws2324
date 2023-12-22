<script>
    import axios from 'axios';

    export let username;

    let macAddress = '';

    async function addEspDevice() {
        try {
            const response = await axios.post('http://localhost:3000/add-esp-device', {
                mac: macAddress,
                username: username
            });
            console.log('ESP-Gerät hinzugefügt:', response);
            macAddress = ''; // MAC-Adresse zurücksetzen
        } catch (error) {
            console.log('Fehler beim Hinzufügen des ESP-Geräts:');
            console.error(error);
        }
    }
</script>

<form on:submit|preventDefault={addEspDevice}>
    <div>
        <label for="macAddress">MAC-Adresse:</label>
        <input id="macAddress" type="text" bind:value={macAddress} />
    </div>
    <button type="submit">ESP-Gerät hinzufügen</button>
</form>
