
     $(function () {
         jsKeyboard.init("virtualKeyboard");

         //first input focus
         var $firstInput = $(':input').first().focus();
		 var $selectedComboBox;
         jsKeyboard.currentElement = $firstInput;
         jsKeyboard.currentElementCursorPosition = 0;
		 
		 $('#container').on("mousemove", function (e) {
			$('#cursor').offset({ 
			left: (e.pageX - cursorOffset.left)
			, top : (e.pageY - cursorOffset.top)
			})

		 });
		 
		 
		 /*
				 
		 $('.pixelText').on("mousedown touchend", function(){
			 $('.pixelText').attr('style', 'border:none');
			$(this).attr('style', 'border: 1px solid red');
			$selectedComboBox = $(this).parent();
		 });
		 
		 $('.pixelButton').on("mousedown touchend", function(){
			 $('.pixelText').attr('style', 'border:none');
			$(this).prev().attr('style', 'border: 1px solid red');
			$selectedComboBox = $(this).parent();
		 });
		 
		 $('body').on("mousedown touchend", '.ui-autocomplete li', function(){
			 var currentId = parseInt($selectedComboBox.attr('id').replace("combo-", ""));
			if(currentId != 5){
				$('.pixelText').attr('style', 'border:none');
				
				$('#combo-' + (currentId + 1)).find('.pixelText').attr('style', 'border: 1px solid red');
			} else
			{
				$('.pixelText').attr('style', 'border:none');
			}
			 
			
		 });
		 
		 */
		 
		 
		
     });