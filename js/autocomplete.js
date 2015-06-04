var comboCounter = 0;
$.widget( "custom.combobox", {
	
      _create: function() {
		  comboCounter ++;
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox"  )
		  .attr("id", "combo-" + comboCounter)
          .insertAfter( this.element );
 
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },
 
      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
 
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .attr( "type", "text" )
		  .attr("id", "olay_" + this.element.attr("id") )	
          .addClass( "ui-corner-left pixelinputbox"  )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            tooltipClass: ""
          });
 
        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },
 
          autocompletechange: "_removeIfInvalid"
        });
      },
	  
	  
 
      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
 
        $( "<a>" )
          .attr( "tabIndex", -1 )
		  .attr( "id", "btn_" + this.element.attr("id") )
          //.attr( "title", "Show All Items" )
          //.tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: ""
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "pixelinputbutton" )
          .mousedown(function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .click(function() {
            input.focus();
 
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
 
            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },
 
      _source: function( request, response ) {
    var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
    var select_el = this.element.get(0); // get dom element
    var rep = new Array(); // response array
    var maxRepSize = 20; // maximum response size
    // simple loop for the options
    for (var i = 0; i < select_el.length; i++) {
        var text = select_el.options[i].text;
        if ( select_el.options[i].value && ( !request.term || matcher.test(text) ) )
            // add element to result array
            rep.push({
                label: text.replace(
                        new RegExp(
                                "(?![^&;]+;)(?!<[^<>]*)(" +
                                $.ui.autocomplete.escapeRegex(request.term) +
                                ")(?![^<>]*>)(?![^&;]+;)", "gi"
                            ), "$1" ),
                value: text,
                option: select_el.options[i]
            });
								
			if ( rep.length > maxRepSize && select_el.id === "combobox" ) {

				//limit results to 20
				//console.log(select_el.id);
				//var lableitem = rep.push({
				//    label: "... Use Keyboard To Find More Results",
				//    value: "none",
				//    option: "0"
				//});
				//rep[51].attr("disabled",true);
				//console.log(rep[51]);
				//console.log(lableitem);
			
            break;
			}
		
     }
     // send response
     response( rep );
},

_select: function( event, ui ) {
    if ( ui.item.value == "none") {
		
        return false;		
    } else {
        ui.item.option.selected = true;
        self._trigger( "selected", event, {
            item: ui.item.option
        });
	
    }
},
_focus: function( event, ui ) {
    if ( ui.item.value == "none") {

        return false;
    }
},


 
      _removeIfInvalid: function( event, ui ) {
 
        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }
 
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
 
        // Found a match, nothing to do
        if ( valid ) {
          return;
        }
 
		
 
 
        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },
 
      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
    ( jQuery );
	 	 
 
	$(document).ready(function() {
		 

		 $("#toggle" ).click(function() {
             $( "#combobox" ).toggle();
         });
		 

		$("#selectbox_player" ).combobox({ 
		 
			 select: function (event, ui) { 
				
				//Reset Controls to default
				$("#olay_combobox").val("");
				$("#olay_selectbox_brand").val("");
				$("#olay_selectbox_position").val("");
				
				//Reset ID's to default
				$("#combobox option:selected").val(0)
				$("#selectbox_brand option:selected").val(0)
				$("#selectbox_position option:selected").val(0)					
						
				//Update form information based on selected player
				update_player();		
				//collect player information
				var val = document.getElementById("selectbox_player").value;
				document.getElementById("selectbox_player").value = val;
				
				//If there is only 1 option in the following fields, pre-populate them and don't enable them for user input
				if ($("#selectbox_brand").children('option').length < 3 )
				{							
					document.getElementById("selectbox_brand").value = $("#selectbox_brand").children('option')[1].text;
										
					//Auto Populate single field
					$("#olay_selectbox_brand").val( $("#selectbox_brand").children('option')[1].text );
					$("#selectbox_brand option:selected").val($("#selectbox_brand").children('option')[1].text);		
							
					removeOptions(document.getElementById("combobox"));
					update_sorts();
							
					//Reset Controls to default
					$("#olay_combobox").val("");
					$("#olay_selectbox_position").val("");
					
					//Reset ID's to default
					$("#selectbox_combobox option:selected").val(0)
					$("#selectbox_position option:selected").val(0)										
					update_Position();
															
					if ($("#selectbox_position").children('option').length < 3 )
					{		
										document.getElementById("selectbox_position").value = $("#selectbox_position").children('option')[1].text;
										
										$("#olay_selectbox_position").attr('disabled', true);
										$("#btn_selectbox_position").button("disable");
										
										//Auto Populate single field
										$("#olay_selectbox_position").val( $("#selectbox_position").children('option')[1].text );
										$("#selectbox_position option:selected").val($("#selectbox_position").children('option')[1].text);																																							
					} 
						
					//Disable the brand button if it was previously enabled
					$("#olay_selectbox_brand").attr('disabled', true);
					$("#btn_selectbox_brand").button("disable");
					
					//Switch Focus to combo box and enable it										
					$("#olay_combobox").attr('disabled', false);	
					$("#btn_combobox").button("enable");				
					var val = document.getElementById("selectbox_brand").value;				
					$("#olay_combobox").focus(); 				
					document.getElementById("selectbox_brand").value = val;
					//Target sort code combobox with keyboard					
					jsKeyboard.currentElement = $("#olay_combobox");
					jsKeyboard.currentElementCursorPosition = $("#olay_combobox").getCursorPosition();
								
				} else 
				{
					//Carry as normal and enable the next field for input
					$("#btn_selectbox_brand").button("enable");
					
					$("#olay_combobox").attr('disabled', true);
					$("#btn_combobox").button("disable");
				}					
		 
				//Ensure any other fields are disabled at this point
				$("#olay_selectbox_position").attr('disabled', true);
				$("#btn_selectbox_position").button("disable");		 
				
			 }	 
		 });
		 		 
		 
		 $("#selectbox_brand" ).combobox({	
			  
			 select: function (event, ui) { 
				
				//Clear the sort code box and apply the filter to the sort codes based on the brand
				removeOptions(document.getElementById("combobox"));
				update_sorts();
				
				//Reset Controls to default
				$("#olay_combobox").val("");
				$("#olay_selectbox_position").val("");
				
				//Reset ID's to default
				$("#selectbox_combobox option:selected").val(0)
				$("#selectbox_position option:selected").val(0)
					
				//Update the position options based on the brand and what positions it allows
				update_Position();

				$("#olay_combobox").attr('disabled', false);	
				$("#btn_combobox").button("enable");
				
				//Move focus to sort code combobox
				var val = document.getElementById("selectbox_brand").value;				
				$("#olay_combobox").focus(); 				
				document.getElementById("selectbox_brand").value = val;
					
				//Focus Keyboard on sort code combobox
				jsKeyboard.currentElement = $("#olay_combobox");
				jsKeyboard.currentElementCursorPosition = $("#olay_combobox").getCursorPosition();
					 
				//Disable Position Drop down if its already enabled				
				$("#btn_selectbox_position").button("disable"); 
			 }

		 });
		 	 		 
		
		 $("#combobox" ).combobox({ 
		 								
			select: function (event, ui) { 
				 //Collect Sort Code of selected item
				 var val = document.getElementById("combobox").value;				 		 
				 document.getElementById("combobox").value = val;				 
				 
				 //Focus Keyboard On Submit button to prevent unneeded character entry
				 jsKeyboard.currentElement = $("#submit_button");
				 jsKeyboard.currentElementCursorPosition = $("#submit_button").getCursorPosition();
				 $("#submit_button").focus(); 
	 			
				 //Auto populate position drop down if there is only one option valid
				 if ($("#selectbox_position").children('option').length < 3 )
				 {		
					document.getElementById("selectbox_position").value = $("#selectbox_position").children('option')[1].text;
										
					//Auto Populate single field
					$("#olay_selectbox_position").val( $("#selectbox_position").children('option')[1].text );
					$("#selectbox_position option:selected").val($("#selectbox_position").children('option')[1].text);		
										
				 } else 
				 {
					//Enable Position Button for multiple choice
				    $("#btn_selectbox_position").button("enable");
				 } 
			}
		 
		 });		 
		 
		 $("#selectbox_position" ).combobox({ 
		 					 
		 	select: function (event, ui) { 
			 		
				//Collect position value
				var val = document.getElementById("selectbox_position").value;
				$("#olay_selectbox_position").blur(); 				
				document.getElementById("selectbox_position").value = val;
				
				$('.pixelText').attr('style', 'border:none');
				
			}
		 
		 });	 
		 
		 //Default Disabled Buttons
		 $("#olay_selectbox_player").attr('disabled', true);
		 
		 $("#olay_selectbox_brand").attr('disabled', true);
		 $("#btn_selectbox_brand").button("disable");
	 
		 $("#olay_combobox").attr('disabled', true);
		 $("#btn_combobox").button("disable");
	 
		 $("#olay_selectbox_position").attr('disabled', true);
		 $("#btn_selectbox_position").button("disable");	 
		 				
     });
	 





    

  
  
  


  