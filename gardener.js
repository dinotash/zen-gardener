//this is where we define the properties of each type of tile -- referenced by index number
zone_types = [
	{
		'name': 'walkway',
		'index': 0,
		'colour': '#784D03',
		'passable': true,
		'symbol': '≣'
	},
	{
		'name': 'building',
		'index': 1,
		'colour': 'black',
		'passable': false,
		'symbol': '^'
	},
	{
		'name': 'cliff',
		'index': 2,
		'colour': '#333333',
		'passable': false,
		'symbol': '▥'
	},
	{
		'name': 'wall',
		'index': 3,
		'colour': '#973D02',
		'passable': false,
		'symbol': '#'
	},
	{
		'name': 'water',
		'index': 4,
		'colour': '#3159FF',
		'passable': false,
		'symbol': '✼'
	},
	{
		'name': 'vegetation',
		'index': 5,
		'colour': '#136700',
		'passable': false,
		'symbol': '+'
	},
	{
		'name': 'brick road',
		'index': 6,
		'colour': '#D89700',
		'passable': false,
		'symbol': '≣'
	},
	{
		'name': 'rock',
		'index': 7,
		'colour': '#222222',
		'passable': false,
		'symbol': '█'
	},
	{
		'name': 'gravel - neutral',
		'index': 8,
		'colour': '#E5E5E5',
		'passable': true,
		'symbol': '░'
	},
	{
		'name': 'gravel - messed up',
		'index': 9,
		'colour': '#757575',
		'passable': true,
		'symbol': '▓'
	},
	{
		'name': 'gravel - raked',
		'index': 10,
		'colour': '#8796A5',
		'passable': true,
		'symbol': '∷'
	}
];

//define the map zones -- convenience class
function map_zone(zone_index, x1, x2, y1, y2, g) {
	this.zone = zone_index;
	this.start_x = Math.min(x1, x2);
	this.end_x = Math.max(x1, x2);
	this.start_y = Math.min(y1, y2);
	this.end_y = Math.max(y1, y2);
	this.garden = g;
}

function map_tile(r, c, z, g) {
	this.row = r;
	this.col = c;
	this.zone = z;
	this.garden = g;
	if (g != null) {
		this.expected = 8;
	}
	else {
		this.expected = this.zone;
	}

	this.id = function() {
		return "r" + this.row + "c" + this.col;
	};
}

var map_zones = [
	//edges of the map
	new map_zone(4, 0, 300, 0, 5, null), //water along entire top edge of map
	new map_zone(3, 6, 294, 6, 6, null), //wall along top edge of complex
	new map_zone(2, 0, 5, 6, 120, null), //cliff along left edge of map
	new map_zone(2, 6, 40, 100, 120, null), //protrusion of cliff in bottom-left corner
	new map_zone(2, 39, 70, 105, 120, null), //extra shelf of cliff
	new map_zone(2, 71, 300, 110, 120, null), //cliff along rest of bottom edge of map
	new map_zone(2, 240, 275, 105, 120, null), //sticky out bit of cliff in bottom-right
	new map_zone(3, 295, 295, 6, 57, null), // wall at top-right
	new map_zone(3, 295, 295, 63, 109, null), //wall at bottom-right
	new map_zone(5, 296, 300, 6, 109, null), //vegetation outside the gates
	new map_zone(6, 295, 300, 58, 62, null), // brick road outside the gates

	//central walkways and then buildings on top (works since we will work through this list in order)
	new map_zone(0, 6, 56, 38, 78, null), //deck at the left hand side of the monastery
	new map_zone(0, 57, 247, 38, 88, null), //central apse of the building
	new map_zone(0, 97, 157, 18, 38, null), //sticky out top bit
	new map_zone(0, 158, 247, 28, 37, null), //right section of monastery extends a bit further up
	new map_zone(0, 107, 149, 89, 99, null), //sticky out bit at bottom
	new map_zone(0, 248, 294, 58, 62, null), //path to the gate
	new map_zone(1, 62, 242, 43, 83, null), //central apse of building
	new map_zone(1, 102, 152, 23, 43, null), //sticky out bit at top
	new map_zone(1, 153, 242, 33, 43, null), //right section at top extension
	new map_zone(1, 112, 144, 84, 94, null), //sticky out bit at bottom

	//other walkways around the map and non-garden bits
	new map_zone(0, 57, 60, 89, 98, null), //path to shed
	new map_zone(1, 54, 60, 99, 104, null), //shed
	new map_zone(5, 97, 157, 7, 17, null), //veg patch at top
	new map_zone(0, 126, 129, 100, 110, null), //walkway at bottom between gardens
	new map_zone(5, 150, 155, 89, 110, null), //moss garden between gardens at bottom
	new map_zone(0, 243, 247, 89, 100, null), //walkway towards pond
	new map_zone(4, 243, 250, 101, 107, null), //pond - eats into cliff a little
	new map_zone(0, 248, 294, 96, 100, null), //walk way next to pond
	new map_zone(5, 260, 263, 7, 57, null), // moss patch between gardens in top-right
	new map_zone(5, 248, 259, 28, 30, null), // moss patch between gardens in top-right

	//gardens
	new map_zone(8, 6, 96, 7, 37, 0), //top-left
	new map_zone(8, 158, 259, 7, 27, 1), //top-rightish
	new map_zone(8, 264, 294, 7, 57, 2), //top-right corner
	new map_zone(8, 248, 294, 63, 95, 3), //right-centre
	new map_zone(8, 251, 294, 101, 104, 4), //bottom-right corner
	new map_zone(8, 276, 294, 105, 109, 4), //bottom-right, around the cliff
	new map_zone(8, 156, 242, 89, 110, 5), //bottom-right ish
	new map_zone(8, 130, 149, 100, 110, 6), //bottom-middle
	new map_zone(8, 61, 125, 100, 104, 7), //bottom-left ish
	new map_zone(8, 61, 106, 89, 99, 7), //bottom-left ish
	new map_zone(8, 71, 125, 105, 109, 7), //bottom-left ish
	new map_zone(8, 6, 53, 79, 99, 8), //bottom left
	new map_zone(8, 54, 56, 79, 98, 8), //bottom left next to path
	new map_zone(8, 41, 53, 100, 104, 8), //bottom left next to shed
	new map_zone(8, 248, 259, 31, 57, 9), //right hand side small one
]

//where will monks appear as you complete each garden?
//board at left has x = [6, 56] and y = [38, 78]
var monks = [
	{
		'row': 48,
		'col': 18
	},
	{
		'row': 57,
		'col': 13
	},
	{
		'row': 67,
		'col': 14
	},
	{
		'row': 74,
		'col': 21
	},
	{
		'row': 76,
		'col': 35
	},
	{
		'row': 70,
		'col': 48
	},
	{
		'row': 60,
		'col': 51
	},
	{
		'row': 51,
		'col': 50
	},
	{
		'row': 42,
		'col': 42
	},
	{
		'row': 44,
		'col': 29
	},
]

//----

//define the world and make an array to hold it
var map = $("#gardener_map");
var world_width = 300;
var world_height = 120;
var victory = false;
var game_over = false;
var fully_dead = false;

//will use to keep track of what's in each garden
var gardens = []; //list of list of coordinates making up each garden
var checked_gardens = [] //list of whether each garden meets expectations
for (var g = 0; g < 10; g++) {
	gardens.push([]);
	checked_gardens.push(false);
}

//create a representation of the whole world
world = {}
for (var i = 0; i < map_zones.length; i++) {
	var zone = map_zones[i];
	var z = zone.zone;
	var g = zone.garden;
	for (var r = zone.start_y; r <= zone.end_y; r++) {
		for (var c = zone.start_x; c <= zone.end_x; c++) {
			var id = "r" + r + "c" + c;
			var tile = new map_tile(r, c, z, g);
			if (g != null) {
				gardens[g].push(tile);
			}
			world[id] = tile;
		}
	}
}

//now mess up the gardens!
for (var i = 0; i < gardens.length; i++) {
	var garden = gardens[i];
	var garden_size = garden.length;

	//randomly scatter footprints
	for (var j = 0; j < garden.length; j++) {
		var r = Math.random();
		if (r < 0.05) { //up to 5% of gardens been trodden on
			garden[j].zone = 9;
		}
	}

	//add in some rocks -- find a total number, then choose a portion to be in each rock, and place them, until there are none left
	var rockSquareCount = Math.floor((Math.random() * 0.1 * garden_size) + 1); //up to 10% of garden could be rocks
	while (rockSquareCount > 0) {
		var thisRockCount = Math.floor((Math.random() * 8) + 1); //up to 8 squares in one rock -- i.e. around a central point
		thisRockCount = Math.min(rockSquareCount, thisRockCount); //can't use more than exist
		rockSquareCount -= thisRockCount;

		//keep looking until we have a suitable centre point for our rock
		var got_centre = false;
		var available_points = []
		while (!got_centre) {
			available_points = [] //reset our count
			var central_index = Math.floor((Math.random() * garden_size));
			var central_point = garden[central_index];
			var got_centre = true; //assume this point will work unless proven otherwise
			for (var x = -1; x <= 1; x++) {
				for (var y = -1; y <= 1; y++) {
					var new_r = central_point.row + y;
					var new_c = central_point.col + x;
					var new_id = "r" + new_r + "c" + new_c;
					if ((x != 0) || (y != 0)) {
						available_points.push(new_id)
					}
					if (world[new_id].zone < 7) {
						got_centre = false;
						break;
					}
				}
			}
		}

		//now layout our rock around the central point
		central_point.zone = 7;
		central_point.expected = 7;
		thisRockCount--;
		rockSquareCount--;
		while (thisRockCount > 0) {
			var chosen_index = Math.floor((Math.random() * available_points.length));
			world[available_points[chosen_index]].zone = 7; //make it a rock
			world[available_points[chosen_index]].expected = 7; //and it wants to be a rock
			available_points.splice(chosen_index, 1); //remove our element before making the next choice
			thisRockCount--;
			rockSquareCount--;
		}
	}

	//and while we're at it, let's generate what we think the garden should look like
	var line_limit = 5;
	var line_directions = [[-1, 0], [0, -1], [0, 1], [1, 0]] //the eight fold path
	var lineCount = Math.floor((Math.random() * line_limit) + 1) //limited number of lines per garden
	for (var l = 0; l < lineCount; l++) {
		//for each line we will need a direction, and a starting point
		var direction_index = Math.floor(Math.random() * line_directions.length);
		var direction = line_directions[direction_index];
		var start = garden[Math.floor(Math.random() * garden.length)];
		var step = 0;
		while (true) {
			var tile_id = 'r' + (start.row + (step * direction[0])) + 'c' + (start.col + (step * direction[1]));
			var tile = world[tile_id];
			if (tile.garden != i) {
				break; //stop if go outside the garden
			}
			//if it wants to be smooth gravel, make it raked
			if (tile.expected == 8) {
				tile.expected = 9;
			}
			step++;
		}
	}
}

//does every square in the garden meet its expectation?
function check_garden(index) {
	var garden = gardens[index]
	for (var g in garden) {
		var tile = garden[g];
		if (tile.zone != tile.expected) {
			//exception if it's where the gardener is
			if ((tile.row != gardener.row) || (tile.col != gardener.col) || (tile.zone != 9)) {
					return false;
			}
		}
	}
	return true;
}

//---- this is you! you start just outside the shed
var gardener = {
	'row': 10,
	'col': 10,
}

//---- draw the world
var tile_size = 10;
var tiles_wide = null;
var tiles_high = null;
var width_margin = 20;
var height_margin = 220; //how many pixels of the window do we want to keep free of the map?
var x_offset = 0;
var y_offset = 0;

//deal with time limit
var start_time = Date.now();

//on resizing, reset the sizes so that the board will be redrawn
$(window).resize(function() {
	tiles_wide = null;
	tiles_high = null;
	populate_table();
});

//how many tiles can we show at once?
function max_size() {
	//how big is the window?
	window_width = $(window).width();
	window_height = $(window).height();

	tiles_wide = Math.floor(window_width / tile_size) - Math.ceil(width_margin / tile_size);
	tiles_high = Math.floor(window_height / tile_size) - Math.ceil(height_margin / tile_size);

	$('#side_map').height((tiles_high * tile_size) - 20 - 20 - 20 - 280 - 3)

}

//create a placeholder to draw into
function create_table() {
	map.empty(); //remove any child nodes

	if ((tiles_wide == null) || (tiles_high == null)) {
		max_size();
	}

	for (var r = 0; r < tiles_high; r++) {
		//create a row
		var new_row = $("<tr></tr>", {'id': 'r' + r}); //create new row
		map.append(new_row);

		for (var c = 0; c < tiles_wide; c++) {
			var new_col = $("<td></td>", {'id': 'r' + r + 'c' + c});
			new_row.append(new_col);
		}
	}

	//make all the cells the right size
	$("td").css({
		'width': tile_size + "px",
		'height': tile_size + "px",
		// 'font-size': (tile_size - 3) + "px"
	});
}

function calculate_offsets() {
	var margin = 5

	//move left if get within margin tiles of the left edge
	if ((gardener.col - x_offset) < margin) {
		x_offset--;
	}
	//move right if get within margin tiles of the right edge
	if ((tiles_wide - gardener.col + x_offset) < margin) {
		x_offset++;
	}

	//move up if get within margin tiles of the top edge
	if ((gardener.row - y_offset) < margin) {
		y_offset--;
	}
	//move down if get within margin tiles of the bottom edge
	if ((tiles_high - gardener.row + y_offset) < margin) {
		y_offset++;
	}
}

//fill in the placeholder with the relevant part of the world
function populate_table() {
	if ((tiles_wide == null) || (tiles_high == null)) {
		max_size();
		create_table();
	}

	calculate_offsets();

	//fill in the tiles
	for (var r = 0; r < tiles_high; r++) {
		for (var c = 0; c < tiles_wide; c++) {
			var tile_id = "r" + (y_offset + r) + "c" + (x_offset + c);
			var cell = $("#r" + r + "c" + c);
			cell.data("row", r);
			cell.data("col", c);
			if (((y_offset + r) < world_height) && ((x_offset + c) < world_width)) {
				var tile = world[tile_id];
				// cell.text(zone_types[tile.zone].symbol);
				cell.attr("class", "zone_" + tile.zone);
				cell.text(""); //blank out any monks we added earlier
			}
			else {
				cell.attr("class", null)
			}
		}
	}

	//draw in the gardener
	var gardener_id = "r" + (gardener.row - y_offset) + "c" + (gardener.col - x_offset);
	var gardener_cell = $("#" + gardener_id);
	gardener_cell.attr("class", "gardener");

	//if game over, gardener is white
	if (fully_dead) {
		gardener_cell.css("background-color", zone_types[8].colour);
	}

	//draw the other monks as the gardens are completed
	for (var i = 0; i < checked_gardens.length; i++) {
		if (checked_gardens[i]) {
			//only bother if on screen
			if ((monks[i].row >= y_offset) && (monks[i].row < (y_offset + tiles_high))) {
				if ((monks[i].col >= x_offset) && (monks[i].col < (x_offset + tiles_wide))) {
					var monk_id = "r" + (monks[i].row - y_offset) + "c" + (monks[i].col - x_offset);
					var monk_cell = $("#" + monk_id);
					monk_cell.text("●"); //add an orange monk
					monk_cell.css("color", "orange");
				}
			}
		}
	}
}

//actually draw it!
create_table();
populate_table();

//---- deal with movement
var current_garden = 0; //based on where starting position is

//identify whether we are pressing down
var mouse_pressed = false
map.mousedown(function(e) {
	mouse_pressed = true;
});
map.mouseup(function(e) {
	mouse_pressed = false;
});

function move(e) {
	if (game_over) {
		return;
	}

	//know which cell of board, but what's the offset?
	var clicked_cell = $("#" + e.target.id);
	var new_row = clicked_cell.data('row') + y_offset;
	var new_col = clicked_cell.data('col') + x_offset;
	var new_id = "r" + new_row + "c" + new_col;

	if ((zone_types[world[new_id].zone].passable) && (clicked_cell.text() == "")) {
		//rake all around you -- if mouse not down
		if ((!mouse_pressed) && (!victory)) {
			for (x = -1; x <= 1; x++) {
				for (y = -1; y <= 1; y++) {
					var this_id = "r" + (gardener.row + y) + "c" + (gardener.col + x);
					if (world[this_id].zone >= 9) {
						world[this_id].zone = 8;
					}
				}
			}
		}

		//mess up where you just were
		if (!victory) {
			var old_id = "r" + gardener.row + "c" + gardener.col;
			if (world[old_id].zone == 8) {
				world[old_id].zone = 9;
			}
		}

		gardener.row = new_row;
		gardener.col = new_col;
		current_garden = world[new_id].garden;
		populate_table();

		//check if garden completed
		var old_garden_number = world[old_id].garden;
		checked_gardens[old_garden_number] = check_garden(old_garden_number);
		if (current_garden != old_garden_number) { //only repeat if necessary
			checked_gardens[current_garden] = check_garden(current_garden);
		}
	}

	//check for victory
	victory = checked_gardens.every(function(element, index, array) {
		return element;
	});
	if (victory) {
		clearInterval(countdown); //stop the timer
		$("#timer").text("You have succeeded. The samurai lets you live.")
		$("#timer").css("color", "green");
	}
}

//move mouse to move yourself -- behaviour changes with mouse press
map.mousemove(function(e) {
	move(e);
});

map.on("tap", function(e) {
	move(e);
});

map.on("swipe", function(e) {
	move(e);
});

//---- deal with time limit

var time_limit = 10 * 60 * 1000;
var end_time = start_time + time_limit;

var map_mode = false;
var last_checked_time = null;

function update_timer() {
	var now = Date.now();

	//if in mini map then pause time
	if (map_mode) {
		if (last_checked_time) {
			time_limit += (now - last_checked_time)
		}
		last_checked_time = now;
	}
	else {
		last_check_time = null;
	}


	var remaining = start_time + time_limit - now;

	if ((remaining <= 0) && (!victory)) {
		//end of the game
		clearInterval(countdown);
		$("#timer").text("You have failed. The samurai is displeased.")
		$("#timer").css("color", "orange");
		game_over = true;
		animate_death();
	}
	else {
		//update time limit
		var minutes = Math.floor(remaining / (60 * 1000));
		var seconds = (remaining / 1000) % 60;
		var seconds_string = ""

		if (seconds < 10) {
			seconds_string = "0" + String(seconds).substring(0, 1);
		}
		else {
			seconds_string = String(seconds).substring(0, 2);
		}
		var time_string = minutes + ":" + seconds_string;
		$("#timer").text(time_string + " remaining")
	}
}
var countdown = window.setInterval(update_timer, 100);

//-- deal with mini map
var cover = $("#cover_div")
var gardener_flash = null; //timer interval

function show_minimap() {
	if (game_over) {
		return;
	}

	//pause time
	map_mode = true;

	//display the cover
	var cover = $("#cover_div");
	cover.css("display", "block");

	//create the map
	cover.empty();
	mini_map_header = $("<h2>Make the monastery look like this</h2>");
	cover.append(mini_map_header);
	mini_map = $("<table></table>", {'id': "mini_map"});
	mini_map.css("z-index", 100);
	cover.append(mini_map);

	//one way to populate for current garden
	if (current_garden != null) {
		if (check_garden(current_garden)) {
			mini_map_header.text("You have made the monastery look like this")
			mini_map_header.css("color", "green");
		}

		//find the dimensions of our garden
		min_x = null;
		max_x = null;
		min_y = null;
		max_y = null;

		for (t in gardens[current_garden]) {
			var tile = gardens[current_garden][t]
			if ((min_x == null) || (tile.col < min_x)) {
				min_x = tile.col;
			}
			if ((max_x == null) || (tile.col > max_x)) {
				max_x = tile.col;
			}
			if ((min_y == null) || (tile.row < min_y)) {
				min_y = tile.row;
			}
			if ((max_y == null) || (tile.row > max_y)) {
				max_y = tile.row;
			}
		}

		//want to leave a border
		min_x -= 1;
		min_y -= 1;
		max_x += 2;
		max_y += 2;

		//work out optimal tile size if drawing just between those bits
		var mini_map_margin = 40;
		var mini_map_width = max_x - min_x;
		var mini_map_height = max_y - min_y;
		var mini_tile_width = Math.floor(($(window).width() - mini_map_margin) / mini_map_width);
		var mini_tile_height = Math.floor(($(window).height() - mini_map_margin) / mini_map_height);
		var mini_tile_size = Math.min(mini_tile_height, mini_tile_width);

		//populate the minimap table
		for (var r = 0; r < mini_map_height; r++) {
			var new_row = $("<tr></tr>", {'id': "m_r" + r});
			mini_map.append(new_row);
			for (var c = 0; c < mini_map_width; c++) {
				var world_col_id = 'r' + (r + min_y) + 'c' + (c + min_x);
				var map_col_id = 'm_r' + r + 'c' + c;
				var new_col = $("<td></td>", {
					'id': map_col_id,
					'class': "zone_" + world[world_col_id].expected
				});
				new_col.addClass("mini_map_cell");
				new_row.append(new_col);
			}
		}

		//set the scale
		$(".mini_map_cell").css({
			"width": mini_tile_size,
			"height": mini_tile_size
		});

		//mark on the gardener and make him flash
		var gardener_orange = false;
		gardener_flash = window.setInterval(function() {
			if (gardener_orange) {
				var new_colour = "";
			}
			else {
				var new_colour = "orange";
			}
			gardener_orange = !gardener_orange;

			var cell_id = "#m_r" + (gardener.row - min_y) + "c" + (gardener.col - min_x);
			$(cell_id).css("background-color", new_colour);
		}, 1000);
	}
	//another mode for whole world mini-map
	else {
		for (var r = 0; r < world_height; r++) {
			var new_row = $("<tr></tr>", {'id': "m_r" + r});
			mini_map.append(new_row);
			for (var c = 0; c < world_width; c++) {
				var col_id = 'r' + r + 'c' + c;
				var new_col = $("<td></td>", {
					'id': 'm_' + col_id,
					'class': "zone_" + world[col_id].expected
				});
				new_col.addClass("mini_map_cell");
				new_row.append(new_col);
			}
		}

		if (victory) {
			mini_map_header.text("You have made the monastery look like this")
			mini_map_header.css("color", "green");
		}

		//set the scale
		$(".mini_map_cell").css({
			"width": "2",
			"height": "2"
		});

		//mark on the gardener and make him flash
		var gardener_orange = false;
		gardener_flash = window.setInterval(function() {
			if (gardener_orange) {
				var new_colour = "";
			}
			else {
				var new_colour = "orange";
			}
			gardener_orange = !gardener_orange;

			for (var x = -2; x <= 2; x++) {
				for (var y = -2; y <= 2; y++) {
					var cell_id = "#m_r" + (gardener.row + y) + "c" + (gardener.col + x);
					$(cell_id).css("background-color", new_colour);
				}
			}
		}, 1000);
	}
}

function hide_minimap() {
	cover.css("display", "none");
	clearInterval(gardener_flash);
	gardener_flash = null;
	cover.empty();
	map_mode = false;
	last_checked_time = null;
}

cover.click(function() {
	hide_minimap();
});

$(".mini_map_link").click(function() {
	show_minimap();
});

//keyboard shortcut for bringing up the map / closing it
$(document).keypress(function(e) {
	if (e.which == 109) { //109 = "m"
		if (map_mode) {
			hide_minimap();
		}
		else {
			show_minimap();
		}
	}
});

//animation sequence for your death if you fail
function animate_death() {
	//start off this far to the right of the
	var steps_right = 5;
	var gradient = ["#FF0000", "#F83939", "#F27272", "#EBABAB", "#E5E5E5"];
	var animationInterval = setInterval(function() {
		//move the samurai to the left
		if (steps_right > 0) {
			//references we need
			var old_samurai_col = gardener.col + steps_right + 1;
			var old_samurai_cell = world['r' + gardener.row + 'c' + old_samurai_col];
			var old_samurai_tile = 'r' + (gardener.row - y_offset) + 'c' + (old_samurai_col - x_offset);
			var new_samurai_tile = 'r' + (gardener.row - y_offset) + 'c' + (old_samurai_col - x_offset - 1);

			//reset the old tile to its natural state
			var old_samurai_zone = zone_types[old_samurai_cell.zone].colour;
			$("#" + old_samurai_tile).css("background-color", old_samurai_zone);

			//make the new samurai tile purple
			$("#" + new_samurai_tile).css("background-color", "purple");

		}

		//have arrived - kill the gardener
		if ((steps_right <= 0) && (steps_right > -5)) {
			var s = -steps_right
			//get the tile we need
			var gardener_cell = world['r' + gardener.row + 'c' + gardener.col];
			var gardener_tile = 'r' + (gardener.row - y_offset) + 'c' + (gardener.col - x_offset);

			//gardener gets killed
			$("#" + gardener_tile).css("background-color", gradient[s]);
		}

		if (steps_right < -5) {
			fully_dead = true;
			clearInterval(animationInterval);
			return;
		}

		//increment frame
		steps_right--;
	}, 1000);
}
