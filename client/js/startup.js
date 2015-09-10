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
		// TODO: Add more validation based on the type of the input
		
	}
	
	return result;
}

/**
 * Save data and transmit it back to the server.
 * NOTE: After receiving the response back, pop the dialog. 
 * @param arr	Data in  form of array of JSON object
 * 			i.e. { name => "name_of_the_field", value=> "value_from_the_field" }
 */
function save(arr)
{
	if ( arr != null && arr.length > 0 ) 
	{
		var data = new WaitingUserData();
		data.Init( arr , 
			function(response, code) 
			{
				if ( code != 0 ) 
				{
					// Error response is received from the server side.
					initializePopUpDialog( "error", DATA.popUp.error, false);
				}
				$('#popUp-modal').modal('show');	// Manually, show the popUp dialog
			} 
		);
		data.Save();
	} else {
		initializePopUpDialog("error", DATA.popUp.error, true );
	}
}

/**
 * Initialize the pop dialog with the given data
 * @param dialogType				Dialog type to pop up
 * @param data							Data to show on the dialog
 * @param showNow					Whether to show the pop up dialog immediately
 */
function initializePopUpDialog( dialogType, data, showNow )
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
	} else {
		$('#popUp-btn').removeClass('btn btn-primary');
		$('#popUp-btn').addClass('btn btn-danger');
		
		$('#popUp-btn').find('#popUp-btn-icon').removeClass("glyphicon glyphicon-ok");
		$('#popUp-btn').find('#popUp-btn-icon').addClass("glyphicon glyphicon-exclamation-sign");
	}
	
	if ( showNow == true )
	{
		$('#popUp-modal').modal('show');	// show the popUp dialog
	}
}

/**
 * Initialize 3rd party dependency 
 */
function InitDependencies()
{
	// Add any dependency here
	Parse.initialize(CONFIG.appId , CONFIG.appKey);
	
}

/**
 * Bind data to the micro template and render to view.
 */
function BindDataToView()
{
	var mainTemplate = $('#landingPage_Template').html();
	var to =  _.template( mainTemplate ) ( DATA ) ;
	$('#main').html(to);
}

//////////////////////////////////////////
// This is where everything begins.
/////////////////////////////////////////
// OnReady Event
$(document).ready(function() {
	
	InitDependencies();
	
	BindDataToView();
	
	// On Submit Event
	$("#subscribeForm").submit(function(e)
		{ 
			// Fetch input
			arr = $(this).serializeArray();
			if ( !validate(arr) )
			{
				initializePopUpDialog( "fail", DATA.popUp.fail , true );
			} else {
				initializePopUpDialog("success", DATA.popUp.success , false);
				save(arr);	// save data
			}
			// Prevent refresh
			e.preventDefault();
		} 
	);
});