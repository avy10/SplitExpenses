import { useState } from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export default function App() {
	const [friendsARR, SetFriendsARR] = useState(initialFriends);
	const [showMainLogic, setShowMainLogic] = useState(false);
	const [userId, SetUserId] = useState();

	function handleAddNewFren(obj) {
		SetFriendsARR((prev) => [...prev, obj]);
	}
	function toggleShowMainLogic(value) {
		setShowMainLogic((prev) => !prev);
		SetUserId(value);
	}

	return (
		<div className="app">
			<FriendUI
				friendsARR={friendsARR}
				onAddFren={handleAddNewFren}
				onSelect={toggleShowMainLogic}
			/>
			{showMainLogic && (
				<MainLogic userId={userId} friendsARR={friendsARR} />
			)}
		</div>
	);
}

function FriendUI({ friendsARR, onAddFren, onSelect }) {
	const [addNewFren, SetAddNewFren] = useState(false);
	return (
		<div className="sidebar">
			<ul>
				{friendsARR.map((ele) => (
					<li key={ele.id}>
						<FriendList obj={ele} onSelect={onSelect} />
					</li>
				))}
			</ul>
			{addNewFren && <AddFriendForm onAddFren={onAddFren} />}
			<button
				className="button"
				onClick={() => SetAddNewFren((prev) => !prev)}
			>
				{addNewFren ? "Close" : "Add friend"}
			</button>
		</div>
	);
}

function FriendList({ obj, onSelect }) {
	const [hasSelect, setHasSelect] = useState(false);
	function handleClick(val) {
		onSelect(val);
		setHasSelect((prev) => !prev);
	}

	return (
		<>
			<img src={obj.image} />
			<h3>{obj.name}</h3>
			<p>
				{obj.balance < 0 && (
					<span className="red">
						You owe {obj.name + " " + obj.balance} $
					</span>
				)}
			</p>
			<button className="button" onClick={() => handleClick(obj.id)}>
				{hasSelect ? "Close" : "Select"}
			</button>
		</>
	);
}

function AddFriendForm({ onAddFren }) {
	const [name, setName] = useState("");
	const [url, setURL] = useState("");

	function handleAddFren(e) {
		e.preventDefault();
		if (name === "") return;
		const obj = {
			id: Date.now(),
			name,
			url,
			balance: 0,
		};
		onAddFren(obj);
		setName("");
		setURL("");
	}
	return (
		<form className="form-add-friend">
			<label htmlFor="frenName">🐥Friend name</label>
			<input
				type="text"
				id="frenName"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor="imgUrl">🌄Image URL</label>
			<input
				type="url"
				id="imgUrl"
				value={url}
				onChange={(e) => setURL(e.target.value)}
			/>
			<button className="button" onClick={(e) => handleAddFren(e)}>
				Add
			</button>
		</form>
	);
}

function MainLogic({ userId, friendsARR, SETSOMEVALUE }) {
	const obj = friendsARR.filter((ele) => ele.id == userId);
	const friendName = obj[0].name;
	const [user, setUser] = useState("myself");
	return (
		<form className="form-split-bill">
			<h2>split a bill with Abhishek</h2>

			<label htmlFor="billValue">💰 Bill Value</label>
			<input
				type="number"
				id="billValue"
				value={SETSOMEVALUE}
				onChange={SETSOMEVALUE}
			/>
			<label htmlFor="myExpense">😎Your Expense</label>
			<input
				type="number"
				id="myExpense"
				value={SETSOMEVALUE}
				onChange={SETSOMEVALUE}
			/>

			<label htmlFor="frenExpense">👻{friendName}'s Expense</label>
			<input
				type="number"
				id="frenExpense"
				value={SETSOMEVALUE}
				onChange={SETSOMEVALUE}
			/>

			<label htmlFor="payee">🤑 Who's paying the bill?</label>
			<select
				id="payee"
				value={user}
				onChange={(e) => setUser(e.target.value)}
			>
				<option value={user}>Myself</option>
				<option value={user}>{friendName}</option>
			</select>
			<button className="button">Split Bill</button>
		</form>
	);
}
