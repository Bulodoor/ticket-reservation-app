const seatContainer = document.querySelector(".seat-container");
const seatCount = document.querySelector(".seat-count");
const seatPrice = document.querySelector("#seat-price");
const select = document.querySelector("select");
const seatCountAll = seatContainer.querySelectorAll(".seat");

seatContainer.addEventListener("click", (e) => {
	if (
		e.target.classList.contains("seat") &&
		!e.target.classList.contains("reserved")
	) {
		//!Boş koltuk seçildiğinde
		e.target.classList.toggle("selected");

		let seatSelectedCount = seatContainer.querySelectorAll(".seat.selected");

		const selectedSeatsArr = Array.from(seatSelectedCount);
		const seatsArr = Array.from(seatCountAll);

		//! Burada böyle Arry e çevirmek yerine direk !! Array.from() kullan !!
		// seatSelectedCount.forEach(function (seat) {
		// 	selectedSeatsArr.push(seat);
		// });
		// seatCountAll.forEach(function (seat) {
		// 	seatsArr.push(seat);
		// });

		//!1. Yöntem
		// [0,3,5]
		// let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
		// 	return seatsArr.indexOf(seat);
		// });

		//!2.Yöntem [0,3,5] ama burada belli bir tek dizi yok
		selectedSeatIndexs = Array.from(selectedSeatsArr).map((seat) => {
			return seatsArr.indexOf(seat);
		});

		//!Local Storage e kayıt etmesi
		saveCountsToLocalStorage(selectedSeatIndexs, select.value);

		//*Her koltuk seçtiğinde ücreti yeniden hesaplar
		seatPriceCalculate();

		//*Koltuk sayısını değiştirir
		seatCount.innerText = seatSelectedCount.length;
	} else if (e.target.classList.contains("reserved")) {
		//!Dolu koltuk seçildiğinde
		alert("Lütfen boş koltuk seçiniz.");
	}
});

const seatPriceCalculate = () => {
	//*Toplam ücreti hesaplar
	let seatSelectedCount =
		seatContainer.querySelectorAll(".seat.selected").length;
	if (!isNaN(Number(select.value))) {
		//!Film Seçilmişse
		seatPrice.innerText = seatSelectedCount * Number(select.value);
	} else {
		//!Film seçilmemişse
		seatPrice.innerText = "!Lütfen bir Film seçiniz ";
	}

	saveSelectedMovieToLocalStorage(select.value);
};

//* Film değiştirildiğinde ücreti yeniden hesağlar
select.addEventListener("change", seatPriceCalculate);

const saveCountsToLocalStorage = (selectedSeatIndexs, selectedMovie) => {
	//!Seçilen Koltukları kayıt eder
	localStorage.setItem(
		"seatsSelectedsIndexs",
		JSON.stringify(selectedSeatIndexs)
	);

	//!Seçilen filmi kayıt eder
	saveSelectedMovieToLocalStorage(selectedMovie);
};

const saveSelectedMovieToLocalStorage = (selectedMovie) => {
	if (!isNaN(Number(select.value))) {
		localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
	}
};

const loadTheCounts = () => {
	const selectedSeatIndexs = JSON.parse(
		localStorage.getItem("seatsSelectedsIndexs")
	);

	//!Seçili koltukları yükler
	if (selectedSeatIndexs != null && selectedSeatIndexs.length > 0) {
		Array.from(seatCountAll).forEach((seat, index) => {
			if (selectedSeatIndexs.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});

		//!Koltuk sayısını yazar
		seatCount.innerText = selectedSeatIndexs.length;
	}

	//!Seçilen filmi yükler
	const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
	if (selectedMovie != null) {
		select.value = selectedMovie;
	}

	//!Toplam fiyatı hesaplar
	seatPriceCalculate();
};

//!Sayfa yüklenince seçilen değerleri yükler
document.addEventListener("DOMContentLoaded", loadTheCounts);
