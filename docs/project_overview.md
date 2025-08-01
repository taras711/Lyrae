# Lyrae Project – Overview and Development Status

## 📌 Project Goal

Lyrae is a language-oriented, security-based development platform designed for creating powerful, extensible and secure applications. The project's ambition is to become:
- a higher-order language with an emphasis on expressiveness and security,
- a tool for developers that makes work clearer and more enjoyable,
- a living platform with interactive options for working with data, UI, domain-specific extensions (DSL),
- a security alternative to traditional languages (JS, Python, C#),
- a premium choice – not a copy, but a new paradigm.

---

## 🆕 News and Updates

- **2024-06**: Added a basic plugin system for core extensibility.
- **2024-07**: First version of the AST visualizer (CLI tool).
- **2024-08**: Experimental support for multiple language profiles (EN, CZ).
- **2024-09**: Basic CI/CD workflow for automated parser testing.
- **2024-10**: Draft security whitepaper released.
- **2025-01**: Added the ability to generate documentation from code (docgen).
- **2025-03**: Parser refactoring for better modularity and extensibility.
- **2025-05**: First public demonstration of a DSL for domain-specific tasks.
---

## 🔍 Current status

### Development:
- The project is still in the nature of a functional **prototype**, however, with a well-structured architecture.
- Developer: **1 person** (currently the only author).
- A **own parser, AST engine**, and a formal system for tokenization and translation chain are gradually being created.
- **New:** Basic support for plugins and external extensions.

### Key folders:
- `runtime/` – contains the core runtime components (including the base language).
- `reactivity/`, `core/`, `parser/` – define the expression system itself, AST, types and translation system.
- `langs/` – building multiple language approaches (language profiles, localization, terminology).
- `docs/` – well-prepared documentation basics (but still under development).
- `examples/` – examples of using DSL, AST and language core (further expansion recommended).
- `tests/` – basic parser and interpreter tests (to be supplemented with unit and integration tests).
- **New:** `plugins/` – directory for extension modules and community contributions.

---

## ⚙️ Technical Philosophy

- **Security First:** Everything is designed with an emphasis on a safe environment (sandbox, AST validation, limited runtime).
- **Fully configurable language:** Language syntax and rules are defined data-wise (via JSON or JS objects).
- **Reactivity and DSL layers:** Reactive data structures and the ability to create domain-specific expressions.
- **Platform extensibility:** Aims to ensure that Lyrae can be integrated into different environments (web, editor, embedded).
- **Modularity:** Each part of the system is designed as a separate module, which facilitates maintenance and extensibility.
- **Testability:** Emphasis on easy testing of individual components (parser, AST, runtime).
- **Extensibility:** Support for plugins and external modules allows community development and integration of new features.

---

## 📈 Development rating

| Criterion | Rating |
|--------------------------|--------------------------------|
| Project structure | ✅ Very well structured |
| Documentation | ⚠️ In progress, README missing |
| Innovation | ✅ High, unconventional approach |
| Prototype level | ⚠️ Early phase, but functional AST |
| Test coverage | ❌ Not yet available |
| Communication interface | ⚠️ No API layer yet |
| DevTool support | ❌ Missing UI editor, transpiler|
| Development activity | ✅ High (for 1 developer) |
| Extensibility | ✅ Basic plugin system |

---

## 🗂️ Repository structure

```
/runtime/ # Runtime core and basic language components
/reactivity/ # Reactive data structures and change system
/core/ # Basic logic, type system, AST
/parser/ # Tokenization, parser, translation string
/langs/ # Language profiles, localization, nomenclature
/examples/ # Usage examples, DSL and AST examples
/tests/ # Tests of the parser, interpreter and other parts
/docs/ # Project documentation
/plugins/ # Extension modules and community contributions
```

---

## 🛠️ Installation and launch

1. **Clone the repository:**
```sh
git clone https://github.com/starass/lyrae.git
cd lyrae
```
2. **Install dependencies:**
```sh
npm install
```
3. **Run basic tests:**
```sh
npm test
```
4. **Try the examples:**
```sh
node examples/basic.js
```

---

## 🔐 Security principles

- Indirectly integrated approach to sandboxing and expression validation.
- The goal is to eliminate runtime exploitation possibilities through controlled AST and strong typing.
- Potential for static analysis and deterministic behavior.
- Planned expansion with security whitepaper and detailed description of security mechanisms.
- **New:** First draft of whitepaper available at `docs/security-whitepaper.md`.

---

## 🧑‍💻 How to contribute

1.**Study the documentation** in `docs/` and the upcoming README.md.
2. **Try the examples** in `examples/` and design your own extensions.
3. **Add tests** to `tests/` for the parser, AST or runtime.
4. **Suggest improvements** in the areas of security, modularity or reactivity.
5. **Create a plugin** in `plugins/` and share it with the community.
6. **Discuss** in issues or pull requests – every suggestion is welcome!

---

## 📅 Recommendations and next steps

1. **README.md** for the main repository (overview, motivation, structure).
2. **Examples (examples/)** for presenting the DSL + AST + language core.
3. **Testing the parser and interpreter** (unit tests, snapshots).
4. **Modular build system** – ability to compile only partial parts.
5. **AST / runtime visualization** (graphical preview, CLI and web).
6. **Development manifest** (vision, roadmap, versions).
7. **Security whitepaper** – for technical audience.
8. **CI/CD automation** – set up basic workflow for tests and builds.
9. **User feedback** – collect suggestions and comments for further development.
10. **Plugin system extension** – documentation and examples for creating your own extensions.

---

## 📚 Additional Resources

- [Official GitHub Repository](https://github.com/starass/lyrae)
- [Project Roadmap](docs/roadmap.md)
- [Security Whitepaper](docs/security-whitepaper.md)
- [Usage Examples](examples/)
- [FAQ and Discussions](https://github.com/starass/lyrae/discussions)

---

## 🧠 Final Thoughts

The Lyrae project has **extraordinary innovation potential** that goes beyond the scope of a typical language or framework. However, it is necessary to support development by:
- better documentation (README, examples, development philosophy),
- modularization and defining more precise contracts,
- systematic testing,
- opening the project to the wider community and obtaining feedback.

As an *experimental platform*, Lyrae has the power to show a new direction in the development of languages and secure applications. It will depend on how this concept is materialized in the next stages of development and opened to the wider community.

---

**Version:** `0.1-alpha`
**Author:** `Starass`
**Date:** `2025-07-29`