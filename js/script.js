function getVid(vidId, key)
{
    $.get("https://www.googleapis.com/youtube/v3/videos?fields=items(id,snippet(title,publishedAt,channelTitle,description,thumbnails),statistics(viewCount,likeCount,dislikeCount,commentCount))&part=snippet,statistics&id=" + vidId + "&key=" + key, function(data)
    {
        var div = $("#infoHolder");
        div.empty();
        
        var vid = data.items[0].snippet;
        var stats = data.items[0].statistics;
        var posted = new Date(vid.publishedAt).toLocaleString();
        var totalLikeDis = Number(stats.likeCount) + Number(stats.dislikeCount);
        var h = 0;
        var w = 0;
        var best = "";
        var url = "";
        $.each(vid.thumbnails, function(i, v)
        {
            if(v.width >= w)
            {
                best = i;
                h = v.height;
                w = v.width;
                url = v.url;
            }
        });
        
        var titleHTML = "<h1>" + vid.title + "</h1>";

        var publishedHTML = "<p>Published at " + posted + "</p>";

        var channelHTML = "<p>By " + vid.channelTitle + "</p>";

        var descrHTML = "<p>" + vid.description + "</p>";

        var thumbHTML = "<img src='" + url + "' alt='" + best + "' height='" + h + "' width='" + w + "'>";

        var viewsHTML = "<p>View count: " + stats.viewCount + "</p>";

        var likeVdisBar = '<div id="ratingBar" style="overflow: hidden; width:100%;">';
        likeVdisBar += '<div style="background-color: green; height: 1.5em; float: left; width: ' + ((stats.likeCount/totalLikeDis)*100) + '%;"></div>';
        likeVdisBar += '<div style="background-color: red; height: 1.5em; float: left; width: ' + ((stats.dislikeCount/totalLikeDis)*100) + '%;"></div>';
        likeVdisBar += '</div>';
        
        var likeVdisNumeric = '<div style="width: 100%;">';
        likeVdisNumeric += '<div style="float: left; width: ' + ((stats.likeCount/totalLikeDis)*100) + '%; text-align: left;">' + stats.likeCount + '</div>';
        likeVdisNumeric += '<div style="float: left; width: ' + ((stats.dislikeCount/totalLikeDis)*100) + '%; text-align: right;">' + stats.dislikeCount + '</div>';
        likeVdisNumeric += '</div>';

        var commentHTML = "<p>Total comments: " + stats.commentCount + "</p>";

        div
            .append(titleHTML)
            .append(publishedHTML)
            .append(channelHTML)
            .append(descrHTML)
            .append(thumbHTML)
            .append(likeVdisBar)
            .append(likeVdisNumeric)
            .append(commentHTML)
        ;
    });
}