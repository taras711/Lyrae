Díky, pustím se do hluboké analýzy projektu Lyrae. Zaměřím se na architekturu, syntaxi jazyka, bezpečnostní model, runtime chování, komunikaci klient-server i soulad s popsanými principy (záměr, kontext, predikce atd.). Výsledkem bude odborný rozbor s doporučeními k dalšímu vývoji.
Jakmile budu mít přehled o všech důležitých aspektech, dám ti vědět s detailní zprávou.


# Architektura systému

Projekt Lyrae je modulární platforma složená z více komponent, které spolu komunikují přes „tunel“ a orchestrátor. Hlavními prvky jsou:

* **TunnelService (Token Tunnel)** – poskytuje publish/subscribe mechanismus pro mezikomponentovou komunikaci (kanály jako `alerts`, `audit` apod.). Umožňuje posílat zprávy mezi session řadiči, sekcemi a dalšími službami.
* **SessionController** – řídí uživatelskou relaci (login, logout, scénáře) a inicializuje kanály tunelu (např. zapisuje upozornění a záznamy do auditu). Vytváří bezpečnostní kontext a spouští příslušné scénáře.
* **SectorOrchestrator a SectorNode** – zajišťují směrování úmyslů (intents) do jednotlivých sektorů. `SectorOrchestrator` obsahuje pravidla pro mapování úmyslů na sektory (např. `alert` na `AuditCenter`) a kontroluje úroveň důvěry. Každý sektor (`SectorNode`) v sobě integruje knihovny scénářů, modulů a API. Například `SectorNode.broadcast(message)` odesílá zprávu všem posluchačům daného sektoru přes tunel.
* **IntentRouter a UI DSL** – řídí vizuální komponenty podle uživatelského úmyslu. `IntentRouter` sbírá log příkazů (`CommandInsights`) a generuje „souhrn“ (obsahující např. focus nebo recoveryIntent). Ten se pak aplikuje na parser vlastního UI-DSL jazyka (načteného `UIDSLParser`), aby se vybraly aktivní panely (vyhodnocení výrazů `when:`). Tím se dynamicky mění UI podle kontextu.
* **IntentScheduler a SecureIntentWrapper (Reaktor úmyslů)** – plánují a spouští výkonné akce („intents“) s podporou bezpečného zpracování. `IntentScheduler` řadí úmysly do fronty a spouští je paralelně až do stanoveného limitu. Pro každý úmysl používá `SecureIntentWrapper`, který provádí samotnou operaci s timeoutem a v případě selhání spouští záložní (fallback) akci. Tento „reaktor“ zajišťuje, že žádný úmysl nezablokuje běh systému (viz *SecureIntentWrapper*).
* **Služby a moduly** – Lyrae podporuje dynamickou registraci modulů s přístupovým řízením (`ModuleRegistry` + `AccessControlledModule`). Například může existovat modul pro data, kterému jsou přiřazeny metody a role povolení. Modulární architektura dovoluje rozšiřování platformy bez zásahu do jádra. Dále jsou komponenty jako **AuditService**, **SignatureAnomalyDetector** (detekce anomálií podepisování tokenů) a **TokenLifecycleManager** pro správu životního cyklu bezpečnostních tokenů.
* **Úložiště a fronty** – systém udržuje perzistentní frontu „ghost“ scénářů (`PersistentGhostQueue` a `GhostScenarioQueue`), kam se ukládají předpovědi uživatelských akcí pro pozdější zpracování. Jsou zde také databáze nebo JSON logy pro audit a revokované tokeny.

Těmito komponentami Lyrae zajišťuje tok dat podle principů *tokenového tunelu*, orchestraci a paralelní zpracování (reaktor) a „stínovou“ (shadow) komunikaci mezi klientem a serverem.

## Jazyková syntaxe

Lyrae využívá vlastní DSL především pro definici UI komponent a procesů. Například UI DSL umožňuje definovat panely takto:

```
panel RecoveryPanel {  
  when: intent.focus == "recovery"  
  show: true  
}  
```

* **Parser (UIDSLParser)** – parsuje DSL řádek po řádku. Každé `panel` vytvoří objekt s názvem a vlastnostmi. Podmínky `when:` jsou uloženy jako řetězce, později vyhodnocované `UIDSLRuntime`.
* **Vyhodnocení podmínek (UIDSLRuntime)** – při běhu se přezkoumá každý panel: pokud je nastavena podmínka `when` a její logický výraz vyjde pravdivě v kontextu aktuálního úmyslu, panel se označí jako aktivní. Tím se určuje, které komponenty se zobrazí.
* **Konstrukce a klíčová slova** – v DSL převládají základní příkazy: `panel`, `when`, `show`. Podmínka je vyjádřena logickým výrazem, obvykle porovnáním s proměnnou `intent` (která je objekt s informací o úmyslu uživatele). Podobné syntaxi pracuje IntentRouter i pro vykreslování UI.
* **Reprezentace úmyslu** – úmysl uživatele není v jazyce vyjádřen přímo syntaxí (jako u klasických programovacích jazyků), ale je odvozen z historie příkazů. `CommandInsights` například vrací `focus` (např. `"recovery"`), které je pak podklad pro podmínky UI. Tedy záměr je reprezentován objektově a DSL ho jen využívá.

Lyrae zatím nemá komplexní definovanou gramatiku na vstup (neprovádí syntaktickou analýzu vstupu v běžném slova smyslu), ale UI DSL parser ilustruje, jak by se dalo rozšířit vlastní syntaxe. Celkově se interně chápe význam úmyslu z kontextu a historie, což odpovídá principu porozumění *kontextu a záměru*.

## Bezpečnostní model

Základním prvkem bezpečnosti jsou JWT tokeny a vlastnosti „důvěry“. Klíčové aspekty modelu:

* **SecurityToken** – třída obaluje informace o uživateli: `userId`, `role`, `trust` (důvěryhodnost), platnost, oprávnění, atd. Token se vytváří a ověřuje pomocí `SecurityTokenLayer` (JWT s tajným klíčem). Tokeny nesou metadata (ID uživatele, role, úroveň důvěry) a používají se pro autorizaci.
* **Trust Supervisor** – komponenta `TrustSupervisor` pravidelně vyhodnocuje historii tokenu a případné anomálie (pomocí `TrustAnomalyDetector`). Na základě úspěšných či zamítnutých akcí upravuje skóre důvěry (`trust`) v tokenu. Tento dynamický model důvěry umožňuje, že uživatel nebo stínový (ghost) klient získává vyšší či nižší práva podle chování.
* **Zero-Trust přístup** – Lyrae uplatňuje princip „nikdy nedůvěřuj, vždy ověřuj“. Každá operace je autorizována na základě tokenu: jde o digitální podepsané údaje, jejich platnost a skóre důvěry se kontrolují před provedením akce. Tento přístup odpovídá zásadám Zero-Trust (bez implicitní důvěry) – systém *“assumes breach and verifies each request”*.
* **Vrstevnaté signály (Signal Security Layers)** – každá instrukce či požadavek nese metadata původu a kontextu. Například při komunikaci mezi službami je předáváno ID uživatele a role. Podle OWASP je nezbytné, aby mikroservisy měly kontext volajícího (uživatelské ID, role) pro autorizaci. Lyrae tuto myšlenku implementuje – token nosí roli i historii akcí a každý sektor či služba může rozhodnout na základě těchto údajů.
* **Audity a revokace** – `AuditService` zaznamenává každý citlivý event, záznam může být exportován pro revizi. Systém také umožňuje zrušení tokenů (`revoked_tokens.json`) a detekci anomálií podepisování. To doplňuje „trust-first“ model o trasovatelnost.

Celkově Lyrae kombinuje vrstvy zabezpečení: ověřuje JWT, udržuje šifrované tokeny interně, a aplikuje zásady minimálních práv na základě aktuální úrovně důvěry. Komponenty zajišťují, že kontext volání (ID uživatele) se propaguje napříč systémy, což je klíčové pro bezpečné, kontextově uvědomělé zpracování.

## Shadow komunikace (klient‑server synchronizace)

Lyrae podporuje takzvanou „shadow UX“ – neviditelnou synchronizaci klienta a serveru na pozadí. Princip funguje takto: klient (nebo ghost agent) periodicky simuluje svůj další krok pomocí `simulateShadowSync(ghostToken)`. Tato funkce vytvoří **tunnelFrame** s předpovězeným úmyslem (`predictedIntent`), úrovní důvěry a mírou odchylky. Např. ukázkový ghostToken s historií akcí vrátí „predikci“ dalšího záměru.
Na serveru `ShadowReactor` (metoda `evaluateShadowResponse`) tuto informaci vyhodnotí podle nastavených pravidel (např. minimální důvěra pro spouštěč). Výstup říká, zda má server „simulovat“ tento scénář, či jen „pozorovat“. Nakonec `ShadowBridge.forwardShadowPrediction` předává schválené predikce orchestrátoru (např. zařadí latentní „ghost“ scénář do fronty). To probíhá zcela na pozadí bez zásahu uživatele, tedy v duchu konceptu *silent UX*. (Projektový README tuto vrstvu popisuje jako „live, non-invasive client-server context sync“.) Výsledkem je, že server může proaktivně připravit akce na základě chování uživatele, aniž by o tom uživatel věděl. (V aktuální verzi je logika simulace jednoduchá, ale architektura podporuje pokročilejší prediktivní modely.)

## Sémantická analýza

Lyrae se snaží pochopit uživatelský úmysl vyhodnocením historie a kontextu. Historii příkazů ukládá `CommandLogger` a třída `CommandInsights` z ní generuje souhrn (např. „focus“ či „recoveryIntent“). Tím se modeluje záměr uživatele formou strukturovaného objektu. Například pokud nejčastější příkaz obsahuje „recovery“, `detectFocus()` vrátí `"recovery"`, což ovlivní UI a rozhodování. To odpovídá principu, že systém se soustředí na *porozumění záměru z kontextu*. Další inferenční mechanismy (např. `TrustSupervisor`, pravidla v orchestrátoru) využívají aktuální stav (role, historii chyb/slastí) k rozhodnutí o dalším průběhu. Předvídání (predictive) založené na historii a trustu je rovněž součástí – skrze *intention predictor* ve stínovém modulu, byť nyní velmi jednoduchý. Celkově Lyrae kombinuje analýzu logu akcí, znalosti o uživatelském profilu a bezpečnostní pravidla, aby pochopil a předpověděl úmysly.

## Testovatelnost, modularita a rozšiřitelnost

Lyrae je postaveno objektově a modulárně, což usnadňuje testování a rozšíření. Každá komponenta má vlastní jednotkové testy (adresář *tests/unit*) – například testy validatorů tokenů, modulů, routování intentu a shadow komponent. Díky jasnému API (třídy s metodami) lze izolovaně testovat jednotlivé vrstvy (parser DSL, IntentRouter, SectorOrchestrator atd.).  Platforma podporuje plug-iny a nové moduly – `ModuleRegistry` umožní přidat vlastní modul s metodami a přiřazenými oprávněními. Scénáře jsou definovány samostatně (třídy ve složce *scenarios*) a lze je zaregistrovat v `ScenarioRegistry`. Díky tomu, že každá část (parser, executor, bezpečnost) má oddělený kód, lze systém rozšiřovat nebo refaktorovat bez zásahu do core logiky. Celkově kód vykazuje dobré rozdělení odpovědností a zřejmé body pro rozšíření (např. budoucí podpora dalších DSL jazyků, další typy signalizace, nové scénáře).

## Dodržování principů projektu

Lyrae deklaruje principy jako inteligentní zpracování, důraz na kontext a prediktivní logiku. Aktuální implementace tyto myšlenky do značné míry naplňuje:

* **Kontextové chápání:** Systém modeluje význam z uživatelské historie (příkazy, focus, recoveryIntent), podobně jako popisuje princip „porozumění záměru z kontextu“. UI DSL reaguje na dynamický kontext.
* **Vícevrstvé tokeny:** Tokeny v systému nesou metadata (ID, role, historii akcí, skóre důvěry) – každý prvek akce nese svůj „původ“ a kontext (což odpovídá konceptu *Signal security layers* s kontextuálními metadaty).
* **Shadow logika a UX:** Implementace simulace a synchronizace „shadow“ scénářů umožňuje předávání návrhů akcí serveru tichou cestou, jak projekt zamýšlí („non-invasive client-server context sync“).
* **Prediktivní zpracování:** Lyrae pracuje s historickými daty a skóre důvěry pro předpověď budoucích úmyslů (např. `intentPredictor`) – to odpovídá myšlence „predictive tunneling“ (operačně na hypotetické budoucnosti).

Z dokumentace vyplynulo, že některé vlastnosti jsou v raném stavu (chybí např. plná podpora CLI/ladicího rozhraní, některé plánované moduly). Ale základní vrstva inteligence, kontextové logiky a bezpečnosti funguje v souladu s návrhem.

## Návrhy na vylepšení a další fáze

Několik možných zlepšení vyplývá z analýzy:

* **Parser jazyka:** Rozšířit DSL parser pro hlavní jazyk (zatím je minimalistický, jen UI DSL). Mohla by zde být formalizována gramatika pro vyjadřování úmyslů nebo dalších doménových operací.
* **Architektura TunnelService:** V současnosti každá instance vlastní komunikační kanály; zvážit centralizovanou či distribuovanou zprávu (např. přes message broker) pro skutečné multi-klient/server prostředí.
* **Shadow modul:** Provozní logika „stínové“ synchronizace může být rozšířena o skutečné asynchronní přenosy na server (např. WebSocket) a složitější predikční algoritmy (např. strojové učení). Také by orchestrátor měl disponovat funkcí pro přípravu (až spuštění) schválených ghost scénářů.
* **Zabezpečení:** Přidat audit end-to-end šifrování mezi komponentami či vícevrstvé ověřování (mTLS) pro vyšší robustnost. Zavést shodu se standardy Zero-Trust (např. pravidelně kontrolovat platnost tokenu u CA, integrovat vícefaktorovou autentizaci).
* **Refaktoring a optimalizace:** Některé služby (např. simulátor a vyhodnocovač shadow) by šly optimalizovat a unifikovat. Dále je možné rozdělit velké třídy na menší a přidat podrobnější error handling.
* **Testy a dokumentace:** Rozšířit testovací scénáře (např. integrační testy klient-server), doplnit dokumentaci DSL a bezpečnostní politiky.

Celkově je Lyrae projekt v aktivním vývoji a má solidní architekturu pro zpracování záměru a bezpečnou komunikaci. Navržené vylepšení by zlepšilo škálovatelnost, bezpečnost a použitelnost (např. robustnější UI DSL, pokročilejší prediktivní modely) pro další fáze vývoje.

**Zdroje:** Architektura a principy vycházejí z projektové dokumentace (články README, MD soubory) a obecně uznávaných zásad (např. Zero Trust, šíření kontextu v mikroservisách, význam kontextově-sémantického zpracování).
