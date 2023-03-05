import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
	{ itemName : "item 1", quality:1, isSelected:false},
		{ itemName : "item 1", quality:3, isSelected:false},
			{ itemName : "item 1", quality:2, isSelected:false},

	]);
    const [inputText, setInputText]=useState("");
	const [itemToAddTotal, setItemToAddTotal]=useState(0);
	
	const handleAddButtonClick=()=>{
		const newItem={
			itemName:inputText, quality:1, isSelected:false,
		}
		const newItems =[...items, newItem];
		setItems(newItems);
		setInputText("");
	}
	const handleSelected = (index)=>{
		const newItem = [...items];
		newItem[index].isSelected = !newItem[index].isSelected
		setItems(newItem)
	}
	const handleIncreaseButton = (index)=>{
		const newItem = [...items];
		newItem[index].quality++;
		setItems(newItem);
		calculateTotal();
	}
		const handleDecreaseButton = (index)=>{
		const newItem = [...items];
		newItem[index].quality--;
		setItems(newItem)
		calculateTotal();
	}
	const calculateTotal = () =>{
		const itemToAddTotal = items.reduce((total, item)=>{
			return total + item.quality;
		}, 0);
		setItemToAddTotal(itemToAddTotal);
	}
	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input 
					className='add-item-input' 
					placeholder='Add an item...' 
					value={inputText}
					onChange={(e)=>setInputText(e.target.value)}
					/>
					<FontAwesomeIcon icon={faPlus} />
				</div>
				{items.map((item, index)=>(
					<div className='item-list'>
					<div className='item-container'>
						<div className='item-name' onClick={()=>handleSelected(index)}>
							{/* HINT: replace false with a boolean indicating the item has been completed or not */}
							{item.isSelected ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} />
									<span className='completed'>{item.itemName}</span>
								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle} />
									<span>{item.itemName}</span>
								</>
							)}
						</div>
						<div className='quantity'>
							<button>
								<FontAwesomeIcon icon={faChevronLeft} onClick={(index)=>handleDecreaseButton()}/>
							</button>
							<span> {item.quality} </span>
							<button>
								<FontAwesomeIcon icon={faChevronRight} onClick={(index)=>handleIncreaseButton()}/>
							</button>
						</div>
					</div>
				</div>
				)
				)}
				
				<div className='total'>Total: {itemToAddTotal}</div>
			</div>
		</div>
	);
};

export default App;
