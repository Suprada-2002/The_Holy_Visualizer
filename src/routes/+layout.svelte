<main>
  <nav>
    <ul>
      <a>THolyV</a>
    </ul>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About Us</a></li>
    </ul>
  </nav>
  <slot />
  <footer>made by @Suprada-2002</footer>
</main>

<style lang="scss">
  main {
    @include absolute;
    @include fullscreen;
    @include flex(column);
    background-color: $pri;
    justify-content: space-between;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
  }
  nav {
    @include section($navbar-height, 100vw);
    @include shadow;
    max-height: $navbar-max-height;
    background-color: $sec;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    padding: 7px 0px;
  }
  footer {
    @include section($footer-height, 100vw);
    @include flex(row);
    padding-right: 10px;
    justify-content: right;
    align-items: center;
  }
  ul {
    display: flex;
  }
  li {
    list-style: none;
    margin-right: 10px;
  }
  a {
    text-decoration: none;
  }
</style>
