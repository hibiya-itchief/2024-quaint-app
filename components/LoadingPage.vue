<template>
  <div class="wrapper">
    <div class="loader"></div>
    <div class="wording">
      <div class="letter">L</div>
      <div class="letter">o</div>
      <div class="letter">a</div>
      <div class="letter">d</div>
      <div class="letter">i</div>
      <div class="letter">n</div>
      <div class="letter">g</div>
      <div class="letter circle"></div>
      <div class="letter circle"></div>
      <div class="letter circle"></div>
    </div>
  </div>
</template>

<style>
.wrapper,
.wording {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  height: 100vh;
  flex-direction: column;
}

.circle {
  background-color: #000;
  border-radius: 50%;
  margin: 2px 2px -6px;
  height: 5px;
  width: 5px;
}

.wording {
  padding-top: 15px;
}

.letter {
  font-size: 18px;
  animation: jump 1s ease-in-out infinite;
}

.letter:nth-of-type(2) {
  animation-delay: 0.1s;
}

.letter:nth-of-type(3) {
  animation-delay: 0.2s;
}

.letter:nth-of-type(4) {
  animation-delay: 0.3s;
}

.letter:nth-of-type(5) {
  animation-delay: 0.4s;
}

.letter:nth-of-type(6) {
  animation-delay: 0.5s;
}

.letter:nth-of-type(7) {
  animation-delay: 0.6s;
}

.letter:nth-of-type(8) {
  animation-delay: 0.7s;
}

.letter:nth-of-type(9) {
  animation-delay: 0.8s;
}

.loader {
  width: 35px;
  height: 80px;
  position: relative;
}

.loader::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 3px 5px;
  border-bottom: 4px solid #a7c7cb;
  background: linear-gradient(#fca43c 0 0) bottom no-repeat content-box, #dbe1e3;
  mix-blend-mode: darken;
  animation: sip 2.5s infinite linear;
}

.loader::before {
  content: '';
  position: absolute;
  inset: -18px calc(50% - 2px) 8px;
  background: #eb6b3e;
  transform-origin: bottom;
  transform: rotate(8deg);
}
@keyframes sip {
  0% {
    background-size: 100% 100%;
  }

  100% {
    background-size: 100% 5%;
  }
}

@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>
