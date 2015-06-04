	function myFunction() {
			//Collect values ect and sumit them to scala here
    			document.getElementById("submit_button").style.color = "red";
	}

	$.ajax({
	    url: "http://localhost:8000//DMP.csv",
	    async: false,
	    success: function (csvd) {
	        data = $.csv2Array(csvd);
	    },
 	    dataType: "text",
	    complete: function () {
 	    // call a function on complete 
	    
	    headers = data[0];

	    data = data.splice(1, data.length - 1);
	    data = data.sort(compareBranchColumn);

	    for (var row in data)
	    {
		if (row >0){
			var option = document.createElement("option");
			option.value = data[row][headers.indexOf('Branch_Sort_Code')];
			option.text  = data[row][headers.indexOf('Branch_Sort_Code')] + ", " + data[row][headers.indexOf('Branch_Address')];
			var select = document.getElementById("selectbox");
			select.appendChild(option);
		}
	    }

	    function compareBranchColumn(a, b) {
    		if (a[headers.indexOf('Branch_Address')] === b[headers.indexOf('Branch_Address')]) {
    		    return 0;
    		}
    		else {
    		    return (a[headers.indexOf('Branch_Address')] < b[headers.indexOf('Branch_Address')]) ? -1 : 1;
    		}
	    }
	
        }
	});

	$.ajax({
	    url: "http://localhost:8000//LBG_tablet_config.csv",
	    async: false,
	    success: function (csvd) {

	        data2 = $.csv2Array(csvd);

	    },
 	    dataType: "text",
	    complete: function () {
 	    // call a function on complete 
	    
	    headers = data2[0];

	    data2 = data2.splice(1, data.length - 1);

	    for (var row in data2)
	    {		
			if (data2[row][headers.indexOf('brand')] != '')
			{
				var option = document.createElement("option");
				option.value = data2[row][headers.indexOf('brand')];
				option.text  = data2[row][headers.indexOf('brand')];
				var select = document.getElementById("selectbox_brand");
				select.appendChild(option);
			}	
	    }

	    for (var pos in headers)
	    {
			if (pos >0)
			{
				var option = document.createElement("option");
				option.value = headers[pos];
				option.text  = headers[pos];
				var select = document.getElementById("selectbox_position");
				select.appendChild(option);
			}
	    }

        }
	});

	function update_FormFactor() {

		removeOptions(document.getElementById("selectbox_formfactor"));    			

	    	for (var row in data2)
	    	{		
			if (data2[row][headers.indexOf(document.getElementById("selectbox_position").value)] != '')
			{
				var option = document.createElement("option");
				option.value = data2[row][headers.indexOf(document.getElementById("selectbox_position").value)];
				option.text  = data2[row][headers.indexOf(document.getElementById("selectbox_position").value)];
				var select = document.getElementById("selectbox_formfactor");
				select.appendChild(option);
			}	
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
	    option.text  = "~Please Select~";
	    selectbox.appendChild(option);
	}
