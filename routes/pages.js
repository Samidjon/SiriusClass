const express = require("express");
const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const multer = require("multer");

const products = require("../data/products");
const portfolioProjects = require("../data/portfolio");

const router = express.Router();

const uploadDirectory = path.join(
  __dirname,
  "../uploads/orders"
);

fsSync.mkdirSync(uploadDirectory, {
  recursive: true
});

const allowedFileExtensions = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".ai",
  ".eps",
  ".psd",
  ".zip"
]);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (req, file, callback) => {
    const originalExtension = path
      .extname(file.originalname)
      .toLowerCase();

    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      originalExtension;

    callback(null, uniqueName);
  }
});

const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024
  },

  fileFilter: (req, file, callback) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    if (!allowedFileExtensions.has(extension)) {
      return callback(
        new Error(
          "Допустимые форматы: PDF, PNG, JPG, SVG, AI, EPS, PSD и ZIP."
        )
      );
    }

    callback(null, true);
  }
});

router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная"
  });
});

router.get("/services", (req, res) => {
  res.render("services", {
    title: "Услуги"
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Продукция",
    products: products
  });
});

router.get("/portfolio", (req, res) => {
  res.render("portfolio", {
    title: "Портфолио",
    projects: portfolioProjects
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "О компании"
  });
});

router.get("/contacts", (req, res) => {
  res.render("contacts", {
    title: "Контакты",
    success: req.query.success === "true",
    error: null,
    formData: {}
  });
});

router.post("/contacts", async (req, res) => {
  const {
    name,
    email,
    phone,
    subject,
    message
  } = req.body;

  const formData = {
    name: name?.trim(),
    email: email?.trim(),
    phone: phone?.trim(),
    subject: subject?.trim(),
    message: message?.trim()
  };

  if (!formData.name || !formData.email || !formData.message) {
    return res.status(400).render("contacts", {
      title: "Контакты",
      success: false,
      error:
        "Пожалуйста, заполните имя, email и сообщение.",
      formData
    });
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(formData.email)) {
    return res.status(400).render("contacts", {
      title: "Контакты",
      success: false,
      error: "Введите корректный email.",
      formData
    });
  }

  try {
    const messagesFile = path.join(
      __dirname,
      "../data/contactMessages.json"
    );

    let savedMessages = [];

    try {
      const fileContent = await fs.readFile(
        messagesFile,
        "utf8"
      );

      savedMessages = JSON.parse(fileContent);
    } catch (readError) {
      savedMessages = [];
    }

    savedMessages.push({
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: "new"
    });

    await fs.writeFile(
      messagesFile,
      JSON.stringify(savedMessages, null, 2),
      "utf8"
    );

    res.redirect("/contacts?success=true");
  } catch (error) {
    console.error("Contact form error:", error);

    res.status(500).render("contacts", {
      title: "Контакты",
      success: false,
      error:
        "Не удалось отправить сообщение. Попробуйте ещё раз.",
      formData
    });
  }
});

router.get("/order", (req, res) => {
  const selectedItem =
    req.query.product ||
    req.query.service ||
    req.query.project ||
    "";

  let selectedCategory = "";

  if (req.query.product) {
    selectedCategory = "product";
  } else if (req.query.service) {
    selectedCategory = "service";
  } else if (req.query.project) {
    selectedCategory = "similar-project";
  }

  res.render("order", {
    title: "Оформить заказ",

    success: req.query.success === "true",

    orderNumber:
      typeof req.query.order === "string"
        ? req.query.order
        : "",

    error: null,

    formData: {
      orderCategory: selectedCategory,
      orderItem: selectedItem
    }
  });
});

router.post("/order", (req, res) => {
  upload.single("designFile")(
    req,
    res,
    async (uploadError) => {
      const formData = {
        name: req.body.name?.trim() || "",
        company: req.body.company?.trim() || "",
        email: req.body.email?.trim() || "",
        phone: req.body.phone?.trim() || "",
        orderCategory:
          req.body.orderCategory?.trim() || "",
        orderItem:
          req.body.orderItem?.trim() || "",
        quantity:
          req.body.quantity?.trim() || "",
        size:
          req.body.size?.trim() || "",
        customSize:
          req.body.customSize?.trim() || "",
        material:
          req.body.material?.trim() || "",
        printSides:
          req.body.printSides?.trim() || "",
        finishing:
          req.body.finishing?.trim() || "",
        designOption:
          req.body.designOption?.trim() || "",
        deadline:
          req.body.deadline?.trim() || "",
        delivery:
          req.body.delivery?.trim() || "",
        message:
          req.body.message?.trim() || ""
      };

      if (uploadError) {
        return res.status(400).render("order", {
          title: "Оформить заказ",
          success: false,
          orderNumber: "",
          error:
            uploadError.message ||
            "Не удалось загрузить файл.",
          formData
        });
      }

      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.orderItem ||
        !formData.quantity
      ) {
        if (req.file) {
          await fs.unlink(req.file.path).catch(() => {});
        }

        return res.status(400).render("order", {
          title: "Оформить заказ",
          success: false,
          orderNumber: "",
          error:
            "Заполните имя, email, телефон, продукцию и количество.",
          formData
        });
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(formData.email)) {
        if (req.file) {
          await fs.unlink(req.file.path).catch(() => {});
        }

        return res.status(400).render("order", {
          title: "Оформить заказ",
          success: false,
          orderNumber: "",
          error: "Введите корректный email.",
          formData
        });
      }

      const parsedQuantity = Number(
        formData.quantity
      );

      if (
        !Number.isInteger(parsedQuantity) ||
        parsedQuantity < 1
      ) {
        if (req.file) {
          await fs.unlink(req.file.path).catch(() => {});
        }

        return res.status(400).render("order", {
          title: "Оформить заказ",
          success: false,
          orderNumber: "",
          error:
            "Количество должно быть целым числом больше нуля.",
          formData
        });
      }

      try {
        const ordersFile = path.join(
          __dirname,
          "../data/orders.json"
        );

        let orders = [];

        try {
          const fileContent = await fs.readFile(
            ordersFile,
            "utf8"
          );

          orders = JSON.parse(fileContent);

          if (!Array.isArray(orders)) {
            orders = [];
          }
        } catch (readError) {
          orders = [];
        }

        const orderNumber =
          `PM-${new Date().getFullYear()}-` +
          String(Date.now()).slice(-6);

        const newOrder = {
          id: Date.now(),
          orderNumber,
          ...formData,
          quantity: parsedQuantity,

          uploadedFile: req.file
            ? {
                storedName: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                path: req.file.path
              }
            : null,

          status: "new",
          createdAt: new Date().toISOString()
        };

        orders.push(newOrder);

        await fs.writeFile(
          ordersFile,
          JSON.stringify(orders, null, 2),
          "utf8"
        );

        res.redirect(
          `/order?success=true&order=${encodeURIComponent(
            orderNumber
          )}`
        );
      } catch (error) {
        console.error("Order saving error:", error);

        if (req.file) {
          await fs.unlink(req.file.path).catch(() => {});
        }

        res.status(500).render("order", {
          title: "Оформить заказ",
          success: false,
          orderNumber: "",
          error:
            "Не удалось сохранить заявку. Попробуйте ещё раз.",
          formData
        });
      }
    }
  );
});

module.exports = router;