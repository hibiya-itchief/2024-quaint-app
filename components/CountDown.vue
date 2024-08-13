<template>
  <div style="margin: 20vh auto" class="countdown-container">
    <div class="countdown-text-container">
      <v-row justify="center" style="margin: 0 !important">
        <v-col cols="8">
          <h2 class="countdown-text">
            <v-row justify="center">
              <v-col><div class="char">星</div></v-col>
              <v-col><div class="char">陵</div></v-col>
              <v-col><div class="char">祭</div></v-col>
              <v-col><div class="char">ま</div></v-col>
              <v-col><div class="char">で</div></v-col>
            </v-row>
          </h2>
        </v-col>
      </v-row>
    </div>

    <!-- TIMER -->
    <section class="time-container">
      <div class="wrapper">
        <div class="days">
          <h2 id="days">DD</h2>
          DAYS
        </div>
        <div class="hours">
          <h2 id="hours">HH</h2>
          HOURS
        </div>
        <div class="minutes">
          <h2 id="minutes">MM</h2>
          MINUTES
        </div>
        <div class="seconds">
          <h2 id="seconds">SS</h2>
          SECONDS
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import gsap from 'gsap'

export default Vue.extend({
  data() {
    return {
      i_days: null,
      i_hours: null,
      i_minutes: null,
      i_seconds: null,

      // Change the of this variable.
      // ex: May 22 2024 18:00:00
      // May 22, 2024 at 6PM
      festival_starts_at: 'Sep 14 2024 00:00:00',
    }
  },

  mounted() {
    // setup
    this.i_days = document.querySelector('#days')
    this.i_hours = document.querySelector('#hours')
    this.i_minutes = document.querySelector('#minutes')
    this.i_seconds = document.querySelector('#seconds')

    // animation settings
    const tl = gsap.timeline()

    tl.to('.char', {
      duration: 0.2,
      stagger: 0.1,
      y: -10,
    }).to('.char', {
      delay: 1,
      duration: 0.2,
      stagger: 0.1,
      y: 0,
    })

    const tween = tl
    tween.repeat(-1)
    tween.repeatDelay(5)

    // start timer
    setInterval(
      this.countdown,
      1000,
      this.i_days,
      this.i_hours,
      this.i_minutes,
      this.i_seconds
    )
  },

  methods: {
    countdown(i_days, i_hours, i_minutes, i_seconds) {
      const festival_starts_at_date = new Date(this.festival_starts_at)
      const current_date = new Date()

      const total_seconds = (festival_starts_at_date - current_date) / 1000
      const days = Math.floor(total_seconds / 3600 / 24)
      const hours = Math.floor(total_seconds / 3600) % 24
      const minutes = Math.floor(total_seconds / 60) % 60
      const seconds = Math.floor(total_seconds % 60)

      if (current_date < festival_starts_at_date) {
        i_days.innerHTML = this.formatTime(days)
        i_hours.innerHTML = this.formatTime(hours)
        i_minutes.innerHTML = this.formatTime(minutes)
        i_seconds.innerHTML = this.formatTime(seconds)
      } else {
        i_days.innerHTML = this.formatTime(0)
        i_hours.innerHTML = this.formatTime(0)
        i_minutes.innerHTML = this.formatTime(0)
        i_seconds.innerHTML = this.formatTime(0)
      }
    },

    formatTime(time) {
      return time < 10 ? `0${time}` : time
    },
  },
})
</script>

<style>
@import 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap';

/* RESETS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

body {
  background: #f1f1f1;
  font-family: 'Noto Sans JP', sans-serif;
}

/* COUNTDOWN STYLES */
.countdown-text-container {
  display: block;
}

.countdown-text {
  font-family: serif;
}

.char {
  text-align: center;
}

/* TIMER STYLES */
.time-container {
  z-index: 0;
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-container .wrapper {
  z-index: 1;
  width: 100vw;
  padding: 20px;
  max-height: 400px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.time-container .wrapper div {
  color: #ccc;
  text-align: center;
  width: 24%;
  height: 150px;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
  font-size: 0.7em;
}

.time-container .wrapper div:first-child {
  background: #335594;
  color: white;
}

.time-container .wrapper div:nth-child(2) {
  background: #335594;
  color: white;
}

.time-container .wrapper div:nth-child(3) {
  background: #1c1c1c;
  color: #fff;
}

.time-container .wrapper div:last-child {
  background: #1c1c1c;
  color: #fff;
}

.time-container .wrapper div h2 {
  font-size: 3.5rem;
}
</style>
