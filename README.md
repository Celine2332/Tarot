# Arbeitsreflexion

## Team

- Céline Joss
- Christel Hayoz

## Kurzbeschreibung

Unsere Webseite Fortunate Finalist soll Tarot und Kartenspiel vereinigen. Wir haben ein vier Spieler Kartenspiel erstellt, dass unterschidliche Informationen aus einer API abrufen soll.

## Schwierigkeiten

Die Bilder der Tarotkarten waren in der API nicht hinterlegt. Alle 78 Karte mussten also einzeln in den assets gespeichert werden. Damit diese anschliessend richtig zugeordnet werden konnten, gaben wir den entsprechenden Karten den name_short. Anschliessend mussten wir herausfinden wie wir im JavaScript die Bilder der Karten einbinden konnten, was aber nach einigen Versuchen ohne Probleme funktionierte.

Eine weitere Herausvorderung war das gemeinsame Arbeiten am selben Code. Unsere Art, wie wir im .css die die einzelnen Elemente angsprochen haben, unterschied sich etwas. Was dazu führte, dass wir im Verlauf eine neue Lösung suchen mussten, wie wir den main und body unterschiedlich ansprechen könn. Dies lösten wir, indem wir den betroffenen .html dem body und dem main eine class zugewiesen haben.

Eine der grössten Herausforderungen war es, den Überblick über alle Dateien und Codeabschnitte zu behalten – besonders, weil wir zu zweit gearbeitet haben. Wenn zwei Personen gleichzeitig am CSS arbeiten, entstehen schnell Konflikte oder unerwartete Überschreibungen, was zeitweise verwirrend war und Absprachen erforderte.

Code aufräumen oder kürzen war riskant, da man nie sicher war, ob man damit etwas der anderen Person kaputt macht. Ineffizienter Code blieb deshalb oft stehen.
Bei Lottiefiles stiessen wir auf zwei Probleme: eine begrenzte Anzahl Animationen sowie die Einbindung als externes Script-Plugin (dotlottie-wc), wodurch unklar war, wie man die Animationen per JavaScript ansprechen kann.
Generell häufte sich schnell sehr viel Code an, was den Überblick erschwerte und dazu führte, dass Änderungen einer Person manchmal den Code der anderen beeinflussten.

## Learnings

Zuerst einen Prototypen aufbauen, bevor man ins Detail geht

Hilfreich war auch, die Arbeit in kleine Teilziele aufzuteilen, damit der Fortschritt sichtbar bleibt.

Da wir noch wenig Erfahrung mit HTML, CSS und JavaScript hatten, haben wir vieles mit dem Motto «das schaffen wir schon irgendwie» angegangen, ohne genau zu wissen wie. Beim nächsten Projekt kann man schon beim Figma realistischer planen und technische Lösungen früher mitdenken.

Bei JavaScript haben wir gelernt, wie wichtig saubere if-Bedingungen sind: Fehlt eine oder ist sie falsch gesetzt, kann die gesamte Logik aufhören zu funktionieren.

Beim gemeinsamen Arbeiten ist eine klare Absprache über Codestil und Konventionen von Anfang an entscheidend.

# Wichtige Links

## Tarot

Link Webseite https://fortunate-finalists.cixenabi.myhostpoint.ch/

Tarot cards:
https://onyourjourney.co.uk/wp-content/uploads/2023/07/Free-Printable-Tarot-Deck-Onyourjourney.pdf

Datensatz: https://tarotapi.dev/api/v1/cards

## LOTTIEFILES-BUTTONS

Play

<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js" type="module"></script>

<dotlottie-wc src="https://lottie.host/70bc3ed7-c6d8-4c7a-bca3-a342b7594683/b0ealN7P3i.lottie" stateMachineId="play_again!" style="width: 300px;height: 300px"></dotlottie-wc>

next round

<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js" type="module"></script>

<dotlottie-wc src="https://lottie.host/d6835d86-2507-4141-9fe5-79436f57e6bb/hxumoceSil.lottie" stateMachineId="play_again!" style="width: 300px;height: 300px"></dotlottie-wc>

play again

<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js" type="module"></script>

<dotlottie-wc src="https://lottie.host/de5b6fb9-e8c3-4141-ba0a-7e81717113dd/Br3fdm0EPR.lottie" stateMachineId="play_again!"></dotlottie-wc>
