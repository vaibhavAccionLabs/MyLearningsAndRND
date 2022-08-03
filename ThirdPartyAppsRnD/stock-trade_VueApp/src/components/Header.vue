<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to='/' class="navbar-brand" >Stock Trader</router-link>
 
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto">
    <router-link to='/portfolio' activeClass='active' tag='li'><a>Portfolio</a></router-link>
    <router-link to='/stocks' activeClass='active' tag='li'><a>Stocks</a></router-link>
    </ul>
    <ul class="navbar-nav navbar-right">
   <li><a href='#'>End Day</a></li>
   <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" 
        href="#" 
        id="navbarDropdown" 
        role="button" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false">
          Save & load
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Save Data</a>
          <a class="dropdown-item" href="#">Load Data</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Header',
  components: {
  }
}
</script>
