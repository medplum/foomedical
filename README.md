<h1 align="center">Moje Ambulance</h1>
<p align="center">Bezplatná a open-source webová aplikace pro zdravotnictví od týmu Medplum.</p>
<p align="center">
  <a href="https://github.com/medplum/foomedical/actions">
    <img src="https://github.com/medplum/foomedical/actions/workflows/build.yml/badge.svg" />
  </a>
  <a href="https://github.com/medplum/foomedical/blob/main/LICENSE.txt">
    <img src="https://img.shields.io/badge/license-Apache-blue.svg" />
  </a>
  <a href="https://sonarcloud.io/project/overview?id=medplum_foomedical">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=medplum_foomedical&metric=alert_status&token=3760929adde88ce7da87782be8d811f8b5cec0f4" />
  </a>
</p>

![Snímek obrazovky Moje Ambulance](screenshot.png)

### Co je Moje Ambulance?

[Moje Ambulance](https://foomedical.com/) je **ukázková open-source aplikace pro lékařskou praxi připravená k okamžitému použití**. Je určena pro vývojáře, aby ji mohli klonovat, přizpůsobovat a spouštět.

### Funkce

- Zcela zdarma a open-source
- Bezpečný a vyhovující [Medplum](https://www.medplum.com) backend, který je také open-source
- Registrace a ověřování pacientů
- Zdravotní záznamy
  - Výsledky laboratoře
  - Léky
  - Očkování
  - Vitální funkce
- Zprávy mezi pacientem a poskytovatelem
- Plány péče
- Plánování pacientů
- Všechna data reprezentovaná ve [FHIR](https://hl7.org/FHIR/)

Moje Ambulance je navržena tak, aby ji bylo možné forkovat a přizpůsobit potřebám vašeho podnikání. Zaregistrujte se na [foomedical.com](https://foomedical.com/), abyste ji viděli v akci.

### Začínáme

Nejprve [forkujte](https://github.com/medplum/foomedical/fork) a naklonujte repozitář.

Dále nainstalujte aplikaci z terminálu

```bash
npm install
```

Poté aplikaci spusťte!

```bash
npm run dev
```

Tato aplikace by měla běžet na `http://localhost:3000/`

Přihlaste se do aplikace na localhostu pomocí stejných přihlašovacích údajů, které jste vytvořili na [foomedical.com](https://foomedical.com/), a jste připraveni začít s přizpůsobením.

### Nasazení vaší aplikace

Pro nasazení vaší aplikace doporučujeme vytvořit si účet na [Vercel](https://vercel.com/), k dispozici jsou bezplatné účty.

Tuto aplikaci můžete nasadit [kliknutím sem](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fmedplum%2Ffoomedical&showOptionalTeamCreation=false).

### Nastavení účtu

Ve výchozím nastavení vaše lokálně spuštěná aplikace Moje Ambulance ukazuje na hostovanou službu Medplum. Moje Ambulance registruje přihlášení do testovacího projektu.

Chcete-li posílat pacienty do své vlastní organizace, budete muset [zaregistrovat nový projekt na Medplum](https://www.medplum.com/docs/tutorials/register) a nakonfigurovat proměnné prostředí tak, aby ukazovaly na váš vlastní projekt (viz [config.ts](https://github.com/medplum/foomedical/blob/main/src/config.ts) jako příklad).

Pokud používáte hostovanou službu Medplum, můžete se přihlásit do své instance Medplum a přidat následující identifikátory do [nastavení webu projektu](https://app.medplum.com/admin/sites)

- Google Client Id
- Google Client Secret
- Recaptcha Site Key
- Recaptcha Secret Key

V případě jakýchkoli dotazů kontaktujte tým Medplum ([support@medplum.com](mailto:support@medplum.com) nebo [Discord](https://discord.gg/medplum])).

### Nastavení dat

Když se přihlásíte do Moje Ambulance, vytvoří se pro vás sada ukázkových záznamů FHIR. Schopnost spouštět automatizace je součástí platformy Medplum pomocí frameworku zvaného [Boti](https://www.medplum.com/docs/bots). Pro informaci, Bota, který vytvořil záznamy v Moje Ambulance, najdete [zde](https://github.com/medplum/medplum-demo-bots/blob/main/src/sample-account-setup.ts).

### Soulad

Backend Medplum je v souladu s HIPAA a certifikován SOC 2. Založení účtu vyžaduje registraci na [medplum.com](https://www.medplum.com/). Neváhejte se nás zeptat na otázky v reálném čase na našem [Discord serveru](https://discord.gg/medplum).

### O Medplum

[Medplum](https://www.medplum.com/) je open-source, API-first EHR. Medplum usnadňuje rychlé vytváření zdravotnických aplikací s menším množstvím kódu.

Medplum podporuje vlastní hosting a poskytuje [hostovanou službu](https://app.medplum.com/). [Moje Ambulance](https://foomedical.com/) používá hostovanou službu jako backend.

- Přečtěte si naši [dokumentaci](https://www.medplum.com/docs/)
- Prohlédněte si naši [knihovnu komponent React](https://storybook.medplum.com/)
- Připojte se k našemu [Discordu](https://discord.gg/medplum)
