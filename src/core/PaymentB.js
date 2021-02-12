import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {cartEmpty} from "./helper/cartHelper";
import {getToken, processPaynent} from "./helper/paymentHelper";
import {createOrder} from "./helper/orderHelper";
import {signout} from "../auth/helper/index.js";
import {isAuthenticated} from "../auth/helper/index.js";
import DropIn from "braintree-web-drop-in-react";


const PaymentB = ({
	products,
	reload = undefined,
	setReload = f => f,
 	
}) => {

	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
	});
	const userId = isAuthenticated() && isAuthenticated().user.id;
	const token = isAuthenticated() && isAuthenticated().token;
	console.log(userId)
	console.log(userId)

	const getmeToken = (userId, token) => {
		getToken(userId, token)
		.then(info => {
			if (info.error){
				setInfo({
					...info,
					error: info.error,
				});
				signout(() => {
					return <Redirect to="/"/>;
				});
			}
			else
			{
				const clientToken = info.clientToken;
				setInfo({clientToken});
			}
		});
	};

useEffect(() =>{
	getmeToken(userId, token);
},[]);

	
	const getAmount = () =>{
		let amount = 0;
		products.map(p => {
			amount = amount + parseInt(p.price)
		});
		return amount;
	};

	const onPurchase = () => {
		setInfo({loading: true})
		let nonce;
		let getNonce = info.instance.requestPaymentMethod()
		.then(data => {
			console.log("MYDAT",data);
			nonce = data.nonce;
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getAmount(),
			};

			processPaynent(userId, token, paymentData)
			.then(response => {
				if (response.error) {
					if (response.code == '1') {
						console.log("PAYMENT FAIL")
						signout(() => {
							return <Redirect to="/" />
						})
					}
				}else{
					setInfo({...info,
						success: response.success,
						loading: false,
					})
					console.log("PAYMENT SUCCESS")
					let products_name = ""
					products.forEach(function(item){
						products_name += item.name + ", "
					});
					const orderData = {
						products: products_name,
						transaction_id: response.transaction.id,
						amount: response.transaction.amount

					}
					createOrder(userId, token, orderData)
					.then(response => {
						if (response.error) {
							if (response.code == "1") {
									console.log("ORDER FAILED")
								}
								signout(() =>{
									return <Redirect to="/" />
								})	
						}else{
							if (response.success == true) {
								console.log("ORDER PLACED")
							}
						}

					})
					.catch(error => {
						setInfo({
							loading: false,
							success: false,

						})
						console.log("ORDER FAILED", error)
					})
					cartEmpty(() => {
						console.log("CART IS EMPTYED OUT")
					})

					setReload(!reload)
				}
			})
			.catch(e => console.log(e))
		})
		.catch(e => console.log("Nonce",e))
	}

	const showDropIn = () =>{
		return(
			<div>
				{
					info.clientToken !== null && products.length > 0 ? 
					(
						<div>
							<DropIn
							options={{authorization: info.clientToken}}
							onInstance={instance => (info.instance = instance)}
							>

							</DropIn>
							<button onClick={onPurchase} className="btn btn-block btn-success">
								Buy
							</button>

						</div>
						) : 
					(
						<h1>Pleas Login or add somthing in cart</h1>
						)
				}
			</div>
			)
	}

	return (
		<div>
		<h4>Final amount is $ {getAmount()}</h4>
		{showDropIn()}
		</div>
		);
};

export default PaymentB;