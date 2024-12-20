document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const enterBtn = document.getElementById('enterBtn');
  const messageSection = document.getElementById('message-section');
  const inputSection = document.getElementById('input-section');
  const congratsMessage = document.getElementById('congratsMessage');
  const celebrateBtn = document.getElementById('celebrateBtn');
  const shareBtn = document.getElementById('shareBtn');

  // サウンド準備
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

      // ユーザー操作後にBGM再生開始（モバイル対応）
      bgMusic.play().catch(() => {
        // モバイルの自動再生制限などで失敗した場合は後で再試行可能
      });

      // 背景にハートを定期的に浮かべる
      startHeartsAnimation();
    } else {
      alert("名前を入力してください！");
    }
  });

  celebrateBtn.addEventListener('click', () => {
    // コンフェッティ発生
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // 祝福サウンド再生
    cheerSound.currentTime = 0;
    cheerSound.play();
  });

  shareBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("URLをコピーしました！");
    } catch (err) {
      alert("コピーできませんでした。手動でコピーしてください。");
    }
  });

  function startHeartsAnimation() {
    // 一定間隔でハートを生成
    setInterval(() => {
      createFloatingHeart();
    }, 1500);
  }

  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    document.body.appendChild(heart);

    // 横位置をランダムに決定
    const maxWidth = window.innerWidth;
    const startX = Math.random() * (maxWidth - 32);
    heart.style.left = `${startX}px`;
    heart.style.bottom = '-50px';

    // 一定時間後に削除
    setTimeout(() => {
      heart.remove();
    }, 3000);
  }
});
