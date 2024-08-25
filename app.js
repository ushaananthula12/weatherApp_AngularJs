angular.module('weatherApp', [])
    .controller('WeatherController', ['$scope', '$http', function($scope, $http) {
        $scope.cityName = '';
        $scope.weather = null;

        $scope.searchWeather = function() {
            if ($scope.cityName) {
                const apiKey = '6531d758e982092b479eb97ce073026b'; // Replace with your actual API key
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${$scope.cityName}&appid=${apiKey}&units=metric`;
                
                $http.get(url).then(function(response) {
                    const data = response.data;
                    $scope.weather = {
                        city: data.name,
                        temperature: data.main.temp,
                        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                        conditions: data.weather[0].description
                    };
                }, function(error) {
                    console.error('Error fetching weather data:', error);
                    $scope.weather = null;
                    alert('City not found. Please enter a valid city name.');
                });
            } else {
                alert('Please enter a city name.');
            }
        };
    }]);
