/*Création des modaux avec les animations*/

	function createModalMamie(){
		var modalMamie = $("<div></div>").attr({"id" : "modalMamie", "class" : "modal"});
		var modal = $("<div></div>").attr("class","modal-content");
		//modal.append($("<span></span>").class("close").html("&times;");
		modal.append($("<p></p>").text("Veuillez patienter..."));
		modal.append($("<img></img>").attr({"id":"mamieImg", "src":"mamie.png", "alt":"mamie", "position":"relative"}));
		modalMamie.append(modal);
		$("body").append(modalMamie);
	}
	
	function createModalStop(){
		var modalStop = $("<div></div>").attr({"class":"flip-container modal", "onclick":"this.classList.toggle('hover');", "width": "200px", "height":"200px"});
		var modalImagesContainer = $("<div></div>").attr({"class": "flipper modal-content", "width": "200px", "height":"200px"});
		var front = $("<div></div>").attr("class", "front");
		front.append($("<img></img>").attr({"src" : "stop.png", "alt": "panneau stop", "width": "200px", "height":"200px"}));
		var back = $("<div></div>").attr("class", "back");
		back.append($("<img></img>").attr({"src" : "stop.png", "alt": "panneau stop", "width": "200px", "height":"200px"}));
		
		modalImagesContainer.append(front);
		modalImagesContainer.append(back);
		modalStop.append(modalImagesContainer);
		$("body").append(modalStop);
	}
	
	function createModalFeu(){
		var modalFeu = $("<div></div>").attr({"id" : "modalFeu", "class" : "modal"});
		var modal = $("<div></div>").attr("class","modal-content");
		//modal.append($("<span></span>").class("close").html("&times;");
		modal.append($("<img></img>").attr({"id":"feuImg", "src":"feu_rouge.png", "alt":"feu_rouge", "position":"absolute", "float":"left"}));
		modal.append($("<p></p>").attr({"id": "compteurFeu"}));
		modalFeu.append(modal);
		$("body").append(modalFeu);
	}
	
	var animateFeu = function ( i) {
	if(i == 0){
		$("#compteurFeu").attr({"style" : "font-size:medium;opacity:1;left:50%;top:30%;position:absolute;float:left"}).html("Start");

		$("#feuImg").attr({ "src":"feu_vert.png", "alt":"feu vert" ,"position":"absolute", "float":"left"});
		$("#compteurFeu").animate({"font-size":"+=150px", "opacity" :"0"}, 1000, "linear", function(){$("#modalFeu").remove()});
	
	}
	else{
	
    $("#compteurFeu").attr({"style" : "font-size:medium;opacity:1;left:50%;top:30%;position:absolute;float:left"}).html(i);
	
    $("#compteurFeu").animate({"font-size":"+=150px", "opacity" :"0"},
                        1000,
                        'linear',
                        function(){
                            animateFeu(i-1);
                        });
	}
	};