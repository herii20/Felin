const box = document.querySelector(".giftbox");
const giftWrap = document.getElementById("merrywrap");
const videoWrap = document.getElementById("video-intro");
const video = document.getElementById("introVideo");
const audio1 = document.getElementById("birthday-audio");
const audio2 = document.getElementById("audio2");
const canvas = document.getElementById("confetti");

// CONFETTI
const confetti = new ConfettiGenerator({ target: "confetti" });

// KLIK KADO → VIDEO MUNCUL + MULAI MUSIK PERTAMA
box.addEventListener("click", () => {
  giftWrap.style.display = "none";

  // mulai musik pertama
  audio1.volume = 0.7;
  audio1.play().catch(err => console.log("Audio1 autoplay blocked:", err));

  // tampilkan video
  videoWrap.classList.remove("hidden");
  videoWrap.style.opacity = "0";
  videoWrap.style.transform = "scale(0.6)";

  setTimeout(() => {
    videoWrap.style.transition = "all 0.8s ease";
    videoWrap.style.opacity = "1";
    videoWrap.style.transform = "scale(1)";
  }, 50);

  // play video
  video.play();
}, { once: true });

// VIDEO SELESAI → AUDIO2 + CONFETTI + TEKS
video.addEventListener("ended", () => {
  videoWrap.style.transition = "opacity 0.8s ease";
  videoWrap.style.opacity = "0";

  setTimeout(() => {
    videoWrap.classList.add("hidden");

    // hentikan musik pertama
    audio1.pause();

    // mulai musik kedua
    audio2.volume = 0.7;
    audio2.play().catch(err => console.log("Audio2 autoplay blocked:", err));

    // mulai confetti
    confetti.render();

    // tampilkan teks ucapan
    showBirthdayTyping();
  }, 800);
});

// TEKS UCAPAN MENGETIK – aman untuk banyak kalimat
function showBirthdayTyping() {
  const messages = [
    "Selamat Ulang Tahun 🎂",
    "Nurul Azizah",
    "Adikku yang baik hati💖",
    "Suka menabung dan tidak sombong😂",
    "Hari ini hari ulang tahunmu🥳",
    "Bertambah satu tahun usiamu",
    "Ku doakan bahagia selalu untukmu ",
    "Tercapai segala cita-citamu",
    "Semoga segala harapan segera terkabulkan",
    "Dan segala kelelahan tergantikan dengan kebahagiaan",
    "Semakin bertambahnya usia",
    "Tambah berat juga beban dipundak",
    "Semakin dikuatin lagi yaa💪",
    "Semangat terus🔥",
  ];

  const container = document.createElement("div");
  container.className = "birthday-text";
  container.style.position = "fixed";
  container.style.top = "30%";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.width = "80%";
  container.style.maxHeight = "60vh";
  container.style.overflowY = "auto";
  container.style.textAlign = "center";
  container.style.color = "#fff";
  container.style.fontWeight = "bold";
  container.style.lineHeight = "1.4";
  container.style.textShadow = "0 0 10px #ff69b4";
  container.style.zIndex = "9999";
  container.style.fontSize = "clamp(20px, 4vw, 32px)";

  document.body.appendChild(container);

  let i = 0;

  function typeMessage() {
    if (i >= messages.length) return;

    const p = document.createElement("p");
    p.style.marginBottom = "14px";
    container.appendChild(p);

    const text = messages[i];
    let charIndex = 0;

    function typeLetter() {
      if (charIndex < text.length) {
        p.textContent += text.charAt(charIndex);
        charIndex++;

        // AUTO SCROLL HALUS
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth"
        });

        setTimeout(typeLetter, 70);
      } else {
        i++;
        setTimeout(typeMessage, 600);
      }
    }

    typeLetter();
  }

  typeMessage();
}
