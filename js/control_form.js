	// Initialize dialog plugin
	$('.showresult').dialog({
			autoOpen: false ,
			width: '50%',
			dialogClass: 'noTitleStuff' 
	}); 
	
	function closeDialog(){
		$('.showresult').dialog("close");
	}
	
	function myFunction(event) {
			
			if(document.getElementById("combobox").value === "0")
			{
					//Don't allow user to select a position without a formfactor
					document.getElementById("button_retry").style.display='none';
					document.getElementById('button_retry').style.visibility = 'hidden';
					document.getElementById("button_close").style.display='inline';
					document.getElementById('button_close').style.visibility = 'visible';				
					document.getElementById('button_ok').style.display='none';
					document.getElementById('button_ok').style.visibility = 'hidden';
					document.getElementById('j_result').innerHTML = '<BR/>' + 'Please Select A Valid Sort Code';	
					$('.showresult').dialog("open"); // Open popup	
								
			} else 
			{
				if(document.getElementById("selectbox_position").value === "0")
				{
					//Don't allow user to select a position without a formfactor
					document.getElementById("button_retry").style.display='none';
					document.getElementById('button_retry').style.visibility = 'hidden';
					document.getElementById("button_close").style.display='inline';
					document.getElementById('button_close').style.visibility = 'visible';				
					document.getElementById('button_ok').style.display='none';
					document.getElementById('button_ok').style.visibility = 'hidden';
					document.getElementById('j_result').innerHTML = '<BR/>' + 'Please Select A Position';	
					$('.showresult').dialog("open"); // Open popup	
								
				} else 
				{
							
					//Collect values ect and sumit them to scala here
					document.getElementById("submit_button").disabled = true;	
					
					//DISABLE BUTTON			
					var result = Xpath("//player[@id = '"+ document.getElementById("selectbox_player").value +"']", xmlDoc);
					var iteration = result.iterateNext();		
										
					var posselection = document.getElementById("selectbox_position").value.split(", ");
					
					if (posselection.length < 2)
					{
						var posselection = ["",""];
					}
					
					//console.log(iteration.getAttribute("name"));
					//console.log(iteration.getAttribute("server"));
					//console.log(iteration.getAttribute("serverurl"));
					
					console.log(document.getElementById("selectbox_brand").value);
					console.log(document.getElementById("combobox").value);

					console.log(posselection[0]);
					console.log(posselection[1]);

					console.log("Requesting change on " + iteration.getAttribute("server") +" for player ID "+ iteration.getAttribute("sid") + " Changing " + document.getElementById("selectbox_brand").value + ", " + document.getElementById("combobox").value + ", " + posselection[0] + ", " + posselection[1] );									
					
					var data = {
									'command': 'update_tablet_config',
									'player_id': iteration.getAttribute("sid"),
									'player_position' : posselection[0],
									'player_formfactor' : posselection[1],
									'player_brand' : document.getElementById("selectbox_brand").value,
									'player_sortcode' : document.getElementById("combobox").value,
									'server_url' : iteration.getAttribute("server")
							   };
					
					document.getElementById("button_retry").style.display='none';
					document.getElementById('button_retry').style.visibility = 'hidden';
					//document.getElementById('button_ok').style.visibility = 'hidden';
					document.getElementById("button_close").style.display='none';
					document.getElementById('button_close').style.visibility = 'hidden';	
					document.getElementById('button_ok').style.display='inline';					
					document.getElementById('button_ok').style.visibility = 'visible';
					document.getElementById('j_result').innerHTML = '<BR/>' + 'Attempting To Connect..';	
					$('.showresult').dialog("open"); // Open popup
						
						
					//REAL RESULT UNCOMMENT THE BELOW TO EFFECT LIVE PREVIEW TABLETS/SCREENS
					//PostJson(data,event);
					//TESTING RESULT UNCOMMENT TO RETURN A FAKE 'OK' PROMPT
					FakeResult();
				}
			}
	}
	
	function FakeResult()
	{
		console.log("json posting disabled");	

		var reply = "SUCCESSFUL SERVER REPLY (FAKED)";
		//DISPLAY BUTTON TEXT AS RESULT
		console.log("FAKED RESULT");				
		document.getElementById("button_retry").style.display='none';
		document.getElementById('button_retry').style.visibility = 'hidden';
		document.getElementById('button_ok').style.display='inline';		
		document.getElementById('button_ok').style.visibility = 'visible';
		document.getElementById('button_close').style.display='inline';
		document.getElementById('button_close').style.visibility = 'visible';
		document.getElementById('j_result').innerHTML = '<BR/>' +reply;		
		$('.showresult').dialog("open"); // Open popup
		re_enable_button();
	}

	function PostJson(data,event)
	{		
		var strdata = JSON.stringify(data);
		try{				
				jQuery.ajax({
				type: "POST",
				url: 'http://54.194.57.104:9977',
				data: strdata,
				
				dataType: "text",
					complete: function(datareply) {
						//Trigger Success
						//console.log("ajax success" + strdata);
						check_connect("", datareply.responseText);

					},
					error : function(datareply) {
						//Trigger Fail
						//console.log("ajax fail" + strdata);
						check_connect("Unable to connect", datareply.responseText);

					}
				});
				
		}catch(e){
				check_connect("Unable to connect","");
		}
	}
	
	function check_connect(result, reply) {
		// code that depends on reply from scala
		if (result === "Unable to connect" && reply === "")
		{
			//DO SOMETHING ON FAIL
			connection_failure()
			
		} else 
		{
			if (reply != "" && result != "Unable to connect")
			{
			//DO SOMETHING SUCCESS WTIH THE RESULT
			connection_success(reply)					
			}
		}
		
		//Wait 5 seconds and re-enable the button
		setTimeout(re_enable_button(),5000);
	}
	
	function connection_failure()
	{
		//DISPLAY BUTTON TEXT AS RESULT
		console.log("We were unable to contact the server");
		
		document.getElementById("button_retry").style.display='inline';
		document.getElementById('button_retry').style.visibility = 'visible';
		document.getElementById('button_ok').style.display='inline';		
		document.getElementById('button_ok').style.visibility = 'visible';
		document.getElementById('button_close').style.display='inline';
		document.getElementById('button_close').style.visibility = 'visible';
		document.getElementById('j_result').innerHTML = '<BR/>' + 'Failed To Contact Server';		
		
	}
	
	function connection_success(reply)
	{
		//DISPLAY BUTTON TEXT AS RESULT
		console.log("Server Replied with: " + reply);				
		document.getElementById("button_retry").style.display='none';
		document.getElementById('button_retry').style.visibility = 'hidden';
		document.getElementById('button_ok').style.display='inline';		
		document.getElementById('button_ok').style.visibility = 'visible';
		document.getElementById('button_close').style.display='inline';
		document.getElementById('button_close').style.visibility = 'visible';
		document.getElementById('j_result').innerHTML = '<BR/>' +reply;		
		$('.showresult').dialog("open"); // Open popup
	}
	
	function re_enable_button()
	{
		//RE-ENABLE BUTTON
		document.getElementById("submit_button").disabled = false;	
	}
	
	function update_sorts() {
		data = data.sort(compareBranchColumn); 

		xml_post = Xpath("//brands/brand[@name='"+  $("#selectbox_brand").val() +"']", xmlDoc);
				
		var matchids = "";
		var iteration = xml_post.iterateNext();
		while (iteration) {
			
			matchids  = iteration.getAttribute("filterids");
			
			iteration = xml_post.iterateNext();
		}	
	
		if (matchids != null)
			
		{
			
			var matchid_ar = matchids.split(',');
			
			for (ma in matchid_ar)
			{
				 matchid_ar[ma] = matchid_ar[ma].trim();
			}
									
			if (matchid_ar != "")
			{
				for (var row in data)
				{										
					
					if(
						   $.inArray( data[row][headers.indexOf('Branch_Sort_Code')].substring(0, 2) , matchid_ar) > -1					  
					  )
					  {					  
							  if (row >0){
								
								var option = document.createElement("option");
								option.value = data[row][headers.indexOf('Branch_Sort_Code')];
								option.text  = data[row][headers.indexOf('Branch_Address')] + "(" + data[row][headers.indexOf('Branch_Sort_Code')] + ")";
								var select = document.getElementById("combobox");
								select.appendChild(option);
							  };
					  };
				
				};
			};
		
		};

	    function compareBranchColumn(a, b) {
    		if (a[headers.indexOf('Branch_Address')] === b[headers.indexOf('Branch_Address')]) {
    		    return 0;
    		}
    		else {
    		    return (a[headers.indexOf('Branch_Address')] < b[headers.indexOf('Branch_Address')]) ? -1 : 1;
    		}
	}
	}
	    
	var select = document.getElementById("selectbox_player");
	xml_post = Xpath("//players/player", xmlDoc);

	var iteration = xml_post.iterateNext();
	while (iteration) {

		    var option = document.createElement("option");
		    option.value = iteration.getAttribute("id");
		    option.text  = iteration.getAttribute("server") + ": " + iteration.getAttribute("name");		    
		    select.appendChild(option);
            iteration = xml_post.iterateNext();
    }
		
	function update_Position() {
	
		removeOptions(document.getElementById("selectbox_position"));
	
		xml_post = Xpath("//brand[@name = '"+ document.getElementById("selectbox_brand").value +"']/position", xmlDoc);

		pos_allowed = CheckAllowed("//player[@id = '"+ document.getElementById("selectbox_player").value +"']/allowed_positions/position")
		
		var iteration = xml_post.iterateNext();
		while (iteration) {

			//IF VALUE IS IN CURRENT PLAYER ALLOWED LIST
			if(pos_allowed.indexOf(iteration.getAttribute("name")) > -1)
			{	
				
				//APPEND FORMFACTOR TO POSITION    			
				var xml_post_formfactor = Xpath("//brand[@name = '"+ document.getElementById("selectbox_brand").value +"']/position[@name = '"+ iteration.getAttribute("name") +"']/form", xmlDoc);
				pos_allowed_formfactor = CheckAllowed("//player[@id = '"+ document.getElementById("selectbox_player").value +"']/allowed_forms/form")								
				
				var iteration_formfactor = xml_post_formfactor.iterateNext();
				while (iteration_formfactor) {

					//IF VALUE IS IN CURRENT PLAYER ALLOWED LIST ON THE XML FILE ADD IT TO THE DROP DOWN
					if(pos_allowed_formfactor.indexOf(iteration_formfactor.getAttribute("name")) > -1)
					{						
						var option = document.createElement("option");										
						option.value = iteration.getAttribute("name") +", "+ iteration_formfactor.getAttribute("name");
						option.text  = iteration.getAttribute("name") +", "+ iteration_formfactor.getAttribute("name");
						var select = document.getElementById("selectbox_position");
						select.appendChild(option);
						
					}

					iteration_formfactor = xml_post_formfactor.iterateNext();
				}			
				
			}

            iteration = xml_post.iterateNext();
        }

	}
	
	function CheckAllowed(xpath)
	{
		xml_allowed = Xpath(xpath, xmlDoc);		
		var pos_allowed = [];
		var al_iteration = xml_allowed.iterateNext();
		while (al_iteration) {
			pos_allowed.push(al_iteration.getAttribute("name"));
			al_iteration = xml_allowed.iterateNext();
		}	
		return pos_allowed;
	}

	function update_FormFactor() {

		removeOptions(document.getElementById("selectbox_formfactor"));    			
		xml_post = Xpath("//brand[@name = '"+ document.getElementById("selectbox_brand").value +"']/position[@name = '"+ document.getElementById("selectbox_position").value +"']/form", xmlDoc);
		pos_allowed = CheckAllowed("//player[@id = '"+ document.getElementById("selectbox_player").value +"']/allowed_forms/form")
		
		var iteration = xml_post.iterateNext();
		while (iteration) {

			//IF VALUE IS IN CURRENT PLAYER ALLOWED LIST
			if(pos_allowed.indexOf(iteration.getAttribute("name")) > -1)
			{
				var option = document.createElement("option");
				option.value = iteration.getAttribute("name");
				option.text  = iteration.getAttribute("name");
				var select = document.getElementById("selectbox_formfactor");
				select.appendChild(option);
			}

            iteration = xml_post.iterateNext();
        }

	}

	function update_player() {
				
		removeOptions(document.getElementById("selectbox_brand"));
		xml_brands = Xpath("//brands/brand", xmlDoc);
				
		pos_allowed = CheckAllowed("//player[@id = '"+ document.getElementById("selectbox_player").value +"']/allowed_brands/brand")
		
		var select = document.getElementById("selectbox_brand");
		var iteration = xml_brands.iterateNext();
		while (iteration) {

			if(pos_allowed.indexOf(iteration.getAttribute("name")) > -1)
			{
				
			//console.log(iteration.getAttribute("name"));
				
		    var option = document.createElement("option");
		    option.value = iteration.getAttribute("name");
		    option.text  = iteration.getAttribute("name");		    
		    select.appendChild(option);
            
			}
			iteration = xml_brands.iterateNext();
			
		}
		
		
		if (document.getElementById("selectbox_player").value > 0)
		{
			document.getElementById("submit_button").disabled = false;							
		} else 
		{
			document.getElementById("submit_button").disabled = true;						
		}		

	}	

	function removeOptions(selectbox)
	{
		var i;
		for(i=selectbox.options.length-1;i>=0;i--)
		{
	       	    selectbox.remove(i);
	        }

	        var option = document.createElement("option");
	        option.value = "0";
	        option.text  = "";
	        selectbox.appendChild(option);
	}
