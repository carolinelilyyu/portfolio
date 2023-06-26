<script setup>
  import TierList from './components/TierList.vue'
  import DiscordMembers from './components/Discord.vue'
</script>

<template>
  <header>

    
    <div class="wrapper">
      <TierList msg="You did it!"></TierList>
    </div>

  </header>
  <main>
    <DiscordMembers></DiscordMembers>
  </main>
</template>

<style>

#title {
  text-align: center;
  color: white;
  padding-top: 20px;
}

header {
  line-height: 1.5;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

</style>
