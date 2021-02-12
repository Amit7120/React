import React, { useState } from 'react';
import Base from "../core/Base.js";
import {Link} from "react-router-dom";
import {signup} from "../auth/helper/index.js"

const Signup = ({ className }) => {

	const[values, setValues] = useState({
		name:"",
		email:"",
		password:"",
		error:"",
		success:false,
	});

	const{name, email, password, error, success} = values

	const handleChange = name => 
	event => {
		setValues({...values, error:false, [name]:event.target.value});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error:false})
		signup({name, email, password})
		.then(data => {
			console.log("DATA", data);
			if (data.email === email) {
				setValues({
					...values,
					name:"",
					email:"",
					password:"",
					error:"",
					success:true,
				})
			}else{
				setValues({
					...values,
					error:true,
					success:false,
				})
			}
		})
		.catch(e => console.log(e))
	}


	const successMeassage = () => {
		return(

		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<div className="alert alert-success"
				style={{ display: success?"" : "none"  }} 
				>
					New account created successfully. Please <Link to="/signin"> login now. </Link>
				</div>
			</div>
		</div>

			);
	};


	const errorMeassage = () => {
		return(

		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<div className="alert alert-danger"
				style={{ display: error?"" : "none"  }} 
				>
					Check all fields again 
				</div>
			</div>
		</div>

			);
	};


	const signUpForm = () =>{
		return(
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						
						<div className="form-group">
							<lable className="text-light"> Name </lable>
							<input 
								type="text" className="form-control" value={name}
								onChange={handleChange("name")} />
						</div>

						<div className="form-group">
							<lable className="text-light"> Email </lable>
							<input 
								type="text" className="form-control" value={email}
								onChange={handleChange("email")} />
						</div>

						<div className="form-group">
							<lable className="text-light"> Password </lable>
							<input 
								type="password" className="form-control" value={password}
								onChange={handleChange("password")} />
						</div>

						<button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>

					</form>
				</div>
			</div>
			)
	}

    return (
        <Base title="Sign Up" description="Sign Up For Countinue">
        {successMeassage()}
        {errorMeassage()}
        {signUpForm()}
        {/*<p className="text-center">
        {JSON.stringify(values)}
        </p>*/}
        </Base>
    );
};


export default Signup;