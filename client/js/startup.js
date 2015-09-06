/**
 *  Validate the email format of the given input
 * @param input	String data
 * @return true if the given string has the valid email format. Otherwise, false is returned.
 */
function validateEmail(input)
{
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(input);
}

/**
 * Validate the given data 
 * @param	arr	Array of data from the form
 * 					i.e. { name => "name_of_the_field", value=> "value_from_the_field" }
 * @return true if all data pass the validation. Otherwise, false is returned.
 */
function validate(arr)
{
	result = true;
	for ( i = 0; i < arr.length; ++i)
	{
		key = arr[i].name;
		val = arr[i].value;
		if ( key == "inputEmail")
		{
			result = result && validateEmail( val );
		}
	}
	
	return result;
}

/**
 * Save data and transmit it back to the server
 */
function save(arr)
{
	
	return false;
}

// OnReady Event
$(document).ready(function() {
	// On Submit Event
	$("#subscribeForm").submit(function(e)
		{ 
			// Fetch input
			arr = $(this).serializeArray();
			if ( !validate(arr) )
			{
				// TODO: Data drive texts 
				$('.modal-header').text("Failed");
				$('.modal-body').text("Blah Blah");
				$('#popUp-btn').removeClass('btn btn-primary');
				$('#popUp-btn').addClass('btn btn-danger');
				$('#popUp-btn').find('#popUp-btn-text').html("Retry");
				$('#popUp-btn').find('#popUp-btn-icon').removeClass("glyphicon glyphicon-ok");
				$('#popUp-btn').find('#popUp-btn-icon').addClass("glyphicon glyphicon-exclamation-sign");
				console.log("Validation failed");
			} else {
				$('.modal-header').text("Congratulation");
				$('.modal-body').text("Lorem Lorem IpSem IpSem Pass");
				$('#popUp-btn').removeClass('btn btn-danger');
				$('#popUp-btn').addClass('btn btn-primary');
				$('#popUp-btn').find('#popUp-btn-text').html("OK");
				$('#popUp-btn').find('#popUp-btn-icon').removeClass("glyphicon glyphicon-exclamation-sign");
				$('#popUp-btn').find('#popUp-btn-icon').addClass("glyphicon glyphicon-ok");
				console.log("Pass validation");
				$('#inputEmail').val('');	// clear inputEmail field
			}
			
			// Check if save is done, otherwise, spit out error message
			
			$('#popUp-modal').modal('show');
			e.preventDefault();
		} 
	);
});