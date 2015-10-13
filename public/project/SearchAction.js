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
            console.log("into the serach function!!")
            var title = movieTitle.val();

            $.ajax({
                headers: {
                    "Authorization": "Basic " +'hdhkQaJSBrjmHdAhn++vHAzqbaEkFcpuLje8tgXlgSw'
                },
                username:'blah',
                password:'hdhkQaJSBrjmHdAhn++vHAzqbaEkFcpuLje8tgXlgSw',

                url: 'https://api.datamarket.azure.com/Bing/Search/v1/Web?$format=json&Query=%27mamadou%20sakho%27',
                dataType: "jsonp",
                jsonp : false,
                jsonpCallback: 'jsonCallback',
                // contentType: 'application/json', -- you can't set content type for a <script> tag, this option does nothing for jsonp | KevinB
                cache: 'true',
                success: renderMoviesWithTemplate
            });
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