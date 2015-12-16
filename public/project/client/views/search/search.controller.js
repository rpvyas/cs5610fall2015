//"use strict";
//(function(){
//    angular
//        .module("NewsRoomApp")
//        .controller("SearchController",SearchController);
//
//
//    function SearchController($scope,$location,$rootScope, $http)
//    {
//        $scope.$location = $location;
//
//        //$scope.imageUrl = $rootScope.imageUrl;
//        $scope.newsitems = $rootScope.newsitems;
//        $scope.searhQuery = $rootScope.searchQuery;
//        $scope.search = search;
//
//        function search(searchTitle)
//        {
//            var searchResults = [];
//
//            console.log("search title = "+ searchTitle);
//            var guardianKey = "xcm8aahe2qcwhhvuztn6zuzd";
//            $rootScope.$on("searchresults",function(event,results){
//                $scope.searchResults = results;
//            });
//            var url = "http://content.guardianapis.com/search?q="+searchTitle+"&api-key="+guardianKey+"&callback=JSON_CALLBACK";
//            $http.jsonp(url)
//                .success(function(response){
//                    var response = response.response;
//                    var searchArray = response.results;
//                    for(var i=0; i<searchArray.length; i++)
//                    {
//                        var searchResult = {};
//                        searchResult.url = searchArray[i].webUrl;
//                        searchResult.title = searchArray[i].webTitle;
//                        searchResults.push(searchResult);
//                    }
//                    $scope.searchResults = searchResults;
//                    $rootScope.$broadcast("searchresults",searchResults);
//                    console.log(searchResults);
//                });
//            $location.path("/searchResults");
//
//        }
//
//
//    }
//})();
"use strict";
(function(){
    angular
        .module("NewsRoomApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$location,$rootScope,$http)
    {
        $scope.$location = $location;
        $scope.search = search;
        $scope.temp=[];
        $scope.showArticle = showArticle;
        $rootScope.$on("searchresults",function(event,results){
            $scope.temp = results;
        });

        $scope.user = $rootScope.user;

        function showArticle(newsitem)
        {
            console.log("inside show article search controller");
            $rootScope.article = newsitem;
            $location.path("/articleview");
        }
        function search(SearchTitle)
        {
            var searchResults = [];
            $scope.searchQuesry =SearchTitle;
            //console.log("search title = "+ SearchTitle);
            //var apiKey = "99b0e463-f753-4481-875a-a7ae744ea92d";
            //
            //var url = "http://content.guardianapis.com/search?q="+SearchTitle+"&api-key="+apiKey+"&callback=JSON_CALLBACK";
            //$http.jsonp(url)
            //    .success(function(response){
            //        console.log(response);
            //        var responseObject = response.response;
            //        var searchArray = responseObject.results;
            //        for(var i=0; i<searchArray.length; i++)
            //        {
            //            var searchResult = {};
            //            searchResult.url = searchArray[i].webUrl;
            //            searchResult.title = searchArray[i].webTitle;
            //            searchResults.push(searchResult);
            //        }
            //        $scope.searchResults = searchResults;
            //        console.log("***************");
            //
            //        $rootScope.$broadcast("searchresults",searchResults);
            //        console.log(searchResults);
            //    });
            //$location.path("/searchResults");

            getItemsFromAPI($scope.searchQuesry,function(newsitems){


                for(var j=0; j<newsitems.length;j++)
                {
                    $scope.temp.push(newsitems[j]);
                }
                $rootScope.$broadcast("searchresults",$scope.temp);
                return $scope.temp;
            });
            $location.path("/searchResults");
        }



        function getItemsFromAPI(interest,callback)
        {
            var guardianKey = "xcm8aahe2qcwhhvuztn6zuzd";
            var alchemyKey1 = "78426ea";
            var alchemyKey2= " ";
            var urlForImage = " ";
            var currentTimeStamp = Math.floor(Date.now() / 1000);
            var endTimeStamp = currentTimeStamp - 172800;
            var alchemyUrl = "https://access.alchemyapi.com/calls/data/GetNews?apikey="+alchemyKey1+"&jsonp=JSON_CALLBACK&return=enriched.url.title,enriched.url.url,enriched.url.enrichedTitle.docSentiment&start="+currentTimeStamp+"&end="+endTimeStamp+"&q.enriched.url.cleanedTitle="+interest+"&q.enriched.url.enrichedTitle.docSentiment.type=neutral&q.enriched.url.enrichedTitle.taxonomy.taxonomy_.label=news&count=25&outputMode=json";
            var guardianUrl = "http://content.guardianapis.com/search?order-by=newest&page-size=5&api-key="+guardianKey+"&q="+interest+"&callback=JSON_CALLBACK";
            var alchemyImageUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetImage?apikey="+alchemyKey1+ "&url="+ urlForImage + "&outputMode=json&jsonp=JSON_CALLBACK";
            //console.log("calling guardian api for "+ interest);
            //process guardian response

            //for text extraction
            //http://gateway-a.watsonplatform.net/calls/url/URLGetText?url=http://www.theguardian.com/environment/2015/dec/04/the-red-line-issue-that-exposes-deep-divisions-in-the-paris-climate-talks&apikey=0d1a6d2a036e12cda6499d7689fbaf7ac78426ea&outputMode=json


            var newsitems = [];
            $http.jsonp(guardianUrl)
                .success(function(response)
                {
                    //console.log(response);
                    var resp = response.response;

                    var arr = resp.results;
                    //console.log(arr);

                    for(var i = 0; i<arr.length; i++)
                    {
                        var newsitem = {};
                        newsitem.url = arr[i].webUrl;
                        newsitem.title = arr[i].webTitle;
                        //TODO get it from API
                        //newsitem.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/4/47/Anfield,_7_December_2013.jpg";
                        getImageFromUrl(newsitem,function(newsitem)
                        {
                            newsitems.push(newsitem)
                        });
                        getTextFromUrl(newsitem,function(newsitem){
                            newsitems.push(newsitem)
                        });

                        newsitems.push(newsitem);
                    }
                    callback(newsitems);
                });

        }

        function getImageFromUrl(newsitem,callback)
        {
            //console.log("Alchemy api call for image ");
            var alchemyKey1 = "0d1a6d2a036e12cda6499d7689fbaf7ac78426ea";
            var alchemyImageUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetImage?apikey="+alchemyKey1+ "&url="+ newsitem.url + "&outputMode=json&jsonp=JSON_CALLBACK";
            $http.jsonp(alchemyImageUrl)
                .success(function(response){
                    //console.log(response);
                    // console.log(response.image);
                    newsitem.imageUrl = (response.image);
                    callback(newsitem);

                });

        }
        function getTextFromUrl(newsitem,callback)
        {
            //console.log("Alchemy api call for image ");
            var alchemyKey1 = "0d1a6d2a036e12cda6499d7689fbaf7ac78426ea";
            var alchemyKey2 = "0d1a6d2a036e12cda6499d7689fbaf7ac78426ea";
            var alchemyImageUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetText?apikey="+alchemyKey1+ "&url="+ newsitem.url + "&outputMode=json&jsonp=JSON_CALLBACK";
            $http.jsonp(alchemyImageUrl)
                .success(function(response){
                    //console.log(response);
                    // console.log(response.image);
                    newsitem.text = (response.text);
                    callback(newsitem);

                });

        }




    }
})();