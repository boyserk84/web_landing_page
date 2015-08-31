function validateEmail(input)
{
	// TODO: Implement validating email address
	return false;
}

function validate()
{
	// TODO: implement this
	return validateEmail("test");
}

$(document).ready(function() {
			console.log("ready");
			
			$("#subscribeForm").on("submit", function(e)
				{ 
					// validation here
					if ( !validate() )
					{
						console.log("Validation failed");
						e.preventDefault();
					} else {
						console.log("Pass validation");
					}
					console.log("submit is clicked!"); 
				} 
			);
			
});