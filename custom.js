// custom.js
window.addEventListener("DOMContentLoaded", () => {
  // Buat style dasar ala notifikasi iPhone
  const style = document.createElement("style");
  style.textContent = `
    body {
      background: transparent !important;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .iphone-popup {
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 18px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      opacity: 0;
      transform: translateY(-20px);
      animation: slideIn 0.4s ease forwards;
      max-width: 320px;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .iphone-popup.fadeOut {
      animation: fadeOut 0.5s ease forwards;
    }

    .iphone-popup .username {
      font-weight: 600;
      color: #000;
      font-size: 15px;
    }

    .iphone-popup .message {
      font-size: 14px;
      color: #333;
      line-height: 1.3;
      word-break: break-word;
    }

    @keyframes slideIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
  `;
  document.head.appendChild(style);

  // Pantau elemen chat baru
  const container = document.body;
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (
          node.nodeType === 1 &&
          (node.classList.contains("chat-item") ||
           node.classList.contains("message-row") ||
           node.classList.contains("chat-row"))
        ) {
          const username = node.querySelector(".username")?.innerText || "User";
          const message = node.querySelector(".message")?.innerText || node.innerText || "";
          showPopup(username, message);
        }
      }
    }
  });

  observer.observe(container, { childList: true, subtree: true });

  function showPopup(username, message) {
    const popup = document.createElement("div");
    popup.className = "iphone-popup";
    popup.innerHTML = `
      <div>
        <div class="username">${username}</div>
        <div class="message">${message}</div>
      </div>
    `;
    document.body.appendChild(popup);

    // Hilang otomatis setelah 5 detik
    setTimeout(() => {
      popup.classList.add("fadeOut");
      setTimeout(() => popup.remove(), 600);
    }, 5000);
  }
});
