

function destroyTab(link) {
    var parentElementId = link.parentElement.id;
    dojo.destroy(dojo.byId(parentElementId.substring(0, parentElementId.length - 4) + "_content"));  
    dojo.destroy(link.parentElement); 
    if (dojo.query("#content div").length > 0 && dojo.query("#content .current").length == 0) {
        dojo.query("#content div")[0].setAttribute("class", "current"); 
        dojo.query("#tabss li")[0].setAttribute("class", "current");
    }
}

function addTab(link, request) {
    if (!dojo.byId(link.id + "_tab")) {
        dojo.query("#tabs li, div").removeClass("current"); 
        dojo.place("<li id='" + link.id + "_tab' class='current'><a href='#' class='select'>New tab <a href='#' class='remove'>&#10060;</a></a></li>", "tabss", "into"); 
        dojo.place("<div id='" + link.id + "_content' class='current'>content from " + link.id + " id</div>","content", "into"); 
    } 
    
    require(["dojo/request"], 
            function(request) {
                request.get("test_ajax").then(
                    function(response) {
                        console.log("good: " + response.getAttribute);
                    },
                    function(error) {
                        console.log("not good");
                    }
                )
            }
    )
}

function selectTab(link) {
    var parentElementId = link.parentElement.id;
    dojo.query("#tabs li, div").removeClass("current"); 
    link.parentElement.setAttribute("class", "current"); 
    dojo.byId(parentElementId.substring(0, parentElementId.length - 4) + "_content").setAttribute("class", "current");
}
