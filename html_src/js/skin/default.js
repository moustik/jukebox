Jukebox.UI.skins["default"] =
{
	templates:
	{
		player:
'<div class="#{root}">\
<div class="#{root}-header">\
	#{canalLabel} <input type="text" class="#{root}-channel" /><input type="button" class="#{root}-channel-button" value="#{canalValue}" />\
	<span class="#{root}-expand-button">&gt;</span>\
	<span class="#{root}-collapse-button">&lt;</span>\
	<span class="#{root}-activity"></span>\
</div>\
<div class="#{root}-main">\
	<div class="#{root}-controls">\
		<span class="#{root}-previous-button"></span><span class="#{root}-next-button"></span>\
		#{currentSong}\
		<div class="#{root}-progressbar-wrapper">\
			<div class="#{root}-progressbar"></div>\
			<p class="#{root}-song-time"></p>\
		</div>\
	</div>\
	<div class="#{root}-playqueue">\
		<div class="#{root}-playqueue-content"></div>\
	</div>\
</div>\
\
<div class="#{root}-tabs">\
	<div class="#{root}-tabs-links">\
		<a class="#{root}-tab-upload">#{UploadTabName}</a>\
		<a class="#{root}-tab-query">#{QueryTabName}</a>\
		<a class="#{root}-tab-notifs">#{NotificationsTabName}</a>\
		<a class="#{root}-tab-debug">#{DebugTabName}</a>\
		<a class="#{root}-tab-playlist">#{PlaylistTabName}</a>\
	</div>\
	<div class="#{root}-tabs-head">\
		#{searchLabel} <input type="text" class="#{root}-search-input" />\
		<select class="#{root}-search-genres" style="display:none;"></select>\
		<select class="#{root}-search-field">\
			<option value="artist">#{artist}</option>\
			<option value="title">#{title}</option>\
			<option value="album">#{album}</option>\
			<option value="genre">#{genre}</option>\
		</select> \
		<select class="#{root}-results-per-page">\
			<option value="10">10</option>\
			<option value="20" selected="selected">20</option>\
			<option value="30">30</option>\
			<option value="40">40</option>\
			<option value="50">50</option>\
			<option value="60">60</option>\
			<option value="70">70</option>\
			<option value="80">80</option>\
			<option value="90">90</option>\
			<option value="100">100</option>\
		</select> \
		<input type="button" class="#{root}-search-button" value="#{searchButton}" />\
	</div>\
	<div class="#{root}-tabs-header"></div>\
	<div class="#{root}-tabs-content"></div>\
</div>\
\
<div class="#{root}-footer">\
	<input type="button" class="#{root}-refresh-button" value="#{refreshButton}" />\
	<input type="checkbox" name="#{root}-autorefresh" class="#{root}-autorefresh" checked="checked" value="autorefresh" /><label for="#{root}-autorefresh"> #{refreshLabel}</label>\
	<br />\
	#{pluginLabel} <input type="text" class="#{root}-plugin" value="#{pluginDefault}" style="width: 100px;" />\
	<input type="button" class="#{root}-plugin-button" value="#{pluginButton}" />\
</div>\
\
<div class="#{root}-stream">\
	<a class="#{root}-stream-play">#{play}</a>\
	<a class="#{root}-stream-stop">#{stop}</a>\
</div>\
<span class="#{root}-volume">\
	<span>#{volume}&nbsp;</span>\
	<div class="#{root}-volume-slider slider">\
		<div class="#{root}-volume-handle handle"></div>\
	</div>\
	<br clear="all" />\
</span>\
</div>',
		song:
'<p class="#{root}-song">\
<a class="#{root}-song-artist" href="#">#{artist}</a> - \
<a class="#{root}-song-album" href="#">#{album}</a> - \
<span class="#{root}-song-title">#{title}</span>\
</p>',
		playQueue:
'<li class="#{root}-playqueue-first #{root}-playqueue-droppable">#{playQueueLabel}\
<div>\
	<span class="#{root}-listening-ico"></span>\
	<span class="#{root}-listening-count">#{listenersCount}</span>\
</div>\
<a><span class="#{root}-playqueue-shuffle"></span></a>\
<a><span class="#{root}-playqueue-delete"></span></a>\
</li>',
		playQueueSong:
'<li class="#{root}-playqueue-#{index} #{root}-playqueue-droppable">\
<div class="#{root}-playqueue-song-#{index} #{root}-playqueue-draggable">\
	<div class="#{root}-playqueue-handle-#{index} #{root}-playqueue-handle">\
		<a href="javascript:;">#{artist}</a> - \
		<a href="javascript:;)">#{album}</a> - \
		#{title} (#{duration})\
	</div>\
	<a><span class="#{root}-playqueue-move-top"></span></a>\
	<a><span class="#{root}-playqueue-move-bottom"></span></a>\
	<a><span class="#{root}-playqueue-delete"></span></a>\
</div>\
</li>',
		tabs:
		{
			Uploader:
			{
				main:
'<div class="#{root}-file-uploader"></div>\
<h2>#{uploadedFilesLabel}</h2>\
<div class="#{root}-uploaded-files"></div>',
				tableHead:
'<tr>\
	<th>Filename</th>\
	<th class="artist">Artist</th>\
	<th class="album">Album</th>\
	<th class="title">Title</th>\
	<th class="year">Year</th>\
	<th class="track">Track</th>\
	<th class="trackNb">TrackNb</th>\
	<th class="genre">Genre</th>\
	<th>Actions</th>\
</tr>',
				tableBody:
'<tr id="#{rowId}">\
	<td class="static">#{filename}</td>\
	<td>#{artist}</td>\
	<td>#{album}</td>\
	<td>#{title}</td>\
	<td>#{year}</td>\
	<td>#{track}</td>\
	<td>#{trackNb}</td>\
	<td>#{genre}</td>\
	<td class="static actions">\
		<div>\
			<a href="javascript:;">X</a>\
		</div>\
		<div class="update" style="display:none;">\
			<a href="javascript:;">&nbsp;Update&nbsp;</a>\
		</div>\
		<div class="validate">\
			<a href="javascript:;">&nbsp;Validate&nbsp;</a>\
		</div>\
	</td>\
</tr>'
			}
		}
	}
};