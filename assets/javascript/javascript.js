$(document).ready(function() {
//--------------------------------------------------------
  
    var topics = ["The Jimi Hendrix Experience", "AC/DC", "The Grateful Dead", "Led Zeppelin", "The Beatles", "Van Halen", "The Rolling Stones", "Pink Floyd", "The Who", "Metallica"];
    // original array
//--------------------------------------------------------

    
    function renderButtons(){ // getting buttons set up with a for loop

        $("#buttons-OG").empty(); 

        for (var i = 0; i < topics.length; i++){
            
            var a = $("<button>");           
            a.addClass("topics");
            a.attr("data-search", topics[i]); // could have helped on my last HW... but atleast I figure it out
            a.text(topics[i]);         
            $("#buttons-OG").append(a);
        }
    }
//--------------------------------------------------------
   
    $("#new-button").submit(function(event){ // this is to create the users new button

        event.preventDefault();
        var textBox = $("#input").val().trim();
        topics.push(textBox); // pushes users texts into original array
        renderButtons();
        });
//--------------------------------------------------------

    renderButtons();
//--------------------------------------------------------

    $(document).on("click", ".topics", function(){ // on click function 

        var x = $(this).data("search");
       
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=KvDoqO2uS0d4TE2VLbcAiIr4kc1uqw3p&limit=10"; 

        $("#new-gifs").empty();
        $.ajax({url:queryURL, method: "GET"})
        .done(function(response){

            for (var i=0; i < response.data.length; i++){

                var gifDiv     = $('<div class="gifDiv">');
                var rating     = response.data[i].rating;
                var ratingDiv  = $('<p id ="rating">').html("Rating: " + rating);
                var animated   = response.data[i].images.fixed_height.url;
                var still      = response.data[i].images.fixed_height_still.url;
                var gifImg     = $('<img class="gImage">');
                
                gifImg.attr('src', still);
                gifImg.attr('data-still', still);
                gifImg.attr('data-animate', animated);
                gifImg.attr('data-state', 'still')
                
                gifDiv.append(ratingDiv);
                gifDiv.prepend(gifImg);
                $('#new-gifs').prepend(gifDiv);
            }
        })          
     });
//--------------------------------------------------------

    $('#new-gifs').on("click", ".gImage", function() { // this is the functions that lets me start and stop the gifs

        var state = $(this).attr('data-state');
        
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');}
              
            else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
    });
//--------------------------------------------------------

});