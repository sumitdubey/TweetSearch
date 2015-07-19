'use strict';

angular.module('limetray-app', ['googlechart']).controller("MainCtrl", function ($scope, $http) {
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
		$http.get("api/"+$scope.keyword).success(function(data){
			$scope.data = data;
			$scope.date = new Date();
			$scope.chart.data.rows.push(
				{ c:[	{
							v: $scope.date.toUTCString()
						},
						{
							v: $scope.data.statuses.length, f: $scope.data.statuses.length+" tweets"
						}
					]
				}
			);
			
			if($scope.chart.data.rows.length > 15)
				$scope.chart.data.rows.shift();

		});
		setTimeout($scope.getData,2000);
	}
	
});