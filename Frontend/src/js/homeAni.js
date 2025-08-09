// homeAni.js
// Animación Lottie para la pantalla de carga

document.addEventListener('DOMContentLoaded', function () {
  var lottieContainer = document.getElementById('lottie');
  if (lottieContainer && window.lottie) {
    window.lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // Cambia la ruta por la animación que desees
      path: '/static/src/json/animacion_orquidea.json'
    });
  }
});
