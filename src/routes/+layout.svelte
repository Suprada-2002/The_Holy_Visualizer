<script>
    import "../style.css"
    </script>

<nav>
    <ul><a>THolyV</a></ul>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Us</a></li>
    </ul>
</nav>

<slot />

<style>
    nav{
        background-color: rgb(130, 133, 133);
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
        padding: 7px 0px;
    }
    ul{
       display: flex;  
    }
    li{
        list-style: none;
        margin-right: 10px;
    }
    a{
        text-decoration: none;
    }
</style>
