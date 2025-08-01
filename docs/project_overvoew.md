# Projekt Lyrae – Přehled a Stav Vývoje

## 📌 Cíl projektu

Lyrae je jazykově-orientovaná, bezpečnostně založená vývojová platforma navržená pro tvorbu výkonných, rozšiřitelných a bezpečných aplikací. Ambicí projektu je stát se:
- jazykem vyššího řádu s důrazem na expresivitu a bezpečnost,
- nástrojem pro vývojáře, který zpřehlední a zpříjemní práci,
- živou platformou s interaktivními možnostmi pro práci s daty, UI, doménově specifickými rozšířeními (DSL),
- bezpečnostní alternativou k tradičním jazykům (JS, Python, C#),
- nadstandardní volbou – nikoliv kopií, ale novým paradigmatem.

---

## 🆕 Novinky a aktualizace

- **2024-06**: Přidán základní systém pluginů pro rozšiřitelnost jádra.
- **2024-07**: První verze AST vizualizéru (CLI nástroj).
- **2024-08**: Experimentální podpora pro více jazykových profilů (EN, CZ).
- **2024-09**: Základní CI/CD workflow pro automatizované testování parseru.
- **2024-10**: Vydán draft bezpečnostního whitepaperu.
- **2025-01**: Přidána možnost generovat dokumentaci z kódu (docgen).
- **2025-03**: Refaktoring parseru pro lepší modularitu a rozšiřitelnost.
- **2025-05**: První veřejná ukázka DSL pro doménově specifické úlohy.

---

## 🔍 Současný stav

### Vývoj:
- Projekt má zatím charakter funkčního **prototypu**, nicméně s dobře strukturovanou architekturou.
- Vývojář: **1 osoba** (aktuálně jediný autor).
- Postupně vzniká **vlastní parser, AST engine**, a formální systém pro tokenizaci a překladový řetězec.
- **Nově:** Základní podpora pro pluginy a externí rozšíření.

### Klíčové složky:
- `runtime/` – obsahuje jádro runtime komponent (včetně základního jazyka).
- `reactivity/`, `core/`, `parser/` – definují samotný systém výrazu, AST, typů a překladového systému.
- `langs/` – budování více jazykových přístupů (jazykové profily, lokalizace, názvosloví).
- `docs/` – dobře připravené základy dokumentace (ještě ale rozpracované).
- `examples/` – ukázky použití DSL, AST a jazykového jádra (doporučeno dále rozšířit).
- `tests/` – základní testy parseru a interpreteru (doplnit o unit a integrační testy).
- **Nově:** `plugins/` – adresář pro rozšiřující moduly a komunitní příspěvky.

---

## ⚙️ Technická filozofie

- **Bezpečnost především:** Vše je navrženo s důrazem na bezpečné prostředí (sandbox, AST validace, omezený runtime).
- **Plně konfigurovatelný jazyk:** Syntaxe a pravidla jazyka jsou definována datově (přes JSON nebo JS objekty).
- **Reaktivita a DSL vrstvy:** Reaktivní datové struktury a možnost tvořit doménově specifické výrazy.
- **Platformová rozšiřitelnost:** Směřuje k tomu, aby Lyrae mohlo být integrováno do různých prostředí (web, editor, embedded).
- **Modularita:** Každá část systému je navržena jako samostatný modul, což usnadňuje údržbu a rozšiřitelnost.
- **Testovatelnost:** Důraz na snadné testování jednotlivých komponent (parser, AST, runtime).
- **Rozšiřitelnost:** Podpora pro pluginy a externí moduly umožňuje komunitní rozvoj a integraci nových funkcí.

---

## 📈 Hodnocení vývoje

| Kritérium                 | Hodnocení                      |
|--------------------------|--------------------------------|
| Struktura projektu       | ✅ Velmi dobře členěná         |
| Dokumentace              | ⚠️ Rozpracovaná, chybí README |
| Inovativnost             | ✅ Vysoká, netradiční přístup |
| Úroveň prototypu         | ⚠️ Raná fáze, ale funkční AST |
| Pokrytí testy            | ❌ Zatím chybí                 |
| Komunikační rozhraní     | ⚠️ Ještě bez API vrstvy       |
| DevTool podpora          | ❌ Chybí editor, transpiler UI|
| Aktivita vývoje          | ✅ Vysoká (pro 1 vývojáře)     |
| Rozšiřitelnost           | ✅ Základní systém pluginů     |

---

## 🗂️ Struktura repozitáře

```
/runtime/      # Jádro runtime a základní jazykové komponenty
/reactivity/   # Reaktivní datové struktury a systém změn
/core/         # Základní logika, typový systém, AST
/parser/       # Tokenizace, parser, překladový řetězec
/langs/        # Jazykové profily, lokalizace, názvosloví
/examples/     # Ukázky použití, příklady DSL a AST
/tests/        # Testy parseru, interpreteru a dalších částí
/docs/         # Dokumentace projektu
/plugins/      # Rozšiřující moduly a komunitní příspěvky
```

---

## 🛠️ Instalace a spuštění

1. **Klonujte repozitář:**
    ```sh
    git clone https://github.com/starass/lyrae.git
    cd lyrae
    ```
2. **Nainstalujte závislosti:**
    ```sh
    npm install
    ```
3. **Spusťte základní testy:**
    ```sh
    npm test
    ```
4. **Vyzkoušejte příklady:**
    ```sh
    node examples/basic.js
    ```

---

## 🔐 Bezpečnostní principy

- Nepřímo integrovaný přístup k sandboxování a validaci výrazů.
- Cílem je eliminovat možnosti runtime exploitace skrze řízený AST a přísné typování.
- Potenciál pro static analysis a deterministické chování.
- Plánováno rozšíření o bezpečnostní whitepaper a detailní popis bezpečnostních mechanismů.
- **Nově:** První draft whitepaperu dostupný v `docs/security-whitepaper.md`.

---

## 🧑‍💻 Jak přispět

1. **Prostudujte dokumentaci** v adresáři `docs/` a připravované README.md.
2. **Vyzkoušejte příklady** v `examples/` a navrhněte vlastní rozšíření.
3. **Přidejte testy** do `tests/` pro parser, AST nebo runtime.
4. **Navrhněte vylepšení** v oblasti bezpečnosti, modularity nebo reaktivity.
5. **Vytvořte plugin** v adresáři `plugins/` a podělte se o něj s komunitou.
6. **Diskutujte** v issues nebo pull requestech – každý návrh je vítán!

---

## 📅 Doporučení a další kroky

1. **README.md** pro hlavní repozitář (přehled, motivace, struktura).
2. **Příklady (examples/)** pro prezentaci DSL + AST + jazykového jádra.
3. **Testování parseru a interpreteru** (unit testy, snapshoty).
4. **Modulární build systém** – možnost kompilace pouze dílčích částí.
5. **Vizualizace AST / runtime** (grafický náhled, CLI i web).
6. **Vývojový manifest** (vize, roadmap, verze).
7. **Bezpečnostní whitepaper** – pro technické publikum.
8. **Automatizace CI/CD** – nastavit základní workflow pro testy a build.
9. **Zpětná vazba od uživatelů** – sbírat návrhy a připomínky pro další rozvoj.
10. **Rozšíření plugin systému** – dokumentace a ukázky pro tvorbu vlastních rozšíření.

---

## 📚 Další zdroje

- [Oficiální repozitář na GitHubu](https://github.com/starass/lyrae)
- [Roadmapa projektu](docs/roadmap.md)
- [Bezpečnostní whitepaper](docs/security-whitepaper.md)
- [Příklady použití](examples/)
- [FAQ a diskuse](https://github.com/starass/lyrae/discussions)

---

## 🧠 Závěrečný názor

Projekt Lyrae má **mimořádný inovační potenciál**, který překračuje rámec typického jazyka nebo frameworku. Přesto je nutné podpořit vývoj:
- lepší dokumentací (README, příklady, vývojová filosofie),
- modularizací a definováním přesnějších kontraktů,
- systematickým testováním,
- otevřením projektu širší komunitě a získáním zpětné vazby.

Jako *experimentální platforma* má Lyrae sílu ukázat nový směr ve vývoji jazyků a bezpečných aplikací. Bude záležet, jak se tento koncept podaří v dalších fázích vývoje zhmotnit a otevřít širší komunitě.

---

**Verze:** `0.1-alpha`  
**Autor:** `Starass`  
**Datum:** `2025-07-29`

