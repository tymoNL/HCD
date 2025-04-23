# HCD

**Tymo Smids**

*02-04-2025*

<details>
<summary><h3>Voor wie is de opdracht?</h3></summary>


**Roger**

Roger studeert filosofie en hij wil graag **annotaties** kunnen maken in de (digitale) boeken die hij leest, en die annotaties makkelijk terug kunnen vinden.

Roger heeft **maculadegeneratie**. Hij kan steeds slechter zien en is nu op het punt dat hij echt niet meer zonder screen reader kan.
</details>

<details>
<summary><h3>De gestelde vragen</h3></summary>

1. Wat doe je momenteel om annotaties te maken?
2. Wat voor annotaties maak je momenteel?
3. wat voor screenreader gebruik je? (voice over & jaws & nvda)
4. grooste uitdagingen bij het maken van aantekeningen?
5. hoe zou je het liefst aantekeningen willen maken (typen, dicteren & audio-opnames & liken / type zinnen opslaan en fovorieten (qua intonatie, jokes, gevoel))
6. hoe wil je de aantekeningen het liefst opslaan
7. hoe lees je momenteel je boeken / beschrijf je studie/lees-routine
8. welke tools gebruik je momenteel allemaal?
9. hoe vind je je annotaties momenteel terug?
10. kan je een stukje lezen uit je screenreader (om ons een beter visie te geven van hoe een screenreader werkt)?
11. Wil je het liefste annotaties bij de stukken tekst houden of wil je die op een helemaal aparte plek hebben?
12. Wat voor grapjes of leuke extraatjes zou je terug willen zien binnen de applicatie?
13. 
</details>

<details>
<summary><h3>Punten</h3></summary>

Vasilis leren kennen tijdens corona.
58 jaar oud
opticien doorverwezen naar oogarts.
netvlies fotos gemaakt
gele vlek. ervelijke oogaandoening werktuigbouwkunde. 20% rechteroog bij ontdekken. wazigheid
kokervisie inverse.
technisch opgeleid.
7 maanden revalidatie, bossen in apeldoorn
150.000 mensen hebben last van deze aandoening
beeldhouden / kunst
rechter oog is nu 1%, links is 40%
jmd
dingen terugvinden op een makkelijke manier
lichthinder
darkmode is beter
grotere muis

Gebruikt: supernova windows

Schrijven van aantekeningen
Misschien met spraakmemo's

thuis worden de meeste boeken gelezen
15 boeken op de boekenplank van passendlezen

font grootte en font dikte zijn ook beter als het groter is

outline is belangerijk

Per woord moet er een annotatie gemaakt kunnen worden

inspreken is het makkelijkst

kunnen stoppen per woord via een knop of spraak en daarop een annotatie te maken.

koppenstructuur toevoegen? Net als word

boekenplank met boeken waar annotaties zijn opgeslagen

geel op zwart is een goede kleur

[Link naar website Roger](https://www.rogerravelli.com/)

roger ravilie

</details>

## exclusive design principles

### Study situation

Tijdens de introdag heb ik meegeschreven wat de wensen en eisen zijn van Roger. Deze wensen zijn per testdag verfijnd en aangepast.

### Ignore conventions

Om te zorgen dat Roger makkelijk door de menu's kan navigeren heb ik een `Focus trap` gemaakt zodat het toggelen van instellingen makkelijker kan. Dit is geen normale conventie omdat dit zorgt dat je niet met alleen de `tab` key door de hele site kan navigeren.

### Prioritise identity

Roger vindt rustiek erg belangerijk en heeft veel moeite met het vinden van de toetsen. Hierom heb ik de interactie knoppen op `J` en `F` gezet. Dit is omdat deze knoppen een bumper hebben. Dit zorgt ervoor dat deze makkelijk gevonden kunnen worden.

### Add nonsense

Roger heeft aangegeven dat de kleuren die voor hem fijn zijn om te gebruiken heb ik deze kleuren verwerkt in mijn site. Deze kleuren zijn zo aan te passen dat je de achtergrond en font kleur hetzelfde kan maken. Dit maakt de site voor mensen met goed zicht niet bruikbaar. Echter heeft Roger hier niet veel last van want die gebruikt alleen het toetsenbord.

## Iteratie 1

Ik heb een tekst uit wikipedia gepakt en deze op mijn website gezet. De teksten heb ik in een `<p>` tag geplaats en deze een `tabindex="0"` gegeven zodat de tab knop naar deze elementen focussed. Ook heb ik een annotatie element gemaakt die wordt toegevoegd aan de html als de `enter` toets word ingeklikt. Het annotatie wordt toegevoegd onder het element wat gefocussed is.

## iteratie 2

Ik heb een menu boven de tekst gepaatst zodat de gebruiker zelf een aantal opties kan aanpassen zoals:

- Font grootte;
- Font kleur;
- Container grootte;
- Achterground kleur;
- Lezer snelheid;
- Lezer volume.

## Iteratie 3

Het opties menu heb ik verstopt en op **klik** van de `J` toets laat ik het menu verschijnen. Er is ook een lijst met annotaties aan de zijkant toegevoegd zodat de gebruiker makkelijk kan zien welke annotaties er gemaakt zijn. Deze annotaties zijn interactief en lijden de gebruiker naar de annotatie in de tekst zodat de gebruiker weet waar de annotatie staat en onder welke tekst deze is geplaatst.

De annotaties zijn verwijderbaar door een knop onder de lijst.

## Iteratie 4

Elke annotatie is nu zelf verwijderbaar zodat bij grootte hoeveelheden aan annotaties niet elke wordt verwijderd.
Als de gebruiker wilt dat alle annotaties worden verwijderd kan dit nogsteeds met de knop. Echter krijgt de gebruiker nu een alertbox zodat de gebruiker niet perongeluk de annotaties verwijderd. Bij het drukken van de `f` toets wordt de focus nu gezet op de voorleesknop zodat de gebruiker terugkan naar de tekst.

Het instellingen menu was nu duidelijk voor de gebruiker.

## Link

[Link naar project](https://tymonl.github.io/HCD/)