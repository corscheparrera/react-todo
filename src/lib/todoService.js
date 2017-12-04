import Firebase from "firebase";

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBQ3e4jr5RH4VRALVglndENucMN-ycXvlY",
	authDomain: "todo-227b0.firebaseapp.com",
	databaseURL: "https://todo-227b0.firebaseio.com",
	projectId: "todo-227b0",
	storageBucket: "todo-227b0.appspot.com",
	messagingSenderId: "488235343718"
};

const firebase = Firebase.initializeApp(config);
const database = firebase.database();

export const loadTodos = () => {
	return (
		database
			.ref("todos")
			.once("value")
			//Converting a JS object to an array with ES7
			.then(data => Object.values(data.val()))
	);
};
export const createTodo = todo => {
	return database.ref(`todos/${todo.id}`).set(todo);
};
export const saveTodo = todo => {
	return database.ref(`todos/${todo.id}`).set(todo);
};
export const destroyTodo = id => {
	return database.ref(`todos/${id}`).remove();
};

// Persistence w/ json-server
// command : json-server -p 8080 --watch db.json

// const baseUrl = "http://localhost:8080/todos";
// export const loadTodos = () => {
// 	return fetch(baseUrl).then(res => res.json());
// };
// export const createTodo = todo => {
// 	return fetch(baseUrl, {
// 		method: "POST",
// 		headers: {
// 			Accept: "application/json",
// 			"Content-Type": "application/json"
// 		},
// 		body: JSON.stringify(todo)
// 	}).then(res => res.json());
// };
// export const saveTodo = todo => {
// 	return fetch(`${baseUrl}/${todo.id}`, {
// 		method: "PUT",
// 		headers: {
// 			Accept: "application/json",
// 			"Content-Type": "application/json"
// 		},
// 		body: JSON.stringify(todo)
// 	}).then(res => res.json());
// };

// export const destroyTodo = id => {
// 	return fetch(`${baseUrl}/${id}`, {
// 		method: "DELETE",
// 		headers: {
// 			Accept: "application/json",
// 			"Content-Type": "application/json"
// 		}
// 	});
// };
