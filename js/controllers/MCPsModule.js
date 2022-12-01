import MCPs from "../constants/MCPs.js";

UnfilledCount(MCPs)
OverloadedCount(MCPs)

function UnfilledCount(data){
    var MCPsUnfilledCount = document.getElementById('MCPsUnfilledCount');

    var count = 0;
    for ( var i = 0; i < data.length; i++){
        if ( data[i].status == "Unfilled" ) {
            count++;
        }
    }
    
    MCPsUnfilledCount.innerHTML = `${count}`
}

function OverloadedCount(data){
    var MCPsOverloadedCount = document.getElementById('MCPsOverloadedCount');

    var count = 0;
    for ( var i = 0; i < data.length; i++){
        if ( data[i].status == "Overloaded" ) {
            count++;
        }
    }
    
    MCPsOverloadedCount.innerHTML = `${count}`
}