'use strict';

angular.module('tweet-search-app', ['googlechart']).controller("MainCtrl", function ($scope, $http) {
	$scope.keyword = "limetray";
	
	$scope.chart = {};
    $scope.chart.type = "ColumnChart";
    $scope.chart.cssStyle = "height:500px; width:1000px;";
    $scope.chart.data = 
	{ 
		"cols": [{
					id: "time",
					label: "Time",
					type: "string"
				},
				{
				  id: "tweets",
				  label: "Tweets",
				  type: "number"
				}
			  ],
		"rows": []
	};

    $scope.chart.options = {
        "title": "Tweets vs Time",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Count", "gridlines": {"count": 6}
        },
        "hAxis": {
            "title": "Time"
        }
    };

    $scope.chart.formatters = {};


	$scope.getData = function(){
		console.log("keyword: "+encodeURIComponent($scope.keyword));
		$http.get("api/"+encodeURIComponent($scope.keyword)).success(function(data){
			console.log(data)
			$scope.data = data;
			$scope.date = new Date();
			$scope.chart.data.rows.push(
				{ c:[	{
							v: $scope.date.toUTCString()
						},
						{
							v: $scope.data.statuses.length, f: $scope.data.statuses.length+" tweets  "+ $scope.keyword
						}
					]
				}
			);
			
			if($scope.chart.data.rows.length > 15)
				$scope.chart.data.rows.shift();

		});
		//setTimeout($scope.getData,5000);
	}
	
});