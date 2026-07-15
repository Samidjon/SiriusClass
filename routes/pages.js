const express = require("express");

const products = require("../data/products");
const portfolioProjects = require("../data/portfolio");

const router = express.Router();

// Главная страница
router.get("/", (req, res) => {
  res.render("index", {
    title: "Главная"
  });
});

// Услуги
router.get("/services", (req, res) => {
  res.render("services", {
    title: "Услуги"
  });
});

// Продукция
router.get("/products", (req, res) => {
  res.render("products", {
    title: "Продукция",
    products
  });
});

// Портфолио
router.get("/portfolio", (req, res) => {
  res.render("portfolio", {
    title: "Портфолио",
    projects: portfolioProjects
  });
});

// О компании
router.get("/about", (req, res) => {
  res.render("about", {
    title: "О компании"
  });
});

// Контакты
router.get("/contacts", (req, res) => {
  res.render("contacts", {
    title: "Контакты"
  });
});

// Оформление заказа
router.get("/order", (req, res) => {
  const selectedItem =
    req.query.product ||
    req.query.service ||
    req.query.project ||
    "";

  res.render("order", {
    title: "Оформить заказ",
    selectedItem
  });
});

module.exports = router;