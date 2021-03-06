/* jshint multistr:true */
/* global Action, Query, Notifications, sendQueryProxy */

this.CustomQueriesTab = Class.create(Tab,
{
	initialize: function(rootCSS)
	{
		this.name = "Custom queries";
		this.rootCSS = rootCSS;
	},

	updateContent: function(DOM)
	{
		var custom_queries_display = '\
		<h1>Custom Json Query</h1>\
		<table width="100%">\
		<tr>\
			<td colspan="2">\
			<center>\
				<textarea style="width:100%;height:160px;"></textarea>\
			</center>\
			</td>\
		</tr>\
		<tr>\
			<td>\
				Query filler : \
				<select>\
					<option value="clear_form">clear_form</option>\
					<option value="dummy" selected="selected">--------</option>\
					<option value="empty">empty</option>\
					<option value="next">next</option>\
					<option value="previous">previous</option>\
					<option value="add_to_play_queue">add_to_play_queue</option>\
					<option value="remove_from_play_queue">remove_from_play_queue</option>\
					<option value="move_in_play_queue">move_in_play_queue</option>\
					<option value="join_channel">join_channel</option>\
					<option value="get_news">get_news</option>\
					<option value="search">search</option>\
					<option value="create_user">create user</option>\
					<option value="validate_user">validate user</option>\
					<option value="change_user_password">change user password</option>\
					<option value="get_user_informations">User informations</option>\
				</select>\
			</td>\
			<td><input type="button" value="send custom query"/></td>\
		</tr>\
		</table>';
		DOM.update(custom_queries_display);

		var $textarea = DOM.down('textarea'),
			query,
			actions;

		//----------
		// Combobox

		var $select = DOM.down('select');
		$select.on("change", function fillCustomJsonQuery()
		{
			var opts = {},
				value = this.value; // this.options[this.selectedIndex].value;

			switch(value)
			{
				case "dummy":
					return false;
				case "clear_form":
					$textarea.value = '';
					this.selectedIndex = 1;
					return false;
				case "add_to_play_queue":
				case "remove_from_play_queue":
				case "move_in_play_queue":
					opts =
					{
						mid: 123,
						play_queue_index: 1
					};
					break;
				case "create_user":
					opts =
					{
						nickname: "pseudo",
						password: "xxxxxx"
					};
					break;
				case "validate_user":
					opts =
					{
						nickname: "pseudo"
					};
					break;
				case "change_user_password":
					opts =
					{
						nickname: "pseudo",
						old_password: "xxxxxx",
						new_password: "xxxxxx",
						new_password2: "xxxxxx"
					};
					break;
				case "get_user_informations":
					opts =
					{
					};
					break;
				case "join_channel":
					opts =
					{
						channel: "trashman"
					};
					break;
				case "get_news":
					opts =
					{
						first_result: 0,
						result_count: 5
					};
					break;
				case "search":
					opts =
					{
						name:"search",
						search_value:"muse",
						search_comparison:"like",
						search_field:"artist",
						order_by:"mid,artist,album,track,title",
						select_fields:"mid,title,album,artist,track,genre,duration",
						first_result:0,
						result_count:20,
						identifier:null,
						select:false
					};
					break;
			}
			if(value == "move_in_play_queue")
			{
				opts.new_play_queue_index = 0;
			}

			actions = value == "empty" ? [] : [new Action(value, opts)];
			query = new Query(1317675258, actions);
			$textarea.value = JSON.stringify(query.valueOf(), null, "\t"); // query.toJSON(); doesn't support custom indentation
			this.selectedIndex = 1;

			return false; // Stop event
		});

		//----------
		// Button

		var $input = DOM.down('input');
		$input.on("click", function checkAndSendJson()
		{
			// Check if the textarea is filled
			if($textarea.value === '')
			{
				Notifications.Display(Notifications.LEVELS.warning, 'Please fill the textarea');
				return;
			}

			// Check if the textarea contains a valid json query
			if($textarea.value.isJSON())
			{
				var json = $textarea.value.evalJSON();
				if(json && json.action)
				{
					query = new Query(json.timestamp ? json.timestamp : 0);
					if(Object.isArray(json.action))
					{
						actions = json.action;
					}
					else
					{
						actions = [json.action];
					}

					for(var i = 0; i < actions.length; ++i)
					{
						var action = new Action(actions[i].name, actions[i]);
						query.addAction(action);
					}

					sendQueryProxy(query);
				}  else if (json && json.search){
					query = new Query(json.timestamp ? json.timestamp : 0);
					var search = new Action(json.search.name, json.search);
					query.addAction(search);
					sendQueryProxy(query);
				}
			}
		});
	}
});
