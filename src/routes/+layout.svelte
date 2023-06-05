<nav>
    <ul>THolyV</ul>
    <ul>
        <li><a href="/">contributors</a></li>
        <li><a href="/">contact</a></li>
    </ul>
</nav>

<slot />

<style>
    nav{
        background-color: rgb(130, 133, 133);
    }
    ul{
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
    }
</style>
