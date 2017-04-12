angular.module('starter.controllers', ['ui.bootstrap'])


.service('userData', function () {
  var userID;
  var isTrainer;

  return {
    getUserID: function () {
      return userID;
    },
    setUserID: function(value) {
      userID = value;
    },
    getIsTrainer: function () {
      return isTrainer;
    },
    setIsTrainer: function(value) {
      isTrainer = value;
    }
  };
})

.controller("SignUpCtrl", function($scope, $state){
  $scope.data = {};
  $scope.signup = function(){
    $state.go('signup');
  }
})

.controller('AddUserCtrl', function($scope, $http, $state, $ionicPopup){
  console.log("printf adduserctrl");
  $scope.data = {};
  $scope.data.user = "Trainer";
  $scope.submit2 = function(){
    console.log("printf submit2");
    var link = 'https://v151.38cloud.com/~foxteam/adduser.php';
    var info = {"email":$scope.data.email, "password":$scope.data.password,
    "user":$scope.data.user};
    $http.post(link,info).then(function(res){
      console.log(info);
      $scope.response = res.data;
      console.log("printf return", $scope.response);
      if($scope.response == 0){
        var alertPopup2 = $ionicPopup.alert({
          title: 'Account created!'
        });
        $state.go('app.home');
      }
      else if($scope.response == 1){
        var alertPopup3 = $ionicPopup.alert({
          title: 'Account not created!',
          template: 'Account username already in use, please try again'
        });
      }
    })
  }
})

.controller('FindUserCtrl', function($scope, $http, $ionicPopup, $state, userData){
  console.log("printf finduserctrl");
  $scope.data = {};
  $scope.submit = function(){
    console.log("printf submit");
    var link = 'https://v151.38cloud.com/~foxteam/finduser.php';
    var info = {"email":$scope.data.email, "password":$scope.data.password};
    console.log("printf info", info);
    console.log("printf email", $scope.data.email);
    console.log("printf password", $scope.data.password);
    $http.post(link,info).then(function(res){
      console.log("printf post");
      $scope.response = res.data;
      console.log("printf return", $scope.response);
      if($scope.response[0] >= 1){
        console.log("successful login");
        userData.setUserID($scope.response);
        if($scope.response[1] == "Trainer"){
          userData.setIsTrainer(true);
        }
        else{
          userData.setIsTrainer(false);
        }
        $state.go('app.home');
      }else if($scope.response[0] == 0){
        console.log("fail login");
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      }
    })
  }
  //  $http.get("http://http://v151.38cloud.com/~foxteam/finduser.php")
  //  	.success(function (response) {$scope.names = response.records;});
})

.controller("LoginCtrl", function($scope, LoginService, $ionicPopup, $state){
  $scope.data = {};

  $scope.login = function(){
    LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data){
      $state.go('app.home');
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, userData) {
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.isTrainer = userData.getIsTrainer();
  });

})
