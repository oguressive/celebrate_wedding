document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const enterBtn = document.getElementById('enterBtn');
  const messageSection = document.getElementById('message-section');
  const inputSection = document.getElementById('input-section');
  const congratsMessage = document.getElementById('congratsMessage');
  const celebrateBtn = document.getElementById('celebrateBtn');
  const shareBtn = document.getElementById('shareBtn');
  const discoBall = document.getElementById('disco-ball');

  // ユーザーが準備済みのBGMを再生
  const bgMusic = new Audio('assets/bg-music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.3;

  const cheerSound = new Audio('assets/cheer.mp3');
  cheerSound.volume = 0.7;

  enterBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
      congratsMessage.textContent = `${name}、結婚おめでとう！`;
      inputSection.classList.add('hidden');
      messageSection.classList.remove('hidden');

      bgMusic.play().catch(()=>{});
      startParticles();
    } else {
      alert("名前を入力してください！");
    }
  });

  celebrateBtn.addEventListener('click', () => {
    // コンフェッティ連射
    for(let i = 0; i < 5; i++){
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, i * 200);
    }

    // ディスコボール表示
    discoBall.classList.add('show');

    // 背景点滅
    document.querySelector('.background-animated').classList.add('flash-bg');

    cheerSound.currentTime = 0;
    cheerSound.play();

    setTimeout(()=>{
      document.querySelector('.background-animated').classList.remove('flash-bg');
    },1000);
  });

  shareBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("URLをコピーしました！");
    } catch (err) {
      alert("コピーできませんでした。手動でコピーしてください。");
    }
  });

  function startParticles() {
    const shapes = ['heart.png', 'star.png', 'diamond.png']; // colorfulな画像をassetsに用意
    setInterval(() => {
      createFloatingParticle(shapes[Math.floor(Math.random()*shapes.length)]);
    }, 1000);
  }

  function createFloatingParticle(imgName) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.backgroundImage = `url('assets/${imgName}')`;
    document.body.appendChild(particle);

    const maxWidth = window.innerWidth;
    const startX = Math.random() * (maxWidth - 32);
    particle.style.left = `${startX}px`;
    particle.style.bottom = '-50px';

    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
});
