import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email: "", password: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name ,email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.sucess){
          // Save the auth token and redirect

        localStorage.setItem('token', json.authtoken); 
        props.showAlert("Account created ","success");
        history.push("/");
        }else{
           
          props.showAlert("invalid credentails","danger");

        }
        
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container">
   
      <form className="container my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
            minLength={5}
            required

          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
