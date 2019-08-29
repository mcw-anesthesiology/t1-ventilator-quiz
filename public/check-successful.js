/** @format */
/* eslint-env browser */

var USER_ENDPOINT = '/wp-json/mcw-anesth-clinical-resources/v1/user';
var ENDPOINT = 'https://t1-ventilator-quiz.mcw-anesth.tech/api/check-success';

var quizTargetContainer = document.querySelector('#t1-ventilator-quiz-target');
var textTarget = null;
var recheckButton = null;
var nonceTag = document.querySelector('meta[name="wp_rest"]');
var nonce = null;
var email = null;

if (nonceTag) {
	nonce = nonceTag.content;
}

if (nonce) {
	fetch(USER_ENDPOINT, {
		method: 'GET',
		headers: {
			'X-WP-NONCE': nonce
		},
		credentials: 'same-origin'
	})
		.then(function(r) {
			if (r.ok) return r.json();

			throw new Error(r.status);
		})
		.then(function(user) {
			if (user && user.data) {
				email = user.data.user_email;
				checkSuccess();
			}
		})
		.catch(function(err) {
			console.error(err);
		});
}

if (quizTargetContainer) {
	textTarget = document.createElement('p');
	quizTargetContainer.appendChild(textTarget);
}

function addRecheckButton() {
	if (recheckButton || !quizTargetContainer)
		return;

	recheckButton = document.createElement('button');
	recheckButton.type = 'button';
	recheckButton.textContent = 'Check again';
	recheckButton.onclick = checkSuccess;
	quizTargetContainer.appendChild(recheckButton);
}

function cleanupTargetContainer() {
	if (textTarget)
		textTarget.textContent = '';

	if (recheckButton) {
		quizTargetContainer.removeChild(recheckButton);
		recheckButton = null;
	}
}

function checkSuccess() {
	if (!email || !textTarget) return;

	cleanupTargetContainer();

	fetch(ENDPOINT + '?email=' + encodeURIComponent(email), {
		method: 'GET'
	}).then(function(r) {
		if (r.ok) {
			if (r.status == 200) {
				textTarget.textContent =
					'You have successfully completed the quiz. Thank you.';
			} else {
				textTarget.textContent = 'Sorry, it does not look like you have successfully completed the quiz yet. Please try or check again.';
				addRecheckButton();
			}
		}
	}).catch(function (err) {
		console.error(err);
	});
}
