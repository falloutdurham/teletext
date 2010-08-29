// Generate a bunce of spacers as required ;)

function generate_spacers(count) {

	var space = "&nbsp;";
	var space_string ="";

	for(var i = 0; i < count; i++) {
		space_string += space;
	}

	return space_string;
}

function next_subpage(){
	if(!searching) {
		var maxSubPages = pages[currentPage.toString()].pages.length;
		currentSubPage = (currentSubPage + 1) % maxSubPages;
		render_page(currentPage, currentSubPage);

	}
}



function render_page(index, subpage) {

	var newPage = pages[index].pages[subpage];

	var newText = ""; 
	var newChar = "";

	// Pull out the text lines
	
	// CHROME BUG HERE. newLine / NewText?
	
	for(var i=0; i< newPage.lines.length; i++) {
		var newLine = "";
		newText = newPage.lines[i].text;
	
	
		
		for(var j=0; j < newText.length; j++) {
			
			if (newText[j] == " ")
				newLine += "<span>&nbsp;</span>";
			else
				newLine +="<span>"+newText[j]+"</span>";
			
		}
	
	currentLine = "#line"+ i;

	// After setting the line - cycle through the attributes array

	$(currentLine).html(newLine);

	$(currentLine+" span").each(function(index){
		
	if(newPage.lines[i].colors[index]) {
  		// REVEAL-O
	  if(newPage.lines[i].colors[index][2]) {
	     $(this).css('background-color','black');
	     $(this).css('color',           'black');
	     $(this).attr('reveal', 'off');
	     $(this).attr('reveal-bg', newPage.lines[i].colors[index][0]);
	     $(this).attr('reveal-fg', newPage.lines[i].colors[index][1]);
	     $(this).addClass('reveal');
	  }
	  else {
	  // Normal character
  
	    $(this).css('background-color',newPage.lines[i].colors[index][0]);
	    $(this).css('color',           newPage.lines[i].colors[index][1]);
	  }

	}
	});
	
	}


		var fastLine = "";
       
		for(var i in pages[index].fastext) {

		var button = "<span class='fastext_button' id='"+fastext[i]+"' page='"+pages[index].fastext[i][1]+"'>" + pages[index].fastext[i][0];


		if(pages[index].fastext[i][0].length < 10) {
		spacers = generate_spacers(10-pages[index].fastext[i][0].length);
		button += spacers;
		}
		button += "</span>";
		fastLine += button;
	}

	$("#fastext").html(fastLine);
	
	$("#fastext span").each(function(index){
		$(this).css('color',fastext[index]);
	});
}


function update() {

	// Set current time

	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if(minutes < 10)
	minutes = "0" + minutes;
	var seconds = currentTime.getSeconds();
	if(seconds < 10)
	seconds = "0" + seconds;
	var day  = days[currentTime.getDay()];
	var date = currentTime.getDate(); 
	var month = months[currentTime.getMonth()];

	$("#date").text(day + " "+date+" "+month+" "+hours+":"+minutes+"/"+seconds);

	// if searching, keep searching!

	

	if(searching) {
		
		// Loop around the hundred block where the page is located (making it more
		// like how teletext works :)
		
		var currentEndBlock = (Math.floor(currentPage / 100)+1) * 100;
		var currentStartBlock = currentEndBlock -100;
	
		indexPage = (indexPage % currentEndBlock) +1;
		if(indexPage < currentStartBlock) indexPage = currentStartBlock;
			$("#pageCycle").text(indexPage);

	if(parseInt(indexPage) == parseInt(currentPage)) {

		if(pages[indexPage]) {

			searching = false;

			// Okay, so we've hit the correct page…but to simulate the 'proper'
			// teletext experience, we need subpages. And of course, the chance
			// of entering in the middle of a stream of pages!

			currentSubPage = Math.floor(Math.random()*pages[currentPage.toString()].pages.length);

			render_page(currentPage.toString(), currentSubPage);
			}
		}
	}
}