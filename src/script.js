//@ts-check
document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('.button');
  var svg = document.querySelector('#svg-container img');

  function animateSVG(duration) {
      var endPosition = window.innerWidth - svg.clientWidth - 200;
      console.log(`window.innerWidth: ${window.innerWidth} - svg.clientWidth: ${svg.clientWidth} - endPosition: ${endPosition}`);
      var startPosition = 0;
      var startTime = null;

      function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var elapsedTime = timestamp - startTime;
          var progress = elapsedTime / duration;
          var currentPosition = startPosition + (endPosition - startPosition) * progress;
          svg.style.transform = `translateX(${currentPosition}px)`;

          if (progress < 1) {
              window.requestAnimationFrame(step);
          }
      }

      window.requestAnimationFrame(step);
  }

  function startCountdown(seconds) {
      button.textContent = `${seconds}s`;
      button.disabled = true;

      var interval = setInterval(() => {
          seconds--;
          button.textContent = seconds > 0 ? `${seconds}s` : 'Comença!';
          if (seconds <= 0) {
              clearInterval(interval);
              button.disabled = false;
          }
      }, 1000);
  }

  button.addEventListener('click', function() {
      animateSVG(5000);
      startCountdown(5);
  });
});
