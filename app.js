const express = require("express");
const path = require("path");

const pageRoutes = require("./routes/pages");

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Подключение CSS, JS и изображений
app.use(express.static(path.join(__dirname, "public")));

// Обработка данных из форм
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Маршруты
app.use("/", pageRoutes);

// Страница 404
app.use((req, res) => {
  res.status(404).send("Страница не найдена");
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});