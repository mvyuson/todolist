'use strict'

var counter = 1;

$(document).ready(function(event) {

	var addBtn = $("#add-btn");

	var modal = $("#alert-modal");
	var closeModal = $("#close-modal");

	$("#todo").keypress(function(event) {
		// if enter is press

		var todo = $("#todo").val();


		if(event.keyCode == "13") {
			if(!todo) {
				$(modal).css({"display": "block"});
			} else {
				addList(todo);
				todo = $('#todo').val("");
			}
		}

	});

	$(addBtn).click(function() {
		// if add button is click

		var todo = $("#todo").val();

		if(!todo) {
			$(modal).css({"display": "block"});
		} else {
			addList(todo);
			todo = $("#todo").val("");
		}
	});

	$(closeModal).click(function() {
		// closes modal if 'OK' button is click
		$(modal).css({"display": "none"});
	});

	$(document).click(function(event) {
		// closes modal if click anywhere outside the modal

		if(event.target.className === "modal") {
			$(modal).css({"display": "none"});
		}
	});

});

function addList(todo) {
	
	$("#todo-list").append(
		`<li id="list${counter}" class="list-unstyled border-bottom"> <input type="radio" id="radio${counter}">&nbsp<span>${todo}&nbsp</span>
		<button type="button" class="delete btn btn-danger float-right" id="delete${counter}" value="Delete">Delete</button>&nbsp
		<button type="button" class="btn btn-info float-right mr-2" id="edit${counter}" value="Edit">Edit</button>
		</li>`)

	$(`#list${counter}`).mouseover(function() {
		$(this).find("button").css("visibility", "visible");
	});

	$(`#list${counter}`).mouseout(function() {
		$(this).find("button").css("visibility", "hidden");
	});

	$(`#edit${counter}`).click(function() {
		var edited = $(this).prev().prev().attr("contenteditable", "true");
		
		$(this).prev().prev().focus();

		$(edited).keydown(function(event) {
			if(event.which == "13") {
				event.preventDefault();
				$(edited).blur();
				return false;
			}
		});
	});

	$(`#delete${counter}`).click(function() {
		$(this).parent().remove();
	});

	$(`#radio${counter}`).change(function() {
		$(this).next().css({"text-decoration": "line-through", "color": "#696969"});
	});

	counter++;
};

