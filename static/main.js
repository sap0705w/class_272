$(function () {
    var syncClient;
    var syncStream;
    var message = document.getElementById('message');
    var text_area = document.getElementById('text_area');
    var select_element = document.getElementById('select')
    var background_color;


    $.getJSON('/token', function(tokenResponse) {
        syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'info' });

        // create the stream object
        syncClient.stream('messageData').then(function(stream) {
            syncStream = stream;
            // listen update and sync drawing data
            syncStream.on('messagePublished', function(event) {
                console.log('syncStream:',event.message.value);
                syncDrawingData(event.message.value);


            });
        });
    });
    // Write the code here
    function syncDrawingData(data) {

        document.getElementById("text_area").value= data.textarea_value
        if(data.text_area_color=="white"){
            document.getElementById("text_area").style.backgroundColor="white"
        }
        if(data.text_area_color=="red"){
            document.getElementById("text_area").style.backgroundColor="red"
        }
        if(data.text_area_color=="yellow"){
            document.getElementById("text_area").style.backgroundColor="yellow"
        }
        if(data.text_area_color=="green"){
            document.getElementById("text_area").style.backgroundColor="green"
        }


    }


    function messageSync()
{
	text = document.getElementById("text_area").value;

    setTimeout(function(){
        SettingSyncData()
        },
        1700);

}
    // Write the code here
    function SettingSyncData(){
    syncStream.publishMessage({ 
            
            textarea_value:text,
            text_area_color: background_color
        });
    }
    // Write the code here
    function select_color(){
     selected_color= document.getElementById("select").value
     if (selected_color == "white"){
        background_color= "white"
        console.log("white")
     }
     if (selected_color == "red"){
        background_color= "red"
     }
     if (selected_color == "yellow"){
        background_color= "yellow"
     }
     if (selected_color == "green"){
        background_color= "green"
     }

    }
    // Write the code here
    text_area.addEventListener("keyup", messageSync) 
    select_element.addEventListener('change', select_color)

});
