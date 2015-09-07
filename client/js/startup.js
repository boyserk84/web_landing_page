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

function initializePopUpDialog( dialogType, data )
{
	$('.modal-header').text( data.header );
	$('.modal-body').text( data.body );
	$('#popUp-btn').find('#popUp-btn-text').html( data.button );
	
	if ( dialogType == "fail" )
	{
		$('#popUp-btn').removeClass('btn btn-primary');
		$('#popUp-btn').addClass('btn btn-danger');
		
		$('#popUp-btn').find('#popUp-btn-icon').removeClass("glyphicon glyphicon-ok");
		$('#popUp-btn').find('#popUp-btn-icon').addClass("glyphicon glyphicon-exclamation-sign");
	} else if ( dialogType == "success") 
	{
		$('#popUp-btn').removeClass('btn btn-danger');
		$('#popUp-btn').addClass('btn btn-primary');
		$('#popUp-btn').find('#popUp-btn-icon').removeClass("glyphicon glyphicon-exclamation-sign");
		$('#popUp-btn').find('#popUp-btn-icon').addClass("glyphicon glyphicon-ok");

		$('#inputEmail').val('');	// clear inputEmail field		
	}
}

// OnReady Event
$(document).ready(function() {
	var mainTemplate = $('#landingPage_Template').html();
	var to =  _.template( mainTemplate ) ( DATA ) ;
	$('#main').html(to);
	
	// On Submit Event
	$("#subscribeForm").submit(function(e)
		{ 
			// Fetch input
			arr = $(this).serializeArray();
			if ( !validate(arr) )
			{
				initializePopUpDialog( "fail", DATA.popUp.fail );
			} else {
				initializePopUpDialog("success", DATA.popUp.success);
			}
			
			// Check if save is done, otherwise, spit out error message
			
			$('#popUp-modal').modal('show');	// show the popUp dialog
			e.preventDefault();
		} 
	);
});