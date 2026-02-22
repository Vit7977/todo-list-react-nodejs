import { useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();
    localStorage.setItem('lastaccess', location.pathname)

    const username = localStorage.getItem('loggedUsername');
    const email = localStorage.getItem('loggedEmail');

    return ( 
        <div>
            <h1>Home</h1>
            <h2>Nome: {username}</h2>
            <h2>Email: {email}</h2>
        </div>
     );
}

export default Home;