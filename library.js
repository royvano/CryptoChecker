var library = function(){

var checkboxManager = function(){
    var coins = ["bitcoin", "ripple", "gas", "ethereum", "cardano", "verge" , "litecoin", "stellar" ];
    var coinChosen = [];

    var arrayLength = coins.length ;
      for (var i = 0; i < arrayLength; i++) {
          //kijken of checkbox is aangevinkt
          var coinChecked = document.getElementById(coins[i]).checked;
        
          if(coinChecked == true)
          {
            coinChosen.push(coins[i]);
          }
      }    

      var arrayLengthChecked = coinChosen.length;
      if (arrayLengthChecked > 0) {
        var lengthIndexed = arrayLengthChecked;
        for (var i = 0; i < lengthIndexed; i++){
          apiCall("https://api.coinmarketcap.com/v1/ticker/" + coinChosen[i] + "/");
         }
      }
    }

  var dataJSON;

  var processData = function(data){
    obj = JSON.parse(data);
    var obj0 = obj[0];

    dataJSON = data;
    google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
  }

  var drawChart = function() {
      obj = JSON.parse(dataJSON);
      var obj0 = obj[0];
      console.log(obj0);
        
      var data = google.visualization.arrayToDataTable([
            ['Names', 'Price in $', 'Change in %', 'Marketcap'],
            [obj0.name, obj0.price_usd, obj0.percent_change_24h, obj0.market_cap_usd],
            [obj0.name, obj0.price_usd, obj0.percent_change_24h, obj0.market_cap_usd],
            [obj0.name, obj0.price_usd, obj0.percent_change_24h, obj0.market_cap_usd],
            [obj0.name, obj0.price_usd, obj0.percent_change_24h, obj0.market_cap_usd]
          ]);

          var options = {
            chart: {
              title: 'Crpyto Ticker',
              subtitle: "Choose and watch different Crypto's live!",
            }
          };

          var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

          chart.draw(data);
        }

    var apiCall = function(url){
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
          if (request.readyState === 4) {
              if (request.status === 200) {
                  document.body.className = 'ok';
                  processData(request.responseText);
              } else if (!isValid(this.response) && this.status == 0) {
                  document.body.className = 'error offline';
                  console.log("The computer appears to be offline.");                
              } else {
                  document.body.className = 'error';
              }
          }
      };
      request.open("GET", url , true);
      request.send(null);
    }

/**
     * Initializes the module
     * @param {string} [selector] Css selector that targets the element that needs to bounce
     * @param {object} [settings] Object that contain overrides for the default settings
     */
    var init = function(url) {
        checkboxManager();

    };

    //Return the functions that should be accessible from the outside. The rest is only accessible from within the object
    return {
        init: init
    };
};
