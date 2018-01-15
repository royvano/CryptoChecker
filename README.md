In dit project, ben ik aan de slag gegaan om het bekijken van crypto munten makkelijker te maken. 
Met een crypto ticker API van coinmarketcap haal ik de gekozen gegevens op.

Hierna gebruik ik Google Charts om deze gegevens te plotten.

In de HTML code zie je dat de init functie 2 parameters heeft. Hiermee kun je de positie (horizontaal of verticaal) aanpassen en kun je ook kiezen wat je wilt zien, market cap of prijs van de coins.

# CryptoChecker

Bekijk en vergelijk de populairste coins live!

## Getting Started

Volg de instructies om je project op je eigen server te draaien. Bekijk deployment voor uitleg over de installatie op een live systeem.

### Prerequisites

Wat is er nodig?

```
- Toegang tot eigen webspace via bijv. Filezilla
- Kennis over javascript basics
```

### Installing

Stapsgewijze instructies om het project te draaien op eigen server.

```
1. Unzip files 
2. Plaats files in een map op je webspace
3. Ga naar de link /index.html en doe de demo!
```

## Running the demo

Bij het laden van de pagina zie je gelijk een grafiek en je kunt ook andere coins kiezen, waarna deze worden geplot.

## Deployment

Wil je een eigen demo maken? 

1. Maak een Object

```
var crypto = new cryptoTools();
```
2. Zet gewenste functies in HTML tussen <script> tags

```
//Function for checking button when pressed
function buttonPressed(){
    var crypto = new cryptoTools();
    crypto.buttonPressed();
  }
  
  //Function which automatically inits a plot
  function initDynamicView(){
    var crypto = new cryptoTools();
    //Choose positioning (horizontal or vertical) and option: (market_cap or price) also choose a div ID 
    crypto.initDynamicView('horizontal', 'market_cap', 'chooseCoins');
  }
  
  //Function which inits a plot after choosing your specific coins
  function drawTheChart(){
    var crypto = new cryptoTools();
  //Choose positioning (horizontal or vertical) and option: (market_cap or price)  also choose a div ID
  crypto.drawCryptoChartFromArray(['bitcoin','ripple', 'ethereum'], "divName");
  }
  
  //To show onload in demo
   window.onload = function(){
        drawTheChart();
        initDynamicView()
 }
 
```

3. Als laatste zijn in de HTML nog div's nodig, afhankelijke van je functie (div ID). Dat ziet er in de demo zo uit:

```
<div id="divName" style="width: 800px; height: 500px;"></div>

<div id="chooseCoins"></div>

```

## Built With

* [Coinmarketcap](https://coinmarketcap.com/api/) - The API used
* [Google Charts](https://developers.google.com/chart/) - Data Visualisation
* [Bounce.js](https://semester4.nl/bounce/) - Library format
 

## Author

* **Roy van Oeteren** - *Initial work* 






