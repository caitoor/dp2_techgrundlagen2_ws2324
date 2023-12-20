# dp2_techgrundlagen2_ws2324

# DP2 | Technische Grundlagen 2 und Datenbanken | WS 23/24

Die Abgabe des Projekts erfolgt in den beiden Fächern Technische Grundlagen 2 und Datenbanken als ein Gesamtprojekt.

## Projektbeschreibung

- Fiktive Produktentwicklung bzw. aus Produktperspektive argumentierte Vorgehensweise
- Verteiltes System, prototypisch-funktional umgesetzt
- Datenbank-Anbindung
- testbar
- attraktiv ausstellbar

## Must Have (bestehens-relevant)

- Sensormodul, das Daten erhebt und in ein System einspeist
- Backend mit eigener dokumentierter API für HTTP-Requests
- Anzeige der gespeicherten Sensorwerte in einem Frontend (freie Auswahl des Frameworks)
- Nutzung von `.env` oder Ähnlichem, um Credentials auf GitHub zu verbergen.
- Ausformuliertes Datenmodell inkl. Entity-Relationship-Model in Ausstellungsposterqualität
- .gitignore, in der `node_modules` enthalten ist. Hochgeladener `node_modules`-Ordner = Schelle.
- Projekt-Doku als README.md inklusive 1-2 einleitenden Absätzen als allgemeine Produktbeschreibung.

## Should Have (~ relevant für die Note vor dem Komma)

- User-Authentifizierung (Register / Login / Logout)
- Anzeige / Visualisierung der Sensorwerte
- Gedanken zur und Entwicklungen in Hinblick auf die Skalierbarkeit des Systems (mehr User / mehr Sensoren / etc.)
- Microservices-Infrastruktur (User Service, Data Service, etc.)
- Produktname und irgendeine Form von Logo
- Zuordnung der User zu ihren Sensormodulen, damit sie nur ihre eigenen bzw. berechtigten Sensoren sehen
- UX-getriebenes Konzept in der Produktentwicklung


## Could Have (~ relevant für die Note nach dem Komma)

- Interessantere, komplexere Datenabfragen und -darstellungen
- Gut gestaltetes Frontend
- Prototyping: Cases für Komponenten usw., 3d-gedruckt oder Lasercuts
- Aufwändige Datenvisualisierungen über Graphen hinaus
- Zuordnung neue Sensormodule zu User (Pairing-Prozess), zumindest als Überlegung
- Nutzung von mongoose o. Ä. und Models
- User-Authentifizierung über distinguierte Libraries / Frameworks (z. B. Passport, JSON Web Tokens)
- Session-Timeouts
- Sensor- / ESP-Informationen im Frontend bearbeiten
- Deep Sleep-Implementierung
- Onboarding: Logon speichern / Cookie setzen / localStorage / Wizard statistische / prognostische Auswertung der Daten (AI?)
- User-Authentifizierung über externen Dienst (z. B. Google)
- Alerts / Alarme Konfigurieren einzelner Sensormodule (z. B. Intervalle ändern)
- OpenAPI / Swagger.io / [apicur.io](http://apicur.io) nutzen
- Benutzerrollen (nur ansehen, editieren, etc.)
- Überlegungen zur Energieversorgung (Laufzeit, Energiespeicher, Lademöglichkeit, etc.)
- Echtzeit-Daten mit Websockets (`socket.io`)
- Lauffähige Docker-Container / shell + batch für alle Images + Container
- Skalierungsplan / Business Model
- Externe APIs einbinden, z. B. OpenAI
- Security Features (Zertifikate, Verschlüsselung, ...)
- Gedanken zur Nachhaltigkeit des Projekts und evtl. Berücksichtigung in der Produktplanung
- ...

## Bewertungskriterien

- alle Anforderungen erfüllt?
- lauffähig?
- eigener Code über Unterrichtsprojekt hinaus?
→ bestanden

Von der 4,0 zur 1,0 dann relevant:
- Komplexität des Projekts
- Innovationsgrad des Projekts
- Herangehensweise, Umgang mit Schwierigkeiten im Verlauf
- the more, the better (Anzahl sinnvoller Features)
- the better, the better (Codequalität, Struktur von System und Code)
- the smarter, the better (Konzept, Komplexität)

**Hinweis:** Anwesenheit, Mitarbeit und Beiträge im Kurs (Quantität und Qualität) sind mit 30% der Gesamtnote gewichtet.

**Tipp:** Macht irgendwo eine übersichtliche Dokumentationsseite, in der ihr eure Must / Should / Could Haves auflistet, damit ich nichts übersehe.

## Abgabemodalitäten

- Abgabetermin: 
  - vermutlich erste Woche nach Vorlesungsschluss (exaktes Datum kommt noch)
  - Alle Ergebnisse werden zum Schluss in der Gruppe gemeinsam angeschaut und von den Urheber*innen kurz vorgestellt (ohne Folien)
- Abgabeumfang:
    - GitHub Monorepo (Abgabe des Links)
    - .env Files auf anderem Kanal (Slack / Mail / Drive)
    - einige Fotos und Screenshots des Projekts zu Dokumentations- und Ausstellungszwecken
    - Screencast, der alle Features zeigt (in Google Drive, nicht im Repo!)


## Themenideen

- Aquarienüberwachung / Poolüberwachung
- Luftqualitäts-Monitoring
- Indoor-Positionierung (Lab-Heatmap)
- Zimmerpflanzen
- Vogelhäuschen
- Sauerteig-Überwachung
- Wetterstation
- Smart Home Security System