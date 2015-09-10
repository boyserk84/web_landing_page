/**
 * WaitingUserData.class.js 
 * 
 * Data class, representing data we collecting from the user via a form.
 * Basically, user who's currently in the waiting list.  (i.e. early adopter/fans)
 * This class utilizes Parse Object for saving data.
 * 
 * @author Nate K
 */
var WaitingUserData = 
	/**
	 * Default constructor 
	 */
	function()
	{
		WaitingUser = Parse.Object.extend("WaitingUser");
		this.parseObj = new WaitingUser();
		this.date = "";
	};
	

/**
*  Initialize this object with the given data 
*  NOTE: Since js won't allow overload constructor, this function needs to be called after new Class().
*  @param input				User's data (i.e. array of JSON object or key-value pair)
*  @param callback			Callback when we receive a response from Parse
*/
WaitingUserData.prototype.Init = function(input, callback) 
	{
		this.date = Date.now() / 1000 ; 
		
		if ( typeof(callback) === "function") 
		{
			this.cb = callback;
		}
		
		if ( input != null && input.constructor == Array) 
		{
			for (i = 0; i < input.length; ++i)
			{
				var key = input[i].name;
				var val = input[i].value;
				
				this.parseObj.set( key, val );
				
			}
		}

		this.parseObj.set("subscribeDate", this.date);
	};

/**
*  Save data to Parse
*/
WaitingUserData.prototype.Save = function() 
	{
		// Transmitting data to Parse
		this.parseObj.save(null, 
			{
				// Success callback 
				// NOTE: Using 'arrow' function to be able to access 'this' properties
				success:  (response) =>
				{
					if ( this.cb != null )
					{
						this.cb(response, 0);
					}
				},
				// Error callback 
				error: (response, error) =>
				{
					// Issue on Parse's side
					if ( this.cb != null )
					{
						this.cb(response, error);
					}
				}
			}
		);
	};

