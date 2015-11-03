/**
 * Created by Ravi on 10/13/2015.
 */
(function (){

    $(init);

    function init()
    {
        console.log("begin javascript");
        $("#searchButton").click(searchButton);
        var movieTitle = $("#movieTitle");
        var tbody = $("#serachContainer"); //table.find("tbody");
        var template = $("#serachContainer").clone();
        tbody.empty();

        function searchButton()
        {
            console.log("into the serach function!!");
            var title = movieTitle.val();

            $.ajax({
                //headers: {
                //    "Authorization": "Basic " +'hdhkQaJSBrjmHdAhn++vHAzqbaEkFcpuLje8tgXlgSw'
                //},
                username:'blah',
                //password:'hdhkQaJSBrjmHdAhn++vHAzqbaEkFcpuLje8tgXlgSw',
                password:'PSR4oDzz+si7Nd/7Ea21qz7PMgcRx5+Qogu4TB5jR5w=',
                url: 'https://api.datamarket.azure.com/Bing/Search/v1/Web?$format=json&Query=%27mamadou%20sakho%27',
                //NY TIMES API KEY - 773e5ca29420b5aa4a84f40abbbefc05:19:73209776

                //url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=obama&api-key=773e5ca29420b5aa4a84f40abbbefc05:19:73209776',
                dataType: "jsonp",
                jsonp : false,
                jsonpCallback:'callBackFunction',
                // contentType: 'application/json', -- you can't set content type for a <script> tag, this option does nothing for jsonp | KevinB
                cache: 'true',
                success: renderMoviesWithTemplate
            });

            function callBackFunction(data)
            {
                console.log("inside call back");
                console.log(typeof(data))
                console.log(data);
            }
        }

        function renderMoviesWithTemplate(movies)
        {
            console.log(movies);
            //alert("inside render!!")
            //tbody.empty();
            //
            //for(var m in movies)
            //{
            //    var movie = movies[m];
            //    var title = movie.title;
            //    var plot = movie.plot;
            //    var posterUrl = movie.urlPoster;
            //    var imdbUrl = movie.urlIMDB;
            //
            //    var tr = template.clone();
            //
            //    tr.find(".link")
            //        .attr("href", imdbUrl)
            //        .html(title);
            //
            //    tr.find(".plot")
            //        .html(plot);
            //
            //    tr.find(".poster")
            //        .attr("src", posterUrl);
            //
            //    tbody.append(tr);
            //}
        }

        function renderMovies(movies)
        {
            console.log(movies);

            tbody.empty();

            for(var m in movies)
            {
                var movie = movies[m];
                var title = movie.title;
                var plot = movie.simplePlot;
                var posterUrl = movie.urlPoster;
                var imdbUrl = movie.urlIMDB;

                var tr = $("<tr>");
                var titleLink = $("<a>").attr("href", imdbUrl).html(title);
                var titleTd = $("<td>").append(titleLink);
                var plotTd  = $("<td>" + plot + "</td>");
                var img = $("<img>").attr("src",posterUrl);
                var posterTd = $("<td>").append(img);

                tr.append(titleTd);
                tr.append(plotTd);
                tr.append(posterTd);

                tbody.append(tr);
            }
        }
    }
})();