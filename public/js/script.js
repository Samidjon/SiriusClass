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
      ? (window.siriusLanguage === "en" ? "Show less" : "Скрыть")
      : (window.siriusLanguage === "en" ? "Learn more" : "Подробнее");
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

const menuButton = document.querySelector(
  "[data-menu-button]"
);

const navigation = document.querySelector(
  "[data-navigation]"
);

const menuOverlay = document.querySelector(
  "[data-menu-overlay]"
);

function openMobileMenu() {
  if (!menuButton || !navigation || !menuOverlay) {
    return;
  }

  navigation.classList.add("is-open");
  menuButton.classList.add("is-active");
  menuOverlay.classList.add("is-visible");
  document.body.classList.add("menu-open");

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Закрыть меню");
}

function closeMobileMenu() {
  if (!menuButton || !navigation || !menuOverlay) {
    return;
  }

  navigation.classList.remove("is-open");
  menuButton.classList.remove("is-active");
  menuOverlay.classList.remove("is-visible");
  document.body.classList.remove("menu-open");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Открыть меню");
}

function toggleMobileMenu() {
  const isOpen = navigation.classList.contains("is-open");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (menuButton) {
  menuButton.addEventListener("click", toggleMobileMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMobileMenu);
}

if (navigation) {
  const navigationLinks =
    navigation.querySelectorAll("a");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.matches("[data-dropdown-trigger]") && window.matchMedia("(max-width: 900px)").matches) {
        event.preventDefault();
        const dropdown = link.closest("[data-nav-dropdown]");
        const opened = dropdown.classList.toggle("is-open");
        link.setAttribute("aria-expanded", String(opened));
        return;
      }
      closeMobileMenu();
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMobileMenu();
  }
});

/* =========================================================
   Sirius Class redesign: loading, sticky header, cursor,
   scroll reveal, product dropdown/filter and RU/EN toggle.
   ========================================================= */
(() => {
  const root = document.documentElement;
  const body = document.body;
  const loader = document.querySelector('#site-preloader');
  const progressText = document.querySelector('#preloader-progress');
  const progressBar = document.querySelector('#preloader-bar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  body.classList.add('is-loading');

  let progress = 0;
  let loaderFinished = false;
  let progressTimer;
  const setProgress = (value) => {
    progress = Math.max(progress, Math.min(100, value));
    if (progressText) progressText.textContent = `${String(Math.round(progress)).padStart(2, '0')}%`;
    if (progressBar) progressBar.style.width = `${progress}%`;
  };
  const finishLoader = () => {
    if (loaderFinished) return;
    loaderFinished = true;
    window.clearInterval(progressTimer);
    setProgress(100);
    window.setTimeout(() => {
      loader?.classList.add('is-hidden');
      body.classList.remove('is-loading');
      document.dispatchEvent(new CustomEvent('sirius:ready'));
    }, reduceMotion ? 0 : 300);
  };
  if (loader) {
    progressTimer = window.setInterval(() => {
      if (loaderFinished) return;
      setProgress(progress < 62 ? progress + 6 : progress < 88 ? progress + 1.7 : progress + .35);
    }, 100);
    window.addEventListener('load', finishLoader, { once: true });
    window.setTimeout(finishLoader, 6500);
    if (document.readyState === 'complete') finishLoader();
  }

  // Header stays visible and gains a compact shadow while scrolling.
  const header = document.querySelector('[data-site-header]');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Dropdown supports hover, keyboard focus and tap/click.
  const dropdown = document.querySelector('[data-nav-dropdown]');
  const dropdownTrigger = document.querySelector('[data-dropdown-trigger]');
  dropdownTrigger?.addEventListener('click', (event) => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      event.preventDefault();
      const opened = dropdown.classList.toggle('is-open');
      dropdownTrigger.setAttribute('aria-expanded', String(opened));
    }
  });
  document.addEventListener('click', (event) => {
    if (dropdown && !dropdown.contains(event.target) && !window.matchMedia('(max-width: 900px)').matches) {
      dropdown.classList.remove('is-open');
      dropdownTrigger?.setAttribute('aria-expanded', 'false');
    }
  });

  // Custom cursor only on fine pointers, never on touch screens.
  const dot = document.querySelector('[data-cursor-dot]');
  const ring = document.querySelector('[data-cursor-ring]');
  if (dot && ring && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    body.classList.add('has-custom-cursor');
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    window.addEventListener('pointermove', (event) => {
      mouseX = event.clientX; mouseY = event.clientY;
      dot.style.left = `${mouseX}px`; dot.style.top = `${mouseY}px`;
    }, { passive: true });
    const moveRing = () => {
      ringX += (mouseX - ringX) * .18;
      ringY += (mouseY - ringY) * .18;
      ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`;
      requestAnimationFrame(moveRing);
    };
    requestAnimationFrame(moveRing);
    document.querySelectorAll('a, button, input, textarea, select, [role="button"]').forEach((element) => {
      element.addEventListener('pointerenter', () => body.classList.add('cursor-hover'));
      element.addEventListener('pointerleave', () => body.classList.remove('cursor-hover'));
    });
  }

  // Reveal page sections as they enter the viewport.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    body.classList.add('js-motion');
    const revealTargets = document.querySelectorAll(
      'main > section:not(.hero), .section-heading, .advantages__grid > *, .products-grid > *, .services-grid > *, .portfolio-grid > *, .about-mission__grid > *, .contact-information-card, .contact-choice__card, .contacts-faq__grid > *, .order-information__grid > *'
    );
    revealTargets.forEach((element, index) => {
      element.classList.add('reveal');
      if (index % 4 < 3) element.classList.add(`reveal-delay-${(index % 3) + 1}`);
    });
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach((element) => observer.observe(element));
  }

  // Category links from the Products dropdown filter the real product data.
  const productCardsForFilter = [...document.querySelectorAll('[data-product-slug]')];
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get('category');
  const countLabel = document.querySelector('[data-products-count]');
  const resetFilter = document.querySelector('[data-products-reset]');
  const applyProductFilter = (category) => {
    if (!productCardsForFilter.length) return;
    let visible = 0;
    productCardsForFilter.forEach((card) => {
      const matches = !category || card.dataset.productSlug === category;
      card.classList.toggle('is-filtered-out', !matches);
      if (matches) visible += 1;
    });
    if (countLabel) countLabel.textContent = language === 'en' ? `${visible} products` : `${visible} товаров`;
    if (resetFilter) resetFilter.hidden = !category;
  };
  if (requestedCategory) applyProductFilter(requestedCategory);
  resetFilter?.addEventListener('click', () => {
    applyProductFilter('');
    const cleanUrl = `${window.location.pathname}`;
    window.history.replaceState({}, '', cleanUrl);
  });

  // Small client-side dictionary keeps the existing EJS content and routes intact.
  const translations = {
    navHome: ['Главная', 'Home'], navServices: ['Услуги', 'Services'], navProducts: ['Продукция', 'Products'],
    navPortfolio: ['Портфолио', 'Portfolio'], navAbout: ['О компании', 'About us'], navContacts: ['Контакты', 'Contact'],
    navQuote: ['Рассчитать заказ', 'Get a quote'], headerOrder: ['Оформить заказ', 'Place an order'],
    productCategories: ['Категории продукции', 'Product categories'], catStickers: ['Самоклейки', 'Self-adhesive labels'],
    catCards: ['Визитки', 'Business cards'], catBooklets: ['Буклеты', 'Booklets'], catBags: ['Бумажные пакеты', 'Paper bags'],
    catMenus: ['Меню', 'Menus'], allProducts: ['Вся продукция', 'All products'], preloaderCaption: ['ПЕЧАТАЕМ ВАШИ ИДЕИ', 'PRINTING YOUR IDEAS'],
    footerContactsTitle: ['Контакты', 'Contact'], footerAddressTitle: ['Адрес', 'Address'],
    footerTagline: ['Современная полиграфия для бизнеса и частных клиентов.', 'Modern printing for businesses and individual clients.'],
    copyright: ['Все права защищены.', 'All rights reserved.'],
    showAllProducts: ['Показать всё', 'Show all products'],
  };
  const phraseTranslations = {
    'Профессиональная полиграфия': 'Professional printing',
    'Печатаем идеи, которые помогают вашему бизнесу выделяться': 'We print ideas that help your business stand out',
    'Визитки, буклеты, баннеры, упаковка, сувенирная продукция и другие полиграфические услуги.': 'Business cards, booklets, banners, packaging, promotional products and more.',
    'Рассчитать заказ': 'Get a quote', 'Наша продукция': 'Our products', 'Почему выбирают нас': 'Why choose us',
    'Качественная печать в удобные сроки': 'Quality printing, delivered on time', 'Высокое качество': 'High quality',
    'Используем современное оборудование и качественные материалы.': 'We use modern equipment and quality materials.',
    'Быстрое изготовление': 'Fast production', 'Выполняем срочные и стандартные заказы точно в срок.': 'We deliver both urgent and standard orders on time.',
    'Помощь с дизайном': 'Design support', 'Подготовим макет или проверим ваш файл перед печатью.': 'We can prepare a layout or check your file before printing.',
    'Каталог продукции': 'Product catalogue', 'Полиграфическая и сувенирная продукция': 'Print and promotional products',
    'Мы изготавливаем печатную, рекламную и сувенирную продукцию для компаний, мероприятий и частных заказов.': 'We produce print, advertising and promotional products for businesses, events and individual orders.',
    'Подробнее': 'Learn more', 'Скрыть': 'Show less', 'Заказать': 'Order', 'Добавьте фотографию': 'Add a photo',
    'Не нашли нужную продукцию?': 'Didn’t find what you need?', 'Отправьте нам описание вашего заказа': 'Tell us about your order',
    'Мы поможем подобрать материал, размер, способ печати и подготовить макет.': 'We will help choose the material, size, printing method and prepare the artwork.',
    'Связаться с нами': 'Contact us', 'Наши возможности': 'What we do',
    'Полиграфические услуги для бизнеса и частных клиентов': 'Printing services for businesses and individuals',
    'Выполняем полный цикл работ: от разработки дизайна и подготовки макета до печати, обработки и доставки заказа.': 'We handle the full process: design and artwork preparation, printing, finishing and delivery.',
    'Цифровая печать': 'Digital printing', 'Офсетная печать': 'Offset printing', 'Широкоформатная печать': 'Large-format printing',
    'УФ-печать': 'UV printing', 'Дизайн и подготовка макета': 'Design and artwork preparation', 'Ламинация': 'Lamination',
    'Резка и вырубка': 'Cutting and die-cutting', 'Брендирование сувениров': 'Promotional product branding', 'Заказать услугу': 'Order this service',
    'Наши работы': 'Our work', 'Проекты, которые мы реализовали для наших клиентов': 'Projects created for our clients',
    'Посмотрите примеры печатной, сувенирной и рекламной продукции, изготовленной нашей командой.': 'Explore examples of print, promotional and advertising products made by our team.',
    'Все работы': 'All work', 'Полиграфия': 'Print', 'Упаковка': 'Packaging', 'Сувениры': 'Promotional items', 'Брендинг': 'Branding',
    'Добавьте фотографию проекта': 'Add a project photo', 'Заказать похожий проект': 'Order a similar project',
    'В этой категории пока нет проектов.': 'There are no projects in this category yet.', 'выполненных заказов': 'completed orders',
    'постоянных клиентов': 'returning clients', 'видов продукции': 'product types', 'лет опыта': 'years of experience',
    'Ваш проект может быть следующим': 'Your project could be next', 'Расскажите нам о своей идее': 'Tell us about your idea',
    'Обсудить проект': 'Discuss your project', 'О нашей компании': 'About our company',
    'Помогаем превращать идеи в качественную печатную продукцию': 'We turn ideas into high-quality printed products',
    'Посмотреть продукцию': 'Explore products', 'Наша история': 'Our story',
    'От небольшой мастерской до полного цикла производства': 'From a small workshop to full-service production',
    'Наш подход': 'Our approach', 'Качество, ответственность и внимание к деталям': 'Quality, responsibility and attention to detail',
    'Полный цикл производства': 'Full production cycle', 'Современное оборудование': 'Modern equipment',
    'Заказы разного объёма': 'Orders of every size', 'Индивидуальный подход': 'A personal approach',
    'Свяжитесь с нами': 'Get in touch', 'Обсудим ваш заказ и поможем подобрать решение': 'Let’s discuss your order and find the right solution',
    'Телефон': 'Phone', 'Позвоните нам для быстрого обсуждения заказа.': 'Call us to discuss your order quickly.', 'Email': 'Email',
    'Отправьте макет, техническое задание или вопрос.': 'Send us your artwork, brief or question.', 'Адрес': 'Address',
    'Здесь можно получить готовый заказ.': 'Collect your completed order here.', 'График работы': 'Business hours',
    'Понедельник — суббота': 'Monday — Saturday', 'Выберите удобный способ связи': 'Choose how you would like to contact us',
    'Написать сообщение': 'Send a message', 'Быстро обсудите заказ, стоимость и сроки.': 'Discuss your order, pricing and timing.',
    'Отправить письмо': 'Send an email', 'Отправьте описание заказа и прикрепите макет.': 'Describe your order and attach your artwork.',
    'Частые вопросы': 'Frequently asked questions', 'Полезная информация перед оформлением заказа': 'Helpful information before placing an order',
    'Можно ли заказать небольшой тираж?': 'Can I order a small print run?', 'Можно ли отправить свой макет?': 'Can I send my own artwork?',
    'Сколько времени занимает изготовление?': 'How long does production take?', 'Можно ли заказать разработку дизайна?': 'Can I order design services?',
    'Оформление заказа': 'Place an order', 'Расскажите нам о вашем заказе': 'Tell us about your order',
    'Для расчёта стоимости свяжитесь с нами через Telegram или отправьте письмо на электронную почту.': 'Contact us on Telegram or by email to receive a quote.',
    'Вы выбрали:': 'You selected:', 'Быстрый способ': 'Quick contact', 'Напишите нам в Telegram': 'Message us on Telegram',
    'Перейти в Telegram': 'Open Telegram', 'Электронная почта': 'Email', 'Отправьте письмо': 'Send an email',
    'Написать на email': 'Email us', 'Что указать в сообщении': 'What to include in your message',
    'Информация для быстрого расчёта стоимости': 'Information for a quick quote', 'Название продукции': 'Product name',
    'Количество': 'Quantity', 'Размер и материал': 'Size and material', 'Желаемый срок': 'Desired deadline',
    'Дизайн или макет': 'Design or artwork', 'Дополнительные пожелания': 'Additional requirements',
    'Не уверены, что выбрать?': 'Not sure what to choose?', 'Мы поможем подобрать подходящий вариант': 'We’ll help you choose the right option',
    'Посмотреть контакты': 'View contacts', 'Современная полиграфия для бизнеса и частных клиентов.': 'Modern printing for businesses and individual clients.',
    'Самоклейка': 'Self-adhesive labels', 'Визитки': 'Business cards', 'Бейджики': 'Badges', 'Термосы': 'Thermoses', 'Кружки': 'Mugs', 'Бумажные пакеты': 'Paper bags', 'Меню': 'Menus', 'Блокноты': 'Notebooks', 'Буклеты': 'Booklets',
    'Рекламная продукция': 'Advertising products', 'Деловая полиграфия': 'Business printing', 'Корпоративная продукция': 'Corporate products', 'Сувенирная продукция': 'Promotional products', 'Упаковка': 'Packaging', 'Полиграфия для бизнеса': 'Business printing', 'Рекламная полиграфия': 'Advertising print',
    'Печать самоклеящихся наклеек для упаковки, витрин, автомобилей и рекламной продукции.': 'Self-adhesive stickers for packaging, shop windows, vehicles and advertising.',
    'Классические и дизайнерские визитки для компаний, специалистов и личного бренда.': 'Classic and custom business cards for companies, professionals and personal brands.',
    'Персональные бейджи для сотрудников, конференций, выставок и мероприятий.': 'Personalised badges for staff, conferences, exhibitions and events.',
    'Термосы и термокружки с логотипом, надписью или индивидуальным изображением.': 'Thermoses and travel mugs with a logo, text or custom artwork.',
    'Кружки с фотографиями, логотипами, надписями и индивидуальным дизайном.': 'Mugs featuring photos, logos, lettering and custom designs.',
    'Брендированные бумажные пакеты для магазинов, мероприятий и подарочной упаковки.': 'Branded paper bags for shops, events and gift packaging.',
    'Печать меню для ресторанов, кафе, кофеен, баров и гостиниц.': 'Menu printing for restaurants, cafés, bars and hotels.',
    'Фирменные блокноты с логотипом компании и индивидуальным оформлением.': 'Branded notebooks with company logos and custom artwork.',
    'Информационные и рекламные буклеты для презентации товаров, услуг и компаний.': 'Informational and promotional booklets to present products, services and companies.',
    'Любой размер и форма': 'Any size and shape', 'Матовая или глянцевая поверхность': 'Matte or glossy finish', 'Полноцветная печать': 'Full-colour printing', 'Печать от небольшого тиража': 'Small print runs available',
    'Стандартный размер 90 × 50 мм': 'Standard size: 90 × 50 mm', 'Бумага разной плотности': 'Paper in different weights', 'Односторонняя или двусторонняя печать': 'Single- or double-sided printing', 'Матовая и глянцевая ламинация': 'Matte and gloss lamination',
    'Пластиковые и бумажные модели': 'Plastic and paper options', 'Индивидуальный дизайн': 'Custom design', 'Печать имени и должности': 'Name and job title printing', 'Различные варианты крепления': 'Different attachment options',
    'Минимальный заказ от 10 штук': 'Minimum order: 10 pieces', 'Нанесение логотипа': 'Logo application', 'Корпоративные заказы': 'Corporate orders', 'Несколько вариантов объёма': 'Multiple capacity options',
    'Фотографии и изображения': 'Photos and artwork', 'Логотипы компаний': 'Company logos', 'Именные кружки': 'Personalised mugs', 'Форматы A4 и другие размеры': 'A4 and other sizes', 'Крафтовая бумага': 'Kraft paper', 'Печать фирменного логотипа': 'Company logo printing',
    'Форматы A3, A4 и A5': 'A3, A4 and A5 sizes', 'Плотная бумага': 'Heavyweight paper', 'Индивидуальная обложка': 'Custom cover', 'Различные размеры': 'Various sizes', 'Пружина или клеевое соединение': 'Wire binding or perfect binding', 'Различные форматы': 'Various formats', 'Несколько вариантов сложения': 'Multiple fold options', 'Подходит для рекламных мероприятий': 'Ideal for promotional events',
    'Быстрая полноцветная печать небольших и средних тиражей. Подходит для визиток, листовок, меню, сертификатов и приглашений.': 'Fast full-colour printing for small and medium runs. Ideal for business cards, flyers, menus, certificates and invitations.',
    'Качественная и экономичная печать больших тиражей буклетов, каталогов, журналов и рекламных материалов.': 'High-quality, cost-effective printing for large runs of booklets, catalogues, magazines and advertising materials.',
    'Изготовление баннеров, постеров, плакатов, вывесок и рекламных изображений большого размера.': 'Production of banners, posters, signs and large-format advertising graphics.',
    'Нанесение ярких и устойчивых изображений на пластик, стекло, металл, дерево, акрил и другие поверхности.': 'Applying vivid, durable graphics to plastic, glass, metal, wood, acrylic and other surfaces.',
    'Разработаем дизайн с нуля или проверим готовый файл, чтобы он соответствовал требованиям печати.': 'We can create a design from scratch or check your file against print requirements.',
    'Защитим продукцию матовой или глянцевой плёнкой от влаги, загрязнений и механических повреждений.': 'Protect products with matte or gloss film against moisture, dirt and wear.',
    'Обрезка продукции до необходимого размера и изготовление наклеек, бирок и карточек нестандартной формы.': 'Trim products to size and create custom-shaped stickers, tags and cards.',
    'Нанесение логотипов, имён, надписей и изображений на кружки, термосы, блокноты и другую продукцию.': 'Apply logos, names, lettering and graphics to mugs, thermoses, notebooks and other products.',
    'Наша компания начала работу с простой целью — сделать качественную печать доступной для малого бизнеса, организаций и частных клиентов.': 'Our company started with a simple goal: to make quality printing accessible to small businesses, organisations and individuals.',
    'Сегодня мы выполняем полный цикл работ: помогаем подготовить дизайн, подбираем материал, печатаем продукцию, выполняем ламинацию, резку, сборку и нанесение фирменной символики.': 'Today we handle the full production process: design preparation, material selection, printing, lamination, cutting, assembly and branding.',
    'Для нас важно не просто напечатать заказ, а помочь клиенту получить продукцию, которая соответствует его задачам и представляет бренд профессионально.': 'We do more than print orders: we help clients get products that meet their needs and present their brand professionally.',
    'Помогать компаниям и людям качественно представлять свои идеи с помощью современной полиграфии.': 'Help businesses and people present their ideas through modern, high-quality print.',
    'Мы проверяем макеты, материалы, цветопередачу и готовую продукцию перед передачей клиенту.': 'We check artwork, materials, colour accuracy and finished products before delivery.',
    'Согласовываем стоимость и сроки заранее, информируя клиента о каждом важном этапе работы.': 'We agree on costs and deadlines in advance and keep clients informed at every important stage.',
    'Подбираем способ печати, материал и обработку с учётом бюджета и задач конкретного проекта.': 'We select printing methods, materials and finishes to suit each project’s budget and goals.',
    'От разработки дизайна до печати, обработки и подготовки готовой продукции.': 'From design development to printing, finishing and preparing the final product.',
    'Используем оборудование для цифровой, широкоформатной и сувенирной печати.': 'We use equipment for digital, large-format and promotional printing.',
    'Работаем как с небольшими индивидуальными заказами, так и с крупными корпоративными тиражами.': 'We handle both small custom orders and large corporate print runs.',
    'Срок зависит от продукции, тиража и обработки. Точное время сообщается после обсуждения заказа.': 'Timing depends on the product, quantity and finishing. We confirm the schedule after discussing your order.',
    'Да. Перед печатью мы проверим размер, разрешение, цветовой режим и качество файла.': 'Yes. Before printing, we check the dimensions, resolution, colour mode and file quality.',
    'Да, для цифровой печати доступны небольшие тиражи. Минимальное количество зависит от выбранной продукции.': 'Yes, small runs are available for digital printing. Minimum quantities depend on the product.',
    'Да. Мы можем изменить существующий макет или создать новый дизайн с нуля.': 'Yes. We can revise an existing layout or create a new design from scratch.',
    'Расскажите, какую продукцию вы хотите заказать. Мы уточним детали, рассчитаем стоимость и сроки изготовления.': 'Tell us what you would like to order. We will clarify the details and estimate the cost and production time.',
    'Отправьте название продукции, количество, размеры и желаемый срок изготовления.': 'Send the product name, quantity, dimensions and desired deadline.',
    'К письму можно прикрепить готовый макет, пример дизайна или техническое задание.': 'You can attach finished artwork, a design reference or a technical brief.',
    'Например: визитки, наклейки, кружки, буклеты или бумажные пакеты.': 'For example: business cards, stickers, mugs, booklets or paper bags.',
    'Укажите примерный тираж или количество единиц продукции.': 'Enter the approximate print run or number of items.',
    'Напишите нужный формат, тип бумаги или другой материал.': 'Specify the format, paper type or other material you need.',
    'Сообщите, к какой дате необходимо подготовить заказ.': 'Tell us the date by which you need the order.',
    'Прикрепите готовый макет или сообщите, что вам нужна помощь дизайнера.': 'Attach your artwork or let us know if you need design support.',
    'Укажите ламинацию, резку, форму, упаковку или способ получения.': 'Mention lamination, cutting, shape, packaging or collection preferences.',
    'Расскажите о своей идее, и мы предложим материал, способ печати и подходящий тираж.': 'Tell us your idea and we will suggest materials, a printing method and a suitable quantity.',
    'Отправьте описание заказа и прикрепите макет.': 'Describe your order and attach your artwork.',
    'Баннеры, постеры, плакаты, вывески и рекламные изображения большого размера.': 'Banners, posters, signs and large-format advertising graphics.',
    'Срок зависит от продукции, тиража и обработки.': 'Timing depends on the product, quantity and finishing.',
    'Понедельник — суббота': 'Monday — Saturday', 'Современное оборудование и качественные материалы.': 'Modern equipment and quality materials.'
  };
  let language = 'ru';
  const originalNodes = new Map();
  const originalAttrs = new Map();
  const normalise = (text) => text.replace(/\s+/g, ' ').trim();
  const setLanguage = (nextLanguage) => {
    language = nextLanguage === 'en' ? 'en' : 'ru';
    window.siriusLanguage = language;
    root.lang = language;
    document.querySelectorAll('[data-language]').forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[key]) element.textContent = translations[key][language === 'en' ? 1 : 0];
    });
    document.querySelectorAll('main *').forEach((element) => {
      if (element.children.length) return;
      if (!originalNodes.has(element)) originalNodes.set(element, element.textContent);
      const original = originalNodes.get(element);
      const key = normalise(original);
      if (language === 'ru') { element.textContent = original; return; }
      if (phraseTranslations[key]) element.textContent = phraseTranslations[key];
      else if (element.matches('button') && key === 'Подробнее') element.textContent = 'Learn more';
    });
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((element) => {
      if (!originalAttrs.has(element)) originalAttrs.set(element, element.getAttribute('placeholder'));
      const original = originalAttrs.get(element);
      if (language === 'ru') element.setAttribute('placeholder', original);
      else element.setAttribute('placeholder', ({'Ваше имя':'Your name','Телефон':'Phone number','Email':'Email','Расскажите о заказе':'Tell us about your order'}[original] || original));
    });
    const pageTitles = {
      '/': ['Главная | Sirius Class', 'Home | Sirius Class'],
      '/services': ['Услуги | Sirius Class', 'Services | Sirius Class'],
      '/products': ['Продукция | Sirius Class', 'Products | Sirius Class'],
      '/portfolio': ['Портфолио | Sirius Class', 'Portfolio | Sirius Class'],
      '/about': ['О компании | Sirius Class', 'About us | Sirius Class'],
      '/contacts': ['Контакты | Sirius Class', 'Contact | Sirius Class'],
      '/order': ['Оформить заказ | Sirius Class', 'Place an order | Sirius Class']
    };
    if (pageTitles[window.location.pathname]) document.title = pageTitles[window.location.pathname][language === 'en' ? 1 : 0];
    try { localStorage.setItem('sirius-language', language); } catch (_) {}
    if (countLabel && productCardsForFilter.length) applyProductFilter(params.get('category') || '');
  };
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  try { setLanguage(localStorage.getItem('sirius-language') || 'ru'); } catch (_) { setLanguage('ru'); }


})();
