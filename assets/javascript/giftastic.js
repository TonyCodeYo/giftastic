var topics = ["meditation","weightlifting","yoga","keto"];
var data;
var stillId;
var activeId;

function displayGif() {
  var topic = $(this).attr("data-name");
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=UYn6W2tTZ1xkVOXUMgcytoYGE7p2BhYn&limit=10&limit=10`;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function (response) {
    data = response.data;
    var viewDiv = $("<div class= activeOrStill>");
    for (var i = 0; i < data.length; i++) {
      let TopicDiv = $("<div class = topicDiv>");
      const Topic = $('<p>').text('Topic: ' + topic);
      const rating = data[i].rating;
      const pOne = $("<p>").text("Rating: " + rating);
      TopicDiv.append(Topic);
      TopicDiv.append(pOne);
      
      const src1 = data[i].images.fixed_height_still.url;
      const image1 = $("<img>");
      image1.attr("src", src1);
      image1.addClass("stillGifs");
      image1.attr('id', topic + i + 'Still');
      image1.attr('dataInfo', topic + i);
      TopicDiv.append(image1);

      const src2 = data[i].images.fixed_height.url;
      const image2 = $("<img>");
      image2.attr("src", src2);
      image2.addClass("activeGifs");
      image2.attr('id', topic + i + 'Active');
      image2.attr('dataInfo', topic + i);
      TopicDiv.append(image2);
      viewDiv.append(TopicDiv);
  }
  $("#topics-view").prepend(viewDiv);
  $('.activeGifs').hide();
});
}

function renderButtons() {

$("#buttons-view").empty();

for (let i = 0; i < topics.length; i++) {
  const a = $("<button>");
  a.addClass("topic");
  a.attr("data-name", topics[i]);
  a.text(topics[i]);
  $("#buttons-view").append(a);
}
}

$("#add-topic").on("click", function(event) {
  event.preventDefault();
  const topic = $("#topic-input").val().trim();
  topics.push(topic);
  $("#topic-input").val("");
  renderButtons();
});

$(document).on("click", ".topic", displayTopicInfo);

renderButtons();

$(document).on("click", '.stillGifs', function(event) {
  stillId = '#' + event.target.attributes.dataInfo.value + 'Still';
  activeId = '#' + event.target.attributes.dataInfo.value + 'Active';
  $(stillId).hide();
  $(activeId).show();
});

$(document).on("click", '.activeGifs', function(event) {
  stillId = '#' + event.target.attributes.dataInfo.value + 'Still';
  activeId = '#' + event.target.attributes.dataInfo.value + 'Active';
  $(stillId).show();
  $(activeId).hide();
});

      
    }
    
  })

  
}