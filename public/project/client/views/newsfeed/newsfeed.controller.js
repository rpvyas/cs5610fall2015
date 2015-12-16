(function(){
    angular
        .module("NewsRoomApp")
        .controller("NewsFeedController",NewsFeedController);

    function NewsFeedController($scope,$location,$rootScope,UserService, $http)
    {
        $scope.$location = $location;
        $scope.feeditems = [];
        $scope.temp=[];
        $scope.text="";
        $scope.addToShared = addToShared;
        $scope.addFavorite = addFavorite;
        $scope.showArticle = showArticle;
        $scope.isShared = isShared;
        $scope.isFavorited = isFavorited;
        $scope.selectedNewsItem = {};

        setSelectedNewsItem();
        //$scope.selectedNewsItem

       //if ($location.url().indexOf('showarticle')!=-1){
       //    showArtidcle($scope.selectedNewsItem);
       //}
        var user = $rootScope.user;

        var myitems = populateFeedItemsForUser(user);
        //updateImageUrls($scope.temp);

        $rootScope.$on("newsitem", function (event, newsitem) {
            $scope.selectedNewsItem = newsitem;

        });

        $rootScope.$on("favoriteEvent", function (event, newsitems) {
            $scope.temp = newsitems;
        });

        function isShared(newsitem)
        {
            for(var i=0; i<user.sharednewsitems.length;i++)
            {
                if(user.sharednewsitems[i].title == newsitem.title)
                {
                    $rootScope.$broadcast("favoriteEvent",$scope.temp);
                    return "true";
                }
            }
            return "false";

        }
        function isFavorited(newsitem)
        {
            for(var i=0; i<user.favorites.length;i++)
            {
                if(user.favorites[i].title == newsitem.title)
                {
                    $rootScope.$broadcast("favoriteEvent",$scope.temp);
                    return "true";
                }
            }
            return "false";

        }
        function setSelectedNewsItem(newsitem)
        {
            if(newsitem)
            {
                $rootScope.$broadcast('newsitem', newsitem);
            }
        }
        function populateFeedItemsForUser(user)
        {
            var interests = user.interests;
            var newsFeedItems = getFeedItemsFromInterests(interests);
            return newsFeedItems;

        }

        function getFeedItemsFromInterests(interests)
        {
            var feeditems = [];
            for(var i=0; i< interests.length; i++)
            {
                var interest = interests[i];

               var abc = getItemsFromAPI(interest,function(newsitems){

                    for(var j=0; j<newsitems.length;j++)
                    {
                        //var newsitem = newsitems[j];
                        //var alchemyKey1 = "0d1a6d2a036e12cda6499d7689fbaf7ac78426ea";
                        //var alchemyImageUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetImage?apikey="+alchemyKey1+ "&url="+ newsitem.url + "&outputMode=json&jsonp=JSON_CALLBACK";
                        //$http.jsonp(alchemyImageUrl)
                        //    .success(function(response){
                        //        //console.log(response);
                        //        // console.log(response.image);
                        //        console.log("***API RESPONSE****");
                        //        newsitem.imageUrl = response.image;
                        //        $scope.temp.push(newsitem);
                        //    });
                        $scope.temp.push(newsitems[j]);
                    }
                    return $scope.temp;
                });


            }
            feeditems = $scope.temp
            //callback($scope.feeditems);
            return feeditems;

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

        //function getImageFromUrl(url,callback)
        //{
        //    console.log("Alchemy api call for image ");
        //    var alchemyKey1 = "0d1a6d2a036e12cda6499d7689fbaf7ac78426ea";
        //    var alchemyImageUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetImage?apikey="+alchemyKey1+ "&url="+ url + "&outputMode=json&jsonp=JSON_CALLBACK";
        //    $http.jsonp(alchemyImageUrl)
        //        .success(function(response){
        //           //console.log(response);
        //           // console.log(response.image);
        //            callback(response.image);
        //
        //        });
        //
        //}
        function showArticle(newsitem)
        {

            console.log("Inside show article");
            console.log(newsitem);
            var alchemyKey1 = "0d1a6d2a036e12cda6499d7689fbaf7ac78426ea";
            var alchemyKey2 = "d835b54524dd6f4fbf4b6e012d31e136119ed2ba";
            var alchemyTextUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetText?apikey="+alchemyKey1+ "&url="+ newsitem.url + "&outputMode=json&jsonp=JSON_CALLBACK";

            console.log("*(*(*(*(*(*(*(");
            console.log(newsitem.text)
            console.log(newsitem);
            console.log("*(*(*(*(*(*(*(");
            //if(!newsitem.text)
            {
                $http.jsonp(alchemyTextUrl)
                    .success(function (response) {
                        //console.log("**RESPONSE***");
                        //console.log(response);
                        newsitem.text = response.text;
                        $scope.selectedNewsItem = newsitem;
                        $scope.text = response.text;
                        //console.log($scope.selectedNewsItem.text);
                        setSelectedNewsItem(newsitem);
                        //$location.path("/showarticle");
                    });
            }
            $location.path("/showarticle");

        }



        function addToShared(newsitem)
        {
            console.log("inside shared ");
            console.log(newsitem);
            var user = $rootScope.user;
            var date = Date();
            newsitem.time = date.toString();
            user.sharednewsitems.push(newsitem);
            UserService.updateUser(user, user._id);
        }

        function addFavorite(newsitem)
        {
            var user = $rootScope.user;
            user.favorites.push(newsitem);
            UserService.updateUser(user, user._id);

        }

    }
})();
