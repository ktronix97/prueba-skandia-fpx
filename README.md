# 🧪 Prueba Técnica – Skandia FPX

Aplicación desarrollada en Angular 19.2.15 como parte de una prueba técnica. Incluye componentes visuales responsivos, arquitectura modular, consumo de APIs REST, y pruebas unitarias con Jasmine/Karma.

---

## 🚀 Tecnologías utilizadas

- **Angular 19.2.15** – Framework principal
- **TypeScript** – Tipado estático
- **SCSS + BEM** – Estilos modulares y mantenibles
- **RxJS** – Programación reactiva
- **Jasmine + Karma** – Pruebas unitarias
- **MockAPI** – Simulación de datos
- **Responsive Design** – Layout adaptable y coherencia cromática

---

## 📦 Estructura del proyecto

```bash
src/
├── app/
│   ├── home/                  # Página principal con layout dinámico
│   ├── shared/components/     # Componentes reutilizables
│   │   ├── navbar/            # Barra de navegación
│   │   ├── sidebar/           # Menú lateral
│   │   ├── goal-card/         # Tarjeta de objetivo
│   │   ├── product-carousel/  # Carrusel de productos
│   └── core/services/         # Servicios (API, lógica de negocio)


🧑‍💻 Instalación y ejecución
    Instala dependencias:
    ```bash
    npm install
    ```
   
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
