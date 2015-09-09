/**
 * WaitingUserData.class.js 
 * 
 * Data class, representing data we collecting from the user via a form.
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
		this.email = "";
		this.date = "";
	};
	

/**
*  Initialize this object with the given data 
*  NOTE: Since js won't allow overload constructor, this function needs to be called after new Class().
*  @param input				User's data (i.e. email-address)
*  @param callback			Callback when we receive a response from Parse
*/
WaitingUserData.prototype.Init = function(input, callback) 
	{
		this.email = input;
		this.date = Date.now() / 1000 ; 
		
		if ( typeof(callback) === "function") 
		{
			this.cb = callback;
		}
		
		this.parseObj.set("email", this.email);
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
					console.log("Success response=" + response + " check=" + this.email);
					if ( this.cb != null )
					{
						this.cb(response, 0);
					}
				},
				// Error callback 
				error: (response, error) =>
				{
					console.log("Error response=" + error);
					// Issue on Parse's side
					if ( this.cb != null )
					{
						this.cb(response, error);
					}
				}
			}
		);
	};

