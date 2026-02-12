## kdrcommunity-slides

Profile slides for the KDR Community, built with **vanilla HTML, CSS, and JavaScript**.

The main entry point for the slides is:

- `index.html` (slides)
- `assets/css/style.css` (styles)
- `assets/js/main.js` (navigation & interactions)

### Running / previewing the slides

This project is **pure static**. Tidak ada ketergantungan ke Bun, npm, atau bundler apa pun.

Ada dua cara utama untuk melihat slide:

- **Langsung buka file**  
  Buka `index.html` dengan browser (double-click dari file explorer).

- **Menggunakan static server (opsional, lebih cocok untuk presentasi/hosting)**  
  Contoh dengan Python:

  ```bash
  python -m http.server 8000
  ```

  Lalu buka `http://localhost:8000/index.html`.

---

### Contributing

Contributions are welcome. Please read `CONTRIBUTING.md` for:

- Project structure
- How to add/edit slides
- Coding and styling conventions
- Git and PR workflow
