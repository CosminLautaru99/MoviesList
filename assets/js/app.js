const header = document.querySelector(".header")
const movies_card = document.querySelector("#movie-card")
const movies_name = document.querySelector("#name")
const movies_search_button = document.querySelector(".search-button")
const search_box_form = document.querySelector("#search-box-form")
let movies_rating
let movies_data = []
let movies_rating_form
let movies_rating_button
let movies_delete_button
let card_body
let selected_movies = []
let selected_movies_names = []
let movies_rating_p
let i
let j
/* http://www.omdbapi.com/?t=Never+Back+Down+2&plot=full&apikey=5dff865c%20*/

/* Apelare API */
function searchMovies() {
	const name = movies_name.value
	return fetch(
		`http://www.omdbapi.com/?t=${name}&plot=full&apikey=5dff865c%20`,
		{
			method: "GET"
		}
	)
		.then(response => response.json())
		.then(data => {
			movies_data = data
			console.log(movies_data)
		})
}

/* Render Movies */
function renderMovies(movies) {
	selected_movies.push(movies)

	movies_card.insertAdjacentHTML(
		"afterbegin",
		`
		
        <div class="card col-mb-4 movies-card" style="min-width: 16rem; display:flex; width:300px; display:block; background-color:#042a2b; color:white;margin-bottom: 5px;">
		<div class="card-body">
		<img class="card-img-top" style="width:200px; heigth=200px" src="${movies_data.Poster}" />
		  <h5>${movies_data.Title}</h5>
		  <form >
		 <input class="rate-box"type="text" id="rating"
		 from="form-control form-control-lg"
		 placeholder="Rate the movie... (1-5)"> 
		  </form>
		  <p class="rate"></p>
		  <button class="btn btn-success rating-button" value="submit" 
		   disabled>Rate</button>
		  <button class="btn btn-danger delete-button" value="submit" onclick="deleteMovies()">Delete</button>
        </div>
	  </div>
	  
	`
	)
	movies_rating = document.querySelector("#rating")

	movies_rating_p = document.querySelector(".rate")
	movies_rating_form = document.querySelector(".rate-box")
	movies_rating_button = document.querySelector(".rating-button")
	movies_delete_button = document.querySelector(".delete-button")
	card_body = document.querySelector(".card-body")
	remove_movies_card = document.querySelector(".movies-card")
	movies_rating_button.addEventListener("click", () => submitRating())
}

/* Disable Enable/button de search */
function onChange_Search() {
	console.log(movies_name)
	const movies_search_name = movies_name.value
	if (movies_search_name) {
		movies_search_button.removeAttribute("disabled")
	} else {
		movies_search_button.setAttribute("disabled", true)
	}
}

/* Disable/Enable button de rate */
function onChange() {
	const movies_rating_form_value = movies_rating_form.value

	if (movies_rating_form_value) {
		movies_rating_button.removeAttribute("disabled")
	} else {
		movies_rating_button.setAttribute("disabled", true)
	}
}

/* Submit Rating */
function submitRating() {
	const rating = movies_rating.value
	console.log(rating)
	movies_rating_p.insertAdjacentHTML(
		"afterbegin",
		`
		<p class="rate" style="color:white; margin: 0 auto;">Rating: ${rating}</p>
	`
	)
	movies_rating_form.classList.add("is-hidden")
	movies_rating_button.card - card_body.removeChild(movies_rating_button)
	movies_delete_button.card - card_body.removeChild(movies_delete_button)
	movies_search_button.removeAttribute("disabled")
	search_box_form.classList.remove("is-hidden")
}

/* Functia de cautare filme */
function onSearch() {
	event.preventDefault()

	searchMovies().then(response => {
		renderMovies(movies_data[0])
		movies_rating.addEventListener("input", () => onChange())
		movies_search_button.setAttribute("disabled", true)
		movies_name.value = ""
		search_box_form.classList.add("is-hidden")
		/* selected_movies_names.push(movies_name.value)
		for (i = 0; i > selected_movies_names.length; i++) {
			if (movies_name.value == selected_movies_names[i]) {
				console.log("123")
			} 
		} */
	})
}

/* Functie de delete */
function deleteMovies() {
	movies_card.removeChild(remove_movies_card)
}

movies_name.addEventListener("input", () => onChange_Search())
