
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
	       
	
        }
	});

	var data_brands = [];
	var data_positions = [];
	var xmlDoc = null;


	$.ajax({

	    url: "http://localhost:8000//LBG_tablet_config.xml",
	    async: false,
	    success: function (csvd) {

		if (window.DOMParser)
  		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(csvd,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(csvd); 
		}	
		//xml_brands = xmlDoc.getElementsByTagName("brand");	

		xml_brands  = Xpath("//brands/brand", xmlDoc);
		
		var iteration = xml_brands.iterateNext();
		while (iteration) {
                    data_brands.push(iteration.getAttribute("name"));
                    iteration = xml_brands.iterateNext();
        }	
		//for (var i = 0, n = xml_brands.length; i < n; i++)
		//{
		//	data_brands.push( xml_brands[i].getAttribute("name") );
		//}

		xml_pos = Xpath("//brand[@name = 'Halifax']/position", xmlDoc);

		var iteration = xml_pos.iterateNext();
		while (iteration) {
                    data_positions.push(iteration.getAttribute("name"));
                    iteration = xml_pos.iterateNext();
                }		

		data_brands	= data_brands.sort()
		data_positions	= data_positions.sort()

	    },
 	    dataType: "text",
	    complete: function () {
 	    // call a function on complete 
 	    }
	});

	function Xpath(path, xml)
	{
		return xml.evaluate(path, xml, null, 5, null);
	}