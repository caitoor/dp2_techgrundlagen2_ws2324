<script>
    import axios from "axios";
    import AddEsp from "./AddEsp.svelte";

    let username = "";
    let password = "";
    let loggedIn = false;
    let token = "";

    async function loginUser() {
        try {
            const response = await axios.post("http://localhost:3001/login", {
                username,
                password,
            });
            console.log("Login erfolgreich:", response);
            token = response.data.token;
            console.log("Token:", token);
            loggedIn = true;
        } catch (error) {
            console.error("Fehler beim Login:", error);
        }
    }

    function logoutUser() {
        token = "";
        loggedIn = false;
    }

    // axios interceptor for JWT:
    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
</script>

{#if !loggedIn}
    <form on:submit|preventDefault={loginUser}>
        <div>
            <label for="username">Benutzername:</label>
            <input id="username" type="text" bind:value={username} />
        </div>
        <div>
            <label for="password">Passwort:</label>
            <input id="password" type="text" bind:value={password} />
        </div>
        <button type="submit">Einloggen</button>
    </form>
{:else}
    <AddEsp {username} />
    <button on:click={logoutUser}>Ausloggen</button>
{/if}
