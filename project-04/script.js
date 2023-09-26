// select all necessary elements

const notificationItems = document.querySelectorAll(".item"),
  markAllRead = document.querySelector(".mark__all"),
  pendingNotification = document.getElementById("pending-notification");

let originalNumber = parseInt(pendingNotification.textContent);
let counter = originalNumber;

notificationItems.forEach((item) => {
  const markRead = item.querySelector(".mark__read");
  const dot = item.querySelector(".item__dot");

  markRead.addEventListener("click", () => {
    if (markRead.textContent === "Mark read") {
      item.classList.add("item__read");
      dot.classList.add("hide");
      markRead.textContent = "Mark unread";

      counter -= 1;
      pendingNotification.textContent = counter;
    } else {
      item.classList.remove("item__read");
      dot.classList.remove("hide");
      markRead.textContent = "Mark read";

      counter += 1;
      pendingNotification.textContent = counter;
    }
  });
});

markAllRead.addEventListener("click", () => {
  if (markAllRead.textContent === "Mark all as read") {
    markAllRead.textContent = "Mark all as unread";
    pendingNotification.textContent = "0";

    notificationItems.forEach((item) => {
      const markRead = item.querySelector(".mark__read");
      const dot = item.querySelector(".item__dot");

      item.classList.add("item__read");
      dot.classList.add("hide");
      markRead.textContent = "Mark unread";
    });
    counter = 0;
  } else if (markAllRead.textContent === "Mark all as unread") {
    markAllRead.textContent = "Mark all as read";
    pendingNotification.textContent = originalNumber;

    notificationItems.forEach((item) => {
      const markRead = item.querySelector(".mark__read");
      const dot = item.querySelector(".item__dot");

      item.classList.remove("item__read");
      dot.classList.remove("hide");
      markRead.textContent = "Mark read";
    });
    counter = originalNumber;
  }
});
