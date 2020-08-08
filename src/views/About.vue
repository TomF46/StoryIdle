<template>
  <div class="about">
    <div class="row">
      <div class="col-xs-12">
        <p class="page-title">About</p>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <p class="section-title">Game description</p>
        <p>
          This is a simple take on an idle/incremental game that follows a linear story progression created as a coding exercise as i enjoy playing incremental games. There are a number of
          stages which are unlocked by getting a specific item unlocked from the shop or as a result of completing previous tasks. Each stage unlocks one or more new tasks with potential new rewards
          and new items become available in the shop as the game progresses.
        </p>
      </div>
      <div class="col-xs-12">
        <p class="section-title">Technical achievment</p>
        <p>
          During the process of creating this game i came across a very common issue with browser based idle games, that is in most browsers when a tab is in the background any time
          based functions e.g. SetTimeout or SetInterval are throttled so a task that should run every second may not run as fast as that in the background. I solved this by measuring the
          difference between expected time and actual time and removing the difference from the next task. If the difference is longer than the task length i reward the user with the rewards
          for the number of missed cycles. I can now see that over a set amount of time the same number of cycles are complete whether the tab is open or in the background.
        </p>
      </div>
      <div class="col-xs-12">
        <p class="section-title">Technlogy used</p>
        <ul>
          <li>Vue framework</li>
          <li>Vuex (Vue state management)</li>
          <li>Flexbox grid</li>
          <li>SCSS</li>
          <li>ES6</li>
          <li>Localforage</li>
          <li>Service workers</li>
          <li>Manifest.json for PWA support</li>
          <li>Vue modal plugin</li>
          <li>Vue notification plugin</li>
        </ul>
      </div>
      <div class="col-xs-12">
        <p class="section-title">Thanks</p>
        <ul>
          <li>
            <a href="https://icons8.com/">https://icons8.com/</a> for supplying free icons used throught
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="scss">
.about {
  .section-title {
    text-decoration: underline;
    font-size: 1.2em;
  }
}
</style>