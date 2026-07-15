const productButtons = document.querySelectorAll(
  "[data-product-button]"
);

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");

    const fullDescription = productCard.querySelector(
      ".product-card__full-description"
    );

    const isOpen = fullDescription.classList.toggle("is-open");

    button.textContent = isOpen
      ? "Скрыть"
      : "Подробнее";
  });
});

const portfolioFilterButtons = document.querySelectorAll(
  "[data-portfolio-filter]"
);

const portfolioCards = document.querySelectorAll(
  "[data-portfolio-category]"
);

const portfolioEmptyMessage = document.querySelector(
  "[data-portfolio-empty]"
);

portfolioFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.portfolioFilter;

    portfolioFilterButtons.forEach((filterButton) => {
      filterButton.classList.remove("is-active");
    });

    button.classList.add("is-active");

    let visibleProjects = 0;

    portfolioCards.forEach((card) => {
      const projectCategory = card.dataset.portfolioCategory;

      const shouldShow =
        selectedCategory === "all" ||
        projectCategory === selectedCategory;

      card.classList.toggle("is-hidden", !shouldShow);

      if (shouldShow) {
        visibleProjects += 1;
      }
    });

    if (portfolioEmptyMessage) {
      portfolioEmptyMessage.classList.toggle(
        "is-visible",
        visibleProjects === 0
      );
    }
  });
});

const contactMessage = document.querySelector(
  "#contact-message"
);

const contactMessageCounter = document.querySelector(
  "[data-message-counter]"
);

function updateContactMessageCounter() {
  if (!contactMessage || !contactMessageCounter) {
    return;
  }

  contactMessageCounter.textContent =
    `${contactMessage.value.length} / 1000`;
}

if (contactMessage) {
  updateContactMessageCounter();

  contactMessage.addEventListener(
    "input",
    updateContactMessageCounter
  );
}

const orderItemInput = document.querySelector(
  "#order-item"
);

const orderQuantityInput = document.querySelector(
  "#order-quantity"
);

const orderSizeSelect = document.querySelector(
  "[data-order-size]"
);

const orderCustomSizeWrapper = document.querySelector(
  "[data-custom-size]"
);

const orderCustomSizeInput = document.querySelector(
  "#order-custom-size"
);

const orderDeadlineInput = document.querySelector(
  "[data-order-deadline]"
);

const orderFileInput = document.querySelector(
  "[data-order-file]"
);

const orderFileName = document.querySelector(
  "[data-order-file-name]"
);

const orderMessage = document.querySelector(
  "#order-message"
);

const orderMessageCounter = document.querySelector(
  "[data-order-message-counter]"
);

const summaryItem = document.querySelector(
  "[data-summary-item]"
);

const summaryQuantity = document.querySelector(
  "[data-summary-quantity]"
);

const summarySize = document.querySelector(
  "[data-summary-size]"
);

const summaryDeadline = document.querySelector(
  "[data-summary-deadline]"
);

function updateOrderSummary() {
  if (summaryItem && orderItemInput) {
    summaryItem.textContent =
      orderItemInput.value.trim() ||
      "Не выбрана";
  }

  if (summaryQuantity && orderQuantityInput) {
    summaryQuantity.textContent =
      orderQuantityInput.value
        ? `${orderQuantityInput.value} шт.`
        : "Не указано";
  }

  if (summarySize && orderSizeSelect) {
    let sizeText = "Не указан";

    if (
      orderSizeSelect.value === "custom" &&
      orderCustomSizeInput
    ) {
      sizeText =
        orderCustomSizeInput.value.trim() ||
        "Другой размер";
    } else if (orderSizeSelect.value) {
      const selectedOption =
        orderSizeSelect.options[
        orderSizeSelect.selectedIndex
        ];

      sizeText = selectedOption.textContent.trim();
    }

    summarySize.textContent = sizeText;
  }

  if (summaryDeadline && orderDeadlineInput) {
    if (orderDeadlineInput.value) {
      const date = new Date(
        `${orderDeadlineInput.value}T00:00:00`
      );

      summaryDeadline.textContent =
        date.toLocaleDateString("ru-RU");
    } else {
      summaryDeadline.textContent =
        "Не указан";
    }
  }
}

function updateCustomSizeVisibility() {
  if (
    !orderSizeSelect ||
    !orderCustomSizeWrapper
  ) {
    return;
  }

  const showCustomSize =
    orderSizeSelect.value === "custom";

  orderCustomSizeWrapper.classList.toggle(
    "is-visible",
    showCustomSize
  );

  updateOrderSummary();
}

function updateOrderMessageCounter() {
  if (!orderMessage || !orderMessageCounter) {
    return;
  }

  orderMessageCounter.textContent =
    `${orderMessage.value.length} / 1500`;
}

if (orderItemInput) {
  orderItemInput.addEventListener(
    "input",
    updateOrderSummary
  );
}

if (orderQuantityInput) {
  orderQuantityInput.addEventListener(
    "input",
    updateOrderSummary
  );
}

if (orderSizeSelect) {
  orderSizeSelect.addEventListener(
    "change",
    updateCustomSizeVisibility
  );
}

if (orderCustomSizeInput) {
  orderCustomSizeInput.addEventListener(
    "input",
    updateOrderSummary
  );
}

if (orderDeadlineInput) {
  const currentDate =
    new Date().toISOString().split("T")[0];

  orderDeadlineInput.min = currentDate;

  orderDeadlineInput.addEventListener(
    "change",
    updateOrderSummary
  );
}

if (orderFileInput && orderFileName) {
  orderFileInput.addEventListener(
    "change",
    () => {
      const selectedFile =
        orderFileInput.files[0];

      if (!selectedFile) {
        orderFileName.textContent =
          "PDF, PNG, JPG, SVG, AI, EPS, PSD или ZIP. Максимум 20 МБ.";

        return;
      }

      const fileSizeMb =
        selectedFile.size / 1024 / 1024;

      orderFileName.textContent =
        `${selectedFile.name} — ${fileSizeMb.toFixed(2)} МБ`;
    }
  );
}

if (orderMessage) {
  orderMessage.addEventListener(
    "input",
    updateOrderMessageCounter
  );

  updateOrderMessageCounter();
}

updateCustomSizeVisibility();
updateOrderSummary();