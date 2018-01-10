var cryptoTools = function(){

/**
     * Default setting for the module
     * @type {{option: string(price or market_cap), barDirection: string(vertical or horizontal)}}

     */
    var defaultSettings = {
        option: 'price',
        barDirection: 'horizontal'
    };

//Function checkboxManager checks which boxes are ticked and collects ticked items in coinChosen Array
    var checkboxManager = function(){
      var coins = ["bitcoin", "ripple", "gas", "ethereum", "cardano", "verge" , "litecoin", "stellar" ];
      var coinChosen = [];
      var arrayLengthChecked = 0;

      var arrayLength = coins.length ;
        for (var i = 0; i < arrayLength; i++) {
            //Check if checkbox is ticked
            var coinChecked = document.getElementById(coins[i]).checked;
            if(coinChecked == true)
            {
              coinChosen.push(coins[i]);
            }
        }    

        arrayLengthChecked = coinChosen.length;

        if (arrayLengthChecked > 0 && arrayLengthChecked == 4) {
          for (var i = 0; i < arrayLengthChecked; i++){
            apiCall("https://api.coinmarketcap.com/v1/ticker/" + coinChosen[i] + "/");
           }
         } else {
              document.getElementById("alerto").innerHTML = "Kies Precies 4 Coins";
            }
      }

  //Variable for saving json data
  var dataJSON;
  //Empty array for multiple json objects
  var jsonArray = [];

  //Converting the JSON data from request to an array which is used for setting up google charts. 
  var processData = function(data){
    obj = JSON.parse(data);
    var obj0 = obj[0];
    jsonArray.push(obj0);

    dataJSON = data;
    google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
  }

  //Function drawChart, converts & sorts data and draws it in the chart
  var drawChart = function() { 

      var data;  
      document.getElementById("alerto").innerHTML = "";
      if (defaultSettings.option ==  "price" && jsonArray[3].name != null){
          data = google.visualization.arrayToDataTable([
            ['Coins', "Price in $"],
            [jsonArray[0].name, parseFloat(jsonArray[0].price_usd)],
            [jsonArray[1].name, parseFloat(jsonArray[1].price_usd)],
            [jsonArray[2].name, parseFloat(jsonArray[2].price_usd)],
            [jsonArray[3].name, parseFloat(jsonArray[3].price_usd)]
          ]);
          var options = {
            chart: {
              title: 'Crypto Ticker',
              subtitle: "Choose and watch different Crypto's live!",
            },
            bars: defaultSettings.barDirection,
          vAxis: {format: 'decimal'},
          height: 400,
          colors: ['#1b9e77', '#d95f02', '#7570b3']
          };

          var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
          data.sort({column: 0, desc: true});
          chart.draw(data, google.charts.Bar.convertOptions(options));
      } else if (defaultSettings.option == "market_cap" && jsonArray.length >= 4){
      data = google.visualization.arrayToDataTable([
            ['Coins', "Market Cap in $"],
            [jsonArray[0].name, parseFloat(jsonArray[0].market_cap_usd)],
            [jsonArray[1].name, parseFloat(jsonArray[1].market_cap_usd)],
            [jsonArray[2].name, parseFloat(jsonArray[2].market_cap_usd)],
            [jsonArray[3].name, parseFloat(jsonArray[3].market_cap_usd)]
          ]);
      var options = {
            chart: {
              title: 'Crypto Ticker',
              subtitle: "Choose and watch different Crypto's live!",
            },
            bars: defaultSettings.barDirection,
          vAxis: {format: 'decimal'},
          height: 400,
          colors: ['#1b9e77', '#d95f02', '#7570b3']
          };

          var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
          data.sort({column: 0, desc: true});
          chart.draw(data, google.charts.Bar.convertOptions(options));
      }
   }

    //Function apiCall handles sending and receiving the API requests
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
     * @param {string} [url] string containing API url
     */
    var init = function(url) {
        checkboxManager();

    };

    //Return the functions that should be accessible from the outside. The rest is only accessible from within the object
    return {
        init: init
    };
};
