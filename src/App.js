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

	return (
		<div className="app">
			<FriendUI friendsARR={friendsARR} />
		</div>
	);
}

function FriendUI({ friendsARR }) {
	const [addNewFren, SetAddNewFren] = useState(false);
	return (
		<div className="sidebar">
			<ul>
				{friendsARR.map((ele) => (
					<li key={ele.id}>
						<FriendList obj={ele} />
					</li>
				))}
			</ul>
			{addNewFren && <AddFriendForm />}
			<button
				className="button"
				onClick={() => SetAddNewFren((prev) => !prev)}
			>
				{addNewFren ? "Close" : "Add friend"}
			</button>
		</div>
	);
}

function FriendList({ obj }) {
	return (
		<>
			<img src={obj.image} />
			<h3>{obj.name}</h3>
			<p>{obj.balance}</p>
			<button className="button">Select</button>
		</>
	);
}

function AddFriendForm() {
	return (
		<form className=".form-add-friend">
			<label htmlFor="frenName">Friend name</label>
			<input type="text" id="frenName" value="" />
			<label htmlFor="imgUrl">Image URL</label>
			<input type="url" id="imgUrl" value="" />
		</form>
	);
}
