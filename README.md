<div align="center">

# SiriusClass Printing Website

### A modern multi-page website for a printing and promotional products company

Built with Node.js, Express.js, EJS, CSS and JavaScript.

</div>

---

## About the project

**SiriusClass Printing Website** is a multi-page web application created for a printing company.

The website presents the company’s products, printing services, completed projects and contact information. Customers can also submit contact messages and create detailed order requests directly through the website.

The project includes server-side page rendering, order form processing, file uploads and local JSON storage.

---

## Main features

- Multi-page website built with Express.js and EJS
- Responsive design for desktop, tablet and mobile devices
- Product catalogue with descriptions and images
- Printing services section
- Portfolio with project category filters
- Company information page
- Contact form with server-side validation
- Detailed order request form
- Automatic order number generation
- Design and artwork file uploads
- Order summary updated with JavaScript
- Contact messages saved locally
- Orders saved locally in JSON format
- Custom error page for unavailable routes

---

## Website pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Main information about the company |
| Services | `/services` | Available printing and design services |
| Products | `/products` | Printing and promotional product catalogue |
| Portfolio | `/portfolio` | Examples of completed projects |
| About | `/about` | Company history, values and work process |
| Contacts | `/contacts` | Contact details and feedback form |
| Order | `/order` | Detailed order request form |

---

## Product catalogue

The website contains the following product categories:

- Stickers
- Business cards
- Name badges
- Thermoses
- Custom mugs
- Paper bags
- Restaurant menus
- Corporate notebooks
- Advertising booklets

Product information is stored in:

```text
data/products.js


## Sirius Class motion redesign

The current redesign keeps the existing Express + EJS routes and the original company assets. It adds a sticky glass-style header, a Products hover dropdown with category filters, RU/EN client-side language switching (Russian by default), a percentage preloader, scroll reveals, and a custom cursor for desktop pointers.

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To deploy on Vercel, import the repository and use the included `vercel.json`. Test a Preview deployment before promoting it to Production.

### Notes

- The preloader percentage is an animated waiting indicator, not byte-level network progress.
- The English switch translates the interface and the included catalogue/service copy in the browser; Russian is the default. Review English copy before publishing.
- Category links such as `/products?category=stickers` filter the existing product data by its product slug.
